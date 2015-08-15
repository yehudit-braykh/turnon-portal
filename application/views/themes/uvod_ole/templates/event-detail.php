
<?php
if (isset($events->content) && sizeof($events->content) > 0) {
    $data = $events->content[0];
    $event_time = ($data->event_date - (time() * 1000)) / 1000;
    ?>
    <script>

        $(document).ready(function () {
            var clock = $('#countdown').FlipClock(<?php echo $event_time; ?>, {
                clockFace: 'DailyCounter',
                countdown: true
            });

            $("#btn_buy_tickets").click(function () {
                $('#popup_login').bPopup();
            });

        });

        function button_play_clickHandler() {

            $('#player_container').css({display: "block"});
            TweenMax.to("#player_container", 1, {height: 540, ease: Quart.easeInOut, onComplete: function () {
                    $('#player_close').css({display: "block"});
                    $('.carousel-container').css({display: "none"});
                    $('.event-detail-result').css({display: "none"});
                    $('.footer').css({display: "none"});
    <?php
    if (isset($events->content) && sizeof($events->content) > 0) {
        $data = $events->content[0];
        if ($data->live_now && isset($data->already_purchased) && $data->already_purchased) {
            ?>
                            stream_url = "<?php echo $data->streaming_url; ?>";
                            jwplayer("jw_live_player").setup({
                                file: stream_url,
                                width: '100%',
                                androidhls: true,
                                autostart: true,
                                aspectratio: "16:9"
                            });

            <?php
        }
    }
    ?>

                }});
        }


        function button_close_clickHandler() {

            TweenMax.to("#player_container", 1, {height: 0, ease: Quart.easeInOut, onComplete: function () {
                    $('#player_container').css({display: "none"});
                    $('#player_close').css({display: "none"});
                    $('.carousel-container').css({display: "block"});
                    $('.event-detail-result').css({display: "block"});
                    $('.footer').css({display: "block"});


                }});
            return false;
        }

    </script>

    <?php
    if (isset($events->content) && sizeof($events->content) > 0) {
        $data = $events->content[0];
        if ($data->live_now && isset($data->already_purchased) && $data->already_purchased) {
            ?>
            <div id="player-window">
                <div id="player_container">
                    <div id="jw_live_player">Loading the player...</div>
                </div>
                <div id="player_close"><a href="#" onclick="button_close_clickHandler()">Close</a></div>
            </div>
            <?php
        }
    }
    ?>

    <div id="event-item-detail">
      
            <div id="event-left-column" class="col-lg-4">

                <div class="event-detail-img">
                    <?php if ($data->live_now) {
                        ?>
                        <div class="col-md-12" id="live_now_advise">LIVE NOW</div>
                        <?php
                    }
                    ?>
                    <img src="<?php echo $data->image; ?>">
                </div>
            </div>
            <div id="event-right-column" class="col-lg-8">
                <?php if (!$data->live_now) {
                    ?>
                    <div class="live_events_begins">BEGINNING IN</div>
                    <div class="live_events_countdown">
                        <div id="countdown"></div>
                    </div>
                <?php }
                ?>

                <div class="event-detail-title">
                    <span><?php echo $data->name; ?></span>
                </div>
                <div class="event-detail-subtitle">
                    <span><?php echo date('M,d  H:i', ($data->event_date / 1000)) . ' hs. - $' . $data->price; ?></span>
                </div>
                <div class="event-detail-description">
                    <span><?php echo $data->description; ?></span>
                </div>
                <div class="event-detail-result">
                    <?php
                    if (isset($data->already_purchased) && $data->already_purchased) {
                        if ($data->live_now) {
                            ?>
                            <span class='already_purchased_msg'>YOUR TICKET IS READY</span>
                            <br>
                            <a href="#" onclick="button_play_clickHandler()" class="btn btn-primary btn-lg active" role="button">Watch now!</a>
                            <?php
                        } else {
                            ?>
                            <span class='already_purchased_msg'>ALREADY PURCHASED!</span>
                            <br>
                            <span class='already_purchased_sub_msg'>Your ticket is ready</span>
                            <?php
                        }
                    } else {
                        ?>
                        <a href="<?php echo base_url(); ?>index.php/live_events/buy_events" class="btn btn-primary btn-lg active" role="button">Buy your ticket now</a>
                        <?php
                    }
                    ?>

                </div>
            </div>
        </div>

    <?php
}
?>