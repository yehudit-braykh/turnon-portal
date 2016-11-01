
<script type="text/javascript">

    $(function () {

        String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        $('#tab-container').easytabs();


        $('#edit_fields_btn').on('click', function (event) {
            event.preventDefault();
            $('.editable-field').css('background', '#fff');
            $('.editable-field').removeAttr('disabled');
        });

        $('#edit_credit_card_btn').on('click', function (event) {
            event.preventDefault();
            $("#change_credit_card_form .text").val('');
            $('#change_cc_container').show();
        });

        $('#change_credit_card_btn').on('click', function (event) {
            event.preventDefault();
            $('#current_credit_card_container').hide();
            $('#new_credit_card_container').show();
        });

        $('#use_stored_cc').on('click', function (event) {
            event.preventDefault();
            $('#new_credit_card_container').hide();
            $('#current_credit_card_container').show();
        });

        $('#cancel_credit_card').on('click', function (event) {
            event.preventDefault();
            $("#change_credit_card_form .text").val('');
            $('#change_cc_container').hide();
        });

        $('#save_credit_card').on('click', function (event) {
            event.preventDefault();

            var cardholder_name = $("#cardholder_name").val();
            var valid_cardholder_name = /^[A-Za-z\s]+$/.test(cardholder_name);
            if (!valid_cardholder_name) {
                show_info("#save_cc_info");
                $("#save_cc_info").html("* Name on card only accepts letters and spaces");
                return false;
            }

            var card_number = $("#card_number").val();
            var valid_card_number = /^[0-9]+$/.test(card_number);
            if (!valid_card_number) {
                show_info("#save_cc_info");
                $("#save_cc_info").html("* Card number only accepts numbers");
                return false;
            }

            security_code = $("#security_code").val();
            var valid_security_code = /^[0-9]+$/.test(security_code);
            if (!valid_security_code) {
                show_info("#save_cc_info");
                $("#save_cc_info").html("* Security code only accepts numbers");
                return false;
            }

            expiration_month = $("#expiration_month").val();
            if (!expiration_month || expiration_month == "") {
                show_info("#save_cc_info");
                $("#save_cc_info").html("* Expiration month is mandatory");
                return false;
            }

            expiration_year = $("#expiration_year").val();
            if (!expiration_year || expiration_year == "") {
                show_info("#save_cc_info");
                $("#save_cc_info").html("* Expiration year is mandatory");
                return false;
            }

            $("#change_cc_preloader").show();
            $("#cc_buttons").hide();

            pi_number = $('#card_number').val();
            pi_type = GetCardType($('#card_number').val());

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/save_credit_card_ssl",
                type: 'POST',
                dataType: 'json',
                data: {
                    pi_month: $('#expiration_month').val(),
                    pi_year: $('#expiration_month').val() + '/' + $('#expiration_year').val(),
                    pi_type: pi_type,
                    pi_number: pi_number,
                    security_code: security_code}
            }).done(function (data) {
                $('#change_cc_preloader').hide();
                $("#cc_buttons").show();

                if (data.status == "ok") {

                    $("#change_cc_info").show();
                    $("#change_cc_info").html("Information saved succesfully.");

                    $("#current_card_owner").val(data.new_cc.first_name + " " + data.new_cc.last_name);
                    $("#current_card_type").val(data.new_cc.type.capitalize());
                    $("#current_card_number").val(data.new_cc.number);
                    $("#current_card_expiration_date").val(data.new_cc.expire_month + "/" + data.new_cc.expire_year);


                    TweenLite.fromTo("#change_cc_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#change_cc_info", 1, {delay: 6, alpha: 0, onComplete: function () {
                                    $("#change_cc_info").hide();
                                }});
                        }});
                    $("#change_cc_container").hide();

                } else {
                    $("#save_cc_info").show();
                    $("#save_cc_info").html("* " + data.message);

                    TweenLite.fromTo("#save_cc_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#save_cc_info", 1, {delay: 6, alpha: 0, onComplete: function () {
                                    $("#save_cc_info").hide();
                                }});
                        }});
                }



            });

        });


        $('.btn_watch_now').on('click', function (event) {
            window.location.href = "<?php echo base_url() . 'index.php/live_events/main'; ?>";
        })

        $('#btn_save').on('click', function (event) {
            $(this).hide()
            $('#save_data_preloader').html('Sending data...');
            $('#save_data_preloader').show();
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/my_account_save_ssl",
                type: 'POST',
                dataType: 'json',
                data: $('#registerform').serialize()
            }).done(function (data) {
                $('#save_data_preloader').hide();
                $('#btn_save').show();
                $("#info").show();
                if (data.status == "ok") {

                    $("#info").html("Information saved succesfully.");
                } else {
                    $("#info").html("* " + data.message);
                }
                TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        TweenLite.to("#info", 1, {delay: 6, alpha: 0, onComplete: function () {
                                $("#info").hide();
                            }});
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
            $("#registerform").attr("action", "<?php echo base_url(); ?>index.php/account/logout_ssl");
            $("#registerform").submit();
        });

        $('#btn_change_password').on('click', function (event) {
            event.preventDefault();
            $(this).hide();
            $('#change_pass_preloader').html('Saving Password...');
            $('#change_pass_preloader').show();
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/change_password_ssl",
                type: 'POST',
                dataType: 'json',
                data: $('#changepasswordform').serialize()
            }).done(function (data) {
                $('#change_pass_preloader').hide();
                if (data.message == "ok") {

                    $("#infopass").html("Password changed.");
                    $("#infopass").show();
                    TweenLite.fromTo("#infopass", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#infopass", 1, {delay: 4, alpha: 0, onComplete: function () {

                                    $("#new_password").val("");
                                    $("#confirm_password").val("");
                                    $('#btn_change_password').show();
                                }});

                        }});

                } else {
                    $("#infopass").html("* " + data.message);
                    $("#infopass").show();
                    TweenLite.fromTo("#infopass", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#infopass", 1, {delay: 6, alpha: 0});
                            $('#btn_change_password').show();
                        }});
                }
            });

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

        $('#subscribe_btn').on('click', function (event) {
     
            event.preventDefault();
                   console.log('click');
            $(this).hide();
            if (!($("#subscibe_accept_terms_and_conditions").prop("checked"))) {
                show_info("#subscribe_info");
                $("#subscribe_info").html("* You must accept terms and conditions before click next button");
                $('#subscribe_btn').show();
                return false;
            }

            var cardholder_name = $("#cardholder_name").val();
            var valid_cardholder_name = /^[A-Za-z\s]+$/.test(cardholder_name);
            if (!valid_cardholder_name) {
                show_info("#subscribe_info");
                $("#subscribe_info").html("* Name on card only accepts letters and spaces");
                $('#subscribe_btn').show();
                return false;
            }

            var card_number = $("#card_number").val();
            var valid_card_number = /^[0-9]+$/.test(card_number);
            if (!valid_card_number) {
                show_info("#subscribe_info");
                $("#subscribe_info").html("* Card number only accepts numbers");
                $('.subscriber_button#btn_next').show();
                return false;
            }

            security_code = $("#security_code").val();
            var valid_security_code = /^[0-9]+$/.test(security_code);
            if (!valid_security_code) {
                show_info("#subscribe_info");
                $("#subscribe_info").html("* Security code only accepts numbers");
                $('#subscribe_btn').show();
                return false;
            }

            $('.other-op-btn').hide();
            $('#subscribe_preloader').html('Sending data...');
            $('#subscribe_preloader').show();
            pi_number = $('#card_number').val();
            pi_type = GetCardType($('#card_number').val());


            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/subscribe_ssl",
                type: 'POST',
                dataType: 'json',
                data: {
                    pi_month: $('#expiration_month').val(),
                    pi_year: $('#expiration_month').val() + '/' + $('#expiration_year').val(),
                    pi_type: pi_type,
                    pi_number: pi_number,
                    security_code: security_code,
                    subscription_id: subscription_id,
                }
            }).done(function (data) {

                if (data && data.status == 'ok') {

                    window.location.href = "<?php echo base_url(); ?>index.php/account/subscription_finished";
                } else {

                    $('#subscribe_preloader').hide();
                    $('#subscribe_btn').show();
                    $('.other-op-btn').show();
                    $("#subscribe_info").html("* " + data.message);
                    show_info("#subscribe_info");
                }
            });

            return false;
        });


        $("#subscribe_stored_cc_btn").on('click', function () {

            $("#stored_cc_btn_container").hide();
            $('#registration_preloader').html('Sending data...');
            $('#registration_preloader').show();

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/subscribe_by_stored_cc_ssl",
                type: 'POST',
                dataType: 'json',
                data: {
                    subscription_id: subscription_id
                }
            }).done(function (data) {

                if (data && data.status == 'ok') {

                    window.location.href = "<?php echo base_url(); ?>index.php/account/subscription_finished";
                } else {

                    $('#registration_preloader').hide();
                    $('#registration_preloader').html('');
                    $('#subscribe_stored_cc_btn').show();
                    $('.other-op-btn').show();
                    $(".form_info").html("* " + data.message);
                    show_info(".form_info");
                }
            });

            return false;
        });

        $('#save-subscription').on('click', function (event) {
            event.preventDefault();
            $(this).hide();
            $('#save_subs_preloader').html('Sending data...');
            $('#save_subs_preloader').show();
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/cancel_subscription_ssl",
                type: 'POST',
                dataType: 'json',
                data: {
                    contract_id: $('#contract_id').val(),
                }
            }).done(function (data) {
                $('#save_subs_preloader').hide();

                $('#save-subs-info').html(data.message);
                $('#save-subs-info').show();
                if (data && data.status !== 'ok') {
                    $('#cancel-subscription').show();

                    TweenLite.to("#save-subs-info", 1, {delay: 6, alpha: 0, onComplete: function () {
                            $('#save-subs-info').hide();
                            $('#save-subscription').show();

                        }});
                }

            });
            return false;
        });

        function show_info(info) {
        console.log('llega al show info');
            $(info).show();
            $('.form_info').show();
            TweenLite.fromTo(info, 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                    TweenLite.to(info, 1, {delay: 6, alpha: 0, onComplete: function () {
                            $(info).hide();
                        }});
                }});
        }

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
                <?php if (isset($card_type) && $card_type !== "") {
                    ?>
                    <li class='tab'><a href="#tab3" id="vod_item_sub_menu2">Billing Information</a></li>
                    <?php
                }
                ?>
                <li class='tab'><a href="#tab4" id="vod_item_sub_menu3">Pay-Per-View Tickets</a></li>
                <li class='tab'><a href="#tab5" id="vod_item_sub_menu4">Change password</a></li>
            </ul>
            <div class='panel-container'>
                <div id="tab1">

                    <div class="registration_container">
                        <form id="registerform" onsubmit="funtion(){
                                    return false;
                                }">
                            <ol>
                                <li>
                                    <label for="user_status">User Status</label>
                                    <input id="user_status" name="user_status" class="text" value="<?php echo $user_status; ?>" disabled="disabled"/>
                                </li>
                                <li>
                                    <label for="first_name">First Name</label>
                                    <input id="first_name" name="first_name" class="text editable-field" value="<?php echo $user_first_name; ?>" disabled="disabled"/>
                                </li>
                                <li>
                                    <label for="last_name">Last Name</label>
                                    <input id="last_name" name="last_name" class="text editable-field" value="<?php echo $user_last_name; ?>" disabled="disabled"/>
                                </li>
                                <li>
                                    <label for="email">Email</label>
                                    <input id="email" name="email" class="text" value="<?php echo $user_email; ?>" disabled="disabled" />
                                </li>
                                <li>
                                    <div class="col-right">
                                        <label for="address_line_1">Address Line 1</label>
                                        <input id="address_line_1" name="address_line_1" class="text editable-field" value="<?php echo $user_address_line1; ?>" disabled="disabled"/>
                                    </div>
                                    <div class="col-left">
                                        <label for="address_line_2">Address Line 2</label>
                                        <input id="address_line_2" name="address_line_2" class="text editable-field" value="<?php echo $user_address_line2; ?>" disabled="disabled"/>
                                    </div>
                                </li>

                                <li>
                                    <div class="col-right">
                                        <ul>
                                            <li>
                                                <label for="city">City</label>
                                                <input id="city" name="city" class="text editable-field" value="<?php echo $user_city; ?>" disabled="disabled"/>
                                            </li>
                                            <li>
                                                <label for="postal_code">Zip Code</label>
                                                <input id="postal_code" name="postal_code" class="text editable-field" value="<?php echo $user_zip_code; ?>" disabled="disabled"/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-left">
                                        <ul>
                                            <li>
                                                <label for="state">State</label>
                                                <input id="state" name="state" class="text editable-field" value="<?php echo $user_state; ?>" disabled="disabled"/>
                                            </li>
                                            <li>
                                                <label for="country">Country</label>
                                                <input id="country" name="country" class="text editable-field" value="<?php echo $user_country; ?>" disabled="disabled"/>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="buttons">
                                    <button id="edit_fields_btn" class="common_btn">EDIT</button>
                                    <button id="btn_save" class="common_btn">SAVE</button>
                                </li>
                                <li> 
                                    <p id="info" class="form_info">&nbsp;</p>
                                </li>
                                <li>
                                    <p id="save_data_preloader" class="form_info"></p>
                                </li>
                            </ol>
                        </form>  
                    </div>
                </div>
                <div id="tab2" style="padding-left:20px">
                    <div class="registration_container">
                        <?php
                        if (isset($subscription_data) && $subscription_data != "") {
                            ?>

                            <form method="post" id="cancelform">
                                <ol>
                                    <li>
                                        <label for="subscription_type">Type</label>
                                        <input id="subscription_type" class="text" style="width:180px;" value="<?php echo $subscription_data->title; ?>" readonly/>
                                    </li>
                                    <li>
                                        <label for="contract_status">Status</label>
                                        <input id="contract_status" class="text" style="width:150px;" value="<?php
                                        if ($subscription_data->active) {
                                            echo 'Active';
                                        } else {
                                            echo 'Inactive';
                                        }
                                        ?>" readonly/>
                                    </li>

                                    <li>
                                        <label for="contact_start_date">Subscribed since</label>
                                        <input id="contact_start_date" class="text" style="width:150px;" value="<?php echo date('Y-m-d', $subscription_data->{'contractStartDate'} / 1000); ?>" readonly/>
                                    </li>
                                    <li>
                                        <label for="contact_end_date">Subscription due date</label>
                                        <input id="contact_end_date" class="text" style="width:150px;" value="<?php echo date('Y-m-d', $subscription_data->{'contractEndDate'} / 1000); ?>" readonly/>
                                    </li>

                                    <li> 
                                        <p id="info" style="color:#fff;text-align:center;margin-left:120px;">&nbsp;</p>
                                    </li>
                                    <li class="buttons">
                                        <input id="contract_id" type="hidden" class="text" style="width:150px;" value="<?php echo $subscription_data->_id; ?>" />
                                        <?php
                                        if ($subscription_data->autoRenew) {
                                            ?>
                                            <button class="common_btn" id="save-subscription">CANCEL SUBSCRIPTION</button>
                                            <?php
                                        } else {
                                            ?>
                                            <p>Your subscription was cancelled. It remains active until <?php echo date('Y-m-d', $subscription_data->{'contractEndDate'} / 1000); ?></p>
                                            <?php
                                        }
                                        ?>
                                    </li>
                                    <li> 
                                        <p id="save_subs_preloader" class="form_info"></p>
                                        <p id="save-subs-info" class="form_info"></p>
                                    </li>
                                </ol>
                            </form>     
                            <?php
                        } else {
                            ?>

                            <div class="registration_title_payment">WANT TO BECOME <br class="rwd-break"> A SUBSCRIBER?</div>

                            <?php
                            if (sizeof($subscriptions) > 0) {
                                $this->load->view(views_url() . 'templates/select_subscription');
                            }

                            if (isset($card_type) && $card_type !== "") {
                                $display_current_cc = 'style="display: block;"';
                                $display_new_cc = 'style="display: none;"';
                            } else {
                                $display_current_cc = 'style="display: none;"';
                                $display_new_cc = 'style="display: block;"';
                            }
                            ?>
                            <form method="post" id="subscription_form" style="display: none;">
                                <div id="current_credit_card_container" <?php echo $display_current_cc; ?>>
                                    <ul>
                                        <?php
                                        $this->load->view(views_url() . 'templates/change_credit_card');
                                        ?>
                                        <li id= "terms_and_conditions" style="margin-top: 10px">
                                            <div style="display: inline-block;"><input id="accept_terms_and_conditions" type="checkbox" /></div>   
                                            <div style="display: inline-block;">Accept <a href="<?php echo base_url() . 'index.php/static_content/terms_conditions_subscribers'; ?>" target="_blank" class="terms_and_conditions">Terms and Conditions</a>*</div></li>
                                        <li> 
                                        <li> 
                                            <p id="change_cc_info" class="form_info">&nbsp;</p>
                                        </li>
                                        <li id="stored_cc_btn_container" class="buttons" style="margin-top: 25px;">
                                            <button class="other-op-btn">Select other Plan</button>
                                            <button id="change_credit_card_btn">Change Credit<br>Card</button>
                                            <button id="subscribe_stored_cc_btn" class="subscriber_button">Subscribe</button>
                                        </li>
                                        <li>
                                            <div id="registration_preloader" class="preloader_obj"></div>
                                            <div class="clr"></div>
                                        </li>
                                    </ul>
                                </div>

                                <div id="new_credit_card_container" <?php echo $display_new_cc; ?>>
                                    <?php
                                    $this->load->view(views_url() . 'templates/credit_card_form');
                                    ?>

                                    <li id= "terms_and_conditions" style="margin-top: 10px">
                                        <div style="display: inline-block;"><input id="subscibe_accept_terms_and_conditions" type="checkbox" /></div>   
                                        <div style="display: inline-block;">Accept <a href="<?php echo base_url() . 'index.php/static_content/terms_conditions_subscribers'; ?>" target="_blank" class="terms_and_conditions">Terms and Conditions</a>*</div></li>
                                    <li> 
                                        <p id="subscribe_info" class="form_info">&nbsp;</p>
                                    </li>
                                    <li class="buttons">
                                        <button class="other-op-btn">Select other Plan</button>
                                        <?php
                                        if (isset($card_type) && $card_type !== "") {
                                            ?>
                                            <button id="use_stored_cc" class="other-op-btn">Use stored<br>Credit Card</button>
                                            <?php
                                        }
                                        ?>
                                        <button id="subscribe_btn" class="subscriber_button">Subscribe</button>
                                        <div id="subscribe_preloader" class="preloader_obj"></div>
                                        <div class="clr"></div>
                                    </li>
                                    </ol>
                                </div>

                            </form>   

                            <?php
                        }
                        ?>
                    </div>
                </div>
                <?php if (isset($card_type) && $card_type !== "") {
                    ?>

                    <div id="tab3" style="padding-left:20px">
                        <div class="registration_container">
                            <form style="margin-right: 50px;">
                                <ul>
                                    <?php
                                    $this->load->view(views_url() . 'templates/change_credit_card');
                                    ?>
                                    <li>
                                        <button id="edit_credit_card_btn" class="common_btn">CHANGE CREDIT CARD</button>
                                    </li>
                                </ul>
                            </form>
                            <div id="change_cc_container" class=" col-right payment_content" style="display: none;">
                                <form id="change_credit_card_form" >

                                    <?php $this->load->view(views_url() . 'templates/credit_card_form'); ?>
                                    <li> 
                                        <p id="save_cc_info" class="form_info">&nbsp;</p>
                                    </li>
                                    <li>
                                        <div id="cc_buttons">
                                            <button id="save_credit_card" class="common_btn billing_btns">SAVE CREDIT CARD</button>
                                            <button id="cancel_credit_card" class="common_btn billing_btns">CANCEL</button>
                                        </div>
                                        <p id="change_cc_preloader" class="form_info">Sending data...</p>
                                    </li>
                                    </ol>
                                </form>
                            </div>

                        </div>

                    </div>
                    <?php
                }
                ?>

                <div id="tab4" style="padding-left:20px">

                    <?php
                    if (isset($events) && sizeof($events->content) > 0) {
                        ?>

                        <div class="information_content" style="background-color: rgba(255,255,255,0.1);min-height:400px;">

                            <?php
                            $flag = 0;
                            for ($i = 0; $i < sizeof($events->content); $i++) {

                                if (isset($events->content[$i]->already_purchased) && $events->content[$i]->already_purchased == true) {
                                    $flag = 1;
                                    if (isset($events->content[$i]->live_now) && $events->content[$i]->live_now) {
                                        $live_txt = '<div style="float:right;width:120px;margin-right:30%"><button type="submit" id="btn_watch_now" class="send btn_watch_now">Watch Now</button></div>';
                                    } else {
                                        $live_txt = '<div style="float:right;margin-right:30%">ALREADY PURCHASED!</div>';
                                    }
                                    echo '<div style="float:left;line-height:45px;width:100%;">' . date('d-m-Y', $events->content[$i]->event_date / 1000) . ' - ' . $events->content[$i]->name . $live_txt . '</div>';
                                }
                            }
                            if (!$flag) {
                                ?>
                                <div class="buy_events_link"><span>You don't have any pay-per-view tickets yet.</span><br><a href="<?php echo base_url() . 'index.php/live_events/buy_events_ssl'; ?>">Buy Now!</a></div>
                                <?php
                            }
                            ?>
                            <div class="dc_clear"></div>

                        </div>
                        <?php
                    }
                    ?>


                </div>

                <!-- TAB 5: Change Password -->
                <div id="tab5">

                    <div class="registration_container" style="min-height:400px;">
                        <form id="changepasswordform" method="post">
                            <ol>

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
