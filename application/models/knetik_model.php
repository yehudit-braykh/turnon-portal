<?php



class Knetik_model extends CI_Model {

    public function __construct() {
        $this->load->library('HybridAuthLib');
        $this->load->library('session');
        $this->load->model('account_model');
        $this->knetik_url="https://univtec-clixtv.sandbox.knetikcloud.com";
        $this->user_id = "clixtv";
        $this->user_secret= "4mCy7Qnw73Jgsxt";
    }


    public function get_balance() {
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
        $token = $this->authenticate();

        if(isset($profile->_id)){
            if(isset($profile->knetikId) && $profile->knetikId)
                $knetikId = $profile->knetikId;
            else
                $knetikId = $this->link_user($profile);

            $balance = $this->get('users/'.$knetikId.'/wallets/PTS', $token);
            //debug($balance);
            if($balance["error"] == "invalid_token"){
                $token = $this->authenticate(true);
                $balance = $this->get('users/'.$knetikId.'/wallets/PTS', $token);
            }

            return $balance["balance"];
        }
        return false;
    }

    public function get_user_objects(){
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
        $token = $this->authenticate();

        if(isset($profile->_id)){
            if(isset($profile->knetikId) && $profile->knetikId)
                $knetikId = $profile->knetikId;
            else
                $knetikId = $this->link_user($profile);

            $response = $this->get('users/'.$knetikId.'/inventory', $token);
            //debug($balance);
            if($response["error"] == "invalid_token"){
                $token = $this->authenticate(true);
                $response = $this->get('users/'.$knetikId.'/wallets/PTS/transactions', $token);
            }
            debug($response);

            return $balance["balance"];
        }
        return false;
    }

    public function save_activity($id, $points, $wallets) {
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
        // debug($id, $points, $wallets);
        $token = $this->authenticate();
        //debug($profile);
        if(isset($profile->_id)){
            if(isset($profile->knetikId) && $profile->knetikId)
                    $knetikId = $profile->knetikId;
            else
                $knetikId = $this->link_user($profile);

            $fields = new stdClass();
            $fields->entitlement_id = $id;

            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
            if($response["error"]){
                $token = $this->authenticate(true);
                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
            }

            return $response;
        }
        return false;
    }

    public function give_save_offer_points($id,$points, $wallet_id){
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
        // debug($id, $points, $wallet_id);
        $token = $this->authenticate();
        //debug($profile);
        if(isset($profile->_id)){
            if(isset($profile->knetikId) && $profile->knetikId)
                    $knetikId = $profile->knetikId;
            else
                $knetikId = $this->link_user($profile);

            $fields = new stdClass();
            $fields->entitlement_id = $id;

            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
            //debug($response);
            if($response["error"]){
                $token = $this->authenticate(true);
                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
            }

            return $response==null;
        }
        return false;
    }

    public function give_share_points($id,$points, $wallet_id){
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
        // debug($id, $points, $wallet_id);
        $token = $this->authenticate();
        //debug($profile);
        if(isset($profile->_id)){
            if(isset($profile->knetikId) && $profile->knetikId)
                    $knetikId = $profile->knetikId;
            else
                $knetikId = $this->link_user($profile);

            if($this->get_wallet_balance($wallet_id, '')<= $points){

                $wallet = $this->deduct_wallet_points($wallet_id, '', $points);

                if ($wallet && !$wallet["code"]){
                    $fields = new stdClass();
                    $fields->entitlement_id = $id;

                    $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                    //debug($response);
                    if($response["error"]){
                        $token = $this->authenticate(true);
                        $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                    }

                    return $response==null;
                }
            }
        }
        return false;
    }

