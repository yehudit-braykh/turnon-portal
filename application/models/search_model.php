<?php
class Search_model extends Uvod_model {

	public function __construct()
	{
		$this->load->helper('uvod_api');
		$this->load->model("brands_model");
	}

	public function search($keyword, $tags = null, $page = 0 , $page_size = 2){

		if(strtolower($keyword) == 'offer' || strtolower($keyword) == 'offers' || strtolower($keyword) == 'coupon' || strtolower($keyword) == 'coupons'){
			return $this->brands_model->get_offers_array ($page = 0, $page_size = 5);
		} else {
			$results = new stdClass;
			$results->celebrities = $this->celebrity_rows($this->search_celebrities($keyword, $tags, $page , $page_size )->entries);
			//$results->brands = $this->search_brands($keyword, $tags, $page , $page_size);
			$results->categories = $this->search_categories($keyword, $tags, $page , $page_size);
			$results->campaigns = $this->search_campaigns($keyword, $tags, $page , $page_size );
			$results->charities = $this->search_charities($keyword, $tags, $page , $page_size );

			if(count($results->celebrities) && !count($results->categories) && !count($results->campaigns) && !count($results->charities)){
				$results->celebrities[0]->media_type= "celebrity";
				return $results->celebrities[0];
			}

			if(!count($results->celebrities) && count($results->categories) && !count($results->campaigns) && !count($results->charities)){
				$results->categories[0]->media_type= "category";
				return $results->categories[0];
			}

			if(!count($results->celebrities) && !count($results->categories) && count($results->campaigns) && !count($results->charities)){
				$results->campaigns[0]->media_type= "campaign";
				return $results->campaigns[0];
			}

			if(!count($results->celebrities) && !count($results->categories) && !count($results->campaigns) && count($results->charities)){
				$results->charities[0]->media_type= "charity";
				return $results->charities[0];
			}

			if(!count($results->celebrities) && !count($results->categories) && !count($results->campaigns) && !count($results->charities)){
				return null;
			}

			return $results;
		}

	}

	public function search_charities($keyword, $tags, $page , $page_size ){

		$parameters = array();
		$parameters[] = "byTitle=".str_replace(' ',"%20",$keyword);
		if($tags)
			$parameters[] = "byKeyword=".str_replace(' ',"|",$tags);
		$parameters[] = "page=".$page;
		$parameters[]= "size=".$page_size;
		$parameters[] = 'sort=title:1';


		return $this->charities_rows($this->apiCall('charity/search/related', $parameters)->entries);
	}

	public function search_categories($keyword, $tags, $page , $page_size ){

		$parameters = array();
		$parameters[] = "byTitle=".str_replace(' ',"%20",$keyword);
		if($tags)
			$parameters[] = "byKeyword=".str_replace(' ',"|",$tags);
		$parameters[] = "page=".$page;
		$parameters[]= "size=".$page_size;
		$parameters[] = 'sort=title:1';


		return $this->rows($this->apiCall('category/search/related', $parameters)->entries);
	}

	public function search_brands($keyword, $tags, $page , $page_size){

		$parameters = array();
		$parameters[] = "byTitle=".str_replace(' ',"%20",$keyword);
		if($tags)
			$parameters[] = "byKeyword=".str_replace(' ',"|",$tags);
		$parameters[] = "page=".$page;
		$parameters[]= "size=".$page_size;
		//  debug($this->apiCall('brand/search/related', $parameters)->entries);
		return $this->brands_rows($this->apiCall('brand/search/related', $parameters)->entries);
	}

	public function search_campaigns($keyword, $tags, $page , $page_size){

		$parameters = array();
		$parameters[] = "byTitle=".str_replace(' ',"%20",$keyword);
		if($tags)
			$parameters[] = "byKeyword=".str_replace(' ',"|",$tags);
		$parameters[] = "page=".$page;
		$parameters[]= "size=".$page_size;
		return $this->rows($this->apiCall('campaign/search/related', $parameters)->entries);
	}

	public function search_offers($keyword, $tags, $page , $page_size){

		$parameters = array();
		$parameters[] = "byTitle=".str_replace(' ',"%20",$keyword);
		if($tags)
			$parameters[] = "byKeyword=".str_replace(' ',"|",$tags);
		$parameters[] = "page=".$page;
		$parameters[]= "size=".$page_size;

		return $this->offers_rows($this->apiCall('offer/search/related', $parameters)->entries);
	}

	private function search_celebrities($keyword, $tags, $page , $page_size){

		$parameters = array();
		$parameters[] = "byTitle=".str_replace(' ',"%20",$keyword);
	//	debug($parameters);
		if($tags)
			$parameters[] = "byKeyword=".str_replace(' ',"|",$tags);
		$parameters[] = "page=".$page;
		$parameters[]= "size=".$page_size;

		return $this->apiCall('celebrity/search/related', $parameters);
	}

	private function search_series($keyword, $tags, $page , $page_size){

		$parameters = array();
		$parameters[] = "byTitle=".str_replace(' ',"%20",$keyword);
		if($tags)
			$parameters[] = "byKeyword=".str_replace(' ',"|",$tags);
		$parameters[] = "page=".$page;
		$parameters[]= "size=".$page_size;

		return $this->apiCall('series/search/related', $parameters);
	}

	private function search_videos($keyword, $tags, $page , $page_size){

		$parameters = array();
		$parameters[] = "byTitle=".str_replace(' ',"%20",$keyword);
		if($tags)
			$parameters[] = "byKeyword=".str_replace(' ',"|",$tags);
		$parameters[] = "page=".$page;
		$parameters[]= "size=".$page_size;

		return $this->apiCall('episode/search/related', $parameters);
	}

	function videos_rows($items){
		foreach ($items as &$item) {
			if($item->brands){
				foreach ($item->brands as &$brand) {
					$brand->offers = $this->rows($brand->offers);
				}
				$item->brands = $this->rows($item->brands);
			}

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

				$arr = array();
				array_push($arr, $item->serie);
				$item->serie = $this->rows($arr)[0];

			}

			if($item->charity){
				$arr = array();
				array_push($arr, $item->charity);
				$item->charity = $this->rows($arr)[0];
			}

		}

		return $this->rows($items);
	}

	function celebrity_rows($items){
		// debug($items);
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

					// debug($vid->brands);
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
        foreach ($rows as &$media) {

            $media = $media;
			$tmp = array();
			if($media->content){
	            foreach ((array)$media->content as $file) {
	                $tmp[str_replace (" ", "", $file->assetTypes[0])] = $file;
	            }
            	$media->content = $tmp;
			}

        }
        return $rows;
    }

}
?>
