<script>
    $(document).ready(function () {

        $('.plan').hover(function () {
            $('.plan').removeClass('most-popular');
            $(this).addClass('most-popular');
        })

        $('.dc_pricing_button').on('click', function (event) {
            event.preventDefault();
            $('#main-skip').hide();
            $('.subscription_details').hide();
            subscription_id = $(this).parents('.plan').attr('id');
            $(this).parents('.plan').addClass('selected_pricing');
            $(this).hide();
            TweenLite.fromTo($(this).parents('.plan').siblings(), 0, {alpha: 1}, {alpha: 0, onComplete: function () {
                    $('.selected_pricing').siblings().hide();
                    $('#subscription_form').show('600');
                }});

        });

        $('.other-op-btn').on('click', function (event) {
            event.preventDefault();
            $('#subscription_form').hide();
            $('.selected_pricing').siblings('.plan').show();
            $('.subscription_details').show();
            TweenLite.fromTo($('.selected_pricing').siblings('.plan'), 0, {alpha: 0}, {alpha: 1, onComplete: function () {
                    $('.plan.selected_pricing').find('.dc_pricing_button').show();
                    $('.plan.selected_pricing').removeClass('most-popular');
                    $('.plan.selected_pricing').removeClass('selected_pricing');
                    $('#main-skip').show();

                }});

        })

    });
</script>



<?php
for ($i = 0; $i < sizeof($subscriptions); $i++) {
    $subscription_id = getEntryId($subscriptions[$i]);
    $subscription_amount = $subscriptions[$i]->billingSchedule[0]->amount;
    $arr = explode('.', $subscription_amount);
    if (sizeof($arr) == 1) {
        $cents = '.00';
    } else {
        $cents = '.' . $arr[1];
    }

    if (intval($subscriptions[$i]->subscriptionLength > 1)) {
        $months_txt = 'Cada ' . $subscriptions[$i]->subscriptionLength . ' meses';
    } else {
        $months_txt = 'por mes';
    }
    ?>
    <div id="dc_pricingtable01">
        <?php
        if (sizeof($subscriptions) > 0) {
            for ($i = 0; $i < sizeof($subscriptions); $i++) {
                $subscription_id = getEntryId($subscriptions[$i]);
                $subscription_amount = $subscriptions[$i]->billingSchedule[0]->amount;
                $arr = explode('.', $subscription_amount);
                if (sizeof($arr) == 1) {
                    $cents = '.00';
                } else {
                    $cents = '.' . $arr[1];
                }

                if (intval($subscriptions[$i]->subscriptionLength > 1)) {
                    $months_txt = 'Cada ' . $subscriptions[$i]->subscriptionLength . ' meses';
                } else {
                    $months_txt = 'por mes';
                }
                ?>

                <div class="plan" id="<?php echo $subscription_id; ?>">
                    <?php
                    if (!isset($_SESSION['is_subscriber']) || (isset($_SESSION['is_subscriber']) && !$_SESSION['is_subscriber'])) {
                        ?>
                        <h4>7 días de prueba gratis</h4>
                        <h4>+</h4>
                        <?php
                    }
                    ?>
                    <h3><?php echo $subscriptions[$i]->title ?>
                        <span><?php echo '$' . $arr[0]; ?><?php echo $cents . '<br>'; ?>
                            <?php
                        if ($subscriptions[$i]->description) {
                            ?>
                            <div class="price_subtitle">
                                <?php echo $subscriptions[$i]->description; ?>
                            </div>
                            <?php
                        }
                        ?>
                        </span>

                    </h3>
                    <ul>
                        <br />
                        

                       
                        <li><?php echo $months_txt; ?></li>
                        <li>Acceso a 7 señales en vivo<br>(4 TV + 3 Radio)</li>
                        <li><b>Acceso sin restricciones a nuestro catálogo de video a la carta</b></li>
                        <li>Visualización en <b>3</b> pantallas simultáneamente</li>
                        <li>Para ver en su <b>ordenador</b>, <b>teléfono celular</b> y <b>tablet</b></li>

                        <br /><a href="#" class="dc_pricing_button blue">Comprar</a><!-- additional options: small, rounded, large, light_blue, blue, green, red, orange, yellow, pink, purple, grey, black -->
                    </ul>
                </div>

                <?php
            }
        }
        ?>
    </div>

    <?php
}
?>
<div class="subscription_details">
    <ol>
        <li>
            * Luego del periodo de prueba se debitará de su tarjeta de crédito el importe del plan que haya elegido.
        </li>
        <li>
            * Sera notificado 2 dias antes de que acabe el periodo de prueba. 2 dias despues de esta notificacion el importe del plan elegido sera debitado de su tarjeta.
        </li>
        <li>
            * Los planes de subscripcion seran renovados automaticamente cuando finalice el periodo de subscripcion del plan elegido. Si usted desea desactivar esta opcion, puede hacerlo en cualquier momento visitando la seccion "Mi Cuenta".
        </li>
    </ol>
</div>