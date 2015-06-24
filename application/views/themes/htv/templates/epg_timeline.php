<script>

    base_url = "<?php echo base_url(); ?>";
</script>
<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/features/live_epg.js"></script>

<table id='selectDays' cellspacing="0">
    <tr>
        <td colspan="2" class="epg_channel_name" style="border-left: 8px solid #154c7b;">

        </td>
    </tr>
    <tr>

        <?php
        if (isset($epg->content->entries)) {
            $h = 0;

            foreach ($epg->content->entries as $value) {

                if ($h == 0) {
                    $today = date('l M d, Y');
                    $day = date('l', ($value->{'pllisting$startTime'} / 1000));
                    $date = date('M d, Y', ($value->{'pllisting$startTime'} / 1000));
                    $currentDate = date('l M d, Y', ($value->{'pllisting$startTime'} / 1000));
                    if ($today == $currentDate) {
                        echo '<td class="select_day daySelected" item-time="' . ($value->{'pllisting$startTime'}) . '"><div id="on_today">ON TODAY</div><div class="today_content"><span class="epg_table_day">' . strtoupper($day) . '</span><br>' .
                        '<span class="epg_table_date">' . strtoupper($date) . '</span>' . '</div></td>';
                    }
                    $h++;
                } else {
                    $newDate = date('l M d, Y', ($value->{'pllisting$startTime'} / 1000));
                    if ($currentDate != $newDate) {
                        $day = date('l', ($value->{'pllisting$startTime'} / 1000));
                        $date = date('M d, Y', ($value->{'pllisting$startTime'} / 1000));
                        echo '<td class="select_day" item-time="' . ($value->{'pllisting$startTime'}) . '"><div class="date_content"><span class="epg_table_day">' . strtoupper($day) . '</span><br>' .
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
        if (isset($epg->content->entries) && sizeof($epg->content->entries) > 0) {
            for ($i = 0; $i < sizeof($epg->content->entries); $i++) {


                $currentDate = date('l M d, Y', ($epg->content->entries[$i]->{'pllisting$startTime'} / 1000));

                if ($today == $currentDate) {

//                    $current_time = time();
//                    $time = $epg->content->entries[$i]->{'pllisting$startTime'} / 1000;
//                    $next_time = $epg->content->entries[$i+1]->{'pllisting$startTime'} / 1000;

                    if ($i == 0) {
                        echo '<tr><td class="epgTime current_epg_date">' . date('h:i A', ($epg->content->entries[$i]->{'pllisting$startTime'} / 1000)) . '</td>'
                        . '<td class="epgData" style="border-right:8px solid #ff850a;">' . '<span>' . $epg->content->entries[$i]->{'pllisting$program'}->{'pl$title'} . '</span></td></tr>';
                    }else{
                         echo '<tr><td class="epgTime">' . date('h:i A', ($epg->content->entries[$i]->{'pllisting$startTime'} / 1000)) . '</td>'
                        . '<td class="epgData">' . '<span>' . $epg->content->entries[$i]->{'pllisting$program'}->{'pl$title'} . '</span></td></tr>';
                    }
                }
            }
        }
        ?>
        <script>
<?php
if ($epg->content && $epg->content->entries)
    echo 'var contentEpg= ' . json_encode($epg->content->entries) . ';'
        
?>
        </script>
    </table>
</div>
