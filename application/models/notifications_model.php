<?php
class Notifications_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
        $this->load->library('session');
		$this->load->model('video_model');
	}

	public function get_notifications(){
        $id = $this->session->userdata("profile_id");
        $token = $this->session->userdata("login_token");
    //    debug($id,$token);

		$data =  apiCall("notification/get_user_notifications", array("id" => $id, "token" => $token));
	//	debug($data);
		foreach($data->content->entries as $row){

		//	debug($row->updatedByUserId);
			$row->video = $this->video_model->get_video_by_id($row->updatedByUserId);
		}
		return $data->content->entries;
	}

    public function mark_as_read($data){
        $id = $this->session->userdata("profile_id");
        $token = $this->session->userdata("login_token");

		return apiPost("notification/mark_as_read", array("id" => $id, "token" => $token, "notifications_id" => $data["notifications"]));
	}

}
?>
