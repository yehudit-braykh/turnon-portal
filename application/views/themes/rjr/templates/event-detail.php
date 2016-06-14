
<?php
if (isset($events->content) && sizeof($events->content) > 0 && (!isset($events->error) || $events->error == false)) {

    $data = $events->content[0];
    $event_time = $data->event_date;
    ?>
    <script>

        $(document).ready(function () {

    <?php echo 'event_time=' . $event_time . ';'; ?>

            var clock = $('#countdown').FlipClock((event_time - new Date().getTime()) / 1000, {
                clockFace: 'DailyCounter',
                countdown: true,
                callbacks: {
                    stop: function () {

    <?php
    if (isset($events->content) && sizeof($events->content) > 0) {
        $data = $events->content[0];
        if (isset($data->already_purchased) && $data->already_purchased) {
            ?>
                                open_player();
                                setup_player();
                                TweenMax.set("#event_player_container", {height: "auto"});
                                TweenMax.from("#event_player_container", 1, {height: 0});
                                TweenMax.fromTo("#event_player_close", 1, {alpha: 0}, {alpha: 1});

                                var add_html = "<div class='already_purchased_msg'>YOUR TICKET IS READY!<br></div>";
                                add_html += "<button type='button' id='new_watch_now_btn' class='btn btn-primary btn-lg btn_events' onclick='button_play_clickHandler()' role='button'>Watch now</button>"
                                $(".already_purchased_msg").hide();
                                $(".view_purchased_ticket").hide();
                                $("#col_info_sm").append(add_html);
                                $("#new_watch_now_btn").bind("click", function () {
                                    open_player();
                                    setup_player();
                                    TweenMax.set("#event_player_container", {height: "auto"});
                                    TweenMax.from("#event_player_container", 1, {height: 0});
                                    TweenMax.fromTo("#event_player_close", 1, {alpha: 0}, {alpha: 1});
                                })

            <?php
        }
    }
    ?>
                    }
                }
            });

            $("#btn_buy_tickets").click(function () {
                $('#popup_login').bPopup();
            });




            $("#buy_ticket_btn").on("click", function () {
                $.ajax({
                    url: '<?php echo base_url(); ?>index.php/live_events/check_login_status',
                    type: 'POST',
                    dataType: 'json',
                }).done(function (data) {

                    if (data.status == 'buy') {

                        window.location.href = "<?php echo base_url(); ?>index.php/live_events/buy_events_ssl";
                    } else {
                        window.location.href = "<?php echo base_url(); ?>index.php/account/signin";
                    }
                });

            })


            $(".view_purchased_ticket").on("click", function () {

                window.location.href = "<?php echo base_url(); ?>index.php/account/my_account_ssl/#tab3";

            });
        });




        function button_play_clickHandler() {

            open_player();
            setup_player();
            TweenMax.set("#event_player_container", {height: "auto"});
            TweenMax.from("#event_player_container", 1, {height: 0});
            TweenMax.fromTo("#event_player_close", 1, {alpha: 0}, {alpha: 1});

        }

        function open_player() {

            $('.player_container').css('background-color', '#000');
            $('.player_container .col-sm-2').css('min-height', '1px');
            $('.player_container .col-sm-8').css('min-height', '1px');
            $('#event_player_container').show();
            $('#event_player_close').show();
            $('.carousel-container').css({display: "none"});
            $('.event-detail-result').css({display: "none"});
            $('.footer').css({display: "none"});
        }



        function setup_player() {

            var is_mobile = mobileAndTabletcheck();

            if (!is_mobile) {

                stream_url = "http://rjr_flash-lh.akamaihd.net/z/rjrexternal_1@179257/manifest.f4m";
                jwplayer("jw_live_player").setup({
                    width: '100%',
                    autostart: true,
                    aspectratio: "16:9",
                    playlist: [{
                            file: stream_url,
                            provider: "http://players.edgesuite.net/flash/plugins/jw/v3.8/AkamaiAdvancedJWStreamProvider.swf",
                            type: 'mp4'
                        }],
                    primary: "flash",
                });

            } else {

                stream_url = "<?php echo $data->streaming_url; ?>";
                jwplayer("jw_live_player").setup({
                    file: stream_url,
                    width: '100%',
                    androidhls: true,
                    autostart: true,
                    aspectratio: "16:9"
                });

            }

        }

        function button_close_clickHandler() {
            TweenMax.to("#event_player_container", 1, {height: 0});
            TweenMax.to("#event_player_close", 1, {alpha: 0, onComplete: function () {
                    $("#event_player_container").hide();
                    $("#event_player_close").hide();
                    $('.player_container .col-sm-2').css('min-height', '0px');
                    $('.player_container .col-sm-8').css('min-height', '0px');
                    $('#back_button_container').show();
                    $('.carousel-container').css({display: "block"});
                    $('.event-detail-result').css({display: "block"});
                    $('.footer').css({display: "block"});
                }});
        }
        ;


        setInterval(function () {

            $.ajax({
                url: base_url + 'index.php/account/check_status',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.status == 'error') {
                        window.location = base_url;
                    }
                }
            })
        }, 120000);
    </script>

    <div class="container">

        <div class="content_info">

            <div class="col-sm-5 pic_events">

                <?php if (isset($data->live_now) && $data->live_now) {
                    ?>
                    <div class="col-sm-12 live_now_advise">LIVE NOW</div>
                    <?php
                }
                ?>
                <img class="img_events" src="<?php echo $data->image; ?>">

            </div> 

            <div class="col-sm-7 info_events">

                <div class="col-sm-12" id="col_info_sm">

                    <?php if (isset($data->live_now) && !$data->live_now) {
                        ?>
                        <h3><small>BEGINNING IN:</small></h3>
                        <div class="live_events_countdown">
                            <div id="countdown"></div>
                        </div>
                    <?php }
                    ?>

                    <h2 class="event-detail-title"><?php echo $data->name; ?><br>
                        <small>
                            <?php
                            $tz = 'EST';
                            $timestamp = $data->event_date / 1000;
                            $dt = new DateTime("now", new DateTimeZone($tz)); //first argument "must" be a string
                            $dt->setTimestamp($timestamp); //adjust the object to correct timestamp
                            $event_date = $dt->format('l, F d, Y - H:i');

                            echo $event_date . ' Hours EST - US $' . $data->price;
                            ?></small>
                    </h2>

                    <h5 class="vod_info_credit_item_value"><?php echo $data->description; ?></h5>
                    <div class="dc_clear"></div>
                    <?php
                    if (isset($data->already_purchased) && $data->already_purchased) {
                        if (isset($data->live_now) && $data->live_now) {
                            ?>
                            <div class='already_purchased_msg'>YOUR TICKET IS READY!<br></div>
                            <button type="button" class="btn btn-primary btn-lg btn_events" onclick="button_play_clickHandler()" role="button">Watch now</button>

                            <?php
                        } else {
                            ?>
                            <div class='already_purchased_msg'>ALREADY PURCHASED!</div>               
                            <div class='view_purchased_ticket'>Click here to see your purchased Tickets.</div>
                            <?php
                        }
                    } else {
                        ?>
                        <a id="buy_ticket_btn" href="#" class="btn btn-primary btn-lg btn_events" role="button">Buy your ticket now!</a>

                        <?php
                    }
                    ?>

                </div>



            </div>
        </div>



    </div>

    <?php
}
?>