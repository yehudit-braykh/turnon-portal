<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en">
    <head>
        <?php if (!empty($item_title)): ?>
            <title><?php echo $item_title; ?></title>
        <?php else: ?>
            <title>1Spot Media Portal</title>
        <?php endif; ?>

        <?php if (!empty($item_description)): ?>
            <meta name="description" content="<?php echo $item_description; ?>">
        <?php else: ?>
            <meta name="description" content="Challenging the future of TV">
        <?php endif; ?>

        <meta name="keywords" content="website, business, store" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="vD6AjRdZ4j60LaYkzVXhsrF_cBgKDRrpYew0aq1H3uI" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <script src="<?php echo asset_url(); ?>js/lightslider.js"></script>
        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/greensock/TweenMax.min.js"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"/>
        <link rel="stylesheet"  href="<?php echo asset_url(); ?>css/lightslider.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/less.php" />

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
            }("//assets.zendesk.com/embeddable_framework/main.js", "univtec.zendesk.com");/*]]>*/
        </script>
        <!-- End of Unified Video Technologies Zendesk Widget script -->
    </head>

    <body>

        <nav  class="navbar-custom">
            <a id="main-logo" href="<?php echo base_url(); ?>">
                <div class="icon icon-clix-logo-white-319x67">
                </div>
            </a>
            <div class="navbar-header">
                <div>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <nav class='auxiliar-nav'>
                    <div class="navbar nav-collapse">
                        <ul class="nav navbar-nav navbar-right navbar-collapse collapse">
                            <li><a href="<?php echo base_url() . 'index.php/static_content/about_us'; ?>">About Us</a></li>
                            <li><a href="<?php echo base_url() . 'index.php/static_content/faqs'; ?>">Support</a></li>
                            <li class="dropdown<?php echo ($section == "my_account"? " active":"");?>">
                                <?php
                                if (!isset($_SESSION['uvod_user_data']) || !isset($_SESSION['uvod_user_data']->token)) {
                                    ?>
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span id="user-icon" class="glyphicon glyphicon-user"></span></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="<?php echo base_url() . 'index.php/account/signin'; ?>">Log In</a></li>
                                        <li><a href="<?php echo base_url() . 'index.php/account/register_ssl'; ?>">Register</a></li>
                                    </ul>
                                        <?php
                                } else {
                                    $user_name = "  ". $_SESSION['uvod_user_data']->firstName . " " . $_SESSION['uvod_user_data']->lastName;
                                    ?>
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span id="user-icon" class="glyphicon glyphicon-user" style="margin-right: 5px;"></span><?php echo $user_name; ?> </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="<?php echo base_url() . 'index.php/account/my_account_ssl'; ?>">My Account</a></li>
                                        <li role="separator" class="divider"></li>
                                        <li><a href="<?php echo base_url() . 'index.php/account/logout_ssl'; ?>">Logout</a></li>
                                    </ul>
                                        <?php
                                    }
                                    ?>
                            </li>
                        </ul>
                    </div>
                </nav>
                <nav class='main-nav'>

                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"<?php ($sub_section1 == 'featured' ? ' class="active"' : ''); ?>>Video on Demand <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <?php
                                for ($i = 0; $i < sizeof($vod_categories); $i++) {
                                    echo '<li id="top_sub_menu_' . $vod_categories[$i]->id . '"' . ($sub_section1 == $vod_categories[$i]->id ? 'class="active"' : '') . '><a href="#">' . $vod_categories[$i]->title . '</a></li>';
                                }
                                ?>
                            </ul>
                        </li>
                        <li><a href="#">Live</a></li>
                        <li><a href="#">Pay-Per-View</a></li>
                        <li>
                            <div id= "search" class="search">
                                <input name="editbox_search" class="editbox_search" id="editbox_search" maxlength="80" value="Search..."  onblur="if (this.value == '') this.value = 'Search...';"
                                onfocus="if (this.value == 'Search...') this.value = '';" type="text" />
                                <span id='search-icon' class="glyphicon glyphicon-search"></span>

                            </div>
                        </li>
                    </ul>

                </nav>
            </div>
        </nav>
