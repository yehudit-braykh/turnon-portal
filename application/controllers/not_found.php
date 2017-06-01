<?php
class Not_found extends CI_Controller
{

    function index()
        {
            $this->load->helper('url');
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
            header("Location:".$protocol.$_SERVER['HTTP_HOST']."/#!/".uri_string());
        }

}
