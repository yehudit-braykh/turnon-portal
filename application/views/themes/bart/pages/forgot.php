  <script type="text/javascript">

  $(function () {

    $('#imageField').on('click', function(event) {
      event.preventDefault();
	
      $.ajax({
        url: "<?php echo base_url(); ?>index.php/account/forgot_step1",
        type: 'POST',
        dataType: 'json',
        data: $('#loginform').serialize()
      }).done(function(data) {
        if (data.message == 'ok') {
		  window.location.href = "<?php echo base_url(); ?>index.php/account/forgot_complete";
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

<!-- content -->

          </div>
          </div>
          
          <div class="container-fluid form_cont">
            
              <div class="clr"></div>

              <form  method="post" id="loginform">
                <div class="form_title">Forgot password</div>
                <ol>

                  <li>
                     <div id="info" class="form_info"></div>
                  </li>
                  <li>
                    <input id="email" name="email" placeholder="Enter your Email to recover your password" class="text" />
                  </li>
                  <li class="buttons">
                    <button type="submit" name="imageField" id="imageField" class="send">SEND</button>
                    <div class="clr"></div>
                    <span id="info" class="form_info">&nbsp;</span>
                  </li>
                </ol>

              </form>              
                
              <div class="clr"></div>

          </div>

<!-- /content -->