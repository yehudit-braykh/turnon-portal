<script type="text/javascript">
  function button_back_clickHandler() {
    window.history.go(-1);
    event.preventDefault();
  }
</script>

  </div>
  <div class="clr"></div>
</div>
<div class="clr"></div>
<div class="resize"> 
  <!-- content -->
  <div class="content" style="padding-top:20px;">
    <div class="content_resize"> 
      <div class="content_full_size" style="min-height: 400px;">
        <div id="back_button_container"><a href="#" onclick="button_back_clickHandler()">Back</a></div>              
        <div class="category-title">Search Results for:&nbsp;&nbsp;<font style="color: #f00; font-style: italic;">"<?php echo $keyword; ?>"</font></div>
        <?php 
            echo '<p>' . $search_result_size . ' results found.</p>';
            echo $search_result_items; 
        ?>
        <div class="clr"></div>
      </div>
      <div class="clr"></div>
    </div>

    <div class="clr"></div>        
  </div>
  <div class="clr"></div>
</div>
<div class="clr"></div>
<!-- /content -->