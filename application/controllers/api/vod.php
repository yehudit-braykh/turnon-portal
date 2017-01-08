<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Vod extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model('vod_model');
	}
	function get_new_release_get () {
		 $row = $this->vod_model->get_items_by_genre('', '', 'new_releases', null, '16', 'aired_date:-1');
		 $this->response($row, 200);
	}
	function get_slider_get () {
		$row = $this->vod_model->get_slider(APP_TARGET, $sub_section=null);

		$this->response($row, 200);
	}
	function get_recommended_get () {
		 $row = $this->vod_model->get_items_by_genre('', '', 'recommended', null, '12', 'aired_date:-1');
		 $this->response($row, 200);
	}
	public function get_videos_by_category_get(){
		$uri_arr = $this->input->get('category');
		$this->response($this->vod_model->get_items_by_category($uri_arr), 200);

	}
	function get_categories_get () {
		$this->load->model("vod_model");
		$categories = $this->vod_model->get_genres('vod');
		// debug($categories);
		$this->response($categories, 200);
	}
}
