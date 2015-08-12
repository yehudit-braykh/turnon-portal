              <!-- sub menu 1 -->
              <?php

//                // check if customer use logos only for vod categories
//                
                  for($i=0;$i<sizeof($vod_categories);$i++) { 
                    echo ' <li><a href="'.base_url() . "index.php/vod/section/" . $vod_categories[$i]->id .'" '. ($sub_section1 == $vod_categories[$i]->id ? 'class="active"' : '') . '>' . $vod_categories[$i]->title . '</a></li>';

                  }


              ?>
              <div class="clr"></div>
              <!-- /sub menu 1 -->
