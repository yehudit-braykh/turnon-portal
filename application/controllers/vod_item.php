<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Vod_item extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('vod_model');
        $this->load->model('vod_item_model');
        $this->load->model('account_model');
        $this->load->helper('url');
        $this->load->helper('util');
        $this->load->helper('pdk');
    }

    public function info() {
        $uri_arr = $this->uri->uri_to_assoc(3);

        $item = $this->vod_item_model->get_item_data($uri_arr['id'])->content;

        $data['item_year'] = getEntryProperty($item, 'year');
        $data['item_runtime'] = getEntryProperty($item, 'runtime');
        $data['item_language'] = getEntryProperty($item, 'language');
        $data['item_rating'] = getEntryProperty($item, 'rating');
        $data['item_trailer'] = getEntryProperty($item, 'trailer');
        $data['item_genre'] = getEntryProperty($item, 'genre');
        $data['item_tags'] = getEntryProperty($item, 'tags');
        $data['item_director'] = getEntryProperty($item, 'director');
        $data['item_writer'] = getEntryProperty($item, 'writer');
        $data['item_actors'] = getEntryProperty($item, 'actors');
        $data['item_description'] = getEntryProperty($item, 'description');
        $data['media_definition'] = getEntryProperty($item, 'media_definition');

        $this->load->view(views_url() . 'templates/vod_item_info', $data);
    }

    public function critics() {
        $data = array();
        $this->load->view(views_url() . 'templates/vod_item_critics', $data);
    }

    public function comments() {
        $data = array();
        $this->load->view(views_url() . 'templates/vod_item_comments', $data);
    }

    public function seasons() {
        $data = array();

        $uri_arr = $this->uri->uri_to_assoc(3);

        $item = $this->vod_item_model->get_item_data($uri_arr['id'])->content;

        if (isset($item->seasons)) {
            $data['item_id'] = $uri_arr['id'];
            $data['item_seasons'] = $item->seasons;



            $lastSeason = array_reverse($item->seasons);

            for ($i = 0; $i < sizeof($item->seasons); $i++) {
                if ($item->seasons[$i]->number == $lastSeason[0]->number) {

                    for ($h = 0; $h < sizeof($item->seasons[$i]->episodes); $h++) {

                        $commerce_type = getEntryProperty($item->seasons[$i]->episodes[$h]->media, 'commerce');
                        $item->seasons[$i]->episodes[$h]->media->commerce_type = $commerce_type;
                    }
                    $data['item_episodes'] = $item->seasons[$i]->episodes;
                }
            }
        }

        $this->load->view(views_url() . 'templates/vod_item_seasons', $data);
    }

    public function episodes() {
        $data = array();

        $uri_arr = $this->uri->uri_to_assoc(3);

        $item = $this->vod_item_model->get_item_data($uri_arr['id'])->content;

        if (isset($item->seasons)) {
            for ($i = 0; $i < sizeof($item->seasons); $i++) {
                if ($item->seasons[$i]->number == $uri_arr['season']) {

                    for ($h = 0; $h < sizeof($item->seasons[$i]->episodes); $h++) {

                        $commerce_type = getEntryProperty($item->seasons[$i]->episodes[$h]->media, 'commerce');
                        $item->seasons[$i]->episodes[$h]->media->commerce_type = $commerce_type;
                    }
                    $data['item_episodes'] = $item->seasons[$i]->episodes;
                }
            }
        }

        $this->load->view(views_url() . 'templates/vod_item_episodes', $data);
    }

    public function detail() {

        $uri_arr = $this->uri->uri_to_assoc(3);

        $item = $this->vod_item_model->get_item_data($uri_arr['id'])->content;
        if (isset($item->seasons)) {
            $seasons_number = count($item->seasons);
            $episodes_number = 0;
            for ($x = 0; $x < $seasons_number; $x++) {
                $episodes_number += count($item->seasons[$x]->episodes);
            }
        
            $data['item_seasons_number'] = $seasons_number;
            $data['item_episodes_number'] = $episodes_number;
        
        }
        
        $data['section'] = "vod";
        $data['item_id'] = $uri_arr['id'];

        $cover_asset_type = "Poster H";
        if ($this->config->item('cover_asset_type') !== FALSE)
            $cover_asset_type = $this->config->item('cover_asset_type');

        $cover_url = "";
        $cover_url = getEntryThumbnail($item, $cover_asset_type);
        if (!$cover_url)
            $cover_url = getEntryThumbnail($item, "Mezzanine " . $cover_asset_type);

        $data['item_cover'] = $cover_url;

        $data['item_vod_type'] = getEntryVodType($item);
        $data['item_title'] = getEntryProperty($item, 'title');
        $data['item_year'] = getEntryProperty($item, 'year');
        $data['item_runtime'] = getEntryProperty($item, 'runtime');
        $data['item_language'] = getEntryProperty($item, 'language');
        $data['item_rating'] = getEntryProperty($item, 'rating');
        $data['item_trailer'] = getEntryProperty($item, 'trailer');
        $data['item_genre'] = getEntryProperty($item, 'genre');
        $data['item_commerce'] = getEntryProperty($item, 'commerce');
        $_SESSION['commerce_type'] = $data['item_commerce'];
        $data['item_tags'] = getEntryProperty($item, 'tags');
        $data['item_director'] = getEntryProperty($item, 'director');
        $data['item_writer'] = getEntryProperty($item, 'writer');
        $data['item_actors'] = getEntryProperty($item, 'actors');
        $data['item_description'] = getEntryProperty($item, 'description');
        $data['media_definition'] = getEntryProperty($item, 'media_definition');
        $data['item_media_type'] = getEntryProperty($item, 'media_type');
        $data['aired_date'] = getEntryProperty($item, 'aired_date');
        $ad_policy = getEntryProperty($item, 'adPolicyId');
        $ad_policy_arr = explode('/', $ad_policy);
        $data['adPolicyId'] = $ad_policy_arr[sizeof($ad_policy_arr) - 1];
        $data['download_url'] = pdk_get_entry_mobile_streaming_url($item);
        $data['renditions'] = getEntryRenditions($item);
        if(sizeof($data['renditions']) < 1){
            $data['hls_streaming'] = getEntryStreamingUrl($item, 'HLS Stream');
        }

        if ($ad_policy != '') {
            $this->check_ad_policy_expiration(array($ad_policy));
        }
        // get item data to find related
        if ($this->config->item('create_items_on_view') !== FALSE) {
            $data['item_related_items'] = $this->vod_item_model->get_items_related($uri_arr['id'], getEntryFirstVodCategory($item), getEntryFirstGenre($item), getEntryFirstFeaturedCategory($item), getEntryFirstMediaType($item));
        } else {
            $data['item_related_items'] = $this->create_items($this->vod_item_model->get_items_related($uri_arr['id'], getEntryFirstVodCategory($item), getEntryFirstGenre($item), getEntryFirstFeaturedCategory($item), getEntryFirstMediaType($item)), 4);
        }

        // release id - asset type for videos is Video
        $release_url = getEntryReleaseUrl($item, "Video");
        $data['item_release_url'] = $release_url;

        // trailer release id - asset type for videos is Video
        $trailer_release_url = getEntryReleaseUrl($item, "Trailer");
        $data['item_trailer_release_url'] = $trailer_release_url;

        if ($this->config->item('theme') == 'orbita' || $this->config->item('theme') == 'htv') {
            $data['items_category_1'] = $this->vod_model->get_items_by_genre(VOD_ALL, VOD_ALL, RECOMMENDED);
        }

        $this->load->view(views_url() . 'templates/header', $data);
        $this->load->view(views_url() . 'pages/vod_item', $data);
        $this->load->view(views_url() . 'templates/footer', $data);
    }

    private function create_items($items, $max = 0) {

        $ret = "";

        if ($items->content) {
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
                    $cover_url = getEntryThumbnail($items->content->entries[$i], "Mezzanine Poster V");

                $item_id_arr = explode("/", $items->content->entries[$i]->id);
                $item_id = $item_id_arr[sizeof($item_id_arr) - 1];
                $commerce_class = getEntryProperty($items->content->entries[$i], 'commerce');

                $mediatype = getEntryProperty($items->content->entries[$i], 'media_type');
                $aired_date_div = "";
                $ret .= '<div class="col4 no_spacer img_hover_box" style="width:' . $cover_width . '">
                                <a href="' . base_url() . 'index.php/vod_item/detail/id/' . $item_id . '" class="cover" style="width:' . $cover_width . ';height:' . $cover_height . ';">';

                if ($mediatype != "tv_show" && $this->config->item('theme') !== 'orbita') {
                    $aired_date_div = '<div>' . parseDate(getEntryProperty($items->content->entries[$i], 'aired_date')) . '</div>';
                    $ret.= '<div class="ribbon_content ' . $commerce_class . '" style="width:' . $cover_width . ';height:' . $cover_height . ';"></div>';
                }

                $ret.= '<img class="item_img" src="' . $cover_url . '" />
                        <div class="h" style="width:' . $cover_h_width . ';height:' . $cover_h_height . ';">
                        <div class="title_content">' . getEntryProperty($items->content->entries[$i], 'title') . '</div>' .
                        $aired_date_div .
                        ' </div>   
				</a>
                                
		        </div>';
                if ($max != 0 && $i == $max - 1)
                    break;
            }
        }

        return $ret;
    }

    public function check_commerce_status() {

        $commerce_type = $_SESSION['commerce_type'];
        switch ($commerce_type) {
            case 'commerce_free':
                $return = 'enabled';
                break;
            case 'commerce_members':
                if (isset($_SESSION['uvod_user_data']->token) && $_SESSION['uvod_user_data']->token != '') {
                    $return = 'enabled';
                } else {
                    $return = 'login';
                }
                break;

            case 'commerce_subscription':

                if (isset($_SESSION['uvod_user_data']->token) && $_SESSION['uvod_user_data']->token != '') {

                    $subscription = $this->account_model->get_contract($_SESSION['uvod_user_data']->id,'true');
                    if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {

                        $return = 'enabled';
                    } else {
                        $return = 'subscriber';
                    }
                } else {
                    $return = 'login';
                }
                break;
            default :
                $return = 'enabled';
                break;
        }
        echo json_encode($return);
    }

    public function check_ad_policy_expiration($id) {

        $advertisement = $this->vod_item_model->check_ad_policy_expiration($id);
    }

}
