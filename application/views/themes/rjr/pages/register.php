<div id="fb-root"></div>
<script>

    _gaq.push(['_trackEvent', 'Registration', 'Login Information']);
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

//HANDLERS
        $('#btn_sign_up').on('click', function (event) {

            event.preventDefault();
            
            if (!($("#accept_terms_and_conditions").prop("checked"))) {
                show_info();
                $("#info").html("* You must accept terms and conditions before click Register button");
                return false;
            }
            
            $(this).hide();
            var user_name = $('#full_name').val();
            var full_name = user_name.split(" ");
            $('#info').css("text-align", "start");

            if (full_name.length == 1) { // fullname only contains first name
                show_info();
                $("#info").html("* You must specify first & last name");
                $('#btn_sign_up').show();
                return false;
            }

            $(this).hide();
            $('#registration_preloader').html('Sending data...');
            $('#registration_preloader').show();


            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/register_step1_ssl",
                type: 'POST',
                dataType: 'json',
                data: $('#registerform').serialize() + '&country=' + country_code
            }).done(function (data) {

                if (data.message == 'ok') {
                    window.location.href = "<?php echo base_url(); ?>index.php/account/register_payment_ssl";

                } else {
                    $('#registration_preloader').hide();
                    $('#btn_sign_up').show();
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

        $('#signup_fb_btn').on('click', function () {
            registerWithFacebook();
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




    function registerWithFacebook() {

        FB.login(function (response) {
            if (response.authResponse) {

                checkLoginState()
            } else {
                show_info('You must accept the permissions to register with Facebook');
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
            $('#fb_registration_preloader').html('Sending data...');
            $('#fb_registration_preloader').css('display', 'block');
            TweenLite.fromTo("#signup_fb_btn", 1, {alpha: 1}, {alpha: 0, onComplete: function () {

                }});


            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/register_by_facebook",
                type: 'POST',
                dataType: 'json',
                data: 'country=' + country_code,
            }).done(function (data) {

                if (data.status == 'ok') {
                    window.location.href = "<?php echo base_url(); ?>index.php/account/register_payment_ssl";

                } else {

                    $('#fb_registration_preloader').css('display', 'none');
                    TweenLite.fromTo("#signup_fb_btn", 1, {alpha: 0}, {alpha: 1, onComplete: function () {


                        }});

                    $("#fb_info").html("* " + data.message);
                    TweenLite.fromTo("#fb_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {

                        }});

                }
            });
        } else if (response.status === 'not_authorized') {
            registerWithFacebook();

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
                        <input id="full_name" name="full_name" class="text"/>
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
                    <li id= "terms_and_conditions">
                        <div style="display: inline-block;"><input id="accept_terms_and_conditions" type="checkbox" /></div>   
                        <div style="display: inline-block;">Accept <a href="<?php echo base_url() . 'index.php/static_content/terms_conditions'; ?>" target="_blank" class="terms_and_conditions">Terms and Conditions</a>*</div></li>
                    <li> 
                    <li class="buttons">
                        <button id="btn_sign_up" class="send common_btn">REGISTER</button>
                        <div id="registration_preloader"></div>
                        <div class="clr"></div>
                    </li>
                </ol>
            </form>
            <!--            <div id="fb_container">
                            <div id="fb_registration_preloader"></div>
                            <button id="signup_fb_btn"></button>
            
                            <p id="fb_info" class="form_info">&nbsp;</p>
                        </div>-->
        </div>
    </div>
</div>
<!-- /content -->