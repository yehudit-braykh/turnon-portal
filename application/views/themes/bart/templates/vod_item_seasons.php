<script type="text/javascript">
    $(function() {
        $('.seasonNumber').click(function(event) {
            $('.seasonNumber').removeClass('vod_item_sub_menu_selected');
            $(this).addClass('vod_item_sub_menu_selected');
            var url = "<?php echo base_url(); ?>index.php/vod_item/episodes/id/<?php echo $item_id; ?>/season/" + $(this).text();
            show_episodes_preloader();
            $.get(url, function(data) {
                $('#vod_item_episodes_container').html(data);
            });
        });
    });

    function show_episodes_preloader() {
        $("#vod_item_episodes_container").html('<div class="preloader_section" alt="Loading...">&nbsp;</div>');
    }
$('#selectSeason div:last-child').addClass('vod_item_sub_menu_selected');
</script>
<div id="selectSeason">
    <div id="selectSeasonTitle">Seasons</div>
    <?php
    if(isset($item_seasons)){
        for ($i = 0; $i < sizeof($item_seasons); $i++) {
            echo '<div class="seasonNumber">' . $item_seasons[$i]->number . '</div>';
        }
    }
    ?>
</div>
<div class="">
    <div id="vod_item_episodes_container">
        <?php
        $this->load->view(views_url() . 'templates/vod_item_episodes');
        ?>
    </div>
</div>
<div class="clr"></div>
