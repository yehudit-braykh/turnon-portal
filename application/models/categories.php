<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once(APPPATH.'/models/base_mongo.php');


class Categories extends base_mongo {

    public function __construct() {
        parent::__construct("categories");
    }


}