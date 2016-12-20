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
		$profile= $this->session->userdata('profile');
		// debug($profile);
		$this->response($profile, 200);
	}
	function logout_post(){
		$data = $this->post();
		$this->session->sess_destroy();
		$this->response($this->account_model->logout($data['token']),200);
	}
	function login_user_post(){
	//	debug('111');
		$data = $this->post();
		$this->response($this->account_model->login($data['email'], $data['password']), 200);
    }

	function link_facebook_post(){
		$data = $this->post();
		$this->response($this->account_model->link_facebook($data['email'], $data['password']), 200);
    }

	function update_profile_post(){
		$data = $this->post();
		$profile= $this->session->userdata('profile');
	//	debug($data);
		$this->response($this->account_model->update_profile($profile->_id,Null,Null, $data['firstName'], $data['lastName'], Null, $data['birthdate']),200);
	}

}
