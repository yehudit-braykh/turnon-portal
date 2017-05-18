<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Cache extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("fastcache_model");
		// $this->load->library('session');
	}


    function clear_cache_get(){

		$this->fastcache_model->clean_cache();

        $response = "Cache Has Been Cleared Successfully";
		$this->response( $response , 200);
    }

	function check_cache_get(){
		$key = $this->get("key");
		$data = $this->get("data");

		if($this->fastcache_model->get_cache($key)){
			$this->response( 'Item found in cache' , 200);
		} else {
			$this->fastcache_model->set_cache($key, $data);
			$this->response( 'Item not found in cache ... saving to cache' , 200);
		}
	}

	function get_cache_info_get(){
		$this->response( $this->fastcache_model->get_cache_info(),200);
	}



}
