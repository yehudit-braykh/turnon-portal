<!-- DC Camera Slider CSS -->
<link rel="stylesheet" id="camera-css"  href="<?php echo asset_url(); ?>camera/css/camera.css" type="text/css" media="all">

<!-- DC Camera Slider JS -->
<script type="text/javascript" src="<?php echo asset_url(); ?>camera/js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="<?php echo asset_url(); ?>camera/js/camera.js"></script>
<script type="text/javascript" src="<?php echo asset_url(); ?>camera/js/jquery-migrate-1.2.1.min.js"></script>


</div>
</div>
</div>
</div>
</div>

<div class="resize"> 
    <!-- content -->
    <div class="content_centered" id="gallery">
        <div class="content_resize"> 
            <?php
            $show_genres_filter = 'yes';
            if ($this->config->item('show_genres_filter') !== FALSE)
                $show_genres_filter = $this->config->item('show_genres_filter');
            if ($show_genres_filter == 'yes') {
                ?>

                <br>
                <div class="content_full_size">
                    <div class="category-title"><?php echo $category1; ?></div>
                    <div class="category_items_container">{items_category_1}</div>
                    <div class="clr"></div>
                </div>
                <div class="content_full_size">
                    <div class="category-title"><?php echo $category2; ?></div>
                    <div class="category_items_container">{items_category_2}</div>
                    <div class="clr"></div>
                </div>
                <div class="content_full_size">
                    <div class="category-title"><?php echo $category3; ?></div>
                    <div class="category_items_container">{items_category_3}</div>
                    <div class="clr"></div>
                </div>

            <?php } ?>

            <?php if ($show_genres_filter == 'no') { ?>

                <div class="content_full_size">
                    <?php echo $items_category_1; ?>
                    <div class="clr"></div>
                </div>

            <?php } ?>

            <div class="clr"></div>
        </div>
        <div class="clr"></div>
    </div>
    <!-- /content -->