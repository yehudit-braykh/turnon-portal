<?php
class Live_model extends CI_Model {

	public function __construct()
	{
		$this->load->helper('uvod_api');
	}

	public function list_channels()
	{
		return apiCall("live/list_channels");
	}
        
	public function get_epg($date, $length, $channel)
	{
		return apiCall("live/list_epg",array('start'=>$date,'length'=>$length,'channel'=>$channel));
	}
        
	public function get_epg_timeline($date, $length, $channel)
	{
		return apiPost("live/get_epg_timeline",array('start'=>$date,'length'=>$length,'channel'=>$channel));
	}
        
	public function get_epg_data($date=null)
	{
            if($date){
               
                return apiPost("live/list_epg_data",array('date'=>$date));
            }else{
		return apiPost("live/list_epg_data");
            }
	}
}
?>