​<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key = "BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script type="text/javascript">
<?php echo 'base_url = "' . base_url() . '";'; ?>
<?php
echo "account_status = '" . $account_status . "';";

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
    $channel_id = $channels->entries[0]->_id;
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

        channel_change('<?php if ($channels_stream && sizeof($channels_stream)) echo $channels_stream[$channel_number]->hls; ?>', '<?php if ($channels_stream && sizeof($channels_stream)) echo $channels_stream[$channel_number]->hls_blocked; ?>', $('#channel_<?php echo $channel_number; ?>'), '<?php echo $channel_id; ?>', '<?php echo $channel_name; ?>', '<?php echo $channels_stream[$channel_number]->policy_id; ?>');



<?php
for ($i = 0; $i < sizeof($channels_stream); $i++) {

    echo "$('#channel_" . $i . "').bind('click', function(event) { 
             
                channel_change('" . $channels_stream[$i]->hls . "','" . $channels_stream[$i]->hls_blocked . "', event.target, $(this).attr('station'),'" . $channels->entries[$i]->title . "','" . $channels_stream[$i]->policy_id . "'); 
             
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



    function channel_change(release_url, release_blocked_url, channel_obj, id, channel_name, policy_id) {

        get_country_data(function (country) {

            get_channel(country, release_url, release_blocked_url, channel_obj, id, channel_name, policy_id);
        });

    }

    function get_channel(country, release_url, release_blocked_url, channel_obj, id, channel_name, policy_id) {
console.log("Country: "+ country + " Subscription status: "+account_status);
        if (country === 'Jamaica') {

            if (account_status === 'login') {
                $('#popup_login').bPopup();

            } else if (account_status === 'enabled' || account_status === 'subscriber') {
                stream_url = release_url;
                load_data(stream_url, id, channel_obj, channel_name, policy_id);
            }

        } else {

            if (account_status === 'login') {
                $('#popup_login_outside').bPopup();

            } else if (account_status === 'subscriber') {
                $('#jw_live_player').text("Subscribe to view this content");
                $('#popup_subscriber').bPopup();
            } else if (account_status === 'enabled') {
                stream_url = release_blocked_url;
                load_data(stream_url, id, channel_obj, channel_name, policy_id);
            }
        }

        if (typeof (id) != 'undefined') {

            arr = id.split('/');
            chann = arr[arr.length - 1];

            $.ajax({
                url: "<?php echo base_url() . 'index.php/live/epg_timeline'; ?>",
                type: "POST",
                data: "channel=" + chann + '&timezone=' + timezone_offset + '&country=' + country,
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
                    if (country !== 'Jamaica') {
                        $('.blocked_text').css('display', 'block');
                    }
                    reload_epg()

                }
            });
        }

    }

    function reload_epg() {

        setInterval(function () {
            now = new Date().getTime();
            next_time = parseInt($('.current_row').next('tr').children('td.epgData').attr('id'));

            if (now > next_time) {

                next_row = $('.current_row').next('tr');
                $('.current_row').remove();
                next_row.addClass('current_row');
                $('.current_row').children('.epgData').addClass('epgDataCurrent');
                $('.current_row').children('.epgTime').addClass('current_epg_date');
                $('td.epgDataCurrent').css('border-right-color', '#7f00bf');
                $('td.epgDataCurrent').css('border-right-style', 'solid');
                $('td.epgDataCurrent').css('border-right-color', '#7f00bf');
                $('td.epgDataCurrent').css('border-right-width', '8px');
            }

        }, 10000);

    }

    function load_data(stream_url, id, channel_obj, channel_name, policy_id) {

        if (current_channel == channel_obj) {
            return;
        }
        // selects channel
        if (current_channel)
            TweenMax.to(current_channel, .3, {boxShadow: "0px 0px 10px rgba(0,0,0,1)", border: "1px solid #000"});

        TweenMax.to(channel_obj, .3, {boxShadow: "2px 0px 20px rgba(127,26,191,0.8)", border: "1px solid rgba(127,26,191,0.8)"});

        current_channel = channel_obj;
        if (policy_id != '') {
            // change channel
            jwplayer("jw_live_player").setup({
                file: stream_url,
                primary: 'flash',
                androidhls: true,
                autostart: true,
                aspectratio: "16:9",
                width: "100%",
                events: {
                    onPlay: function (e) {
                        handleOnMediaStart(channel_name);
                    }
                },
                advertising: {
                    client: 'vast',
                    'skipoffset': 5,
                    tag: base_url + 'index.php/vod/get_advertisement_xml?policy_id=' + policy_id
                }
            });
        } else {
            jwplayer("jw_live_player").setup({
                file: stream_url,
                primary: 'flash',
                androidhls: true,
                autostart: true,
                aspectratio: "16:9",
                width: "100%",
                events: {
                    onPlay: function (e) {
                        handleOnMediaStart(channel_name);
                    }
                },
                advertising: {
                    client: 'googima',
                    tag: 'http://ad4.liverail.com/?LR_PUBLISHER_ID=151407&LR_SCHEMA=vast2-vpaid&LR_TAGS=prime_time_news,prime_time_sports,smile_jamaica&LR_AUTOPLAY=1&LR_VERTICALS=test'
                }
            });
        }
    }

    function get_country_data(callback) {

        $.getJSON("http://www.geoplugin.net/json.gp?jsoncallback=?", {
        }).done(function (result) {
            count = result['geoplugin_countryName'];
            country_var = count;
            console.log('Country is ', count);
            callback(count);
        }).error(function (result) {
             console.log('Country was forced to Jamaica');
            callback('Jamaica');
           
        });
    }

    function handleOnMediaStart(channel_name) {
        _gaq.push(['_trackEvent', 'Live', 'Play', channel_name]);
    }


    $(document).on('submit', "#login_form", function (e) {

        $.ajax({
            url: base_url + 'index.php/account/login',
            type: 'POST',
            dataType: 'json',
            data: 'email=' + $('#email').val() + '&password=' + $('#password').val(),
            success: function (data) {

                if (data.error) {
                    $('#popup_error').html(data.message);
                    $('#popup_error').fadeIn('slow');
                    $('#password').val('');
                } else {
                    location.reload();

                }
            }
        });
        return false;
    });

    $(document).on('submit', "#login_form_outside", function () {

        $.ajax({
            url: base_url + 'index.php/account/login',
            type: 'POST',
            dataType: 'json',
            data: 'email=' + $('#email_outside').val() + '&password=' + $('#password_outside').val(),
            success: function (data) {

                if (data.error) {
                    $('#popup_error_outside').html(data.message);
                    $('#popup_error_outside').fadeIn('slow');
                    $('#password_outside').val('');
                } else {
                    location.reload();

                }
            }
        });
        return false;

    });

    $(document).on('click', '#signin_fb_btn', function (event) {
        event.preventDefault();
        signInWithFacebook();
    });

    $(document).on('submit', '#register_form', function () {
        window.location = base_url + 'index.php/account/register_ssl';
        return false;
    });

    $(document).on('submit', '#suscriber_form', function () {
        window.location = base_url + 'index.php/account/my_account_ssl#tab2';
        return false;
    });

    $(document).on('focus', '#email', function () {
        $('#popup_error').fadeOut('slow');
        $('#popup_error').html('');
    });

    $(document).on('focus', '#password', function () {
        $('#popup_error').fadeOut('slow');
        $('#popup_error').html('');
    });

    $(document).on('focus', '#email_outside', function () {
        $('#popup_error_outside').fadeOut('slow');
        $('#popup_error_outside').html('');
    });

    $(document).on('focus', '#password_outside', function () {
        $('#popup_error_outside').fadeOut('slow');
        $('#popup_error_outside').html('');
    });

