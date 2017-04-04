<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Category extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("category_model");
		// $this->load->library('session');
	}

    function get_all_categories_get(){
		$categories = $this->category_model->get_all_categories();
		// debug($categories);
		$this->response($categories, 200);
    }

	function get_category_by_id_get(){
		$cat = $this->get("category");
		$category = $this->category_model->get_category_by_id($cat);
		// debug($category);
		$this->response($category, 200);
    }

}
