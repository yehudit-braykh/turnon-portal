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
                    <li>

                        <input id="cardholder_name" placeholder="Name on card" class="text" />
                    </li>

                    <li>

                        <input id="card_number" placeholder="Credit card number" class="text" />
                    </li>

                    <li>
                        <input id="security_code" placeholder="Security code" class="text" type="password" />
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
                        <label for="expiration_year">Year*</label>
                        <span class='css-select-moz'>
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
                        </span>
                    </li>

                    <li> 
                        <p id="info" class="form_info">&nbsp;</p>
                    </li>
                    <li id= "terms_and_conditions" style="margin-top: 10px">
                        <div style="display: inline-block;"><input id="accept_terms_and_conditions" type="checkbox" /></div>   
                        <div style="display: inline-block;">Accept <a href="<?php echo base_url() . 'index.php/static_content/terms_and_conditions'; ?>" target="_blank" class="terms_and_conditions">Terms and Conditions</a>*</div></li>
                    <li> 
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

