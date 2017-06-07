<?php
class Campaigns_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_campaign_by_id($id){
		if ($this->fastcache_model->get_cache("get_campaign_by_id".$id))
			return $this->fastcache_model->get_cache("get_campaign_by_id".$id);
		$data =  $this->campaing_rows($this->apiCall('campaign/'.$id.'/related')->entries)[0];
		$tmpCampaign = $data;
		foreach ($data["offers"] as &$offer) {
			$offer["campaign"] = $tmpCampaign;
		}
		$this->fastcache_model->set_cache("get_campaign_by_id".$id,$data);
		return $data;
	}

	function get_campaigns($page = 0, $page_size = 20, $sort_field = null, $descending = false, $keyword = null, $filters = false) {
		$parameters = array();
		$parameters[] = "page=".$page;
		$parameters[] = "size=".$page_size;
		if($sort_field)
			$parameters[] = 'sort='.$sort_field.':'.($descending?"-1":"1");
		else
			$parameters[] = 'sort=title:1';

		if($keyword)
			$parameters[] = 'byKeywords='.$keyword;
		if ($this->fastcache_model->get_cache("get_campaigns".$page."size".$page_size."order".$descending."keyword".$keyword))
			return $this->fastcache_model->get_cache("get_campaigns".$page."size".$page_size."order".$descending."keyword".$keyword);

		if($filters){
			$data  = new stdClass;
			$data->entries =  $this->campaings_rows($this->apiCall('campaign/related', $parameters)->entries);
			$data->filters = array();
			if($data->entries){
				foreach ($data->entries as $entry) {
					if($entry["keywords"]){
						foreach ($entry["keywords"] as $keyword) {
							if(!in_array($keyword, $data->filters)) array_push($data->filters,$keyword);
						}
					}
				}
			}

		} else {
			$data =  $this->campaings_rows($this->apiCall('campaign/related', $parameters)->entries);
		}
		$this->fastcache_model->set_cache("get_campaigns".$page."size".$page_size."order".$descending."keyword".$keyword,$data);
		return $data;
	}

	function campaing_rows($items){
		foreach ($items as &$item) {
			// $item = (array)$item;
						// debug($item);
			if($item->celebrities){
				foreach ($item->celebrities as &$celeb) {
					foreach ($celeb->videos as &$video) {
						$celebrity = array();
						array_push($celebrity, $video->celebrity);
						$video->celebrity = $this->rows($celebrity)[0];

						$data = array();
						array_push($data, $video->charity);
						$video->charity = $this->rows($data)[0];
						$video->brands= $this->rows($video->brands);
						$video->campaigns= $this->rows($video->campaigns);
					}
					$celeb->videos = $this->rows($celeb->videos);
				}
				$item->celebrities = $this->rows($item->celebrities);
			}
			// debug($item->videos);
			if($item->videos){
				foreach ($item->videos as &$video) {
					$celebrity = array();
					array_push($celebrity, $video->celebrity);
					$video->celebrity = $this->rows($celebrity)[0];

					$data = array();
					array_push($data, $video->charity);
					$video->charity = $this->rows($data)[0];
					$video->brands= $this->rows($video->brands);
					$video->campaigns= $this->rows($video->campaigns);
				}
				$item->videos = $this->rows($item->videos);
			}

			if($item->brand){
				$brand = array();
				array_push($brand, $item->brand);
				$item->brand = $this->rows($brand)[0];
			}

			if($item->offers)
				$item->offers = $this->rows($item->offers);
		}

		return $this->rows($items);
	}

	function campaings_rows($items){
		foreach ($items as &$item) {
			if($item->offers)
				$item->offers = $this->rows($item->offers);
		}

		return $this->rows($items);
	}

	function rows($rows){
		// debug($rows);
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
