<div class="ListItems">
    <ul id="content-slider-<?php echo $category; ?>" class="content-slider">
        <?php
        foreach ($items[$category] as $key => $value) {
            ?>

            <li class='thumbnail custom-thumbnail'>

                <h3>
                     <a href="<?php echo base_url() . "index.php/vod_item/detail/id/" . $value->id ?>" >
                    
                        <img src='<?php echo $value->img_url ?>'</img>
                    </a>
                    <div class="item-title">
                        <?php echo $value->title ?>
                    </div>
                    <?php
                    if ($value->aired_date !== '') {
                        ?>
                        <div class="item-aired-date">
                            <?php echo $value->aired_date ?>
                        </div>
                        <?php
                    }
                    ?>
                    <div class="item-commerce">
                        <?php echo str_replace(array("commerce_", "subscription"), array("", "premium"), $value->commerce_class); ?>
                    </div>
                </h3>


            </li>
            <?php
        }
        ?>
    </ul>
</div>


<!--<div class="category_items_container">
<?php
//foreach ($items[$category] as $key => $value) {
?>

        <div class="col4 no_spacer img_hover_box">
            <a href="<?php //echo base_url() . "index.php/vod_item/detail/id/" . $value->id       ?>" class="cover">
                <div class="ribbon_content <?php //echo $value->commerce_class;       ?>">
                </div>
                <img class="item_img" src="<?php //echo $value->img_url       ?>">

                <div class="h">
                    <div class="title_content">
<?php //echo $value->title ?>
                    </div>
<?php
// if ($value->aired_date !== '') {
?>
                        <div class="subtitle_content">
<?php //echo $value->aired_date; ?>
                        </div>
<?php
//      }
?>
                </div>  
            </a>
        </div>

<?php
//}
?>
</div>-->

<script>
    $("#content-slider-<?php echo $category; ?>").lightSlider({
        keyPress: true,
        autoWidth: true,
        pager: false
    });

</script>