<?php

class Vod_model extends Uvod_model {

    public function __construct() {
        $this->load->helper('uvod_api');
        $this->load->model('fastcache_model');
    }

    public function get_items_by_genre($genre, $category = null, $featured = null, $media_type = null, $limit = null, $sort = null) {
        $parameters = array();

        if ($genre)
            $parameters["genre"] = $genre;
        if ($category)
            $parameters["category"] = $category;
        if ($featured)
            $parameters["featured"] = $featured;

        $parameters["media_type"] = 'movie|clip|tv_show|episode';

        $parameters["limit"] = $limit;

        $parameters["sort"] = $sort;

        $cache_id = 'list_items_api' . $genre . $category . $featured;


            $data = apiCall("vod/list_items_api", $parameters);
            $data = $this->rows($data->content->entries);



        //$res = $this->$row
        return  $data;
    }

    public function get_items_by_aired_date($date, $end_date = null, $category = null, $featured = null, $limit = null, $sort = null) {
        $parameters = array();

        if ($date)
            $parameters["aired_date"] = $date;
        if ($end_date)
            $parameters["end_date"] = $end_date;
        if ($category)
            $parameters["category"] = $category;
        if ($featured)
            $parameters["featured"] = $featured;

        $parameters["media_type"] = 'clip|tv_show';

         $parameters["limit"] = $limit;
        $parameters["sort"] = $sort;

        return apiCall("vod/list_items_api", $parameters);
    }

    public function get_items_by_vod_category($category) {
        $parameters = array();

        if ($category)
            $parameters["category"] = $category;

        $parameters["media_type"] = 'clip|tv_show';

        return apiCall("vod/get_media_by_vod_category", $parameters);
    }

    public function set_vod_category($json) {

        return apiPost("vod/set_vod_category", array('json' => $json));
    }

    public function get_slider($target, $section) {

        $parameters = array("target" => $target, "section" => $section);

        $cache_id = 'get_slider';

        $cache = $this->fastcache_model->get_cache($cache_id);
        if (!$cache) {
            $data =  apiCall("resources/slider", $parameters);
            $this->fastcache_model->set_cache($cache_id, $data);
        } else {;
            $data = $cache;
        }

        return $data;
    }

    public function get_genres($scheme) {

        $parameters = array();

        if ($scheme)
            $parameters["scheme"] = $scheme;

        $cache_id = 'get_genre';

        $cache = $this->fastcache_model->get_cache($cache_id);
        if (!$cache) {
            $data = apiCall("vod/list_genres", $parameters);
            $this->fastcache_model->set_cache($cache_id, $data);
        } else {;
            $data = $cache;
        }
        $content = $data->content;
        $genres = array();
        for ($i=0; $i < count($content); $i++) {
            array_push($genres, $content[$i]->title);
        }

        // debug($genres);
        return $genres;
    }

    public function get_dates() {
        date_default_timezone_set('UTC');

        $months = array();
        $months[0]['id'] = 'all';
        $months[0]['name'] = 'All';
        for ($i = 0; $i <= 12; $i++) {
            $months[$i + 1]['id'] = $months[$i + 1]['name'] = date("F-Y", strtotime(date('Y-m-01') . " -$i months"));
        }

        if (!$months)
            $months = array();

        return $months;
    }

    public function get_policies() {
        $parameters = array();
        return apiCall("vod/get_policies", $parameters);
    }

    public function get_policies_by_id($policy_id) {

        $parameters = array("id" => $policy_id);
        return apiCall("vod/get_policy_by_id", $parameters);
    }

    function rows($rows){
        //debug($rows);
        $medias = array();
        foreach ($rows as $media) {
            $media = (array) $media;

            $tmp = array(
                    "_id" => $media["_id"],
                    //"title" => 	$media["title"],
                    "series_id" => 	$media["series_id"],
                    "description" => $media["description"],
                    "tvSeasonEpisodeNumber" => $media["tvSeasonEpisodeNumber"],
                    "date" => $media["added"],
                    "brands" => $media["brands"],
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
