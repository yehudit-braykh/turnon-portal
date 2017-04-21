<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Video extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("video_model");

	}

	function get_video_by_id_get(){
		$id = $this->get("id");
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->video_model->get_video_by_id($id),200);
    }

	function add_view_put(){
		$id = $this->put("id");
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->video_model->add_view($id),200);
    }


	// public function get_serie_by_id_get(){
	// 	$id= $this->get('id');
	// 	if(!$id)
	// 		$this->response("id field is mandatory",400);
	// 	$this->response($this->video_model->get_serie_by_id($id),200);
	// }

}
