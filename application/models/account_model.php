<?php

require_once 'Mandrill.php';

class Account_model extends CI_Model {

    public function __construct() {
        $this->load->helper('uvod_api');
        $this->load->library('HybridAuthLib');
        $this->load->library('session');
    }

    public function login($user, $pass, $disabled = false) {

        $data = apiPost("user/login_portal", array("username" => $user, "password" => $pass, "disabled" => $disabled));
		if($data->content){
			$this->session->set_userdata('login_token', $data->content->token);
            $this->session->set_userdata('subscription', $data->content->subscription);
            $this->session->set_userdata('purchased_products', $data->content->purchased_products);
            if($data->content->subscription)
                $user_data->content->subscription = $data->content->subscription;
            if($data->content->purchased_products)
                $user_data->content->purchased_products = $data->content->purchased_products;
            $user_data = $this->get_profile($data->content->token, $data->content->id);
            $this->session->set_userdata('profile', $user_data->content);
            return $user_data;
        }
        return $data;

    }

    public function link_facebook($user, $pass) {

        $loging_data = apiPost("user/login_portal", array("username" => $user, "password" => $pass, "disabled" => false));
		if($loging_data->content->token){
            $fb_data  = $this->session->userdata('fb_profile');
            $updated_data = $this->update_user( $loging_data->content->id , $fb_data->identifier, $fb_data );
            if($updated_data){
                $fb_login= $this->login_by_fb($fb_data->identifier);
                $data = new stdClass;
                $data->firstName = $fb_data->firstName;
                $data->lastName = $fb_data->lastName;
                $data->gender = $fb_data->gender;
                $data->avatar = $fb_data->photoURL;
                $data->addressLine1 = $fb_data->phone;
                $data->city = $fb_data->city;
                $data->birthDate = date_create($fb_data->birthYear."-".$fb_data->birthMonth."-".$fb_data->birthDay);
                $user_data = $this->account_model->update_profile($fb_login->content->id,$data);

                $this->session->set_userdata('profile', $user_data->content);
            }
        }
        return $user_data;
    }

    public function login_by_fb($fb_id) {
        $fbLogin =  apiPost("user/login_by_fb", array("fb_id" => $fb_id));
        $this->session->set_userdata('login_token', $data->content->token);
        $this->session->set_userdata('subscription', $fbLogin->content->subscription);
        $this->session->set_userdata('purchased_products', $fbLogin->content->purchased_products);
        $user_data = $this->account_model->get_profile($fbLogin->content->token, $fbLogin->content->id);
        $this->session->set_userdata('profile', $user_data->content);
        return $fbLogin;
    }

    public function logout() {
        $data =  apiPost("user/logout", array("token" => $this->session->userdata('login_token')));
        if($data)
            $this->session->sess_destroy();
        return $data;
    }

    public function register($email, $password, $first_name, $last_name, $country = NULL, $hash = NULL, $fb_id = NULL, $merge = false, $fb_data = NULL) {
        $data = apiPost("user/register", array("email" => $email,
          "password" => $password,
          "first_name" => $first_name,
          "last_name" => $last_name,
          "country" => $country,
          "fb_id" => $fb_id,
          "hash" => $hash,
          "merge" => $merge,
          "fb_data" => $fb_data)
        );
        return $data;
    }

    public function get_profile($token, $id) {
        return apiCall("user/get_profile", array('token' => $token, 'id' => $id));
    }

    public function get_self_id($token) {
        return apiPost("user/get_self_id", array('token' => $token));
    }

    public function update_profile( $id, $data) {

        return apiPost("user/update_profile", array("token" => $this->session->userdata('login_token'),
          "id" => $id,
          "data" => $data));
    }

    public function update_user( $id, $fb_id = NULL, $fb_data = NULL, $first_name = NULL, $last_name = NULL, $address = NULL, $birthDay = NULL) {

        $data = new stdClass();

        if($first_name)
            $data->firstName = $first_name;
        if($last_name)
            $data->lastName = $last_name;
        if($address)
            $data->city = $address;
        if($birthDay)
            $data->birthdate = $birthDay;
        if($fb_id)
            $data->fbId = $fb_id;
        if($fb_data)
            $data->fbData = $fb_data;

        return apiPost("user/update_user", array("token" => $this->session->userdata('login_token'),
          "id" => $id,
          "data" => $data));
    }

    public function save_merchant_info($user_token, $payment_token, $customer_id) {
        return apiPost("commerce/save_merchant_info", array("user_token" => $user_token,
          "payment_token" => $payment_token,
          "customer_id" => $customer_id));
    }

    public function send_password_email($email) {

        $users = apiCall("user/get_single_user", array("email" => $email));

        if (isset($users->content->entryCount) && (intval($users->content->entryCount) > 0)) {
            $profile = $users->content->entries[0];
            $mandrill = new Mandrill('lwISZr2Z9D-IoPggcDSaOQ');
            $new_password = array();
            $new_password['password'] = rand(10000000, getrandmax());
            if (isset($profile->displayName)) {
                $new_password['name'] = $profile->fullName;
            } else {
                $new_password['name'] = '';
            }
            $to = $email;
            $message = new stdClass();
            $message->html = $this->load->view( 'templates/email_forgot_password', $new_password, TRUE);
            $message->subject = "Password Reset";
            $message->from_email = "noreply@peru-digital.com";
            $message->from_name = "Peru Digital Portal";
            $message->to = array(array('email' => $to));

            $message->track_opens = true;
            $mandrill->messages->send($message);

            $response = apiPost("user/save_password", array("email" => $email, "password" => $new_password['password']));
            return true;
        }
        return false;
    }

    public function send_single_email($email, $text, $subject, $from_address, $from_name) {
        try {
            $mandrill = new Mandrill('lwISZr2Z9D-IoPggcDSaOQ');
            $message = new stdClass();
            $message->html = $text;
            $message->subject = $subject;
            $message->from_email = $from_address;
            $message->from_name = $from_name;
            $message->to = array(array('email' => $email));

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
        return $resp;
    }

    public function get_profile_by_email($email) {
        return apiPost("user/get_profile_by_email", array('email' => $email));
    }

    function subscripe($data){
		$data = array();
        $profile= $this->session->userdata('profile');
        $data['token'] = $this->session->userdata('login-token');

        $data['first_name'] = $profile->firstName;
        $data['last_name'] = $profile->lastName;
        $data['email'] = $profile->email;

        return apiPost("commerce/subscription_checkout", $data);
	}
}

?>
