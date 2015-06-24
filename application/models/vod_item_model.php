<?php
class Vod_item_model extends CI_Model {
	
	public function __construct()
	{
		$this->load->helper('uvod_api');
	}

	public function get_item_data($id)
	{
		$token = "";
		return apiCall("vod/item_api", array("id" => $id, "token" => $token));
	}

	public function get_items_related($id, $category, $genre, $featured, $media_type)
	{
		$parameters = array();
		$parameters["id"] = $id;
		if ($category) $parameters["category"] = $category;
		if ($genre)    $parameters["genre"] = $genre;
		if ($featured) $parameters["featured"] = $featured;
		if ($media_type) $parameters["media_type"] = $media_type;

		return apiCall("vod/list_items_related", $parameters);
	}
        
        public function check_ad_policy_expiration($ids)
	{
		return apiPost("vod/check_ad_policy_expiration",array('ids'=>$ids));
	}
        
        
}
?>