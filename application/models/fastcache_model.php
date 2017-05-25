<?php

require_once("phpfastcache/phpfastcache.php");

class fastcache_model extends CI_Model {

    var $cache = '';

    public function __construct() {

          $config = array("storage" => 'memcache', 'server' => array(array(MEMCACHED_SERVER,11211)), "overwrite" => "files");
          phpFastCache::setup("memcached", $config);

        $this->cache = phpFastCache();
    }

    public function get_cache($id) {

        // get data from cache
        $data = $this->cache->get('portal:'.$id);
        if (!$data) {
            $data = false;
        }
        return null;
        return $data;
    }

    public function set_cache($id, $data, $expiration = null) {

        if ($expiration) {
            $cache_expiration = $expiration;
        } else {
            $cache_expiration = MEMCACHED_TTL;
        }
        $this->cache->set('portal:'.$id, $data, $cache_expiration);
    }

    public function clean_cache() {
        $this->cache->clean();
        sleep(2);
        $this->cache->clean();
        sleep(2);
        $this->cache->clean();
    }

    public function get_cache_info(){
        return $this->cache;
    }

}
