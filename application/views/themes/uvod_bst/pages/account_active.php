            </div>
          </div>

<!-- content -->

          <div class="container-fluid form_cont">

              <div class="complete_title <?php if ($status == "error"){?>error<?php } ?>" ><?php echo $message1; ?></div>
              <div class="form_subtitle"><?php echo $message2; ?><br class="rwd-break <?php if ($status == "error"){?>error<?php } ?>"><?php echo ' '.$message3; ?></div>

              <div class="clr"></div>

                <?php if ($status == "ok"){?>
                <div class="form_buttons_centered">
                  <button type="submit" name="imageField" id="btn_redirect_login" class="send btn btn-primary btn-md" onclick="window.location.href='<?php echo base_url(); ?>index.php/account/signin' ">LOGIN</button>
                </div>
                <?php } ?>

              <div class="clr"></div>

          </div>

<!-- /content -->