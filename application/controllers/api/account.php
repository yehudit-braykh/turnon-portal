<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Account extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("account_model");
		$this->load->library('session');

	}
    function register_post(){
        $data = $this->post();
        // debug($data);
		$this->response($this->account_model->register($data['email'], $data['password'], $data['first_name'],$data['last_name'], $data['country']),200);
    }
	function get_current_get(){
		$sessionData = $this->session->userdata('profile');
		// debug($sessionData);
		$this->response($sessionData, 200);
	}
	function logout_post(){
		$data = $this->post();
		$this->session->sess_destroy();
		$this->response($this->account_model->logout($data['token']),200);
	}
	function login_user_post(){
		$data = $this->post();
        // debug($data);
		$this->response($this->account_model->simple_login($data['email'], $data['password']),200);

    }

}
