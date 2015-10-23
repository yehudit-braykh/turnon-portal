<script>
    $(document).ready(function () {
        $('.registration_pricing').on('click', function () {
            auto_renew = $(this).find(".auto-renew").is(":checked");
            subscription_id = $(this).attr('id');
            $(this).addClass('selected_pricing');
            $('.main-skip').hide();
            $(this).siblings('.registration_pricing').animate({opacity: 0}, 'slow', function () {
                $('.selected_pricing').siblings('.registration_pricing').hide();
                $('#subscribe-form').show('600');
            });


        });

        $('.other-op-btn').on('click', function (event) {
            event.preventDefault()
            $('#subscribe-form').hide();
            $('.main-skip').show();
            $('.selected_pricing').siblings('.registration_pricing').show();
            $('.selected_pricing').siblings('.registration_pricing').animate({opacity: 1}, 'slow', function () {
                $('.selected_pricing').removeClass('selected_pricing');
            });

        });

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
    <div class="registration_pricing" id="<?php echo $subscription_id; ?>">
        <div class="dc_pricingtable04">
            <ul class="price-box" style="width:100%;">
                <li class="pricing-header glass_blue">
                    <ul>
                        <li class="title"><?php echo $subscriptions[$i]->title ?></li>
                        <li class="price"><span class="currency">$</span><span class="big"><?php echo $arr[0]; ?></span><span class="small"><?php echo $cents; ?></span></li>
                        <li class="month-label"><?php echo $months_txt; ?></li>
                        <li><input class="auto-renew"type="checkbox" id="<?php echo 'chbx-' . $i ?>" checked="checked"/>Auto-renew</li>
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

    <?php
}
?>