//    setInterval(function () {
//
//        $.ajax({
//            url: base_url + 'index.php/account/check_status',
//            type: 'POST',
//            dataType: 'json',
//            success: function (data) {
//                if (data.status == 'error') {
//                    window.location = base_url;
//                }
//            }
//        })
//    }, 120000);

    window.fbAsyncInit = function () {
        FB.init({
            appId: '<?php echo FACEBOOK_APP_ID; ?>',
            cookie: true, // This is important, it's not enabled by default
            version: 'v2.2'
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function signInWithFacebook() {

        FB.login(function (response) {

            if (response.authResponse) {
                TweenLite.fromTo("#info", 1, {alpha: 1}, {alpha: 0});
                checkLoginState();
            } else {
                show_info('You must accept the permissions to Login with Facebook');
            }
        },
          {
              scope: 'email,public_profile'
          });
        return false;
    }

    function checkLoginState() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    }

    function statusChangeCallback(response) {

        if (response.status === 'connected') {
            $('#send_activation_email_login_button').hide();
            $('#fb_signin_preloader').html('Sending data...');
            $('#fb_signin_preloader').css('display', 'block');
            TweenLite.fromTo("#signup_fb_btn", 1, {alpha: 1}, {alpha: 0});

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/login_by_facebook",
                type: 'POST',
                dataType: 'json'
            }).done(function (data) {
                if (data.status == 'ok') {
                    location.reload();
                } else {
                    $('#fb_signin_preloader').hide();
                    show_info(data.message);

                }
            });
        } else {
            signInWithFacebook();
        }
    }


