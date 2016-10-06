#!/bin/bash

CONFIG_PROFILE=""

AWS_INFO_SERVICE="http://169.254.169.254/"
AWS_INSTANCE_IDENTITY_URL="${AWS_INFO_SERVICE}latest/dynamic/instance-identity/document"

CURRENT_INSTANCE_ID=""
CURRENT_INSTANCE_REGION=""
CURRENT_INSTANCE_NAME=""

SCRIPT_NAME="AutoHostname"

JQ_PATH="/usr/bin/jq"

function write_log ()
{
    logger -t "auto-hostname" "pid=$$ Msg=$*"
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
        write_log "${SCRIPT_NAME} [ERROR] Command not valid outside an Amazon EC2 instance."
        exit 1
    fi
}

#Check the existance of the JSONQuery prerequisite
function check_jq_prerequisite()
{
    if [ -x "${JQ_PATH}" ]; then
        write_log "${SCRIPT_NAME} JQ exists and is executable: ${JQ_PATH}"
		result=0
    else
        exec_file=$(which jq 2>/dev/null)
        result=$?
        if [ $result -ne 0 ]; then
            write_log "${SCRIPT_NAME} [ERROR] \"jq\" prerequisite was not found. Please install it and add the installation directory to the PATH environment variable. [${exec_file}]"
        elif [ -z $exec_file ]; then
            write_log "${SCRIPT_NAME} [ERROR] \"jq\" prerequisite was not found. Please install it and add the installation directory to the PATH environment variable."
            result=1
		else
		    JQ_PATH=$exec_file
			write_log "${SCRIPT_NAME} JQ executable found at path ${JQ_PATH}"
        fi
	fi

    echo $result
}

#Try to download jq utility
function get_jq_prerequisite()
{
    write_log "Trying to download the 'jq' prerequisite ...'"
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
        write_log "Download of the 'jq' prerequisite was not successful."
    else
        write_log "The 'jq' prerequisite has been successfully downloaded [${JQ_PATH}]"
    fi
    echo $result
}

#Get the ID of the current EC2 instance
function get_iid_of_current_instance()
{
    CURRENT_INSTANCE_ID=$(curl -s $AWS_INSTANCE_IDENTITY_URL | $JQ_PATH '.instanceId')
    if [ $? -gt 0 ]; then
        write_log "${SCRIPT_NAME} [ERROR] Unable to get the ID for the current EC2 instance."
        exit 1
    fi

    if [ -z $CURRENT_INSTANCE_ID ]; then
        write_log "${SCRIPT_NAME} [ERROR] Invalid ID for the current EC2 instance."
        exit 1
    fi

    CURRENT_INSTANCE_ID=$(remove_quotes $CURRENT_INSTANCE_ID)
    write_log "${SCRIPT_NAME} [INFO] Current instance ID: ${CURRENT_INSTANCE_ID}"
}

#Get the region of the current EC2 instance
function get_region_of_current_instance()
{
    CURRENT_INSTANCE_REGION=$(curl -s $AWS_INSTANCE_IDENTITY_URL | $JQ_PATH '.region')
    if [ $? -gt 0 ]; then
	    write_log "${SCRIPT_NAME} [ERROR] Unable to get the region for the current EC2 instance."
        exit 1
    fi

    if [ -z $CURRENT_INSTANCE_REGION ]; then
        write_log "${SCRIPT_NAME} [ERROR] Invalid region for the current EC2 instance."
        exit 1
    fi

    #Remove prefix and suffix "
    CURRENT_INSTANCE_REGION="$(remove_quotes $CURRENT_INSTANCE_REGION)"

    write_log "${SCRIPT_NAME} [INFO] Current instance region: ${CURRENT_INSTANCE_REGION}"
}

function get_ec2_tags()
{
    if [ -z "$2" ]; then
        TAGS="$(/usr/bin/aws --region $1 ec2 describe-tags)"
    else
        TAGS="$(/usr/bin/aws --profile $2 --region $1 ec2 describe-tags)"
    fi

    if [ $? -gt 0 ]; then
        write_log "${SCRIPT_NAME} [ERROR] Execution of AWS CLI tool failed. Check if all required configuration params are available."
        exit 3
    fi

    echo "$TAGS"
}

