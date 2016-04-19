<script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jwplayer/jwplayer.js" ></script>
<script>jwplayer.key = "BFr/jM6cxDTO5jdihqzp0fQ3Advd0Q8Fp6FUqw==";</script>

<script type="text/javascript">

var vod_item_player;

$(function () {

    <?php echo 'base_url = "' . base_url() . '";'; ?>
    <?php echo 'media_type="' . $item_media_type . '";'; ?>
     
    if (media_type == 'tv_show') {
        $('#tab-container').easytabs('select', '#tab1');
    }
            
    var width = $(window).width();

    if (width >= 960) {
        $(".content_centered").css("width","960px")
    }

    $('#vod_item_sub_menu1').on('click', function (event) {

        if ($('#vod_item_sub_menu_container1').html()) return;
        show_preloader(1);
        $('#vod_item_sub_menu_container1').load('<?php echo base_url(); ?>index.php/vod_item/info/id/<?php echo $item_id; ?>');
        set_item_sub_menu_selection('#vod_item_sub_menu1');
        return false;
    });

    $('#vod_item_sub_menu2').on('click', function (event) {
        button_show_episodes_clickHandler();
    });

    $('#vod_item_sub_menu3').on('click', function (event) {

        if ($('#vod_item_sub_menu_container3').html() != "") {
            return;
        }

        show_preloader(3);

        $('#vod_item_sub_menu_container3').load('<?php echo base_url(); ?>index.php/vod_item/critics/id/<?php echo $item_id; ?>');
        set_item_sub_menu_selection('#vod_item_sub_menu3');
        return false;
    });

    $('#vod_item_sub_menu4').on('click', function (event) {

        if ($('#vod_item_sub_menu_container4').html()) return;

        show_preloader(4);

        $('#vod_item_sub_menu_container4').load('<?php echo base_url(); ?>index.php/vod_item/comments/id/<?php echo $item_id; ?>');
        set_item_sub_menu_selection('#vod_item_sub_menu4');
        return false;
    });

    $(document).on('click', '#forgot_btn', function () {
        window.location = base_url + 'index.php/account/forgot';
    });

    $(document).on('click', '.vod_show_episodes', function () {
        button_show_episodes_clickHandler();
    });

    $(document).on('click', '.pic_show_episode', function () {
        button_show_episodes_clickHandler();
    });

    $(document).on('submit', "#login_form", function (e) {

        $.ajax({
            url: base_url + 'index.php/account/login',
            type: 'POST',
            dataType: 'json',
            data: 'email=' + $('#email').val() + '&password=' + $('#password').val(),
            success: function (data) {
                if (data.error) {
                    $('#popup_error').html(data.message);
                    $('#popup_error').fadeIn('slow');
                    $('#password').val('');
                } else {
                    location.reload();
                }
            }
        });
        return false;
    });

    $(document).on('submit', '#register_form', function () {
        window.location = base_url + 'index.php/account/register';
        return false;
    });

    $(document).on('submit', '#suscriber_form', function () {
        window.location = base_url + 'index.php/account/subscription_ssl';
        return false;
    });

    $(document).on('focus', '#email', function () {
        $('#popup_error').fadeOut('slow');
        $('#popup_error').html('');
    });

    $(document).on('focus', '#password', function () {
        $('#popup_error').fadeOut('slow');
        $('#popup_error').html('');
    });
});

function show_preloader(id) {
    $("#vod_item_sub_menu_container" + id).html('<div class="preloader_section" alt="Loading...">&nbsp;</div>');
}

function set_item_sub_menu_selection(item) {

    $('#vod_item_sub_menu1').removeClass();
    $('#vod_item_sub_menu2').removeClass();
    $('#vod_item_sub_menu3').removeClass();
    $('#vod_item_sub_menu4').removeClass();

    $(item).addClass('vod_item_sub_menu_selected');
}

