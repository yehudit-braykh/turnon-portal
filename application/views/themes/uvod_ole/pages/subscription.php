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

            <form method="post" id="registerform">
                <ol>
                    <?php $this->load->view(views_url() . 'templates/payment_form'); ?>
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