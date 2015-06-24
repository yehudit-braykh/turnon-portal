<script>
    function select_category(id) {
            window.location.href = '<?php echo base_url(); ?>index.php/vod/section/<?php echo $sub_section1; ?>/'+ id;
       
    }
</script>
<div class="clr"></div>
</div>
<div class="clr"></div>
</div>
<div class="clr"></div>
<div class="resize"> 
    <!-- content -->
    <div class="content" id="gallery">
        <div class="content_resize"> 
            <div class="content_full_size">

                <?php
                $filter = '';
                $show_filter = 'yes';

                foreach ($vod_categories as $value) {
                    if ($value->id == $sub_section1) {
                        $filter = $value->filter_field;
                    }
                }

                if ($this->config->item('show_' . $filter . '_filter') !== FALSE)
                    $show_filter = $this->config->item('show_' . $filter . '_filter');

                if ($show_filter == 'yes' && $filter == 'genre') {
                    ?>

                    <ul class="category_filter">
                        <?php for ($i = 0; $i < sizeof($genres); $i++) { ?>
                            <li id="category_item_<?php echo $genres[$i]->id; ?>" 
                                class="category_filter_item<?php echo ($selected_category_id == $genres[$i]->id ? ' selected' : ''); ?>"
                                onclick="select_category('<?php echo $genres[$i]->id; ?>')">
                                    <?php echo $genres[$i]->description; ?>
                            </li>
                        <?php } ?>
                    </ul>

                  
                <?php } else if ($show_filter == 'yes' && $filter == 'aired_date') {
                    ?>
                    <ul class="category_filter">
                       
                      
                        <?php for ($i = 0; $i < sizeof($months); $i++) { ?>
                            <li id="category_item_<?php echo $months[$i]['id']; ?>" 
                                class="category_filter_item<?php echo ($selected_category_text == $months[$i]['name'] ? ' selected' : ''); ?>"
                                onclick="select_category('<?php echo $months[$i]['id']; ?>')">
                                    <?php echo $months[$i]['name']; ?>
                            </li>
                        <?php } ?>
                    </ul>
                    <?php } ?> 
                  <div class="category-title">{selected_category_text}</div>
                <div class="category_items_container">{items_category_1}</div>
                <div class="clr"></div>
            </div>
            <div class="clr"></div>
        </div>
        <div class="clr"></div>
    </div>
    <!-- /content -->
