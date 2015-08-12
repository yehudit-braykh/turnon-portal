<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en">
<head>
<title>UVod Web Portal</title>
<meta name="description" content="Challenging the future of TV">
<meta name="keywords" content="website, business, store" />
<meta name="robots" content="index, follow" />

<!-- Mobile Specific Metas
================================================== -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<link rel="stylesheet" type="text/css" href="<?php echo asset_url();?>css/style.css" />
<link rel="stylesheet" type="text/css" href="<?php echo asset_url();?>css/skeleton.css">
<link rel="stylesheet" type="text/css" href="<?php echo asset_url();?>css/layout.css">
<link rel="stylesheet" type="text/css" href="<?php echo asset_url();?>css/menusm.css" />
<link rel="stylesheet" type="text/css" href="<?php echo asset_url();?>ui_totop/css/ui.totop.css" />
<link rel="stylesheet" type="text/css" href="<?php echo common_asset_url();?>preloader/css/preloader.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"/>

<script type="text/javascript" src="<?php echo common_asset_url();?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>js/scripts.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>js/menusm.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>js/head_html_default_block.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>js/kinetic-v4.5.4.min.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>pdk/tpPdk.js"></script> 
<script type="text/javascript" src="<?php echo common_asset_url();?>js/greensock/TweenMax.min.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>js/greensock/plugins/KineticPlugin.min.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>preloader/js/jquery.preloader.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>js/jquery.gsap.min.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo asset_url();?>ui_totop/js/jquery.ui.totop.js" charset="utf-8"></script>
<script type="text/javascript" src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

<!-- DC sCarousel Slider -->
<link rel="stylesheet" type="text/css" href="<?php echo asset_url();?>css/feature-carousel.css" />
<script type="text/javascript" src="<?php echo common_asset_url();?>js/jquery.easing.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url();?>js/jquery.featureCarousel.js"></script>

<!-- Config User Interface Box Import START -->
<script type="text/javascript" src="<?php echo common_asset_url();?>js/head_html_block.js"></script>

<!-- DC Social Icons CSS -->
<link rel="stylesheet" type="text/css" href="http://cdn.dcodes.net/2/social_icons/dc_social_icons.css" />

<script>
	$(function () {

    $('#logo_left').on('click', function(event) {
      window.location.href = '<?php echo base_url(); ?>';
    });
    $('#logo_footer').on('click', function(event) {

      <?php 
        $logo_bottom_link = "http://www.univtec.com";
        if ($this->config->item('logo_bottom_link') !== FALSE) $logo_bottom_link = $this->config->item('logo_bottom_link'); 
      ?>
      window.location.href = '<?php echo $logo_bottom_link; ?>';
    });
    $('#top_menu_vod').on('click', function(event) {
      window.location.href = '<?php echo base_url(); ?>';
    });
    $('#top_menu_live').on('click', function(event) {
      window.location.href = '<?php echo base_url(); ?>index.php/live/main';
    });
    $('#top_menu_account').on('click', function(event) {      
      window.location.href = '<?php echo base_url(); ?>index.php/account/my_account';
    });
    $('#editbox_search').keypress(function (e) {
      if (e.which == 13) {
        search();
      }
    });
    $('#button_search').on('click', function(event) {
      search();
    })
	});

  function search() {
    if ($('#editbox_search').val()) {
        window.location.href = '<?php echo base_url(); ?>index.php/search/vod/keyword/' + $('#editbox_search').val();        
    }
  }
</script>

<style>
  
  <?php if ($this->config->item('logo_file') !== FALSE) { ?>
    #logo_left { 
      width:<?php echo $this->config->item('logo_width'); ?>;
      height:<?php echo $this->config->item('logo_height'); ?>; 
      top:<?php echo $this->config->item('logo_top'); ?>;
      background: url(<?php echo base_url(); ?>assets/images/<?php echo $this->config->item('logo_file'); ?>) no-repeat center center;
      position: absolute;
    }
  <?php } ?>

  <?php if ($this->config->item('logo_bottom_file') !== FALSE) { ?>
    #logo_footer {
      width:<?php echo $this->config->item('logo_bottom_width'); ?>;
      height:<?php echo $this->config->item('logo_bottom_height'); ?>; 
      background: url(<?php echo base_url(); ?>assets/images/<?php echo $this->config->item('logo_bottom_file'); ?>) no-repeat top left;
    }
  <?php } ?>

  <?php if ($this->config->item('menu_highlight_color') !== FALSE) { ?>
    .menu_navigation_selected {
      color: <?php echo $this->config->item('menu_highlight_color'); ?>;
    }
  <?php } ?>

  <?php if ($this->config->item('cover_info_height') !== FALSE) { ?>
    .vod_pic {
      height: <?php echo $this->config->item('cover_info_height'); ?>;
    }
  <?php } ?>

  <?php if ($this->config->item('cover_info_width') !== FALSE) { ?>
    .vod_play_trailer {
      width: <?php echo $this->config->item('cover_info_width'); ?>;
    }  
  <?php } ?>

  <?php if ($this->config->item('button_play_image') !== FALSE) { ?>
    #button_play {
      padding-left: <?php echo $this->config->item('button_play_padding_left'); ?>;
      background: url(<?php echo base_url(); ?>assets/images/<?php echo $this->config->item('button_play_image'); ?>) no-repeat;
      width:  <?php echo $this->config->item('button_play_width'); ?>;
    }  
  <?php } ?>

</style>

</head>
<body>
<div class="index_page">
  <div class="body_pattern">
    <div class="container">
      <div class="main">
        <div class="header">
          <div class="header_resize">
            <div id="logo_left"></div>
            <div class="top_container_right">
              <div class="search">
                <input id="button_search" src="<?php echo asset_url();?>images/search_btn.png" class="button_search" type="image" />
                <span>
                <input name="editbox_search" class="editbox_search" id="editbox_search" maxlength="80" value="Search..."  onblur="if (this.value=='') this.value='Search...';" onfocus="if (this.value=='Search...') this.value='';" type="text" />
                </span>
              </div>
              <div class="top_menu">

                <?php
                  // menu highlight config
                  $highlight_color = 'rgb(255,0,0)';
                  if ($this->config->item('menu_highlight_color') !== FALSE) {
                    $highlight_color = $this->config->item('menu_highlight_color');
                  }
                ?>

                <div id="top_menu_vod"     <?php echo ($section == "vod" ? 'style="color:'.$highlight_color.';"' : ""); ?>>VOD</div>
                <div id="top_menu_live"    <?php echo ($section == "live" ? 'style="color:'.$highlight_color.';"' : ""); ?>>LIVE TV</div>
                <div id="top_menu_account" <?php echo ($section == "account" ? 'style="color:'.$highlight_color.';"' : ""); ?>>
                  <?php
                    if (!isset($_SESSION['uvod_user_data']) || !isset($_SESSION['uvod_user_data']->token) ) {
                      echo "SIGN IN";
                    } else {
                      echo "ACCOUNT";  
                    }
                  ?>                
                </div>
              </div>
            </div>

            <div class="clr"></div>
          </div>
          <div class="header_resize2">
            <div class="header_sep"></div>