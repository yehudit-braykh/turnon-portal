<?php
class Celebrity_model extends Uvod_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	function get_all_celebrities(){
		if ($this->fastcache_model->get_cache("get_all_celebrities"))
			return $this->fastcache_model->get_cache("get_all_celebrities");
		$data =  $this->rows($this->apiCall('celebrity')->entries);
		$this->fastcache_model->set_cache("get_all_celebrities",$data);
		return $data;
    }

	public function get_celebrity($id){
		if ($this->fastcache_model->get_cache("get_celebrity".$id))
			return $this->fastcache_model->get_cache("get_celebrity".$id);
		$data =  $this->rows($this->apiCall('celebrity/'.$id)->entries)[0];
		$this->fastcache_model->set_cache("get_celebrity".$id,$data);
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
