<script>
	$(function () {
	    $('#top_sub_menu2_1').on('click', function(event) {
			event.preventDefault(); 
			window.location.href = '<?php echo base_url(); ?>index.php/vod/section/featured/coming_soon';
	    });
	    $('#top_sub_menu2_2').on('click', function(event) {
			event.preventDefault(); 
			window.location.href = '<?php echo base_url(); ?>index.php/vod/section/featured/recommended';
	    });
	    $('#top_sub_menu2_3').on('click', function(event) {
			event.preventDefault(); 
			window.location.href = '<?php echo base_url(); ?>index.php/vod/section/featured/new_releases';
	    });
	    $('#top_sub_menu2_4').on('click', function(event) {
			event.preventDefault(); 
			window.location.href = '<?php echo base_url(); ?>index.php/vod/section/featured/free_titles';
	    });
	});
</script>

<!-- sub menu 2 -->
<div class="menu"> 
  <ul class="menusm" id="menu-top-menu">
    <li><a id="top_sub_menu2_1" href="" class="menu_navigation"><span <?php echo ($sub_section2 == 'coming_soon'   ? 'class="menu_navigation_selected"' : ''); ?>>Coming Soon</span></a></li>
    <li><a id="top_sub_menu2_2" href="" class="menu_navigation"><span <?php echo ($sub_section2 == 'recommended'  ? 'class="menu_navigation_selected"' : ''); ?>>Recommended</span></a></li>
    <li><a id="top_sub_menu2_3" href="" class="menu_navigation"><span <?php echo ($sub_section2 == 'new_releases'   ? 'class="menu_navigation_selected"' : ''); ?>>New Releases</span></a></li>
    <li><a id="top_sub_menu2_4" href="" class="menu_navigation"><span <?php echo ($sub_section2 == 'free_titles' ? 'class="menu_navigation_selected"' : ''); ?>>Free Titles</span></a></li>
  </ul>
  <div class="clr"></div>
</div>
<!-- /sub menu 2 -->