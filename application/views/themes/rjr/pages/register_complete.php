<script type="text/javascript">

    $(function () {

        _gaq.push(['_trackEvent', 'Registration', 'Register complete']);

        function show_info(data) {

            $("#info").html("* " + data.message);
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                }});
        }

        $('#send_activation_email_register_button').click(function () {

            event.preventDefault();
            $(this).hide();
            $('#send_activation_email_preloader').show();
            $('#send_activation_email_preloader').html('Sending activation email...');

            $.ajax({
                url: '<?php echo base_url(); ?>index.php/account/send_activation_email_register',
                type: 'POST',
                dataType: 'json',
            }).done(function (data) {
                if (data.status == 'ok') {

                    $('#send_activation_email_preloader').hide();
                    $('#send_activation_email_register_button').hide();
                    show_info(data);

                } else if (data.status == 'error') {

                    $('#send_activation_email_preloader').hide();
                    $('#send_activation_email_register_button').show();
                    show_info(data);
                }
                else {
                    window.location.href = '<?php echo base_url(); ?>' + 'index.php/account/signin';
                }
            });

        });

    });
</script>
</div>
</div>
</div>

<!-- content -->
<div class="content_centered" style="height: 400px;">
    <?php

    if (isset($_SESSION['registration_data']->method) && $_SESSION['registration_data']->method === 'email') {
        ?>  
        <div class="now_page_resize">
            <div class="form_title">Your Registration is Complete!</div><br>
            <div class="form_title">Please check your email <br class="rwd-break"> for an activation link to complete <br class="rwd-break"> your registration</div>
            <!--<div class="form_subtitle">Thanks for registering with us.</div>-->
            <div class="clr"></div>
            <div class="form_title_hint">The activation email may <br class="rwd-break"> take up to 1 hour to arrive </div>
            <div class="clr"></div>
        </div>

        <div class="wrapper_form_subtitle">
            <div class="form_subtitle"><a href="<?php echo base_url() . "index.php/static_content/faqs"; ?>">I have not received the activation email, what can I do?</a></div>
            <li> 
                <span id="info" class="form_info" style="width:265px;display:block;margin-left:auto;margin-right:auto;"></span>
            </li>
<!--            <li class="buttons" style="width: 200px;margin: 10px auto;">
                <input type='image' id="send_activation_email_register_button" class="send" src="<?php //echo asset_url(); ?>images/button_resend_activation_email.png"/>
                <div id="send_activation_email_preloader"></div>
                <div class="clr"></div>
            </li>-->
        </div>
        <?php
    } else {
        ?>
        <div class="now_page_resize">

            <div class="form_title">The registration process is complete.</div>
             <div class="clr"></div>
             <div class="form_title_hint">Login with your facebook account <br class="rwd-break"> clicking <a href="<?php echo base_url().'index.php/account/signin';?>">here</a> and start enjoying 1spotmedia services!" </div>
            <div class="clr"></div>
            <br>
        </div>
        <?php
    }
    ?>
</div>
<!-- /content -->