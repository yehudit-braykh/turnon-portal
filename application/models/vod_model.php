<?php

class Vod_model extends CI_Model {

    public function __construct() {
        $this->load->helper('uvod_api');
    }

    public function get_items_by_genre($genre, $category = null, $featured = null,$media_type=null) {
        $parameters = array();

        if ($genre)
            $parameters["genre"] = $genre;
        if ($category)
            $parameters["category"] = $category;
        if ($featured)
            $parameters["featured"] = $featured;
        
            $parameters["media_type"] = 'movie|clip|tv_show';
//            $parameters["media_type"] = 'clip';
            $parameters["limit"] = '500';

        return apiCall("vod/list_items_api", $parameters);
    }

    public function get_items_by_aired_date($date,$end_date=null ,$category = null, $featured = null) {
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

        return apiCall("resources/slider", $parameters);
    }

    public function get_genres($scheme) {

        $parameters = array();

        if ($scheme) $parameters["scheme"] = $scheme;

        return apiCall("vod/list_genres", $parameters);
    }

    public function get_dates() {
        date_default_timezone_set('America/Los_Angeles');
        
        $months = array();
        $months[0]['id'] = 'all';
        $months[0]['name'] = 'All';
        for ($i = 0; $i <= 12; $i++) {
            $months[$i + 1]['id'] = $months[$i + 1]['name']= date("F-Y", strtotime(date('Y-m-01') . " -$i months"));
        }

        if (!$months) $months = array();

        return $months;
    }
    
    public function get_policies(){
        $parameters = array();
         return apiCall("vod/get_policies",$parameters);
    }
    
    public function get_policies_by_id($policy_id){
       
          $parameters = array("id" => $policy_id);
         return apiCall("vod/get_policy_by_id",$parameters);
    }

}

?>