</script>
</div>
</div>
<div class="header_resize2">

    <!-- content -->
    <div class="live_content_bg">
        <div class="live_content">

            <div id="live_player_container">

                <div id="jw_live_player">Loading the player...</div>
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
                                <div class="live_channel_container" station="<?php echo $channels->entries[$i]->_id; ?>" id="channel_<?php echo $i; ?>" <?php echo 'style="background: url(' . $channel_image . ') center center no-repeat; background-size: 126px 68px;' . ($i == 0 ? 'box-shadow: 2px 0px 20px rgba(0,0,255,0.8); border: 1px solid rgba(0,0,255,0.8);"' : '"'); ?>></div>
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

<div class="popup" id="popup_login">
    <span class="button b-close"><span>X</span></span>`
    <div class="form_title">BECOME A MEMBER TO WATCH LIVE SIGNALS...</div>
    <div class="popup_content">
        <div class="col_izq">
            <div class="popup_title">Sign In</div>
            <form id="login_form" class="popup_form">

                <div class="popup_label">Email Address</div>
                <input name="email" id="email" class="popup_input" type="email"  required="required"/>

                <div class="popup_label">Password</div>

                <input name="password" id="password" class="popup_input" type="password" required="required"/>

                <div id="forgot_span">Forgot your<a href="#" id="forgot_btn"> password?</a></div>

                <button class="dialog_button" id="singin_button">Sign In</button>
                <div id="popup_error"></div>

            </form>

        </div>
        <div class="col_der">
            <form id="register_form" class="popup_form">
                <div class="popup_title">Not a member?</div>

                <button class="dialog_button" id="register_btn">Register Now</button>
            </form>
        </div>
    </div>
</div>

<div class="popup" id="popup_login_outside">
    <span class="button b-close"><span>X</span></span>
    <div class="form_title">BECOME A SUBSCRIBER TO WATCH LIVE SIGNALS...</div>
    <div class="popup_content">
        <div class="col_izq">
            <div class="popup_title">Sign In</div>
            <form id="login_form_outside" class="popup_form">

                <div class="popup_label">Email Address</div>
                <input name="email" id="email_outside" class="popup_input" type="email"  required="required"/>

                <div class="popup_label">Password</div>

                <input name="password" id="password_outside" class="popup_input" type="password" required="required"/>

                <div id="forgot_span">Forgot your<a href="#" id="forgot_btn"> password?</a></div>

                <button class="dialog_button" id="singin_button">Sign In</button>
                <div id="popup_error_outside"></div>
                <!--
                                <button id="signin_fb_btn" style="margin: 10px 0px 15px;"></button>
                                <div id="fb_signin_preloader"></div>-->

            </form>

        </div>
        <div class="col_der">
            <form id="register_form" class="popup_form">
                <div class="popup_title">Not a member?</div>

                <button class="dialog_button" id="register_btn">Register Now</button>
            </form>
        </div>
    </div>
</div>

<div class="popup" id="popup_subscriber">
    <span class="button b-close"><span>X</span></span>
    <div class="form_title">BECOME A SUBSCRIBER TO WATCH LIVE SIGNALS...</div>
    <div class="popup_content">
        <form id="suscriber_form" class="popup_form">
            <button class="dialog_button" id="singin_button">Subscribe Now</button>
        </form>
    </div>
</div>
