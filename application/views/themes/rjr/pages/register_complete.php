<script type="text/javascript">

    $(function () {

        _gaq.push(['_trackEvent', 'Registration', 'Register complete']);
        
        function show_info (data) {
            
            $("#info").html("* " + data.message);
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {}});
        }
        
        $('#send_activation_email_register_button').click (function () {
            
            $.ajax ({
                url: '<?php echo base_url(); ?>index.php/account/send_activation_email_register',
                type: 'POST',
                dataType: 'json',
            }).done (function (data) {
                if (data.status == 'ok') {
                    
                    $('#send_activation_email_register').hide();
                    show_info(data);
                    
                } else if (data.status == 'error'){
                    
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
      <div class="form_title">Please check your email <br class="rwd-break"> for a link to complete <br class="rwd-break"> your registration</div>
    <!--<div class="form_subtitle">Thanks for registering with us.</div>-->
      <div class="clr"></div>
      <div class="form_title_hint">The activation email may <br class="rwd-break"> take 1 hour to arrive</div>
      <div class="clr"></div>
  </div>

  <div class="wrapper_form_subtitle">
      <div class="form_subtitle"><a href="<?php echo base_url()."index.php/static_content/faqs"; ?>">I have not received an email. What do I do?</a></div>
      <li> 
        <span id="info" class="form_info" style="width:265px;display:block;margin-left:auto;margin-right:auto;"></span>
      </li>
      <div id="send_activation_email_register" class="send_activation_email">
            <p><a id="send_activation_email_register_button" class="send_activation_email_button">Resend Email</a></p>
      </div>
<!--    <div class="form_buttons_centered">
      <input type="image" name="imageField" id="imageField" src="<?php //echo asset_url(); ?>images/button_login.png" class="send" onclick="window.location.href='<?php echo base_url(); ?>index.php/account/signin' " />
    </div>-->
  </div>
</div>
<!-- /content -->