<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Social_Media_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->library('facebook');
    }

    public function get_fb_profile() {
        error_log('social media model');
        $return = new stdClass;
        try {
            $access_token = $this->facebook->get_access_token();
             error_log('access token:'.$access_token);
            $profile = $this->facebook->get_user_profile($access_token);
               error_log('access token:'.  json_encode($profile));
            $return->status ='ok';
            $return->content = json_decode($profile);
            $return->msg = json_decode($profile);
        } catch (Exception $e) {
            error_log('excepcion: '.json_encode($e->getMessage()));
            $return->status ='error';
            $return->msg = $e->getMessage();
           
        }

        return $return;
    }

}
