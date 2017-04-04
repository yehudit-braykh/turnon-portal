<?php
class Brands_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_brand($id){
		if ($this->fastcache_model->get_cache("get_brand".$id))
			return $this->fastcache_model->get_cache("get_brand".$id);
		$data =  $this->apiCall('brand/'.$id)->entries;
		$this->fastcache_model->set_cache("get_brand".$id,$data);
		return $data;
	}

	public function get_charity($id){
		if ($this->fastcache_model->get_cache("get_charity".$id))
			return $this->fastcache_model->get_cache("get_charity".$id);
		$data =  $this->apiCall('charity/'.$id)->entries;
		$this->fastcache_model->set_cache("get_charity".$id,$data);
		return $data;
	}

	public function get_offer($id){
		if ($this->fastcache_model->get_cache("get_offer".$id))
			return $this->fastcache_model->get_cache("get_offer".$id);
		$data =  $this->apiCall('offer/'.$id)->entries;
		$this->fastcache_model->set_cache("get_offer".$id,$data);
		return $data;
	}

    public function get_list_brands(){
		if ($this->fastcache_model->get_cache("get_list_brands"))
			return $this->fastcache_model->get_cache("get_list_brands");
		$data =  $this->apiCall('brand')->entries;
		$this->fastcache_model->set_cache("get_list_brands",$data);
		return $data;
    }

	function get_brands_object () {

		if ($this->fastcache_model->get_cache("get_brands_object"))
			return $this->fastcache_model->get_cache("get_brands_object");

		$data = $this->get_brands_array();

		$charities = array();
		foreach ($data as $row) {
			$charities[$row["_id"]] = $row;
		}

		$this->fastcache_model->set_cache("get_brands_object",$charities);
		return $data;

		return $charities;
	}

	function get_brands_array () {

		if ($this->fastcache_model->get_cache("get_brands_array"))
			return $this->fastcache_model->get_cache("get_brands_array");
		$data =  $this->apiCall('brand')->entries;
		$this->fastcache_model->set_cache("get_brands_array",$data);
		return $data;
	}

	function get_offers_array () {
		if ($this->fastcache_model->get_cache("get_offers_array"))
			return $this->fastcache_model->get_cache("get_offers_array");
		$data =  $this->apiCall('offer')->entries;
		$this->fastcache_model->set_cache("get_offers_array",$data);
		return $data;
	}

	function get_charities_object () {

		if ($this->fastcache_model->get_cache("get_charities_object"))
			return $this->fastcache_model->get_cache("get_charities_object");


		$data = $this->get_charities_array();

		$charities = array();
		foreach ($data as $row) {
			$charities[$row["_id"]] = $row;
		}

		$this->fastcache_model->set_cache("get_charities_object",$charities);
		return $charities;
    }

	function get_charities_array () {

		if ($this->fastcache_model->get_cache("get_charities_array"))
			return $this->fastcache_model->get_cache("get_charities_array");
		$data =  $this->apiCall('charity')->entries;
		$this->fastcache_model->set_cache("get_charities_array",$data);
		return $data;
	}

}
?>
