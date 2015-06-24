<?php
class Vod_player_model extends CI_Model {
	
	public function __construct()
	{
		$this->load->helper('uvod_api');
	}

	public function get_item_data($id)
	{
		return apiCall("vod/item", array("id" => $id));
	}	
}

?>