<?php
class Brands_model extends CI_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
	}

	public function get_brand($id){

		$parameters= array();
		$paramters["id"] = $id;
		//debug(apiCall("brand/get_item", $parameters));
		return apiCall("brand/get_item", $parameters);
	}

    public function get_brand_offers($id){

		$parameters = array();
		if($id)
			$parameters["id"]= $id;
		//debug(apiCall("brand/get_related_offers", $parameters));
        return apiCall("brand/get_related_offers", $parameters);
    }
    public function get_brand_videos($id){
		$parameters = array();
		if($id)
			$parameters["id"]= $id;
        $data= apiCall("brand/get_related_videos", $parameters);


       	$videos = $this->rows($data->content->entries);

		return $videos;
    }

	public function get_brand_celebs($id){
		$parameters = array();
		if($id)
			$parameters["id"]= $id;
		//debug($id);
        return apiCall("brand/get_related_cellebs", $parameters);
    }


	function get_all_brands () {
            $parameters = array();
            $data = apiCall("brand/list", array("size"=> '9999', 'page'=> '0'));

            $res = $data->content->entries;
            $brands = array();
            foreach ($res as $row) {
	            $brand = new stdclass();
	            $brand->id = $row->_id;
	            $brand->title = $row->title;
	            $brand->images = array();
	            foreach ($row->content as $brand_content) {
	            	$image = new stdclass();
	              	$image->name = $brand_content->assetTypes[0];
	              	$image->url = $brand_content->downloadUrl;
	              	$brand->images[$image->name] = $image;
	            }
	             $brands[$brand->id] = $brand;
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