function get_current_instance_name_tag()
{
    NAME=`echo "$1" | $JQ_PATH ".Tags[] | select(.ResourceId == \"$2\") | select(.Key == \"Name\") | .Value"`

    if [ $? -gt 0 ]; then
        write_log "${SCRIPT_NAME} [ERROR] Unable to parse AWS CLI Tool output."
        exit 3
    fi

    if [ -z "$NAME" ]; then
        write_log "${SCRIPT_NAME} [ERROR] Instance name not found."
        exit 3
    fi

    NAME="$(remove_quotes $NAME)"

    echo $NAME
}

function set_hostname()
{
    if [ -z "$1" ]; then
        write_log "${SCRIPT_NAME} [ERROR] Cannot set an empty hostname."
        exit 3
    fi

    `hostname $1`

    if [ $? -gt 0 ]; then
        write_log "${SCRIPT_NAME} [ERROR] Unable to set the machine hostname."
        exit 3
    else
        write_log "${SCRIPT_NAME} [INFO] New hostname has been set"
    fi

    if [ -f "/etc/hostname" ]; then 
        #UBUNTU
        write_log "${SCRIPT_NAME} [INFO] Writing to /etc/hostname file ..."
        echo $1 > /etc/hostname
    fi

    if [ -f "/etc/sysconfig/network" ]; then 
        #RedHat
        write_log "${SCRIPT_NAME} [INFO] Writing to /etc/sysconfig/network ..."
        HOSTNAME_DEF=$(cat /etc/sysconfig/network | grep 'HOSTNAME=')
        if [ -z "$HOSTNAME_DEF" ]; then
            echo "HOSTNAME=$1" >> /etc/sysconfig/network
        else
            NETWORK=$(cat /etc/sysconfig/network | sed "/HOSTNAME=/c\HOSTNAME=$1")
            echo "$NETWORK" > /etc/sysconfig/network 
        fi
    fi

    write_log "${SCRIPT_NAME} [INFO] Changing /etc/hosts file ..."
    LOCALHOST_DEF="$(cat /etc/hosts | grep '127\.0\.0\.1')"
    if [ -z "$LOCALHOST_DEF" ]; then
        echo "127.0.0.1 localhost.localdomain localhost $1" >> /etc/hosts
    else
        HOSTS=`cat /etc/hosts | sed "/127\.0\.0\.1/c\127\.0\.0\.1 localhost localhost.localdomain $1"`
        echo "$HOSTS" > /etc/hosts
    fi

    write_log "${SCRIPT_NAME} [INFO] All done."
}

write_log "${SCRIPT_NAME} [INFO] Setting AWS instance Name tag as hostname ..."

while getopts "P:" options; do
    case $options in
        P)CONFIG_PROFILE=$OPTARG;;
        *)
          SCRIPT_NAME=$(basename $0)
          echo "$SCRIPT_NAME help:"
          echo ""
          echo "Usage: $SCRIPT_NAME [-P <profile_name>]"
          echo ""
          exit 2
        ;;
    esac
done

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

if [ -z $CONFIG_PROFILE ]; then
    write_log "${SCRIPT_NAME} [INFO] Config profile: default"
else
    write_log "${SCRIPT_NAME} [INFO] Config profile: ${CONFIG_PROFILE}"
fi

TAGS=$(get_ec2_tags $CURRENT_INSTANCE_REGION $CONFIG_PROFILE)

result=$?
if [ $result -gt 0 ]; then
    exit $result
fi

CURRENT_INSTANCE_NAME_TAG=$(get_current_instance_name_tag "$TAGS" "$CURRENT_INSTANCE_ID")
CURRENT_INSTANCE_NAME_TAG=${CURRENT_INSTANCE_NAME_TAG}-${CURRENT_INSTANCE_ID}

result=$?
if [ $result -gt 0 ]; then
    exit $result
fi

write_log "${SCRIPT_NAME} [INFO] Current instance name tag: ${CURRENT_INSTANCE_NAME_TAG}"

set_hostname "$CURRENT_INSTANCE_NAME_TAG"

