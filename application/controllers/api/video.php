<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Video extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("video_model");
		
	}

    function get_epg_get(){
		$channel = $this->get("channel");

		$this->response($this->video_model->get_epg($channel)->content->entries,200);
    }

	function list_channels_get(){

		$this->response($this->video_model->list_channels(),200);
    }

	function get_video_by_id_get(){
		$id = $this->get("id");
		$this->response($this->video_model->get_video_by_id($id),200);
    }

    public function get_videos_by_featured_get(){
        $cat = $this->get("category");

		$this->response($this->video_model->get_videos_by_featured($cat),200);
	}

	public function get_videos_by_category_get(){
        $cat = $this->get("category");

		$this->response($this->video_model->get_videos_by_category($cat),200);
	}

    public function search_get(){
        $txt = $this->get("text");
		$this->response($this->video_model->search($txt),200);
	}

    public function get_all_series_get(){

		$this->response($this->video_model->get_all_series()->content,200);
	}

	public function get_serie_by_id_get(){
		$id= $this->get('id');

		$this->response($this->video_model->get_serie_by_id($id)->content,200);
	}

}
