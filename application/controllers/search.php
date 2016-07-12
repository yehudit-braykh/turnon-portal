<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Search extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('search_model');
        $this->load->helper('url');
        $this->load->helper('util');
        $this->load->helper('pdk');
    }

    public function vod() {
        $uri_arr = $this->uri->uri_to_assoc(3);

        $keyword = $uri_arr['keyword'];
        $kword = base64_decode($keyword);
        $kword = str_replace('(','%28',$kword);
        $kword = str_replace(')','%29',$kword);
        $items = $this->search_model->search_vod($kword);
        $data['search_result_items'] = $this->create_items($items);

        $search_result_size = 0;
        if ($items && $items->content && sizeof($items->content->entries)) {
            $search_result_size = sizeof($items->content->entries);
        }
        $data['search_result_size'] = $search_result_size;

        $data['section'] = "vod";
        $data['keyword'] = urldecode($kword);

        $this->load->view(views_url() . 'templates/header', $data);
        $this->load->view(views_url() . 'pages/search', $data);
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

                $item_id_arr = explode("/", $items->content->entries[$i]->_id);
                $item_id = $item_id_arr[sizeof($item_id_arr) - 1];
                $commerce_class = getEntryProperty($items->content->entries[$i], 'commerce');
               
                $mediatype = getEntryProperty($items->content->entries[$i], 'media_type');
                $aired_date_div = "";
                $ret .= '<div class="col4 no_spacer img_hover_box" style="width:' . $cover_width . '">
                                <a href="' . base_url() . 'index.php/vod_item/detail/id/' . $item_id . '" class="cover" style="width:' . $cover_width . ';height:' . $cover_height . ';">';
                if ($mediatype != "tv_show" && $this->config->item('theme') !== 'orbita') {
                    $ad = getEntryProperty($items->content->entries[$i]);
                    $aired_date = '';
                    if($ad && $ad !== ''){
                        $aired_date = date("F d, Y", (getEntryProperty($items->content->entries[$i], 'aired_date')/1000));
                    }
                    $aired_date_div = '<div>' .  $aired_date . '</div>';
                    $ret.= '<div class="ribbon_content '. $commerce_class . '" style="width:' . $cover_width . ';height:' . $cover_height . ';"></div>';
                }
                
               $ret .= '<img class="item_img" src="' . $cover_url . '" />
                        <div class="h" style="width:' . $cover_h_width . ';height:' . $cover_h_height . ';"> 
                        <div class="title_content">'. getEntryProperty($items->content->entries[$i], 'title') . '</div>' .
                            $aired_date_div .
                        '</div>
                        </a>
                                
		        </div>';
                if ($max != 0 && $i == $max - 1)
                    break;
            }
        }

        return $ret;
    }

}
