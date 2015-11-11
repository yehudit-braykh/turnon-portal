<script type="text/javascript">

    $(function () {

        $('#imageField').on('click', function (event) {
            $(this).hide();
            $('#forgot_preloader').show();
            $('#forgot_preloader').html('Sending email...');

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/forgot_step1",
                type: 'POST',
                dataType: 'json',
                data: $('#loginform').serialize()
            }).done(function (data) {
                if (data.message == 'ok') {
                    window.location.href = "<?php echo base_url(); ?>index.php/account/forgot_complete";
                } else {
                    TweenLite.fromTo("#forgot_preloader", 1, {alpha: 1}, {alpha: 0, onComplete: function () {
                            TweenLite.to("#forgot_preloader", 1, {delay: 6, alpha: 0});
                        }});
                    $('#imageField').show();
                    TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                        }});
                    $("#info").html("* " + data.message);
                }

            });
            event.preventDefault();
        });

    });
</script>
</div>
</div>
<div class="header_resize2">
    <div class="now_page_resize">
        <div class="form_title">FORGOT YOUR PASSWORD</div>
        <div class="form_subtitle">Enter your information to recover your password</div>
        <div class="clr"></div>
    </div>

    <div class="clr"></div>
    <div style="width:100%;height:600px;margin: 0 auto;">
        <form  method="post" id="loginform" style="width:350px;display:block;margin-left:auto;margin-right:auto;">
            <ol>
                <li>
                    <label for="email">Email*</label>
                    <input id="email" name="email" class="text" />
                </li>

                <li class="buttons">
                    <input type="image" name="imageField" id="imageField" src="<?php echo asset_url(); ?>images/button_send.png" class="send" />
                    <div id="forgot_preloader"></div>
                    <div class="clr"></div>
                </li>
                <li> 
                    <span id="info" class="form_info">&nbsp;</span>
                </li>
            </ol>
        </form>              
    </div>
    <div class="clr"></div>
</div>
<!-- /content -->