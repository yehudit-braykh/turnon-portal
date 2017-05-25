<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Env extends REST_Controller{
	function __construct(){
		parent::__construct();

	}

    function catchmedia_api_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
		$this->response(CATCHMEDIA_SERVER,200);
    }

}
