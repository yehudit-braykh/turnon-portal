  <script type="text/javascript">

    $(function () {

      $('#vod_item_sub_menu1').on('click', function(event) {
        show_preloader();
        $('#vod_item_sub_menu_container').load('<?php echo base_url(); ?>index.php/vod_item/info/id/<?php echo $item_id; ?>');
        set_item_sub_menu_selection('#vod_item_sub_menu1');
      });
      $('#vod_item_sub_menu2').on('click', function(event) {
        show_preloader();
        $('#vod_item_sub_menu_container').load('<?php echo base_url(); ?>index.php/vod_item/seasons/id/<?php echo $item_id; ?>');
        set_item_sub_menu_selection('#vod_item_sub_menu2');
      });
      $('#vod_item_sub_menu3').on('click', function(event) {
        show_preloader();
        $('#vod_item_sub_menu_container').load('<?php echo base_url(); ?>index.php/vod_item/critics/id/<?php echo $item_id; ?>');
        set_item_sub_menu_selection('#vod_item_sub_menu3');
      });
      $('#vod_item_sub_menu4').on('click', function(event) {
        show_preloader();
        $('#vod_item_sub_menu_container').load('<?php echo base_url(); ?>index.php/vod_item/comments/id/<?php echo $item_id; ?>');
        set_item_sub_menu_selection('#vod_item_sub_menu4');
      });
    });

    function show_preloader() {
      $("#vod_item_sub_menu_container").html('<div class="preloader_section" alt="Loading...">&nbsp;</div>');
    }

    function set_item_sub_menu_selection(item) {

      $('#vod_item_sub_menu1').removeClass();
      $('#vod_item_sub_menu2').removeClass();
      $('#vod_item_sub_menu3').removeClass();
      $('#vod_item_sub_menu4').removeClass();

      $(item).addClass('top_sub_menu_selected');
    }

    function button_play_clickHandler() {
      event.preventDefault(); 
      $('#vod_item_player_container').css({display: "block"});
      TweenMax.to("#vod_item_player_container", 1, {height: 525, ease: Quart.easeInOut, onComplete: function() {
        $('#vod_item_player_close').css({display: "block"});
        $('#vod_item_video_separator').css({display: "block"});

        $pdk.controller.setReleaseURL('<?php echo $item_release_url; ?>');

        $('#back_button_container').css({display: "none"});
      }});
    }

    function button_play_trailer_clickHandler() {
      event.preventDefault(); 
      $('#vod_item_player_container').css({display: "block"});
      TweenMax.to("#vod_item_player_container", 1, {height: 525, ease: Quart.easeInOut, onComplete: function() {
        $('#vod_item_player_close').css({display: "block"});
        $('#vod_item_video_separator').css({display: "block"});

        $pdk.controller.setReleaseURL('<?php echo $item_trailer_release_url; ?>');

        $('#back_button_container').css({display: "none"});
      }});
    }

    function button_close_clickHandler() {
      event.preventDefault(); 
      TweenMax.to("#vod_item_player_container", 1, {height: 0, ease: Quart.easeInOut, onComplete: function() {
        $('#iframe_item_video_container').attr('src', '');
        $('#vod_item_player_container').css({display: "none"});
        $('#vod_item_player_close').css({display: "none"});
        $('#vod_item_video_separator').css({display: "none"});
        $('#back_button_container').css({display: "block"});        
      }});
    }

    function button_back_clickHandler() {
      window.history.go(-1);
      event.preventDefault();
    }

  </script>

        </div>
        <div class="clr"></div>
      </div>
      <div class="clr"></div>
      <div class="resize"> 
        <!-- content -->
        <div class="content" style="padding-top:20px;">
          <div class="content_resize">
            <div id="vod_item_player_container">
            <div id="tdp_player" class="tpPlayer" tp:layoutUrl="<?php echo asset_url();?>pdk/data/metaLayout.xml"></div>
            </div>
            <div id="vod_item_player_close"><a href="#" onclick="button_close_clickHandler()">Close</a></div>
            <div id="vod_item_video_separator" class="separator"></div>
          </div>
          <div class="content_resize">
            <div style="float:left;">
              <div class="vod_pic">
                <?php
                  $cover_info_width = "214px";
                  if ($this->config->item('cover_info_width') !== FALSE) $cover_info_width = $this->config->item('cover_info_width');

                  $cover_info_height = "317px";
                  if ($this->config->item('cover_info_height') !== FALSE) $cover_info_height = $this->config->item('cover_info_height');
                ?>
                <img style="height:<?php echo $cover_info_height; ?>;width:<?php echo $cover_info_width; ?>;" src="<?php echo $item_cover; ?>" />
                <?php 

                  $show_trailer_button = "yes";
                  if ($this->config->item('show_trailer_button') !== FALSE) $show_trailer_button = $this->config->item('show_trailer_button');
                  if ($show_trailer_button == "yes") { ?>
                    <div class="vod_play_trailer"><a href="#" onclick="button_play_trailer_clickHandler()">Play Trailer</a></div>
                  <?php } ?>
              </div>
                 <?php if ($item_vod_type != "tvj_shows") { ?>
              
              <div class="vod_info_buttons">
                <div id="button_play"><a id="button_play_link" onclick="button_play_clickHandler()" href="">Play</a></div>
              </div>
            </div>
            <?php } ?>
            <div id="back_button_container"><a href="#" onclick="button_back_clickHandler()">Back</a></div>

            <div style="float: left;width: 500px;">

            <?php if ($item_vod_type != "episode") {  // we should add series title, season number and episode number here... ?>
              <div class="vod_info_title"><?php echo $item_title; ?></div>
            <?php } else { ?>
              <div class="vod_info_title"><?php echo $item_title; ?></div>
            <?php } ?>
        
              <div class="vod_info_container">

                <div class="vod_item_sub_menu">
                  <div id="vod_item_sub_menu1" class="top_sub_menu_selected">INFO</div>
                  <div id="vod_item_sub_menu2" <?php if ($item_vod_type != "tvj_shows") echo 'style="display:none"'; ?>>EPISODES</div>
                </div>
                <div class="clr"></div>

                <div id="vod_item_sub_menu_container">
                  <?php $this->load->view('templates/vod_item_info'); ?>
                </div>

              </div>
            </div>
            
           
            <div class="clr"></div>
          </div>
          <div class="clr"></div>
          <!-- content -->
          <div class="content_resize"> 
            <div class="separator"></div>
            <div class="content_full_size">
              <div class="category-title">Related</div>
              <?php echo $item_related_items; ?>
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>

          <div class="clr"></div>        
        </div>
        <div class="clr"></div>
      </div>
      <div class="clr"></div>
      <!-- /content -->