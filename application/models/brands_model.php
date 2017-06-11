<?php
class Brands_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_brand($id, $slug){
		if ($this->fastcache_model->get_cache("get_brand".$id.'slug'.$slug))
			return $this->fastcache_model->get_cache("get_brand".$id.'slug'.$slug);
		if($id){
			$data =  $this->brands_rows($this->apiCall('brand/'.$id.'/related')->entries);
		} else {
			$data =  $this->brands_rows($this->apiCall('brand/'.$slug.'/related/slug')->entries);
		}

		$this->fastcache_model->set_cache("get_brand".$id.'slug'.$slug,$data);
		return $data;
	}

	public function get_charity($id, $slug){
		if ($this->fastcache_model->get_cache("get_charity".$id.'slug'.$slug))
			return $this->fastcache_model->get_cache("get_charity".$id.'slug'.$slug);
		if($id){
			$data =  $this->charities_rows($this->apiCall('charity/'.$id.'/related')->entries);
		} else {
			$data =  $this->charities_rows($this->apiCall('charity/'.$slug.'/related/slug')->entries);
		}

		$this->fastcache_model->set_cache("get_charity".$id.'slug'.$slug,$data);
		return $data;
	}

	public function get_offer($id, $slug){
		if ($this->fastcache_model->get_cache("get_offer".$id.'slug'.$slug))
			return $this->fastcache_model->get_cache("get_offer".$id.'slug'.$slug);
		if($id){
			$data =  $this->offers_rows($this->apiCall('offer/'.$id.'/related')->entries)[0];
		} else {
			$data =  $this->offers_rows($this->apiCall('offer/'.$slug.'/related/slug')->entries)[0];
		}

		$this->fastcache_model->set_cache("get_offer".$id.'slug'.$slug,$data);
		return $data;
	}

	function get_brands_array ($page = 0, $page_size = 20, $sort_field = null, $descending = false, $keyword = null, $filters = false) {
		$parameters = array();
		$parameters[] = "page=".$page;
		$parameters[] = "size=".$page_size;
		if($sort_field)
			$parameters[] = 'sort='.$sort_field.':'.($descending?"-1":"1");
		else
			$parameters[] = 'sort=title:1';
		if($keyword)
			$parameters[] = 'byKeywords='.$keyword;

		if ($this->fastcache_model->get_cache("get_brands_array".$page."size".$page_size."order".$descending."keyword".$keyword."filters".$filters))
			return $this->fastcache_model->get_cache("get_brands_array".$page."size".$page_size."order".$descending."keyword".$keyword."filters".$filters);
		if($filters){
			$data  = new stdClass;
			$data->entries =  $this->rows($this->apiCall('brand/related', $parameters)->entries);
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
			$data =  $this->rows($this->apiCall('brand/related', $parameters)->entries);
		}

		$this->fastcache_model->set_cache("get_brands_array".$page."size".$page_size."order".$descending."keyword".$keyword."filters".$filters,$data);
		return $data;
	}

	function get_offers_array ($page = 0, $page_size = 20, $sort_field = null, $descending = false, $keyword = null, $filters = false) {
		$parameters = array();
		$parameters[] = "page=".$page;
		$parameters[] = "size=".$page_size;
		if($sort_field)
			$parameters[] = 'sort='.$sort_field.':'.($descending?"-1":"1");
		else
			$parameters[] = 'sort=expirationDate:-1';
		if($keyword)
			$parameters[] = 'byKeywords='.$keyword;

		if ($this->fastcache_model->get_cache("get_offers_array".$page."size".$page_size."order".$descending."keyword".$keyword))
			return $this->fastcache_model->get_cache("get_offers_array".$page."size".$page_size."order".$descending."keyword".$keyword);

		if($filters){
			$data  = new stdClass;
			$data->entries =  $this->offers_rows($this->apiCall('offer/related', $parameters)->entries);
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
			$data =  $this->offers_rows($this->apiCall('offer/related', $parameters)->entries);
		}


		$this->fastcache_model->set_cache("get_offers_array".$page."size".$page_size."order".$descending."keyword".$keyword,$data);
		return $data;
	}

	function get_charities_array ($page = 0, $page_size = 20, $sort_field = null, $descending = false, $keyword = null, $filters = false) {
		$parameters = array();
		$parameters[] = "page=".$page;
		$parameters[] = "size=".$page_size;
		if($sort_field)
			$parameters[] = 'sort='.$sort_field.':'.($descending?"-1":"1");
		else
			$parameters[] = 'sort=title:1';

		if($keyword)
			$parameters[] = 'byKeywords='.$keyword;

		if ($this->fastcache_model->get_cache("get_charities_array".$page."size".$page_size."order".$descending."keyword".$keyword))
			return $this->fastcache_model->get_cache("get_charities_array".$page."size".$page_size."order".$descending."keyword".$keyword);

		if($filters){
			$data  = new stdClass;
			$data->entries =  $this->rows($this->apiCall('charity/related', $parameters)->entries);
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
			$data =  $this->rows($this->apiCall('charity/related', $parameters)->entries);
		}

		$this->fastcache_model->set_cache("get_charities_array".$page."size".$page_size."order".$descending."keyword".$keyword,$data);
		return $data;
	}

	function brands_rows($items){
		foreach ($items as &$item) {
			//debug($cat);
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
				}
				$item->videos = $this->rows($item->videos);
			}

			if($item->offers)
				$item->offers = $this->rows($item->offers);
		}

		return $this->rows($items);
	}

	function offers_rows($items){
		foreach ($items as &$item) {
			//debug($cat);
			if($item->brand){
				if($item->brand->offers)
					$item->brand->offers = $this->rows($item->brand->offers);

				$arr = array();
				array_push($arr, $item->brand);
				$item->brand = $this->rows($arr)[0];
			}

			if($item->campaign){
				if($item->campaign->offers)
					$item->campaign->offers = $this->rows($item->campaign->offers);

				$arr = array();
				array_push($arr, $item->campaign);
				$item->campaign = $this->rows($arr)[0];
			}
			// debug($item->videos);
			if($item->videos){
				foreach ($item->videos as &$video) {
					$celebrity = array();
					array_push($celebrity, $video->celebrity);
					$video->celebrity = $this->rows($celebrity)[0];

					if($video->brands){
						foreach ($video->brands as &$brand) {
							$brand->offers = $this->rows($brand->offers);
						}
					}

					$video->brands = $this->rows($video->brands);
					$video->campaigns = $this->rows($video->campaigns);

					$data = array();
					array_push($data, $video->charity);
					$video->charity = $this->rows($data)[0];
					$video->brands= $this->rows($video->brands);
				}
				$item->videos = $this->rows($item->videos);
			}

			if($item->offers)
				$item->offers = $this->rows($item->offers);
		}

		return $this->rows($items);
	}

	function charities_rows($items){
		foreach ($items as &$item) {
			//debug($cat);
			if($item->celebrities){
				foreach ($item->celebrities as &$celeb) {
					foreach ($celeb->videos as &$video) {
						$data = array();
						array_push($data, $video->celebrity);
						$video->celebrity = $this->rows($data)[0];

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
				foreach ($item->videos as &$vid) {

					$vid->brands = $this->rows($vid->brands);
					$vid->campaigns = $this->rows($vid->campaigns);
					if($vid->brands){
						foreach ($vid->brands as &$brand) {
							$brand->offers = $this->rows($brand->offers);
						}
					}


					$data = array();
					array_push($data,$vid->charity);
					$vid->charity = $this->rows($data)[0];

					$data = array();
					array_push($data,$vid->celebrity);
					$vid->celebrity = $this->rows($data)[0];


				}
				// debug($item->videos);
				$item->videos = $this->rows($item->videos);
			}
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
