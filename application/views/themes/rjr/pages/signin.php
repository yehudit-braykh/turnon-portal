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
                    window.location.href = '<?php echo base_url(); ?>';
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

        $('#btn_sign_up_merge').on('click', function() {
            console.log('click');
            mergeAccounts();
        });


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
                url: "<?php echo base_url(); ?>index.php/account/login_by_facebook",
                type: 'POST',
                dataType: 'json'
            }).done(function (data) {
                if (data.status == 'ok') {
                    window.location.href = "<?php echo base_url(); ?>";
                } else if (data.status == 'merge') {
                    $('#login-box').hide();
                    $('#fb_signin_preloader').hide();
                    $('#fb_signin_merge').css('display', 'block');
                    TweenLite.fromTo("#fb_signin_merge", 1, {alpha: 0}, {alpha: 1});

                    var mergeForm = $('#fb_signin_merge').css('display', 'block');
                    mergeForm.find('.pl_email').text(data.merginProfiles.email);
                    mergeForm.find('.pl_name').text(data.merginProfiles.plName);
                    mergeForm.find('.fb_name').text(data.merginProfiles.fbName);
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
        $("#info").show();
        TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                TweenLite.to("#info", 1, {delay: 6, alpha: 0, onComplete: function () {
                        $("#info").hide();
                    }});
            }});
    }

    //To merge 1Spot account with Facebook account
    function mergeAccounts() {

        $('#btn_sign_up_merge').hide();

        $('#fb_signin_merge_preloader').html('Sending data...');
        $('#fb_signin_merge_preloader').show();

        $.ajax({
            url: "<?php echo base_url(); ?>index.php/account/register_by_facebook",
            type: 'POST',
            dataType: 'json',
            data: ['country=' + country_code, 'fb_merge_accounts=true'].join('&'),
        }).done(function (data) {

            if (data.status == 'ok') {
                checkLoginState();
            } else {
                $('#btn_sign_up_merge').show();
                $('#fb_signin_merge_preloader').hide();
                show_info(data.message);
            }
        });
    } //end merge accounts
</script>

</div>
</div>

<div class="header_resize2" id="login-box">
    <div class="now_page_resize">
        <div class="form_title">LOG IN</div>
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
                    <label for="email">Email</label><br>
                    <input id="email" name="email" class="text"/>
                </li>
                <li>
                    <label for="password">Password</label><br>
                    <input id="password" name="password" class="text" type="password" />

                    <span style="float: right;">
                        Forgot your <a href="<?php echo base_url(); ?>index.php/account/forgot" style="color:rgb(127,0,191);">password</a>?
                    </span>

                </li>
                <li>
                    <input id="remember_credentials" name="remember_credentials" type="checkbox">
                    <label for="remember_credentials" style="width: 200px;">Remember Email and password</label>

                </li>
                <li class="buttons">
                    <button type="submit" id="btn_login" class="send">LOGIN</button>
                    <div id="login_preloader"></div>
                    <div class="clr"></div>
                </li>

                <li>
                    <div class="or_separator">OR</div>
                    <button id="signin_fb_btn"></button>
                    <div id="fb_signin_preloader"></div>
                </li>

                <li>
                    <span style="padding-left:40px;">
                        Not registered yet?  <a href="<?php echo base_url(); ?>index.php/account/register_ssl" style="color:rgb(127,0,191);">Create your account</a>
                    </span>
                </li>

            </ol>
        </form>

    </div>
    <div class="clr"></div>
</div>
<!-- /content -->

<div id="fb_signin_merge" class="header_resize2" style="display: none; width: 400px; height: 600px; margin: auto; text-align: center;">
    <div class="now_page_resize">
        <div class="form_title">LINK YOUR ACCOUNT</div>
        <div class="clr"></div>
        <div class="registration_subtitle">The email (<span class="pl_email"></span>) from your Facebook account already has an associated 1Spot account. Would you like to link the two?</div>
    </div>

    <div  style="position: relative; padding: 20px 0;">
        <img src="data:image/png;base64,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" style="top: 20%; width: 16%; left: 42%; position: absolute; border-radius: 50%; padding: 1%; border: 2px solid #ccc; box-sizing: border-box;">
        <div style="box-sizing: border-box; width: 50%; padding: 10px; float:left">
            <div style="background-color: #fafafa; padding: 15px">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHMAcwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EAC8QAAICAAQEBAQHAQAAAAAAAAABAgMEBRExEiEiUUFSYYEycYKRFCNCobHB0RP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APpgANMgAAAEinB3WtaQ4Y+aS5BUcFvXltMV1uU389D0eX4Z/o0+pjRSAs7srWjdM3r2kV9lcq5OM1o14AaAAIAAAAAAAAAACbldKsvcpLlBa+5cFbk+1r9UWRKsAARQi5hh1dS2l1w5r/CUAOaBvbFRtnFbKTRoaZAAAAAAAAAABZ5Ptb7FkQcrplXBzk1pYk0uxOJWgAEA8cXJxw1kovRqPJo9jyxVbtonXFpOS3YFA+b58zBmScZOL3T0Zg0yAAAAAAAAAAC8y6fHhYd49L9iSU+W4iVdqq5cM39mXBloAAAxJqMW3slqZIOaXyrrVcdOvVP5AVU5cU5Se7bZqAaZAAAAAAAAAABmLcZKS3T1R0GHtjfVGyPjuuzOeLrLFphI+rb/AHJViWACKFHmFyuxLcX0x6UXhzty4brF2k0WJWgAKgAAAAAAAAAS8PgLrtHL8uPd7/YCLFOTUYptvZI6Civ/AJUwh5Y6GmHwtVHOEdZeZ7nuS1oABAKXMqnXiXLTpnzRdGllcLIuM4qSfgwOdBZYjLHzlRL6ZP8Asr5wnXLhnFxl2aNMtQAAAAA98NhbMQ+laR8ZPYzg6PxFyi/hXOReRjGEVGKSS2SFqo+HwdVHNLil5mSQDKgAAAAAAABpbVC2PDZFSXqbgCpxOXShrKhuS8r3RBOkK7NMMnF3wWjXxeqLqYqwAVFnk6XBa/HVfwWQBK1AAEAAAAAAAAAAADS9J02J7OLMADngAaZf/9k=" height="96px" style="border-radius: 50%;">
                <p class="fb_name"></p>
            </div>
        </div>

        <div style="box-sizing: border-box; width: 50%; padding: 10px; float:left">
            <div style="background-color: #fafafa; padding: 15px">
                <img src="http://localhost/uvod-portal/assets/theme/rjr/images/tvj_logo.png">
                <p class="pl_name"></p>
            </div>
        </div>

        <div class="clr"></div>
    </div>

    <button id="btn_sign_up_merge" class="send common_btn" style="display: block; margin: auto; width: 200px; float: initial">LINK ACCOUNTS</button>
    <div id="fb_signin_merge_preloader"></div>

    <div class="clr"></div>
</div>