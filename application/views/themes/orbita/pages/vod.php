<?php setlocale(LC_ALL,"es_ES"); ?>

<!-- DC Camera Slider CSS -->
<link rel="stylesheet" id="camera-css"  href="<?php echo asset_url(); ?>camera/css/camera.css" type="text/css" media="all">

<!-- DC Camera Slider JS -->
<script type="text/javascript" src="<?php echo asset_url(); ?>camera/js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="<?php echo asset_url(); ?>camera/js/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url(); ?>pdk/tpPdk.js"></script>
<script type='text/javascript' src="<?php echo common_asset_url(); ?>js/wurfl.js"></script>
​<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key="BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>
<script>

    $(document).ready(function () {

        if (WURFL.is_mobile == WURFL.is_mobile) {
            var stream_url = "http://univhb-lh.akamaihd.net/i/Orbita_5@183196/master.m3u8";
            jwplayer("jw_live_player").setup({
                file: stream_url,
                image: '<?php echo asset_url(); ?>images/elecciones_2015_bg.png',
                width: '100%',
                androidhls: true,
                autostart: true,
                aspectratio: "16:9"
            });

        } else {
            var stream_url = "http://link.theplatform.com/s/7yj-KC/b7K_0IEwCItr";
            $pdk.controller.setReleaseURL(stream_url);
        }
    });   

</script>

</div>
</div>

<div class="resize"> 
    <!-- content -->
    <div class="content_centered">

        <!-- live player -->
        <div class="content_resize"> 
            <div class="center_box_container">
                <div class="box_title_bar">EN VIVO</div>
                <div class="mobile_live_player">
                    <video id="html5_video_player" autoplay controls>
                        <source id="html5_video_player_source" type="video/mp4" />
                    </video>
                </div>

                <div  id="tdp_player_home"
                      class="tpPlayer"
                      tp:plugin0="type=adcomponent|URL=<?php echo common_asset_url(); ?>pdk/swf/SMIL.swf|priority=3"
                      tp:plugin1="type=adcomponent|URL=<?php echo common_asset_url(); ?>pdk/swf/akamaiHD.swf|priority=3"
                      tp:layoutUrl="<?php echo common_asset_url(); ?>pdk/data/metaLayout.xml">
                </div>
                <div id="jw_live_player">Loading the player...</div>
            </div>

            <div class="right_bar_box_container">
                <div class="box_title_bar"><?php echo $category1; ?></div>
                    <div class="right_bar_box_content_bg">
                        <div class="right_bar_box_content">
                        <?php create_items($items_category_1, "right"); ?>
                    </div>
                </div>
            </div>

            <div class="center_box_container">
                <div class="box_title_bar"><?php echo $category2; ?></div>
                <div class="center_box_content_bg">
                    <div class="center_box_content">
                        <?php create_items($items_category_2, "center"); ?>
                    </div>
                </div>                    
            </div>

            <div class="center_box_container last">
                <div class="box_title_bar"><?php echo $category3; ?></div>
                <div class="center_box_content_bg">
                    <div class="center_box_content">
                        <?php create_items($items_category_3, "center"); ?>
                    </div>
                </div>                    
            </div>

        <div>
    </div>
    <!-- /content -->

<?php

function create_items($items, $position) {

    if ($items && isset($items->content)) {
        for ($i = 0; $i < sizeof($items->content->entries); $i++) {

            $cover_url = getEntryThumbnail($items->content->entries[$i], 'Poster H');
            $item_id_arr = explode("/", $items->content->entries[$i]->id);
            $item_url = base_url() . 'index.php/vod_item/detail/id/' . $item_id_arr[sizeof($item_id_arr) - 1];

            echo '<a href="' . $item_url . '">';
            echo '<img class="vod_item_img ' . $position . '" src="' . $cover_url . '" />';
            echo '</a>';
            echo '<div class="vod_item_data ' . $position . '">';
            echo '<div class="vod_item_title ' . $position . '"><a href="' . $item_url . '">' . getEntryProperty($items->content->entries[$i], 'title') . '</a></div>';
            echo '<div class="vod_item_date ' . $position . '">' . htmlentities(ucfirst(strftime("%A %e de %B de %G", getEntryProperty($items->content->entries[$i], 'aired_date')))) . '</div>';
            echo '</div>';
            echo '<div class="clr"></div>';

            if ($i < sizeof($items->content->entries) - 1) echo '<div class="right_bar_separator center"></div>';
        }
    }
}
?>