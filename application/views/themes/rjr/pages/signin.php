<script type="text/javascript">

    $(function () {

        var width = $(window).width();
        //var height = $(window).height();
        if (width >= 320 && width < 768) {
            $('#top_menu_about').remove();
            $('#top_menu_support').remove();
            $('#search').remove();
            $('#header_sep').remove();
        }
        
        function show_info (data) {
            
            $("#info").html("* " + data.message);
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {}});
        }
        
        $('#send_activation_email_login').hide();
        
        $('#send_activation_email_login_button').click (function () {
            
            $.ajax ({
                url: '<?php echo base_url(); ?>index.php/account/send_activation_email_login',
                type: 'POST',
                dataType: 'json',
                data:'email=' + $('#email').val()
            }).done (function (data) {
                
                if (data.status == 'ok') {
                    
                    $('#send_activation_email_login').hide();
                    show_info(data);
                } else {
                    show_info(data);     
                }
            });
            
        });

        $('#btn_login').on('click', function (event) {

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
                    $('#btn_login').show();
                    $('#send_activation_email_login').show();
                    show_info (data);
                }
                else {
                    $('#login_preloader').hide();
                    $('#btn_login').show();
                    show_info(data)              
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

    });

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
        <form method="post" id="loginform" style="width:350px;display:block;margin-left:auto;margin-right:auto;">
            <ol>
                <li> 
                    <span id="info" class="form_info"></span>
                </li>
                <li>
                    <div id="send_activation_email_login" class="send_activation_email">
                        <p><a id="send_activation_email_login_button" class="send_activation_email_button">Resend Email</a></p>
                    </div>
                </li>    
                <li>
                    <label for="email">Email</label>
                    <input id="email" name="email" class="text"/>
                </li>
                <li>
                    <label for="password">Password</label>
                    <input id="password" name="password" class="text" type="password" />
                </li>
                <li style="width: 500px;">
                    <input id="remember_credentials" name="remember_credentials" class="text" type="checkbox" style="width: 30px;">
                    <label for="remember_credentials" style="width: 200px;">Remember Email and password</label>

                </li>
                <li class="buttons">
                    <input type="image" id="btn_login" src="<?php echo asset_url(); ?>images/button_login.png" class="send" />
                    <div id="login_preloader"></div>
                    <div class="clr"></div>
                </li>
                <li>
                    <span style="padding-left:60px;">
                        Forgot your <a href="<?php echo base_url(); ?>index.php/account/forgot" style="color:rgb(127,0,191);">password</a>?
                    </span>
                </li>
                <li>
                    <span style="padding-left:60px;">
                        Not registered yet?
                    </span>
                </li>
                <li>
                    <span style="padding-left:60px;">
                        <a href="<?php echo base_url(); ?>index.php/account/register_ssl" style="color:rgb(127,0,191);">Create your account</a>
                    </span>
                </li>
            </ol>
        </form>              
    </div>
    <div class="clr"></div>
</div>
<!-- /content -->