<?php date_default_timezone_set('Jamaica'); ?>
<!--<script type="text/javascript" src="<?php //echo common_asset_url(); ?>pdk/tpPdk.js"></script>-->
<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/flipclock/flipclock.min.js"></script>
<link rel="stylesheet" href="<?php echo common_asset_url(); ?>js/flipclock/flipclock.css">
<script type='text/javascript' src="<?php echo common_asset_url(); ?>js/wurfl.js"></script>
​<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key = "BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script type="text/javascript">

<?php echo 'base_url = "' . base_url() . '";'; ?>

    $(document).ready(function () {
        
        <?php 
        if (isset($event_time) && $event_time != "") { ?>
            var clock = $('#countdown').FlipClock(<?php echo $event_time; ?>, {
            clockFace: 'DailyCounter',
            countdown: true
        }); <?php }?> 
        
        $("#btn_buy_tickets").click(function () {
            $('#popup_login').bPopup();
        });

        $(document).on('submit', '#register_form', function () {
            window.location = base_url + 'index.php/account/register';
            return false;
        });

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
                        window.location = base_url + 'index.php/account/my_account';
                    }
                }
            });
            return false;
        });
        
           
<?php
$now = time();
if (isset($_SESSION['user_data']) && $event_already_purchased && $now >= ($event_datetime / 1000)) {
    $play_stream = true;
    ?>
            stream_url = "<?php echo $event_stream_url; ?>";
            jwplayer("jw_live_player").setup({
                file: stream_url,
                width: '100%',
                androidhls: true,
                autostart: true,
                aspectratio: "16:9"
            });

            setInterval(function () {
               
                $.ajax({
                    url: base_url + 'index.php/account/relogin',
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        if(data.status == 'error'){
                             window.location = base_url;
                        }
                    }
                })
            }, 120000);


    <?php
} else {
    $play_stream = false;
}
?>

    });


</script>



</div>
</div>
</div>

<div class="content_resize">

    <!-- content -->
    <div class="content_centered" style="min-height: 600px;">
        <?php
        if (isset($event_time)) {
            ?>
        <div id="event_image_container">
            <?php
            if (isset($event_image)) {
        ?>
                <img class="live_events_image" src="<?php echo $event_image; ?>" />
                <?php
            }
            ?>
        </div>
        <div class="live_events_title">STAY TUNED FOR OUR NEXT EVENT</div>

        <div class="live_events_subtitle"><?php echo $event_title; ?></div>
        <div class="social_content centered">
            <span class='st_facebook_large' displayText='Facebook'></span>
            <span class='st_twitter_large' displayText='Tweet'></span>
            <span class='st_googleplus_large' displayText='Google +'></span>
        </div>
        <?php
        
            if (!$play_stream) {

                if ($event_time > 0) {
                    $button_text = 'Buy your tickets now!';
                    ?>

                    <div class="live_events_begins">BEGINNING IN</div>
                    <div class="live_events_countdown">
                        <div id="countdown"></div>
                    </div>
                    <?php
                } else {
                    $button_text = 'Buy your tickets to watch it now!';
                    ?>
                    <div class="live_events_begins">THIS EVENT IS IN PROGRESS...</div>
                    <div class="clr"></div>
                    <br>
                    <?php
                }
            }
            if (isset($_SESSION['user_data']) && isset($_SESSION['user_data']->id)) {

                if ($event_already_purchased) {
                    if ($play_stream) {
                        ?>
                        <div id="jw_live_player">Loading the player...</div>
                        <?php
                    } else {
                        ?>

                        <div class="live_events_buy_tickets">
                            <a href="#">Your ticket is ready! Comeback on <?php echo date("m/d/Y", $event_datetime / 1000); ?> to watch the event!</a>
                        </div>

                        <?php
                    }
                    ?>
                    <div class="clr"></div>
                    <br>
                    <div class="content_full_size">
                        <div class="category-title">Exclusive Content</div>
                        <div class="category_items_container"><?php echo $items_category_1; ?></div>
                        <div class="clr"></div>
                    </div>
                    <?php
                } else {
                    ?>

                    <div class="live_events_buy_tickets">
                        <a href="<?php echo base_url(); ?>index.php/account/my_account"><?php echo $button_text; ?></a>
                    </div>

                    <?php
                }
            } else {
                ?>

                <div class="live_events_buy_tickets">
                    <a id="btn_buy_tickets" href="#"><?php echo $button_text; ?></a>
                </div>

            <?php }
        }else{
            ?>
             <div class="no_events">NO EVENTS AVAILABLE AT THIS TIME</div>
           
                    <?php
        }
        ?>

    </div>
</div>
</div>

<div class="popup" id="popup_login">
    <span class="button b-close"><span>X</span></span>
    <div class="form_title">SIGN IN OR REGISTER TO BUY YOUR TICKETS...</div>
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