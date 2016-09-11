<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Vod extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('vod_model');
        $this->load->model('live_model');
        $this->load->model('fastcache_model');
        $this->load->helper('pdk');

         if (isset($_GET['flush_cache']) && $_GET['flush_cache'] == 'true') {
            $this->fastcache_model->clean_cache();
        }

        date_default_timezone_set('UTC');
    }

    public function featured($sub_section = COMING_SOON) {
    	
    	//debug(class_exists('Mongo'));
    	//debug(PHP_INT_SIZE);
    	//debug("B", is_32bit());
    	$this->load->model("categories");
    	
    	
    	
    	$res = $this->categories->get_all();
    	foreach ($res as $cat){
    		$categories[] = array("title" => $cat["title"], "_id" => $cat["_id"]);
    	}
    	$data["categories"] = $categories;
    	
    	/*
        // default categories
        $data = array();
        $data['category1'] = $this->config->item('category1');
        $data['category2'] = $this->config->item('category2');
        $data['category3'] = $this->config->item('category3');
        $data['section'] = "featured";
        debug("A", $data);
        // get slider
        $data['slider'] = $this->vod_model->get_slider(APP_TARGET, $sub_section);

        // genres filter
        $items = array();
        $recommended = $this->vod_model->get_items_by_genre(VOD_ALL, VOD_ALL, RECOMMENDED, null, '12', 'aired_date:-1');
        for ($i = 0; $i < sizeof($recommended->content->entries); $i++) {
            $items[] = $recommended->content->entries[$i];
        }
        $new_releases = $this->vod_model->get_items_by_genre(VOD_ALL, VOD_ALL, NEW_RELEASES, null, '16', 'aired_date:-1');
        for ($i = 0; $i < sizeof($new_releases->content->entries); $i++) {
            $items[] = $new_releases->content->entries[$i];
        }
        $coming_soon = $this->vod_model->get_items_by_genre(VOD_ALL, VOD_ALL, COMING_SOON, null, '12', 'aired_date:-1');
        for ($i = 0; $i < sizeof($coming_soon->content->entries); $i++) {
            $items[] = $coming_soon->content->entries[$i];
        }

        $categories = array($data['category1']['value'], $data['category2']['value'], $data['category3']['value']);
        $data['items'] = $this->get_items_by_value('featured_category', $categories, $items);

        // $this->load->view(views_url() . 'templates/header', $data);
        // if ($this->config->item('load_submenu') != false) {
        //     $this->load->view(views_url() . 'templates/sub_menu1', $data);
        // }
        // $this->load->view(views_url() . 'pages/vod', $data);
        // $this->load->view(views_url() . 'templates/footer', $data);*/
        $this->load->view(views_url() . 'components/html', $data);
    }

    public function reset_vod_category($category, $new_category) {

        if ($category == '')
            return;
        $items = $this->vod_model->get_items_by_vod_category($category);
        $data = array();

        for ($i = 0; $i < sizeof($items->content->entries); $i++) {

            $data[$i] = json_encode($items->content->entries[$i]);
        }

        $result = implode(',', $data);
        $json = str_replace($category, $new_category, $result);
        $ret = $this->vod_model->set_vod_category($json);
        echo 'ok';
    }

    public function section($category, $genre = "", $end_date = "") {


        // special fixed category: featured
        if ($category == "featured") {
            if (!$genre)
                $genre = COMING_SOON;
            return $this->featured($genre);
        }

        $vod_categories = $this->config_model->get_vod_categories()->content;
        foreach ($vod_categories as $value) {
            if ($value->id == $category) {
                $filter = $value->filter_field;
                $data['category'] = $value->title;
                if (isset($value->section_header_image)) {
                    $data['header_image'] = $value->section_header_image;
                }
            }
        }

        // all others categorie filtered by genre
        switch ($filter) {
            case 'genre': {
                    if (!$genre)
                        $genre = MOVIES_DEFAULT_CATEGORY;

                    $genre_scheme = "";
                    if ($this->config->item('genres_scheme') !== FALSE)
                        $genre_scheme = $this->config->item('genres_scheme');

                    $genres_obj = $this->vod_model->get_genres($genre_scheme);

                    $genres = null;
                    if ($genres_obj && isset($genres_obj->content)) {
                        $genres = $genres_obj->content;
                    }

                    $data['genres'] = $genres;
                    $data['selected_category_id'] = $genre;
                    $data['selected_category_text'] = "";

                    for ($i = 0; $i < sizeof($genres); $i++) {
                        if ($genres[$i]->id == $genre) {
                            $data['selected_category_text'] = $genres[$i]->description;
                            break;
                        }
                    }

                    $data['items_category_1'] = $this->create_items($this->vod_model->get_items_by_genre($genre, $category, null, null, '5000', 'aired_date:-1'));
                    break;
                }
            case 'aired_date': {

                    if ($genre == 'all') {
                        $genre = '';
                    }
                    $months = $this->vod_model->get_dates();
                    $data['months'] = $months;
                    $data['selected_category_id'] = $genre;
error_log("genre: ".$genre. " date: ". $end_date. " category: ". $category);
                    if ($this->config->item('create_items_on_view') !== FALSE) {
                        $data['items_category_1'] = $this->vod_model->get_items_by_aired_date($genre, $end_date, $category, null,'1000', 'aired_date:-1');
                    } else {
                        $data['items_category_1'] = $this->create_items($this->vod_model->get_items_by_aired_date($genre, $end_date, $category, null ,'1000', 'aired_date:-1'));
                    }

                    $data['selected_category_text'] = 'All';
                    for ($i = 0; $i < sizeof($months); $i++) {
                        if ($months[$i]['id'] == $genre) {
                            $data['selected_category_text'] = $months[$i]['name'];
                            break;
                        }
                    }
                    break;
                }
        }

        // if ($this->config->item('create_items_on_view') !== FALSE) {
        //     $this->load->view(views_url() . 'templates/header', $data);
        //     if ($this->config->item('load_submenu') != false) {
        //         $this->load->view(views_url() . 'templates/sub_menu1', $data);
        //     }
        //     $this->load->view(views_url() . 'pages/vod_list', $data);
        //     $this->load->view(views_url() . 'templates/footer', $data);
        // } else {
        //     $this->parser->parse(views_url() . 'templates/header', $data);
        //     if ($this->config->item('load_submenu') != false) {
        //         $this->load->view(views_url() . 'templates/sub_menu1', $data);
        //     }
        //     $this->parser->parse(views_url() . 'pages/vod_list', $data);
        //     $this->parser->parse(views_url() . 'templates/footer', $data);
        // }
        $this->load->view(views_url() . 'components/html', $data);
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

                $item_id_arr = explode("/", $items->content->entries[$i]->_id);
                $item_id = $item_id_arr[sizeof($item_id_arr) - 1];
                $commerce_class = getEntryProperty($items->content->entries[$i], 'commerce');

                $mediatype = getEntryProperty($items->content->entries[$i], 'media_type');
                $aired_date_div = "";
                $ret .= '<div class="col4 no_spacer img_hover_box" style="width:' . $cover_width . '">
                                <a href="' . base_url() . 'index.php/vod_item/detail/id/' . $item_id . '" class="cover" style="width:' . $cover_width . ';height:' . $cover_height . ';">';

                if ($mediatype != "tv_show" && $this->config->item('theme') !== 'orbita') {

                    $aired_date_val = getEntryProperty($items->content->entries[$i], 'aired_date');
                    $aired_date_str = $aired_date_val ? date('F d, Y',($aired_date_val/1000)) : '';

                    $aired_date_div = '<div>' . $aired_date_str . '</div>';
                    $ret.= '<div class="ribbon_content ' . $commerce_class . '" style="width:' . $cover_width . ';height:' . $cover_height . ';margin:5px"></div>';
                }

                $ret.= '<img class="item_img" src="' . $cover_url . '" />

                               </a>
                           <div class="h" style="width:' . $cover_h_width . ';height:' . $cover_h_height . ';margin:5px 0px 0px 5px;">
                        <div class="title_content">' . getEntryProperty($items->content->entries[$i], 'title') . '</div>' .
                    $aired_date_div .
                    '</div>
		        </div>';
            }
        }

        return $ret;
    }

    private function get_items_by_value($category, $values, $items) {
        $return = array();
        for ($i = 0; $i < sizeof($items); $i++) {
            for ($h = 0; $h < sizeof($values); $h++) {
                if (in_array($values[$h], $items[$i]->{$category})) {
                    if (array_key_exists($values[$h], $return)) {

                        $data = $this->get_item_data($items[$i]);
                        if (!array_key_exists($data->id, $return[$values[$h]])) {
                            $return[$values[$h]][$data->id] = $data;
                        }
                    } else {
                        $return[$values[$h]] = array();
                        $data = $this->get_item_data($items[$i]);
                        $return[$values[$h]][$data->id] = $data;
                    }
                }
            }
        }

        return $return;
    }

    private function get_item_data($item) {
        $data = new stdClass();

        $data->id = $item->_id;
        $data->title = $item->title;

        $cover_asset_type = "Poster V";
        if ($this->config->item('cover_asset_type') !== FALSE) {
            $cover_asset_type = $this->config->item('cover_asset_type');
        }

        $cover_url = getEntryThumbnail($item, $cover_asset_type);
        if (!$cover_url) {
            $cover_url = getEntryThumbnail($item, "Mezzanine " . $cover_asset_type);
        }
        $data->img_url = $cover_url;


        $mediatype = getEntryProperty($item, 'media_type');
        if ($mediatype != "tv_show" && $this->config->item('theme') !== 'orbita') {

            $data->commerce_class = getEntryProperty($item, 'commerce');

            $aired_date = getEntryProperty($item, 'aired_date');
            if ($aired_date !== '') {
                $data->aired_date = date('F d, Y', $aired_date/1000);
            } else {
                $data->aired_date = '';
            }
        } else {
            $data->commerce_class = '';
            $data->aired_date = '';
        }
        return $data;
    }

    public function get_advertisement_xml() {
        header('Content-Type: application/xml; charset=utf-8');
        if (isset($_GET['policy_id'])) {

            $policy = $this->vod_model->get_policies_by_id($_GET['policy_id']);

            $new_XML = new SimpleXMLElement("<VAST></VAST>");
            $new_XML->addAttribute('version', '2.0');
            $new_ad = $new_XML->addChild('Ad');
            $new_ad->addAttribute('id', 'static');
            $new_inline = $new_ad->addChild('InLine');
            $new_ad_system = $new_inline->addChild('AdSystem', 'Static VAST Template');
            $new_ad_title = $new_inline->addChild('AdTitle', 'Static VAST Tag');
            $new_impression = $new_inline->addChild('Impression', '');
            $new_creatives = $new_inline->addChild('Creatives');
            $new_creative = $new_creatives->addChild('Creative');
            $new_linear = $new_creative->addChild('Linear');
            $new_duration = $new_linear->addChild('Duration', '00:00:10');
            $new_tracking_events = $new_linear->addChild('TrackingEvents');
            $new_tracking_01 = $new_tracking_events->addChild('Tracking', '');
            $new_tracking_01->addAttribute('event', 'start');
            $new_tracking_02 = $new_tracking_events->addChild('Tracking', '');
            $new_tracking_02->addAttribute('event', 'firstQuartile');
            $new_tracking_03 = $new_tracking_events->addChild('Tracking', '');
            $new_tracking_03->addAttribute('event', 'midpoint');
            $new_tracking_04 = $new_tracking_events->addChild('Tracking', '');
            $new_tracking_04->addAttribute('event', 'complete');
            $new_tracking_05 = $new_tracking_events->addChild('Tracking', '');
            $new_tracking_05->addAttribute('event', 'static');
            $new_tracking_06 = $new_tracking_events->addChild('Tracking', '');
            $new_tracking_06->addAttribute('event', 'pause');
            $new_tracking_07 = $new_tracking_events->addChild('Tracking', '');
            $new_tracking_07->addAttribute('event', 'fullscreen');
            $new_video_clicks = $new_linear->addChild('VideoClicks');
            $new_video_clicks->addChild('ClickThrough', 'http://www.longtailvideo.com/');
            $new_video_clicks->addChild('ClickTracking', '');

            if (isset($policy->content->entries[0]->{'pladpolicy$preRoll'}->{'pladpolicy$url'})) {
                $new_media_files = $new_linear->addChild('MediaFiles');
                $new_media_file = $new_media_files->addChild('MediaFile', $policy->content->entries[0]->{'pladpolicy$preRoll'}->{'pladpolicy$url'});
                $new_media_file->addAttribute('type', 'video/mp4');
                $new_media_file->addAttribute('bitrate', '300');
                $new_media_file->addAttribute('width', '720');
                $new_media_file->addAttribute('height', '480');
            }

            echo $new_XML->asXML();
        }
    }

}
