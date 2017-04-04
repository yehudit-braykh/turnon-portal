<?php

// Config constants
//define('ENVIRONMENT', read_config_var('UVOD_ENVIRONMENT'));
define('ENVIRONMENT', read_config_var('ENVIRONMENT'));
define('UVOD_CONFIG', read_config_var('UVOD_CONFIG'));
define('UVOD_PLATFORM_USERNAME', read_config_var('UVOD_PLATFORM_USERNAME'));
define('UVOD_PLATFORM_PASSWORD', read_config_var('UVOD_PLATFORM_PASSWORD'));
define('UVOD_PLATFORM_API_URL', read_config_var('UVOD_PLATFORM_API_URL'));
define('UVOD_ACCOUNT_ID', read_config_var('UVOD_ACCOUNT_ID'));
define('UVOD_THEME', read_config_var('UVOD_THEME'));
define('FACEBOOK_STAGE_ID', read_config_var('FACEBOOK_STAGE_ID'));
define('FACEBOOK_STAGE_SECRET', read_config_var('FACEBOOK_STAGE_SECRET'));

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
