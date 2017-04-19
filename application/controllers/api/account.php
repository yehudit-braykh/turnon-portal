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
		// debug($token, $profile_id);
		$this->response($this->account_model->get_profile($token, $profile_id), 200);
	}

	function logout_post(){
		$this->response($this->account_model->logout(),200);
	}

	function login_user_post(){
		$data = $this->post();
		$this->response($this->account_model->login($data['email'], $data['password']), 200);
    }
	// for testing purboses .. shouldn't be user by the portal
	function login_with_fb_post(){
		$data = $this->post();
		$this->response($this->account_model->login_by_fb($data['fbid']), 200);
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

	function add_watchlist_item_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->add_favorite($id, "watchlist"),200);
    }

	function remove_watchlist_item_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->remove_favorite($id, "watchlist"),200);
	}

	function get_favorite_celebrities_get(){

		$this->response($this->account_model->get_favorite_celebrities(),200);
	}

	function add_favorite_celebrity_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->add_favorite($id, "favoriteCelebs"),200);
    }

	function remove_favorite_celebrity_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->remove_favorite($id, "favoriteCelebs"),200);
	}

	function get_favorite_charities_get(){

		$this->response($this->account_model->get_favorite_charities(),200);
	}

	function add_favorite_charity_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->add_favorite($id, "favoriteCharities"),200);
    }

	function remove_favorite_charity_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->remove_favorite($id, "favoriteCharities"),200);
	}

	function get_favorite_brands_get(){

		$this->response($this->account_model->get_favorite_brands(),200);
	}

	function add_favorite_brand_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->add_favorite($id, "favoriteBrands"),200);
    }

	function remove_favorite_brand_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->remove_favorite($id, "favoriteBrands"),200);
	}

	function get_favorite_categories_get(){

		$this->response($this->account_model->get_favorite_categories(),200);
	}

	function add_favorite_category_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->add_favorite($id, "favoriteCategories"),200);
    }

	function remove_favorite_category_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->remove_favorite($id, "favoriteCategories"),200);
	}

	function get_saved_offers_get(){

		$this->response($this->account_model->get_saved_offers(),200);
	}

	function save_offer_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->add_favorite($id, "offersSaved"),200);
    }

	function unsave_offer_post(){
		$id = $this->post('id');
		if(!$id)
			$this->response("id field is mandatory",400);
		$this->response($this->account_model->remove_favorite($id, "offersSaved"),200);
	}

	function send_password_email_get(){
		$email = $this->get('email');
		$this->response($this->account_model->send_password_email($email),200);
	}



}
