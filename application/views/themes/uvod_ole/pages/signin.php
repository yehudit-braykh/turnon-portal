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
   
          }});
          $("#info").html("* " + data.message);

        }
      });

    });
    
    $('.text').on('click',function(){
    if($("#info").text()!=''){
      
        TweenLite.fromTo("#info", 1, {alpha:1}, {alpha:0, onComplete: function() {
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
              <div class="form_title">SIGN IN</div>
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
                    <label for="email">Email</label>
                    <input id="email" name="email" class="text"/>
                  </li>
                  <li>
                    <label for="password">Password</label>
                    <input id="password" name="password" class="text" type="password" />
                  </li>
                  <li class="buttons">
                    <input type="image" id="btn_login" src="<?php echo asset_url(); ?>images/button_login.png" class="send" />
                    <div class="clr"></div>
                  </li>
                  <li>
                    <span style="padding-left:70px;">
                      Forgot your <a href="<?php echo base_url(); ?>index.php/account/forgot" style="color:#73bdee;">password</a>?
                    </span>
                  </li>
                  <li>
                    <span style="padding-left:70px;">
                      Not registered yet? <a href="<?php echo base_url(); ?>index.php/account/register" style="color:#73bdee;">Create your account</a>
                    </span>
                  </li>
                </ol>
              </form>              
            </div>
            <div class="clr"></div>
          </div>
          <!-- /content -->