<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

define('APP_TARGET', 'portal');

define('MAX_PAGE_ITEMS', 5);
define('MOVIES_DEFAULT_CATEGORY', 'all');
define('TV_SHOWS_DEFAULT_CATEGORY', 'all');

// Defaults
define('DEFAULT_SECTION', 'vod');
define('DEFAULT_SECTION1', 'featured');
define('DEFAULT_SECTION2', 'coming_soon');

// Featured Categories
define('COMING_SOON', 'coming_soon');
define('RECOMMENDED', 'recommended');
define('POPULAR_ITEMS', 'popular_items');
define('FREE_TITLE', 'free_title');
define('NEW_RELEASES', 'new_releases');

// VOD Categories
define('FEATURED', 'featured');
define('VOD_ALL', '');

class UVod_Controller extends CI_Controller {

    public function __construct() {
        parent::__construct();

        session_start();

        $this->load->library('parser');
        $this->load->helper('url');
        $this->load->helper('util');
        $this->load->model('config_model');
        $this->load->model('account_model');

        $this->config->load('config_' . UVOD_CONFIG, FALSE, TRUE);

        // common values
        $data['base_url'] = base_url();
        $data['asset_url'] = asset_url();

        // set section
        if ($this->uri->segment(1, 0)) {
            $data['section'] = $this->uri->segment(1, 0);
        } else {
            $data['section'] = DEFAULT_SECTION;
        }

        // set section 1
        if ($this->uri->segment(3, 0)) {
            $data['sub_section1'] = $this->uri->segment(3, 0);
        } else {
            $data['sub_section1'] = DEFAULT_SECTION1;
        }

        // set section 3
        if ($this->uri->segment(4, 0)) {
            $data['sub_section2'] = $this->uri->segment(4, 0);
        } else {
            $data['sub_section2'] = DEFAULT_SECTION2;
        }

        // get vod categories
        $data['vod_categories'] = $this->config_model->get_vod_categories()->content;

        $this->load->vars($data);

        if (isset($_SESSION['user_data']) && sizeof($_SESSION['user_data']) > 0) {
            $this->check_valid_session($_SESSION['user_data']);
        }
    }

    public function check_valid_session($data) {

                $id = $this->account_model->get_self_id($data->token);

                if (isset($id->error) && $id->error) {
                    
                    $_SESSION['user_data'] = null;
                    unset($_SESSION['user_data']);
                    
                } else {
                    
                }
           
        
    }

}
