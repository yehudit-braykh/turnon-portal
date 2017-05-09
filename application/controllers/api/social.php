<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';
//require APPPATH.'/libraries/tumblr/RequestException.php';
//require APPPATH.'/libraries/tumblr/RequestHandler.php';
use Tumblr\API;

class Social extends REST_Controller{
	function __construct(){
		parent::__construct();
        $this->load->library('HybridAuthLib');
		// $this->load->library('session');
	}
    function twitter_post(){

		$message = $this->post("message");
		$link = $this->post("link");
		$picture = $this->post("picture");


		$adapter = $this->hybridauthlib->authenticate( "Twitter" );

	  	$adapter->setUserStatus(
	    	array(
	       		"message" => $message,
	       		"link"    => $link,
	       		"picture" => $picture
	    	)
	  	);

		return $adapter;

    }

	function facebook_post(){
    	$message = $this->post("message");
		$link = $this->post("link");
		$picture = $this->post("picture");

	  	$adapter = $this->hybridauthlib->authenticate( "Facebook" );

	  	$adapter->setUserStatus(
	    	array(
	       		"message" => $message,
	       		"link"    => $link,
	       		"picture" => $picture
	    	)
	  	);

		return $adapter;

    }

    function tumblr_post(){
		$message = $this->post("message");
		$link = $this->post("link");
		$picture = $this->post("picture");

	  	$adapter = $this->hybridauthlib->authenticate( "Tumblr" );

	  	$adapter->setUserStatus(
	    	array(
	       		"message" => $message,
	       		"link"    => $link,
	       		"picture" => $picture
	    	)
	  	);

		return $adapter;

    }

}