    public function give_view_points($id,$points, $wallets){
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
        // debug($id, $points, $wallet_id);
        $token = $this->authenticate();
        //debug($profile);
        if(isset($profile->_id)){
            if(isset($profile->knetikId) && $profile->knetikId)
                    $knetikId = $profile->knetikId;
            else
                $knetikId = $this->link_user($profile);

            $fields = new stdClass();
            $fields->entitlement_id = $id;

            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
            //debug($response);
            if($response["error"]){
                $token = $this->authenticate(true);
                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
            }

            return $response==null;
        }
        return false;
    }

    private function get_wallet_balance($id, $wallet_code) {
        $token = $this->authenticate();

        if(isset($profile->knetikId) && $profile->knetikId)
            $knetikId = $profile->knetikId;
        else
            $knetikId = $this->link_user($profile);

        $balance = $this->get('users/'.$id.'/wallets/'.$wallet_code, $token);
        //debug($balance);
        if($balance["error"] == "invalid_token"){
            $token = $this->authenticate(true);
            $balance = $this->get('users/'.$knetikId.'/wallets/PTS', $token);
        }

        return $balance["balance"];

    }

    private function deduct_wallet_points($id, $wallet_code, $points){

        $balance = $this->get_wallet_balance($id,$wallet_code);

        if($balance && $balance >= $points){
            $token = $this->authenticate();

            $data = new stdClass();
            $data->delta = "-".$points;
            $data->delta = 'portal wallets update';

            $wallet = $this->put('users/'.$id.'/wallets/'.$wallet_code.'/balance', $data, $token);
            //debug($balance);
            if($balance["error"] == "invalid_token"){
                $token = $this->authenticate(true);
                $wallet = $this->put('users/'.$id.'/wallets/'.$wallet_code.'/balance', $data, $token);
            }

            return $wallet;
        }
        return false;
    }

    public function get_catalog(){
        $token = $this->authenticate();
        $catalog=$this->get('store/items?filter_published=true&filter_displayable=true', $token);
        //debug($catalog);
        if($catalog["error"] == "invalid_token"){
            $token = $this->authenticate(true);
            $catalog=$this->get('store/items?filter_published=true&filter_displayable=true', $token);
        }
        //debug($catalog);
        return $catalog["content"];
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
        return $cart;
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
        return $invoice[0]["id"];
    }

    private function complete_invoice($invoice_id){
        $token = $this->authenticate();

        $data = new stdClass();
        $data->status = 'processing';


        $invoice = $this->put('invoices/'.$invoice_id.'/payment-status',json_encode($data), $token);
        return $item;
    }

    private function get_user_by_email($email){

        // $fields = new stdClass();
        $token = $this->authenticate();
        // $fields->filter_email = $email;
        // debug($email);
        $result=$this->get("users?filter_email=".$email, $token);
        if($result["error"] == "invalid_token"){
            $token = $this->authenticate(true);
            $result=$this->get('users?filter_email='.$email, $token);
        }
        if(!$result["code"] && $result["number_of_elements"]>0 ){
            $user_id= $result["content"][0]["id"];
        }
        return $user_id;

    }

    private function link_user($profile){

        $user_id = $this->get_user_by_email($profile->email);
        if(!$user_id){
            $fields = new stdClass();
            $token = $this->authenticate();
            $fields->email = $profile->email;
            $fields->first_name = $profile->firstName;
            $fields->last_name = $profile->firstName;
            $fields->username = $profile->firstName." ".$profile->lastName;
            $fields->password = $profile->_id;
            $fields->currency_code ="PTS";

            $result=$this->post('users', json_encode($fields), $token);
            if($result["error"] == "invalid_token"){
                $token = $this->authenticate(true);
                $result=$this->post('users', json_encode($fields), $token);
            }
            if(!$result->code){
                $user_id= $result->id;
            }
        }
        $this->account_model->update_profile($profile->_id,array('knetikId' => (string)$user_id));

        return $user_id;
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
        // debug($url, $token, $use_token);
        $ch = curl_init();
        //debug($ch);
        curl_setopt($ch, CURLOPT_URL, $this->knetik_url."/".$url);
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
