#!/bin/bash

AWS_INFO_SERVICE="http://169.254.169.254/"
AWS_INSTANCE_IDENTITY_URL="${AWS_INFO_SERVICE}latest/dynamic/instance-identity/document"

CURRENT_INSTANCE_ID=""
CURRENT_INSTANCE_REGION=""
CURRENT_INSTANCE_ENVIRONMENT=""

JQ_PATH="/usr/bin/jq"

SCRIPTNAME=$(basename "$0")
STATE_OK=0
STATE_ERR=1

function write_log ()
{
    logger -t "${SCRIPTNAME}" "pid=$$ Msg=$*"
}

function remove_quotes()
{
    if [ -z $1 ]; then
        x=""
    else
        x="${1#\"}"
        x="${x%\"}"
    fi

    echo $x
}

#Check if script is run on an Amazon EC2 instance
function running_on_ec2_instance()
{
    x=$(curl -s $AWS_INFO_SERVICE)
    if [ $? -gt 0 ]; then
        write_log "[ERROR] Command not valid outside an Amazon EC2 instance."
        exit $STATE_ERR
    fi
}

#Check the existance of the JSONQuery prerequisite
function check_jq_prerequisite()
{
    if [ -x "${JQ_PATH}" ]; then
        write_log "[INFO] JQ exists and is executable: ${JQ_PATH}"
        result=$STATE_OK
    else
        exec_file=$(which jq 2>/dev/null)
        result=$?
        if [ $result -ne 0 ]; then
            write_log "[ERROR] \"jq\" prerequisite was not found. Please install it and add the installation directory to the PATH environment variable. [${exec_file}]"
        elif [ -z $exec_file ]; then
            write_log "[ERROR] \"jq\" prerequisite was not found. Please install it and add the installation directory to the PATH environment variable."
            result=$STATE_ERR
        else
            JQ_PATH=$exec_file
            write_log "[INFO] JQ executable found at path ${JQ_PATH}"
        fi
    fi

    echo $result
}

#Try to download jq utility
function get_jq_prerequisite()
{
    write_log "[INFO] Trying to download the 'jq' prerequisite ...'"
    jq_link="http://stedolan.github.io/jq/download/linux64/jq"
    wget "${jq_link}" -O "${JQ_PATH}" >/dev/null 2>&1
    result=$?
    if [ $result -eq 0 ]; then
        chmod 755 "${JQ_PATH}"
        echo '{"a": "b"}' | $JQ_PATH '.' >/dev/null 2>&1
        result=$?
        if [ $result -gt 0 ]; then
            rm -f "${JQ_PATH}"
        fi
    fi
    if [ $result -gt 0 ]; then
        write_log "[INFO] Download of the 'jq' prerequisite was not successful."
    else
        write_log "[INFO] The 'jq' prerequisite has been successfully downloaded [${JQ_PATH}]"
    fi
    echo $result
}

#Get the ID of the current EC2 instance
function get_iid_of_current_instance()
{
    CURRENT_INSTANCE_ID=$(curl -s $AWS_INSTANCE_IDENTITY_URL | $JQ_PATH '.instanceId')
    if [ $? -gt 0 ]; then
        write_log "[ERROR] Unable to get the ID for the current EC2 instance."
        exit $STATE_ERR
    fi

    if [ -z $CURRENT_INSTANCE_ID ]; then
        write_log "[ERROR] Invalid ID for the current EC2 instance."
        exit $STATE_ERR
    fi

    CURRENT_INSTANCE_ID=$(remove_quotes $CURRENT_INSTANCE_ID)
    write_log "[INFO] Current instance ID: ${CURRENT_INSTANCE_ID}"
}

#Get the region of the current EC2 instance
function get_region_of_current_instance()
{
    CURRENT_INSTANCE_REGION=$(curl -s $AWS_INSTANCE_IDENTITY_URL | $JQ_PATH '.region')
    if [ $? -gt 0 ]; then
            write_log "[ERROR] Unable to get the region for the current EC2 instance."
        exit $STATE_ERR
    fi

    if [ -z $CURRENT_INSTANCE_REGION ]; then
        write_log "[ERROR] Invalid region for the current EC2 instance."
        exit $STATE_ERR
    fi

    #Remove prefix and suffix "
    CURRENT_INSTANCE_REGION="$(remove_quotes $CURRENT_INSTANCE_REGION)"

    write_log "[INFO] Current instance region: ${CURRENT_INSTANCE_REGION}"
}

