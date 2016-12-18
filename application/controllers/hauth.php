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
    		//$this->errors->create(array("category" => "get_me", "text" => json_encode($e)));
    		if ($e->getCode() == 5) {//Authentification failed! Twitter returned an error. 401 Unauthorized.
    			$this->session->unset_userdata("HA::STORE");
    			$this->load->library('HybridAuthLib', null, 'HybridAuthLib_tmp');
    			$this->hybridauthlib = $this->HybridAuthLib_tmp;
    		}
    	}

		//$this->users->get_me();
		//$this->session->set_userdata("aa", "bb");
		//$this->session->sess_read();
		//debug($this->session->all_userdata(), $this->session);
		//debug($_COOKIE, $_SESSION);
		if ($this->hybridauthlib->providerEnabled($provider)) {

			try {

				if (!$this->hybridauthlib->isConnectedWith($provider)) $this->load->view('hauth/done');
				//$this->session->unset_userdata("HA::STORE");
				//debug($service, $this->session->all_userdata());
				$service = $this->hybridauthlib->authenticate($provider);

				try{
					$profile = $service->getUserProfile();
				//	debug($profile->identifier);
				//	$this->session->set_userdata('profile', $profile);
					$fbLogin = $this->account_model->login_by_fb($profile->identifier);
					if($fbLogin->error){
						$fbRegister = $this->account_model->register($profile->email, $this->randomPassword(), $profile->firstName, $profile->lastName, NULL, NULL, $profile->identifier, true, $profile);

						if (strpos($fbRegister->message, "User already registered")){
							$this->session->set_userdata('fb_profile', $profile);
							throw new Exception("Please Login with your Email:".$profile->email.", to link to Facebook Account", 1);
						/*	$this->account_model->update_user($profile->email, array("email" => $email,
					          "first_name" => $profile->firstName,
					          "last_name" =>  $profile->lastName,
					          "fb_id" => $profile->identifier));*/

						}else{
							$userProfile = $this->account_model->login_by_fb($profile->identifier);
							debug($userProfile);
							$this->session->set_userdata('profile', $userProfile);
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
				//debug($service->getUserProfile());
				//debug($service);

				//$profile = $this->fix_hauth_profile($profile);
				//$user = $this->users->login_provider($provider, $profile);
				//debug($user);
				//debug("A");
				//debug($user, $service->api()->api('/me/friends'), $service->getUserContacts());
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


				//debug($service->getUserProfile());
				//debug($service);
				//$user = $this->users->login_provider($provider, $profile);
				//debug("A");
				//debug($user, $service->api()->api('/me/friends'), $service->getUserContacts());
				$this->load->view('hauth/done');
			}
		} else {
			die("unknown providder: $provider");
		}
	}
	public function endpoint()
	{

		header("Cache-Control: private");
		//session_start();
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
