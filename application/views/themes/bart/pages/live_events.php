<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/flipclock/flipclock.min.js"></script>
<link rel="stylesheet" href="<?php echo common_asset_url(); ?>js/flipclock/flipclock.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/events_slider.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/my_carousel.css">
<script type='text/javascript' src="<?php echo common_asset_url(); ?>js/wurfl.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key = "BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script type="text/javascript">

<?php echo 'base_url = "' . base_url() . '";'; ?>


    $(window).load(function () {
        $('#events_slider').flexslider({
            animation: "slide",
            itemWidth: 290,
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

 function button_play_clickHandler() {

            $('.player_container').css('background-color','#000');
            $('.player_container .col-sm-2').css('min-height','1px');
            $('.player_container .col-sm-8').css('min-height','1px');
            $('#event_player_container').show();
            $('#event_player_close').show();
                        $('.carousel-container').css({display: "none"});
                    $('.event-detail-result').css({display: "none"});
                    $('.footer').css({display: "none"});

            setup_player();
            TweenMax.set("#event_player_container", {height: "auto"});
            TweenMax.from("#event_player_container", 1, {height: 0});
            TweenMax.fromTo("#event_player_close", 1, {alpha: 0}, {alpha: 1});

        }

function setup_player(){
     <?php
    if (isset($events->content) && sizeof($events->content) > 0) {
        $data = $events->content[0];
        if ($data->live_now && isset($data->already_purchased) && $data->already_purchased) {
            ?>
                            stream_url = "<?php echo $data->streaming_url; ?>";
                            jwplayer("jw_live_player").setup({
                                file: stream_url,
                                width: '100%',
                                androidhls: true,
                                autostart: true,
                                aspectratio: "16:9"
                            });

            <?php
        }
    }
    ?>
}

        function button_close_clickHandler() {
            TweenMax.to("#event_player_container", 1, {height: 0});
            TweenMax.to("#event_player_close", 1, {alpha: 0, onComplete: function() {
            $("#event_player_container").hide();
            $("#event_player_close").hide();
            $('.player_container .col-sm-2').css('min-height','0px');
            $('.player_container .col-sm-8').css('min-height','0px');
            $('#back_button_container').show();
            $('.carousel-container').css({display: "block"});
            $('.event-detail-result').css({display: "block"});
            $('.footer').css({display: "block"});
    }});
        }

</script>

<div class="container-fluid player_container">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    
                    <div id="event_player_container">
                        <div id="jw_live_player">Loading the player...</div>
                    </div>
                    <div id="event_player_close"><a href="#" onclick="button_close_clickHandler()">close</a></div>

                </div>
                <div class="col-sm-2"></div>
            </div>


    <div id="event-template">
        <?php $this->load->view(views_url() . 'templates/event-detail'); ?>
    </div>


       
<div class="carousel-container col-sm-12 carousel-events">

    <?php
    if (isset($events->content) && sizeof($events->content) > 0) {
        ?>
    <div class="category-title">Scheduled Events</div>
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
                        $event_item_overlay = '';
                    }

                    if ($i == 0) {
                        ?>
                        <li class="carousel-item" product-id='<?php echo $data[$i]->id; ?>'>
                            <div class="slider-first-element">
                                <img src="<?php echo $data[$i]->image; ?>" />
                                <div class="slider-caption">
                                    <div class="first-item-carousel-title"><span><?php echo $data[$i]->name; ?></span></div><br>
                                    <div class="first-item-carousel-date">
                                        <?php echo $event_item_overlay; ?>
                                        <span><?php echo date('d-m H:i', ($data[$i]->event_date / 1000)); ?> hs</span>
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


