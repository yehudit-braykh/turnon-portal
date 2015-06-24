<?php setlocale(LC_ALL,"es_ES"); ?>

<script type="text/javascript" src="<?php echo common_asset_url(); ?>pdk/tpPdk.js"></script>
<script type='text/javascript' src="<?php echo common_asset_url(); ?>js/wurfl.js"></script>
​<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key="BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script>
    $(document).ready(function () {

        if (WURFL.is_mobile == WURFL.is_mobile) {
            var stream_url = "<?php echo $download_url; ?>";
            //$("#html5_video_player").find("#html5_video_player_source").attr("src", stream_url);
            //var stream_url = "http://link.theplatform.com/s/7yj-KC/XVliUuEGsIcp";
            //$pdk.controller.setReleaseURL(stream_url);
            jwplayer("jw_live_player").setup({
                file: stream_url,
                image: '<?php echo asset_url(); ?>images/elecciones_2015_bg.jpg',
                width: '100%',
                autostart: true,
                androidhls: true,
                aspectratio: "16:9",
                logo: {
                    file: 'http://web01.univtec.com/resources/htv/hogartv_watermark.png',
                    link: 'http://example.com'
                }
            });

        } else {
            var stream_url = "<?php echo $item_release_url; ?>";
            $pdk.controller.setReleaseURL(stream_url);
        }
    });   

</script>

</div>
</div>
<div class="resize"> 
    <div class="content_centered">

        <!-- content -->
        <div class="content_resize"> 

            <div class="center_box_container">
                <div class="vod_item_left_title"><?php echo $item_title; ?></div>
                <?php
                    if (isset($aired_date) && $aired_date) {
                        echo '<div class="vod_item_left_aired_date">' . htmlentities(ucfirst(strftime("%A %e de %B de %G", $aired_date))) . '</div>';
                    }
                ?>

                <div id="vod_item_player_container">
                    <div id="tdp_player" 
                         class="tpPlayer vod_item" 
                         tp:overlayImageUrl="<?php echo asset_url(); ?>/images/overlay.png" 
                         tp:layoutUrl="<?php echo asset_url(); ?>pdk/data/metaLayout.xml">
                    </div>
                    <div id="jw_live_player">Loading the player...</div>

                </div>

                <div class="social_content">
                    <span class='st_facebook_large' displayText='Facebook'></span>
                    <span class='st_twitter_large' displayText='Tweet'></span>
                    <span class='st_googleplus_large' displayText='Google +'></span>
                </div>
            </div>

            <div class="right_bar_box_container">
                <div class="box_title_bar_bg">
                    <div class="box_title_bar">Ultimo Momento</div>
                </div>
                    <div class="right_bar_box_content_bg">
                        <div class="right_bar_box_content">
                        <?php create_items($items_category_1, "right"); ?>
                    </div>
                </div>
            </div>

            <!-- content -->
            <div class="center_box_container last">
                <div class="box_title_bar gray">Relacionados</div>
                <div class="center_box_content_bg">
                    <div class="center_box_content">
                        <?php create_items($item_related_items, "center"); ?>
                    </div>
                </div>                    
            </div>
        </div>
    </div>
    <!-- /content -->


<?php

function create_items($items, $position) {

    if ($items && isset($items->content)) {
        for ($i = 0; $i < sizeof($items->content->entries); $i++) {

            $cover_url = getEntryThumbnail($items->content->entries[$i], 'Poster H');
            $item_id_arr = explode("/", $items->content->entries[$i]->id);
            $item_url = base_url() . 'index.php/vod_item/detail/id/' . $item_id_arr[sizeof($item_id_arr) - 1];
            $aired_date = getEntryProperty($items->content->entries[$i], 'aired_date');

            echo '<a href="' . $item_url . '">';
            echo '<img class="vod_item_img ' . $position . '" src="' . $cover_url . '" />';
            echo '</a>';
            echo '<div class="vod_item_data ' . $position . '">';
            echo '<div class="vod_item_title ' . $position . '"><a href="' . $item_url . '">' . getEntryProperty($items->content->entries[$i], 'title') . '</a></div>';
            if ($aired_date) echo '<div class="vod_item_date ' . $position . '">' . htmlentities(ucfirst(strftime("%A %e de %B de %G", $aired_date))) . '</div>';
            echo '</div>';
            echo '<div class="clr"></div>';

            if ($i < sizeof($items->content->entries) - 1) echo '<div class="right_bar_separator center"></div>';
        }
    }
}
?>
