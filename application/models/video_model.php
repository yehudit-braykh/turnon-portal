<?php
class Video_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_video_by_id($id){

		if ($this->fastcache_model->get_cache("get_video_by_id".$id))
			return $this->fastcache_model->get_cache("get_video_by_id".$id);
		$data =  $this->videos_rows($this->apiCall('episode/'.$id.'/related', $filters)->entries)[0];
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


	function videos_rows($items){
		foreach ($items as &$item) {
			//debug($cat);
			if($item->brands)
				$item->brands = $this->rows($item->brands);
			if($item->celebrity){
				$arr = array();
				array_push($arr, $item->celebrity);
				$item->celebrity = $this->rows($arr)[0];
			}

			if($item->serie){

				if($item->serie->seasons){


					foreach ($item->serie->seasons as &$season) {
						foreach ($season->episodes as &$episode) {
							$episode->brands = $this->rows($episode->brands);

							$arr = array();
							array_push($arr, $episode->celebrity);
							$episode->celebrity = $this->rows($arr)[0];
						}
						$season->episodes = $this->rows($season->episodes);
					}
					if($item->serie->brands)
						$item->serie->brands = $this->rows($item->serie->brands);

					if($item->serie->charity){
						$data = array();
						array_push($data, $item->serie->charity);
						$item->serie->charity = $this->rows($data)[0];
					}

					if($item->serie->celebrity){
						$data = array();
						array_push($data, $item->serie->celebrity);
						$item->serie->celebrity = $this->rows($data)[0];
					}



				}

			}

			if($item->charity){
				$arr = array();
				array_push($arr, $item->charity);
				$item->charity = $this->rows($arr)[0];
			}

		}

		return $this->rows($items);
	}

	function rows($rows){
		$rows = (array)$rows;
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
