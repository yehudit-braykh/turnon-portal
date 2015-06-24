<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Proxy extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('pdk');
    }

    public function index() {

        if (isset($_POST['url'])) {

            $url = $_POST['url'];
            $curl_handle = curl_init();
            curl_setopt($curl_handle, CURLOPT_URL, $url);
            curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);

            $buffer = curl_exec($curl_handle);
            curl_close($curl_handle);

            echo $buffer;
        }
    }

}
