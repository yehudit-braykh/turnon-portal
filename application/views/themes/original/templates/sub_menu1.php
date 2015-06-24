<script>
	$(function () {
	    $('#top_sub_menu1').on('click', function(event) {
	      window.location.href = '<?php echo base_url(); ?>index.php/vod/section/featured';
	    });

	    <?php
		  	for($i=0;$i<sizeof($vod_categories);$i++) { 
			    echo "\n";
			    echo "$('#top_sub_menu_" . $vod_categories[$i]->id . "').on('click', function(event) {\n";
			    echo "  window.location.href = '" . base_url() . "index.php/vod/section/" . $vod_categories[$i]->id . "';\n";
			    echo "});\n";
		  	}
	  	?>

		$('img.hover_enabled').hover(sourceSwap, sourceSwap);
	});

	var sourceSwap = function () {
	    var $this = $(this);
	    var newSource = $this.data('alt-src');
	    $this.data('alt-src', $this.attr('src'));
	    $this.attr('src', newSource);
	}	
</script>


<!-- sub menu 1 -->
<?php

	// check if customer use logos only for vod categories
if ($this->config->item('show_logos_for_vod_categories') !== FALSE) {

	echo '<div class="top_sub_menu">';

  	for($i=0;$i<sizeof($vod_categories);$i++) {

  		if ($sub_section1 == $vod_categories[$i]->id) {
			echo '<div id="top_sub_menu_' . $vod_categories[$i]->id . '"><img class="hover_enabled" src="' . $vod_categories[$i]->thumbnail_on_url . '" data-alt-src="' . $vod_categories[$i]->thumbnail_url . '" /></div>';
  		} else {
			echo '<div id="top_sub_menu_' . $vod_categories[$i]->id . '"><img class="hover_enabled" src="' . $vod_categories[$i]->thumbnail_url . '" data-alt-src="' . $vod_categories[$i]->thumbnail_on_url . '" /></div>';
  		}
  	}

} else {

	echo '<div class="top_sub_menu" style="height:32px">';
	echo '<div id="top_sub_menu1" ' .'" style="margin-right:20px;" ' .($sub_section1 == 'featured' ? 'class="top_sub_menu_selected"' : '') . '>FEATURED</div>';

  	for($i=0;$i<sizeof($vod_categories);$i++) { 
		echo '<div id="top_sub_menu_' . $vod_categories[$i]->id . '" style="margin-right:20px; height:21px;" ' . ($sub_section1 == $vod_categories[$i]->id ? 'class="top_sub_menu_selected"' : '') . '>' . strtoupper($vod_categories[$i]->title) . '</div>';
  	}

}

?>
</div>
<div class="clr"></div>
<!-- /sub menu 1 --> 