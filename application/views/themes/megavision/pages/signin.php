<div id="fb-root"></div>
<script>
    country_code = '';
    $(document).ready(function () {

        $.getJSON("http://www.geoplugin.net/json.gp?jsoncallback=?", {
        }).done(function (result) {
            country_code = result['geoplugin_countryCode'];
        }).error(function (result) {
            country_code = 'US';
        });

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

        $('#send_activation_email_login_button').click(function () {

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
                        $("#info").hide();
                    }});
            }
        });

        $('#btn_login').on('click', function (event) {

            event.preventDefault();
            $(this).hide();
            login();

        });

        $('#loginform').on('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) {
                $('#btn_login').hide();
                login();
                e.preventDefault();
                return false;
            }
        });

        function login() {
            $('#login_preloader').show();
            $('#login_preloader').html('Login...');

            $.ajax({
                url: '<?php echo base_url(); ?>index.php/account/login',
                type: 'POST',
                dataType: 'json',
                data: $('#loginform').serialize()
            }).done(function (data) {
                if (data.message == 'ok') {

                    ga('send', {hitType: 'event', eventCategory: 'User Type', eventAction: 'Login', eventLabel: 'Login Complete'});

                    if (data.content.mustResetPassword) {
                        $('#login_preloader').hide();
                        $('#login_preloader').html('');
                        $('#loginform').hide();
                        $('#reset_password_form').show();
                    } else {
                        <?php 
                        if(isset($from_page)){
                            $url = base_url() .'index.php/'.$from_page;
                        }else{
                            $url = base_url();
                        }
                        ?>
                        
                        window.location.href = '<?php echo $url; ?>';
                    }
                }
                else if (data.message == 'Your account is not active yet. Check your email for the activation link.') {
                    $('#login_preloader').hide();
                    $('#btn_login').show();
                    $('#send_activation_email_login_button').show();
                    show_info(data.message);
                }
                else {
                    $('#login_preloader').hide();
                    $('#btn_login').show();
                    show_info(data.message)
                }
            });
        }

        $('#btn_sign_up_merge').on('click', mergeAccounts);
    });


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
                $("#info").show();
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
                url: "<?php echo base_url(); ?>index.php/account/login_by_fb",
                type: 'POST',
                dataType: 'json'
            }).done(function (data) {
                console.log("el data es: ",data);
                if (data.status == 'ok') {
                    <?php 
                        if(isset($from_page)){
                            $url = base_url() .'index.php/'.$from_page;
                        }else{
                            $url = base_url();
                        }
                        ?>
                    window.location.href = "<?php echo $url; ?>";
                } else if (data.status == 'merge') {
                    window.location.href = "<?php echo base_url(); ?>index.php/account/merge_accounts";
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
        $(".form_info").html("* " + data);
        $(".form_info").show();
        TweenLite.fromTo(".form_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                TweenLite.to(".form_info", 1, {delay: 6, alpha: 0, onComplete: function () {
                        $(".form_info").hide();
                    }});
            }});
    }

    //To merge 1Spot account with Facebook account
    function mergeAccounts() {

        var password = $('#fb_signin_merge [type=password]').val();

        if (password) {
            $('#btn_sign_up_merge').hide();

            $('#fb_signin_merge_preloader').html('Sending data...');
            $('#fb_signin_merge_preloader').show();


            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/register_by_facebook",
                type: 'POST',
                dataType: 'json',
                data: ['country=' + country_code, 'fb_merge_accounts=true', 'password=' + password].join('&'),
            }).done(function (data) {

                if (data.status == 'ok') {
                    checkLoginState();
                } else {
                    $('#btn_sign_up_merge').show();
                    $('#fb_signin_merge_preloader').hide();
                    show_info(data.message);
                }
            });
        } else {
            show_info('Current password is required');
        }
    } //end merge accounts
</script>

</div>
</div>

<div class="header_resize2" id="login-box">
    <div class="now_page_resize">
        <div class="form_title">INGRESAR</div>
        <div class="clr"></div>
    </div>
    <div class="clr"></div>
    <div style="width:100%;height:600px;margin: 0 auto;">
        <form id="loginform" style="width:300px;display:block;margin-left:auto;margin-right:auto;">
            <ol>
                <li> 
                    <span id="info" class="form_info"></span>
                </li>
                <li class="buttons">
                    <input type='image' id="send_activation_email_login_button" class="send" src="<?php echo asset_url(); ?>images/button_resend_activation_email.png"/>
                    <div id="send_activation_email_preloader"></div>
                    <div class="clr"></div>
                </li>    
                <li>
                    <label for="email">Usuario:</label><br>
                    <input id="email" name="email" class="text"/>
                </li>
                <li>
                    <label for="password">Contraseña:</label><br>
                    <input id="password" name="password" class="text" type="password" />

                    <span style="float: right;">
                        Olvidó su<a href="<?php echo base_url(); ?>index.php/account/forgot" style="color:rgb(127,0,191);"> contraseña</a>?
                    </span>

                </li>
                <li>
                    <input id="remember_credentials" name="remember_credentials" type="checkbox">
                    <label for="remember_credentials" style="width: 200px;">Recordar Usuario y Contraseña</label>

                </li>
                <li class="buttons">
                    <button type="submit" id="btn_login" class="send">INGRESAR</button>
                    <div id="login_preloader"></div>
                    <div class="clr"></div>
                </li>

                <li>
                    <div class="or_separator">O</div>
                    <button id="signin_fb_btn"></button>
                    <div id="fb_signin_preloader"></div>
                </li>

                <li>
                    <span style="padding-left:40px;">
                        Todavía no está Registrado?  <a href="<?php echo base_url(); ?>index.php/account/register_ssl" style="color:rgb(127,0,191);">Regístrese ahora.</a>
                    </span>
                </li>

            </ol>
        </form>

        <?php
        $this->load->view(views_url() . '/templates/reset_password');
        ?>

    </div>
    <div class="clr"></div>
</div>
<!-- /content -->

