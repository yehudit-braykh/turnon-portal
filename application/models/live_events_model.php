<?php
class Live_events_model extends CI_Model {

	public function __construct()
	{
		$this->load->helper('uvod_api');
	}

	public function get_next_event()
	{
		return apiCall("event/get_next_event");
	}

	public function get_event_products($ids)
	{
		return apiCall("event/get_event_products",array('products_id'=>$ids));
	}
        
	public function get_event_data()
	{
		return apiCall("event/get_event_data",array());
	}


}
?>