<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Brands extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("brands_model");
	}
	// funtions to get brands
    function get_brand_get(){
		$id = $this->get("id");
		if(!$id)
			$this->response("id field is mandatory",400);

		return $this->response($this->brands_model->get_brand($id),200);
    }

	function get_charity_get(){
		$id = $this->get("id");
		if(!$id)
			$this->response("id field is mandatory",400);

		return $this->response($this->brands_model->get_charity($id),200);
    }

	function get_offer_get(){
		$id = $this->get("id");
		if(!$id)
			$this->response("id field is mandatory",400);

		return $this->response($this->brands_model->get_offer($id),200);
    }

	function get_brands_array_get () {
		$page = $this->get('page');
		$page_size = $this->get("page_size");
		$sort_field = $this->get("sort_field");
		$descending = $this->get("descending");

		$this->response($this->brands_model->get_brands_array($page, $page_size, $sort_field, $descending), 200);
	}

	function get_offers_array_get () {
		$page = $this->get('page');
		$page_size = $this->get("page_size");
		$sort_field = $this->get("sort_field");
		$descending = $this->get("descending");
		$this->response($this->brands_model->get_offers_array($page, $page_size, $sort_field, $descending), 200);
	}

	function get_charities_array_get () {
		$page = $this->get('page');
		$page_size = $this->get("page_size");
		$sort_field = $this->get("sort_field");
		$descending = $this->get("descending");
		$this->response( $this->brands_model->get_charities_array($page, $page_size, $sort_field, $descending), 200);
	}


}
