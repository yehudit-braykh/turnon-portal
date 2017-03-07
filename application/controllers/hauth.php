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
		$this->load->library('session');
		$this->load->model('account_model');

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

					$this->account_model->hybrid_login($profile, $provider);


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
}

/* End of file hauth.php */
/* Location: ./application/controllers/hauth.php */
