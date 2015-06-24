<script type="text/javascript">
  $(function () {
    $('#cbo_season').change(function(event) {
      var url = "<?php echo base_url(); ?>index.php/vod_item/episodes/id/<?php echo $item_id; ?>/season/" + $('#cbo_season').val();
      show_episodes_preloader();
      $.get( url, function( data ) {
        $('#vod_item_episodes_container').html(data);
      });      
    });
  });

  function show_episodes_preloader() {
    $("#vod_item_episodes_container").html('<div class="preloader_section" alt="Loading...">&nbsp;</div>');
  }   
</script>

<div class="">
  <select id="cbo_season" style="width: 150px;">
    <option selected disabled>Choose season...</option> 
    <?php 
      for ($i=0; $i < sizeof($item_seasons); $i++) { 
        echo '<option value="' . $item_seasons[$i]->number . '">Season ' . $item_seasons[$i]->number . '</option>';
      }
    ?>
  </select>

  <div id="vod_item_episodes_container">

  </div>
</div>
<div class="clr"></div>