function button_play_clickHandler() {

    $.ajax({
        url: base_url + 'index.php/vod_item/check_commerce_status',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            switch (data) {
                case 'enabled':
                    $('.player_container .col-sm-2').css('min-height','1px');
                    $('.player_container .col-sm-8').css('min-height','1px');
                    $('.player_container').css('background-color','#000');

                    $('#back_button_container').hide();
                    $('#vod_item_player_container').show();
                    $('#vod_item_player_close').show();

                    setup_player();

                    TweenMax.set("#vod_item_player_container", {height: "auto"});
                    TweenMax.from("#vod_item_player_container", 1, {height: 0});
                    TweenMax.fromTo("#vod_item_player_close", 1, {alpha: 0}, {alpha: 1});
                    
                    setInterval(function () {

                        $.ajax({
                            url: base_url + 'index.php/account/check_status',
                            type: 'POST',
                            dataType: 'json',
                            success: function (data) {
                                if(data.status == 'error'){
                                     window.location = base_url;
                                }
                            }
                        })
                    }, 120000);

                    break;
                case 'login':
                    $('#popup_login').bPopup();
                    break;
                case 'subscriber':
                    $('#popup_subscriber').bPopup();
                    break;
            }
        }
    });
}

function setup_player(ready_handler) {

    vod_item_player = jwplayer("jw_live_player").setup({
        primary: 'flash',
        androidhls: true,
        autostart: true,
        aspectratio: "16:9",
        width: "100%",
        aboutlink: '',
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
        events: {
            onPlay: function(e) {
                handleOnMediaStart();
            },
            onComplete: function(e){
                handleOnMediaEnd();
            }
        }
        <?php if($adPolicyId !=''){ ?>
        , advertising: {
            client: 
                'vast',
                'skipoffset': 5,
                tag: base_url + 'index.php/vod/get_advertisement_xml?policy_id=' + <?php echo $adPolicyId;?>
        }
        <?php } ?>
    });

}

function button_play_trailer_clickHandler() {


    TweenMax.to("#vod_item_player_container", 1, {height: 525, ease: Quart.easeInOut, onComplete: function () {

        <?php if(isset($item_trailer_release_url) && $item_trailer_release_url !='') { ?>
            
            jwplayer("jw_live_player").setup({
                file: "<?php echo $item_trailer_release_url; ?>",
                primary: 'flash',
                androidhls: true,
                autostart: true,
                aspectratio: "16:9",
                width: "100%"
            });
        <?php
        }
        ?>
        $('#back_button_container').css({display: "none"});

    }});
}

function button_close_clickHandler() {

    TweenMax.to("#vod_item_player_container", 1, {height: 0});
    TweenMax.to("#vod_item_player_close", 1, {alpha: 0, onComplete: function() {
        $("#vod_item_player_container").hide();
        $("#vod_item_player_close").hide();
        $('.player_container .col-sm-2').css('min-height','0px');
        $('.player_container .col-sm-8').css('min-height','0px');
        $('#back_button_container').show();
    }});
}

function button_back_clickHandler() {

    window.history.go(-1);

    return false;
}

function button_show_episodes_clickHandler() {
    $('#tab-container').easytabs('select', '#tab2');

    if ($('#vod_item_sub_menu_container2').html() != "") {
        return;
    }

    show_preloader(2);

    $('#vod_item_sub_menu_container2').load('<?php echo base_url(); ?>index.php/vod_item/seasons/id/<?php echo $item_id; ?>');
            set_item_sub_menu_selection('#vod_item_sub_menu2');
            return false;
}
                                                
function handleOnMediaStart(){
 
     _gaq.push(['_trackEvent', 'Videos', 'Play', "<?php echo str_replace('"', '', $item_id).'-'.str_replace('"', '',$item_title); ?>"]);
}
                                                
function handleOnMediaEnd(){
     _gaq.push(['_trackEvent', 'Videos', 'End', "<?php echo str_replace('"', '',$item_id).'-'.str_replace('"', '',$item_title); ?>"]);
}
                                                
