<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Vod extends REST_Controller{
	function __construct(){
		parent::__construct();
		//$this->load->model('tips');
		$this->load->model("medias");
	}

	function index_get(){
		$row = $this->medias->get_by_id($this->get("_id"));
    	$this->response($row, 200);
    }
}
