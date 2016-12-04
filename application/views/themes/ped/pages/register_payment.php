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
                $("#info").html("* Debe aceptar los Términos y Condiciones antes de apretar el botón 'SIGUIENTE'");
                $('#btn_next').show();
                return false;
            }

            var cardholder_name = $("#cardholder_name").val();
            var valid_cardholder_name = /^[A-Za-z\s]+$/.test(cardholder_name);
            if (!valid_cardholder_name) {
                show_info();
                $("#info").html("* 'Titular de la Tarjeta de Crédito' sólo acepta letras y espacios en blanco");
                $('#btn_next').show();
                return false;
            }

            var card_number = $("#card_number").val();
            var valid_card_number = /^[0-9]+$/.test(card_number);
            if (!valid_card_number) {
                show_info();
                $("#info").html("* 'Número de Tarjeta' sólo acepta números");
                $('#btn_next').show();
                return false;
            }

            security_code = $("#security_code").val();
            var valid_security_code = /^[0-9]+$/.test(security_code);
            if (!valid_security_code) {
                show_info();
                $("#info").html("* 'Código de Seguridad' sólo acepta números");
                $('#btn_next').show();
                return false;
            }

            $('#btn_skip').hide();
            $('.other-op-btn').hide();
            $('#registration_preloader').html('Enviando datos...');
            $('#registration_preloader').show();
            pi_number = $('#card_number').val();
            pi_type = GetCardType($('#card_number').val());

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
                    security_code: security_code}
            }).done(function (data) {

                if (data && data.status == 'ok') {

                    window.location.href = "<?php echo base_url(); ?>index.php/account/register_subscription_complete/?s_id="+subscription_id;
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

        <div class="registration_title_payment">DESEO CONVERTIRME <br class="rwd-break"> EN SUSCRIPTOR</div>

        <?php
        if (sizeof($subscriptions) > 0) {
            $this->load->view(views_url() . 'templates/select_subscription');
            ?>
            <div style="width:100%;text-align: center">
                <button id="main-skip" class="skip-payment">OMITIR Y CONTINUAR LA REGISTRACIÓN</button>
            </div>
            <?php
        }
        ?>
        <form method="post" id="subscription_form" style="display: none;">
            <?php
            $this->load->view(views_url() . 'templates/credit_card_form');
            ?>
            <li id= "terms_and_conditions" style="margin-top: 10px">
                <div style="display: inline-block;"><input id="accept_terms_and_conditions" type="checkbox" /></div>   
                <div style="display: inline-block;">Aceptar <a href="<?php echo base_url() . 'index.php/static_content/terms_conditions_subscribers'; ?>" target="_blank" class="terms_and_conditions">Términos y Condiciones</a>*</div></li>
            <li> 
                <p id="info" class="form_info">&nbsp;</p>
            </li>
            <li class="buttons">
                <button class="other-op-btn">SELECCIONAR OTRO PLAN</button>
                <button id="btn_skip" class="skip-payment">OMITIR Y CONTINUAR LA REGISTRACIÓN</button>
                <button id="btn_next">SIGUIENTE</button>
                <div id="registration_preloader"></div>
                <div class="clr"></div>
            </li>
            </ol>

        </form>              

    </div>
</div>
<!-- /content -->