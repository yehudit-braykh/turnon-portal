<?php

require_once("phpfastcache/phpfastcache.php");

class fastcache_model extends CI_Model {

    var $cache = '';

    public function __construct() {

          $config = array("storage" => 'memcache', 'server' => array(array(MEMCACHED_SERVER,11211)), "overwrite" => "files");
          phpFastCache::setup("memcached", $config);

        $this->cache = phpFastCache();
    }

    public function get_cache($id, $forceCache = false) {
        if(!$forceCache && (ENVIRONMENT === "local" || ENVIRONMENT === "development"))
            return false;
        try{
            $data = $this->cache->get('portal:'.$id);
            if (!$data) {
                $data = false;
            }
            return $data;
        } catch (Exception $e){
            return null;
        }
    }

    public function set_cache($id, $data, $expiration = null) {
        try{
            if ($expiration) {
                $cache_expiration = $expiration;
            } else {
                $cache_expiration = MEMCACHED_TTL;
            }
            $this->cache->set('portal:'.$id, $data, $cache_expiration);
        } catch (Exception $e){
            return null;
        }
    }

    public function clean_cache() {

        try{
            $this->cache->clean();
            sleep(2);
            $this->cache->clean();
            sleep(2);
            $this->cache->clean();
        } catch (Exception $e){
            return null;
        }

    }

    public function get_cache_info(){
        return $this->cache;
    }

}
