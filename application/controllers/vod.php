<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Vod extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('UTC');
    }


    public function index() {

        $this->load->view(views_url() . 'html');
    }


}
