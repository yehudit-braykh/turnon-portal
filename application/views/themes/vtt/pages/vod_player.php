<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Web Portal</title>
	<meta name="description" content="Challenging the future of TV">
	<meta name="keywords" content="website, business, store" />
	<meta name="robots" content="index, follow" />
	<link href="<?php echo asset_url();?>css/style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<?php echo asset_url();?>js/jquery.min.js"></script>
	<script type="text/javascript">


	jQuery(function(){		 

		var width = $(window).width() - 7;
		var height = $(window).height() - 7;
		var url = 'http://player.theplatform.com/p/7yj-KC/ORLokItxulBw/embed/select/<?php echo $item_release_id; ?>?form=html&mbr=true&videoWidth=' + width + '&videoHeight=' + height;

		$('#iframe_video_container').attr('src', url);
		$('#iframe_video_container').css({'width': width + 6, 'height': height + 6});
	});

	function back() {
		event.preventDefault(); 
    	window.location.href = '<?php echo base_url(); ?>index.php/vod_item/detail/id/<?php echo $item_id; ?>';
	}

	</script>
</head>
<body>
	<div class="player_fullscreen">
		<div id='player_close_button'><a href="" onclick="back();">Volver</a></div>
		<iframe id="iframe_video_container" frameBorder="0" seamless="seamless" allowFullScreen></iframe>
	</div>
</body>
</html>