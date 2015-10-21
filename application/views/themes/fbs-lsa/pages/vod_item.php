<script src="//jwpsrv.com/library/KdH5zknzEeS1zyIACy4B0g.js"></script>

<script type="text/javascript">

var vod_item_player;

$(function () {

    vod_item_player = jwplayer("jw_live_player").setup({
        primary: 'flash',
        androidhls: true,
        aspectratio: "16:9",
        width: $('.content_video_fs').width(),
        <?php
        if(sizeof($renditions) > 0){
        ?>
            sources: [
                <?php 
                    for($i=0;$i<sizeof($renditions);$i++){
                      if($i===0){
                           echo '{file:"'.$renditions[$i]->file.'",label:"'.$renditions[$i]->label.'","default": "true"}';
                      }else{
                           echo ',{file:"'.$renditions[$i]->file.'",label:"'.$renditions[$i]->label.'"}';
                      }
                    }
                ?>
            ],
        <?php
        }else{
            echo 'file:"'.$hls_streaming.'",';
        }
        ?>
        events: {
            onPlay: function(e) {
                handleOnMediaStart();
            },
            onComplete: function(e){
                handleOnMediaEnd();
            },
            onReady: function(e){

            }
        }
        , advertising: {
            client: 
                'googima',
                tag: ''
        }
    });
});
                                                
function handleOnMediaStart(){
 
     _gaq.push(['_trackEvent', 'Videos', 'Play', "<?php echo str_replace('"', '', $item_id).'-'.str_replace('"', '',$item_title); ?>"]);
}
                                                
function handleOnMediaEnd(){
     _gaq.push(['_trackEvent', 'Videos', 'End', "<?php echo str_replace('"', '',$item_id).'-'.str_replace('"', '',$item_title); ?>"]);
}
                                                
</script>
     
<!-- content [Mr]-->

    <div class="clr"></div>


<div class="banner_adv">PUBLICIDAD</div>

<div class="container_fs_ppal">

    
    <div class="container_fs">

        <div class="content_fs">

            <h1><?php echo $item_title; ?></h1>

            <div class="content_video_fs">
                <div id="jw_live_player">Loading the player...</div>
            </div>

            <div class="description_video_fs">
                <?php echo $item_description; ?>
            </div>

        </div>

        <div class="sidebar_fs"></div>

        <div class="clear_fs"></div>

    </div>


<!-- END content [Mr] -->