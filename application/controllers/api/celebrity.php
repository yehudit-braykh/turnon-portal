<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Celebrity extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("celebrity_model");
		// $this->load->library('session');
	}
	//
    // function all_celebs_get(){
    //     // $data = $this->post();
    //     // debug($this->celebrity_model->get_celebrity()->content);
	// 	$this->response($this->celebrity_model->all_celebs(),200);
    // }

    function get_celebrity_get(){
		$id = $this->get("id");
		// debug($id);
        // debug($this->celebrity_model->get_celebrity($id)->content);
		$this->response($this->celebrity_model->get_celebrity($id)->content,200);
    }

	function get_all_celebrities_get(){
        // debug($this->celebrity_model->get_all_celebrities()->content);
		$this->response($this->celebrity_model->get_all_celebrities(),200);
    }

    function get_celeb_brands_get(){
		$id = $this->get("id");
        // debug($this->celebrity_model->get_related_brands()->content);
        $this->response($this->celebrity_model->get_celeb_brands($id)->content->entries,200);
    }

    function get_celeb_videos_get(){
		$id = $this->get("id");
        // debug($this->celebrity_model->get_related_videos());
        $this->response($this->celebrity_model->get_celeb_videos($id),200);
    }

	function get_celeb_series_get(){
		$id = $this-> get("id");

		$this->response($this->celebrity_model->get_celeb_series($id)->content->entries,200);
	}

	function get_celeb_charities_get(){
		$id = $this-> get("id");

		$this->response($this->celebrity_model->get_celeb_charities($id)->content->entries,200);
	}

	function get_celeb_offers_get(){
		$id = $this-> get("id");

		$this->response($this->celebrity_model->get_celeb_offers($id)->content->entries,200);
	}

}
