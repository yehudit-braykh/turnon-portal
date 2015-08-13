<link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/temp.css" />

<div class="container">

       

        <table id="products_table" class="col-md-12" style="height: 500px;">                       
                <tr><td colspan="3"><h3>Buy Tickets</h3></td></tr>
                <?php
                
                for ($i = 0; $i < sizeof($events->content); $i++) {
                    if (isset($subscription_data) && sizeof($subscription_data) > 0) {
                        for ($h = 0; $h < sizeof($subscription_data); $h++) {
                            if ($events->content[$i]->id === $subscription_data[$h]->{'plorderitem$productId'}) {

                                $buy_column = '<td class="already_purchased"><div>ALREADY<br/>PURCHASED</div><a href="' . base_url() . 'index.php/live_events/main"><div class="watch_now_btn">WATCH NOW!</div></a></td>';
                                break;
                            } else {
                                $buy_column = '<td class="product_conditions"><div class="product_price">$' . $events->content[$i]->price . '</div><div class="buy_button">BUY NOW!</div></td>';
                            }
                        }
                    } else {
                        $buy_column = '<td class="product_conditions"><div class="product_price">$' . $events->content[$i]->price . '</div><div class="buy_button">BUY NOW!</div></td>';
                    }
                    ?>
                    <tr id="<?php echo $events->content[$i]->id ?>" class="product_id">
                        <td class="product_image col-md-4">
                            <img src="<?php echo $events->content[$i]->image; ?>">
                        </td>
                        <td class="product_content">
                            <div class="product_title">
                                <?php echo $events->content[$i]->name; ?>
                            </div>
                            <div class="product_description">
                                <?php echo $events->content[$i]->description; ?>
                            </div>
                        </td>
                        <?php
                        echo $buy_column;
                        ?>
                    </tr>
                    <?php
                }
                ?>
               
            </table>


</div>




<div class="popup" id="popup_buy_product">
    <span class="button b-close"><span>X</span></span>
    <div class="form_title">BUY THIS EVENT...</div>
    <div id="event_title_popup"></div>
    <div class="popup_content registration_container">
        <div id="check_session_preloader"></div>
        <form method="post" id="buy_event_form">
            <div id="buy_form_container">
                <input type="hidden" id="product_id_form"/>
                <ol>
                    <li>
                        <label for="cardholder_name">Name on Card*</label>
                        <input id="cardholder_name" class="buy_event_fields text" />
                        <div class="buy_msg_error">* This field is required</div>
                    </li>
                    <li> 
                        <div class="form_notes">Enter your name exactly as it appears on your credit card.</div>
                    </li>        
                    <li>
                        <label for="card_number">Card Number*</label>
                        <input id="card_number" class="buy_event_fields text" type="text" style="width:150px;" />
                        <div class="buy_msg_error">* This field is required</div>
                    </li>
                    <li> 
                        <div class="form_notes">Enter your credit card number without spaces.</div>
                    </li>        
                    <li>
                        <label for="security_code">Security Code*</label>
                        <input id="security_code" class="buy_event_fields text" type="password" style="width:70px;" />
                        <div class="buy_msg_error">* This field is required</div>
                    </li>
                    <li> 
                        <div class="form_notes">Enter CVV code.</div>
                    </li>        
                    <li>
                        <label for="expiration_month">Month*</label>

                        <select id="expiration_month" class="buy_event_select text" style="width:70px;">
                            <option id="none"></option>
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
                        <div class="buy_msg_error">* This field is required</div>
                    </li>
                    <li> 
                        <div class="form_notes">Select the expiration month.</div>
                    </li>        
                    <li>
                        <label for="expiration_year">Year*</label>
                        <select id="expiration_year" class="buy_event_select text" style="width:100px;">
                            <option id="none"></option>
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
                            <option id="2025">2026</option>
                        </select>
                        <div class="buy_msg_error">* This field is required</div>
                    </li>
                    <li> 
                        <div class="form_notes">Select the expiration year.</div>
                    </li>                
                    <li> 
                        <p id="buy_event_info" class="form_info">&nbsp;</p>
                    </li>
                    <li class="buttons">
                        <div  id="btn_buy_form">BUY EVENT</div>
                        <div id="buy_event_preloader"></div>
                        <div class="clr"></div>
                    </li>
                </ol>
            </div>
        </form> 
    </div>
