<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class HAuth extends CI_Controller {

	public function index()
	{
		header("Cache-Control: private");
		$this->load->view('hauth/home');

	}

	public function login($provider){
		error_reporting(7);
		header("Cache-Control: private");
		//$this->load->model('users');
		$this->load->model('account_model');
		//$this->load->library('Aauth');
		//$this->load->library('aws_sdk');
		$this->load->library('session');

		try {
    		$this->load->library('HybridAuthLib');
    	} catch (Exception $e) {
    		if ($e->getCode() == 5) {//Authentification failed! Twitter returned an error. 401 Unauthorized.
    			$this->session->unset_userdata("HA::STORE");
    			$this->load->library('HybridAuthLib', null, 'HybridAuthLib_tmp');
    			$this->hybridauthlib = $this->HybridAuthLib_tmp;
    		}
    	}

		if ($this->hybridauthlib->providerEnabled($provider)) {

			try {

				if (!$this->hybridauthlib->isConnectedWith($provider)) $this->load->view('hauth/done');
				$service = $this->hybridauthlib->authenticate($provider);

				try{
					$profile = $service->getUserProfile();
					$fbLogin = $this->account_model->login_by_fb($profile->identifier);
				//	debug($fbLogin);
					if(!$fbLogin->content){
					//	debug($profile);
						$fbRegister = $this->account_model->register($profile->email, $this->randomPassword(), $profile->firstName, $profile->lastName, NULL, NULL, $profile->identifier, true, $profile);

						if (strpos($fbRegister->message, "User already registered")){
							$this->session->set_userdata('fb_profile', $profile);
							throw new Exception("Please Login with your Email:".$profile->email.", to link to Facebook Account", 1);
						}else{
							$fb_login= $this->account_model->login_by_fb($profile->content->identifier);
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
				}
				catch( Exception $e ){
					// User not connected?
					if( $e->getCode() == 6 || $e->getCode() == 7 ){
						// log the user out (erase his session locally)
						$service->logout();
						$service = $this->hybridauthlib->authenticate($provider);
						$profile = $service->getUserProfile();
					}
					if( $e->getCode() == 1){
						$error = new stdClass();
						$error->code = $e->getCode();
						$error->message = $e->getMessage();
						$this->session->set_userdata('profile', $error);
					}
				}

				$_SESSION["social"] = (array) $profile;
				$_SESSION["social"]["with"] = $provider;
				$_SESSION["social"]["since"] = date("d/m/Y");

				// redirect('/');
				$this->load->view('hauth/done');
			} catch(Exception $e) {
				$service = $this->hybridauthlib->authenticate($provider);
				try{
					$profile = $service->getUserProfile();
				}
				catch( Exception $e ){
					// User not connected?
					if( $e->getCode() == 6 || $e->getCode() == 7 ){
						// log the user out (erase his session locally)
						$service->logout();
						$service = $this->hybridauthlib->authenticate($provider);
						$profile = $service->getUserProfile();
					}
				}

				$this->load->view('hauth/done');
			}
		} else {
			die("unknown providder: $provider");
		}
	}
	public function endpoint()
	{

		header("Cache-Control: private");
		log_message('debug', 'controllers.HAuth.endpoint called.');
		log_message('info', 'controllers.HAuth.endpoint: $_REQUEST: '.print_r($_REQUEST, TRUE));

		if ($_SERVER['REQUEST_METHOD'] === 'GET')
		{
			log_message('debug', 'controllers.HAuth.endpoint: the request method is GET, copying REQUEST array into GET array.');
			$_GET = $_REQUEST;
		}
		log_message('debug', 'controllers.HAuth.endpoint: loading the original HybridAuth endpoint script.');
		require_once APPPATH.'/libraries/hybridauth/index.php';

	}

	function randomPassword() {
	    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#.';
	    $pass = array(); //remember to declare $pass as an array
	    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
	    for ($i = 0; $i < 16; $i++) {
	        $n = rand(0, $alphaLength);
	        $pass[] = $alphabet[$n];
	    }

	    return implode($pass); //turn the array into a string
	}

}

/* End of file hauth.php */
/* Location: ./application/controllers/hauth.php */
