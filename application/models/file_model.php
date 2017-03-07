<?php
class File_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
	}

	public function file_upload($file, $url){
		return apiCall("upload/file_upload", $parameters);
	}

}
?>
