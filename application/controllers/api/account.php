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
		if (!isset($data['country'])) $data['country'] = '';
		 $this->response($this->account_model->register($data['email'], $data['password'], $data['first_name'],$data['last_name'], $data['country']),200);
    }

	function get_current_get(){
		$profile_id = $this->session->userdata('profile_id');
		$token= $this->session->userdata('login_token');
		if(isset($profile_id->code))
			$this->response($profile_id,200);
	//	debug($this->account_model->get_profile($token, $profile_id));
		$this->response($this->account_model->get_profile($token, $profile_id)->content, 200);
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
		$profile_id= $this->session->userdata('profile_id');
		$this->response($this->account_model->update_profile($profile_id,$data),200);
	}

	function get_watchlist_get(){
		$this->response($this->account_model->get_watchlist(),200);
    }

	function get_favorites_get(){
		$type= $this->get('type');
		$this->response($this->account_model->get_favorites_by_type($type),200);
	}

	function subscripe_post(){
		$data = $this->post();
		$this->response($this->account_model->subscripe($data),200);
	}

	function send_password_email_get(){
		$email = $this->get('email');
		$this->response($this->account_model->send_password_email($email),200);
	}

	public function get_subscriptions_get() {
		$this->response($this->account_model->get_subscriptions()->content,200);
	}

	function get_billing_information_get(){
		$id = $this->get('id');
		$this->response($this->account_model->get_billing_information($id),200);
	}


}
