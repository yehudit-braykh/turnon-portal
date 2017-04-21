<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Knetik extends REST_Controller{
	function __construct(){
		parent::__construct();
        $this->load->library('HybridAuthLib');
        $this->load->model('knetik_model');
	}
    function get_balance_get(){
         return $this->response($this->knetik_model->get_balance(),200);
    }

	function get_used_objects_get(){
         return $this->response($this->knetik_model->get_user_objects(),200);
    }

    function save_activity_post(){
		$id = $this->post('id');
		$points = $this->post('points');
		$wallets = $this->post('wallets');
		if(!$id || !$points || !$wallets)
			$this->response("id,points,wallets fields are mandatory", 400);
        return $this->response($this->knetik_model->save_activity($id, $points, $wallets),200);
    }

	function get_catalog_get(){
         return $this->response($this->knetik_model->get_catalog(),200);
    }

	function redeem_card_post(){
		$data = $this->post('card');
		$points = $this->post('points');

		return $this->response($this->knetik_model->redeem_card($data, $points),200);
	}

	function upload_video_get(){

		$video = new stdClass();

        $video->title = "test video 1";
        $video->_id= "2133423241";
		$video->share_pts = "100";
		$video->watch_pts = "50";

		return $this->response($this->knetik_model->upload_video($video, "watch"),200);
	}


}
