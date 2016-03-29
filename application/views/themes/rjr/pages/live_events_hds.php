<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/flipclock/flipclock.min.js"></script>
<link rel="stylesheet" href="<?php echo common_asset_url(); ?>js/flipclock/flipclock.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/events_slider.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/my_carousel.css">
<script type='text/javascript' src="<?php echo common_asset_url(); ?>js/wurfl.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key = "BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script type="text/javascript">

function mobileAndTabletcheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

<?php echo 'base_url = "' . base_url() . '";'; ?>


    $(window).load(function () {
        $('#events_slider').flexslider({
            animation: "slide",
            itemWidth: 420,
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

                    $('#event-template').html('<div id="event-loading" class="col-md-12">Loading....</div>');

                },
                success: function (data) {
                    $('#event-template').html(data);
                }
            });
        });

    });

    function button_play_clickHandler() {

        $('.player_container').css('background-color', '#000');
        $('.player_container .col-sm-2').css('min-height', '1px');
        $('.player_container .col-sm-8').css('min-height', '1px');
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

    function setup_player() {
<?php
if (isset($events->content) && sizeof($events->content) > 0) {
    $data = $events->content[0];
    if ($data->live_now && isset($data->already_purchased) && $data->already_purchased) {
        ?>

                var is_mobile = mobileAndTabletcheck();

                if (!is_mobile) {

                    stream_url = "http://rjr_flash-lh.akamaihd.net/z/rjrexternal_1@179257/manifest.f4m";
                    jwplayer("jw_live_player").setup({
                        width: '100%',
                        autostart: true,
                        aspectratio: "16:9",
                        playlist: [{
                            file: stream_url,
                            provider: "http://players.edgesuite.net/flash/plugins/jw/v3.8/AkamaiAdvancedJWStreamProvider.swf",
                            type:'mp4'
                        }],
                        primary: "flash"
                    });

                } else {

                    stream_url = "<?php echo $data->streaming_url; ?>";
                    jwplayer("jw_live_player").setup({
                        file: stream_url,
                        width: '100%',
                        androidhls: true,
                        autostart: true,
                        aspectratio: "16:9"
                    });
                    
                }
        <?php
    }
}
?>
    }

    function button_close_clickHandler() {
        TweenMax.to("#event_player_container", 1, {height: 0});
        TweenMax.to("#event_player_close", 1, {alpha: 0, onComplete: function () {
                $("#event_player_container").hide();
                $("#event_player_close").hide();
                $('.player_container .col-sm-2').css('min-height', '0px');
                $('.player_container .col-sm-8').css('min-height', '0px');
                $('#back_button_container').show();
                $('.carousel-container').css({display: "block"});
                $('.event-detail-result').css({display: "block"});
                $('.footer').css({display: "block"});
            }});
    }
    ;


    setInterval(function () {

        $.ajax({
            url: base_url + 'index.php/account/check_status',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.status == 'error') {
                    window.location = base_url;
                }
            }
        })
    }, 120000);


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

<div class="dc_clear"></div>

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

                    /* if ($i == 0) { */
                    ?>
                    <li class="carousel-item" product-id='<?php echo $data[$i]->id; ?>'>
                        <div class="slider-first-element">
                            <img src="<?php echo $data[$i]->image; ?>" />
                            <div class="slider-caption">
                                <div class="first-item-carousel-title"><span><?php echo $data[$i]->name; ?></span></div>
                                <div class="first-item-carousel-date">
                                        <?php echo $event_item_overlay; ?>
                                    <span><?php
                                        $tz = 'EST';
                                        $timestamp = $data[$i]->event_date / 1000;
                                        $dt = new DateTime("now", new DateTimeZone($tz)); //first argument "must" be a string
                                        $dt->setTimestamp($timestamp); //adjust the object to correct timestamp
                                        $event_date = $dt->format('l, F d, Y - H:i');

                                        echo $event_date . ' Hours EST - US $' . $data[$i]->price;
                                        ?></span>
                                </div>
                            </div>


                        </div>
                    </li>
                    <?php
                    /*  } else { */
                    ?>
                    <!-- <li class="carousel-item" product-id='<?php //echo $data[$i]->id;  ?>'>
                        <div class="slide-img-content">
                            <img src="<?php //echo $data[$i]->image;   ?>" />
                        </div>
                        <span class="item-carousel-title"><?php //echo $data[$i]->name;   ?></span><br>
                        <span class="item-carousel-date"><?php //echo date('d-m, H:i', ($data[$i]->event_date / 1000));   ?> hs</span>
                        <p class="item-description"><?php //echo $data[$i]->description;  ?></p>
                    </li> -->


                    <?php
                    //}
                }
                ?>
            </ul>
        </div>
    </div>
    </div>

    <?php
}
?>

