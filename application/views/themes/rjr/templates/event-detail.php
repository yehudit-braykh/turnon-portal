
<?php
if (isset($events->content) && sizeof($events->content) > 0) {
    $data = $events->content[0];
    $event_time = ($data->event_date - (time() * 1000)) / 1000;
    ?>
    <script>

        $(document).ready(function () {

    <?php echo 'event_time=' . $event_time . ';'; ?>
            var d = new Date(<?php echo $event_time; ?>)
            var difference = d.getTimezoneOffset();

            var clock = $('#countdown').FlipClock((difference * 60) + event_time, {
                clockFace: 'DailyCounter',
                countdown: true
            });

            $("#btn_buy_tickets").click(function () {
                $('#popup_login').bPopup();
            });

        });



    </script>


    <div class="container">

        <div class="content_info">

            <div class="col-sm-5 pic_events">

                <?php if ($data->live_now) {
                    ?>
                    <div class="col-sm-12 live_now_advise">LIVE NOW</div>
                    <?php
                }
                ?>
                <img class="img_events" src="<?php echo $data->image; ?>">

            </div>

            <div class="col-sm-7 info_events">

                <div class="col-sm-12" id="col_info_sm">

                    <?php if (!$data->live_now) {
                        ?>
                        <h3><small>BEGINNING IN:</small></h3>
                        <div class="live_events_countdown">
                            <div id="countdown"></div>
                        </div>
                    <?php }
                    ?>

                    <h2 class="event-detail-title"><?php echo $data->name; ?><br>
                        <small>
                            <?php 
                             $tz = 'EST';
                            $timestamp = $data->event_date / 1000;
                            $dt = new DateTime("now", new DateTimeZone($tz)); //first argument "must" be a string
                            $dt->setTimestamp($timestamp); //adjust the object to correct timestamp
                            $event_date = $dt->format('l, F d, Y - H:i');

                            echo $event_date . ' Hours EST - US $' . $data->price;

                            ?></small>
                    </h2>

                    <h5 class="vod_info_credit_item_value"><?php echo $data->description; ?></h5>
                    <div class="dc_clear"></div>
                    <?php
                    if (isset($data->already_purchased) && $data->already_purchased) {
                        if ($data->live_now) {
                            ?>
                            <div class='already_purchased_msg'>YOUR TICKET IS READY!<br><b>PLEASE STAND BY FOR THE LIVE STREAM OF THE 2016 REBEL SALUTE!</b></div>
                            <button type="button" class="btn btn-primary btn-lg btn_events" onclick="button_play_clickHandler()" role="button">Watch now</button>

                            <?php
                        } else {
                            ?>
                            <div class='already_purchased_msg'>ALREADY PURCHASED!</div>               
                            <div class='already_purchased_sub_msg'>Your ticket is ready.</div>
                            <?php
                        }
                    } else {
                        ?>
                        <a href="<?php echo base_url(); ?>index.php/live_events/buy_events" class="btn btn-primary btn-lg btn_events" role="button">Buy your ticket now!</a>

                        <?php
                    }
                    ?>

                </div>



            </div>
        </div>



    </div>

    <?php
}
?>