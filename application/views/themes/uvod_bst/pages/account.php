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
<div class="container-fluid form_cont">

    <div class="col-sm-3"></div>

    <div class="col-sm-6">

        <div class="information_profile_content">

                <div class="logout_button_container">
                    <button type="submit" class="btn btn-primary btn-md" class="send">LOG OUT</button>
                </div>

                <div class="form_title">My Account</div>

                <div class="profile_container">

                    <div class="profile_left">

                        <h4 class="square_profile">MS</h4>

                    </div>

                    <div class="profile_right">
                        <h4><?php echo $user_first_name." ".$user_last_name; ?></h4>
                        <h5 class="form_opacity_font">mariosabio@gmail.com</h5>

                        <button type="submit" id="btn_change_password" class="btn btn-default btn-md" class="send">Change password</button>
                    </div>

                </div>


                <div class="dc_clear"></div>

        </div>


        

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


                <div class="information_button_content">
                    <button type="submit" class="subscriber_button btn btn-default btn-lg" class="send">Subscribe now</button>
                </div>

                <!--<div class="pricing_content">
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
                </div>-->

            <?php
            }
            ?>

        

        <div class="information_content" style="background-color: rgba(255,255,255,0.1);">

            <h5>Subscription:</h5>

            <p><span>Status: </span>active</p>
            <p><span>Subscribed since: </span>aaaa-mm-dd</p>
            <p><span>Subscription due date: </span>aaaa-mm-dd</p>

            <button type="submit" class="btn btn-default btn-md">Cancel subscription</button>
  
            <div class="dc_clear"></div>

        </div>

        <div class="information_content" style="background-color: rgba(255,255,255,0.1);">

            <h5>Billing information:</h5>

            <p><span>Name on card: </span>Nnnnnn N Nnnnn</p>
            <p><span>Credit card number: </span>9999XXXX9999</p>
            <p><span>Expiration: </span>aaaa-mm</p>

            <button type="submit" class="btn btn-default btn-md">Modify</button>
  
            <div class="dc_clear"></div>

        </div>

        <div class="information_content" style="background-color: rgba(255,255,255,0.1);">

            <h5>Purchased events:</h5>

            <p>dd-mm-aaaa - Lorem ipsum #1</p>
            <p>dd-mm-aaaa - Lorem ipsum #2</p>
            <p><span>dd-mm-aaaa - Lorem ipsum #3</span></p>
            <p><span>dd-mm-aaaa - Lorem ipsum #4</span></p>
            <p><span>dd-mm-aaaa - Lorem ipsum #5</span></p>
            
            <div class="dc_clear"></div>

        </div>


    </div>

    <div class="col-sm-3"></div>

    <div class="dc_clear"></div>







    
    
    

                    
               

                    <!--<div class="registration_container" style="padding-left:20px;">
                        <form id="changepasswordform" method="post">
                            <ol>
                                <li>
                                    <label for="current_password">Current Password*</label>
                                    <input id="current_password" name="current_password" class="text" type="password" />
                                </li>
                                                      
                                <li>
                                    <label for="new_password">New Password*</label>
                                    <input id="new_password" name="new_password" class="text" type="password" />
                                </li>
                                               
                                <li>
                                    <label for="confirm_password">Confirm Password*</label>
                                    <input id="confirm_password" name="confirm_password" class="text" type="password" />
                                </li>
                                               
                                <li> 
                                    <span id="infopass" class="form_info">&nbsp;</span>
                                </li>
                                <li class="buttons">
                                    <input type="image" id="btn_change_password" src="<?php echo asset_url(); ?>images/button_submit.png" class="send" />
                                </li>
                            </ol>
                        </form>  
                    </div>-->
             
            
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

</div>