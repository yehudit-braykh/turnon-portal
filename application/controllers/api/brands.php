<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Brands extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("brands_model");
		// $this->load->library('session');
	}
// funtions to get brands
    function get_brand_get(){

		$id= $this->get("id");
        // $data = $this->post();
        // debug($this->brands_model->get_brand());
		return $this->response($this->brands_model->get_brand($id),200);
    }

    function get_brand_offers_get(){
		$id = $this->get("id");
        $this->response($this->brands_model->get_brand_offers($id),200);
    }

	function get_brand_videos_get(){
		$id = $this->get("id");
        //debug($this->brands_model->get_related_videos($id));
        $this->response($this->brands_model->get_brand_videos($id),200);
    }

	function get_brand_celebs_get(){
		$id = $this->get("id");
        $this->response($this->brands_model->get_brand_celebs($id),200);
    }

	function get_list_brands_get(){
        //debug($this->brands_model->get_list_brands());
        $this->response($this->brands_model->get_list_brands()->content,200);
    }

	function get_brands_get () {
		$this->response( $this->brands_model->get_all_brands(), 200);
	}

	function get_brands_object_get () {
		$this->response($this->brands_model->get_brands_obj(), 200);
	}

	function get_brands_array_get () {
		$this->response($this->brands_model->get_brands_array(), 200);
	}

	function get_charities_get () {
		$this->response( $this->brands_model->get_all_charities(), 200);
	}

	function get_charities_array_get () {
		$this->response( $this->brands_model->get_all_charities_array(), 200);
	}
// functions for the related objects







}
