<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Notifications extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("notifications_model");
		// $this->load->library('session');
	}
// funtions to get brands
    function get_notifications_get(){
		return $this->response($this->notifications_model->get_notifications(),200);
    }

    function mark_as_read_post(){
        $data = $this->post();
		return $this->response($this->notifications_model->mark_as_read($data),200);
    }


}
