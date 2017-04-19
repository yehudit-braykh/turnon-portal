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


		if ($this->fastcache_model->get_cache("get_all_celebrities".$page."size".$page_size."order".$descending))
			return $this->fastcache_model->get_cache("get_all_celebrities".$page."size".$page_size."order".$descending);
		$data =  $this->rows($this->apiCall('celebrity/related')->entries);
		$this->fastcache_model->set_cache("get_all_celebrities".$page."size".$page_size."order".$descending,$data);
		return $data;
    }

	public function get_celebrity($id){
		if ($this->fastcache_model->get_cache("get_celebrity".$id))
			return $this->fastcache_model->get_cache("get_celebrity".$id);
		$data =  $this->celebrity_rows($this->apiCall('celebrity/'.$id.'/related')->entries)[0];
		$this->fastcache_model->set_cache("get_celebrity".$id,$data);
		return $data;
	}

	function celebrity_rows($items){
		foreach ($items as &$item) {
			//debug($cat);

			if($item->series){
				foreach ($item->series as &$serie) {
					$serie->brands = $this->rows($serie->brands);
					foreach ($serie->brands as &$brand) {
						$brand->offers = $this->rows($brand->offers);
					}
					if($serie->seasons)
						foreach ($serie->seasons as &$season) {
							foreach ($season->episodes as &$episode) {
								$episode->brands = $this->rows($episode->brands);

								$arr = array();
								array_push($arr, $episode->celebrity);
								$episode->celebrity = $this->rows($arr)[0];
							}
							$season->episodes = $this->rows($season->episodes);
						}
				}
			}
			if($item->brands)
				$item->brands = $this->rows($item->brands);
			if($item->charities)
				$item->charities = $this->rows($item->charities);
			if($item->videos)
				$item->videos = $this->rows($item->videos);

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
