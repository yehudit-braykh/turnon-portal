<?php



class Knetik_model extends CI_Model {

    public function __construct() {
        $this->load->library('HybridAuthLib');
        $this->load->library('session');
        $this->load->model('account_model');
        $this->load->model('brands_model');
        $this->load->model('campaigns_model');
        $this->load->model('video_model');
        $this->knetik_url="https://univtec-clixtv.sandbox.knetikcloud.com";
        $this->user_id = "clixtv";
        $this->user_secret= "4mCy7Qnw73Jgsxt";
        $this->currency_codes = new stdClass();
        $this->currency_codes->general = "GEPTS";
        $this->currency_codes->view = "VIPTS";
    }


    public function balance() {
        $id = $this->session->userdata("profile_id");
        $token = $this->session->userdata("login_token");

		if(!$id || !$token){
			return ;
		}

        $profile = $this->account_model->get_profile($token, $id);
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

    public function activity(){
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
                $response = $this->get('users/'.$knetikId.'/wallets/PTS', $token);
            }
            // debug($response);

            return $balance["balance"];
        }
        return false;
    }


    // ************ Points Fullfillement Methods *********************

    function save_offer($id){
        $offer = $this->brands_model->get_offer($id);

        if ($offer){

            if($offer["save_offer_id"] && $offer["save_offer_points"] && $offer["campaign"] && $offer["campaign"]["knetikId"]){
                $entitlement_id = $offer["save_offer_id"];
                $entitlement_points = $offer["save_offer_points"];
                $campaign_wallet_id = $offer["campaign"]["knetikId"];

                if($this->session->userdata("login_token") && $this->session->userdata("profile_id")){
                    $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
                    if(isset($profile->_id)){
                        if($this->deduct_wallet_points($campaign_wallet_id, $this->currency_codes->general, $entitlement_points )){
                            $token = $this->authenticate();
                            if(isset($profile->knetikId) && $profile->knetikId)
                                    $knetikId = $profile->knetikId;
                            else
                                $knetikId = $this->link_user($profile);

                            $fields = new stdClass();
                            $fields->entitlement_id = $entitlement_id;

                            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);

                            if($response["error"]){
                                $token = $this->authenticate(true);
                                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            }

                            return $response==null?array("code" => 0, "message" => "successful"):array("code" => 1, "message" => "cant get points", "response"=>$response);
                        } else {
                            return array("code" => 1, "message" => "campaign has no points");
                        }
                    } else {
                        return array("code" => 1, "message" => "can't retrieve user profile");
                    }
                } else {
                    return array("code" => 1, "message" => "not logged in");
                }
            } else {
                return array("code" => 1, "message" => "this offer has no points");
            }
        } else {
            return array("code" => 1, "message" => "offer not found");
        }

        return false;
    }

	function view_offer($id){
        $offer = $this->brands_model->get_offer($id);

        if ($offer){
            if($offer["reward_id"] && $offer["reward_points"] && $offer["campaign"] && $offer["campaign"]["knetikId"]){
                $entitlement_id = $offer["reward_id"];
                $entitlement_points = $offer["reward_points"];
                $campaign_wallet_id = $offer["campaign"]["knetikId"];

                if($this->session->userdata("login_token") && $this->session->userdata("profile_id")){
                    $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
                    if(isset($profile->_id)){
                        if($this->deduct_wallet_points($campaign_wallet_id, $this->currency_codes->general, $entitlement_points )){
                            $token = $this->authenticate();

                            if(isset($profile->knetikId) && $profile->knetikId)
                                    $knetikId = $profile->knetikId;
                            else
                                $knetikId = $this->link_user($profile);

                            $fields = new stdClass();
                            $fields->entitlement_id = $entitlement_id;

                            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            if($response["error"]){
                                $token = $this->authenticate(true);
                                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            }

                            return $response==null?array("code" => 0, "message" => "successful"):array("code" => 1, "message" => "cant get points", "response"=>$response);
                        } else {
                            return array("code" => 1, "message" => "campaign has no points");
                        }
                    } else {
                        return array("code" => 1, "message" => "cannot retrieve user profile");
                    }
                } else {
                    return array("code" => 1, "message" => "user not logged in");
                }
            } else {
                return array("code" => 1, "message" => "offer has no points");
            }
        } else {
            return array("code" => 1, "message" => "offer not found");
        }
    }

	function redeem_offer($id){
        $offer = $this->brands_model->get_offer($id);

        if ($offer){
            if($offer["redeem_offer_id"] && $offer["redeem_offer_points"] && $offer["campaign"] && $offer["campaign"]["knetikId"]){
                $entitlement_id = $offer["redeem_offer_id"];
                $entitlement_points = $offer["redeem_offer_points"];
                $campaign_wallet_id = $offer["campaign"]["knetikId"];

                if ($this->session->userdata("login_token") && $this->session->userdata("profile_id")){
                    $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
                    if(isset($profile->_id)){
                        if($this->deduct_wallet_points($campaign_wallet_id, $this->currency_codes->general, $entitlement_points )){
                            $token = $this->authenticate();
                            if(isset($profile->knetikId) && $profile->knetikId)
                                    $knetikId = $profile->knetikId;
                            else
                                $knetikId = $this->link_user($profile);

                            $fields = new stdClass();
                            $fields->entitlement_id = $entitlement_id;

                            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);

                            if($response["error"]){
                                $token = $this->authenticate(true);
                                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            }

                            return $response==null?array("code" => 0, "message" => "successful"):array("code" => 1, "message" => "cant get points", "response"=>$response);
                        } else {
                            return array("code" => 1, "message" => "campaign has no points");
                        }
                    } else {
                        return array("code" => 1, "message" => "cannot retrieve user profile");
                    }
                } else {
                    return array("code" => 1, "message" => "user not logged in");
                }
            } else {
                return array("code" => 1, "message" => "offer has no points");
            }
        } else {
            return array("code" => 1, "message" => "offer not found");
        }
    }

	function campaign_share($id){
        $campaign = $this->campaigns_model->get_campaign($id);

        if ($campaign){

            if($campaign["share_id"] && $campaign["share_pts"] && $campaign["knetikId"]){

                $entitlement_id = $campaign["share_id"];
                $entitlement_points = $campaign["share_pts"];
                $campaign_wallet_id = $campaign["knetikId"];
                if($this->session->userdata("login_token") && $this->session->userdata("profile_id")){
                    $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));

                    if(isset($profile->_id)){
                        if($this->deduct_wallet_points($campaign_wallet_id, $this->currency_codes->general, $entitlement_points )){

                            $token = $this->authenticate();
                            if(isset($profile->knetikId) && $profile->knetikId)
                                    $knetikId = $profile->knetikId;
                            else
                                $knetikId = $this->link_user($profile);

                            $fields = new stdClass();
                            $fields->entitlement_id = $entitlement_id;

                            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            if($response["error"]){
                                $token = $this->authenticate(true);
                                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            }
                            return $response==null?array("code" => 0, "message" => "successful"):array("code" => 1, "message" => "cant get points", "response"=>$response);
                        } else {
                            return array("code" => 1, "message" => "campaign has no points");
                        }
                    } else {
                        return array("code" => 1, "message" => "cannot retrieve user profile");
                    }
                } else {
                    return array("code" => 1, "message" => "user not logged in");
                }
            } else {
                return array("code" => 1, "message" => "campaign has no points");
            }
        } else {
            return array("code" => 1, "message" => "campaign not found");
        }
    }

    function campaign_ad_view($id){
        $campaign = $this->campaigns_model->get_campaign($id);

        if ($campaign){
            if($campaign["ad_view_id"] && $campaign["points_per_ad_view"] && $campaign["knetikId"]){
                $entitlement_id = $campaign["ad_view_id"];
                $entitlement_points = $campaign["points_per_ad_view"];
                $campaign_wallet_id = $campaign["knetikId"];
                if ($this->session->userdata("login_token") && $this->session->userdata("profile_id")){
                    $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
                    if(isset($profile->_id)){
                        if($this->deduct_wallet_points($campaign_wallet_id, $this->currency_codes->general, $entitlement_points )){
                            $token = $this->authenticate();
                            if(isset($profile->knetikId) && $profile->knetikId)
                                    $knetikId = $profile->knetikId;
                            else
                                $knetikId = $this->link_user($profile);

                            $fields = new stdClass();
                            $fields->entitlement_id = $entitlement_id;

                            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);

                            if($response["error"]){
                                $token = $this->authenticate(true);
                                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            }

                            return $response==null?array("code" => 0, "message" => "successful"):array("code" => 1, "message" => "cant get points", "response"=>$response);
                        } else {
                            return array("code" => 1, "message" => "campaign has no points in wallet");
                        }
                    } else {
                        return array("code" => 1, "message" => "cannot retrieve user profile");
                    }
                } else {
                    return array("code" => 1, "message" => "user not logged in");
                }
            } else {
                return array("code" => 1, "message" => "campaign has no points");
            }
        } else {
            return array("code" => 1, "message" => "campaign not found");
        }
    }


    function video_view($id){
        $video = $this->video_model->get_video_by_id($id);

        if ($video){

            if($video["view_id"] && $video["serie"] && $video["serie"]->points_per_episode_view){

                if(isset($video["campaigns"]) && count($video["campaigns"])){
                    $entitlement_id = $video["view_id"];
                    $entitlement_points = $video["serie"]->points_per_episode_view;
                    if($this->session->userdata("login_token") && $this->session->userdata("profile_id")){
                        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));

                        if(isset($profile->_id)){

                            foreach($video["campaigns"] as $campaign){
                                // debug($campaign,$campaign["knetikId"],$entitlement_points/4);
                                if(!$this->deduct_wallet_points($campaign["knetikId"], $this->currency_codes->general, $entitlement_points/4 ))
                                    return array("code" => 1, "message" => "cant get points from ".$campaign["title"]." campaign");
                            }

                            $token = $this->authenticate();
                            if(isset($profile->knetikId) && $profile->knetikId)
                                    $knetikId = $profile->knetikId;
                            else
                                $knetikId = $this->link_user($profile);

                            $fields = new stdClass();
                            $fields->entitlement_id = $entitlement_id;

                            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            if($response["error"]){
                                $token = $this->authenticate(true);
                                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            }
                            return $response==null?array("code" => 0, "message" => "successful"):array("code" => 1, "message" => "cant get points", "response"=>$response);

                        } else {
                            return array("code" => 1, "message" => "cannot retrieve user profile");
                        }
                    } else {
                        return array("code" => 1, "message" => "user not logged in");
                    }
                } else {
                    return array("code" => 1, "message" => "video has no campaigns");
                }
            } else {
                return array("code" => 1, "message" => "video has no points");
            }
        } else {
            return array("code" => 1, "message" => "video not found");
        }
    }

    function video_share($id){
        $video = $this->video_model->get_video_by_id($id);

        if ($video){

            if($video["share_id"] && $video["serie"] && $video["serie"]->points_per_episode_view){

                if(isset($video["campaigns"]) && count($video["campaigns"])){
                    $entitlement_id = $video["share_id"];
                    $entitlement_points = $video["serie"]->points_per_episode_share;
                    if($this->session->userdata("login_token") && $this->session->userdata("profile_id")){
                        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));

                        if(isset($profile->_id)){

                            foreach($video["campaigns"] as $campaign){
                                // debug($campaign,$campaign["knetikId"],$entitlement_points/4);
                                if(!$this->deduct_wallet_points($campaign["knetikId"], $this->currency_codes->general, $entitlement_points/4 ))
                                    return array("code" => 1, "message" => "cant get points from ".$campaign["title"]." campaign");
                            }

                            $token = $this->authenticate();
                            if(isset($profile->knetikId) && $profile->knetikId)
                                    $knetikId = $profile->knetikId;
                            else
                                $knetikId = $this->link_user($profile);

                            $fields = new stdClass();
                            $fields->entitlement_id = $entitlement_id;

                            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            if($response["error"]){
                                $token = $this->authenticate(true);
                                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            }
                            return $response==null?array("code" => 0, "message" => "successful"):array("code" => 1, "message" => "cant get points", "response"=>$response);

                        } else {
                            return array("code" => 1, "message" => "cannot retrieve user profile");
                        }
                    } else {
                        return array("code" => 1, "message" => "user not logged in");
                    }
                } else {
                    return array("code" => 1, "message" => "video has no campaigns");
                }
            } else {
                return array("code" => 1, "message" => "video has no points");
            }
        } else {
            return array("code" => 1, "message" => "video not found");
        }
    }

	function ad_video_view($id){
        $campaign = $this->campaigns_model->get_campaign($id);

        if ($campaign){
            if($campaign["ad_view_id"] && $campaign["ad_view_points"] && $campaign["knetikId"]){
                $entitlement_id = $campaign["ad_view_id"];
                $entitlement_points = $campaign["ad_view_points"];
                $campaign_wallet_id = $campaign["knetikId"];
                if(!$this->session->userdata("login_token") || !$this->session->userdata("profile_id")){
                    $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"));
                    if(isset($profile->_id)){
                        if($this->deduct_wallet_points($campaign_wallet_id, $this->currency_codes->general, $entitlement_points )){
                            $token = $this->authenticate();
                            if(isset($profile->knetikId) && $profile->knetikId)
                                    $knetikId = $profile->knetikId;
                            else
                                $knetikId = $this->link_user($profile);

                            $fields = new stdClass();
                            $fields->entitlement_id = $entitlement_id;

                            $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                             //debug($response);
                            if($response["error"]){
                                $token = $this->authenticate(true);
                                $response = $this->post('users/'.$knetikId.'/entitlements/', json_encode($fields), $token);
                            }

                            return $response==null?array("code" => 0, "message" => "successful"):array("code" => 1, "message" => "cant get points", "response"=>$response);
                        } else {
                            return array("code" => 1, "message" => "campaing has no points");
                        }
                    } else {
                        return array("code" => 1, "message" => "cant retrieve user profile");
                    }
                } else {
                    return array("code" => 1, "message" => "user not logged in");
                }
            } else {
                return array("code" => 1, "message" => "video has no points");
            }
        } else {
            return array("code" => 1, "message" => "video not found");
        }

    }

    // ************ Private Methods ***********************

    public function catalog(){
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

    private function get_wallet_balance($id, $wallet_code) {
        $token = $this->authenticate();
        // debug("get_wallet_balance |", $id, $wallet_code);
        if(isset($profile->knetikId) && $profile->knetikId)
            $knetikId = $profile->knetikId;
        else
            $knetikId = $this->link_user($profile);

        $balance = $this->get('users/'.$id.'/wallets/'.$wallet_code, $token);
        //debug($balance["balance"]);
        if($balance["error"] == "invalid_token"){
            $token = $this->authenticate(true);
            $balance = $this->get('users/'.$knetikId.'/wallets/PTS', $token);
        }

        return $balance["balance"];

    }

    private function deduct_wallet_points($id, $wallet_code, $points){

        $balance = $this->get_wallet_balance($id,$wallet_code);
        // debug($id, $wallet_code, $points, $balance);
        if($balance && $balance >= $points){
            $token = $this->authenticate();

            $data = new stdClass();
            $data->delta = intval('-'.$points);
            $data->reason = 'portal wallets update';

        //    debug($data, json_encode($data));

            $wallet = $this->put('users/'.$id.'/wallets/'.$wallet_code.'/balance', json_encode($data), $token);
        //    debug($wallet);
            if($balance["error"] == "invalid_token"){
                $token = $this->authenticate(true);
                $wallet = $this->put('users/'.$id.'/wallets/'.$wallet_code.'/balance', json_encode($data), $token);
            }

            return $wallet["successful"];
        }
        return false;
    }

    // ************ Redeem Functions ***********************

    public function redeem_card($card, $points){
        if($cart_id = $this->get_cart()){
            // debug("123",$cart_id);
            if(!($card = $this->get_card($card))["code"]){
                // debug($card);
                if(!($cart_item = $this->add_item_to_cart($cart_id, $card))["code"]){
                    // debug($cart_item);
                    if(!($invoice = $this->create_invoice($cart_id))["code"]){
                        // debug($invoice);
                        if(!($finish_invoice = $this->complete_invoice($invoice))["code"]){
                            // debug($finish_invoice);
                        } else {
                            return array("code" => 1, "message" => "cannot complete invoice", "respone" => $finish_invoice);
                        }
                    } else{
                        return array("code" => 1, "message" => "cannot create invoice", "respone" => $invoice);
                    }
                } else {
                    return array("code" => 1, "message" => "cannot add Card to cart", "respone" => $cart_item);
                }
            } else {
                return array("code" => 1, "message" => "cannot get Card", "respone" => $card);
            }
        } else {
            return array("code" => 1, "message" => "cannot create Cart", "respone" => $cart_id);
        }
    }

    private function get_cart(){

        $token = $this->authenticate();
        $profile = $this->account_model->get_profile($this->session->userdata("login_token"), $this->session->userdata("profile_id"))->content;

        $cart = $this->post('carts?owner='.$profile->knetikId.'&currency_code=PTS', null, $token);

        return $cart;
    }

    private function get_card($id){

        $token = $this->authenticate();
        $card = $this->get('store/items/'.$id, $token);

        if($card["error"] == "invalid_token"){
            $token = $this->authenticate(true);
            $card=$this->get('store/items/'.$id, $token);
        }
        return $card["content"][0];
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

    // ************ END - Redeem Functions ***********************

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


    // *************  Restfull methods **********************

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
