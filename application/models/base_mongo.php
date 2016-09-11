<?php

class base_mongo extends CI_Model {
	var $table = "";
    function __construct($collection){
    	$this->collection = $collection;
    	$CI =& get_instance();
    	$this->ci = $CI;
    	$this->ci->load->library('mongo_db');
        parent::__construct();
    }
    function get_all(){
    	return $this->ci->mongo_db->get($this->collection);
    }
    function get_by_id($id){
    	return $this->ci->mongo_db->get_where(array("_id" => $id), $this->collection);
    }
}