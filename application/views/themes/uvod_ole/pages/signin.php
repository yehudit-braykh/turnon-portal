
<div class="container">

    <div class="uvod_container">
        <div class="form_title">Please Log In</div>

        <form  id="loginform" style="width:300px;display:block;margin-left:auto;margin-right:auto;">
            <ol>
                <li> 
                    <span id="info" class="form_info"></span>
                </li>
                <li class="buttons">
                    <input type='image' id="send_activation_email_login_button" src="<?php echo asset_url(); ?>images/button_resend_activation_email.png"/>
                    <div id="send_activation_email_preloader"></div>
                    <div class="clr"></div>
                </li>    
                <li>
                    <input id="email" name="email" placeholder="Email address" class="text"/>
                </li>
                <li>
                    <input id="password" name="password" placeholder="Password" class="text" type="password" />

                    <span style="float: right;">
                        <a href="<?php echo base_url(); ?>index.php/account/forgot" style="color:#b9b9b9;">Forgot your password?</a>
                    </span>

                </li>
                <li>
                    <input id="remember_credentials" name="remember_credentials" type="checkbox">
                    <label for="remember_credentials" style="width: 200px;">Remember me</label>

                </li>
                <li class="buttons">
                    <button id="btn_sign_in" class="send">LOG IN</button>
                    <div id="login_preloader"></div>
                    <div class="clr"></div>
                </li>

                <li>

                    <div class="or_separator">or</div>

                    <button id="signin_fb_btn"></button>
                    <div id="fb_signin_preloader"></div>

                </li>
                <li><hr id="line"></li>

                <li>
                    <span>
                        <button id="btn_create" type="button" class="btn btn-default">Create new account</button>

                         <!--<a id="btn_create" href="<?php echo base_url(); ?>index.php/account/register_ssl" style="color:#FFF;">Create your account</a>-->
                    </span>
                </li>

            </ol>
        </form>
    </div>
    <div id="fb-root"></div>
</div>
<!-- end container-->

<script>

    $(document).ready(function () {

        var width = $(window).width();
        if (width >= 320 && width < 768) {
            $('#top_menu_about').remove();
            $('#top_menu_support').remove();
            $('#search').remove();
            $('#header_sep').remove();
        }

        $('#signin_fb_btn').on('click', function (event) {
            event.preventDefault();
            signInWithFacebook();
        });

        $('#send_activation_email_login_button').click(function (event) {

            event.preventDefault();
            $(this).hide();
            $('#send_activation_email_preloader').show();
            $('#send_activation_email_preloader').html('Sending activation email...');

            $.ajax({
                url: '<?php echo base_url(); ?>index.php/account/send_activation_email_login',
                type: 'POST',
                dataType: 'json',
                data: 'email=' + $('#email').val()
            }).done(function (data) {

                if (data.status == 'ok') {

                    $('#send_activation_email_preloader').hide();
                    $('#send_activation_email_login_button').hide();
                    show_info(data.message);
                } else {
                    $('#send_activation_email_preloader').hide();
                    $('#send_activation_email_login_button').show();
                    show_info(data.message);
                }
            });

        });

        $('.text').on('click', function () {
            if ($("#info").text() != '') {
                TweenLite.fromTo("#info", 1, {alpha: 1}, {alpha: 0, onComplete: function () {
                        $("#info").html("");
                    }});
            }
        });


        $('#btn_sign_in').on('click', function (event) {
            event.preventDefault();
            $(this).hide();
            $('#login_preloader').show();
            $('#login_preloader').html('Login...');

            $.ajax({
                url: '<?php echo base_url(); ?>index.php/account/login',
                type: 'POST',
                dataType: 'json',
                data: $('#loginform').serialize()
            }).done(function (data) {
                if (data.message == 'ok') {
                    window.location.href = '<?php echo base_url(); ?>';
                }
                else if (data.message == 'Your account is not active yet. Check your email for the activation link.') {
                    $('#login_preloader').hide();
                    $('#btn_sign_in').show();
                    $('#send_activation_email_login_button').show();
                    show_info(data.message);
                }
                else {
                    $('#login_preloader').hide();
                    $('#btn_sign_in').show();
                    show_info(data.message)
                }
            });

        });
      

    });


    $('#btn_create').on('click', function (event) {
        event.preventDefault();
        window.location.href = '<?php echo base_url(); ?>index.php/account/register_ssl';
    })

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
                    window.location.href = "<?php echo base_url(); ?>";
                } else {
                    $('#fb_signin_preloader').hide();
                    show_info(data.message);

                }
            });
        } else {
            signInWithFacebook();
        }
    }

    function show_info(data) {
        $("#info").html("* " + data);
        TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1});
    }
</script>
