<?php

class Vod_item_model extends CI_Model {

    public function __construct() {
        $this->load->helper('uvod_api');
        $this->load->model('fastcache_model');
    }

    public function get_item_data($id) {
        $token = "";

        $cache_id = 'vod/item_api' . $id;

        $cache = $this->fastcache_model->get_cache($cache_id);

        if (!$cache) {
            error_log('item data - usa la base');
            $data = apiCall("vod/item_api", array("id" => $id, "token" => $token));
            $this->fastcache_model->set_cache($cache_id, $data);
        } else {
            error_log('item data - usa el cache');
            $data = $cache;
        }

        return $data;
        //return apiCall("vod/item_api", array("id" => $id, "token" => $token));
    }

    public function get_items_related($id, $category, $genre, $featured, $media_type) {
        $parameters = array();
        $parameters["id"] = $id;
        if ($category)
            $parameters["category"] = $category;
        if ($genre)
            $parameters["genre"] = $genre;
        if ($featured)
            $parameters["featured"] = $featured;
        if ($media_type)
            $parameters["media_type"] = $media_type;
        
           $cache_id = 'vod/list_items_related' . $id .$category.$genre.$media_type;
        
        $cache = $this->fastcache_model->get_cache($cache_id);

        if (!$cache) {
            error_log('items related - usa la base');
            $data = apiCall("vod/list_items_related", $parameters);
            $this->fastcache_model->set_cache($cache_id, $data);
        } else {
            error_log('items related - usa el cache');
            $data = $cache;
        }

        return $data;
        
    }

    public function check_ad_policy_expiration($ids) {
        return apiPost("vod/check_ad_policy_expiration", array('ids' => $ids));
    }

}

?>