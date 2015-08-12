<script type="text/javascript">

    $(function () {


        $('#btn_subscribe').on('click', function (event) {


            var client = new braintree.api.Client({clientToken: '<?php echo $clientToken; ?>'});

            client.tokenizeCard({
                cardholderName: $('#cardholder_name').val(),
                number: $('#card_number').val(),
                cvv: $('#security_code').val(),
                expirationMonth: $('#expiration_month').val(),
                expirationYear: $('#expiration_year').val()},
            function (err, nonce) {

                pi_number = $('#card_number').val().substring($('#card_number').val().length - 4);
                pi_type = GetCardType($('#card_number').val());

                $.ajax({
                    url: "<?php echo base_url(); ?>index.php/account/subscribe",
                    type: 'POST',
                    dataType: 'json',
                    data: {nonce: nonce,
                        pi_month: $('#expiration_month').val(),
                        pi_year: $('#expiration_year').val(),
                        pi_type: pi_type,
                        pi_number: pi_number}
                }).done(function (data) {

                    if (data && data.message == 'ok') {

                        window.location.href = "<?php echo base_url(); ?>index.php/account/subscription_finished";

                    } else {

                        TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                                TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                            }});
                        $("#info").html("* " + data.message);

                    }
                });
            }
            );
            return false;
        });

        function GetCardType(number)
        {
            var re = new RegExp("^4");
            if (number.match(re) != null)
                return "Visa";

            re = new RegExp("^(34|37)");
            if (number.match(re) != null)
                return "American Express";

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

<!-- content -->
<div class="content_centered">
    <div class="registration_content">

        <div class="registration_title">WANT TO BECOME A SUSCRIBER?</div>
        <div class="registration_subtitle">Enter your payment information</div>

        <div class="registration_container">

            <div class="registration_cvv_info">
                <img style="width:175px;height:116px;" src="<?php echo asset_url(); ?>images/cvvnumber.png" />
            </div>

            <div class="registration_pricing">
                <div class="dc_pricingtable04">
                    <ul class="price-box" style="width:100%;">
                        <li class="pricing-header glass_blue">
                            <ul>
                                <li class="title">Monthly Subscription</li>
                                <?php
                                if (isset($subscription_amount)) {
                                    $arr = explode('.', $subscription_amount);
                                    if (sizeof($arr) == 1) {
                                        $cents = '.00';
                                    } else {
                                        $cents = '.' . $arr[1];
                                    }
                                }
                                ?>
                                <li class="price"><span class="currency">$</span><span class="big"><?php echo $arr[0]; ?></span><span class="small"><?php echo $cents; ?></span></li>
                                <li class="month-label">Per Month</li>
                            </ul>
                        </li>
                        <li class="pricing-content">
                            <ul>
                                <li><strong>+300</strong> VOD Clips</li>
                                <li><strong>5</strong> Live Channels</li>
                            </ul>
                        </li>
                        <li class="pricing-footer"><strong>Unlimited access to our VOD Catalog.</strong></li>
                    </ul>
                    <div class="dc_clear"></div>
                </div>
            </div>

            <form method="post" id="subscribeform">
                <ol>
                    <li>
                        <label for="cardholder_name">Name on Card*</label>
                        <input id="cardholder_name" class="text" />
                    </li>
                    <li> 
                        <div class="form_notes">Enter your name exactly as it appears on your credit card.</div>
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
                       
                                </li>
                                <li> 
                                    <div class="form_notes">Select the expiration month.</div>
                                </li>        
                                <li>
                                    <label for="expiration_year">Year*</label>
                                    <select id="expiration_year" class="text" style="width:70px;">
                                        <option id="2014">2014</option>
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
                                </li>
                                <li> 
                                    <div class="form_notes">Select the expiration year.</div>
                                </li>                
                                <li> 
                                    <p id="info" class="form_info">&nbsp;</p>
                                </li>
                                <li class="buttons">
                                    <input type="image" id="btn_subscribe" src="<?php echo asset_url(); ?>images/button_subscribe.png" class="send" />

                                    <div class="clr"></div>
                                </li>
                                </ol>
                                </form>              
                                </div>
                                </div>
                                </div>
                                <!-- /content -->