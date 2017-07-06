<?php

 require_once(APPPATH . '/classes/User.php');

class Uvod_model extends CI_Model {

    public function __construct() {
        date_default_timezone_set('UTC');
        $this->load->helper('util');
        $this->load->model("fastcache_model");
    }

    /*
      @method: get_call
      @params: path (string) the uvod-platform-api path service
      @params: parameters (array) the filters to make the call
      @params: login (boolean or null) if it isn't present or it is false this function make a admin login
      @params: token (string or null) if login param is present and it is false this function needs a admin token to make the call
     */

    public function apiCall($path, $parameters = null, $login = null, $token = null) {

        if (!$login || ($login && $login !== "false")) {
            $token = $this->login_admin();
        }

        if (!$token) {
            throw new Exception('The token param is mandatory.');
        }

        $parameters[] = "token=" . $token;

        //$url = $this->config->item($path);
        $url = UVOD_PLATFORM_API_URL.$path;
        //debug($url);
        $json = file_get_contents($url . "?" . implode('&', $parameters));

        // checks service response for valid json
        if (!$json || !isJson($json)) {
            throw new Exception('Internal error.');
        }

        // decode service response
        $json_obj = json_decode($json);
            // debug($json_obj);
        // checks service response
        if (isset($json_obj->isException) && ($json_obj->isException == true || $json_obj->isException === "true")) {
            if($json_obj->responseCode == 403 && $json_obj->title == "Invalid Access Token"){
                $this->login_admin(true);
                unset($parameters[array_search("token=" . $token,$parameters)]);
                return $this->apiCall($path, $parameters, $login, $token);
            } else {
                return false;
            }

        }
        return $json_obj;
    }

