<?php
class Video_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_video_by_id($id){

		if ($this->fastcache_model->get_cache("get_video_by_id".$id))
			return $this->fastcache_model->get_cache("get_video_by_id".$id);
		$data =  $this->apiCall('episode/'.$id.'/related', $filters)->entries[0];
		$this->fastcache_model->set_cache("get_video_by_id".$id,$data);
		return $data;
	}

    public function search($keyword){

		$time = time();
		$filters = array();
		$filters[] = "byPublish_date=~" . $time . "000";
        $filters[] = "byUnpublish_date=-|" . $time . "000~";
        $filters[] = "byMedia_type=clip|tv_show|episode|movie";
        $filters[] = "fields=_id,title,description,keywords,content,media_type,policy_advertisement_id,featured_category,vod_category,featured_image_link,categories,aired_date,,runtime,series_id,:actors,directors,movie_year,writer,ratings";
        $filters[] = "searchByTitle=" . urlencode($keyword);
        $filters[] = "sort=aired_date:-1";
        $filters[] = "page=0&size=300";

		return $this->rows($this->apiCall('url_media', $filters)->entries);
	}


	public function get_items_by_vod_category($category) {


		$filters = array();

		if ($category)
			$filters[] = "byVod_category=" . str_replace(' ', '%20', $category) ;

		$parameters["media_type"] = 'clip|tv_show';
		$filters[] = "byMedia_type=" . str_replace(' ', '%20', 'clip|tv_show') ;

		return $this->rows($this->apiCall('url_media', $filters)->entries);
        $parameters = array();

    }


}
?>
