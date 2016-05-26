<div id="fb-root"></div>
<script>




    _gaq.push(['_trackEvent', 'Registration By FB', 'Login Information']);
    country_code = '';

    $(document).ready(function () {


        $.getJSON("http://www.geoplugin.net/json.gp?jsoncallback=?", {
        }).done(function (result) {
            country_code = result['geoplugin_countryCode'];

        }).error(function (result) {
            country_code = 'US';
        });

        function show_info() {
            $("#info").show();
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                    TweenLite.to("#info", 1, {delay: 6, alpha: 0, onComplete: function () {
                            $("#info").hide();
                        }});
                }});
        }


        $("#register_fb_btn").on('click', function (event) {
            event.preventDefault();

            if ($('#password').val() !== $("#confirm_password").val()) {
                show_info();
                $("#info").html("* Password and Confirm are not match");
                return false;
            }

            $(this).hide();
            $('#registration_preloader').html('Sending data...');
            $('#registration_preloader').show();

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/singup_by_fb",
                type: 'POST',
                dataType: 'json',
                data: $('#register_by_fb_form').serialize() + '&country=' + country_code
            }).done(function (data) {

                if (data.message == 'ok') {
                    window.location.href = "<?php echo base_url(); ?>index.php/account/register_payment_ssl";


                } else {
                    $('#registration_preloader').hide();
                    $('#register_fb_btn').show();
                    $("#info").html("* " + data.message);
                    $("#info").show();
                    TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#info", 1, {delay: 6, alpha: 0, onComplete: function () {
                                    $("#info").hide();
                                }});
                        }});
                }
            });
        });


    });

    function button_back_clickHandler() {

        window.history.go(-1);

        return false;
    }


</script>
</div>
</div>
</div>

<!-- content -->

<div class="header_resize2" id="login-box">
    <div class="now_page_resize">
        <div class="form_title">REGISTER By FACEBOOK</div>
        <div class="clr"></div>
    </div>
    <div class="clr"></div>
    <div style="width:100%;height:600px;margin: 0 auto;">
        <form id="register_by_fb_form">

            <?php
            if (isset($fb_profile->content)) {
                ?>

                <img id="fb_image" src="<?php echo $fb_profile->content->picture; ?>"/>
                <div class="registration_fb_subtitle">Welcome <?php echo $fb_profile->content->name; ?></div>
             
                <div id="fb_password_container">
                    <div>
                        <label for="password">Password</label><br>
                        <input id="password" name="password" class="text" type="password" />
                    </div>

                    <div>
                        <label for="confirm_password">Confirm Password</label><br>
                        <input id="confirm_password" name="confirm_password" class="text" type="password" />
                     
                    </div>
                    <p id="info" class="form_info">&nbsp;</p>
                    <button id="register_fb_btn"></button>
                    <div id="registration_preloader"></div>

                </div>

                <?php
            } else {
                ?>
                <div style="width: 300px;text-align: center">
                    <div class="register_session_expired">Your session has expired</div>
                    <div class="register_back" onclick="button_back_clickHandler()"></div>
                </div>
                <?php
            }
            ?>
        </form>
    </div>
    <div class="clr"></div>
</div>
