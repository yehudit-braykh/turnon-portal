<?php

require_once 'Mandrill.php';



class Knetik_model extends CI_Model {

    public function __construct() {
        $this->load->library('HybridAuthLib');
        $this->load->library('session');
        $this->load->model('account_model');
        $this->knetik_url="https://univtec-clixtv.sandbox.knetikcloud.com";
        $this->user_id = "clixtv";
        $this->user_secret= "4mCy7Qnw73Jgsxt";
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

    public function get_balance() {
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"))->content;
        $token = $this->authenticate();
        if(isset($profile->_id)){
            if(isset($profile->knetikId) && $profile->knetikId)
                $knetikId = $profile->knetikId;
            else
                $knetikId = $this->link_user($profile);

            $balance = $this->get('users/'.$knetikId.'/wallets/PTS', $token);
            if($balance["error"] == "invalid_token"){
                $token = $this->authenticate(true);
                $balance = $this->get('users/'.$knetikId.'/wallets/PTS', $token);
            }

            return $balance["result"]["balance"];
        }
        return false;
    }

    public function save_activity($data) {
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"))->content;

        $token = $this->authenticate();

        if(isset($profile->_id)){
            if(isset($profile->knetikId) && $profile->knetikId)
                    $knetikId = $profile->knetikId;
            else
                $knetikId = $this->link_user($profile);

            $fields = new stdClass();
            $fields->entitlement_id = 4; /*$data->entitlement_id*/;

            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
            if($response->error){
                $token = $this->authenticate(true);
                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
            }

            if(!$response->code)
                return true;
        }
        return false;
    }

    public function get_catalog(){

        $catalog=$this->get('store/items?filter_published=true&filter_displayable=true', $token, false);
        if($catalog["error"] == "invalid_token"){
            $token = $this->authenticate(true);
            $catalog=$this->post('users', json_encode($fields), $token, false);
        }
        return $catalog["result"]["content"];
    }

    public function redeem_card($card, $points){
        if($cart_id = $this->get_cart()){
            $this->add_item_to_cart($cart_id, $card);
            $invoice = $this->create_invoice($cart_id);
            $this->complete_invoice($invoice);
        }


    }

    private function get_cart(){

        $token = $this->authenticate();
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"))->content;


        $cart = $this->post('carts?owner='.$profile->knetikId.'&currency_code=PTS', null, $token);
        return $cart["result"];
    }

    private function add_item_to_cart($cart_id, $item){
        $token = $this->authenticate();

        $data = new stdClass();
        $data->catalog_sku = $item['skus'][0]['sku'];
        $data->quantity = 1;

        $item = $this->post('carts/'.$cart_id.'/items',json_encode($data), $token);
        return $item;
    }

    private function create_invoice($cart_id){


        $token = $this->authenticate();

        $data = new stdClass();
        $data->cart_guid = $cart_id;

        $invoice = $this->post('invoices',json_encode($data), $token);
        return $invoice["result"][0]["id"];
    }

    private function complete_invoice($invoice_id){
        $token = $this->authenticate();

        $data = new stdClass();
        $data->status = 'processing';


        $invoice = $this->put('invoices/'.$invoice_id.'/payment-status',json_encode($data), $token);
        return $item["result"];
    }

    private function link_user($profile){

        $fields = new stdClass();
        $token = $this->authenticate();
        $fields->email = $profile->email;
        $fields->first_name = $profile->firstName;
        $fields->last_name = $profile->firstName;
        $fields->username = $profile->firstName." ".$profile->lastName;
        $fields->password = $profile->_id;
        $fields->currency_code ="PTS";

        $result=$this->post('users', json_encode($fields), $token);
        if($catalog["error"] == "invalid_token"){
            $token = $this->authenticate(true);
            $result=$this->post('users', json_encode($fields), $token);
        }

        if(!$result->code){
            $user_id= $resul->result->id;
            $this->account_model->update_profile($profile->_id,array('knetikId' => $user_id));
        }
        return $user_id;
    }

    private function authenticate($re_auth = false){
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
        curl_setopt($ch, CURLOPT_URL, $this->knetik_url."/".$url);
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
        curl_setopt($ch, CURLOPT_URL, $this->knetik_url."/".$url);
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
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->knetik_url."/".$url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        if($use_token)
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization : Bearer '.$token));

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }

}

?>
