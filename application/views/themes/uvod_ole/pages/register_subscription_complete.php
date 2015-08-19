<script type="text/javascript">

    $(function () {

        _gaq.push(['_trackEvent', 'Registration', 'Register complete']);

    });
</script>
</div>
</div>
</div>

<!-- content -->
<div class="content_centered">
    <div class="now_page_resize">
        <div class="complete_title">Your payment was accepted succesfully!</div>
       
    <?php
    if (isset($_SESSION['registration_data']->method) && $_SESSION['registration_data']->method == 'email') {
        ?>
         <div class="clr"></div>
    </div>
        

        <div class="now_page_resize">
            <div class="complete_title">Please check your email for an activation link <br class="rwd-break"> to complete your registration</div>
            <!--<div class="form_subtitle">Thanks for registering with us.</div>-->
            <div class="clr"></div>
            <div class="form_title_hint">(The activation email may take up to 1 hour to arrive) </div>
            <div class="clr"></div>
        </div>

        <div class="wrapper_form_subtitle">
            <div class="form_subtitle">You has not received the activation email?</div>
            <li> 
                <span id="info" class="form_info" style="width:265px;display:block;margin-left:auto;margin-right:auto;"></span>
            </li>
            <li class="buttons" style="width: 320px;margin: 5px auto;">


                <button type="submit" id="send_activation_email_register_button" class="send">RESEND ACTIVATION EMAIL</button>

                <div id="send_activation_email_preloader"></div>
                <div class="clr"></div>
            </li>
        </div>








        <div class="now_page_resize">
            <div class="form_title">Please check your email <br class="rwd-break"> for a link to complete <br class="rwd-break"> your registration</div>
            <!--<div class="form_subtitle">Thanks for registering with us.</div>-->
            <div class="clr"></div>
            <div class="form_title_hint">The activation email may <br class="rwd-break"> take 1 hour to arrive</div>
            <div class="clr"></div>
        </div>

        <div class="wrapper_form_subtitle">
            <div class="form_subtitle"><a href="<?php echo base_url() . "index.php/static_content/faqs"; ?>">I have not received an email. What do I do?</a></div>
            <!--    <div class="form_buttons_centered">
                  <input type="image" name="imageField" id="imageField" src="<?php //echo asset_url();   ?>images/button_login.png" class="send" onclick="window.location.href='<?php echo base_url(); ?>index.php/account/signin' " />
                </div>-->
        </div>

    <?php }else{
        ?>
         <div class="form_subtitle">You can now enjoy all our exclusive content.</div>
         <div class="clr"></div>
    </div>
    <?php
    } 
    ?>
</div>

<!-- /content -->