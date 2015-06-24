<script type="text/javascript">
  function loadEpisode(id) {
    window.location.href = '<?php echo base_url(); ?>index.php/vod_item/detail/id/' + id;
  }   
</script>

<?php 
  for ($i=0; $i < sizeof($item_episodes); $i++) { 

    $item_id_arr = explode("/", $item_episodes[$i]->media->id);
    $item_id = $item_id_arr[sizeof($item_id_arr)-1];

?>
    <div class="vod_item_episode_container" onclick="loadEpisode(<?php echo $item_id; ?>);">
      <div class="vod_item_episode_title">Episode <?php echo $item_episodes[$i]->number; ?>: <?php echo $item_episodes[$i]->media->title; ?></div>
      <div class="vod_item_episode_description"><p><?php echo substr($item_episodes[$i]->media->description, 0, 250) . "..."; ?></p></div>
    </div>
<?php 
  }
?>