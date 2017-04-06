<?php
class Brands_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_brand($id){
		if ($this->fastcache_model->get_cache("get_brand".$id))
			return $this->fastcache_model->get_cache("get_brand".$id);
		$data =  $this->rows($this->apiCall('brand/'.$id.'/related')->entries);
		$this->fastcache_model->set_cache("get_brand".$id,$data);
		return $data;
	}

	public function get_charity($id){
		if ($this->fastcache_model->get_cache("get_charity".$id))
			return $this->fastcache_model->get_cache("get_charity".$id);
		$data =  $this->rows($this->apiCall('charity/'.$id.'/related')->entries);
		$this->fastcache_model->set_cache("get_charity".$id,$data);
		return $data;
	}

	public function get_offer($id){
		if ($this->fastcache_model->get_cache("get_offer".$id))
			return $this->fastcache_model->get_cache("get_offer".$id);
		$data =  $this->rows($this->apiCall('offer/'.$id.'/related')->entries);
		$this->fastcache_model->set_cache("get_offer".$id,$data);
		return $data;
	}

    public function get_list_brands(){
		if ($this->fastcache_model->get_cache("get_list_brands"))
			return $this->fastcache_model->get_cache("get_list_brands");
		$data =  $this->rows($this->apiCall('brand/related')->entries);
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
		$data =  $this->rows($this->apiCall('brand/related')->entries);
		$this->fastcache_model->set_cache("get_brands_array",$data);
		return $data;
	}

	function get_offers_array () {
		if ($this->fastcache_model->get_cache("get_offers_array"))
			return $this->fastcache_model->get_cache("get_offers_array");
		$data =  $this->rows($this->apiCall('offer/related')->entries);
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
		$data =  $this->rows($this->apiCall('charity/related')->entries);
		$this->fastcache_model->set_cache("get_charities_array",$data);
		return $data;
	}

	function rows($rows){
        foreach ($rows as $media) {
            $media = (array) $media;
			$tmp = array();
			if($media["content"]){
	            foreach ($media["content"] as $file) {
	                $tmp[str_replace (" ", "", $file->assetTypes[0])] = $file;
	            }
            	$media["content"] = $tmp;
			}
        }
        return $rows;
    }

}
?>
