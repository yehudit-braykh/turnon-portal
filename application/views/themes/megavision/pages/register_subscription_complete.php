<?php 
$available_subscription_labels = $this->config->item('available_subscription_labels');
$available_subscription_prices = $this->config->item('available_subscription_prices');
?>
<script type="text/javascript">

	<?php if(!empty($_GET['s_id']) && !empty($available_subscription_labels[$_GET['s_id']]) && !empty($available_subscription_prices[$_GET['s_id']])): ?>
	<?php 
	$current_subscription = $available_subscription_labels[$_GET['s_id']]; 
	$current_subscription_price = $available_subscription_prices[$_GET['s_id']];
	?>
	//e-commerce code on subscribe thank you page only - immediately after ga('create',
	ga('require', 'ecommerce');

	ga('ecommerce:addTransaction', {
	'id': '<?php echo uniqid(); ?>', // Transaction ID. Required. - Unique number
	'affiliation': '', // store name.
	'revenue': '<?php echo $current_subscription_price; ?>', // total revenue.
	'shipping': '', // Shipping.
	'tax': '' // Tax.
	});

	ga('ecommerce:addItem', {
		'id': '<?php echo uniqid(); ?>', // Transaction ID. Required. Same as in the transaction data.
		'name': '<?php echo $current_subscription; ?>', // Product name. Required.
		'sku': '<?php echo $current_subscription; ?>', // Product SKU. - required - unique value
		'category': 'subscription', // Product Category or variation.
		'price': '<?php echo $current_subscription_price; ?>', // Product price.
		'quantity': '1' // Product Quantity.
	});

	ga('ecommerce:send');
	<?php endif; ?>

    $(function () {

        //_gaq.push(['_trackEvent', 'Registration', 'Register complete']);
		ga('send', {hitType: 'event', eventCategory: 'User Type', eventAction: 'Subscribe', eventLabel: 'Subscription Complete'});
        
        $('#send_activation_email_register_button').click(function () {

            event.preventDefault();
            $(this).hide();
            $('#send_activation_email_preloader').show();
            $('#send_activation_email_preloader').html('Enviando email de activación...');

            $.ajax({
                url: '<?php echo base_url(); ?>index.php/account/send_activation_email_register',
                type: 'POST',
                dataType: 'json',
            }).done(function (data) {
                if (data.status == 'ok') {

                    $('#send_activation_email_preloader').hide();
                    $('#send_activation_email_register_button').hide();
                    show_info(data);

                } else if (data.status == 'error') {

                    $('#send_activation_email_preloader').hide();
                    $('#send_activation_email_register_button').show();
                    show_info(data);
                }
                else {
                    window.location.href = '<?php echo base_url(); ?>' + 'index.php/account/signin';
                }
            });

        });

    });
</script>
</div>
</div>
</div>

<!-- content -->
<div class="content_centered">
    <div class="now_page_resize">
        <div class="form_title">Su pago se realizó con éxito!</div>
        <div class="form_subtitle">Ya puede disfrutar de todo nuestro contenido exclusivo.</div>
         <div class="form_subtitle">Gracias por registrarse con nosotros.</div>
        <div class="clr"></div>
    </div>
    <?php
    if (isset($_SESSION['registration_data']->method) && $_SESSION['registration_data']->method == 'email') {
        ?>
<!--        <div class="now_page_resize">
            <div class="form_title">Please check your email <br class="rwd-break"> for a link to complete <br class="rwd-break"> your registration</div>
            <div class="form_subtitle">Thanks for registering with us.</div>
            <div class="clr"></div>
            <div class="form_title_hint">The activation email may <br class="rwd-break"> take 1 hour to arrive</div>
            <div class="clr"></div>
        </div>

        <div class="wrapper_form_subtitle">
            <div class="form_subtitle"><a href="<?php //echo base_url() . "index.php/static_content/faqs"; ?>">I have not received an email. What do I do?</a></div>
            <input type='image' id="send_activation_email_register_button" class="send" src="<?php //echo asset_url(); ?>images/button_resend_activation_email.png"/>
            <div id="send_activation_email_preloader"></div>
            <div class="clr"></div>

                <div class="form_buttons_centered">
                  <input type="image" name="imageField" id="imageField" src="<?php //echo asset_url();    ?>images/button_login.png" class="send" onclick="window.location.href='<?php echo base_url(); ?>index.php/account/signin' " />
                </div>
        </div>-->
    <?php } ?>
</div>

<!-- /content -->