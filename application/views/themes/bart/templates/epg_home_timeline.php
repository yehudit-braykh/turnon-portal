
<div id="epg_preview_container">

    <div class="epg_title">LIVE CHANNELS</div>

    <?php
    if (isset($epg)) {
        
        if (isset($epg->content->entries)) {
            $epg_data = $epg->content->entries;
            if ($epg_data) {
                foreach ($epg_data as $value) {
                    ?>      
                    <div class="channel_data">
                        <div id="epg_preview_channel">
                            <div class="epg_preview_channel_info"><?php echo $value->media->title; ?></div>
                        </div>
                        <?php
                        if (isset($value->epg) && sizeof($value->epg) > 0) {
                            $size = sizeof($value->epg);
                            if ($size > 6) {
                                $size = 6;
                            }
                            for ($i = 0; $i < $size; $i++) {
                                ?>
                                <div class="epg_preview_program <?php if ($i == 0) echo 'epg_selected'; ?>" id="<?php echo $value->id; ?>">
                                    <div class="epg_preview_program_time"><?php echo date('h:i A', $value->epg[$i]->{'pllisting$startTime'} / 1000); ?></div>
                                    <div class="epg_preview_program_info"><?php echo $value->epg[$i]->{'pllisting$program'}->{'pl$title'}; ?></div>
                                </div>
                                <?php
                            }
                        }
                        ?>
                    </div>
                    <?php
                }
            }
        }
    }
    ?>

</div>

