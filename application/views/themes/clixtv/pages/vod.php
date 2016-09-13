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


//        $.ajax({
//            url: "<?php //echo base_url() . 'index.php/live/epg_home_timeline';   ?>",
//            type: "POST",
//            data: "timezone=" + timezone_offset,
//            beforeSend: function () {
//                $('#epg_preview_bg').html('');
//                $('#epg_preview_bg').append("<div id='#epg_home_scroller'></div>");
//                $('#epg_home_scroller').html('<div id="loadingIcon"></div>');
//                $('#loadingIcon').css('margin-top', "0px");
//            },
//            success: function (data) {
//                $('#epg_preview_bg').html(data);
//
//            }
//        });
//
//
//        var interval;
//
//        setTimeout(set_interval, 3000);
//
//        $(document).on('click', '.epg_preview_channel_info', function () {
//            clearInterval(interval);
//            change_epg();
//            setTimeout(set_interval, 3000);
//        });
//
//        function set_interval() {
//            interval = setInterval(change_epg, 3000);
//        }
//
//        function change_epg() {
//
//            if ($('.channel_data:visible').next('.channel_data').length > 0) {
//                var next = $('.channel_data:visible').next();
//            } else {
//                next = $('.channel_data:first');
//            }
//            $('.channel_data:visible').fadeOut('slow', '', next.fadeIn('slow'));
//        }
//
//        $(document).on('click', '.epg_preview_program', function () {
//
//            arrId = $(this).attr('id').split('/');
//            stationId = arrId[arrId.length - 1];
//            url = '<?php //echo base_url() . 'index.php/live/main/';   ?>' + stationId;
//
//            window.location.assign(url);
//        });

        $(document).on('click', '.cameraContent', function () {
            if ($(this).children('.camera_caption').attr('target') && $(this).children('.camera_caption').attr('target') == '_blank') {
                url = $(this).children('.camera_caption').attr('item-url');
                var prefix = 'http://';
                if (url.substr(0, prefix.length) !== prefix)
                {
                    url = prefix + url;
                }
                window.open(url);
            } else {
                window.location = $(this).children('.camera_caption').attr('item-url');
            }
        })

        var width = $(window).width();
        if (width >= 960) {
            $(".content_centered").css("width", "960px")
        }

    });
</script>

<?php if (isset($slider)) { ?>

    <!-- Slider Start -->

    <div class="camera_wrap camera_azure_skin" id="camera_wrap_1"> 

        <?php
        for ($i = 0; $i < sizeof($slider); $i++) {

            if (isset($slider[$i]->link)) {
                $item_url = $slider[$i]->link;
            } else {
                $item_url = base_url() . 'index.php/vod_item/detail/id/' . $slider[$i]->id;
            }
            ?>

            <div  data-src="<?php echo $slider[$i]->image_url; ?>" item-url="<?php echo $item_url; ?>">>
                <?php
                if (isset($slider[$i]->target) && $slider[$i]->target != 'none') {
                    ?>
                    <div class="camera_caption" target="<?php echo $slider[$i]->target; ?>" item-url="<?php echo $item_url; ?>"> </div>
                    <?php
                } else {
                    ?>
                    <div class="camera_caption" item-url="<?php echo $item_url; ?>"> </div>
                    <?php
                }
                ?>
            </div>

        <?php } ?>
    </div>
    <!-- Slider End -->
<?php } ?>

    <div class="container-custom">
<?php
$show_genres_filter = 'yes';
if ($this->config->item('show_genres_filter') !== FALSE)
    $show_genres_filter = $this->config->item('show_genres_filter');
if ($show_genres_filter == 'yes') {

    if (isset($items[$category1['value']]) && sizeof($items[$category1['value']]) > 0) {
        ?>
        <div class="content_full_size">
            <div class="category-title"><?php echo $category1['label']; ?></div>
            <?php $this->load->view(views_url() . '/templates/home_category', array('category' => $category1['value'])); ?>
            <div class="clr"></div>
        </div>
        <?php
    }
    if (isset($items[$category2['value']]) && sizeof($items[$category2['value']]) > 0) {
        ?>
        <div class="content_full_size" style="border-top: 1px #ccc solid;">
            <div class="category-title"><?php echo $category2['label']; ?></div>
            <?php $this->load->view(views_url() . '/templates/home_category', array('category' => $category2['value'])); ?>
            <div class="clr"></div>
        </div>
        <?php
    }
    if (isset($items[$category3['value']]) && sizeof($items[$category3['value']]) > 0) {
        ?>
        <div class="content_full_size" style="border-top: 1px #ccc solid;">
            <div class="category-title"><?php echo $category3['label']; ?></div>
            <?php $this->load->view(views_url() . '/templates/home_category', array('category' => $category3['value'])); ?>
            <div class="clr"></div>
        </div>

        <?php
    }
}
?>
    </div>