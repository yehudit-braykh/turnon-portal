<script>

    base_url = "<?php echo base_url(); ?>";
</script>
<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/features/live_epg.js"></script>

<table id='selectDays' cellspacing="0">
    <tr>
        <td colspan="2" class="epg_channel_name" style="border-left: 8px solid #7f00bf;">

        </td>
    </tr>
    <tr>

        <?php
        if ($epg && isset($epg->content->entries)) {
            $h = 0;

            foreach ($epg->content->entries as $value) {

                if ($h == 0) {
                    $today = date('l M d, Y');
                    $day = date('l', ($value->startTime / 1000));
                    $date = date('M d, Y', ($value->startTime / 1000));
                    $currentDate = date('l M d, Y', ($value->startTime / 1000));
                    if ($today == $currentDate) {
                        echo '<td class="select_day daySelected" item-time="' . ($value->startTime) . '"><div id="on_today">ON TODAY</div><div class="today_content"><span class="epg_table_day">' . strtoupper($day) . '</span><br>' .
                        '<span class="epg_table_date">' . strtoupper($date) . '</span>' . '</div></td>';
                    }
                    $h++;
                } else {
                    $newDate = date('l M d, Y', ($value->startTime / 1000));
                    if ($currentDate != $newDate) {
                        $day = date('l', ($value->startTime / 1000));
                        $date = date('M d, Y', ($value->startTime / 1000));
                        echo '<td class="select_day" item-time="' . ($value->startTime) . '"><div class="date_content"><span class="epg_table_day">' . strtoupper($day) . '</span><br>' .
                        '<span class="epg_table_date">' . strtoupper($date) . '</span>' . '</div></td>';
                        $currentDate = $newDate;
                        $h++;
                    }
                }
            }
        }
        ?>

    </tr>
</table>
<div id="epgData">
    <table id="epgTable">
        <?php
        $today = date('l M d, Y');
        $previous_title = '';
        if ($epg && isset($epg->content->entries) && sizeof($epg->content->entries) > 0) {
            for ($i = 0; $i < sizeof($epg->content->entries); $i++) {


                $currentDate = date('l M d, Y', ($epg->content->entries[$i]->startTime / 1000));

                if ($today == $currentDate) {
                    $title_arr = explode('|', $epg->content->entries[$i]->program->title);

                    if ($country == 'Jamaica') {
                       
                        if ($title_arr[0] != '') {
                            $title = $title_arr[0];
                            if ($i == 0) {
                                echo '<tr class="current_row"><td class="epgTime current_epg_date">' . date('h:i A', ($epg->content->entries[$i]->startTime / 1000)) . '</td>'
                                . '<td class="epgData epgDataCurrent" style="border-right:8px solid #7f00bf;">' . '<span>' . $title . '</span></td></tr>';
                            } else {
                                echo '<tr><td class="epgTime">' . date('h:i A', ($epg->content->entries[$i]->startTime / 1000)) . '</td>'
                                . '<td class="epgData" id="' . $epg->content->entries[$i]->startTime . '">' . '<span>' . $title . '</span></td></tr>';
                            }
                 
                        }
                    } else {
                        if (isset($epg->content->entries[$i]->program->runtime) &&
                                intval($epg->content->entries[$i]->program->runtime) != 0 &&
                                sizeof($title_arr) > 1) {

                            $title = $title_arr[1];
                        } else {
                            $title = $title_arr[0];
                        }
                        
                        if ($i == 0) {
                            echo '<tr class="current_row"><td class="epgTime current_epg_date">' . date('h:i A', ($epg->content->entries[$i]->startTime / 1000)) . '</td>'
                            . '<td class="epgData epgDataCurrent" style="border-right:8px solid #7f00bf;">' . '<span>' . $title . '</span></td></tr>';
                        } else {
                            echo '<tr><td class="epgTime">' . date('h:i A', ($epg->content->entries[$i]->startTime / 1000)) . '</td>'
                            . '<td class="epgData" id="' . $epg->content->entries[$i]->startTime . '">' . '<span>' . $title . '</span></td></tr>';
                        }
                    }
                }
            }
        }
        ?>
        <script>
<?php
if ($epg && $epg->content && $epg->content->entries)
    echo 'var contentEpg= ' . json_encode($epg->content->entries) . ';'
    ?>
</script>
    </table>
</div>
