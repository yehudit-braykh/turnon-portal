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

	public function get_related_videos($id){

		if ($this->fastcache_model->get_cache("get_related_videos".$id))
			return $this->fastcache_model->get_cache("get_related_videos".$id);
		$data =  $this->videos_rows($this->apiCall('episode/'.$id.'/related/videos', $filters)->entries[0]);
		$this->fastcache_model->set_cache("get_related_videos".$id,$data);
		return $data;
	}

	public function get_serie_by_id($id){

		if ($this->fastcache_model->get_cache("get_serie_by_id".$id))
			return $this->fastcache_model->get_cache("get_serie_by_id".$id);
		$data =  $this->videos_rows($this->apiCall('series/'.$id.'/related', $filters)->entries)[0];
		$this->fastcache_model->set_cache("get_serie_by_id".$id,$data);
		return $data;
	}

	public function get_all_series(){

		if ($this->fastcache_model->get_cache("get_all_series"))
			return $this->fastcache_model->get_cache("get_all_series");
		$data =  $this->videos_rows($this->apiCall('series/related', $filters)->entries);
		$this->fastcache_model->set_cache("get_all_series",$data);
		return $data;
	}

	public function add_view($id){

		$data =  $this->apiPut('episode/'.$id.'/views', array());
		return $data;
	}

	public function add_like($id){

		$data =  $this->apiPut('episode/'.$id.'/likes', array());
		return $data;
	}

	function videos_rows($items){
		foreach ($items as &$item) {
			//debug($cat);
			if($item->brands){
				foreach ($item->brands as &$brand) {
					if($brand->offers)
						$brand->offers = $this->rows($brand->offers);
				}
			}
				$item->brands = $this->rows($item->brands);

			if($item->campaigns)
				$item->campaigns = $this->rows($item->campaigns);

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

			if($item->seasons){
				foreach ($item->seasons as &$season) {
					$season->episodes = $this->videos_rows($season->episodes);
				}
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
