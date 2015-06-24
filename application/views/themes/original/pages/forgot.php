            <div class="now_page_resize">
              <h1 style="color:rgb(233,50,50); text-align: left;">Forgot your password<br /><span>Enter your information to recover your password</span></h1>
              <div class="clr"></div>
            </div>

            <div class="clr"></div>
            <div style="">
              <form action="<?php echo base_url(); ?>index.php/account/forgot_complete" method="post" id="registerform" style="width:400px;height:600px;">
                <ol>
                  <li>
                    <label for="email">Email*</label>
                    <input id="email" name="email" class="text" />
                  </li>

                  <li class="buttons">
                    <input type="image" name="imageField" id="imageField" src="<?php echo base_url(); ?>/assets/images/button_send.png" class="send" />
                    <div class="clr"></div>
                  </li>
                </ol>
              </form>              
            </div>
            <div class="clr"></div>
          </div>
          <!-- /content -->