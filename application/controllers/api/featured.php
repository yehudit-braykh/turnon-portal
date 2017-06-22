<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Featured extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("featured_model");
	}
    function images_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
        $page = $this->get('page');
		$page_size = $this->get("page_size");
		$sort_field = $this->get("sort_field");
		$descending = $this->get("descending");
		$keyword = $this->get("keyword");
		$filters = $this->get("filters");

		return $this->response($this->featured_model->get_images($page, $page_size, $sort_field, $descending, $keyword, $filters),200);
    }

	function get_image_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
        $id = $this->get("id");
		$slug = $this->get("slug");
		if(!$id && !$slug)
			$this->response("id or slug field is mandatory",400);

		return $this->response($this->featured_model->get_image($id, $slug),200);
    }

	function videos_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
        $page = $this->get('page');
		$page_size = $this->get("page_size");
		$sort_field = $this->get("sort_field");
		$descending = $this->get("descending");
		$keyword = $this->get("keyword");
		$filters = $this->get("filters");

		return $this->response($this->featured_model->get_videos($page, $page_size, $sort_field, $descending, $keyword, $filters),200);
    }

	function get_video_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
        $id = $this->get("id");
		$slug = $this->get("slug");
		if(!$id && !$slug)
			$this->response("id or slug field is mandatory",400);

		return $this->response($this->featured_model->get_video($id, $slug),200);
    }


}
