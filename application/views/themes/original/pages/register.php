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
            <div class="now_page_resize">
              <h1 style="color:rgb(233,50,50); text-align: left;">Register<br /><span>Enter your login information</span></h1>
              <div class="clr"></div>
            </div>

            <div class="clr"></div>
            <div style="">
              <form method="post" id="registerform" style="width:450px;height:600px;">
                <ol>
                  <li>
                    <label for="email">Email*</label>
                    <input id="email" name="email" class="text" />
                  </li>
                  <li> 
                    <span style="margin-left:120px;">You will use this email address to login.</span>
                  </li>
                  <li>
                    <label for="password">Password*</label>
                    <input id="password" name="password" class="text" type="password" />
                  </li>
                  <li> 
                    <span style="margin-left:120px;">Password should have between 8 and 16 characters.</span>
                  </li>
                  <li>
                    <label for="confirm">Confirm Password*</label>
                    <input id="confirm" name="confirm" class="text" type="password"/>
                  </li>
                  <li> 
                    <p id="info" style="color:#fff;text-align:center;margin-left:120px;">&nbsp;</p>
                  </li>
                  <li class="buttons">
                    <input type="image" id="btn_next" src="<?php echo base_url(); ?>/assets/images/button_next.png" class="send" />
                    <div class="clr"></div>
                  </li>
                </ol>
              </form>              
            </div>
            <div class="clr"></div>
          </div>
          <!-- /content -->