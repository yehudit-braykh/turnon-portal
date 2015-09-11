<script type="text/javascript">

    $(function () {

function show_info() {
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                    TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                }});
        }

        $('#btn_subscribe').on('click', function (event) {


            $(this).hide();
            if (!($("#accept_terms_and_conditions").prop("checked"))) {
                show_info();
                $("#info").html("* You must accept terms and conditions before click next button");
                $('#btn_subscribe').show();
                return false;
            }

            var cardholder_name = $("#cardholder_name").val();
            var valid_cardholder_name = /^[A-Za-z\s]+$/.test(cardholder_name);
            if (!valid_cardholder_name) {
                show_info();
                $("#info").html("* Name on card only accepts letters and spaces");
                $('#btn_subscribe').show();
                return false;
            }

            var card_number = $("#card_number").val();
            var valid_card_number = /^[0-9]+$/.test(card_number);
            if (!valid_card_number) {
                show_info();
                $("#info").html("* Card number only accepts numbers");
                $('#btn_subscribe').show();
                return false;
            }

            var security_code = $("#security_code").val();
            var valid_security_code = /^[0-9]+$/.test(security_code);
            if (!valid_security_code) {
                show_info();
                $("#info").html("* Security code only accepts numbers");
                $('#btn_subscribe').show();
                return false;
            }

            $('#btn_skip').hide();
            $('#registration_preloader').html('Sending data...');
            $('#registration_preloader').show();

           

                pi_number = $('#card_number').val().substring($('#card_number').val().length - 4);
                pi_type = GetCardType($('#card_number').val());

                $.ajax({
                    url: "<?php echo base_url(); ?>index.php/account/subscribe_ssl",
                    type: 'POST',
                    dataType: 'json',
                    data: {nonce: nonce,
                        pi_month: $('#expiration_month').val(),
                        pi_year: ('#expiration_month').val() + '/' + $('#expiration_year').val(),
                        pi_type: pi_type,
                        pi_number: pi_number}
                }).done(function (data) {

                    if (data && data.status == 'ok') {

                        window.location.href = "<?php echo base_url(); ?>index.php/account/subscription_finished";

                    } else {

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
<div class="container">
    <div class="uvod_container">
        
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

            <form  id="loginform">
                <div class="form_title">Become a subscriber</div>

                <ol>
                    <?php $this->load->view(views_url() . 'templates/payment_form'); ?>

                    <li class="buttons">
                        <button id="btn_subscribe" type="button" class="send">CONFIRM PAYMENT</button>
                        <div id="registration_preloader"></div>
                        <div class="clr"></div>
                    </li>
                </ol>

            </form>              
        
    </div>
</div>
<!-- /content -->