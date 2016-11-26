<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/flipclock/flipclock.min.js"></script>
<link rel="stylesheet" href="<?php echo common_asset_url(); ?>js/flipclock/flipclock.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/events_slider.css">
<link rel="stylesheet" href="<?php echo asset_url(); ?>css/my_carousel.css">
<script type='text/javascript' src="<?php echo common_asset_url(); ?>js/wurfl.js"></script>
<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key = "BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script>

    $(document).ready(function () {
        
        jwplayer("jw_live_player").setup({
            width: '100%',
            autostart: true,
            aspectratio: "16:9",
            file: "<?php echo $url;?>",
            primary: "flash",
        });

    })
</script>
<div class="container-fluid player_container" style="height: 700px;margin: 50px;">
    <div class="col-sm-2"></div>
    <div class="col-sm-8">


            <div id="jw_live_player">Loading the player...</div>
        


    </div>
    <div class="col-sm-2"></div>
</div>