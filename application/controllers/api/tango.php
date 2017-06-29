<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Tango extends REST_Controller{
	function __construct(){
		parent::__construct();
        $this->load->library('HybridAuthLib');
        $this->load->model('tango_model');
	}


	function catalog_get(){
         return $this->response($this->tango_model->getCatalog(),200);
    }

	function customers_get(){
         return $this->response($this->tango_model->getCustomers(),200);
    }

	function order_post(){
		$item = $this->post("item");
		$points = $this->post("points");

		if(!$item || !$points)
			$this->response("item and points fields is mandatory",400);
		if($points <=0)
			$this->response("invaled points value is mandatory, must be number greater than zero",400);
         return $this->response($this->tango_model->createOrder($item, $points),200);
    }



}
