<?php
class category_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
	}

	public function get_all_categories($page = 0, $page_size = 20) {
		$parameters = array();
		$parameters[] = "page=".$page;
		$parameters[] = "size=".$page_size;

		if ($this->fastcache_model->get_cache("get_all_categories".$page."size".$page_size."order".$descending))
			return $this->fastcache_model->get_cache("get_all_categories".$page."size".$page_size."order".$descending);
		$data =  $this->categories_rows($this->apiCall('category/related', $parameters)->entries);
		$this->fastcache_model->set_cache("get_all_categories".$page."size".$page_size."order".$descending,$data);
		return $data;
    }

	public function get_category_by_id($id) {

		if ($this->fastcache_model->get_cache("get_category_by_id".$id))
			return $this->fastcache_model->get_cache("get_category_by_id".$id);
		$data =  $this->category_rows($this->apiCall('category/'.$id.'/related')[0]);
		$this->fastcache_model->set_cache("get_category_by_id".$id,$data);
		return $data;
    }

	function categories_rows($items){
		foreach ($items as &$item) {
			//debug($cat);
			if($item->videos){
				foreach ($item->videos as &$vid) {
					$vid->brands = $this->rows($vid->brands);
					$vid->campaigns = $this->rows($vid->campaigns);
					$data = array();
					array_push($data,$vid->charity);
					$vid->charity = $this->rows($data)[0];

					$data = array();
					array_push($data,$vid->celebrity);
					$vid->celebrity = $this->rows($data)[0];

					//$celeb->videos = $this->rows($celeb->videos);
				}
				$item->videos = $this->rows($item->videos);
			}
			// debug($item->videos);
		}

		return $this->rows($items);
	}

	function category_rows($cat){
		$data = array();
		array_push($data,$cat);
		return $this->categories_rows($data)[0];
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

			$tmp = array();
			if($media["celebrity"]){
				// debug($media["celebrity"]);
	            foreach ($media["celebrity"]->content as $file) {
	                $tmp[str_replace (" ", "", $file->assetTypes[0])] = $file;
	            }
            	$media["celebrity"]->content = $tmp;
			}
        }
        return $rows;
    }

}
?>
