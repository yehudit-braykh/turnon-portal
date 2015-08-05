<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Social_Media extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('social_media_model');
        $this->load->library('facebook');
    }

    public function fb_login() {

        $access_token = $this->facebook->get_access_token();
        $profile = $this->get_profile();
        error_log('profile: '.$profile);
    }
    
    public function get_profile($access_token){
         return $this->facebook->get_user_profile($access_token);
    }

}
