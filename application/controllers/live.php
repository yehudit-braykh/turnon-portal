<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Live extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('live_model');
        $this->load->model('account_model');
        $this->load->model('vod_item_model');
        $this->load->model('vod_model');
        $this->load->helper('pdk');
//         if ($this->config->item('timezone')) {
//            date_default_timezone_set($this->config->item('timezone'));
//        }
    }

    public function main($id = null) {

        if ($id) {
            $data['channel_selected'] = $id;
        }

        $data['section'] = "live";

        $channels = null;
        $channels_obj = $this->live_model->list_channels();
        if ($channels_obj && isset($channels_obj->content)) {
            $channels = $channels_obj->content;
        }

        $data['channels'] = $channels;
        $channels_stream = array();
        $ids = array();



        if ($channels && $channels->entries && isset($channels->entries[0]->media)) {
            for ($i = 0; $i < sizeof($channels->entries); $i++) {

                // release id - asset type for videos is Video
                $item = $channels->entries[$i]->media;

                $policy_id = getEntryProperty($item, 'adPolicyId');
               
                if ($policy_id != '') {
                    $ids[] = getEntryProperty($item, 'adPolicyId');
                }

                $release_hls_url = getEntryStreamingUrl($item, "HLS Stream");
                $release_hls_url_stream = $release_hls_url;

                $release_hls_blocked_url = getEntryStreamingUrl($item, "HLS Blocked Stream");
                $release_hls_blocked_url_stream = $release_hls_blocked_url;

                $channel_stream_obj = new stdClass();

                $channel_stream_obj->hls = $release_hls_url_stream;

                $channel_stream_obj->hls_blocked = $release_hls_blocked_url_stream;
                $policy_arr= explode('/', $policy_id);
                $channel_stream_obj->policy_id = $policy_arr[sizeof($policy_arr)-1];
               
                $channels_stream[] = $channel_stream_obj;
            }
        }

        if (sizeof($ids) > 0) {
            $this->vod_item_model->check_ad_policy_expiration($ids);
        }

        $data['channels_stream'] = $channels_stream;


        $data['account_status'] = $this->check_commerce_status();

        $this->load->view(views_url() . 'templates/header', $data);
        $this->load->view(views_url() . 'pages/live', $data);
        $this->load->view(views_url() . 'templates/footer', $data);
    }

    public function epg_timeline() {

        if (isset($_POST['channel'])) {
            $channel = $_POST['channel'];
        }
        if (isset($_POST['country'])) {
            $country = $_POST['country'];
        }

        if ($this->input->post('timezone')) {

            $timezone_offset = $this->input->post('timezone');
            date_default_timezone_set($timezone_offset);
            
        } else {

            $timezone_offset = null;
        }
        $data = array();
        $time = time();

        $data['epg'] = $this->live_model->get_epg_timeline($time, 168, $channel);
        $data['country'] = $country;

        $ajax_response = $this->load->view(views_url() . 'templates/epg_timeline', $data, TRUE);

        $this->output->set_output($ajax_response);
    }

    public function epg_home_timeline() {

        if ($this->input->post('timezone')) {

            $timezone_offset = $this->input->post('timezone');
            date_default_timezone_set($timezone_offset);
        }

        $data = array();
        $data['epg'] = $this->live_model->get_epg_data();

        $ajax_response = $this->load->view(views_url() . 'templates/epg_home_timeline', $data, TRUE);

        $this->output->set_output($ajax_response);
    }

    public function check_commerce_status() {


        if (isset($_SESSION['user_data']->token) && $_SESSION['user_data']->token != '') {

            $subscription = $this->account_model->get_contract($_SESSION['user_data']->id);
            if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {

                $return = 'enabled';
            } else {
                $return = 'subscriber';
            }
        } else {
            $return = 'login';
        }


        return $return;
    }

    

}
