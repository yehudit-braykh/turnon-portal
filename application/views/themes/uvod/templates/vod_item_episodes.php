<script type="text/javascript">
    function loadEpisode(id) {
        window.location.href = '<?php echo base_url(); ?>index.php/vod_item/detail/id/' + id;
    }
    <?php echo 'var datas = '.  json_encode($item_episodes).';';?>
</script>

    
    <?php

function cmp($a, $b)
{
    if ($a->number == $b->number) {
        return 0;
    }
    return ($a->number < $b->number) ? -1 : 1;
}
if(isset($item_episodes)){
    usort($item_episodes, "cmp");
    rsort($item_episodes);
   
    for ($i = 0; $i < sizeof($item_episodes); $i++) {

        $item_id_arr = explode("/", $item_episodes[$i]->media->id);
        $item_id = $item_id_arr[sizeof($item_id_arr) - 1];
        ?>
        <div class="vod_item_episode_container" onclick="loadEpisode(<?php echo $item_id; ?>);">
            <div style="float: left;">
                <?php
                if (count($item_episodes[$i]->media->{'media$thumbnails'}) > 0) {
                    foreach ($item_episodes[$i]->media->{'media$thumbnails'} as $item) {
                        echo "<img class='episodeImg' src='" . $item->{'plfile$downloadUrl'} . "'/>";
                        break;
                    }
                }
                ?>
            </div>
            <div  style="float: left;width: 420px;">
                <div class="vod_item_episode_title"><?php echo $item_episodes[$i]->media->title; ?></div>
                <div class="vod_item_episode_details">Season <?php echo $item_episodes[$i]->program->{'plprogram$tvSeasonNumber'} ?>, Episode <?php echo $item_episodes[$i]->number; ?> </div>
                <div class="vod_item_episode_description"><p><?php echo substr($item_episodes[$i]->media->description, 0, 250) . "..."; ?></p></div>
            </div>
        </div>
        <?php
    }
}
    ?>