</div>

<div class="popup" id="popup_buy_finished">
    <span class="button b-close"><span>X</span></span>
    <div class="form_title" style="line-height:1.2">The Event buy process<br>has finished successfully</div>
    <div class="popup_content">
        <div id="finish_buy_btn">OK</div>
    </div>
</div>

<script>

    $(document).ready(function () {

        $(document).on('click', '.buy_button', function () {
            $('#buy_form_container').hide();
            $('#check_session_preloader').show();
            $('#event_title_popup').html($(this).parents('td').siblings('.product_content').children('.product_title').text());
            $('#product_id_form').val($(this).parents('td').parents('.product_id').attr('id'));
            $('#popup_buy_product').bPopup();
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/check_status",
                type: 'POST',
                dataType: 'json',
            }).done(function (data) {

                if (data.status === 'error') {
                    window.location.href = '<?php echo base_url(); ?>index.php/account/signin';
                } else {
                    $('#check_session_preloader').hide();
                    $('#buy_form_container').show()


                }
            });
        });



        $('.buy_event_fields').on('click', function () {
            if ($(this).hasClass('buy_field_error')) {
                $(this).next('.buy_msg_error').hide();
                $(this).removeClass('buy_field_error');
            }
        })

        $('.buy_event_select').on('click', function () {
            if ($(this).hasClass('buy_field_error')) {
                $(this).next('.buy_msg_error').hide();
                $(this).removeClass('buy_field_error');
            }
        })

        $('#btn_buy_form').on('click', function (event) {
            flag = 0;
            $('.buy_event_fields').each(function () {
                if ($(this).val() === '') {
                    $(this).addClass('buy_field_error');
                    $(this).next('.buy_msg_error').show();
                    flag = 1;
                }
            });

            $('.buy_event_select').each(function () {

                if ($(this).val() === 'none' || $(this).val() === '') {
                    $(this).addClass('buy_field_error');
                    $(this).next('.buy_msg_error').show();
                    flag = 1;
                }
            });

            if (flag === 0) {
                $(this).hide();
                $('#buy_event_preloader').html('Buying Event...');
                $('#buy_event_preloader').show();
                TweenLite.to("#buy_event_info", 1, {delay: 6, alpha: 0});
                pi_type = GetCardType($('#card_number').val());
                $.ajax({
                    url: "<?php echo base_url(); ?>index.php/live_events/subscribe",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        pi_month: $('#expiration_month').val(),
                        pi_year: $('#expiration_year').val(),
                        pi_type: pi_type,
                        pi_number: $('#card_number').val(),
                        product_id: $('#product_id_form').val(),
                        pi_security_code: $('#security_code').val()}
                }).done(function (data) {

                    if (typeof (data) !== null && !data.error) {
                        product_id = $('#product_id_form').val();
                        $('.product_id').each(function () {

                            if ($(this).attr('id') === product_id) {
                                $(this).children('.product_conditions').addClass('already_purchased');
                                $(this).children('.already_purchased').html('<div>ALREADY<br/>PURCHASED</div><a href="<?php echo base_url(); ?>index.php/live_events/main"><div class="watch_now_btn">WATCH NOW!</div></a>');
                                $(this).children('.already_purchased').removeClass('product_conditions');
                            }
                        });
                        $('#popup_buy_product').bPopup().close();
                        $('#popup_buy_finished').bPopup();
                        $('#security_code').val('')
                        $('#buy_event_preloader').hide();
                        $('#btn_buy_form').show();
                    } else {
                        if (data.message === 'logout') {
                            window.location.href = '<?php echo base_url(); ?>index.php/account/signin';
                        } else {
                            if (typeof (data) === null) {
                                $("#buy_event_info").html("* An Error has occurred. Please, try again.");
                            } else {
                                $("#buy_event_info").html("* " + data.message);
                            }

                            $('#buy_event_preloader').hide();
                            $('#btn_buy_form').show();
                            TweenLite.fromTo("#buy_event_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {

                                }});
                        }
                    }
                });
            }
            return false;
        });
        $(document).on('click', '#finish_buy_btn', function () {
            $('#popup_buy_finished').bPopup().close();
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
    })
</script>