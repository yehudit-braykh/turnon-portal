<?php

require_once 'Mandrill.php';

class Account_model extends Uvod_model {

    public function __construct() {
        $this->load->helper('uvod_api');
        $this->load->library('HybridAuthLib');
        $this->load->library('session');
        $this->load->model('vod_item_model');
    }

    public function login($user, $pass, $disabled = false) {

        $data = $this->login_portal($user, $pass);
        //debug($data);
		if($data){
			$this->session->set_userdata('login_token', $data->token);
            $user_profile = $this->get_profile($data->token, $data->_id);
            $this->session->set_userdata('profile_id', $user_profile->_id);
            return $user_profile;
        }
        return $data;
    }

    public function hybrid_login($profile, $provider){
        $fbLogin = $this->login_by_fb($profile->identifier);
        //  debug($fbLogin);
        if(!$fbLogin){// Facbook Id not in DB try Registering with Email, RandPass and FBID
            return $this->link_facebook($profile);
        }
        return $fbLogin;
    }

    public function link_facebook($fb_data) {
        //  debug($fb_data);
        $user = $this->get_single_user($fb_data->email);
        // debug($user);
        if (!$user){
            $this->register($fb_data->email, $this->randomPassword(), $fb_data->firstName, $fb_data->lastName, NULL, $fb_data->identifier, $fb_data);
            $user = $this->get_single_user($fb_data->email);
        }
        //  debug($user,$fb_data);
        $updated_user = $this->update_user( $user->_id , $fb_data->identifier, $fb_data );
        // debug($user,$fb_data);
        $fb_login= $this->login_by_fb($fb_data->identifier);
        //debug($fb_login);
        $data = array();
        $data["firstName"] = $fb_data->firstName;
        $data["lastName"] = $fb_data->lastName;
        $data["gender"] = $fb_data->gender;
        $data["avatar"] = $fb_data->photoURL;
        $data["addressLine1"] = $fb_data->phone;
        $data["city"] = $fb_data->city;
        $date = date_create($fb_data->birthYear."-".$fb_data->birthMonth."-".$fb_data->birthDay);
        $data["birthDate"] = date_timestamp_get($date);

        $user = $this->account_model->update_profile($user->_id,$data);
        return $user;

    }

    public function login_by_fb($fb_id) {
        //debug($fb_id);
        $fbLogin =  $this->login_with_fb($fb_id);
        //debug($fbLogin);

        $token = $fbLogin->token;
        $this->session->set_userdata('login_token', $token);
        $this->session->set_userdata('profile_id', $fbLogin->_id);
        $user_data = $this->account_model->get_profile($fbLogin->token, $fbLogin->_id);
        return $user_data;

    }

    public function logout() {
        $data =  apiPost("end/user/signout", array("token" => $this->session->userdata('login_token')));
        $this->session->sess_destroy();
        return $data;
    }

    public function register($email, $password, $first_name, $last_name, $country = NULL, $fb_id = NULL, $fb_data = NULL, $hash = NULL ) {
        //debug($email, $password, $first_name, $last_name, $country, $fb_id, $fb_data, $hash );
        $ret = null;
        if (!$email || !$password || !$first_name || !$last_name) {
            throw new Exception('You must specify email, password, first & last name');
        }

        // sets the payload for signup
        $payload = new stdClass();
        $payload->userName = $email;
        $payload->password = $password;
        $payload->fullName = $first_name . " " . $last_name;
        $payload->email = $email;
        $payload->accountId = $this->config->item('account_id');
        if($fb_id)
            $payload->fbId = $fb_id;
        $payload_str = json_encode($payload);

        $url = UVOD_PLATFORM_API_URL.'end/user/signup';

        try {
            $user_signup = $this->apiPost($url, $payload_str);
            // debug($user_signup, $user_signup->token, $user_signup->userId);
            $this->session->set_userdata('login_token', $user_signup->token);
            $this->session->set_userdata('profile_id', $user_signup->userId);

            return $user_signup;

        } catch (Exception $e) {

            $error = new stdClass();
            $error->code = 1;
            $error->message = "User already exists.";
            // debug($error);
            return $error;
        }

        // checks service response
        if (isset($user_signup->isException) && $user_signup->isException == "true") {
            if (strripos($user_signup->title, "ConstraintViolationException")) {
                throw new Exception("User already exists.");
            } else {
                throw new Exception($user_signup->title);
            }
        }
    }

