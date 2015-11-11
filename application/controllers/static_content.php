<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Static_content extends UVod_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->helper('pdk');
    }

    public function about_us() {
        $data = array();
        $data['section'] = "about_us";
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/about_us', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }
    
    public function terms_conditions() {
        $data = array();
        $data['section'] = "terms_conditions";
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/terms_conditions', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }
    
    public function terms_and_conditions_subscribers() {
        $data = array();
        $data['section'] = "terms_conditions";
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/terms_conditions_subscribers', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }
    
    public function privacy_policy() {
        $data = array();
        $data['section'] = "privacy_policy";
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/privacy_policy', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }
    
    public function terms_of_use() {
        $data = array();
        $data['section'] = "privacy_policy";
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/terms_of_use', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function faqs() {
        $data = array();
        $data['section'] = "faqs";
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/faqs', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

}
