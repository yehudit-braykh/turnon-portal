<script type="text/javascript">

    $(function () {

        _gaq.push(['_trackEvent', 'Registration', 'Payment Information']);

        $('.skip-payment').on('click', function (event) {
            event.preventDefault();
            window.location.href = "<?php echo base_url(); ?>index.php/account/register_complete";
        });

        $('#btn_pay_per_view').on('click', function (event) {
            event.preventDefault();
            window.location.href = "<?php echo base_url(); ?>index.php/account/register_complete";
        });
        
        function show_info() {
            $('.form_info').show();
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                    TweenLite.to("#info", 1, {delay: 6, alpha: 0, onComplete: function () {
                            $('.form_info').hide();
                        }});
                }});
        }

        $('#btn_next').on('click', function (event) {
            $(this).hide();
            $('.form_info').hide();
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

            security_code = $("#security_code").val();
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
                    security_code: security_code}
            }).done(function (data) {

                if (data && data.status == 'ok') {

                    window.location.href = "<?php echo base_url(); ?>index.php/account/register_subscription_complete";
                } else {

                    $('#registration_preloader').hide();
                    $('#btn_skip').show();
                    $('#btn_next').show();
                    $('.other-op-btn').show();
                    $("#info").html("* " + data.message);
                    show_info();
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

        <div class="registration_title_payment">I WANT TO BECOME <br class="rwd-break"> A SUBSCRIBER OF 1SPOTMEDIA</div>

        <?php
        if (sizeof($subscriptions) > 0) {
            $this->load->view(views_url() . 'templates/select_subscription');
            ?>
            <div style="width:100%;text-align: center">
                <button id="main-skip" class="skip-payment">SKIP AND CONTINUE REGISTRATION</button>
            </div>
            <?php
        }
        ?>
        <form method="post" id="subscription_form" style="display: none;">
            <?php
            $this->load->view(views_url() . 'templates/credit_card_form');
            ?>
            <li class="buttons">
                <input id="auto-renew"type="checkbox" checked="checked"/><label class="chbx-lbl">Auto-renew</label>
            </li>
            <li id= "terms_and_conditions" style="margin-top: 10px">
                <div style="display: inline-block;"><input id="accept_terms_and_conditions" type="checkbox" /></div>   
                <div style="display: inline-block;">Accept <a href="<?php echo base_url() . 'index.php/static_content/terms_conditions_subscribers'; ?>" target="_blank" class="terms_and_conditions">Terms and Conditions</a>*</div></li>
            <li> 
                <p id="info" class="form_info">&nbsp;</p>
            </li>
            <li class="buttons">
                <button class="other-op-btn">Select other Plan</button>
                <button id="btn_skip" class="skip-payment">SKIP AND CONTINUE REGISTRATION</button>
                <button id="btn_next">NEXT</button>
                <div id="registration_preloader"></div>
                <div class="clr"></div>
            </li>
            </ol>

        </form>              

    </div>
</div>
<!-- /content -->