    public function apiPost($url, $payload = null, $custom_method = null) {

        $method = "POST";
        if ($custom_method) {
            $method = $custom_method;
        }

        if (!$login || ($login && $login !== "false")) {
            $token = $this->login_admin();
        }

        $curl = curl_init(UVOD_PLATFORM_API_URL.$url.'?token='.$token);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($payload)));
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        if ($payload) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
        }
        $curl_response = curl_exec($curl);

        if ($curl_response === false) {
            $description = var_export(curl_getinfo($curl));
            curl_close($curl);
            throw new Exception($description);
        }

        $json_obj = json_decode($curl_response);
        // debug($json_obj);
        // checks service response
        if (isset($json_obj->isException) && ($json_obj->isException == true || $json_obj->isException === "true")) {
            if($json_obj->responseCode == 403 && $json_obj->title == "Invalid Access Token"){
                $this->login_admin(true);
                unset($parameters[array_search("token=" . $token,$parameters)]);
                return $this->apiPost($url, $payload, $custom_method);
            } else {
                if (isset($json_obj->tile)) {
                    $msg = $json_obj->title;
                } else if (isset($json_obj->description)) {
                    $msg = $json_obj->description;
                }
                throw new Exception($msg);
            }
        }

        return $json_obj;
    }

    public function apiPut($url, $payload ) {

        if (!$login || ($login && $login !== "false")) {
            $token = $this->login_admin();
        }

        $curl = curl_init(UVOD_PLATFORM_API_URL.$url.'?token='.$token);

        $payload_str = json_encode($payload);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($payload_str)));
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($curl, CURLOPT_POSTFIELDS, $payload_str);

        $curl_response = curl_exec($curl);

        if ($curl_response === false) {
            $description = var_export(curl_getinfo($curl));
            curl_close($curl);
            throw new Exception($description);
        }

        $json_obj = json_decode($curl_response);
        // debug($json_obj);
        // checks service response
        if (isset($json_obj->isException) && ($json_obj->isException == true || $json_obj->isException === "true" || $json_obj->isException === "1")) {
            if($json_obj->responseCode == 403 && $json_obj->title == "Invalid Access Token"){
                $this->login_admin(true);
                unset($parameters[array_search("token=" . $token,$parameters)]);
                return $this->apiPut($url, $payload);
            } else {
                if (isset($json_obj->tile)) {
                    $msg = $json_obj->title;
                } else if (isset($json_obj->description)) {
                    $msg = $json_obj->description;
                }
                throw new Exception($msg);
            }
        }

        return $json_obj;
    }

    private function login_admin($relogin = false) {

        if(!$relogin && $this->fastcache_model->get_cache("admin_login_token", true))
            return $this->fastcache_model->get_cache("admin_login_token", true);


        // logs admin user in tdp and uses his token
        $username = $this->config->item('tdp_admin_username');
        $password = $this->config->item('tdp_admin_password');


        $ret = null;

        if (!$username || !$password) {
            throw new Exception('You must specify username and password.');
        }

        $url = $this->config->item('url_admin_user_login_platform_api');
        //debug($url);
        $payload = new stdClass();
        $payload->userName = str_replace(" ", "", $username);
        $payload->password = $password;

        $payload_str = json_encode($payload);

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($payload_str)));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $payload_str);

        $result = curl_exec($curl);
        //debug($result);
        //debug(dirname(__FILE__) . '/cacert.pem');
        if (!$result || !isJson($result)) {
            throw new Exception('Cannot login user in UVOD API PLATFORM.');
        }

        curl_close($curl);

        // decode service response
        $json_obj = json_decode($result);

        // checks service response
        if (isset($json_obj->isException) && $json_obj->isException == "true") {
            return($json_obj);

            //To handle user no allowed with anonymus access
        } else if (isset($json_obj->code) && $json_obj->code === 404) {
            throw new Exception($json_obj->message);
        }

        $this->fastcache_model->set_cache("admin_login_token", $json_obj->token);
        return $json_obj->token;
    }

    protected function login_portal($username, $password) {

        $ret = null;

        if (!$username || !$password) {
            throw new Exception('You must specify username and password.');
        }

        $url = $this->config->item('url_user_login_platform_api');
        //debug($url);
        $payload = new stdClass();
        $payload->userName = str_replace(" ", "", $username);
        $payload->password = $password;

        $payload_str = json_encode($payload);

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($payload_str)));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $payload_str);

        $result = curl_exec($curl);

        curl_close($curl);


        //debug($result);
        //debug(dirname(__FILE__) . '/cacert.pem');
        if (!$result || !isJson($result)) {
            throw new Exception('Cannot login user.');
        }

        // decode service response
        $json_obj = json_decode($result);

        // checks service response
        if (isset($json_obj->isException) && $json_obj->isException == "true") {
            return($json_obj);

            //To handle user no allowed with anonymus access
        } else if (isset($json_obj->responseCode) && $json_obj->responseCode === 403) {
            throw new Exception($json_obj->title);
        }

        //debug($json_obj);

        // creates user object
        $user = new UVODUser();
        $user->_id = $json_obj->userId;
        $user->username = $json_obj->userName;
        $user->duration = $json_obj->duration;
        $user->token = $json_obj->token;
        $user->idle_timeout = $json_obj->idleTimeout;

        return $user;
    }

    public function login_with_fb($fb_id) {

        $ret = null;
        if (!$fb_id) {
            throw new Exception('You must specify Facebook ID.');
        }

        $url = $this->config->item('url_user_login_by_fb');

        $payload = new stdClass();
        $payload->fb_id = $fb_id;

        $payload_str = json_encode($payload);

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($payload_str)));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $payload_str);

        $result = curl_exec($curl);
        if (!$result || !isJson($result)) {
            throw new Exception('Cannot login user in UVOD API PLATFORM.');
        }

        curl_close($curl);

        // decode service response
        $json_obj = json_decode($result);

        // checks service response
        if (isset($json_obj->isException) && $json_obj->isException) {

            if (isset($json_obj->responseCode) && $json_obj->responseCode == 403) {
                return false;
            }

            //To handle user no allowed with anonymus access
        } else if (isset($json_obj->code) && $json_obj->code === 404) {
            throw new Exception($json_obj->message);
        }

        // creates user object
        $user = new UVODUser();
        $user->_id = $json_obj->userId;
        $user->username = $json_obj->userName;
        $user->fb_id = $fb_id;
        $user->login_time = time();
        $user->duration = $json_obj->duration;
        $user->token = $json_obj->token;
        $user->idle_timeout = $json_obj->idleTimeout;

        // // gets user profile, in the registration it was not created, so it may crash
        // $user_profile = $this->get_profile($json_obj->token, $json_obj->userId);
        //
        // if ($user_profile) {
        //     $user->firstName = $user_profile->firstName;
        //     $user->lastName = $user_profile->lastName;
        //     $user->gender = $user_profile->gender;
        //     $user->countryCode = $user_profile->countryCode;
        //     $user->email = $user_profile->email;
        //     $user->subscriptionPlan = $user_profile->subscriptionPlan;
        //     $user->ppvTickets = $user_profile->ppvTickets;
        //     $user->billingInfo = $user_profile->billingInfo;
        // }

        return $user;
    }

    public function save_password($password, $email,$id) {

        $admin_token = $this->login_admin();

        $parameters = array();
        $parameters[] = "token=" . $admin_token;
        $parameters[] = "password=" . $password;

        $curl = curl_init($this->config->item('url_user_change_password') . $id . "?" . implode("&", $parameters));

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($curl, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        $curl_response = curl_exec($curl);

        $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        if ($http_status != 200) {
            $description = var_export(curl_getinfo($curl));

            curl_close($curl);
            throw new Exception($description);
        }

        return true;
    }

    public function update_profile_data($token, $id, $data) {
        $parameters = array();
        $parameters[] = "token=" . $token;

        $payload_str = json_encode($data);

        $curl = curl_init(UVOD_PLATFORM_API_URL.'userprofile/' . $id . "?" . implode("&", $parameters));
        //    debug($payload_str);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($payload_str)));
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($curl, CURLOPT_POSTFIELDS, $payload_str);
        $curl_response = curl_exec($curl);
        if ($curl_response === false) {
            $description = var_export(curl_getinfo($curl));
            curl_close($curl);
            throw new Exception($description);
        }

        $json_obj = json_decode($curl_response);
        // debug($json_obj);
                // checks service response
        if (isset($json_obj->isException) && $json_obj->isException == "true") {
            if($json_obj->responseCode == 403  && $json_obj->title == "Invalid Access Token"){
                $this->login_admin(true);
                unset($parameters[array_search("token=" . $token,$parameters)]);
                return $this->update_profile_data($token, $id, $data);
            } else {
                throw new Exception("Error updating profile. " . json_encode($json_obj));
            }

        }

        return $json_obj;
    }

    public function update_user_data($id, $data) {

        $admin_token = $this->login_admin();

        $parameters = array();
        $parameters[] = "token=" . $admin_token;

        $payload_str = json_encode($data);

        $curl = curl_init(UVOD_PLATFORM_API_URL.'end/user/update/'. "$id" . "?" . implode("&", $parameters));

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($payload_str)));
        curl_setopt($curl, CURLOPT_POSTFIELDS, $payload_str);
        curl_setopt($curl, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        $curl_response = curl_exec($curl);

        if ($curl_response === false) {
            $description = var_export(curl_getinfo($curl));
            curl_close($curl);
            throw new Exception($description);
        }

        $json_obj = json_decode($curl_response);

        // checks service response
        if (isset($json_obj->isException) && $json_obj->isException == "true") {
            if($json_obj->responseCode == 403){
                $this->login_admin(true);
                unset($parameters[array_search("token=" . $token,$parameters)]);
                return $this->update_user_data($id, $data);
            } else {
                throw new Exception("Error updating user. " . json_encode($json_obj));
            }
        }

        return $json_obj;
    }
}
