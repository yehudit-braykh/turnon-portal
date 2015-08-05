<div id="fb-root"></div>
<script>

    $(document).ready(function () {
        //FB LOGIN

        $('#sigin_fb_btn').on('click', function () {
            checkLoginState();
        });

        var width = $(window).width();
        //var height = $(window).height();
        if (width >= 320 && width < 768) {
            $('#top_menu_about').remove();
            $('#top_menu_support').remove();
            $('#search').remove();
            $('#header_sep').remove();
        }

        $('#send_activation_email_login_button').hide();
        $('#send_activation_email_login_button').click(function () {

            event.preventDefault();
            $(this).hide();
            $('#send_activation_email_preloader').show();
            $('#send_activation_email_preloader').html('Sending activation email...');

            $.ajax({
                url: '<?php echo base_url();?>index.php/account/send_activation_email_login',
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



 $('#btn_login').on('click', function (event) {

        event.preventDefault();
        $(this).hide();
        $('#login_preloader').show();
        $('#login_preloader').html('Login...');

        $.ajax({
            url: '<?php echo base_url();  ?>index.php/account/login',
            type: 'POST',
            dataType: 'json',
            data: $('#loginform').serialize()
        }).done(function (data) {
            if (data.message == 'ok') {
                window.location.href = '<?php echo base_url();?>';
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

    });


    });


    window.fbAsyncInit = function () {
        FB.init({
            appId: '1623813711226372',
            cookie: true, // enable cookies to allow the server to access  // the session
            version: 'v2.2',
             xfbml: true
        });

//        FB.getLoginStatus(function (response) {
//            // statusChangeCallback(response);
//            console.log('initial_status: ', response);
//        });

    };


    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));






    function sigInWithFacebook() {
        FB.login(function (response) {
            consoloe.log('login response: ', response);
            if (response.authResponse) {

                checkLoginState();
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
        console.log('llego al checking');
        FB.getLoginStatus(function (response) {
            console.log('checking response: ', response);
            statusChangeCallback(response);
        });
    }


    function statusChangeCallback(response) {

        console.log('status:', response);
        if (response.status === 'connected') {
           // $('#fb_registration_preloader').show();
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/login_by_facebook",
                type: 'POST',
                dataType: 'json'
            }).done(function (data) {
                console.log('login php: ', data);
                if (data.status == 'ok') {
                    console.log('ok el login php');
                    window.location.href = "<?php echo base_url(); ?>";
                } else {
                    $('#fb_registration_preloader').hide();
                    show_info(data.message);

                }
            });
        } else {
            sigInWithFacebook();
        }
    }




    function show_info(data) {

        $("#info").html("* " + data);
        TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
            }});
    }




</script>
</div>
</div>
<div class="header_resize2">
    <div class="now_page_resize">
        <div class="form_title">LOG IN</div>
        <div class="clr"></div>
    </div>
    <div class="clr"></div>
    <div style="width:100%;height:600px;margin: 0 auto;">
        <form method="post" id="loginform" style="width:300px;display:block;margin-left:auto;margin-right:auto;">
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

                    <button id="sigin_fb_btn"></button>
                    <div id="fb_registration_preloader"></div>

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