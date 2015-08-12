<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en">
    <head>
        <title>1Spot Media Portal</title>
        <meta name="description" content="Challenging the future of TV">
            <meta name="keywords" content="website, business, store" />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

                <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/style.css" />
                <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/skeleton.css">
                    <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/layout.css">
                        <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/menusm.css" />
                        <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>ui_totop/css/ui.totop.css" />
                        <link rel="stylesheet" type="text/css" href="<?php echo common_asset_url(); ?>preloader/css/preloader.css" rel="stylesheet" />
                        <link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"/>
                        <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/dialogs.css" />

                        <!-- Javascript files -->
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jquery.min.js"></script>

                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/scripts.js"></script>
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/menusm.js"></script>
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/head_html_default_block.js"></script>
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/kinetic-v4.5.4.min.js"></script>
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/greensock/TweenMax.min.js"></script>
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/greensock/plugins/KineticPlugin.min.js"></script>
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>preloader/js/jquery.preloader.js" charset="utf-8"></script>
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jquery.gsap.min.js" charset="utf-8"></script>

                        <script type="text/javascript" src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/buttons.js"></script>
                        <script type="text/javascript">stLight.options({publisher: "5a4dfa75-6ae8-4a93-a4b6-1054af491e52", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
                        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js"></script>

                        <!-- DCodes -->
                        <link rel="stylesheet" type="text/css" href="<?php echo common_asset_url(); ?>css/dc_social_icons.css" />
                        <link type="text/css" rel="stylesheet" href="<?php echo common_asset_url(); ?>css/dc_pricingtables.css" />

                        <!-- BrainTree -->
                        <script type="text/javascript" src="//js.braintreegateway.com/v2/braintree.js"></script>

                        <!-- EasyTabs -->
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jquery.hashchange.min.js" charset="utf-8"></script>
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/jquery.easytabs.min.js" charset="utf-8"></script>

                        <!-- Config User Interface Box Import -->
                        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/head_html_block.js"></script>

                        <!-- Styled Combos -->
                        <script type='text/javascript' src="<?php echo common_asset_url(); ?>js/select.js"></script>
        

                        <script>
                            $(function () {

                                var tz = jstz.determine();
                             
                                timezone_offset = tz.name();

                                $('#logo_left').on('click', function (event) {
                                    window.location.href = '<?php echo base_url(); ?>';
                                });
                                $('#top_menu_vod').on('click', function (event) {
                                    window.location.href = '<?php echo base_url(); ?>';
                                });
                                $('#top_menu_live').on('click', function (event) {

                                    window.location.href = '<?php echo base_url(); ?>index.php/live/main';
                                });
                                $('#top_menu_account').on('click', function (event) {
                                    window.location.href = '<?php echo base_url(); ?>index.php/account/my_account';
                                });
                                $('#editbox_search').keypress(function (e) {
                                    if (e.which == 13) {
                                        search();
                                    }
                                });
                                $('#button_search').on('click', function (event) {
                                    search();
                                });

                                $('.account_name').on('mouseover', function () {
                                    $('.user-icon').css('background-image', 'url(<?php echo asset_url(); ?>images/user_icon_over.png)');

                                });

                                $('.link_logout').on('mouseover', function () {
                                    $('.lock-icon').css('background-image', 'url(<?php echo asset_url(); ?>images/lock_icon_over.png)');
                                });

                                $('.account_name').on('mouseleave', function () {
                                    $('.user-icon').css('background-image', 'url(<?php echo asset_url(); ?>images/user_icon.png)');

                                });

                                $('.link_logout').on('mouseleave', function () {
                                    $('.lock-icon').css('background-image', 'url(<?php echo asset_url(); ?>images/lock_icon.png)');
                                });


                            });

                            function search() {
                                var keysearch = $('#editbox_search').val()
                                if ($('#editbox_search').val()) {
                                    window.location.href = '<?php echo base_url(); ?>index.php/search/vod/keyword/' + keysearch;
                                }

                            }
                        </script>

                        <script>
                            $(function () {
                                $('#top_sub_menu1').on('click', function (event) {
                                    window.location.href = '<?php echo base_url(); ?>index.php/vod/section/featured';
                                });

<?php
for ($i = 0; $i < sizeof($vod_categories); $i++) {
    echo "\n";
    echo "$('#top_sub_menu_" . $vod_categories[$i]->id . "').on('click', function(event) {\n";
    echo "  window.location.href = '" . base_url() . "index.php/vod/section/" . $vod_categories[$i]->id . "';\n";
    echo "});\n";
}
?>

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

                            <?php if ($this->config->item('logo_file') !== FALSE) { ?>
                                #logo_left { 
                                    width:<?php echo $this->config->item('logo_width'); ?>;
                                    height:<?php echo $this->config->item('logo_height'); ?>; 
                                    top:<?php echo $this->config->item('logo_top'); ?>;
                                    background: url(<?php echo asset_url(); ?>images/<?php echo $this->config->item('logo_file'); ?>) no-repeat center center;
                                    position: absolute;
                                }
                            <?php } ?>

                            <?php if ($this->config->item('logo_bottom_file') !== FALSE) { ?>
                                #logo_footer {
                                    width:<?php echo $this->config->item('logo_bottom_width'); ?>;
                                    height:<?php echo $this->config->item('logo_bottom_height'); ?>; 
                                    background: url(<?php echo base_url(); ?>assets/images/<?php echo $this->config->item('logo_bottom_file'); ?>) no-repeat top left;
                                }
                            <?php } ?>

                            <?php if ($this->config->item('menu_highlight_color') !== FALSE) { ?>
                                .menu_navigation_selected {
                                    color: <?php echo $this->config->item('menu_highlight_color'); ?>;
                                }
                                .top_menu a:hover{ 
                                    color: <?php echo $this->config->item('menu_highlight_color'); ?>;
                                }
                                .top_menu div:hover {
                                    color: <?php echo $this->config->item('menu_highlight_color'); ?>;
                                }
                                .top_sub_menu_selected {
                                    color: <?php echo $this->config->item('menu_highlight_color'); ?> !important;
                                }
                                .top_sub_menu div:hover{ 
                                    color: <?php echo $this->config->item('menu_highlight_color'); ?> !important; cursor: pointer; 
                                }
                            <?php } ?>

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


                        <script type="text/javascript">

                            var _gaq = _gaq || [];
                            _gaq.push(['_setAccount', 'UA-55351355-2']);
                            _gaq.push(['_trackPageview']);

                            (function () {
                                var ga = document.createElement('script');
                                ga.type = 'text/javascript';
                                ga.async = true;
                                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                                var s = document.getElementsByTagName('script')[0];
                                s.parentNode.insertBefore(ga, s);
                            })();

                        </script>
                        <!-- Start of Unified Video Technologies Zendesk Widget script -->
                        <script>/*<![CDATA[*/window.zEmbed || function (e, t) {
                                var n, o, d, i, s, a = [], r = document.createElement("iframe");
                                window.zEmbed = function () {
                                    a.push(arguments)
                                }, window.zE = window.zE || window.zEmbed, r.src = "javascript:false", r.title = "", r.role = "presentation", (r.frameElement || r).style.cssText = "display: none", d = document.getElementsByTagName("script"), d = d[d.length - 1], d.parentNode.insertBefore(r, d), i = r.contentWindow, s = i.document;
                                try {
                                    o = s
                                } catch (c) {
                                    n = document.domain, r.src = 'javascript:var d=document.open();d.domain="' + n + '";void(0);', o = s
                                }
                                o.open()._l = function () {
                                    var o = this.createElement("script");
                                    n && (this.domain = n), o.id = "js-iframe-async", o.src = e, this.t = +new Date, this.zendeskHost = t, this.zEQueue = a, this.body.appendChild(o)
                                }, o.write('<body onload="document._l();">'), o.close()
                            }("//assets.zendesk.com/embeddable_framework/main.js", "univtec.zendesk.com");/*]]>*/</script>
                        <!-- End of Unified Video Technologies Zendesk Widget script -->                        


                        </head>
                        <body>
                            <div class="index_page">
                                <div class="body_pattern">
                                    <div class="container">
                                        <div class="main">
                                            <div class="header">
                                                <div id="header_bar_bg">
                                                    <div id="header_bar">

                                                        <div id="header_bar_tweet">

                                                        </div>
                                                        <div id="header_bar_posted">

                                                        </div>
                                                        <div id="header_bar_icons">

                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="header_menu_bg">
                                                    <div id="header_menu">
                                                        <div id="logo_left"></div>
                                                        <div class="top_menu">
<?php
// menu highlight config
$highlight_color = 'rgb(255,0,0)';
if ($this->config->item('menu_highlight_color') !== FALSE) {
    $highlight_color = $this->config->item('menu_highlight_color');
}
?>
                                                            <div id="top_menu_vod"     <?php echo ($section == "vod" ? 'style="color:' . $highlight_color . ';"' : ""); ?>>Video on Demand</div>
                                                            <div id="top_menu_live"    <?php echo ($section == "live" ? 'style="color:' . $highlight_color . ';"' : ""); ?>>LIVE</div>
                                                            <div id="top_menu_about"> <a <?php echo ($section == "about_us" ? 'style="color:' . $highlight_color . ';"' : ""); ?> href="<?php echo base_url() . 'index.php/static_content/about_us'; ?>">ABOUT US</a></div>
                                                            <div id="top_menu_support"> <a <?php echo ($section == "faqs" ? 'style="color:' . $highlight_color . ';"' : ""); ?> href="<?php echo base_url() . 'index.php/static_content/faqs'; ?>">SUPPORT</a></div>
                                                            <div id="top_menu_support" <?php echo ($section == "support" ? 'style="color:' . $highlight_color . ';"' : ""); ?> style="display: none;">SUPPORT</div>
                                                            <div id= "search" class="search">
                                                                <input id="button_search" src="<?php echo asset_url(); ?>images/search_btn.png" class="button_search" type="image" />
                                                                <span>
                                                                    <input name="editbox_search" class="editbox_search" id="editbox_search" maxlength="80" value="Search..."  onblur="if (this.value == '')
                                                                                this.value = 'Search...';" onfocus="if (this.value == 'Search...')
                                                                                            this.value = '';" type="text" />
                                                                </span>
                                                            </div>
                                                            <div id="top_menu_account" <?php echo ($section == "account" ? 'style="color:' . $highlight_color . ';"' : ""); ?>>
<?php
if (!isset($_SESSION['uvod_user_data']) || !isset($_SESSION['uvod_user_data']->token)) {
    echo "<div id='signin' style='padding-top:12px;'>LOG IN / REGISTER</div>";
} else {
    $logout = base_url() . 'index.php/account/logout';
    echo "<div class='account_name'><div class='user_name'>" . $_SESSION['uvod_user_data']->firstName . "</div><div class='user-icon'></div></div><div class='link_logout'><div class='lock-icon'></div><a href='" . $logout . "'>Logout</a></div><div class='my_account'>My Account | </div>";
}
?>                
                                                            </div>
                                                        </div>
                                                        <div id="header_sep"class="header_sep"></div>