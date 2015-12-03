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
                    if(data.canMerge){
                        $('#fb_registration_form').css('display', 'none');
                        
                        var mergeForm = $('#fb_registration_merge').css('display', 'block');
                        mergeForm.find('.pl_email').text(data.merginProfiles.email);
                        mergeForm.find('.pl_name').text(data.merginProfiles.plName);
                        mergeForm.find('.fb_name').text(data.merginProfiles.fbName);

                        TweenLite.fromTo("#fb_registration_merge", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        }});

                    }else{
                        TweenLite.fromTo("#signup_fb_btn", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        }});

                        $("#fb_info").html("* " + data.message);
                        TweenLite.fromTo("#fb_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        }});
                    }
                }
            });
        } else if (response.status === 'not_authorized') {
            registerWithFacebook();

        } else {

        }
    }

    function show_info(data) {
        $(".form_info").html("* " + data);
        TweenLite.fromTo(".form_info", 1, {alpha: 0}, {alpha: 1});
    }

    //To merge 1Spot account with Facebook account
    function mergeAccounts() {
        var password = $('#fb_registration_merge [type=password]').val();

        if(password){

            $('#fb_registration_merge').css('display', 'none');

            $('#fb_registration_preloader').html('Sending data...');
            $('#fb_registration_preloader').css('display', 'block');

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/register_by_facebook",
                type: 'POST',
                dataType: 'json',
                data: ['country=' + country_code, 'fb_merge_accounts=true', 'password=' + password].join('&'),
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
        }else{
            show_info('Current password is required');
        }
    } //end merge accounts

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

            <div id="fb_container">

                <div id="fb_registration_preloader"></div>
                
                <div id="fb_registration_form">
                    <button id="signup_fb_btn"></button>
                </div>

                <div id="fb_registration_merge" style="display: none;">
                    <div style="padding: 0 10px;">
                        <div class="registration_title">LINK YOUR ACCOUNT</div>
                        <div class="registration_subtitle">The email (<span class="pl_email"></span>) from your Facebook account already has an associated 1Spot account. Would you like to link the two?</div>
                    </div>
                    <p class="form_info">&nbsp;</p>
                    <div  style="position: relative;">
                        <img src="data:image/png;base64,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" style="top: 20%; width: 16%; left: 42%; position: absolute; border-radius: 50%; padding: 1%; border: 2px solid #ccc; box-sizing: border-box;">
                        <div style="box-sizing: border-box; width: 50%; padding: 10px; float:left">
                            <div style="background-color: #fafafa; padding: 15px">
                                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHMAcwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EAC8QAAICAAQEBAQHAQAAAAAAAAABAgMEBRExEiEiUUFSYYEycYKRFCNCobHB0RP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APpgANMgAAAEinB3WtaQ4Y+aS5BUcFvXltMV1uU389D0eX4Z/o0+pjRSAs7srWjdM3r2kV9lcq5OM1o14AaAAIAAAAAAAAAACbldKsvcpLlBa+5cFbk+1r9UWRKsAARQi5hh1dS2l1w5r/CUAOaBvbFRtnFbKTRoaZAAAAAAAAAABZ5Ptb7FkQcrplXBzk1pYk0uxOJWgAEA8cXJxw1kovRqPJo9jyxVbtonXFpOS3YFA+b58zBmScZOL3T0Zg0yAAAAAAAAAAC8y6fHhYd49L9iSU+W4iVdqq5cM39mXBloAAAxJqMW3slqZIOaXyrrVcdOvVP5AVU5cU5Se7bZqAaZAAAAAAAAAABmLcZKS3T1R0GHtjfVGyPjuuzOeLrLFphI+rb/AHJViWACKFHmFyuxLcX0x6UXhzty4brF2k0WJWgAKgAAAAAAAAAS8PgLrtHL8uPd7/YCLFOTUYptvZI6Civ/AJUwh5Y6GmHwtVHOEdZeZ7nuS1oABAKXMqnXiXLTpnzRdGllcLIuM4qSfgwOdBZYjLHzlRL6ZP8Asr5wnXLhnFxl2aNMtQAAAAA98NhbMQ+laR8ZPYzg6PxFyi/hXOReRjGEVGKSS2SFqo+HwdVHNLil5mSQDKgAAAAAAABpbVC2PDZFSXqbgCpxOXShrKhuS8r3RBOkK7NMMnF3wWjXxeqLqYqwAVFnk6XBa/HVfwWQBK1AAEAAAAAAAAAAADS9J02J7OLMADngAaZf/9k=" height="96px" style="border-radius: 50%;">
                                <p class="fb_name"></p>
                            </div>
                        </div>

                        <div style="box-sizing: border-box; width: 50%; padding: 10px; float:left">
                            <div style="background-color: #fafafa; padding: 15px">
                                <img src="<?php echo base_url(); ?>/assets/theme/rjr/images/tvj_logo.png">
                                <p class="pl_name"></p>
                            </div>
                        </div>
                        
                        <div style="clear: both;"></div>

                        <div>
                            <label for="password">Password</label><br>
                            <input id="password" name="password" class="text" type="password" />
                        </div>
                    </div>

                    <button id="btn_sign_up_merge" class="send common_btn" style="display: block; margin: auto; width: 200px; float: initial">LINK ACCOUNTS</button>
                </div>
            </div>

        </div>
    </div>
</div>
<!-- /content -->
