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

	function redeem_post(){
		$item = $this->post("cardId");
		$points = $this->post("points");

		if(!$cardId || !$points)
			$this->response("cardId and points fields is mandatory",400);
		if($points <=0)
			$this->response("invalid points value is mandatory, must be number greater than zero",400);
         return $this->response($this->tango_model->createOrder($cardId, $points),200);
    }



}