    public function get_single_user($email = null, $phone = null) {

        // sets the method parameters
        $parameters = array();

        $url = $this->config->item('end/user');

        if ($email) {
            $parameters[] = "byUserName=" . str_replace(" ", "", strtolower($email));
        }
        if ($phone) {
            $parameters[] = "byPhone=" . $phone;
        }

        return $this->apiCall("end/user", $parameters)->entries[0];
    }

    public function get_profile($token, $id) {
        // debug($token,$id);
        if (!$token)
            return false;

        return $this->apiCall('userprofile/'.$id, null , 'true', $token);
    }

    public function update_profile($id ,$data) {
        // debug($data);
        if(count($data)>1){
            foreach($data as $field=>$value){
                if(!$value || $value == '' || $value==null)
                    unset($data[$field]);
            }
        }
        //    debug($this->session->userdata('login_token'),$id);
        $response = $this->update_profile_data($this->session->userdata('login_token'), $id, $data);
             //debug($response);
        return $response;
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

        return $this->update_user_data($id,$data);
    }

    public function get_watchlist(){

        $id = $this->session->userdata('profile_id');
        $token = $this->session->userdata('login_token');

        $profile= $this->get_profile($token, $id);

        $filters = array();
		$filters[] = "byId=" . str_replace(' ', '%20', implode("|", $profile->watchlist)) ;

		return $this->watchlist_rows($this->apiCall('episode/related', $filters)->entries);

    }

    public function get_favorite_brands(){
        $id = $this->session->userdata('profile_id');
        $token = $this->session->userdata('login_token');

        $profile= $this->get_profile($token, $id);

        $filters = array();
		$filters[] = "byId=" . str_replace(' ', '%20', implode("|", $profile->favoriteBrands)) ;

		return $this->rows($this->apiCall('brand/related', $filters)->entries);
    }

    public function get_favorite_charities(){
        $id = $this->session->userdata('profile_id');
        $token = $this->session->userdata('login_token');

        $profile= $this->get_profile($token, $id);

        $filters = array();
		$filters[] = "byId=" . str_replace(' ', '%20', implode("|", $profile->favoriteCharities)) ;

		return $this->rows($this->apiCall('charity/related', $filters)->entries);
    }

    public function get_favorite_categories(){
        $id = $this->session->userdata('profile_id');
        $token = $this->session->userdata('login_token');

        $profile= $this->get_profile($token, $id);

        $filters = array();
		$filters[] = "byId=" . str_replace(' ', '%20', implode("|", $profile->favoriteCategories)) ;
        // debug($filters);
		return $this->rows($this->apiCall('category/related', $filters)->entries);
    }

    public function get_favorite_celebrities(){
        $id = $this->session->userdata('profile_id');
        $token = $this->session->userdata('login_token');

        $profile= $this->get_profile($token, $id);

        $filters = array();
		$filters[] = "byId=" . str_replace(' ', '%20', implode("|", $profile->favoriteCelebs)) ;

		return $this->rows($this->apiCall('celebrity/related', $filters)->entries);
    }

    public function get_saved_offers(){
        $id = $this->session->userdata('profile_id');
        $token = $this->session->userdata('login_token');

        $profile= $this->get_profile($token, $id);

        $filters = array();
		$filters[] = "byId=" . str_replace(' ', '%20', implode("|", $profile->offersSaved)) ;

		return $this->rows($this->apiCall('offer/related', $filters)->entries);
    }

    public function add_favorite($id, $type){
        $profile_id = $this->session->userdata('profile_id');
		$token = $this->session->userdata('login_token');
        if($profile_id && $token){
            $profile = $this->get_profile($token, $profile_id);
            if (!isset($profile->{$type}) || !$profile->{$type} || $profile->{$type} == null)
                $data = array();
            else
                $data = $profile->{$type};
            if(in_array($id,$data))
                return $profile;
            else{
                array_push($data, $id);
                return $this->update_profile($profile->_id, array( $type => $data));
            }
        } else {
            return false;
        }
    }

