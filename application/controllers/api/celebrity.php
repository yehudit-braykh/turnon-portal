<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Celebrity extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("celebrity_model");

	}

	function get_all_celebrities_get(){
		$page = $this->get('page');
		$page_size = $this->get("page_size");
		$sort_field = $this->get("sort_field");
		$descending = $this->get("descending");

		$this->response($this->celebrity_model->get_all_celebrities($page, $page_size, $sort_field, $descending),200);
    }

    function get_celebrity_get(){
		$id = $this->get("id");
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->celebrity_model->get_celebrity($id),200);
    }

}
