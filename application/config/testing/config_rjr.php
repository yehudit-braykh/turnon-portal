<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*-------------------------------------------------------------------------
   RJR CONFIG FILE
--------------------------------------------------------------------------*/
$config['logo_file'] = 'tvj_logo.png';
$config['logo_width'] = '127px';
$config['logo_height'] = '96px';
$config['logo_top'] = '40px';

$config['menu_highlight_color'] = 'rgb(254,215,0)';

$config['cover_asset_type'] = 'Poster H';
$config['cover_width'] = '220px';
$config['cover_height'] = '124px';
$config['cover_h_width'] = '215px';
$config['cover_h_height'] = '34px';
$config['cover_info_width'] = '320px';
$config['cover_info_height'] = '180px';

$config['show_genre_filter'] = 'yes';
$config['show_aired_date_filter'] = 'yes';
$config['show_trailer_button'] = 'no';

$config['button_play_width'] = '320px';
$config['button_play_image'] = 'rjr-btn_play_bg.png';
$config['button_play_padding_left'] = '150px';

$config['category1'] = 'Recommended';
$config['category2'] = 'New Releases';
$config['category3'] = 'Coming Soon';

$config['timezone'] = 'America/Jamaica';

$config['facebook']['api_id'] = '701782146621061';
$config['facebook']['app_secret'] = '03498a0cf3e18554b6ce034c4561b40d';
$config['facebook']['redirect_url'] = 'http://rjr-portal-test.herokuapp.com/';
$config['facebook']['permissions'] = array(
  'email',
  'public_profile'
);