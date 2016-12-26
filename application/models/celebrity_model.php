<?php
class Celebrity_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
	}

	function get_all_celebrities(){

		$data =  apiCall("celebrity/list", array("size"=> '9999', 'page'=> '0'));
		return $this->rows($data->content->entries);

    }

	public function get_celebrity($id){
		$parameters = array();
		$parameters['id'] = $id;
		$data = apiCall("celebrity/get_item", $parameters);
		return $this->rows($data->content->entries);
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
		//$parameters['id'] = '57dacf46ef97110300fe5366';
		$parameters['is_charity']= false;
        return apiCall("celebrity/get_related_brands", $parameters);
	}

	function get_celeb_charities($id){
		$parameters = array();
		$parameters['id'] = $id;
		//$parameters['id'] = '57dacf46ef97110300fe5366';
		$parameters['is_charity']= true;
        return apiCall("celebrity/get_related_brands", $parameters);
	}

	function get_celeb_offers($id){
		$parameters = array();
		$parameters['id'] = $id;
		//$parameters['id'] = '57dacf46ef97110300fe5366';
        return apiCall("celebrity/get_related_offers", $parameters);
	}

	function rows($rows){
        //debug($rows);
        $medias = array();
        foreach ($rows as $media) {
            $media = (array) $media;
            $tmp = array(
                    "_id" => $media["_id"],
                    "title" => 	$media["title"],
                    "series_id" => 	$media["series_id"],
                    "description" => $media["description"],
            //        "tvSeasonEpisodeNumber" => $media["tvSeasonEpisodeNumber"],
                    "brands" => $media["brands"],
            );
            //debug($tmp, $media);
			if($media["content"]){
	            foreach ($media["content"] as $file) {
	                $tmp[str_replace (" ", "", $file->assetTypes[0])] = array(
	                        "url" => $file->downloadUrl
	                );
	            }
			}
            $medias[] = $tmp;
        }
        return $medias;
    }


}
?>
