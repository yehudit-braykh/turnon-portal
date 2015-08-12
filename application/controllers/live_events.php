<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Live_events extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('live_events_model');
        $this->load->model('account_model');
        $this->load->model('event_model');
        $this->load->model('vod_model');
        $this->load->model('vod_item_model');
        $this->load->helper('pdk');
    }

    public function mobile($id = null) {

        $media_ids = array();
        // checks if user is logged in
        if (isset($_SESSION['user_data']) && isset($_SESSION['user_data']->id)) {

            $orders = $this->event_model->get_orders($_SESSION['user_data']->id);
            $data['orders'] = $orders;

            if (isset($orders) && sizeof($orders->content->entries) > 0) {

                for ($h = 0; $h < sizeof($orders->content->entries); $h++) {

                    $id_arr = explode('/', $orders->content->entries[$h]->{'plorderitem$productId'});
                    $product_id = $id_arr[sizeof($id_arr) - 1];
                    if ($h == 0) {
                        $product_ids = $product_id;
                    } else {
                        $product_ids .= '|' . $product_id;
                    }
                }

                $products = $this->live_events_model->get_event_products($product_ids);

                if (isset($products->content->entries) && sizeof($products->content->entries) > 0) {

                    for ($i = 0; $i < sizeof($products->content->entries); $i++) {

                        $events_ids = $products->content->entries[$i]->{'plproduct$scopeIds'};

                        for ($j = 0; $j < sizeof($events_ids); $j++) {
                            if (!in_array($events_ids[$j], $media_ids)) {
                                $media_ids[] = $events_ids[$j];
                            }
                        }
                    }
                }
            }
        }


        $data = array();

        $next_event = $this->live_events_model->get_next_event();
        $flag = 0;

        // check if there is a next event
        if ($next_event->content->entryCount) {
            //if (isset($next_event->content->entries[0]->{'pl1$event_is_over'}) && !$next_event->content->entries[0]->{'pl1$event_is_over'}) {
            for ($i = 0; $i < sizeof($next_event->content->entries); $i++) {
                if (in_array($next_event->content->entries[$i]->id, $media_ids)) {
                    $event = $next_event->content->entries[$i];
                    $flag = 1;
                    break;
                }
            }

            if ($flag === 0) {
                $event = $next_event->content->entries[0];
                $data['event_already_purchased'] = false;
            } else {
                $data['event_already_purchased'] = true;
                $data['items_category_1'] = $this->create_items($this->vod_model->get_items_by_genre(VOD_ALL, 'champs_2015_exclusive', ''), MAX_PAGE_ITEMS);
            }

            $data['event_id'] = $event->id;
            $data['event_title'] = $event->title;
            $data['event_image'] = getEntryThumbnail($event, "Poster Live Event");
            $data['event_time'] = ($event->{'pl1$event_date'} - (time() * 1000)) / 1000;
            $data['event_datetime'] = $event->{'pl1$event_date'};
            $data['event_stream_url'] = getEntryFileUrl($event, "HLS Stream");

        }

        $this->load->view(views_url() . 'pages/mobile_event', $data);

    }

    public function main($id = null) {

error_log('entra a LIVE EVENTS: '.date('H:i',time()));
        $media_ids = array();
        // checks if user is logged in
        if (isset($_SESSION['user_data']) && isset($_SESSION['user_data']->id)) {

            $orders = $this->event_model->get_orders($_SESSION['user_data']->id);
            $data['orders'] = $orders;

            if (isset($orders) && sizeof($orders->content->entries) > 0) {

                for ($h = 0; $h < sizeof($orders->content->entries); $h++) {

                    $id_arr = explode('/', $orders->content->entries[$h]->{'plorderitem$productId'});
                    $product_id = $id_arr[sizeof($id_arr) - 1];
                    if ($h == 0) {
                        $product_ids = $product_id;
                    } else {
                        $product_ids .= '|' . $product_id;
                    }
                }

                $products = $this->live_events_model->get_event_products($product_ids);

                if (isset($products->content->entries) && sizeof($products->content->entries) > 0) {

                    for ($i = 0; $i < sizeof($products->content->entries); $i++) {

                        $events_ids = $products->content->entries[$i]->{'plproduct$scopeIds'};

                        for ($j = 0; $j < sizeof($events_ids); $j++) {
                            if (!in_array($events_ids[$j], $media_ids)) {
                                $media_ids[] = $events_ids[$j];
                            }
                        }
                    }
                }
            }
        }


        $data = array();

        $next_event = $this->live_events_model->get_next_event();
        $flag = 0;

        // check if there is a next event
        if ($next_event->content->entryCount) {
            //if (isset($next_event->content->entries[0]->{'pl1$event_is_over'}) && !$next_event->content->entries[0]->{'pl1$event_is_over'}) {
            for ($i = 0; $i < sizeof($next_event->content->entries); $i++) {
                if (in_array($next_event->content->entries[$i]->id, $media_ids)) {
                    $event = $next_event->content->entries[$i];
                    $flag = 1;
                    break;
                }
            }

            if ($flag === 0) {
                $event = $next_event->content->entries[0];
                $data['event_already_purchased'] = false;
            } else {
                $data['event_already_purchased'] = true;
                $data['items_category_1'] = $this->create_items($this->vod_model->get_items_by_genre(VOD_ALL, 'champs_2015_exclusive', ''), MAX_PAGE_ITEMS);
            }

            $data['event_id'] = $event->id;
            $data['event_title'] = $event->title;
            $data['event_image'] = getEntryThumbnail($event, "Poster Live Event");
            $data['event_time'] = ($event->{'pl1$event_date'} - (time() * 1000)) / 1000;
            $data['event_datetime'] = $event->{'pl1$event_date'};
            $data['event_stream_url'] = getEntryFileUrl($event, "HLS Stream");

        }

        $this->load->view(views_url() . 'templates/header', $data);
        $this->load->view(views_url() . 'pages/live_events', $data);
        $this->load->view(views_url() . 'templates/footer', $data);
    }

    private function create_items($items, $max = 0) {

        $ret = "";

        if ($items && isset($items->content)) {
            for ($i = 0; $i <= sizeof($items->content->entries) - 1; $i++) {

                $cover_asset_type = "Poster V";
                if ($this->config->item('cover_asset_type') !== FALSE)
                    $cover_asset_type = $this->config->item('cover_asset_type');

                $cover_width = "118px";
                if ($this->config->item('cover_width') !== FALSE)
                    $cover_width = $this->config->item('cover_width');

                $cover_height = "174px";
                if ($this->config->item('cover_height') !== FALSE)
                    $cover_height = $this->config->item('cover_height');

                $cover_h_width = "113px";
                if ($this->config->item('cover_h_width') !== FALSE)
                    $cover_h_width = $this->config->item('cover_h_width');

                $cover_h_height = "34px";
                if ($this->config->item('cover_h_height') !== FALSE)
                    $cover_h_height = $this->config->item('cover_h_height');

                $cover_url = getEntryThumbnail($items->content->entries[$i], $cover_asset_type);
                if (!$cover_url)
                    $cover_url = getEntryThumbnail($items->content->entries[$i], "Mezzanine " . $cover_asset_type);

                $item_id_arr = explode("/", $items->content->entries[$i]->id);
                $item_id = $item_id_arr[sizeof($item_id_arr) - 1];

                $mediatype = getEntryProperty($items->content->entries[$i], 'media_type');
                $aired_date_div = "";
                $ret .= '<div class="col4 no_spacer img_hover_box" style="width:' . $cover_width . '">
                                <a href="' . base_url() . 'index.php/vod_item/detail/id/' . $item_id . '" class="cover" style="width:' . $cover_width . ';height:' . $cover_height . ';">';
                if ($mediatype != "tv_show") {
                    $aired_date_div = '<div>' . parseDate(getEntryProperty($items->content->entries[$i], 'aired_date')) . '</div>';
                    //$ret.= '<div class="ribbon_content '. $commerce_class . '" style="width:' . $cover_width . ';height:' . $cover_height . ';"></div>';
                }

                $ret.= '<img class="item_img" src="' . $cover_url . '" />
                        <div class="h" style="width:' . $cover_h_width . ';height:' . $cover_h_height . ';">
                        <div class="title_content">' . getEntryProperty($items->content->entries[$i], 'title') . '</div>' .
                        $aired_date_div .
                        '</div>                                        
                               </a>
                                
		        </div>';
//                if ($max != 0 && $i == $max - 1)
//                    break;
            }
        }

        return $ret;
    }

}
