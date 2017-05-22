<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*!
* HybridAuth
* http://hybridauth.sourceforge.net | http://github.com/hybridauth/hybridauth
* (c) 2009-2012, HybridAuth authors | http://hybridauth.sourceforge.net/licenses.html
*/

// ----------------------------------------------------------------------------------------
//	HybridAuth Config file: http://hybridauth.sourceforge.net/userguide/Configuration.html
// ----------------------------------------------------------------------------------------

$config =
	array(
		// set on "base_url" the relative url that point to HybridAuth Endpoint
		'base_url' => 'hauth/endpoint/',

		"providers" => array (

			"Google" => array (
				"enabled" => true,
				"keys"    => array (
								"id" => getenv("google_stage_id"), "secret" => getenv("google_stage_secret")),
				"scope"	  => 	"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
			),

			"Facebook" => array (
				"enabled" => true,
				"keys"    => array ( "id" => getenv("FACEBOOK_STAGE_ID"), "secret" => getenv("FACEBOOK_STAGE_SECRET") ),
				"scope"   => "email, public_profile, user_about_me, user_birthday, user_hometown, publish_actions, user_friends", // optional
				"display" => "popup",
				"trustForwarded" => true
			),

			"Tumblr" => array (
				"enabled" => true,
				"keys"    => array ( "key" => getenv("tumblr_id"), "secret" => getenv("tumblr_secret") ),
				"display" => "popup"
			),
			"Twitter" => array (
				"enabled" => true,
				"keys"    => array ( "key" => getenv("twitter_stage_id"), "secret" => getenv("twitter_stage_secret") ),
				"display" => "popup"
			)
		),

		// if you want to enable logging, set 'debug_mode' to true  then provide a writable file by the web server on "debug_file"
		"debug_mode" => false,

		"debug_file" => APPPATH.'/logs/hybridauth.log',
	);


/* End of file hybridauthlib.php */
/* Location: ./application/config/hybridauthlib.php */
