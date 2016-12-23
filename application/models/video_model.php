<?php
class Video_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
	}

	public function get_epg($channel){

		$parameters= array();
		$parameters["channel"] = $channel;

		return apiCall("live/list_epg", $parameters);
	}

	public function get_video_by_id($id){
		$parameters = array();
		$parameters['id'] = $id;

		$data = apiCall("vod/get_item", $parameters);

		$videos = $this->rows($data->content->entries);
	//	debug($videos);
		return $videos[0];
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

		return apiCall("vod/search", $parameters);
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
    //    debug($rows);
        $medias = array();
        foreach ($rows as $media) {
            $media = (array) $media;
            $tmp = array(
                    "_id" => $media["_id"],
                    "title" => 	$media["title"],
                    "series_id" => 	$media["series_id"],
                    "description" => $media["description"],
					"date" => $media["added"]
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


}
?>
