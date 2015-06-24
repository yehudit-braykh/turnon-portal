<?php setlocale(LC_ALL,"es_ES"); ?>

</div>
</div>
<script>

    function dropdown_click_callback(control_id, value) {
        window.location.href = '<?php echo base_url(); ?>index.php/vod/section/<?php echo $sub_section1; ?>/' + $('#' + control_id).val();
    }

</script>

<div class="header_resize2">

    <div class="resize"> 
        <!-- content -->
        <div class="content_resize">
            <div class="vod_list_header" >
                <div class="content_centered">
                    <div class="vod_list_header_title"><?php echo $category; ?></div>
                </div>
            </div>
            <div class="content_centered">
                <div class="category_items_container" style="min-height: 600px;">
                    <?php create_items($items_category_1, "right"); ?>
                </div>
                <div class="clr"></div>
            </div>
            <div class="clr"></div>
        </div>
        <div class="clr"></div>
        <!-- /content -->

<?php

function create_items($items, $position) {

    if ($items && isset($items->content)) {
        for ($i = 0; $i < sizeof($items->content->entries); $i++) {

            $cover_url = getEntryThumbnail($items->content->entries[$i], 'Poster H');
            $item_id_arr = explode("/", $items->content->entries[$i]->id);
            $item_url = base_url() . 'index.php/vod_item/detail/id/' . $item_id_arr[sizeof($item_id_arr) - 1];

            echo '<div class="vod_list_item_container">';
            echo '<a href="' . $item_url . '">';
            echo '<img class="vod_item_img ' . $position . '" src="' . $cover_url . '" />';
            echo '</a>';
            echo '<div class="vod_item_data ' . $position . '">';
            echo '<div class="vod_item_title ' . $position . '"><a href="' . $item_url . '">' . getEntryProperty($items->content->entries[$i], 'title') . '</a></div>';
            echo '<div class="vod_item_date ' . $position . '">' . htmlentities(ucfirst(strftime("%A %e de %B de %G", getEntryProperty($items->content->entries[$i], 'aired_date')))) . '</div>';
            echo '</div>';
            echo '</div>';
        }
    }
}
?>