<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Vod_player extends UVod_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('pdk');
		$this->load->model('vod_player_model');
	}

	public function detail()
	{
		$uri_arr = $this->uri->uri_to_assoc(3);

		$item = $this->vod_player_model->get_item_data($uri_arr['id'])->content;

		$data['item_id'] = $uri_arr['id'];
		$data['item_id_url'] = $item->id;

		$release_url = getEntryReleaseUrl($item, "Video");
		$release_url_arr = explode("/", $release_url);
		$release_url_id = $release_url_arr[sizeof($release_url_arr) - 1];
		$release_url_id_arr = explode("?", $release_url_id);

		$data['item_release_id'] = $release_url_id_arr[0]; // Asset type for videos is Video

		$this->load->view(views_url() . 'pages/vod_player', $data);
	}
}