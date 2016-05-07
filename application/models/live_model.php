<?php

class Live_model extends CI_Model {

    public function __construct() {
        $this->load->helper('uvod_api');
        $this->load->model('fastcache_model');
    }

    public function list_channels() {

        $cache_id = 'live/list_channels';

        $cache = $this->fastcache_model->get_cache($cache_id);
        if (!$cache) {
            error_log('LIVE CHANNELS - USA LA BASE');
            $data = apiCall("live/list_channels");
            $this->fastcache_model->set_cache($cache_id, $data);
        } else {
            error_log('LIVE CHANNELS - USA EL CACHE');
            $data = $cache;
        }

        return $data;
    }

    public function get_epg($date, $length, $channel) {
        return apiCall("live/list_epg", array('start' => $date, 'length' => $length, 'channel' => $channel));
    }

    public function get_epg_timeline($date, $length, $channel) {

        $cache_id = 'live/epg_timeline_' . $channel;

        $cache = $this->fastcache_model->get_cache($cache_id);
        if (!$cache) {
            error_log('EPG TIMELINE - USA LA BASE');
            $data = apiPost("live/get_epg_timeline", array('start' => $date, 'length' => $length, 'channel' => $channel));
            $this->fastcache_model->set_cache($cache_id, $data, 300);
        } else {
            error_log('EPG TIMELINE - USA EL CACHE');
            $data = $cache;
        }

        return $data;
    }

    public function get_epg_data($date = null) {
        if ($date) {

            return apiPost("live/list_epg_data", array('date' => $date));
        } else {
            return apiPost("live/list_epg_data");
        }
    }

}

?>