<script>

    $(document).on('ready', function (event) {
        event.preventDefault();
        $('#btn_sign_up_merge').on('click', mergeAccounts);
    });


    //To merge 1Spot account with Facebook account
    function mergeAccounts() {
        var password = $('#password').val();

        if (password) {

            $('#btn_sign_up_merge').css('display', 'none');
            $('#registration_preloader').html('Sending data...');
            $('#registration_preloader').css('display', 'block');

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/link_with_fb",
                type: 'POST',
                dataType: 'json',
                data: 'password=' + password
            }).done(function (data) {
                console.log("data: ", data);
                if (data.status == 'ok') {
                    window.location.href = "<?php echo base_url(); ?>";

                } else {
                    $('#registration_preloader').css('display', 'none');
                    TweenLite.fromTo("#btn_sign_up_merge", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        }});

                    show_info(data.message);
                    $('#btn_sign_up_merge').css('display', 'block');
                }
            });
        } else {
            show_info('Current password is required');
        }
    } //end merge accounts

    function show_info(data) {
        $(".form_info").html("* " + data);
        $(".form_info").css("display", "block");
        TweenLite.fromTo(".form_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                TweenLite.fromTo(".form_info", 1, { alpha: 1},{delay: 6, alpha: 0});
            }});
    }


</script>



</div>
</div>
</div>

<!-- content -->
<div class="header_resize2" id="login-box">

    <div id="fb_registration_merge">
        <div class="now_page_resize">
            <div class="form_title">LINK YOUR ACCOUNT</div>

            <div class="clr"></div>
        </div>
        <div id="register_by_fb_form">
            <div class="registration_subtitle">The email <?php echo $fb_profile->content->email; ?> from your Facebook account already has an associated 1Spot account. Would you like to link the two?</div>
            <div style="width:100%;height:600px;margin: 0 auto;">

                <img id="link_image" src="data:image/png;base64,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" style="top: 20%; width: 16%; left: 42%; position: absolute; border-radius: 50%; padding: 1%; border: 2px solid #ccc; box-sizing: border-box;">

                <div style="box-sizing: border-box; width: 50%; padding: 10px; float:left">
                    <div style="background-color: #fafafa; padding: 15px">
                        <img id="fb_link_image" src="<?php echo $fb_profile->content->picture; ?>" style="border-radius: 50%;"/>
                        <p class="fb_name"></p>
                    </div>
                </div>

                <div style="box-sizing: border-box; width: 50%; padding: 10px; float:left; text-align: right; height: 160px">
                    <div style="background-color: #fafafa; padding: 15px">
                        <img src="<?php echo base_url(); ?>/assets/theme/rjr/images/tvj_logo.png">
                        <p class="pl_name"></p>
                    </div>
                </div>

                <div style="clear: both;"></div>

                <div id="fb_link_container">
                    <div>
                        <label for="password">Please insert your current 1SpotMedia password.</label>
                        <input id="password" name="password" class="text" type="password" />

                    </div>
                    <div id="registration_preloader"></div>
                    <p class="form_info">&nbsp;</p>
                    <button id="btn_sign_up_merge" class="send common_btn" style="display: block; margin: 20px auto; width: 200px; float: initial">LINK ACCOUNTS</button>

                </div>



            </div>
        </div>
    </div>
</div>
