<?php
class Celebrity_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
	}

	function get_all_celebrities(){
	//	debug(apiCall("celebrity/list", $parameters)->content->entries);
		return $this->rows(apiCall("celebrity/list", $parameters)->content->entries);
    }

	public function get_celebrity($id){
		$parameters = array();
		$parameters['id'] = $id;
		return $this->rows(apiCall("celebrity/get_item", $parameters)->content->entries);
	}

	public function get_celeb_videos($id){
		$parameters = array();
		 $parameters['id'] = $id;
        $data = apiCall("celebrity/get_related_videos", $parameters);
		$videos = $this->rows($data->content->entries);
		return $videos;
    }

	function get_celeb_series($id){
		$parameters = array();
		$parameters['id'] = $id;
        return apiCall("celebrity/get_related_videos", $parameters);


	}

	function get_celeb_brands($id){
		$parameters = array();
		$parameters['id'] = $id;
		//$parameters['is_charity']= false;
        $data = apiCall("celebrity/get_related_brands", $parameters);

		$res = $data->content->entries;

		$brands = array();
		foreach ($res as $row){
			if (!$row->is_charity)
				array_push($brands, $row);
		}

		return $this->rows($brands);
	}

	function get_celeb_charities($id){
		$parameters = array();
		$parameters['id'] = $id;
		//$parameters['is_charity']= true;
        $data = apiCall("celebrity/get_related_brands", $parameters);
		$res = $data->content->entries;
		$charities = array();
		foreach ($res as $row){
			if ($row->is_charity)
				array_push($charities, $row);
		}

		return $this->rows($charities);
	}

	function get_celeb_offers($id){
		$parameters = array();
		$parameters['id'] = $id;
		//$parameters['id'] = '57dacf46ef97110300fe5366';
        return $this->rows(apiCall("celebrity/get_related_offers", $parameters)->content->entries);
	}

	function rows($rows){
        // debug($rows);
        $medias = array();
        foreach ($rows as $media) {
            $media = (array) $media;
            $tmp = array(
                    "_id" => $media["_id"],
                    "title" => 	$media["title"],
                    "series_id" => 	$media["series_id"],
                    "description" => $media["description"],
                    "tvSeasonEpisodeNumber" => $media["tvSeasonEpisodeNumber"],
                    "brands" => $media["brands"],
					"social_urls" => $media["social_urls"],
					"categories" => $media["categories"]
            );

			if($media["title"])
            {
                if (sizeof(explode(" - ", $media["title"]))>1)
                    $names= explode(" - ", $media["title"]);
                else
                    $names= explode(" – ", $media["title"]);
                //debug(explode(" - ", $media["title"]));
                $tmp["title"] = $names[1];
                $tmp["artist_name"] = $names[0];
				if(sizeof($names)==1)
					$tmp["title"] = $names[0];
            } else {
                    $tmp["title"] = $media["title"];
            }
            //debug($tmp, $media);
            foreach ($media["content"] as $file) {
                $tmp[str_replace (" ", "", $file->assetTypes[0])] = array(
                        "url" => $file->downloadUrl
                );
            }
            $medias[] = $tmp;
        }
        return $medias;
    }


}
?>
