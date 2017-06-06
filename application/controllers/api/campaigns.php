<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Campaigns extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("campaigns_model");
	}
    function index_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
        $page = $this->get('page');
		$page_size = $this->get("page_size");
		$sort_field = $this->get("sort_field");
		$descending = $this->get("descending");
		$keyword = $this->get("keyword");

		return $this->response($this->campaigns_model->get_campaigns($page, $page_size, $sort_field, $descending, $keyword),200);
    }

	function get_campaign_by_id_get(){
		header("Cache-Control: max-age=".CACHE_TTL);
        $id = $this->get("id");
		if(!$id)
			$this->response("id field is mandatory",400);

		return $this->response($this->campaigns_model->get_campaign_by_id($id),200);
    }

}
