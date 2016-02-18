<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en">
    <head>
        <title>1Spot Media Portal</title>
        <meta name="description" content="Challenging the future of TV">
            <meta name="keywords" content="website, business, store" />
            <meta name="robots" content="index, follow" />
            <meta name="google-site-verification" content="sgX8x5zuGC0Ql12s5XaBVWkBF4RY1fEJJGKkzkoedEI" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

                <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/style_bst.css" />
                <!--<link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/skeleton.css"/>-->

                <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/menusm.css" />
                <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>ui_totop/css/ui.totop.css" />
                <link rel="stylesheet" type="text/css" href="<?php echo common_asset_url(); ?>preloader/css/preloader.css" rel="stylesheet" />
                <link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"/>
                <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/dialogs.css" />
                <link href="<?php echo asset_url(); ?>css/bootstrap.css" rel="stylesheet"/>

                <!-- Javascript files -->
                <script type="text/javascript" src="//code.jquery.com/jquery-2.1.4.min.js"></script>
                <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/bootstrap.min.js"></script>

                <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/scripts.js"></script>


                <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/kinetic-v4.5.4.min.js"></script>
                <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/greensock/TweenMax.min.js"></script>
                <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/greensock/plugins/KineticPlugin.min.js"></script>
                <script type="text/javascript" src="<?php echo common_asset_url(); ?>preloader/js/jquery.preloader.js" charset="utf-8"></script>
                <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jquery.gsap.min.js" charset="utf-8"></script>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js"></script>

                <script type="text/javascript" src="<?php echo asset_url(); ?>ui_totop/js/jquery.ui.totop.js" charset="utf-8"></script>
                <script type="text/javascript" src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

                <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
                <script type="text/javascript">stLight.options({publisher: "5a4dfa75-6ae8-4a93-a4b6-1054af491e52", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
                <script type='text/javascript' src="<?php echo common_asset_url(); ?>js/jquery.flexslider-min.js"></script>



                <!-- DCodes -->
                <link rel="stylesheet" type="text/css" href="http://cdn.dcodes.net/2/social_icons/dc_social_icons.css" />
                <link type="text/css" rel="stylesheet" href="http://cdn.dcodes.net/2/pricingtables/css/dc_pricingtables.css" />

                <!-- BrainTree -->
                <script type="text/javascript" src="https://js.braintreegateway.com/v2/braintree.js"></script>

                <!-- EasyTabs -->
                <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jquery.hashchange.min.js" charset="utf-8"></script>
                <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jquery.easytabs.min.js" charset="utf-8"></script>


                <!-- Styled Combos -->
                <script type='text/javascript' src="<?php echo common_asset_url(); ?>js/select.js"></script>

                <script>
                    $(function () {

                        var tz = jstz.determine();
                        timezone_offset = tz.name();

                        $('#brand_logo').on('click', function (event) {
                            window.location.href = '<?php echo base_url(); ?>';
                        });


                        $('#btn-login').on('click', function (event) {
                            window.location.href = '<?php echo base_url() . 'index.php/account/signin'; ?>';
                        });

                        $('#editbox_search').keypress(function (e) {
                            if (e.which == 13) {
                                search();
                            }
                        });

                        $('.navbar-form').on('submit', function (event) {
                            event.preventDefault();
                            search();
                        })


                        $('#button_search').on('click', function (event) {
                            search();
                        });

                        $('.account_name').on('mouseover', function () {
                            $('.user-icon').css('background-image', 'url(<?php echo asset_url(); ?>images/user_icon.png)');

                        });

                        $('.link_logout').on('mouseover', function () {
                            $('.lock-icon').css('background-image', 'url(<?php echo asset_url(); ?>images/lock_icon.png)');
                        });

                        $('.account_name').on('mouseleave', function () {
                            $('.user-icon').css('background-image', 'url(<?php echo asset_url(); ?>images/user_icon.png)');

                        });

                        $('.link_logout').on('mouseleave', function () {
                            $('.lock-icon').css('background-image', 'url(<?php echo asset_url(); ?>images/lock_icon.png)');
                        });


                    });

                    function search() {
                        if ($('#editbox_search').val()) {
                            window.location.href = '<?php echo base_url(); ?>index.php/search/vod/keyword/' + $('#editbox_search').val();
                        }
                    }
                </script>

                <script>
                    $(function () {




                        $('img.hover_enabled').hover(sourceSwap, sourceSwap);
                    });

                    var sourceSwap = function () {
                        var $this = $(this);
                        var newSource = $this.data('alt-src');
                        $this.data('alt-src', $this.attr('src'));
                        $this.attr('src', newSource);
                    }
                </script>

                <style>





                    <?php if ($this->config->item('cover_info_height') !== FALSE) { ?>
                        .vod_pic {
                            height: <?php echo $this->config->item('cover_info_height'); ?>;
                        }
                    <?php } ?>

                    <?php if ($this->config->item('cover_info_width') !== FALSE) { ?>
                        .vod_social_buttons {
                            width: <?php echo $this->config->item('cover_info_width'); ?>;
                        }

                    <?php } ?>

                    <?php if ($this->config->item('button_play_image') !== FALSE) { ?>
                        #button_play {
                            padding-left: <?php echo $this->config->item('button_play_padding_left'); ?>;
                            background: url(<?php echo base_url(); ?>assets/images/<?php echo $this->config->item('button_play_image'); ?>) no-repeat;
                            width:  <?php echo $this->config->item('button_play_width'); ?>;
                        }  
                    <?php } ?>

                </style>
                <script>
                    (function (i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function () {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                        a = s.createElement(o),
                                m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
                    ga('create', 'UA-55351355-2', 'auto');
                    ga('send', 'pageview');
                </script>
                </head>


                <body>

                    <nav class="navbar navbar-default navbar-fixed-top" id="navbar2">

                    <div id="header_bar_bg">
                        <div id="header_bar"></div>
                        </div>
                    </div>

                        <div class="navbar-header">

                            <a class="navbar-brand" id="brand_logo" href="#"></a>

                            <button type="button" id="navbar-toggle" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>

                        </div>

                        <div class="navbar-collapse collapse" id="navbar" style="padding-right: 2em;">

                            <ul class="nav navbar-nav">

                                <li <?php echo ($section == "featured" ? "class='active'" : ""); ?>><a href="<?php echo base_url(); ?>">Video On Demand</a></li>

                                <li <?php echo ($section == "live" ? "class='active'" : ""); ?>><a href="<?php echo base_url(); ?>index.php/live/main">Live</a></li>

                                <li <?php echo ($section == "live_events" ? "class='active'" : ""); ?>><a href="<?php echo base_url(); ?>index.php/live_events/main">Pay Per View</a></li>

                                <li <?php echo ($section == "about_us" ? "class='active'" : ""); ?>><a href="<?php echo base_url() . 'index.php/static_content/about_us'; ?>">About Us</a></li>

                                <li <?php echo ($section == "faqs" ? "class='active'" : ""); ?>><a href="<?php echo base_url() . 'index.php/static_content/faqs'; ?>">Support</a></li>

                            </ul>

                            <ul class="nav navbar-nav navbar-right">

                                <li><a href="#"><span class="glyphicon glyphicon-search" id="mglass_search"></span></a></li>

                                <?php
                                if (!isset($_SESSION['uvod_user_data']) || !isset($_SESSION['uvod_user_data']->token)) {
                                    ?>
                                    <li><button id="btn-login" type="submit" class="btn btn-default btn-sm">LOG IN</button></li>
                                    <?php
                                } else {
                                    $first_letter = substr($_SESSION['uvod_user_data']->firstName, 0, 1);
                                    $second_letter = substr($_SESSION['uvod_user_data']->lastName, 0, 1);
                                    ?>

                                    <li class="dropdown">

                                        <a id="square_a" href="#" class="dropdown-toggle square_profile_header" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?php echo strtoupper($first_letter . $second_letter); ?><span class="caret"></span></a>

                                        <ul class="dropdown-menu">

                                            <li id="sub_m"><a href="<?php echo base_url(); ?>index.php/account/my_account_ssl">My Account</a></li>

                                            <li id="sub_m"><a href="<?php echo base_url() . 'index.php/account/logout_ssl'; ?>">Log Out</a></li>

                                        </ul>


                                    </li>

                                    <?php
                                }
                                ?>

                            </ul>

                        </div>

                    </nav>






