  </div>
</div>
<div class="header_resize2">
<div class="resize"> 
  <!-- content -->
  <div class="content" style="padding-top:20px;">
    <div class="content_resize"> 
      <div class="content_centered" style="min-height: 400px;">
        <div class="category-title">Resultados para:&nbsp;&nbsp;<font style="color: #FFFFFF; font-style: italic;">"<?php echo $keyword; ?>"</font></div>
        <?php 
            echo '<p>' . $search_result_size . ' resultados encontrados.</p>';
            create_items($search_result_items, "right");
        ?>
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

            echo '<div class="vod_list_item_container">';
            echo '<a href="' . $item_url . '">';
            echo '<img class="vod_item_img ' . $position . '" src="' . $cover_url . '" />';
            echo '</a>';
            echo '<div class="vod_item_data ' . $position . '">';
            echo '<div class="vod_item_title ' . $position . '"><a href="' . $item_url . '">' . getEntryProperty($items->content->entries[$i], 'title') . '</a></div>';
            if ($aired_date) echo '<div class="vod_item_date ' . $position . '">' . htmlentities(ucfirst(strftime("%A %e de %B de %G", $aired_date))) . '</div>';
            echo '</div>';
            echo '</div>';
        }
    }
}

?>