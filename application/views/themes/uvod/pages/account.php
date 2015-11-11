<script type="text/javascript">

    $(function () {

        $('#tab-container').easytabs();

        $('#btn_save').on('click', function (event) {


            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/my_account_save",
                type: 'POST',
                dataType: 'json',
                data: $('#registerform').serialize()
            }).done(function (data) {

                if (data.message == "ok") {

                    $("#info").html("Information saved succesfully.");
                } else {

                    $("#info").html("* " + data.message);
                }
                TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                    }});


            });
            return false;
        });
<?php
if (isset($clientToken)) {
    ?>
            $('#btn_save_billing').on('click', function (event) {

                var client = new braintree.api.Client({clientToken: '<?php echo $clientToken; ?>'});

                client.tokenizeCard({
                    cardholderName: $('#cardholder_name').val(),
                    number: $('#card_number').val(),
                    cvv: $('#security_code').val(),
                    expirationMonth: $('#expiration_month').val(),
                    expirationYear: $('#expiration_year').val()
                },
                function (err, nonce) {

                    pi_number = $('#card_number').val().substring($('#card_number').val().length - 4);


                    $.ajax({
                        url: "<?php echo base_url(); ?>index.php/account/update_billing_information",
                        type: 'POST',
                        dataType: 'json',
                        data: {nonce: nonce}
                    }).done(function (data) {
                        if (data && data.error == false) {
                            TweenLite.fromTo("#billing_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                                    TweenLite.to("#billing_info", 1, {delay: 8, alpha: 0});
                                }});
                            $("#billing_info").html("The data has been saved successfully");

                        } else {

                            TweenLite.fromTo("#billing_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                                    TweenLite.to("#billing_info", 1, {delay: 8, alpha: 0});
                                }});
                            $("#billing_info").html("* " + data.message);

                        }
                    });
                });
                return false;
            });

    <?php
}
?>
        $('#btn_logout').on('click', function (event) {
            event.preventDefault();
            $("#registerform").attr("action", "<?php echo base_url(); ?>index.php/account/logout");
            $("#registerform").submit();
        });

        $('#btn_change_password').on('click', function (event) {
            event.preventDefault();
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/change_password",
                type: 'POST',
                dataType: 'json',
                data: $('#changepasswordform').serialize()
            }).done(function (data) {
                TweenLite.fromTo("#infopass", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        TweenLite.to("#infopass", 1, {delay: 6, alpha: 0});
                    }});

                if (data.message == "ok") {
                    $("#infopass").html("Password changed.");
                    $("#current_password").val("");
                    $("#new_password").val("");
                    $("#confirm_password").val("");
                } else {
                    $("#infopass").html("* " + data.message);
                }
            });

        });

        $('.subscriber_button').on('click', function () {
            window.location = '<?php echo base_url(); ?>index.php/account/subscription_ssl';
        });

        $('#btn_cancel').on('click', function () {

            $('#popup_cancel').bPopup();

            return false;

        });

        $('#accept_button').on('click', function () {

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/cancel_subscription",
                type: 'POST',
                dataType: 'json',
                data: {contract_id: $('#contract_id').val()}
            }).done(function (data) {
                window.location = '<?php echo base_url(); ?>index.php/account/subscription_cancelled';
            });
            return false;
        });

        $('#btn_change_billing').on('click', function () {
            $('.billing_data').removeAttr('disabled');
            $('.billing_data').val('');
            $('#btn_save_billing').fadeIn('slow');
            return false;
        });

    });



</script>

</div>
</div>

