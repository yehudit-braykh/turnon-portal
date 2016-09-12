<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once(APPPATH.'/models/base_mongo.php');


class Medias extends base_mongo {

    public function __construct() {
        parent::__construct("medias");
    }
	function get_series_by_cat($category){
		$this->ci->mongo_db->where(
				array(
						"content" => array(
								"\$elemMatch" => array(
										"assetTypes" => array("\$in" => array("Mezzanine Video"))
								)
						), 
						"categories" => array(
								"\$elemMatch" => array("name" => $category)
						)
				)
		);
		//debug($this->collection);
		$res = $this->ci->mongo_db->get($this->collection);
		
		foreach ($res as $media) {
			$tmp = array(
				"_id" => $media["_id"],
				"title" => 	$media["title"],
			);
			foreach ($media["content"] as $file) {
				$tmp[$file["assetTypes"][0]] = array(
					"url" => $file["downloadUrl"]
				);
			}
			$medias[] = $tmp;
		}
		return $medias;
	}

}