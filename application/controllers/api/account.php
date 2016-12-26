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
		 $this->response($this->account_model->register($data['email'], $data['password'], $data['first_name'],$data['last_name'], $data['country']),200);
    }

	function get_current_get(){
		$profile= $this->session->userdata('profile');
		$profile->subscription= $this->session->userdata('subscription');
		$profile->purchased_products= $this->session->userdata('purchased_products');
		$this->response($profile, 200);
	}

	function logout_post(){

		$this->response($this->account_model->logout(),200);
	}

	function login_user_post(){
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
		$this->response($this->account_model->update_profile($profile->_id,$data),200);
	}

	function subscripe_post(){
		$data = $this->post();

		$this->response($this->account_model->subscripe($data),200);
	}

	function send_password_email_get(){
		$email = $this->get('email');
		$this->response($this->account_model->send_password_email($email),200);

	}

}
