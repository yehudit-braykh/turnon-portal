<div class="vod_info_credits">

  <?php if ($item_year) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Año de realización:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_year; ?></p></div>
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
    <div class="vod_info_credit_item_title">Duración:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_runtime; ?>min</p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <!--<div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Disponibilidad:</div>
    <div class="vod_info_credit_item_value"><p>Limited + Show</p></div>
  </div>
  <div class="clr"></div>-->

  <?php if ($item_director) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Director:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_director; ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_writer) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Escritor:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_writer; ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>

  <?php if ($item_actors) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Actores:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_actors; ?></p></div>
  </div>
  <?php } ?>

  <?php if ($item_tags) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Tags:</div>
    <div class="vod_info_credit_item_value"><p><?php echo implode(',', $item_tags); ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>
  
  <?php if ($item_genre) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title">Género:</div>
    <div class="vod_info_credit_item_value"><p><?php echo $item_genre; ?></p></div>
  </div>
  <div class="clr"></div>
  <?php } ?>
  
  <?php if (isset($item_seasons_number) && isset($item_episodes_number)) { ?>
    <div class="vod_info_credits_details">
        <div class="vod_info_credit_item_title">Temporadas:</div>
        <div class="vod_info_credit_item_value"><p><?php echo $item_seasons_number; ?></p></div>
        <div class="vod_info_credit_item_title" style="margin-left:15px;">Episodios:</div>
        <div class="vod_info_credit_item_value"><p><?php echo $item_episodes_number; ?></p></div>
    </div>
    <div class="clr"></div>
  <?php } ?>
  
  <?php if ($item_description) { ?>
  <div class="vod_info_credits_details">
    <div class="vod_info_credit_item_title" style="padding: 20px 0px 10px 0px;">Sinopsis:</div>
    <div class="clr"></div>  
    <div class="vod_info_credit_item_value" style="max-width:700px;padding-left:0px;"><?php echo $item_description; ?></div>
  </div>
  <div class="clr"></div>
  <?php } ?>

</div>