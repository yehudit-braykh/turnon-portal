<div class="category_items_container">
    <?php
    foreach ($items[$category] as $key => $value) {
        ?>

        <div class="col4 no_spacer img_hover_box">
            <a href="<?php echo base_url() . "index.php/vod_item/detail/id/" . $value->id ?>" class="cover">
                <div class="ribbon_content <?php echo $value->commerce_class; ?>">
                </div>
                <img class="item_img" src="<?php echo $value->img_url ?>">

                <div class="h">
                    <div class="title_content">
                        <?php echo $value->title ?>
                    </div>
                    <?php
                    if ($value->aired_date !== '') {
                        ?>
                        <div class="subtitle_content">
                            <?php echo $value->aired_date; ?>
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