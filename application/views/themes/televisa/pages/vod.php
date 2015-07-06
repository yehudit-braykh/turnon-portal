<!-- DC Camera Slider CSS -->
<link rel="stylesheet" id="camera-css"  href="<?php echo asset_url(); ?>camera/css/camera.css" type="text/css" media="all">

<!-- DC Camera Slider JS -->
<script type="text/javascript" src="<?php echo asset_url(); ?>camera/js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="<?php echo asset_url(); ?>camera/js/camera.js"></script>
<script type="text/javascript" src="<?php echo asset_url(); ?>camera/js/jquery-migrate-1.2.1.min.js"></script>

<!-- DC Camera Slider Settings -->
<script type="text/javascript">
    jQuery(function () {
        jQuery('#camera_wrap_1').camera({
            thumbnails: false,
            loader: 'none',
            time: 1500
        });

<?php
if (isset($epg)) {
    echo 'var epg=' . json_encode(json_decode($epg)->content->entries) . ';';
}
?>

        var interval;

        setTimeout(set_interval, 3000);

        $(document).on('click', '.epg_preview_channel_info', function () {
            clearInterval(interval);
            change_epg();
            setTimeout(set_interval, 3000);
        });

        function set_interval() {
            interval = setInterval(change_epg, 3000);
        }

        function change_epg() {

            if ($('.channel_data:visible').next('.channel_data').length > 0) {
                var next = $('.channel_data:visible').next();
            } else {
                next = $('.channel_data:first');
            }
            $('.channel_data:visible').fadeOut('slow', '', next.fadeIn('slow'));
        }

        $(document).on('click', '.epg_preview_program', function () {

            arrId = $(this).attr('id').split('/');
            stationId = arrId[arrId.length - 1];
            url = '<?php echo base_url() . 'index.php/live/main/'; ?>' + stationId;

            window.location.assign(url);
        });

        $(document).on('click', '.cameraContent', function () {
            window.location = $(this).children('.camera_caption').attr('item-url');
        })

    });
</script>

</div>
</div>
<div class="header_resize2">
    <div class="clr"></div>
<?php if (isset($slider)) { ?>

        <!-- Slider Start -->
        <div style="width:100%; margin:0 auto; position:relative;">
            <div class="camera_wrap camera_azure_skin" id="camera_wrap_1"> 

                <?php
                for ($i = 0; $i < sizeof($slider); $i++) {

                    $item_id_arr = explode("/", $slider[$i]->id);
                    $item_id = $item_id_arr[sizeof($item_id_arr) - 1];
                    $item_url = base_url() . 'index.php/vod_item/detail/id/' . $item_id;
                    ?>

                    <div  data-src="<?php echo $slider[$i]->image_url; ?>" item-url="<?php echo $item_url; ?>">>

                        <div class="camera_caption" item-url="<?php echo $item_url; ?>"> </div>

                    </div>

    <?php } ?>
            </div>
        </div>
        <div class="clr"></div>
        <!-- Slider End -->

<?php } ?>
</div>
<div class="clr"></div>
</div>
<div id="epg_preview_bg">
    <div id="epg_preview_container">
        <?php
        if (isset($epg)) {
            $epgs = json_decode($epg);
            if (isset($epgs->content->entries)) {
                $epg_data = $epgs->content->entries;
                if ($epg_data) {
                    foreach ($epg_data as $value) {
                        ?>      
                        <div class="channel_data">
                            <div id="epg_preview_channel">
                                <div class="epg_preview_channel_info"><?php echo $value->media->title; ?></div>
                            </div>
                            <?php
                            if (isset($value->epg) && sizeof($value->epg) > 0) {
                                $size = sizeof($value->epg);
                                if ($size > 6) {
                                    $size = 6;
                                }
                                for ($i = 0; $i < $size; $i++) {
                                    ?>
                                    <div class="epg_preview_program <?php if ($i == 0) echo 'epg_selected'; ?>" id="<?php echo $value->id; ?>">
                                        <div class="epg_preview_program_time"><?php echo date('h:i A', $value->epg[$i]->{'pllisting$startTime'} / 1000); ?></div>
                                        <div class="epg_preview_program_info"><?php echo $value->epg[$i]->{'pllisting$program'}->{'pl$title'}; ?></div>
                                    </div>
                                    <?php
                                }
                            }
                            ?>
                        </div>
                        <?php
                    }
                }
            }
        }
        ?>
    </div>
</div>
<div class="clr"></div>
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

            <?php
            if ($show_genres_filter == 'no') {
                ?>

                <div class="content_full_size">
                    <br>
    <?php echo $items_category_1; ?>
                    <div class="clr"></div>
                </div>

<?php } ?>

            <div class="clr"></div>
        </div>
        <div class="clr"></div>
    </div>
    <!-- /content -->
