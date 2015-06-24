<script type="text/javascript" src="<?php echo common_asset_url(); ?>pdk/tpPdk.js"></script>
<script type="text/javascript">

<?php
if (isset($channel_selected)) {
    if ($channels && isset($channels->entries)) {

        for ($i = 0; $i < sizeof($channels->entries); $i++) {

            $id_tmp = explode('/', $channels->entries[$i]->id);
            $chann_id = $id_tmp[sizeof($id_tmp) - 1];

            if ($channel_selected == $chann_id) {
                $channel_number = $i;
                $channel_name = $channels->entries[$i]->title;
                $channel_id = $channels->entries[$i]->id;
                break;
            }
        }
    }
} else {
    $channel_number = 0;
    $channel_id = $channels->entries[0]->id;
    $channel_name = $channels->entries[0]->title;
}
?>

    var step = 600;
    var scrolling = false;
    var current_channel = null;
    current_channel = $('#channel_<?php echo $channel_number; ?>');

    $(function () {
<?php
if ($channel_number > 4) {
    echo '$("#live_channels_scroller").animate({
               
            scrollTop: "+=' . 68 * ($channel_number - 1) . 'px"
        }, 1);';
}
?>

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            channel_change('<?php if ($channels_stream && sizeof($channels_stream)) echo $channels_stream[$channel_number]->hls; ?>', $('#channel_<?php echo $channel_number; ?>'), '<?php echo $channel_id; ?>', '<?php echo $channel_name; ?>');
        } else {
            channel_change('<?php if ($channels_stream && sizeof($channels_stream)) echo $channels_stream[$channel_number]->hds; ?>', $('#channel_<?php echo $channel_number; ?>'), '<?php echo $channel_id; ?>', '<?php echo $channel_name; ?>');
        }


<?php
for ($i = 0; $i < sizeof($channels_stream); $i++) {

    echo "$('#channel_" . $i . "').bind('click', function(event) { 
              if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                channel_change('" . $channels_stream[$i]->hls . "', event.target, $(this).attr('station'),'" . $channels->entries[$i]->title . "'); 
              } else {
                channel_change('" . $channels_stream[$i]->hds . "', event.target, $(this).attr('station'),'" . $channels->entries[$i]->title . "'); 
              }
            });\n\n";
}
?>

        $("#channels_button_up").bind("click", function (event) {
            event.preventDefault();
            $("#live_channels_scroller").animate({
                scrollTop: "-=" + step + "px"
            });
        }).bind("mouseover", function (event) {
            scrolling = true;
            scrollContent("up", 'live_channels_scroller');
        }).bind("mouseout", function (event) {
            scrolling = false;
        });

        $("#channels_button_down").bind("click", function (event) {
            event.preventDefault();
            $("#live_channels_scroller").animate({
                scrollTop: "+=" + step + "px"
            });
        }).bind("mouseover", function (event) {
            scrolling = true;
            scrollContent("down", 'live_channels_scroller');
        }).bind("mouseout", function (event) {
            scrolling = false;
        });
    });

    function scrollContent(direction, id) {
        var amount = (direction === "up" ? "-=1px" : "+=1px");
        $("#" + id).animate({
            scrollTop: amount
        }, 1, function () {
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
                }, 1, function () {
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
                }, 1, function () {
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

    function channel_change(release_url, channel_obj, id, channel_name) {

                if (current_channel == channel_obj) {
                    return;
                }
                // selects channel
                if (current_channel)
                    TweenMax.to(current_channel, .3, {boxShadow: "0px 0px 10px rgba(0,0,0,1)", border: "1px solid #000"});

                TweenMax.to(channel_obj, .3, {boxShadow: "2px 0px 20px rgba(21,76,123,0.8)", border: "1px solid rgba(21,76,123,0.8)"});

                current_channel = channel_obj;

                // change channel
                $pdk.controller.setReleaseURL(release_url);

                if (typeof (id) != 'undefined') {

                    arr = id.split('/');
                    chann = arr[arr.length - 1];

                    $.ajax({
                        url: "<?php echo base_url() . 'index.php/live/epg_timeline'; ?>",
                        type: "POST",
                        data: "channel=" + chann,
                        beforeSend: function () {
                            $('#epg_container').html('');
                            $('#epg_container').append("<div id='epg_scroller'></div>");
                            marginTop = (parseInt($('#epg_scroller').height()) - 50) / 2;
                            $('#epg_scroller').html('<div id="loadingIcon"></div>');
                            $('#loadingIcon').css('margin-top', "0px");
                        },
                        success: function (data) {
                            $('#epg_container').html(data);
                            $('.epg_channel_name').text(channel_name + " SCHEDULE");
                        }
                    });
                }
        };
    
</script>
</div>
</div>
<div class="header_resize2">

    <!-- content -->
    <div class="live_content_bg">
        <div class="live_content">

            <div id="live_player_container">
                <div  id="tdp_player_live"
                      class="tpPlayer"
                      tp:plugin0="type=adcomponent|URL=<?php echo common_asset_url(); ?>pdk/swf/SMIL.swf|priority=3"
                      tp:plugin1="type=adcomponent|URL=<?php echo common_asset_url(); ?>pdk/swf/akamaiHD.swf|priority=3"
                      tp:layoutUrl="<?php echo common_asset_url(); ?>pdk/data/metaLayout.xml"></div>
            </div>

            <div class="channels_widget_container">
                <div id="channels_button_up"></div>
                <div class="live_channels_container">
                    <div id="live_channels_scroller">
                        <?php
                        if ($channels && isset($channels->entries)) {
                            for ($i = 0; $i < sizeof($channels->entries); $i++) {
                                $channel_image = "";
                                if (isset($channels->entries[$i]->media)) {

                                    $channel_image = getEntryThumbnail($channels->entries[$i]->media, "Channel Logo Small");
                                }
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

        </div>
    </div>
    <div id="epg_container"></div>
</div>

<div class="popup" id="popup_location">
    <span class="button b-close"><span>X</span></span>
    <div class="location_title">This content is not available<br>for your location</div>

</div>