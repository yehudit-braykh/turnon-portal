<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Vod extends REST_Controller{
	function __construct(){
		parent::__construct();
		//$this->load->model('tips');
		$this->load->model("vod_item_model");
		$this->load->model("vod_model");
	}

	function index_get(){
		$row = $this->vod_item_model->get_item_data($this->get("_id"));

		$row->related = $this->vod_item_model->get_items_related($row->series_id);
		// debug($row);
    	$this->response($row, 200);
    }
    function get_feature_images_by_cat_get(){
    	$this->response($this->medias->get_feature_images_by_cat($this->get("cat")), 200);
    }
	public function get_videos_by_category_get(){
		$uri_arr = $this->input->get('category');
		$data = array();
		// $data["category"] =
		// debug($data);
		$this->response( $this->vod_model->get_items_by_genre($uri_arr), 200);

	}

	// function get_categories_get () {
	// 	$this->load->model("categories");
	// 	$res = $this->categories->get_all();
	// 	//debug($res);
	// 	foreach ($res as $cat){
	// 		$categories[] = array("title" => $cat["title"], "_id" => $cat["_id"]->{"\$id"});
	// 	}
	//
	// 	$this->response($categories, 200);
	// }
	// function get_video_by_cat_get () {
	// 	$vods[$this->get('category')] = $this->medias->get_episodes_by_cat($this->get('category'));
	// 	$this->response($vods, 200);
	// }
	function get_categories_get () {
		$this->load->model("vod_model");
		$categories = $this->vod_model->get_genres('vod');
		// debug($categories);
		$this->response($categories, 200);
	}
}
