
<script type="text/javascript">

    var step = 600;
    var scrolling = false;
    var current_channel = null;

    $(function() {


        // starts with channel 0
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            channel_change('<?php if ($channels_stream && sizeof($channels_stream)) echo $channels_stream[0]->hls; ?>', $('#channel_0'));
        } else {
            channel_change('<?php if ($channels_stream && sizeof($channels_stream)) echo $channels_stream[0]->hds; ?>', $('#channel_0'));
        }

<?php
for ($i = 0; $i < sizeof($channels_stream); $i++) {

    echo "$('#channel_" . $i . "').bind('click', function(event) { 
          if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            channel_change('" . $channels_stream[$i]->hls . "', event.target, $(this).css('background-image'),$(this).attr('station')); 
          } else {
            channel_change('" . $channels_stream[$i]->hds . "', event.target, $(this).css('background-image'),$(this).attr('station')); 
          }
        });\n\n";
}
?>

        $("#channels_button_up").bind("click", function(event) {
            event.preventDefault();
            $("#live_channels_scroller").animate({
                scrollTop: "-=" + step + "px"
            });
        }).bind("mouseover", function(event) {
            scrolling = true;
            scrollContent("up", 'live_channels_scroller');
        }).bind("mouseout", function(event) {
            scrolling = false;
        });

        $("#channels_button_down").bind("click", function(event) {
            event.preventDefault();
            $("#live_channels_scroller").animate({
                scrollTop: "+=" + step + "px"
            });
        }).bind("mouseover", function(event) {
            scrolling = true;
            scrollContent("down", 'live_channels_scroller');
        }).bind("mouseout", function(event) {
            scrolling = false;
        });



    });

    function scrollContent(direction, id) {
        var amount = (direction === "up" ? "-=1px" : "+=1px");
        $("#" + id).animate({
            scrollTop: amount
        }, 1, function() {
            if (scrolling) {
                scrollContent(direction, id);
            }
        });
    }

    function scrollContent_h(direction, id) {
        var amount = (direction === "left" ? "+=3px" : "-=3px");


        if (direction === "left") {

            // test if reached left limit
            if (parseInt($("#epg_data_container").offset().left) <= parseInt(epg_offset)) {
                $("#" + id).animate({
                    left: amount
                }, 1, function() {
                    if (scrolling) {
                        scrollContent_h(direction, id);
                    }
                });
            } else {
                $("#epg_data_container").animate({
                    left: "0px"
                });
            }
        }

        if (direction === "right") {

            // test if reached right limit
            if ($("#epg_data_container").offset().left >= -1 * ($("#epg_data_container").width() - 700 - epg_offset)) {
                $("#" + id).animate({
                    left: amount
                }, 1, function() {
                    if (scrolling) {
                        scrollContent_h(direction, id);
                    }
                });
            } else {
                $("#epg_data_container").animate({
                    left: (-1 * ($("#epg_data_container").width() - 700)) + "px"
                });
            }
        }
    }

    function channel_change(release_url, channel_obj, background, id) {
       
        if (current_channel == channel_obj)
            return;

        // selects channel
        if (current_channel)
            TweenMax.to(current_channel, .3, {boxShadow: "0px 0px 10px rgba(0,0,0,1)", border: "1px solid #000"});
        TweenMax.to(channel_obj, .3, {boxShadow: "2px 0px 20px rgba(0,0,255,0.8)", border: "1px solid rgba(0,0,255,0.8)"});
        current_channel = channel_obj;

        // change channel
        $pdk.controller.setReleaseURL(release_url);
        $('#epg_info_container .epg_channel').css('background-image', background);
        if (typeof (id) != 'undefined') {
            arr = id.split('/');
            chann = arr[arr.length - 1];
            $.ajax({
                url: "<?php echo base_url() . 'index.php/live/epg_timeline'; ?>",
                type: 'POST',
                data: 'channel=' + chann,
                beforeSend: function() {
                    marginTop = (parseInt($('#epg_scroller').height()) - 50) / 2;

                    $('#epg_scroller').html('<div id="loadingIcon"></div>');
                    $('#loadingIcon').css('margin-top', marginTop + "px");
                },
                success: function(data) {

                    $('#epg_timeline').html(data);
                }
            });
        }
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
            <div id="live_player_container">
                <div  id="tdp_player_live"
                      class="tpPlayer"
                      tp:plugin0="type=adcomponent|URL=<?php echo asset_url(); ?>pdk/swf/SMIL.swf|priority=3"
                      tp:plugin1="type=adcomponent|URL=<?php echo asset_url(); ?>pdk/swf/akamaiHD.swf|priority=3"
                      tp:layoutUrl="<?php echo asset_url(); ?>pdk/data/metaLayout.xml"></div>
            </div>
            <div class="channels_widget_container">
                <div id="channels_button_up"></div>
                <div class="live_channels_container">
                    <div id="live_channels_scroller">

                        <?php
                        if ($channels && isset($channels->entries)) {
                    
                            for ($i = 0; $i < sizeof($channels->entries); $i++) {
                                $channel_image = "";
                                if (isset($channels->entries[$i]->media))
                                    $channel_image = getEntryThumbnail($channels->entries[$i]->media, "Channel Logo Small");
                                ?>

                                <div class="live_channel_container" station="<?php echo $channels->entries[$i]->id; ?>" id="channel_<?php echo $i; ?>" <?php echo 'style="background: url(' . $channel_image . ') center center no-repeat; background-size: 126px 68px;' . ($i == 0 ? 'box-shadow: 2px 0px 20px rgba(0,0,255,0.8); border: 1px solid rgba(0,0,255,0.8);"' : '"'); ?>></div>


                                <?php
                            }
                        }
                        ?>
                    </div>
                </div>
                <div id="channels_button_down"></div>
            </div>
            <div id="live_video_separator" class="separator" style="clear: both;"></div>
           
            <div id="epg_container">
                <div id="epg_info_container">
                    <div id="epg_current_time"><input type="text" id="datepicker"></div>
                    <?php
                    if ($channels && isset($channels->entries)) {
                        for ($i = 0; $i < sizeof($channels->entries); $i++) {
                        $channel_image = "";
                        if (isset($channels->entries[0]->media))
                            $channel_image = getEntryThumbnail($channels->entries[0]->media, "Channel Logo Small");
                        ?>

                        <div id="epg_channel_<?php  echo 0; ?>" class="epg_channel" <?php echo 'style="background-image: url(' . $channel_image . ') ;"' ?>></div>
                        <?php
                        }
                    }
                    ?>
                    
                </div>
                <div id="epg_timeline">
                    <?php
                    $this->load->view('templates/epg_timeline');
                    ?>
                </div>
            </div>
        </div>
        <br><br><br><br><br><br><br><br>
        <div class="clr"></div>        
    </div>
    <div class="clr"></div>
</div>
<div class="clr"></div>

<!-- /content -->
<script>

    current_channel = $('#channel_0');

    today = new Date();
    dd = ("0" + today.getDate()).slice(-2);
    mm = ("0" + (today.getMonth() + 1)).slice(-2);
    yyyy = today.getFullYear();
    $('#datepicker').val(mm + '/' + dd + '/' + yyyy);
    $("#datepicker").datepicker({
        defaultDate: new Date()
    });

</script>