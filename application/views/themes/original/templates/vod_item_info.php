<div class="vod_info_data">

  <div class="vod_<?php echo $media_definition; ?>_icon"></div>
  <?php echo ($item_year ? "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" . $item_year : ""); ?>
  <?php echo ($item_runtime ? "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" . $item_runtime : ""); ?>
  <?php echo ($item_rating ? "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" . $item_rating : ""); ?>
</div>
<div class="clr"></div>
<div class="vod_info_credits">

  <?php if ($item_description) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Description:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_description; ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_genre) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Genre:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_genre; ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_tags) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Tags:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_tags; ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>
  
  <?php if ($item_director) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Director:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_director; ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_writer) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Writer:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_writer; ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_actors) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Actors:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_actors; ?></p></div>
  </div>
  <?php } ?>

</div>
<div class="clr"></div>
