<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*-------------------------------------------------------------------------
   RJR CONFIG FILE
--------------------------------------------------------------------------*/
$config['streams_md5_shared_secret'] = '900P@rkCenter456';

$config['menu_highlight_color'] = '#006699';

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

$config['category1'] = array('label'=>'ÚLTIMOS VIDEOS','value'=>'new_releases');
$config['category2'] = array('label'=>'RECOMENDADOS','value'=>'recommended');
$config['category3'] = array('label'=>'PRÓXIMAMENTE','value'=>'coming_soon');

$config['load_submenu'] = true;

$config['timezone'] = 'America/Jamaica';

$config['subscriptions_ids'] = '19439888|19441019|19439889|19441020';
$config['trial_subscription_id'] = '20028852';

$config['available_subscription_labels'] = array(
	'19439888' => '1_MONTH_SUBSCRIPTION',
	'19439889' => '3_MONTH_SUBSCRIPTION',
	'19441019' => '6_MONTH_SUBSCRIPTION',
	'19441020' => '12_MONTH_SUBSCRIPTION'
);

$config['available_subscription_prices'] = array(
	'19439888' => '9.99',
	'19439889' => '24.98',
	'19441019' => '49.95',
	'19441020' => '99.9'
);