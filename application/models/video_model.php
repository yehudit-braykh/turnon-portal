<?php
class Video_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
	}

	public function get_video_by_id($id){
		$parameters = array();
		$parameters['id'] = $id;

		$data = apiCall("vod/get_item", $parameters);
	//	debug($data);
		if ($data->content->entries){
			$videos = $this->rows($data->content->entries);
			return $videos[0];
		}
		return;

	}

    public function get_videos_by_featured($cat){

		$parameters = array();
		$parameters["category"] = $cat;

		$data =   apiCall("vod/get_items_by_featured_category", $parameters);

		$videos = $this->rows($data->content->entries);
		return $videos;
	}

	public function get_videos_by_category($cat){

		$parameters = array();
		$parameters["category"] = $cat;

		$data =  apiCall("vod/get_items_by_category", $parameters);
		$videos = $this->rows($data->content->entries);

		return $videos;
	}

    public function search($txt){

		$parameters = array();
		$parameters["keyword"] = $txt;
		$data =  apiCall("vod/search", $parameters);
		$results = $this->resultsRows($data->content->entries);
		return ($results);
	}

	public function get_all_series(){

		$parameters= array();
		$parameters['media_type']="tv_show";

		return apiCall("vod/get_items_by_media_type", $parameters);
	}

	public function get_serie_by_id($id){

		$parameters= array();
		$parameters['id'] = $id;
		$parameters['media_type'] = "tv_show";

		return apiCall("vod/get_serie", $parameters);
	}

	function rows($rows){
        $medias = array();
        foreach ($rows as $media) {
            $media = (array) $media;
            $tmp = array(
                    "_id" => $media["_id"],
                    "title" => 	$media["title"],
                    "series_id" => 	$media["series_id"],
                    "description" => $media["description"],
					"date" => $media["added"],
					"categories" => $media["categories"],
                    //"tvSeasonEpisodeNumber" => $media["tvSeasonEpisodeNumber"],
                //    "brands" => $media["brands"],
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
            } else {
                    $tmp["title"] = $media["title"];
            }
            //debug($tmp, $media);
			if($media["content"]){
	            foreach ($media["content"] as $file) {
	                $tmp[str_replace (" ", "", $file->assetTypes[0])] = array(
	                        "url" => $file->downloadUrl
	                );
	            }
	            $medias[] = $tmp;
			}
        }
	//	debug($medias);
        return $medias;
    }

		function ChannelRows($rows){
	    //    debug($rows);
	        $medias = array();
	        foreach ($rows as $media) {
	            $media = (array) $media;
	            $tmp = array(
	                    "_id" => $media["_id"],
	                    "title" => 	$media["title"],
	                //    "series_id" => 	$media["series_id"],
	                    "description" => $media["description"],
						"date" => $media["added"]
	                    //"tvSeasonEpisodeNumber" => $media["tvSeasonEpisodeNumber"],
	                //    "brands" => $media["brands"],
	            );
	            //debug($tmp, $media);
				if($media["media"]->content){
		            foreach ($media["media"]->content as $file) {
		                $tmp[str_replace (" ", "", $file->assetTypes[0])] = array(
		                        "url" => $file->downloadUrl
		                );
		            }
		            $medias[] = $tmp;
				}
	        }
		//	debug($medias);
	        return $medias;
	    }

	function resultsRows($rows){
    //    debug($rows);
        $medias = array();
        foreach ($rows as $media) {
            $media = (array) $media;
            $tmp = array(
                    "_id" => $media["_id"],
                    "title" => 	$media["title"],
                    "series_id" => 	$media["series_id"],
                    "description" => $media["description"],
					"media_type" => $media["media_type"]
                    //"tvSeasonEpisodeNumber" => $media["tvSeasonEpisodeNumber"],
                //    "brands" => $media["brands"],
            );

		
            //debug($tmp, $media);
			if($media["content"]){
	            foreach ($media["content"] as $file) {
	                $tmp[str_replace (" ", "", $file->assetTypes[0])] = array(
	                        "url" => $file->downloadUrl
	                );
	            }
	            $medias[] = $tmp;
			}
        }
	//	debug($medias);
        return $medias;
    }

	public function get_items_by_vod_category($category) {
        $parameters = array();

        if ($category)
            $parameters["category"] = $category;

        $parameters["media_type"] = 'clip|tv_show';
        // debug(apiCall("vod/get_media_by_vod_category", $parameters));
        return apiCall("vod/get_media_by_vod_category", $parameters);
    }


}
?>
