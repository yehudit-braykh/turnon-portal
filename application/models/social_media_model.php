<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Social_Media_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->library('facebook');
    }

    public function get_fb_profile() {

        $return = new stdClass;
        try {
            $access_token = $this->facebook->get_access_token();
            $profile = $this->facebook->get_user_profile($access_token);
            $return->status ='ok';
            $return->content = $profile;
        } catch (Exception $e) {
            $return->status ='ok';
            $return->msg = $e;
           
        }

        return $return;
    }

}
