<div class="vod_info_credits">

  <?php if ($item_description) { ?>
  <div class="vod_info_credits_details">
    
    <h5 class="vod_info_credit_item_value"><?php echo $item_description; ?></h5>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_year) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Released: &nbsp;</div>
    <h5 class="vod_info_credit_item_value"><p><?php echo $item_year; ?></p></h5>
  </div>
  <div class="clr"></div>
  <?php } ?>

<!--  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Rental Period:</div>
    <div class="vod_info_credit_item_value"><p>24hs</p></div>
  </div>
  <div class="clr"></div>-->

  <?php if ($item_runtime) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Duration: &nbsp;</div>
    <h5 class="vod_info_credit_item_value"><p><?php echo $item_runtime; ?>min</p></h5>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <div class="vod_info_credits_details">
    <h5 class="vod_info_credit_item_title">Availability: &nbsp;</h5>
    <h5 class="vod_info_credit_item_value"><p>Limited + Show</p></h5>
  </div>
  <div class="clr"></div>

  <?php if ($item_director) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Director: &nbsp;</div>
    <h5 class="vod_info_credit_item_value"><p><?php echo $item_director; ?></p></h5>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_writer) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Writer: &nbsp;</div>
    <h5 class="vod_info_credit_item_value"><p><?php echo $item_writer; ?></p></h5>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_actors) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Actors: &nbsp;</div>
    <h5 class="vod_info_credit_item_value"><p><?php echo $item_actors; ?></p></h5>
  </div>
  <?php } ?>

  <?php if ($item_tags) { ?>
  <div class="vod_info_credits_details">
    <h5 class="vod_info_credit_item_title">Tags: &nbsp;</h5>
    <h5 class="vod_info_credit_item_value"><p><?php echo str_replace(',',', ',$item_tags); ?></p></h5>
  </div>
  <div class="clr"></div>
  <?php } ?>
  
  <?php if ($item_genre) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Genres: &nbsp;</div>
    <h5 class="vod_info_credit_item_value"><p><?php echo $item_genre; ?></p></h5>
  </div>
  <div class="clr"></div>
  <?php } ?>

</div>