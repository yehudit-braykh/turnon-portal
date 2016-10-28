<link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">

<script type="text/javascript">
    $(document).ready(function () {
        $('#category_filter').on('change', function (event) {
            $('.seasonNumber').removeClass('vod_item_sub_menu_selected');
            $(this).addClass('vod_item_sub_menu_selected');
            var url = "<?php echo base_url(); ?>index.php/vod_item/episodes/id/<?php echo $item_id; ?>/season/" + $(this).val();
            show_episodes_preloader();
            $.get(url, function (data) {
                $('#vod_item_episodes_container').html(data);

            });
        });


    });

    function show_episodes_preloader() {
        $("#vod_item_episodes_container").html('<div class="preloader_section" alt="Loading...">&nbsp;</div>');
    }
    $('#selectSeason div:last-child').addClass('vod_item_sub_menu_selected');
</script>
<!-- Genre Filter -->
<div class="category_filter_container">
    <select id="category_filter" class="turnintodropdown vod_item_sub_menu_selected">

        <?php
        $selected = '';
        for ($i = 0; $i < sizeof($item_seasons); $i++) {
            if ($i == (sizeof($item_seasons) - 1)) {
                $selected = 'selected="selected"';
            }
            ?>

            <option value="<?php echo $item_seasons[$i]->number; ?>" <?php echo $selected; ?> >
                <?php echo $item_seasons[$i]->title ?>
            </option>
            <?php
        }
        ?>
    </select>
</div>

<div class="">
    <div id="vod_item_episodes_container">
        <?php
        $this->load->view(views_url() . 'templates/vod_item_episodes');
        ?>
    </div>
</div>
<div class="clr"></div>
