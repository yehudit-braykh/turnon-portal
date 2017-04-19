<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Category extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("category_model");
		// $this->load->library('session');
	}

    function get_all_categories_get(){
		$page = $this->get('page');
		$page_size = $this->get("page_size");

		$categories = $this->category_model->get_all_categories($page, $page_size);
		// debug($categories);
		$this->response($categories, 200);
    }

	function get_category_by_id_get(){
		$cat = $this->get("id");
		if(!$cat)
			$this->response("id field is mandatory",400);
		$category = $this->category_model->get_category_by_id($cat);
		// debug($category);
		$this->response($category, 200);
    }

}
