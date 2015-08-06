<?php setlocale(LC_ALL,"es_ES"); ?>

<script src="//jwpsrv.com/library/KdH5zknzEeS1zyIACy4B0g.js"></script>

<script>
    $(document).ready(function () {

        var stream_url = "<?php echo $download_url; ?>";

        jwplayer("jw_live_player").setup({
            plugins: {
              'http://cdn-static.liverail.com/js/LiveRail.AdManager.JWPlayer-6.8.1.plugin.js' : {
                   'LR_PUBLISHER_ID': '81603',
                   'LR_ADMAP': 'in::0',
                   'LR_AUTOPLAY': '1',
                   'LR_LAYOUT_SKIN_ID': '2',
                   'LR_LAYOUT_SKIN_MESSAGE': 'Publicidad. Su video comenzara en {COUNTDOWN} segundos.'                   
               }
            },
            file: stream_url,
            width: '100%',
            aspectratio: "16:9",
            autostart: true,
            androidhls: true,
            logo: {
                file: 'http://web01.univtec.com/resources/htv/hogartv_watermark.png'
            }
        });
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
                        <?php if ($items_category_1) create_items($items_category_1, "right"); ?>
                    </div>
                </div>
            </div>

            <!-- content -->
            <div class="center_box_container last">
                <div class="box_title_bar gray">Relacionados</div>
                <div class="center_box_content_bg">
                    <div class="center_box_content">
                        <?php if ($item_related_items) create_items($item_related_items, "center"); ?>
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
