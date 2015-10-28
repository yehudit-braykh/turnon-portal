
<script>
$(document).ready(function(){
$('#change_password').on('click', function (event) {
            event.preventDefault();
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/change_pass",
                type: 'POST',
                dataType: 'json',
                data: $('#loginform').serialize()
            }).done(function (data) {
                TweenLite.fromTo("#infopass", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        TweenLite.to("#infopass", 1, {delay: 6, alpha: 0});
                    }});

                if (data.message == "ok") {
                    window.location = '<?php echo base_url(); ?>index.php/account/change_password_completed';
                } else {
                    $("#infopass").html("* " + data.message);
                }
            });

        });
});

</script>

<!-- content -->
<div class="container-fluid form_cont">
        
            <form method="post" id="loginform">
                <div class="form_title">Change password</div>
                <ol>
                    <li> 
                        <div id="infopass" class="form_info"></div>
                    </li>

                    <li>

                        <input id="current_password" name="current_password" placeholder="Current password" class="text" type="password" />
                    </li>
                    <li>

                        <input id="new_password" name="new_password" placeholder="New password" class="text" type="password" />
                    </li>

                    <li>

                        <input id="confirm_password" name="confirm_password" placeholder="Confirm new password" class="text" type="password" />
                    </li>


                    <li class="buttons">
                        <button id="change_password" class="send common_btn">SUBMIT</button>
                        <div class="clr"></div>
                    </li>                    
                </ol>
                
            </form>

            <!--            <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
                        </fb:login-button>-->

</div>
<!-- /content -->