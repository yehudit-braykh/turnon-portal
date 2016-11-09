


<script type="text/javascript">

    $(function () {

        function show_info() {
            TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                    TweenLite.to("#info", 1, {delay: 6, alpha: 0});
                }});
        }

        $('#btn_next').on('click', function (event) {
            $(this).hide();
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

            var security_code = $("#security_code").val();
            var valid_security_code = /^[0-9]+$/.test(security_code);
            if (!valid_security_code) {
                show_info();
                $("#info").html("* 'Código de Seguridad' sólo acepta números");
                $('#btn_next').show();
                return false;
            }

            $('#btn_skip').hide();
            $('#registration_preloader').html('Enviando datos...');
            $('#registration_preloader').show();
            pi_number = $('#card_number').val();
            pi_type = GetCardType($('#card_number').val());
            $.ajax({
                url: "<?php echo base_url(); ?>index.php/live_events/subscribe_ssl",
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
            window.location.href = "<?php echo base_url(); ?>index.php/live_events/buy_events_ssl";
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
        <div class="col-sm-6"><div class="form_title">Comprar Boletos</div></div>
        <div class="col-sm-3"></div>
    </div>






    <div class="col-sm-12">

        <div class="col-sm-3"></div>

        <div class="col-sm-3">

            <div id='event-confirm-section'>
                <div class="text1_box">COMPRA TOTAL</div>

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

                <div class="text3_box">Al presionar CONFIRMAR PAGO, la transacción será procesada y no podrá ser revertida.</div>

                <div class="text3_box">Si ha cometido un error, utilice este botón para corregir:</div>

                <button type="submit" id="btn_modify" class="btn btn-default btn-md btn_modify">Modificar selección</button>

            </div>

        </div>



        <div class="col-sm-3 form_buy_tickets">



            <form method="post" id="payment_form">

                <ol>
<?php $this->load->view(views_url() . 'templates/payment_form'); ?>
                    <li class="buttons">
                        <button type="submit" id="btn_next" class="send">CONFIRMAR PAGO</button>
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

