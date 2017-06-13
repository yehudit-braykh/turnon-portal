<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Sitemap extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("sitemap_model");
	}
    function index_get(){
		header("Cache-Control: max-age=".CACHE_TTL);

        $this->output->set_content_type('application/xml')->set_output($this->sitemap_model->index()->asXml());
        
    }

}
