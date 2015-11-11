<div class="category_items_container">
    <?php
    for ($i = 0; $i < sizeof($items[$category]); $i++) {
        ?>

        <div class="col4 no_spacer img_hover_box">
            <a href="<?php echo base_url() . "index.php/vod_item/detail/id/" . $items[$category][$i]->id ?>" class="cover">
                <div class="ribbon_content <?php echo $items[$category][$i]->commerce_class; ?>">
                </div>
                <img class="item_img" src="<?php echo $items[$category][$i]->img_url ?>">

                <div class="h">
                    <div class="title_content">
                        <?php echo $items[$category][$i]->title ?>
                    </div>
                    <?php
                    if ($items[$category][$i]->aired_date !== '') {
                        ?>
                        <div class="subtitle_content">
                            <?php echo $items[$category][$i]->aired_date; ?>
                        </div>
                        <?php
                    }
                    ?>
                </div>  
            </a>
        </div>

        <?php
    }
    ?>
</div>