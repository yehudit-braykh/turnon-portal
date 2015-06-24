<script type="text/javascript">

  $(function () {

    $('#btn_save').on('click', function(event) {
      event.preventDefault();

      $.ajax({
        url: "<?php echo base_url(); ?>index.php/account/my_account_save",
        type: 'POST',
        dataType: 'json',
        data: $('#registerform').serialize()
      }).done(function(data) {
          TweenLite.fromTo("#info", 1, {alpha:0}, {alpha:1, onComplete: function() {
            TweenLite.to("#info", 1, {delay:6, alpha:0});
          }});

          if (data.message == "ok") {
            $("#info").html("Information saved succesfully.");
          } else {
            $("#info").html("* " + data.message);
          }
      });

    });

    $('#btn_logout').on('click', function(event) {
      event.preventDefault();
      $("#registerform").attr("action", "<?php echo base_url(); ?>index.php/account/logout");
      $("#registerform").submit();
    });

  });

</script>
            <div class="now_page_resize">
              <h1 style="color:rgb(233,50,50); text-align: left;">My Account<br /><span>Update your personal information</span></h1>
              <div class="clr"></div>
            </div>

            <div class="clr"></div>
            <div style="">
              <form id="registerform" method="post" style="width:400px;height:600px;">
                <ol>
                  <li>
                    <label for="first_name">First Name*</label>
                    <input id="first_name" name="first_name" class="text" value="<?php echo $user_first_name; ?>" />
                  </li>
                  <li>
                    <label for="last_name">Last Name*</label>
                    <input id="last_name" name="last_name" class="text" value="<?php echo $user_last_name; ?>" />
                  </li>
                  <li>
                    <label for="city">City</label>
                    <input id="city" name="city" class="text" value="<?php echo $user_city; ?>" />
                  </li>
                  <li>
                    <label for="country">Country*</label>
                    <select id="country" name="country" class="text" style="width:238px;">
                      <option value="default" disabled="disabled" selected="selected">Select your country</option>
                      <?php 
                        echo html_combo_country($user_country);
                      ?>
                    </select>
                  </li>
                  <li>
                    <label for="postal_code">Postal Code</label>
                    <input id="postal_code" name="postal_code" class="text" value="<?php echo $user_postal_code; ?>" />
                  </li>
                  <li> 
                    <p id="info" style="color:#fff;text-align:center;margin-left:120px;">&nbsp;</p>
                  </li>
                  <li class="buttons">
                    <input type="image" id="btn_save" src="<?php echo base_url(); ?>/assets/images/button_save.png" class="send" />
                    <input type="image" id="btn_logout" src="<?php echo base_url(); ?>/assets/images/button_logout.png" class="send" style="margin-left:10px;" />
                    <div class="clr"></div>
                  </li>
                </ol>
              </form>              
            </div>
            <div class="clr"></div>
          </div>
          <!-- /content -->