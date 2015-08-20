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
<div class="container">
    <div class="uvod_container">

    <?php
    if (isset($_SESSION['registration_data']->method) && $_SESSION['registration_data']->method == 'email') {
        ?>  
        
        <div class="complete_title">Please check your email for an activation link <br class="rwd-break"> to complete your registration</div>
        <div class="clr"></div>
        <div class="form_title_hint">(The activation email may take up to 1 hour to arrive) </div>
        <div class="clr"></div>
       
        <div class="form_subtitle">You has not received the activation email?</div>
        <li> 
            <span id="info" class="form_info" style="width:265px;display:block;margin-left:auto;margin-right:auto;"></span>
        </li>
        <li class="form_buttons_centered">


            <button type="submit" id="send_activation_email_register_button" class="send">RESEND ACTIVATION EMAIL</button>

            <div id="send_activation_email_preloader"></div>
            <div class="clr"></div>
        </li>
        
        <?php
    } else {
        ?>
            <div class="complete_title">The registration process is complete.</div>
            <div class="form_subtitle">Login with your facebook account and start enjoying our services!</div>
            <div class="complete_btn"> <button type="submit" id="btn_redirect_login" class="send">LOG IN</button></div>

        <?php
    }
    ?>

    </div>
</div>
<!-- /content -->