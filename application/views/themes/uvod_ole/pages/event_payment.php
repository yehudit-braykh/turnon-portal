<link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/temp.css" />

<script type="text/javascript">

    $(function () {

function show_info () {
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                        }});
        }
        
        $('#btn_next').on('click', function (event) {
            $(this).hide();
            if (!($("#accept_terms_and_conditions").prop("checked"))) {
                show_info();
                $("#info").html("* You must accept terms and conditions before click next button" );
                $('#btn_next').show();
                return false;
            }  
            
            var cardholder_name = $("#cardholder_name").val();
            var valid_cardholder_name = /^[A-Za-z\s]+$/.test(cardholder_name);
            if (!valid_cardholder_name) {
                show_info();
                $("#info").html("* Name on card only accepts letters and spaces" );
                $('#btn_next').show();
                return false;
            }
            
            var card_number = $("#card_number").val();
            var valid_card_number = /^[0-9]+$/.test(card_number);
            if (!valid_card_number) {
                show_info();
                $("#info").html("* Card number only accepts numbers" );
                $('#btn_next').show();
                return false;
            }
            
            var security_code = $("#security_code").val();
            var valid_security_code = /^[0-9]+$/.test(security_code);
            if (!valid_security_code) {
                show_info();
                $("#info").html("* Security code only accepts numbers" );
                $('#btn_next').show();
                return false;
            }
            
            $('#btn_skip').hide();
            $('#registration_preloader').html('Sending data...');
            $('#registration_preloader').show();
            pi_number = $('#card_number').val();
            pi_type = GetCardType($('#card_number').val());
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/live_events/subscribe",
                type: 'POST',
                dataType: 'json',
                data: {
                    pi_month: $('#expiration_month').val(),
                    pi_year: $('#expiration_year').val(),
                    pi_type: pi_type,
                    pi_security_code: $('#security_code').val(),
                    pi_number: pi_number}
            }).done(function (data) {

                if (data && data.status == 'ok') {

                    window.location.href = "<?php echo base_url(); ?>index.php/live_events/event_buy_complete";
                } else {

                    $('#registration_preloader').hide();
         
                    $('#btn_next').show();
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


<!-- content -->
<div class="container">
    <div class="jumbotron">

        <div class="buytickets_title">Buy Ticket</div>

        <div id='event-confirm-section' class="col-md-4">
            <?php
            if (isset($_SESSION['event_price'])) {
                ?>
                <h3><?php echo $_SESSION['event_name'] ?></h3>
                <?php
            }
            ?>
            <h3>TOTAL PURCHASE</h3>
            <?php
            if (isset($_SESSION['event_price'])) {
                ?>
                <h1 style="text-align: center">$ <?php echo $_SESSION['event_price']; ?></h1>
                <?php
            } else {
                echo 'no esta seteada';
            }
            ?>
        </div>
        <div class="registration_container col-md-4">

            <form method="post" id="registerform">

                <ol>
                      <?php $this->load->view(views_url() . 'templates/payment_form'); ?>
                    <li class="buttons">
                        <button type="submit" id="btn_next" class="send">CONFIRM PAYMENT</button>
                    </li>
                    <li>
                         <div id="registration_preloader"></div>
                    </li>
                    <li>
                        <hr id="line_payment">
                         
                    </li>

                </ol>
            </form>              

        </div>
    </div>
</div>
<!-- /content -->

