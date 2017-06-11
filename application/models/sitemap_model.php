<?php
class Sitemap_model extends Uvod_model {

	public function __construct(){
		$this->load->helper('uvod_api');
		$this->load->model('fastcache_model');
		$this->load->model('brands_model');
		$this->load->model('campaigns_model');
		$this->load->model('category_model');
		$this->load->model('celebrity_model');
		$this->load->library("sitemap_library");
		$this->$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
		$this->base_url = $this->$protocol.$protocol.$_SERVER['HTTP_HOST'].'/';

		$this->sitemap = new sitemap_library();


	}

	public function index(){
		if ($this->fastcache_model->get_cache("sitemap_model_index"))
			return $this->fastcache_model->get_cache("sitemap_model_index");
			$this->generate_map();
			$data = $this->sitemap->output();
		$this->fastcache_model->set_cache("sitemap_model_index",$data);
		return $data;
	}

	private function generate_map(){
		$this->categories_map();
		$this->celebrities_map();
		// $this->brands_map();
		$this->campaigns_map();
		$this->charities_map();
	}

	private function categories_map(){
		$categories = $this->category_model->get_all_categories();
		$map = array();
		$this->sitemap->add($this->base_url."categories");
		foreach ($categories as $cat) {
			if($cat["slug"]){
				$this->sitemap->add($this->base_url."category/".$cat["slug"]);
				$this->category_videos_map($cat["videos"]);
			}
		}

		return $map;
	}

	private function category_videos_map($videos){
		foreach ($videos as $vid) {
			if($vid["slug"])
			$this->sitemap->add($this->base_url."video/".$vid["slug"]);
		}
	}

	private function celebrities_map(){
		$celebrities = $this->celebrity_model->get_all_celebrities();
		$this->sitemap->add($this->base_url."stars");
		foreach ($celebrities as $celeb) {
			if($celeb["slug"])
				$this->sitemap->add($this->base_url."star/".$celeb["slug"]);
		}
	}

	private function brands_map(){
		$brands = $this->brands_model->get_brands_array();
		$this->sitemap->add($this->base_url."brands");
		foreach ($brands as $brand) {
			if($brand["slug"]){
				$this->sitemap->add($this->base_url."brand/".$brand["slug"]);
				$this->brand_offers_map($brand["_id"]);
			}
		}
	}

	private function brand_offers_map($id){
		$brand = $this->brands_model->get_brand($id,'');
		foreach ($brand["offers"] as $offer) {
			if($offer["slug"])
				$this->sitemap->add($this->base_url."brand/".$brand["slug"]."/offer/".$offer["slug"]);
		}
	}

	private function campaigns_map(){
		$campaigns = $this->campaigns_model->get_campaigns();
		$this->sitemap->add($this->base_url."brands");
		foreach ($campaigns as $campaign) {
			if($campaign["slug"]){
				$this->sitemap->add($this->base_url."brand/".$campaign["slug"]);
				$this->campaign_offers_map($campaign["_id"]);
			}
		}
	}

	private function campaign_offers_map($id){
		$campaign = $this->campaigns_model->get_campaign($id,'');
		foreach ($campaign["offers"] as $offer) {
			if($offer["slug"])
				$this->sitemap->add($this->base_url."brand/".$brand["slug"]."/offer/".$offer["slug"]);
		}
	}

	private function charities_map(){
		$charities = $this->brands_model->get_charities_array();
		$this->sitemap->add($this->base_url."charities");
		foreach ($charities as $charity) {
			if($charity["slug"])
				$this->sitemap->add($this->base_url."charity/".$charity["slug"]);
		}
	}






}
?>
