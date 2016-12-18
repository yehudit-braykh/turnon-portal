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
		$this->response($this->account_model->login($data['email'], $data['password']), 200);
    }

	function link_facebook_post(){
		$data = $this->post();
		$this->response($this->account_model->link_facebook($data['email'], $data['password']), 200);
    }

	function save_profile_post(){
		$data = $this->post();
	//	debug($data);
		$token= $this->session->userdata('login_token');
		$this->response($this->account_model->save_profile($this->session->userdata('login_token'), $data['email'], $data['firstName'], $data['lastName'], $data['birthDay']),200);
	}

}