</script>


     
        <!-- content -->

        <div class="container-fluid player_container">
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
                
                <div id="vod_item_player_container">
                    <div id="jw_live_player">Loading the player...</div>
                </div>
                <div id="vod_item_player_close"><a href="#" onclick="button_close_clickHandler()">close</a></div>

            </div>
            <div class="col-sm-2"></div>
        </div>

        <div class="container">

            <div class="content_info">

                <div class="col-sm-12">
                    <h2><?php echo $item_title; ?><br>
                    <?php
                      if (isset($aired_date) && $aired_date !== '' && $item_media_type != 'tv_show'){
                    ?>
                        <small><?php echo date('F d, Y', $aired_date/1000); ?></small>
                      <?php
                      }
                      ?>
                    </h2>
                </div>

                <div class="col-sm-5 pic_vod">

                        <div class="vod_pic_container">

                            <?php
                         
                            if ($item_media_type == 'tv_show') {
                                ?>
                                <img class="pic_show_episode" src="<?php echo $item_cover; ?>"/>
                                <?php
                            } else if ($item_media_type == 'episode' || $item_media_type == 'clip') {                            
                                ?>
                                <div class="ribbon_content <?php echo $item_commerce; ?>" onclick="button_play_clickHandler()"></div>  
                                <img src="<?php echo $item_cover; ?>" />
                                <?php
                            }
                            ?>

                        </div>

                        <div class="social_content">
                            <span class='st_facebook_large' displayText='Facebook'></span>
                            <span class='st_twitter_large' displayText='Tweet'></span>
                            <span class='st_googleplus_large' displayText='Google +'></span>
                        </div>

                </div>

                <div class="col-sm-7 info_vod">

                    <div class="col-sm-12">
                        <!--<div class="vod_back" onclick="button_back_clickHandler()"></div>-->
                        <?php
                        $show_trailer_button = "yes";
                        if ($this->config->item('show_trailer_button') !== FALSE)
                            $show_trailer_button = $this->config->item('show_trailer_button');
                        if ($show_trailer_button == "yes") {
                            echo '<div class="vod_play_trailer" onclick="button_play_trailer_clickHandler()"></div>';
                        }
                        ?>
                        <?php
                        if ($item_media_type != 'tv_show') {
                            ?>
                            <button type="button" class="btn btn-primary btn-lg" onclick="button_play_clickHandler()">PLAY</button>
                        <?php } else {
                            ?>
                            <div class="vod_show_episodes"></div>
                        <?php }
                        ?>
                        <button type="button" class="btn btn-default btn-lg" onclick="button_play_trailer_clickHandler()">TRAILER</button>
                    </div>

                    <div class="dc_clear"></div>

                    <div class="col-sm-12 vod_info_container">
                        <div id="vod_item_sub_menu_container1">
                            <?php $this->load->view(views_url() . 'templates/vod_item_info'); ?>
                        </div>
                    </div>

                </div>

            </div>

            
           

         </div>  

<div style="height:150px; clear:both;"></div>

       <!-- <div class="container-fluid vod_related_container">
            <h4>You may also like</h4>
            <?php echo $item_related_items; ?>
        </div> 
      

                            <?php if ($item_media_type == "tv_show") { ?>
                                <div class="vod_info_container">
                                    <div id="vod_item_sub_menu_container2"></div>
                                </div>
                            <?php } ?>
         -->                   
                
         


    <div class="popup" id="popup_login">
        <span class="button b-close"><span>X</span></span>
        <div class="form_title">BECOME A MEMBER TO WATCH THIS...</div>
        <div class="popup_content">
            <div class="col_izq">
                <div class="popup_title">Sign In</div>
                <form id="login_form" class="popup_form">

                    <div class="popup_label">Email Address</div>
                    <input name="email" id="email" class="popup_input" type="email"  required="required"/>

                    <div class="popup_label">Password</div>

                    <input name="password" id="password" class="popup_input" type="password" required="required"/>

                    <div id="forgot_span">Forgot your<a href="#" id="forgot_btn"> password?</a></div>

                    <button class="dialog_button" id="singin_button">Sign In</button>
                    <div id="popup_error"></div>

                </form>

            </div>
            <div class="col_der">
                <form id="register_form" class="popup_form">
                    <div class="popup_title">Not a member?</div>

                    <button class="dialog_button" id="register_btn">Register Now</button>
                </form>
            </div>
        </div>
    </div>

    <div class="popup" id="popup_subscriber">
        <span class="button b-close"><span>X</span></span>
        <div class="form_title">BECOME A SUBSCRIBER TO WATCH THIS...</div>
        <div class="popup_content">
            <form id="suscriber_form" class="popup_form">
                <button class="dialog_button" id="singin_button">Subscribe Now</button>
            </form>
        </div>
    </div>
