<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Knetik extends REST_Controller{
	function __construct(){
		parent::__construct();
        $this->load->library('HybridAuthLib');
        $this->load->model('knetik_model');
	}

	function balance_get(){
         return $this->response($this->knetik_model->balance(),200);
    }

	function activity_get(){
         return $this->response($this->knetik_model->activity(),200);
    }

	function save_offer_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory", 400);
        return $this->response($this->knetik_model->save_offer($id),200);
    }

	function view_offer_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory", 400);
        return $this->response($this->knetik_model->view_offer($id),200);
    }

	function redeem_offer_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory", 400);
        return $this->response($this->knetik_model->redeem_offer($id),200);
    }

	function campaign_share_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory", 400);
        return $this->response($this->knetik_model->campaign_share($id),200);
    }

	function campaign_ad_view_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory", 400);
        return $this->response($this->knetik_model->campaign_ad_view($id),200);
    }

	function video_share_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory", 400);
        return $this->response($this->knetik_model->video_share($id),200);
    }

	function view_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory", 400);
        return $this->response($this->knetik_model->view($id),200);
    }

	function ad_video_view_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory", 400);
        return $this->response($this->knetik_model->ad_video_view($id),200);
    }

	function catalog_get(){
         return $this->response($this->knetik_model->catalog(),200);
    }

	function redeem_card_post(){
		$data = $this->post('card');
		$points = $this->post('points');

		return $this->response($this->knetik_model->redeem_card($data, $points),200);
	}

}
