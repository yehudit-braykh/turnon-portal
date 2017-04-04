<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Brands extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("brands_model");
	}
	// funtions to get brands
    function get_brand_get(){

		return $this->response($this->brands_model->get_brand($this->get("id")),200);
    }

	function get_charity_get(){

		return $this->response($this->brands_model->get_charity($this->get("id")),200);
    }

	function get_offer_get(){

		return $this->response($this->brands_model->get_offer($this->get("id")),200);
    }

    function get_brand_offers_get(){
		$id = $this->get("id");
        $this->response($this->brands_model->get_brand_offers($id),200);
    }

	function get_brand_videos_get(){
		$id = $this->get("id");
        $this->response($this->brands_model->get_brand_videos($id),200);
    }

	function get_brand_celebs_get(){
		$id = $this->get("id");
        $this->response($this->brands_model->get_brand_celebs($id),200);
    }

	function get_brands_object_get () {
		$this->response($this->brands_model->get_brands_object(), 200);
	}

	function get_brands_array_get () {
		$this->response($this->brands_model->get_brands_array(), 200);
	}

	function get_offers_array_get () {
		$this->response($this->brands_model->get_offers_array(), 200);
	}

	function get_charities_object_get () {
		$this->response( $this->brands_model->get_charities_object(), 200);
	}

	function get_charities_array_get () {
		$this->response( $this->brands_model->get_charities_array(), 200);
	}

	function get_all_brands_and_charities_object_get () {
		$this->response($this->brands_model->get_all_brands_and_charities_object(), 200);
	}

	// functions for the related objects
	function get_related_offers_get () {
		$id = $this->get("id");
		$this->response( $this->brands_model->get_related_offers($id), 200);
	}
}
