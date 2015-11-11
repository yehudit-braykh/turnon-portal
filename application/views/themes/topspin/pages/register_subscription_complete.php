<script type="text/javascript">

    $(function () {

        _gaq.push(['_trackEvent', 'Registration', 'Register complete']);
        
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
<div class="content_centered">
    <div class="now_page_resize">
        <div class="form_title">Your payment was accepted succesfully!</div>
        <div class="form_subtitle">You can now enjoy all our exclusive content.</div>
        <div class="clr"></div>
    </div>
    <?php
    if (isset($_SESSION['registration_data']->method) && $_SESSION['registration_data']->method == 'email') {
        ?>
        <div class="now_page_resize">
            <div class="form_title">Please check your email <br class="rwd-break"> for a link to complete <br class="rwd-break"> your registration</div>
            <!--<div class="form_subtitle">Thanks for registering with us.</div>-->
            <div class="clr"></div>
            <div class="form_title_hint">The activation email may <br class="rwd-break"> take 1 hour to arrive</div>
            <div class="clr"></div>
        </div>

        <div class="wrapper_form_subtitle">
            <div class="form_subtitle"><a href="<?php echo base_url() . "index.php/static_content/faqs"; ?>">I have not received an email. What do I do?</a></div>
            <input type='image' id="send_activation_email_register_button" class="send" src="<?php echo asset_url(); ?>images/button_resend_activation_email.png"/>
            <div id="send_activation_email_preloader"></div>
            <div class="clr"></div>

            <!--    <div class="form_buttons_centered">
                  <input type="image" name="imageField" id="imageField" src="<?php //echo asset_url();    ?>images/button_login.png" class="send" onclick="window.location.href='<?php echo base_url(); ?>index.php/account/signin' " />
                </div>-->
        </div>
    <?php } ?>
</div>

<!-- /content -->