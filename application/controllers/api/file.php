<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class file extends REST_Controller{
	function __construct(){
		parent::__construct();
		$this->load->model("File_model");
    }

    function upload_file_post(){
		$id = $this->get("_id");
		//debug($file);
        // debug($this->celebrity_model->get_celebrity($id)->content);
		//$this->response($this->celebrity_model->get_celebrity($id)->content,200);
    }


}
