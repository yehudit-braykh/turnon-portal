<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Celebrity extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("celebrity_model");

	}

	function get_all_celebrities_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
		$page = $this->get('page');
		$page_size = $this->get("page_size");
		$sort_field = $this->get("sort_field");
		$descending = $this->get("descending");
		$keyword = $this->get("keyword");

		$this->response($this->celebrity_model->get_all_celebrities($page, $page_size, $sort_field, $descending, $keyword),200);
    }

    function get_celebrity_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
		$id = $this->get("id");
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->celebrity_model->get_celebrity($id),200);
    }

}