    public function remove_favorite($id, $type){
        $profile_id = $this->session->userdata('profile_id');
		$token = $this->session->userdata('login_token');
        if($profile_id && $token){
            $profile = $this->get_profile($token, $profile_id);
            if (!isset($profile->{$type}) || !$profile->{$type} || $profile->{$type} == null || !in_array($id,$profile->{$type}))
                return $profile;
            else{
                $data = $profile->{$type};
                if(count($data)==1)
                    $data = array();
                else
                    unset($data[array_search($id, $data)]);
                return $this->update_profile($profile->_id, array($type => array_values($data)));
            }
        } else
            return false;
    }



    public function save_merchant_info($user_token, $payment_token, $customer_id) {
        return apiPost("commerce/save_merchant_info", array("user_token" => $user_token,
          "payment_token" => $payment_token,
          "customer_id" => $customer_id));
    }

    public function send_password_email($email, $phone=null) {

        $filters = array();
        if($phone==null)
		      $filters[] = "byUserName=" . str_replace(' ', '%20', $email) ;
        else
            $filters[] = "byPhone=" . str_replace(' ', '%20', $phone) ;

		$users = $this->apiCall('end/user', $filters);
        //debug($users);

        if (isset($users->entryCount) && (intval($users->entryCount) > 0)) {
            $profile = $users->entries[0];
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
            $message->from_email = "noreply@clixtv.com";
            $message->from_name = "ClixTv Portal";
            $message->to = array(array('email' => $to));

            $response = $this->save_password($new_password['password'], $email, $profile->_id);
            //debug($response);
            if($response){
                $message->track_opens = true;
                $mandrill->messages->send($message);
                return true;
            }
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
        $profile = $this->get_profile($this->session->userdata('login_token'), $this->session->userdata('profile_id'));
        $data['token'] = $this->session->userdata('login_token');

        $data['first_name'] = $profile->firstName;
        $data['last_name'] = $profile->lastName;
        $data['email'] = $profile->email;

        return apiPost("commerce/subscription_checkout", $data);
	}

    private function randomPassword() {
	    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#.';
	    $pass = array(); //remember to declare $pass as an array
	    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
	    for ($i = 0; $i < 16; $i++) {
	        $n = rand(0, $alphaLength);
	        $pass[] = $alphabet[$n];
	    }

	    return implode($pass); //turn the array into a string
	}

    function watchlist_rows($items){
        foreach ($items as &$item) {
            //debug($cat);
            if($item->brands)
                $item->brands = $this->rows($item->brands);
            if($item->celebrity){
                $arr = array();
                array_push($arr, $item->celebrity);
                $item->celebrity = $this->rows($arr)[0];
            }

            if($item->serie){

                if($item->serie->seasons){


                    foreach ($item->serie->seasons as &$season) {
                        foreach ($season->episodes as &$episode) {
                            $episode->brands = $this->rows($episode->brands);

                            $arr = array();
                            array_push($arr, $episode->celebrity);
                            $episode->celebrity = $this->rows($arr)[0];
                        }
                        $season->episodes = $this->rows($season->episodes);
                    }
                    if($item->serie->brands)
                        $item->serie->brands = $this->rows($item->serie->brands);

                    if($item->serie->charity){
                        $data = array();
                        array_push($data, $item->serie->charity);
                        $item->serie->charity = $this->rows($data)[0];
                    }

                    if($item->serie->celebrity){
                        $data = array();
                        array_push($data, $item->serie->celebrity);
                        $item->serie->celebrity = $this->rows($data)[0];
                    }



                }

            }

            if($item->charity){
                $arr = array();
                array_push($arr, $item->charity);
                $item->charity = $this->rows($arr)[0];
            }

        }

        return $this->rows($items);
    }

    function rows($rows){
		//  debug($rows);
        foreach ($rows as &$media) {
            $media = (array) $media;
			$tmp = array();
			if($media["content"]){
	            foreach ($media["content"] as $file) {
	                $tmp[str_replace (" ", "", $file->assetTypes[0])] = $file;
	            }
            	$media["content"] = $tmp;
			}
        }
        return $rows;
    }


}

?>
