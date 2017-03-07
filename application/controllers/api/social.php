<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';
//require APPPATH.'/libraries/tumblr/RequestException.php';
//require APPPATH.'/libraries/tumblr/RequestHandler.php';
use Tumblr\API;

class Social extends REST_Controller{
	function __construct(){
		parent::__construct();
        $this->load->library('HybridAuthLib');
        $this->load->library('HybridAuthLib');
		// $this->load->library('session');
	}
    function post_twitter_status_post(){
        $data= $this->post();
    //    debug($data);
        $service = $this->hybridauthlib->authenticate("Twitter");

        debug($service->getAccessToken());

        $accessToken = $service->getAccessToken();
        $service->setUserStatus($data);

    }

    function post_tumblr_status_post(){
        $data= array();

		$service = $this->hybridauthlib->authenticate("Tumblr");

        debug($service->getUserProfile());

        $accessToken = $service->getAccessToken();
        $service->setUserStatus($data);



        debug($accessToken);

    }

}
