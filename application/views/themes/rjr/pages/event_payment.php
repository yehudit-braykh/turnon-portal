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


       $('#btn_modify').on('click', function (event) {
            window.location.href = "<?php echo base_url(); ?>index.php/live_events/buy_events";
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
<div class="container-fluid form_cont">

<div class="col-sm-12">
    <div class="col-sm-3"></div>
    <div class="col-sm-6"><div class="form_title">Buy Tickets</div></div>
    <div class="col-sm-3"></div>
</div>






<div class="col-sm-12">

    <div class="col-sm-3"></div>

    <div class="col-sm-3">

        <div id='event-confirm-section'>
            <div class="text1_box">TOTAL PURCHASE</div>
            
            <?php
            if (isset($_SESSION['event_price'])) {
                ?>
                <div class="price_box">$ <?php echo $_SESSION['event_price']; ?></div>
                <?php
            } else {
                echo 'no esta seteada';
            }
            ?>

            <?php
            if (isset($_SESSION['event_price'])) {
                ?>
                <div class="text2_box"><?php echo $_SESSION['event_name'] ?></div>
                <?php
            }
            ?>
            
            <div class="text3_box">When you press CONFIRM PAYMENT, the transaction will be processed and can’t be reversed.</div>

            <div class="text3_box">If you have made ​​a mistake use this button to correct:</div>

            <button type="submit" id="btn_modify" class="btn btn-default btn-md btn_modify">Modify selection</button>

        </div>

    </div>



    <div class="col-sm-3 form_buy_tickets">

        

            <form method="post" id="payment_form">

                <ol>
                      <?php $this->load->view(views_url() . 'templates/payment_form'); ?>
                    <li class="buttons">
                        <button type="submit" id="btn_next" class="send">CONFIRM PAYMENT</button>
                    </li>
                    <li>
                         <div id="registration_preloader"></div>
                    </li>

                </ol>
            </form>              

        

    </div>

    
<div class="col-sm-3"></div>
    

</div>

</div>
<!-- /content -->

