<?php
class category_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_all_categories() {

		if ($this->fastcache_model->get_cache("get_all_categories"))
			return $this->fastcache_model->get_cache("get_all_categories");
		$data =  $this->rows($this->apiCall('category/related')->entries);
		$this->fastcache_model->set_cache("get_all_categories",$data);
		return $data;
    }

	public function get_category_by_id($id) {

		if ($this->fastcache_model->get_cache("get_category_by_id".$id))
			return $this->fastcache_model->get_cache("get_category_by_id".$id);
		$data =  $this->rows($this->apiCall('category/'.$id.'/related'));
		$this->fastcache_model->set_cache("get_category_by_id".$id,$data);
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