<!-- content -->
<div class="account_content content_centered">
    <div class="logout_button_container">
        <input type="image" id="btn_logout" src="<?php echo asset_url(); ?>images/button_logout.png" class="send" style="margin-left:10px;" />
    </div>
    <div class="registration_title">My Account</div>
    <br>
    <div class="registration_container">    
        <div id="tab-container" class="tab-container">
            <ul class='etabs'>
                <li class='tab'><a href="#tab1" id="vod_item_sub_menu1">My Information</a></li>
                <li class='tab'><a href="#tab2" id="vod_item_sub_menu2">Subscription</a></li>
                <li class='tab'><a href="#tab3" id="vod_item_sub_menu3">Billing Information</a></li>
                <li class='tab'><a href="#tab4" id="vod_item_sub_menu4">Change password</a></li>
            </ul>
            <div class='panel-container'>
                <div id="tab1">

                    <div class="registration_container" style="padding-left:20px;">
                        <form id="registerform" method="post">
                            <ol>
                                <li>
                                    <label for="first_name">First Name*</label>
                                    <input id="first_name" name="first_name" class="text" value="<?php echo $user_first_name; ?>" />
                                </li>
                                <li>
                                    <label for="last_name">Last Name*</label>
                                    <input id="last_name" name="last_name" class="text" value="<?php echo $user_last_name; ?>" />
                                </li>
                                <li>
                                    <label for="city">City</label>
                                    <input id="city" name="city" class="text" value="<?php echo $user_city; ?>" />
                                </li>
                                <li>
                                    <label for="country" style="width: 100%">Country*</label>
                           
                                        <select id="country" name="country" class="text" style="width:238px;">
                                            <option value="default" disabled="disabled" selected="selected">Select your country</option>
                                            <?php
                                            echo html_combo_country($user_country);
                                            ?>
                                        </select>
                            
                                </li>
                                <li>
                                    <label for="postal_code">Postal Code</label>
                                    <input id="postal_code" name="postal_code" class="text" value="<?php echo $user_postal_code; ?>" />
                                </li>
                                <li> 
                                    <p id="info" class="form_info">&nbsp;</p>
                                </li>
                                <li class="buttons">
                                    <input type="image" id="btn_save" src="<?php echo asset_url(); ?>images/button_save.png" class="send" />
                                </li>
                            </ol>
                        </form>  
                    </div>
                </div>
                <div id="tab2">
                    <div class="registration_container" style="padding-left:20px;">


                        <?php
                        if (isset($subscription_data) && $subscription_data != "") {
                            ?>



                            <form method="post" id="cancelform">
                                <ol>
                                    <li>
                                        <label for="contract_status">Status</label>
                                        <input id="contract_status" class="text" style="width:150px;" value="<?php
                                        if ($subscription_data[0]->{'plcontract$active'}) {
                                            echo 'Active';
                                        } else {
                                            echo 'Inactive';
                                        }
                                        ?>"/>
                                    </li>

                                    <li>
                                        <label for="contact_start_date">Subscribed since</label>
                                        <input id="contact_start_date" class="text" style="width:150px;" value="<?php echo date('Y-m-d', $subscription_data[0]->{'plcontract$contractStartDate'} / 1000); ?>" />
                                    </li>
                                    <li>
                                        <label for="contact_end_date">Subscription due date</label>
                                        <input id="contact_end_date" class="text" style="width:150px;" value="<?php echo date('Y-m-d', $subscription_data[0]->{'plcontract$contractEndDate'} / 1000); ?>" />
                                    </li>

                                    <li> 
                                        <p id="info" style="color:#fff;text-align:center;margin-left:120px;">&nbsp;</p>
                                    </li>
                                    <li class="buttons">
                                        <input id="contract_id" type="hidden" class="text" style="width:150px;" value="<?php echo $subscription_data[0]->id; ?>" />
                                        <input type="image" id="btn_cancel" src="<?php echo asset_url(); ?>images/button_cancel_subscription.png" class="send" />

                                    </li>
                                </ol>
                            </form>     
                            <?php
                        } else {
                            ?>

                            <div class="registration_title">WANT TO BECOME A SUSCRIBER?</div>
                            <div class="subscriber_button"></div>
                            <div class="pricing_content">
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
                            </div>
                            <?php
                        }
                        ?>

                    </div>
                </div>

                <div id="tab3">

                    <div class="registration_container" style="padding-left:20px;min-height:500px;">
                        <form method="post" id="registerform2">
                            <ol>
                                <li>
                                    <label for="cardholder_name">Name on Card*</label>
                                    <input id="cardholder_name" class="text billing_data" disabled="disabled" value="<?php
                                    if (isset($card_name)) {
                                        echo $card_name;
                                    }
                                    ?>" />
                                </li>
                                <li>
                                    <label for="card_number">Card Number*</label>
                                    <input id="card_number" class="text billing_data" disabled="disabled" style="width:150px;" value="<?php
                                    if (isset($card_number)) {
                                        echo $card_number;
                                    }
                                    ?>" />
                                </li>
                                <li>
                                    <label for="security_code">Security Code*</label>
                                    <input id="security_code" class="text billing_data" type="password" disabled="disabled" style="width:70px;" value="<?php
                                    if (isset($card_number)) {
                                        echo '***';
                                    }
                                    ?>" />
                                </li>
                                <li>
                                    <label for="expiration_month" style="width: 100%">Month*</label>
                                   
                                        <select id="expiration_month" class="text billing_data" disabled="disabled" style="width:70px;">
                                            <?php
                                            if (isset($card_expiration_month)) {
                                                for ($i = 1; $i <= 12; $i++) {
                                                    if ($i == $card_expiration_month) {
                                                        if ($i < 10) {
                                                            echo '<option id="0' . $i . '" selected="selected">0' . $i . '</option>';
                                                        } else {
                                                            echo '<option id="' . $i . '" selected="selected">' . $i . '</option>';
                                                        }
                                                    } else {
                                                        if ($i < 10) {
                                                            echo '<option id="0' . $i . '">0' . $i . '</option>';
                                                        } else {
                                                            echo '<option id="' . $i . '">' . $i . '</option>';
                                                        }
                                                    }
                                                }
                                            } else {
                                                ?>
                                                <option id="01">01</option>
                                                <option id="02">02</option>
                                                <option id="03">03</option>
                                                <option id="04">04</option>
                                                <option id="05">05</option>
                                                <option id="06">06</option>
                                                <option id="07">07</option>
                                                <option id="08">08</option>
                                                <option id="09">09</option>
                                                <option id="10">10</option>
                                                <option id="11">11</option>
                                                <option id="12">12</option>
                                                <?php
                                            }
                                            ?>
                                        </select>
                                  
                                </li>
                                <li>
                                    <label for="expiration_year" style="width: 100%">Year*</label>
                               
                                        <select id="expiration_year" class="text billing_data" disabled="disabled" style="width:90px;">
                                            <?php
                                            if (isset($card_expiration_year)) {
                                                for ($i = 2014; $i <= 2025; $i++) {
                                                    if ($i == $card_expiration_year) {

                                                        echo '<option id="' . $i . '" selected="selected">' . $i . '</option>';
                                                    } else {

                                                        echo '<option id="' . $i . '">' . $i . '</option>';
                                                    }
                                                }
                                            } else {
                                                ?>
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
                                                <?php
                                            }
                                            ?>
                                        </select>
                                
                                </li>
                                <li> 
                                    <span id="billing_info" class="form_info">&nbsp;</span>
                                </li>
                                <li class="buttons">

                                    <input type="image" id="btn_change_billing" src="<?php echo asset_url(); ?>images/button_modify.png"/>
                                    <input type="image" id="btn_save_billing" src="<?php echo asset_url(); ?>images/button_save.png" class="send"/>
                                    <div class="clr"></div>
                                </li>
                            </ol>
                        </form>              
                    </div>
                </div>

                <!-- TAB 4: Change Password -->
                <div id="tab4">

                    <div class="registration_container" style="padding-left:20px;">
                        <form id="changepasswordform" method="post">
                            <ol>
                                <li>
                                    <label for="current_password">Current Password*</label>
                                    <input id="current_password" name="current_password" class="text" type="password" />
                                </li>
                                <li> 
                                    <div class="form_notes">Enter your current password.</div>
                                </li>                        
                                <li>
                                    <label for="new_password">New Password*</label>
                                    <input id="new_password" name="new_password" class="text" type="password" />
                                </li>
                                <li> 
                                    <div class="form_notes">New password should have between 8 and 16 characters.</div>
                                </li>                
                                <li>
                                    <label for="confirm_password">Confirm Password*</label>
                                    <input id="confirm_password" name="confirm_password" class="text" type="password" />
                                </li>
                                <li> 
                                    <div class="form_notes">Re-enter your new password for confirmation.</div>
                                </li>                
                                <li> 
                                    <span id="infopass" class="form_info">&nbsp;</span>
                                </li>
                                <li class="buttons">
                                    <input type="image" id="btn_change_password" src="<?php echo asset_url(); ?>images/button_submit.png" class="send" />
                                </li>
                            </ol>
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /content -->

    <div class="popup" id="popup_cancel">
        <span class="button b-close"><span>X</span></span>
        <div class="form_title" style="line-height:1.2">Do you want cancel<br>this subscription?</div>
        <div class="popup_content">
            <form id="cancel_form" class="popup_form">
                <button class="dialog_button question" id="accept_button">Yes</button>
                <button class="dialog_button question b-close" id="deny_button">No</button>
            </form>
        </div>
    </div>