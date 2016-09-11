<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class campaign extends REST_Controller{
	function __construct(){
		parent::__construct();
		//$this->load->model('tips');
		$this->load->model("campaigns");
	}

	function index_get(){
		//$this->campaigns->add_view($this->get("id"));
		header("Cache-Control: max-age=600");
		if ($this->get("id")) $row = $this->campaigns->get_by_id($this->get("id"));
		else if ($this->get("tag")) $row = $this->campaigns->get_by_name($this->get("tag"));
    	$this->response($row, 200);
    }
    function check_get(){
    	if (!trim($this->get("hashtag"))) $this->response(true, 200);
    	$row = $this->campaigns->get_by_name(trim($this->get("hashtag")));
    	if ($row) $this->response(true, 200);
    	$this->response(false, 404);
    }
    function buzz_get(){
    	header("Cache-Control: max-age=600");
    	$this->load->model("buzz");
    	$this->response($this->buzz->get_by_campaign_id($this->get("cid")), 200);
    }
    function updates_get(){
    	header("Cache-Control: max-age=600");
		$this->load->model("updates");
    	$this->response($this->updates->get_by_campaign_id($this->get("cid")), 200);
    }
    function update_post(){
    	$this->config->load('s3');
    	$this->load->library('aws_sdk');
    	$this->load->library('image');
    	$this->load->model('images');
    	$this->load->model('users');
    	$this->load->model('updates');
    	$tmp_dir = $this->config->item('tmp_dir');

    	$data = $this->post();
    	//debug($data);
    	$user = $this->users->get_me();
    	if (!$user["id"]) {
    		$this->response(array("msg" => "please login", "code" => "403.1"), 403.1);
    	}
    	$campaign = $this->campaigns->get_by_id($data["cid"]);
    	if (!$campaign) $this->response(array("error" => "no campaign id", "code" => "404.25"), 404.25);
    	if ($campaign["owner"]["id"] != $user["id"]) $this->response(array("error" => "please login", "code" => "403.2"), 403.2);
    	$data["uid"] = $user["id"];


    	if ($data["thumb"]) {
    		$tmpfilename = $tmp_dir.basename($data["thumb"]);
    		file_put_contents($tmpfilename, file_get_contents("http:".$data["thumb"]));
    		$thumbs = $this->image->generate_thumbs($tmpfilename);
    		$data["thumb"] = $this->aws_sdk->copyObject($this->config->item('s3_bucket'), "tmp/thumbs/".basename($data["thumb"]), $this->config->item('s3_bucket'), "thumbs/".basename($data["thumb"]));
    	}
    	$data["text"] = $data["text"];

    	$create = array(
    			"text" => $data["text"],
    			"header" => $data["header"],
    			"cid" => $data["cid"],
    			"uid" => $data["uid"],
    			"thumb" => $data["thumb"]
    	);

    	$row = $this->updates->create($create);
    	if ($thumbs){
			$row["thumbs"] = $thumbs;
			foreach ($row["thumbs"] as $key => $thumb) {
    			$row["thumbs"][$key]["path"] = $this->config->item('static_url').$row["thumbs"][$key]["path"];
    		}
			$this->images->connect($row["id"], "update", $thumbs);
		}
    	$this->response($row, 200);
    }
    function update_put(){
    	$this->config->load('s3');
    	$this->load->library('aws_sdk');
    	$this->load->library('image');
    	$this->load->model('images');
    	$this->load->model('users');
    	$this->load->model('updates');
    	$tmp_dir = $this->config->item('tmp_dir');

    	$data = $this->put();
    	//debug($data);
    	$user = $this->users->get_me();
    	if (!$user["id"]) {
    		$this->response(array("msg" => "please login", "code" => "403.1"), 403.1);
    	}
    	$campaign_update = $this->updates->get_by_id($data["id"]);
    	if (!$campaign_update) $this->response(array("error" => "no update id", "code" => "404.26"), 404.26);
    	$campaign = $this->campaigns->get_by_id($campaign_update["cid"]);
    	if (!$campaign) $this->response(array("error" => "no campaign", "code" => "404.25"), 404.25);

    	if ($campaign["owner"]["id"] != $user["id"]) $this->response(array("error" => "please login", "code" => "403.2"), 403.2);
    	$data["uid"] = $user["id"];

    	$update = array();

    	if ($data["thumb"] && $data["thumb"] != $campaign_update["thumb"]) {
    		$tmpfilename = $tmp_dir.basename($data["thumb"]);
    		file_put_contents($tmpfilename, file_get_contents("http:".$data["thumb"]));
    		$thumbs = $this->image->generate_thumbs($tmpfilename);
    		$data["thumb"] = $this->aws_sdk->copyObject($this->config->item('s3_bucket'), "tmp/thumbs/".basename($data["thumb"]), $this->config->item('s3_bucket'), "thumbs/".basename($data["thumb"]));
    		$update["thumb"] = $data["thumb"];
    	}
    	$update["text"] = $data["text"];
		$update["header"] = $data["header"];

    	if (count($update)) {
    		$update["id"] = $data["id"];
    		$row = $this->updates->update_by_id($update);
			if ($thumbs){
				$row["thumbs"] = $thumbs;
				foreach ($row["thumbs"] as $key => $thumb) {
	    			$row["thumbs"][$key]["path"] = $this->config->item('static_url').$row["thumbs"][$key]["path"];
	    		}
				$this->images->connect($row["id"], "update", $thumbs);
			}
    		else $row["thumbs"] = $campaign_update["thumbs"];
    		$this->response($row, 200);
    	} else $this->response(array("msg" => "nothing to update", "code" => 403.54), 403.54);
    }
    function edit_post(){
    	$this->config->load('s3');
    	//$this->load->library("S3");
    	$this->load->library('aws_sdk');
    	//$this->load->library('Aauth');
    	$this->load->model('favs');
    	$this->load->model('notifications');
    	$this->load->model('users');
    	$this->load->model('logger');
    	$this->load->library('image');
    	$this->load->model('images');

    	$this->config->load('s3');
    	$tmp_dir = $this->config->item('tmp_dir');

    	$data = $this->post();
    	//debug($data);
    	$user = $this->users->get_me();

    	if (!$user["id"]) {
    		$this->response(array("msg" => "please login", "code" => "403.1"), 403.1);
    	}

    	$data["owner"] = $user["id"];
    	if ($data["thumb"]) {
    		$tmpfilename = $tmp_dir.basename($data["thumb"]);
    		file_put_contents($tmpfilename, file_get_contents("http:".$data["thumb"]));
    		$thumbs = $this->image->generate_thumbs($tmpfilename);
    		$data["thumb"] = $this->aws_sdk->copyObject($this->config->item('s3_bucket'), "tmp/thumbs/".basename($data["thumb"]), $this->config->item('s3_bucket'), "thumbs/".basename($data["thumb"]));
    		//unset($data["thumb"]);
    	} else $this->response(array("msg" => "no thumb", "code" => "404.17"), 404.17);
    	$row = $this->campaigns->get_by_name($data["challenge"]);
    	if ($row) $this->response(array("msg" => "hashtag allready exist", "code" => "403.11"), 403.11);

    	$data["challenge"] = html_escape($data["challenge"]);

    	$row = $this->campaigns->create($data);
    	if ($thumbs) {
    		$this->images->connect($row["id"], "campaign", $thumbs);
    		$row["thumbs"] = $thumbs;
    		foreach ($row["thumbs"] as $key => $thumb) {
    			$row["thumbs"][$key]["path"] = $this->config->item('static_url').$row["thumbs"][$key]["path"];
    		}
    	}

    	//notifications folowers
    	$folowers = $this->favs->get_by_cid_type($user["id"], "user");
    	foreach ($folowers as $folower) {
    		$this->notifications->notify($user["id"], $folower["uid"], $row["id"], null, "campaign", null);
    	}
    	//$users = $this->favs->get_by_cid_type($user->id, $type);
    	$this->logger->add("create campaign email: ".$user["email"]." uid".$user["id"]." campaign:#".$row["challenge"], $user["id"], $row["challenge"]);
    	$this->response($row, 200);
    }
    function edit_put(){
    	$this->config->load('s3');
    	$this->load->library('aws_sdk');
    	$this->load->model('campaigns');
    	$this->load->model('logger');
    	$this->load->model('users');
    	$this->load->library('image');
    	$this->load->model('images');
    	//unset($data["comments"]);
    	//unset($data["raised"]);
    	//unset($data["participants"]);
    	//unset($data["social"]);
    	//debug($data);
    	$data = $this->put();
    	$update = array();
    	$campaign = $this->campaigns->get_by_id($data["id"]);
    	$update["id"] = $campaign["id"];
    	$user = $this->users->get_logedin_user();//$this->aauth->get_user();
    	//debug($campaign, $user);
    	if (!$user || !$user["id"]) $this->response(array("error" => "please login", "code" => "403.1"), 403.1);
    	if (!$campaign) $this->response(array("error" => "no campaign id", "code" => "404.25"), 404.25);
    	if ($campaign["owner"]["id"] != $user["id"]) $this->response(array("error" => "please login", "code" => "403.2"), 403.2);

    	//debug($data["thumb"], $campaign["thumb"]);

    	if ($data["thumb"] && $data["thumb"] != $campaign["thumb"] && $data["thumb"] != $campaign["thumbs"]->md["path"]) {
    		$tmpfilename = $tmp_dir.basename($data["thumb"]);
    		file_put_contents($tmpfilename, file_get_contents("http:".$data["thumb"]));
    		$thumbs = $this->image->generate_thumbs($tmpfilename);
    		$data["thumb"] = $this->aws_sdk->copyObject($this->config->item('s3_bucket'), "tmp/thumbs/".basename($data["thumb"]), $this->config->item('s3_bucket'), "thumbs/".basename($data["thumb"]));
    		$update["thumb"] = $data["thumb"];
    		$campaign["thumbs"] = $thumbs;
    		$this->images->connect($data["id"], "campaign", $thumbs);
    	}
    	if ($data["desc"] != $campaign["desc"]) {
    		$update["desc"] = $data["desc"];
    		$campaign["desc"] = $update["desc"];
    	}
    	if ($data["cta"] != $campaign["cta"]) {
    		$update["cta"] = $data["cta"];
    		$campaign["cta"] = $update["cta"];
    	}
    	if (is_array($data["ngo"])) $data["ngo"] = $data["ngo"]["id"];
    	if ($campaign["ngo"]["id"] != $data["ngo"]) $update["ngo"] = $data["ngo"];
    	if ($campaign["goal"] != $data["goal"]) $update["goal"] = $data["goal"];

    	if (count($update) <= 1) $this->response($campaign, 200); // nothing to update
    	else {
    		$this->campaigns->update_by_id($update);

    		$this->logger->add("edit email: ".$user["email"]." campaign:#".$campaign["challenge"], $user["id"], $campaign["challenge"]);
    		$this->response($campaign, 200);
    	}

    }

    function more_order_by_views_get(){
    	header("Cache-Control: max-age=600");
    	$rows = $this->campaigns->more_order_by_views($this->get("id"));
    	$this->response($rows, 200);
    }
    function list_by_date_mobile_get(){
    	header("Cache-Control: max-age=600");
    	$this->load->model("participates");
    	$page = $this->get("page");
    	$rows = $this->campaigns->all_by_date($page);
    	for ($i=0;$i<count($rows);$i++){
    		unset($rows[$i]["gifts"]);
    		unset($rows[$i]["hashtags"]);
    		$rows[$i]["participants_preview"] = $this->participates->order_by_date_where_campaign($rows[$i]["id"]);
    	}
    	$this->response($rows, 200);
    }
    function list_by_date_get(){
    	header("Cache-Control: max-age=600");
    	$this->load->model("participates");

    	$page = $this->get("page");
    	$rows = $this->campaigns->all_by_date($page, $this->get("all"));

    	/*foreach ($this->db->queries as $key => $query) {
    		$sql = $query . " \n Execution Time:" . $this->db->query_times[$key]; // Generating SQL file alongwith execution time
    		//fwrite($handle, $sql . "\n\n");              // Writing it in the log file
    		$sqls[] = $sql;

    	}
    	debug($sqls);*/
    	//debug($rows);
    	/*for ($i=0;$i<count($rows);$i++){
    		$rows[$i]["top_participants"] = $this->participates->order_by_date_where_campaign($rows[$i]["id"]);
    	}*/
    	$this->response($rows, 200);
    }
    function top_by_participations_weekly_get(){
    	header("Cache-Control: max-age=600");
    	$rows = $this->campaigns->top_by_participations_weekly();
    	$this->response($rows, 200);
    }

}
