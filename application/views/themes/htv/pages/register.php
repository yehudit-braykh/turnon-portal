<script type="text/javascript">

  $(function () {

    $('#btn_next').on('click', function(event) {
      event.preventDefault();

      $.ajax({
        url: "<?php echo base_url(); ?>index.php/account/register_step1",
        type: 'POST',
        dataType: 'json',
        data: $('#registerform').serialize()
      }).done(function(data) {

        if (data.message == 'ok') {
          window.location.href = "<?php echo base_url(); ?>index.php/account/register_info";

        } else {

          TweenLite.fromTo("#info", 1, {alpha:0}, {alpha:1, onComplete: function() {
            TweenLite.to("#info", 1, {delay:6, alpha:0});
          }});
          $("#info").html("* " + data.message);

        }
      });
    });
  });
</script>

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
            <div class="form_notes">Password should have between 8 and 16 characters.</div>
          </li>
          <li>
            <label for="confirm">Confirm Password*</label>
            <input id="confirm" name="confirm" class="text" type="password"/>
          </li>
          <li> 
            <p id="info" class="form_info">&nbsp;</p>
          </li>
          <li class="buttons">
            <input type="image" id="btn_next" src="<?php echo asset_url(); ?>images/button_next.png" class="send" />
            <div class="clr"></div>
          </li>
        </ol>
      </form>              
    </div>
  </div>
</div>
<!-- /content -->