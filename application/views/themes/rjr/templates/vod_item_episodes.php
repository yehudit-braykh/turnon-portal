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

        $item_id_arr = explode("/", $item_episodes[$i]->media->_id);
        $item_id = $item_id_arr[sizeof($item_id_arr) - 1];
        ?>
        <div class="vod_item_episode_container" onclick="loadEpisode(<?php echo $item_id; ?>);">
            <div style="float: left;">
                <div class="ribbon_content <?php echo $item_episodes[$i]->media->commerce_type;?>" style="margin:10px;"></div>
                <?php
                if(isset($item_episodes[$i]->media->content)){
                    $thumnail = getEntryThumbnail($item_episodes[$i]->media, 'Poster H');
                    if($thumnail !== ''){
                         echo "<img class='episodeImg' src='" . $thumnail . "'/>";
                    }
                }
           
                ?>
            </div>
            <div  style="float: left;width: 420px;">
                <div class="vod_item_episode_title"><?php echo $item_episodes[$i]->media->title; ?></div>
                <div class="vod_item_episode_details">Episode <?php echo $item_episodes[$i]->number; ?> </div>
                <div class="vod_item_episode_description"><p><?php echo substr($item_episodes[$i]->media->description, 0, 250) . "..."; ?></p></div>
            </div>
        </div>
        <?php
    }
}
    ?>
