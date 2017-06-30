<?php



class Tango_model extends CI_Model {

    public function __construct() {
        $this->load->library('HybridAuthLib');
        $this->load->model('knetik_model');

        $this->platformName = "ClixTVTest"; // RaaS v2 API Platform Name
        $this->platformKey = 'FSMikJuJTYuSs@yGtjEurgU&TVwF$cDVpgk$uMuRNWqVK'; // RaaS v2 API Platform Key

        $this->accountIdentifier = "clixtvacct";
        $this->customerIdentifier = "clixtvcust";
        $this->clixEmail = "noreply@clixtv.com";
        $this->clixName = "ClixTV";
        $this->conversionRate = 0.01;

        $this->client = new RaasLib\RaasClient($this->platformName, $this->platformKey);
    }


    public function getCatalog(){

        $catalog =  $this->client->getCatalog();
        return $catalog->getCatalog();
    }


    public function createOrder($item, $points) {
        $orders =  $this->client->getOrders();

        if($user = $this->getUser()){
            $customer = $this->getCustomer($user);
            $account = $this->getClixAccount();

            if($customer && $account){
                if($catalogItem = $this->getCatalogItem($item)){
                    $value = $points * $this->conversionRate;

                    $balance = $this->knetik_model->balance()["balance"];

                    if($points > $balance)
                        return array("code" => 2, "message" => "no Sufficient Points Balance, current balance is:".$balance." points");
                    if($value < $catalogItem->minValue || $value > $catalogItem->maxValue)
                        return array("code" => 3, "message" => "Ammount(".$value."USD) not in Allowed Range. MIN = ".$catalogItem->minValue."USD , MAX= ".$catalogItem->maxValue."USD");

                    $order = new stdClass;
                    $order->accountIdentifier = $this->accountIdentifier;
                    $order->amount =  $value;
                    $order->customerIdentifier = $this->customerIdentifier;
                    $order->recipient =  (object)array(
                        "email" => $user->email,
                        "firstName" => $user->firstName,
                        "lastName" => $user->lastName
                    );
                    $order->sendEmail = true;
                    $order->sender = (object)array(
                        "email" => $this->clixEmail,
                        "firstName" => $this->clixName,
                    );
                    $order->utid = $item;

                    try {
                        $response =  $orders->createOrder($order);
                        if($response && $response->status && $response->status =="COMPLETE")
                            $this->knetik_model->deduct_wallet_points($user->knetikId, "PTS", $points);
                        return $response;
                    } catch (Exception $e ){
                        return array("code" => 4, "message" => "Cannot Generate Card", "response" => $e);
                    }

                } else {
                    return array("code" => 1, "message" => "Card does not exist");
                }
            } else {
                return array("code" => 1, "message" => "cannot connect Tango API");
            }
        } else {
            return array("code" => 1, "message" => "no Logged in user");
        }
    }

    private function getClixAccount(){
        $accounts = $this->client->getAccounts();

        return $accounts->getAccount($this->accountIdentifier);
    }

    private function getCustomer($user){
        try{
            $customers = $this->client->getCustomers();
            return $customers->getCustomer($user->_id);
        } catch (Exception $e){
            return $this->createCustomer($user);
        }
    }

    private function createCustomer($user){
        $customers = $this->client->getCustomers();

        $customer = new stdClass;
        $customer->customerIdentifier = $user->_id;
        $customer->displayName = $user->firstName." ".$user->lastName;

        return $customers->createCustomer($customer);
    }

    private function getUser(){
        $this->load->model('account_model');
        $this->load->library('session');
        $id = $this->session->userdata("profile_id");
        $token = $this->session->userdata("login_token");

        if(!$id || !$token){
			return ;
		}

        return $this->account_model->get_profile($token, $id);
    }

    private function getCatalogItem($itemId){
        $catalog = $this->getCatalog();
        foreach ($catalog->brands as $brand) {
            foreach ($brand->items as $item) {
                if($item->utid === $itemId)
                    return $item;
            }
        }
        return null;
    }



}

?>
