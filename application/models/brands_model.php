<?php
class Brands_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
	}

	public function get_brand($id){
		$parameters = array();
		if($id)
			$parameters["id"]= $id;

		return $this->rows(apiCall("brand/get_item", $parameters)->content->entries);
	}

    public function get_brand_offers($id){
		$parameters = array();
		if($id)
			$parameters["id"]= $id;

		return $this->rows(apiCall("brand/get_related_offers", $parameters)->content->entries);
    }

	public function get_brand_videos($id){

		$parameters = array();
		if($id)
			$parameters["id"]= $id;

		$data = apiCall("brand/get_related_videos", $parameters);
		return $this->rows($data->content->entries);
    }

	public function get_brand_celebs($id){

		$parameters = array();
		if($id)
			$parameters["id"]= $id;

        return $this->rows(apiCall("brand/get_related_celebs", $parameters)->content->entries);
    }

    public function get_list_brands(){
        $data = apiCall("brand/list");

		$res = $data->content->entries;
		$brands = array();
		foreach ($res as $row){
			if (!$row->is_charity)
				array_push($brands, $row);
		}

		return $this->rows($brands);
    }

	function get_brands_object () {
		$data = $this->get_brands_array();

		$charities = array();
		foreach ($data as $row) {
			$charities[$row["_id"]] = $row;
		}

		return $charities;
	}

	function get_brands_array () {
			$data = apiCall("brand/list");

			$res = $data->content->entries;
			$brands = array();
			foreach ($res as $row){
				if (!$row->is_charity)
					array_push($brands, $row);
			}

			return $this->rows($brands);
	}

	function get_offers_array () {

			$data = apiCall("vod/list_media_objects", array("media_type" => 'offer'));

			$res = $data->content->entries;



			return $this->rows($res);
	}

	function get_charities_object () {

		$data = $this->get_charities_array();

		$charities = array();
		foreach ($data as $row) {
			$charities[$row["_id"]] = $row;
		}

		return $charities;
    }

	function get_charities_array () {
			$data = apiCall("brand/list");
			$res = $data->content->entries;

			$charities = array();
			foreach ($res as $row){
				if ($row->is_charity)
					array_push($charities, $row);
			}

			return $this->rows($charities);
	}

	function get_all_brands_and_charities_object () {
			$data = apiCall("brand/list");

			$res = $this->rows($data->content->entries);
			$brands = array();
			foreach ($res as $row){
					$brands[$row["_id"]] = $row;
			}

			return $brands;
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
                    "tvSeasonEpisodeNumber" => $media["tvSeasonEpisodeNumber"],
                    "brands" => $media["brands"],
					"keywords" => $media["keywords"],
					"added" => $media["added"],
					"brands" => $media["brands"]
            );
			if($media["title"]  && $media["media_type"] != "brand")
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
