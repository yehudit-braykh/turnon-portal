<?php

require_once 'Mandrill.php';

class Catchmedia_model extends CI_Model {

    public function __construct() {
        $this->load->library('HybridAuthLib');
        $this->load->library('session');
        $this->load->model('account_model');
        $this->catchmedia_url="http://pa-spa.catchmedia.com/web_services/apps/v47/jsonrpc/";
        $this->partnet_id = "3074";
        $this->app_code = "";
        $this->app_ver = "4.7"
    }

    public function upload_video($video, $type){

        //    debug($video);
        $token = $this->authenticate();
        $fields = new stdClass();

        $fields->name = $type=="share"?$video->title."- share":$video->title."- watch";
        //    $fields->unique_key = $video->_id;
        $fields->type_hint = "entitlement";

        $fields->behaviors = array();

        $behavior = new stdClass();
        $behavior->type_hint = "spendable";
        $behavior->currency_code = "PTS";
        $behavior->value =  $type=="share"?$video->share_pts:$video->watch_pts;
        array_push($fields->behaviors, $behavior);

        $behavior = new stdClass();
        $behavior->type_hint = "fulfillable";
        $behavior->type_name = "wallet";
        array_push($fields->behaviors, $behavior);

        $behavior = new stdClass();
        $behavior->type_hint = "limited_gettable";
        $behavior->owned_limit = "1";
        $behaviors->active_only = "true";
        array_push($fields->behaviors, $behavior);

        //    debug(json_encode($fields));
        $response = $this->post('entitlements/', json_encode($fields), $token);

        return $response["result"];
    }



    public function save_activity($data) {
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"))->content;

        $token = $this->authenticate();

        if(isset($profile->_id)){
            if(isset($profile->catchmediaId) && $profile->catchmediaId)
                    $catchmediaId = $profile->catchmediaId;
            else
                $catchmediaId = $this->link_user($profile);

            $fields = new stdClass();
            $fields->entitlement_id = 4; /*$data->entitlement_id*/;

            $response = $this->post('users/'.$catchmediaId.'/entitlements/', json_encode($fields), $token);
            if($response->error){
                $token = $this->authenticate(true);
                $response = $this->post('users/'.$catchmediaId.'/entitlements/', json_encode($fields), $token);
            }

            if(!$response->code)
                return true;
        }
        return false;
    }

    private function authenticate($re_auth = false){
        //debug('123',$_SESSION["access_token"]);
        if($_SESSION["access_token"] && !$re_auth) return $_SESSION["access_token"];

        $fields = array();
        $fields["grant_type"] = "client_credentials";
        $fields["client_id"] = $this->user_id;
        $fields["client_secret"] = $this->user_secret;

        $result =  $this->post("oauth/token", http_build_query($fields));

        $_SESSION["access_token"] = $result["access_token"];

        return $result["access_token"];

    }

    private function post($url, $data, $token= null){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->catchmedia_url."/".$url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, 'Content-Type: application/json');
        if(isset($token))
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization : Bearer '.$token));

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }

    private function put($url, $data, $token= null){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->catchmedia_url."/".$url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, 'Content-Type: application/json');
        if(isset($token))
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization : Bearer '.$token));

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }

    private function get($url, $token, $use_token = true){
        //debug($url, $token, $use_token);
        $ch = curl_init();
        //debug($ch);
        curl_setopt($ch, CURLOPT_URL, $this->catchmedia_url."/".$url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        if($use_token)
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization : Bearer '.$token));
        //debug(curl_getinfo);
        $result = curl_exec($ch);
        curl_close($ch);


        return json_decode($result, true);
    }

}

?>
