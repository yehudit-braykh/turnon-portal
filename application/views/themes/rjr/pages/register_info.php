<script type="text/javascript">

    $(function () {

        _gaq.push(['_trackEvent', 'Registration', 'Personal Information']);

        $('#btn_back').on('click', function (event) {
            event.preventDefault();
            window.location.href = "<?php echo base_url(); ?>index.php/account/register";
        });

        $('#btn_next').on('click', function (event) {
            $(this).hide();
            $('#btn_back').hide();
            $('#registration_preloader').html('Sending data...');
            $('#registration_preloader').show();
            event.preventDefault();

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/register_step2_ssl",
                type: 'POST',
                dataType: 'json',
                data: $('#registerform').serialize()
            }).done(function (data) {

                if (data.message == 'ok') {
                    window.location.href = "<?php echo base_url(); ?>index.php/account/register_payment_ssl";

                } else {

                    $('#registration_preloader').hide();
                    $('#btn_next').show();
                    $('#btn_back').show();
                    TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {

                        }});
                    $("#info").html("* " + data.message);

                }
            });
        });

        $('.text').on('click', function () {
            if ($("#info").text() != '') {

                TweenLite.fromTo("#info", 1, {alpha: 1}, {alpha: 0, onComplete: function () {
                        $("#info").html("");
                    }});
            }
        });
    });

</script>

</div>
</div>
</div>

<!-- content -->
<div class="content_centered">
    <div class="registration_content">

        <div class="registration_title">REGISTER</div>
        <div class="registration_subtitle">Enter your personal information.</div>

        <div class="registration_container">

            <form method="post" id="registerform">
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
                        <label for="country" style="width: 100%;">Country*</label>

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
                        <p id="info" class="form_info">&nbsp;</p>

                    </li>
                    <li class="buttons">
                        <input type="image" id="btn_back" src="<?php echo asset_url(); ?>images/button_back.png" class="send" />
                        <input type="image" id="btn_next" src="<?php echo asset_url(); ?>images/button_register.png" class="send" style="margin-left:10px;" />
                        <div id="registration_preloader"></div>
                        <div class="clr"></div>
                    </li>
                </ol>
            </form>              
        </div>
    </div>
</div>
<!-- /content -->