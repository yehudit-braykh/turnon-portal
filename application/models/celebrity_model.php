<?php
class Celebrity_model extends Uvod_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	function get_all_celebrities($page = 0, $page_size = 20, $sort_field = null, $descending = false){
		$parameters = array();
		$parameters[] = "page=".$page;
		$parameters[] = "size=".$page_size;
		if($sort_field)
			$parameters[] = 'sort='.$sort_field.':'.($descending?"-1":"1");
		else
			$parameters[] = 'sort=title:1';

		if ($this->fastcache_model->get_cache("get_all_celebrities".$page."size".$page_size."order".$descending))
			return $this->fastcache_model->get_cache("get_all_celebrities".$page."size".$page_size."order".$descending);
		$data =  $this->rows($this->apiCall('celebrity/related', $parameters)->entries);
		$this->fastcache_model->set_cache("get_all_celebrities".$page."size".$page_size."order".$descending,$data);
		return $data;
    }

	public function get_celebrity($id){
		if ($this->fastcache_model->get_cache("get_celebrity".$id))
			return $this->fastcache_model->get_cache("get_celebrity".$id);
		// $arr = array();
		// array_push($arr, );
		$data = $this->apiCall('celebrity/'.$id.'/related')->entries;
		$data = $this->celebrity_rows($data)[0];
		$this->fastcache_model->set_cache("get_celebrity".$id,$data);
		return $data;
	}

	function celebrity_rows($items){
		// debug($items);
		foreach ($items as &$item) {
			// debug($item);
			if($item->series){
				foreach ($item->series as &$serie) {
					$serie->brands = $this->rows($serie->brands);

					$serie->campaigns = $this->rows($serie->campaigns);
					$serie->offers = $this->rows($serie->offers);

					$arr = array();
					array_push($arr, $serie->charity);
					$serie->charity = $this->rows($arr)[0];

					$arr = array();
					array_push($arr, $serie->celebrity);
					$serie->celebrity = $this->rows($arr)[0];

					foreach ($serie->brands as &$brand) {
						$brand->offers = $this->rows($brand->offers);
					}
					if($serie->seasons)
						foreach ($serie->seasons as &$season) {
							foreach ($season->episodes as &$episode) {
								$episode->brands = $this->rows($episode->brands);
								$episode->campaigns = $this->rows($episode->campaigns);

								$arr = array();
								array_push($arr, $episode->charity);
								$episode->charity = $this->rows($arr)[0];

								$arr = array();
								array_push($arr, $episode->celebrity);
								$episode->celebrity = $this->rows($arr)[0];
							}
							$season->episodes = $this->rows($season->episodes);
						}
				}
			}
			if($item->offers)
				$item->offers = $this->rows($item->offers)[0];
			if($item->charities)
			if($item->brands){
				foreach ($item->brands as &$brand) {
					$brand->offers = $this->rows($brand->offers);
				}
				$item->brands = $this->rows($item->brands);
			}

			if($item->charities){
				$item->charities = $this->rows($item->charities);
			}

			if($item->campaigns){
				$item->campaigns = $this->rows($item->campaigns);
			}

			if($item->videos){
				foreach ($item->videos as &$video) {
					$video->brands = $this->rows($video->brands);
					$video->campaigns = $this->rows($video->campaigns);

					$arr = array();
					array_push($arr, $video->charity);
					$video->charity = $this->rows($arr)[0];

					$arr = array();
					array_push($arr, $video->celebrity);
					$video->celebrity = $this->rows($arr)[0];
				}
				$item->videos = $this->rows($item->videos);
			}

		}

		return $this->rows($items);
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
