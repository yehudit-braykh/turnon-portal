<script type="text/javascript">

  $(function () {

    $('#btn_back').on('click', function(event) {
      event.preventDefault();
      window.location.href = "<?php echo base_url(); ?>index.php/account/register";
    });

    $('#btn_next').on('click', function(event) {
      event.preventDefault();

      $.ajax({
        url: "<?php echo base_url(); ?>index.php/account/register_step2",
        type: 'POST',
        dataType: 'json',
        data: $('#registerform').serialize()
      }).done(function(data) {

        if (data.message == 'ok') {
          window.location.href = "<?php echo base_url(); ?>index.php/account/register_payment";
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
              <h1 style="color:rgb(233,50,50); text-align: left;">Register<br /><span>Enter your personal information</span></h1>
              <div class="clr"></div>
            </div>

            <div class="clr"></div>
            <div style="">
              <form method="post" id="registerform" style="width:400px;height:600px;">
                <ol>
                  <li>
                    <label for="first_name">First Name*</label>
                    <input id="first_name" name="first_name" class="text"/>
                  </li>
                  <li>
                    <label for="last_name">Last Name*</label>
                    <input id="last_name" name="last_name" class="text"/>
                  </li>
                  <li>
                    <label for="city">City</label>
                    <input id="city" name="city" class="text"/>
                  </li>
                  <li>
                    <label for="country">Country*</label>
                    <select id="country" name="country" class="text" style="width:238px;">
                      <option value="default" disabled="disabled" selected="selected">Select your country</option>
                      <?php echo html_combo_country(); ?>
                    </select>
                  </li>
                  <li>
                    <label for="postal_code">Zip Code</label>
                    <input id="postal_code" name="postal_code" class="text" style="width:100px;"/>
                  </li>
                  <li> 
                    <p id="info" style="color:#fff;text-align:center;margin-left:120px;">&nbsp;</p>
                  </li>
                  <li class="buttons">
                    <input type="image" id="btn_back" src="<?php echo base_url(); ?>/assets/images/button_back.png" class="send" />
                    <input type="image" id="btn_next" src="<?php echo base_url(); ?>/assets/images/button_register.png" class="send" style="margin-left:10px;" />
                    <div class="clr"></div>
                  </li>
                </ol>
              </form>              
            </div>
            <div class="clr"></div>
          </div>
          <!-- /content -->