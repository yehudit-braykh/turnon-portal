<script type="text/javascript">

  $(function () {

    $('#btn_login').on('click', function(event) {

      event.preventDefault();

      $.ajax({
        url: '<?php echo base_url(); ?>index.php/account/login',
        type: 'POST',
        dataType: 'json',
        data: $('#loginform').serialize()
      }).done(function(data) {
        if (data.message == 'ok') {
          window.location.href = '<?php echo base_url(); ?>';
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
              <h1 style="color:rgb(233,50,50);">Sign In<br /></h1>
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
            <div style="width:100%;height:800px;margin: 0 auto;">
              <form action="" method="post" id="loginform" style="width:350px;display:block;margin-left:auto;margin-right:auto;">
                <ol>
                  <li> 
                    <p id="info" style="color:#fff;text-align:center;width:100%;">&nbsp;</p>
                  </li>
                  <li>
                    <label for="email">Email</label>
                    <input id="email" name="email" class="text"/>
                  </li>
                  <li>
                    <label for="password">Password</label>
                    <input id="password" name="password" class="text" type="password" />
                  </li>
                  <li class="buttons">
                    <input type="image" id="btn_login" src="<?php echo base_url(); ?>/assets/images/button_login.png" class="send" />
                    <div class="clr"></div>
                  </li>
                  <li>
                    <span style="padding-left:60px;">
                      Forgot your <a href="<?php echo base_url(); ?>index.php/account/forgot" style="color:rgb(233,50,50);">password</a>?
                    </span>
                  </li>
                  <li>
                    <span style="padding-left:60px;">
                      Not registered yet? <a href="<?php echo base_url(); ?>index.php/account/register" style="color:rgb(233,50,50);">Create your account</a>
                    </span>
                  </li>
                </ol>
              </form>              
            </div>
            <div class="clr"></div>
          </div>
          <!-- /content -->