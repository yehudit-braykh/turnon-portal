

<div class="carousel-container">
    <div id="slider_<?php echo $category; ?>" class="flexslider home_carousel">
        <ul class="slides">
            <?php
            for ($i = 0; $i < sizeof($items[$category]); $i++) {
                ?>

                <li class="carousel-item">
                    <div class="col4 no_spacer img_hover_box">
                        <a href="<?php echo base_url() . "index.php/vod_item/detail/id/" . $items[$category][$i]->id ?>" class="cover">
                            <div class="ribbon_content commerce_free">
                            </div>
                            <img class="item_img" src="<?php echo $items[$category][$i]->img_url ?>">
                        </a>
                        <div class="h">
                            <div class="title_content">
                                <?php echo $items[$category][$i]->title ?>
                            </div>
                            <div class="subtitle_content">
                                  <?php echo $items[$category][$i]->aired_date; ?>
                            </div>
                            <div>

                            </div>

                        </div>                
                    </div>
                </li>
                <?php
            }
            ?>
        </ul>
    </div>
</div>

<script type="text/javascript">

    $(window).load(function () {
        $('#slider_<?php echo $category; ?>').flexslider({
            animation: "slide",
            itemWidth: 295,
            slideshow: false,
            animationLoop: false,
            controlNav: false,
           
        });

    });



</script>