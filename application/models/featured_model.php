<?php
class Featured_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_image($id, $slug = null){
		if ($this->fastcache_model->get_cache("get_image".$id.'slug'.$slug))
			return $this->fastcache_model->get_cache("get_image".$id.'slug'.$slug);
		if($id){
			$data =  $this->rows($this->apiCall('featuredImage/'.$id)->entries)[0];
		} else {
			$data =  $this->rows($this->apiCall('featuredImage/'.$slug.'/slug')->entries)[0];
		}

		$this->fastcache_model->set_cache("get_image".$id.'slug'.$slug,$data);
		return $data;
	}

	function get_images($page = 0, $page_size = 20, $sort_field = null, $descending = false, $keyword = null, $filters = false) {
		$parameters = array();
		$parameters[] = "page=".$page;
		$parameters[] = "size=".$page_size;
		if($sort_field)
			$parameters[] = 'sort='.$sort_field.':'.($descending?"-1":"1");
		else
			$parameters[] = 'sort=title:1';

		if($keyword)
			$parameters[] = 'byKeywords='.$keyword;
		if ($this->fastcache_model->get_cache("get_images".$page."size".$page_size."order".$descending."keyword".$keyword))
			return $this->fastcache_model->get_cache("get_images".$page."size".$page_size."order".$descending."keyword".$keyword);

		$data =  $this->rows($this->apiCall('featuredImage', $parameters)->entries);

		$this->fastcache_model->set_cache("get_images".$page."size".$page_size."order".$descending."keyword".$keyword,$data);
		return $data;
	}

	public function get_video($id, $slug = null){

		if ($this->fastcache_model->get_cache("get_video".$id.'slug'.$slug))
			return $this->fastcache_model->get_cache("get_video".$id.'slug'.$slug);
		if($id){
			$data =  $this->rows($this->apiCall('featuredVideo/'.$id)->entries)[0];
		} else {
			$data =  $this->rows($this->apiCall('featuredVideo/'.$slug.'/slug')->entries)[0];
		}

		$this->fastcache_model->set_cache("featuredVideo".$id.'slug'.$slug,$data);
		return $data;
	}

	function get_videos($page = 0, $page_size = 20, $sort_field = null, $descending = false, $keyword = null, $filters = false) {

		$parameters = array();
		$parameters[] = "page=".$page;
		$parameters[] = "size=".$page_size;
		if($sort_field)
			$parameters[] = 'sort='.$sort_field.':'.($descending?"-1":"1");
		else
			$parameters[] = 'sort=title:1';

		if($keyword)
			$parameters[] = 'byKeywords='.$keyword;
		if ($this->fastcache_model->get_cache("get_videos".$page."size".$page_size."order".$descending."keyword".$keyword))
			return $this->fastcache_model->get_cache("get_videos".$page."size".$page_size."order".$descending."keyword".$keyword);

		$data =  $this->rows($this->apiCall('featuredVideo', $parameters)->entries);

		$this->fastcache_model->set_cache("get_videos".$page."size".$page_size."order".$descending."keyword".$keyword,$data);
		return $data;
	}

	function rows($rows){
        foreach ($rows as &$media) {
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
