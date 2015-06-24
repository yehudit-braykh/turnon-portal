            <div class="clr"></div>
            <?php if (isset($slider)) { ?>
            <!-- Slider Start -->
            <div style="width: 100%; margin:0 auto; position:relative;">
              <div class="navig-carousel">
                <div id="scarousel-left"></div>
                <div id="scarousel-right"></div>
              </div>
              <section id="slide">
                <div id="carousel-container">
                  <div id="carousel"> 
                    <!-- Slides -->
                    <?php 
                    for ($i=0; $i<sizeof($slider); $i++) { 

                      $item_id_arr = explode("/", $slider[$i]->id);
                      $item_id = $item_id_arr[sizeof($item_id_arr)-1];
                      $item_url = base_url() . 'index.php/vod_item/detail/id/' . $item_id;
                    ?>
                    <div class="carousel-feature"> 
                      <a href="<?php echo $item_url; ?>"><img class="carousel-image" alt="Image Caption" style="width:510px; height:287px;" src="<?php echo $slider[$i]->image_url; ?>"></a>
                      <div class="carousel-caption">
                        <div class="text-capt">
                          <?php echo $slider[$i]->text; ?>
                        </div>
                      </div>
                    </div>
                    <?php } ?>
                  </div>
                </div>
              </section>
            </div>
            <div class="clr"></div>
            <!-- Slider End -->
            <?php } ?>
          </div>
          <div class="clr"></div>
        </div>
        <div class="clr"></div>
        <div class="resize"> 
          <!-- content -->
          <div class="content" id="gallery">
            <div class="content_resize"> 
              <?php if (isset($slider)) { ?>
                <div class="separator"></div>
              <?php } ?>

              <?php
                $show_genres_filter = 'yes';
                if ($this->config->item('show_genres_filter') !== FALSE) $show_genres_filter = $this->config->item('show_genres_filter');
                if ($show_genres_filter == 'yes') {
              ?>

              <div class="content_full_size">
                <div class="category-title"><?php echo $category1; ?></div>
                <?php echo $items_category_1; ?>
                <div class="clr"></div>
              </div>
              <div class="content_full_size">
                <div class="category-title"><?php echo $category2; ?></div>
                <?php echo $items_category_2; ?>
                <div class="clr"></div>
              </div>
              <div class="content_full_size">
                <div class="category-title"><?php echo $category3; ?></div>
                <?php echo $items_category_3; ?>
                <div class="clr"></div>
              </div>
              
              <?php } ?>

              <?php
                if ($show_genres_filter == 'no') {
              ?>

              <div class="content_full_size">
                <br>
                <?php echo $items_category_1; ?>
                <div class="clr"></div>
              </div>
              
              <?php } ?>

              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>
          <!-- /content -->
