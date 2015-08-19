<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/flipclock/flipclock.min.js"></script>
<link rel="stylesheet" href="<?php echo common_asset_url(); ?>js/flipclock/flipclock.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/my_carousel.css">
<script type='text/javascript' src="<?php echo common_asset_url(); ?>js/wurfl.js"></script>
​<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key = "BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script type="text/javascript">

<?php echo 'base_url = "' . base_url() . '";'; ?>


    $(window).load(function () {
        $('#events_slider').flexslider({
            animation: "slide",
            itemWidth: 210,
            slideshow: false
        });

    });

    $(document).ready(function () {

        $('.carousel-item').on('click', function (event) {
            event.preventDefault();
            product_id = $(this).attr('product-id');
            $.ajax({
                url: base_url + 'index.php/live_events/get_event',
                type: 'POST',
                data: 'product_id=' + product_id,
                beforeSend: function () {
                    $('#event-template').css('height', '450px');
                    $('#event-template').html('<div id="event-loading" class="col-md-12">Loading....</div>');

                },
                success: function (data) {
                    $('#event-template').html(data);
                }
            });
        });

    });



</script>




    <div id="event-template">
        <?php $this->load->view(views_url() . 'templates/event-detail'); ?>
    </div>
<div class="uvod-container">

<div class="carousel-container">

    <?php
    if (isset($events->content) && sizeof($events->content) > 0) {
        ?>
        <!--<div class="col-md-12"><h3>Scheduled Events</h3></div>-->
        <!--<div class="col-md-6">-->
        <div id="events_slider" class="flexslider">
            <ul class="slides">

                <?php
                $data = $events->content;
                for ($i = 0; $i < sizeof($data); $i++) {
                    if ($data[$i]->live_now) {
                        $event_item_overlay = '<span class="item-carousel-subtitle">LIVE NOW</span>';
                    } else {
                        $event_item_overlay = '<span class="item-carousel-date">' . date('d-m H:i', ($data[$i]->event_date / 1000)) . ' hs</span>';
                    }
                    ?>
                    <li class="carousel-item" product-id='<?php echo $data[$i]->id; ?>'>

                        <img src="<?php echo $data[$i]->image; ?>" />
                        <span class="item-carousel-title"><?php echo $data[$i]->name; ?></span><br>
                        <?php echo $event_item_overlay; ?>
                    </li>


                    <?php
                }
                ?>
            </ul>
        </div>
    </div>
</div>

    <?php
}
?>


