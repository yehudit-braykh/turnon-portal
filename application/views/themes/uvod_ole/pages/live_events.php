<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/flipclock/flipclock.min.js"></script>
<link rel="stylesheet" href="<?php echo common_asset_url(); ?>js/flipclock/flipclock.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/events_slider.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/my_carousel.css">
<script type='text/javascript' src="<?php echo common_asset_url(); ?>js/wurfl.js"></script>
​<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key = "BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script type="text/javascript">

<?php echo 'base_url = "' . base_url() . '";'; ?>


    $(window).load(function () {
        $('#events_slider').flexslider({
            animation: "slide",
            itemWidth: 240,
            slideshow: false,
            animationLoop: false,
            controlNav: false,
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


<div class="container">

    <div id="event-template">
        <?php $this->load->view(views_url() . 'templates/event-detail'); ?>
    </div>

</div>
       
<div class="carousel-container col-lg-12">

    <?php
    if (isset($events->content) && sizeof($events->content) > 0) {
        ?>
    <div class="slider-title"><h3>Scheduled Events</h3></div>
        <!--<div class="col-md-6">-->
        <div id="events_slider" class="flexslider">
            <ul class="slides">

                <?php
                $data = $events->content;
                for ($i = 0; $i < sizeof($data); $i++) {
                    if ($data[$i]->live_now) {
                        $event_item_overlay = '<span class="item-carousel-subtitle"> LIVE NOW!</span>';
                        ?>
                        <?php
                    } else {
                        //$event_item_overlay = '<span class="item-carousel-date">' . date('d-m H:i', ($data[$i]->event_date / 1000)) . ' hs</span>';
                    }

                    if ($i == 0) {
                        ?>
                        <li class="carousel-item" product-id='<?php echo $data[$i]->id; ?>'>
                            <div class="slider-first-element">
                                <img src="<?php echo $data[$i]->image; ?>" />
                                <div class="slider-caption">
                                    <div class="first-item-carousel-title"><span><?php echo $data[$i]->name; ?></span></div><br>
                                    <div class="first-item-carousel-date">
                                        <span><?php echo date('d-m H:i', ($data[$i]->event_date / 1000)); ?> hs</span>
                                        <?php echo $event_item_overlay; ?>
                                    </div>
                                </div>


                            </div>
                        </li>
                        <?php
                    } else {
                        ?>
                        <li class="carousel-item" product-id='<?php echo $data[$i]->id; ?>'>
                            <div class="slide-img-content">
                                <img src="<?php echo $data[$i]->image; ?>" />
                            </div>
                            <span class="item-carousel-title"><?php echo $data[$i]->name; ?></span><br>
                            <span class="item-carousel-date"><?php echo date('d-m H:i', ($data[$i]->event_date / 1000)); ?> hs</span>
                            <p class="item-description"><?php echo $data[$i]->description;?></p>
                        </li>


                        <?php
                    }
                }
                ?>
            </ul>
        </div>
    </div>
    </div>

    <?php
}
?>


