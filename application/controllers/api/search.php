<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Search extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("search_model");
	}

    function index_get(){

        $keyword = $this->get("keyword");
		$tag = $this->get("tag");
		if(!$keyword && !$tag)
			$this->response("tag or keyword field is mandatory",400);
        $page = $this->get("page");
        $page_size = $this->get("page_size");

        $results = $this->search_model->search($keyword, $tag,$page, $page_size);

		$this->response($results, 200);
    }


}
