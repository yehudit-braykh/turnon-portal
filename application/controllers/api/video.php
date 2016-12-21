<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Video extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("video_model");
		// $this->load->library('session');
	}
	//
    // function all_celebs_get(){
    //     // $data = $this->post();
    //     // debug($this->celebrity_model->get_celebrity()->content);
	// 	$this->response($this->celebrity_model->all_celebs(),200);
    // }

    function get_epg_by_name_get(){
		$id = $this->get("id");
		// debug($id);
        // debug($this->celebrity_model->get_celebrity($id)->content);
		$this->response($this->celebrity_model->get_celebrity($id)->content,200);
    }



}
