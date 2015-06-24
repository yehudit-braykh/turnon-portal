<?php
class Search_model extends CI_Model {
	
	public function __construct()
	{
		$this->load->helper('uvod_api');
	}

	public function search_vod($keyword)
	{
		return apiCall("vod/search", array("keyword" => $keyword));
	}
}
?>