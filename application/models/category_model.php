<?php
class category_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');

	}

	public function get_all_categories() {
        $parameters = array();

        $parameters["scheme"] = 'vod';
		$data = apiCall("vod/list_genres", $parameters);

		$cats= (array)$data->content;

		foreach ($cats as $key=>$cat){
			$cat->icon_url='/assets/theme/clixtv/images/cats/cat'.(($key % 9)+1).'.jpg';
		}
        //debug($genres);
        return $cats;

    }

	public function get_category_by_name($catName) {
        $parameters = array();

        $parameters["scheme"] = 'vod';
		$data = apiCall("vod/list_genres", $parameters);

		$cats= (array)$data->content;

		foreach ($cats as $key=>$cat){
			$cat->icon_url='/assets/theme/clixtv/images/cats/cat'.(($key % 9)+1).'.jpg';
		}

		foreach ($cats as $cat){
			if (strtolower($cat->title)== strtolower($catName))
				return $cat;
		}


        //debug($genres);
        return null;

    }

	public function get_category_videos($cat) {

		$parameters = array();
        if ($cat)
            $parameters["genre"] = $cat;
        $parameters["media_type"] = 'movie|clip|tv_show|episode';
        $parameters["limit"] = null;
        $parameters["sort"] = null;
        $data= apiCall("vod/list_items_api", $parameters);

       	$videos = $this->rows($data->content->entries);
		//debug($videos);
		return $videos;
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
            );
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
