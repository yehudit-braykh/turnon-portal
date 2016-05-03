<div class="container-fluid form_cont">

    <div class="col-sm-1"></div>

    <div class="col-sm-10">
        <div class="form_title">Buy Tickets</div>

        <div class="col-sm-12 title_event_separator"></div>


        <!--bucle-->

        <?php
        for ($i = 0; $i < sizeof($events->content); $i++) {
            if (isset($subscription_data) && sizeof($subscription_data) > 0) {
                for ($h = 0; $h < sizeof($subscription_data); $h++) {
                    if ($events->content[$i]->id === $subscription_data[$h]->productId) {

                        $buy_column = '<div class="col-sm-2 already_purchased"><div>ALREADY<br/>PURCHASED</div><a href="' . base_url() . 'index.php/live_events/main"></div><div class="col-sm-2 col_button"><button type="button" class="btn btn-default btn-sm watch_now_btn">WATCH NOW!</button></a></div>';
                        break;
                    } else {
                        $buy_column = '<div class="col-sm-2 product_conditions"><div class="product_price">$ ' . $events->content[$i]->price . '</div></div><div class="col-sm-2 col_button"><button type="button" class="btn btn-default btn-sm buy_button">BUY NOW!</button></div>';
                    }
                }
            } else {
                $buy_column = '<div class="col-sm-2"><div class="product_price">$ ' . $events->content[$i]->price . '</div></div><div class="col-sm-2 col_button"><button type="button" class="btn btn-default btn-sm buy_button">BUY NOW!</button></div>';
            }
            ?>

            <div class="col-sm-12 product_id" id="<?php echo $events->content[$i]->id ?>">

                <div class="col-sm-2 product_image">
                    <img src="<?php echo $events->content[$i]->image; ?>">
                </div>

                <div class="col-sm-6 product_content">
                    <div class="product_title">
                        <?php echo $events->content[$i]->name; ?>
                    </div>
                    <div class="product_description">
                        <?php echo date('l, F d, Y - H:i', ($events->content[$i]->event_date / 1000)) . ' Hours EST'; ?>
                        <!--<?php //echo date('F d, H:i',$events->content[$i]->event_date/1000).' hs.'; ?>-->
                    </div>
                </div>

                <?php
                echo $buy_column;
                ?>

            </div>
            <?php
        }
        ?>

        <!--end bucle-->

    </div>

    <div class="col-sm-1"></div>

</div>


<!--script-->

<script>

    $(document).ready(function () {

        $(document).on('click', '.buy_button', function () {

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/live_events/checkout_event_ssl",
                type: 'POST',
                dataType: 'json',
                data: 'product_id=' + $(this).parents('.product_id').attr('id')
            }).done(function (data) {

                if (data.status === 'ok') {
                    window.location.href = '<?php echo base_url(); ?>index.php/live_events/event_payment_ssl';
                } else {

                    window.location.href = '<?php echo base_url(); ?>index.php/account/signin';

                }
            });
        });
    })

</script>