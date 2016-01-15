<script type="text/javascript">

    $(function () {

        _gaq.push(['_trackEvent', 'Registration', 'Payment Information']);
        $('.btn-skip').on('click', function (event) {
            event.preventDefault();
            window.location.href = "<?php echo base_url(); ?>index.php/account/register_complete";
        });

        function show_info() {
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                    TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                }});
        }

        $('#btn_next').on('click', function (event) {
            $(this).hide();
            if (!($("#accept_terms_and_conditions").prop("checked"))) {
                show_info();
                $("#info").html("* You must accept terms and conditions before click next button");
                $('#btn_next').show();
                return false;
            }

            var cardholder_name = $("#cardholder_name").val();
            var valid_cardholder_name = /^[A-Za-z\s]+$/.test(cardholder_name);
            if (!valid_cardholder_name) {
                show_info();
                $("#info").html("* Name on card only accepts letters and spaces");
                $('#btn_next').show();
                return false;
            }

            var card_number = $("#card_number").val();
            var valid_card_number = /^[0-9]+$/.test(card_number);
            if (!valid_card_number) {
                show_info();
                $("#info").html("* Card number only accepts numbers");
                $('#btn_next').show();
                return false;
            }

            var security_code = $("#security_code").val();
            var valid_security_code = /^[0-9]+$/.test(security_code);
            if (!valid_security_code) {
                show_info();
                $("#info").html("* Security code only accepts numbers");
                $('#btn_next').show();
                return false;
            }

            $('#btn_skip').hide();
            $('.other-op-btn').hide();
            $('#registration_preloader').html('Sending data...');
            $('#registration_preloader').show();
            pi_number = $('#card_number').val();
            pi_type = GetCardType($('#card_number').val());
            auto_renew = $("#auto-renew").is(":checked");

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/register_step2_ssl",
                type: 'POST',
                dataType: 'json',
                data: {
                    pi_month: $('#expiration_month').val(),
                    pi_year: $('#expiration_month').val() + '/' + $('#expiration_year').val(),
                    pi_type: pi_type,
                    pi_number: pi_number,
                    subscription_id: subscription_id,
                    auto_renew: auto_renew,
                    security_code: $('#security_code').val()}
            }).done(function (data) {

                if (data && data.status == 'ok') {

                    window.location.href = "<?php echo base_url(); ?>index.php/account/register_subscription_complete";
                } else {

                    $('#registration_preloader').hide();
                    $('#btn_skip').show();
                    $('#btn_next').show();
                    $('.other-op-btn').show();
                    TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                        }});
                    $("#info").html("* " + data.message);
                }
            });

            return false;
        });
        function GetCardType(number)
        {
            var re = new RegExp("^4");
            if (number.match(re) != null)
                return "Visa";
            re = new RegExp("^(34|37)");
            if (number.match(re) != null)
                return "Amex";
            re = new RegExp("^5[1-5]");
            if (number.match(re) != null)
                return "MasterCard";
            re = new RegExp("^6011");
            if (number.match(re) != null)
                return "Discover";
            return "";
        }
    });
</script>

</div>
</div>
</div>

<!-- content -->
<div class="content_centered">
    <div class="payment_content">

        <div class="registration_title_payment">WANT TO BECOME <br class="rwd-break"> A SUSCRIBER?</div>
        <div class="registration_subtitle_payment">Enter your payment information</div>

        <div class="registration_container_payment">

            <div class="registration_cvv_info" style="display: none;">
                <img style="width:175px;height:116px;" src="<?php echo asset_url(); ?>images/cvvnumber.png" />
            </div>

            <?php
            if (sizeof($subscriptions) > 0) {
                $this->load->view(views_url() . 'templates/select_subscription');
                ?>
                <div style="width:100%;text-align: center">
                    <button class="btn-skip main-skip">SKIP AND CONTINUE REGISTRATION</button>
                </div>
                <?php
            }
            ?>
            <form method="post" id="subscribe-form" style="display: none;">
                <ol>
                    <li>
                        <label for="cardholder_name">Name on Card*</label>
                        <input id="cardholder_name" class="text" />
                    </li>
                    <li> 
                        <div class="form_notes">Enter your name exactly as it appears <br class="rwd-break"> on your credit card.</div>
                    </li>        
                    <li>
                        <label for="card_number">Card Number*</label>
                        <input id="card_number" class="text" style="width:150px;" />
                    </li>
                    <li> 
                        <div class="form_notes">Enter your credit card number without spaces.</div>
                    </li>        
                    <li>
                        <label for="security_code">Security Code*</label>
                        <input id="security_code" class="text" type="password" style="width:70px;" />
                    </li>
                    <li> 
                        <div class="form_notes">Enter CVV code.</div>
                    </li>        
                    <li>
                        <label for="expiration_month">Month*</label>
                        <span class='css-select-moz'>
                            <select id="expiration_month" class="text" style="width:70px;">
                                <option id="01">01</option>
                                <option id="01">02</option>
                                <option id="01">03</option>
                                <option id="01">04</option>
                                <option id="01">05</option>
                                <option id="01">06</option>
                                <option id="01">07</option>
                                <option id="01">08</option>
                                <option id="01">09</option>
                                <option id="01">10</option>
                                <option id="01">11</option>
                                <option id="01">12</option>
                            </select>
                        </span>
                    </li>
                    <li> 
                        <div class="form_notes">Select the expiration month.</div>
                    </li>        
                    <li>
                        <label for="expiration_year">Year*</label>
                        <span class='css-select-moz'>
                            <select id="expiration_year" class="text" style="width:70px;">
                                <option id="2015">2015</option>
                                <option id="2016">2016</option>
                                <option id="2017">2017</option>
                                <option id="2018">2018</option>
                                <option id="2019">2019</option>
                                <option id="2020">2020</option>
                                <option id="2021">2021</option>
                                <option id="2022">2022</option>
                                <option id="2023">2023</option>
                                <option id="2024">2024</option>
                                <option id="2025">2025</option>
                            </select>
                        </span>
                    </li>
                    <li> 
                        <div class="form_notes">Select the expiration year.</div>
                    </li>
                    <li class="buttons">
                        <input id="auto-renew"type="checkbox" checked="checked"/><label class="chbx-lbl">Auto-renew</label>
                    </li>
                    <li id= "terms_and_conditions" style="margin-top: 10px">
                        <div style="display: inline-block;"><input id="accept_terms_and_conditions" type="checkbox" /></div>   
                        <div style="display: inline-block;">Accept <a href="<?php echo base_url() . 'index.php/static_content/terms_and_conditions'; ?>" target="_blank" class="terms_and_conditions">Terms and Conditions</a>*</div></li>
                    <li> 
                        <p id="info" class="form_info">&nbsp;</p>
                    </li>
                    <li class="buttons">
                        <button class="other-op-btn">Select other Plan</button>
                        <input type="image" id="btn_next" src="<?php echo asset_url(); ?>images/button_next.png" class="send" />
                        <input type="image" id="btn_skip" class="btn-skip" src="<?php echo asset_url(); ?>images/button_skip_2.png" class="send" style="margin-left:10px;" />
                        <div id="registration_preloader"></div>
                        <div class="clr"></div>
                    </li>
                </ol>
            </form>              
        </div>
    </div>
</div>
<!-- /content -->