function get_ec2_tags()
{
    TAGS="$(/usr/bin/aws --region $1 ec2 describe-tags)"

    if [ $? -gt 0 ]; then
        write_log "[ERROR] Execution of AWS CLI tool failed. Check if all required configuration params are available."
        exit $STATE_ERR
    fi

    echo "$TAGS"
}

function get_current_instance_environment()
{
    NAME=$(echo "$1" | $JQ_PATH ".Tags[] | select(.ResourceId == \"$2\") | select(.Key == \"elasticbeanstalk:environment-name\") | .Value")

    if [ $? -gt 0 ]; then
        write_log "[ERROR] Unable to parse AWS CLI Tool output."
        exit $STATE_ERR
    fi

    if [ -z "$NAME" ]; then
        write_log "[ERROR] Instance name not found."
        exit $STATE_ERR
    fi

    NAME="$(remove_quotes $NAME)"

    echo $NAME
}

function get_environment_asg()
{
    NAME=$(/usr/bin/aws --region $1 elasticbeanstalk describe-environment-resources --environment-name $2 | $JQ_PATH ".EnvironmentResources.AutoScalingGroups[].Name")
    res=$?

    if [ $res -ne 0 ]; then
        write_log "[ERROR] Unable to parse AWS CLI Tool output."
        exit $STATE_ERR
    fi

    if [ "x${NAME}" == "x" ]; then
        write_log "[ERROR] Auto-scale group name not found."
        exit $STATE_ERR
    fi

    NAME="$(remove_quotes $NAME)"

    echo $NAME
}

function check_elb_attachment_to_asg()
{
    ATTACHED=$(/usr/bin/aws --region $1 autoscaling describe-load-balancers --auto-scaling-group-name "$2" | grep -i "$3")
    echo $ATTACHED
}

function attach_additional_lb()
{
    write_log "[INFO] Attaching load balancer ..."
    out=$(/usr/bin/aws --region $1 autoscaling attach-load-balancers --auto-scaling-group-name "$2" --load-balancer-names "$3")
    res=$?

    if [ $res -ne 0 ]; then
        write_log "[ERROR] Failed to attach the additional load balancer."
    else
        write_log "[INFO] Load balancer has been successfully attached."
    fi

    exit $res
}

write_log "[INFO] Registering additional load balancer ..."

if [ "x${ADDITIONAL_LB}" == "x" ]; then
  write_log "[ERROR] The \"ADDITIONAL_LB\" environment property must be set."
  exit $STATE_ERR
fi

write_log "[INFO] Additional LB name: ${ADDITIONAL_LB}"

running_on_ec2_instance
result=$?
if [ $result -gt 0 ]; then
    exit $result
fi

result=$(check_jq_prerequisite)
if [ $result -gt 0 ]; then
    #Try to download it and re-test
    result=$(get_jq_prerequisite)
    if [ $result -eq 0 ]; then
        #Re-test
        result=$(check_jq_prerequisite)
    fi
    if [ $result -gt 0 ]; then
        exit $result
    fi
fi

get_iid_of_current_instance
result=$?
if [ $result -gt 0 ]; then
    exit $result
fi

get_region_of_current_instance
result=$?
if [ $result -gt 0 ]; then
    exit $result
fi

TAGS=$(get_ec2_tags ${CURRENT_INSTANCE_REGION})
result=$?
if [ $result -gt 0 ]; then
    exit $result
fi

CURRENT_INSTANCE_ENVIRONMENT=$(get_current_instance_environment "${TAGS}" ${CURRENT_INSTANCE_ID})
ENVIRONMENT_ASG=$(get_environment_asg ${CURRENT_INSTANCE_REGION} ${CURRENT_INSTANCE_ENVIRONMENT})

target_lbs=$(echo "$ADDITIONAL_LB" | tr ", " "\n" | grep -v ^$)
for target_lb in $target_lbs
do
    ELB_ATTACHED=$(check_elb_attachment_to_asg ${CURRENT_INSTANCE_REGION} ${ENVIRONMENT_ASG} ${target_lb})
	if [ "x${ELB_ATTACHED}" == "x" ]; then
	    attach_additional_lb ${CURRENT_INSTANCE_REGION} ${ENVIRONMENT_ASG} ${target_lb}
    else
        write_log "[INFO] ELB \"${target_lb}\" is already attached to the environment."
    fi
done
