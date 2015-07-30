
<script>

    _gaq.push(['_trackEvent', 'Registration', 'Login Information']);

    $(document).ready(function () {
        $('#signup_fb_btn').on('click', function () {
            logInWithFacebook();
        });
    });

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1623813711226372',
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

//HANDLERS
    $('#btn_sing_up').on('click', function (event) {
        event.preventDefault();

        $(this).hide();
        $('#registration_preloader').html('Sending data...');
        $('#registration_preloader').show();

        $.ajax({
            url: "<?php echo base_url(); ?>index.php/account/register_step1_ssl",
            type: 'POST',
            dataType: 'json',
            data: $('#registerform').serialize()
        }).done(function (data) {

            if (data.message == 'ok') {
                window.location.href = "<?php echo base_url(); ?>index.php/account/register_info_ssl";

            } else {
                $('#registration_preloader').hide();
                $('#btn_sing_up').show();
                TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                    }});
                $("#info").html("* " + data.message);

            }
        });
    });

    function logInWithFacebook() {
        FB.login(function (response) {
            if (response.authResponse) {

                checkLoginState()
            } else {
                alert('User cancelled login or did not fully authorize.');
            }
        },
                {
                    scope: 'email,public_profile'
                });
        return false;
    }
    ;

    function checkLoginState() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    }


    function statusChangeCallback(response) {

        if (response.status === 'connected') {

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/register_by_facebook",
                type: 'POST',
                dataType: 'json',
            }).done(function (data) {
                console.log('login: ', data);
            });
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.

        } else {

        }
    }







</script>
</div>
</div>
</div>

<!-- content -->
<div class="content_centered">
    <div class="registration_content">

        <div class="registration_title">REGISTER</div>
        <div class="registration_subtitle">Enter your login information</div>

        <div class="registration_container">

            <form method="post" id="registerform">
                <ol>
                    <li>
                        <label for="first_name">Full Name*</label>
                        <input id="first_name" name="full_name" class="text"/>
                    </li>
                    <li>
                        <label for="email">Email*</label>
                        <input id="email" name="email" class="text" />
                    </li>
                    <li> 
                        <div class="form_notes">You will use this email address to login.</div>
                    </li>
                    <li>
                        <label for="password">Password*</label>
                        <input id="password" name="password" class="text" type="password" />
                    </li>
                    <li> 
                        <div class="form_notes">Password should have <br class="rwd-break"> between 8 and 16 characters.</div>
                    </li>

                    <li> 
                        <p id="info" class="form_info">&nbsp;</p>
                    </li>
                    <li class="buttons">
                        <button id="btn_sing_up" class="send common_btn">SIGN UP</button>
                        <div id="registration_preloader"></div>
                        <div class="clr"></div>
                    </li>
                </ol>
            </form>
            <div id="fb_container">
                <button id="signup_fb_btn"></button>
            </div>
            <!--            <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
                        </fb:login-button>-->

        </div>
    </div>
</div>
<!-- /content -->