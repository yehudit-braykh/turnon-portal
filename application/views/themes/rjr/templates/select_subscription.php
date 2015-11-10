<script>
    $(document).ready(function () {

        $('.plan').hover(function () {
            $('.plan').removeClass('most-popular');
            $(this).addClass('most-popular');
        })

        $('.dc_pricing_button').on('click', function (event) {
            event.preventDefault();
            $('#main-skip').hide();
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
    $subscription_amount = $subscriptions[$i]->{'plsubscription$billingSchedule'}[0]->{'plsubscription$amounts'}->USD;
    $arr = explode('.', $subscription_amount);
    if (sizeof($arr) == 1) {
        $cents = '.00';
    } else {
        $cents = '.' . $arr[1];
    }

    if (intval($subscriptions[$i]->{'plsubscription$subscriptionLength'} > 1)) {
        $months_txt = 'Each ' . $subscriptions[$i]->{'plsubscription$subscriptionLength'} . ' Months';
    } else {
        $months_txt = 'Per Month';
    }
    ?>
    <div id="dc_pricingtable01">
        <?php
        if (sizeof($subscriptions) > 0) {
            for ($i = 0; $i < sizeof($subscriptions); $i++) {
                $subscription_id = getEntryId($subscriptions[$i]);
                $subscription_amount = $subscriptions[$i]->{'plsubscription$billingSchedule'}[0]->{'plsubscription$amounts'}->USD;
                $arr = explode('.', $subscription_amount);
                if (sizeof($arr) == 1) {
                    $cents = '.00';
                } else {
                    $cents = '.' . $arr[1];
                }

                if (intval($subscriptions[$i]->{'plsubscription$subscriptionLength'} > 1)) {
                    $months_txt = 'Each ' . $subscriptions[$i]->{'plsubscription$subscriptionLength'} . ' Months';
                } else {
                    $months_txt = 'Per Month';
                }
                ?>

                <div class="plan" id="<?php echo $subscription_id; ?>">
                    <h3><?php echo $subscriptions[$i]->title ?><span><?php echo '$' . $arr[0]; ?><?php echo $cents; ?></span></h3>
                    <ul>
                        <br />
                        <li><?php echo $months_txt; ?></li>
                        <li><b>+300</b> VOD Clips</li>
                        <li><b>5</b> Live Channels</li>
                        <li><b>Unlimited access to our VOD Catalog.</b></li>

                        <br /><a href="#" class="dc_pricing_button blue">Buy Now</a><!-- additional options: small, rounded, large, light_blue, blue, green, red, orange, yellow, pink, purple, grey, black -->
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
