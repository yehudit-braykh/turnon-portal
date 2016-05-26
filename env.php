<?php

// Config constants
//define('ENVIRONMENT', read_config_var('UVOD_ENVIRONMENT'));
define('ENVIRONMENT', read_config_var('ENVIRONMENT'));
define('UVOD_CONFIG', read_config_var('UVOD_CONFIG'));
define('UVOD_API_USER', read_config_var('UVOD_API_USER'));
define('UVOD_API_PASSWORD', read_config_var('UVOD_API_PASSWORD'));
define('UVOD_API_ENDPOINT', read_config_var('UVOD_API_ENDPOINT'));
define('UVOD_THEME', read_config_var('UVOD_THEME'));
define('FACEBOOK_APP_ID', read_config_var('FACEBOOK_APP_ID'));
define('FACEBOOK_APP_SECRET', read_config_var('FACEBOOK_APP_SECRET'));

function read_config_var($variable) {

	$ret = '';

	if (file_exists('env.ini')) {
		$env_array = parse_ini_file("env.ini");
		if (isset($env_array[$variable])) $ret = $env_array[$variable];
	} 

	if (!$ret) {
		if (getenv($variable) === false) {
			die('Invalid configuration. ' . $variable . ' not set.');
		} else {
			$ret = getenv($variable);
		}
	}

	return $ret;
}

?>