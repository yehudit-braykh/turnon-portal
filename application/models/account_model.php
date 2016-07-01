<?php

require_once 'Mandrill.php';

class Account_model extends CI_Model {

    public function __construct() {
        $this->load->helper('uvod_api');
    }

    public function login($user, $pass, $disabled = false) {
        return apiPost("user/login_portal", array("username" => $user, "password" => $pass, "disabled" => $disabled));
    }
    
    public function login_by_fb($fb_id) {
        return apiPost("user/login_by_fb", array("fb_id" => $fb_id));
    }

    public function simple_login($user, $pass) {
        return apiPost("user/login", array("username" => $user, "password" => $pass));
    }

    public function logout($token) {
        return apiPost("user/logout", array("token" => $token));
    }

    public function register($email, $password, $first_name, $last_name, $country, $hash = NULL, $fb_id = NULL) {

        return apiPost("user/register", array("email" => $email,
          "password" => $password,
          "first_name" => $first_name,
          "last_name" => $last_name,
          "country" => $country,
          "fb_id" => $fb_id,
          "hash" => $hash)
        );
    }

    public function get_profile($token, $id) {
        return apiCall("user/get_profile", array('token' => $token, 'id' => $id));
    }

    public function get_self_id($token) {
        return apiPost("user/get_self_id", array('token' => $token));
    }

    public function save_profile($token, $id, $data) {
        return apiPost("user/save_profile", array("token" => $token,
          "id" => $id,
          "data" => $data));
    }
    
    public function update_user($id, $data) {
        return apiPost("user/update_user", array("id" => $id, "data" => $data));
    }

    public function save_merchant_info($user_token, $payment_token, $customer_id) {
        return apiPost("commerce/save_merchant_info", array("user_token" => $user_token,
          "payment_token" => $payment_token,
          "customer_id" => $customer_id));
    }

    public function send_password_email($email) {

        $users = apiCall("user/get_single_user", array("email" => $email));

        if (isset($users->content->entryCount) && (intval($users->content->entryCount) > 0)) {

            $profile = apiCall("user/get_single_profile", array("email" => $email, 'id' => $users->content->entries[0]->_id));

            $mandrill = new Mandrill('lwISZr2Z9D-IoPggcDSaOQ');
            $new_password = array();
            $new_password['password'] = rand(10000000, getrandmax());
            if (isset($profile->content->displayName)) {
                $new_password['name'] = $profile->content->displayName;
            } else {
                $new_password['name'] = '';
            }
            $to = $_POST["email"];
            $message = new stdClass();
            $message->html = $this->load->view(views_url() . 'templates/email_forgot_password', $new_password, TRUE);
            $message->subject = "Password Reset";
            $message->from_email = "NO_RESPONSE@1spot.com";
            $message->from_name = "1Spot Media Portal";
            $message->to = array(array('email' => $to));

            $message->track_opens = true;
            $mandrill->messages->send($message);

            $response = apiPost("user/save_password", array("email" => $email, "password" => $new_password['password']));
          
            return true;
        }
        return false;
    }

    public function send_single_email($email, $text, $subject, $from_address, $from_name) {
        //$users = apiCall("user/get_single_user", array("email" => $email));
        try {
            $mandrill = new Mandrill('lwISZr2Z9D-IoPggcDSaOQ');

            $message = new stdClass();
            $message->html = $text;
            $message->subject = $subject;
            $message->from_email = $from_address;
            $message->from_name = $from_name;
            $message->to = array(array('email' => $email));
            //$message->to = array(array('email' => "sebastoian@hotmail.com"));

            $message->track_opens = true;
            $mandrill->messages->send($message);

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function save_password($email, $new_password) {
        return apiPost("user/save_password", array("email" => $email, "password" => $new_password));
    }

    public function activate_account($hash, $email) {

        return apiPost("user/activate_account", array("hash" => $hash, "email" => $email));
    }

    public function subscription_checkout($token, $nonce, $first_name, $last_name, $email, $country, $pi_month, $pi_year, $pi_type, $pi_number, $pi_security_code, $subscription_id, $auto_renew) {

        return apiPost("commerce/subscription_checkout", array('token' => $token, 'nonce' => $nonce, 'first_name' => $first_name, 'last_name' => $last_name,
          'email' => $email, 'country' => $country, 'pi_month' => $pi_month, 'pi_year' => $pi_year, 'pi_type' => $pi_type, 'pi_number' => $pi_number,
          'pi_security_code' => $pi_security_code, 'subscription_id' => $subscription_id, 'auto_renew' => $auto_renew));
    }

    public function get_contract($id, $user_active = null) {

        return apiPost("commerce/get_contract", array('id' => $id, 'user_active' => $user_active));
    }

    public function cancel_subscription($id) {

        return apiPost("commerce/cancel_subscription", array('id' => $id));
    }

    public function update_subscription($id, $auto_renew) {

        return apiPost("commerce/update_contract", array('id' => $id, 'auto_renew' => $auto_renew));
    }

    public function get_subscriptions($id = null) {

        return apiPost("commerce/get_subscriptions", array('id' => $id));
    }

    public function get_billing_information($id) {

        return apiPost("commerce/get_billing_information", array('id' => $id));
    }

    public function update_billing_information($id, $nonce) {

        return apiPost("commerce/update_billing_information", array('id' => $id, 'nonce' => $nonce));
    }

    public function exists_user_email($email) {

        $ret = false;

        $resp = apiCall("user/get_single_user", array('email' => $email));

//        if ($resp && isset($resp->content) && isset($resp->content->entries) && sizeof($resp->content->entries) > 0) {
//            $ret = true;
//        }

        //$ret = false;

        return $resp;
    }

    public function get_profile_by_email($email) {
        return apiPost("user/get_profile_by_email", array('email' => $email));
    }
    
    public function get_credit_card($credit_card_id){
          return apiCall("commerce/get_credit_card", array('card_id' => $credit_card_id));
    }
    
    public function save_credit_card($token, $id, $data) {
        return apiPost("user/save_credit_card", array("token" => $token,
          "id" => $id,
          "data" => $data));
    }

}

?>