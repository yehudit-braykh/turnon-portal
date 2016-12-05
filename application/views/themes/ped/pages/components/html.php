<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en" ng-app="clixApp">
    <head>

        <title><?php echo $item_title; ?></title>

        <meta name="description" content="<?php echo $item_description; ?>">

        <meta name="keywords" content="website, business, store" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="vD6AjRdZ4j60LaYkzVXhsrF_cBgKDRrpYew0aq1H3uI" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

        <script src="/assets/common/js/jquery-2.2.4.min.js" crossorigin="anonymous"></script>
        <script src="/assets/common/js/bootstrap.min.js" crossorigin="anonymous"></script>

        <link rel="stylesheet" href="/assets/common/css/font-awesome.min.css">
        <script src="<?php echo asset_url(); ?>js/lightslider.js"></script>
        <script src="<?php echo asset_url(); ?>js/jquery.tmpl.min.js"></script>
        <script src="<?php echo asset_url(); ?>js/jquery.easytabs.min.js"></script>
        <script src="<?php echo asset_url(); ?>js/livequery.js"></script>


        <!-- ANGULAR FILES -->
        <script src="<?php echo asset_url(); ?>js/angular.min.js"></script>
        <script src="<?php echo asset_url(); ?>js/angular-touch.min.js"></script>
        <script src="<?php echo asset_url(); ?>js/angular-route.min.js"></script>
        <script src="<?php echo asset_url(); ?>js/angular-animate.min.js"></script>
        <script src="<?php echo asset_url(); ?>js/main.js"></script>
        <!-- ANGULAR CONTOLLERS -->
        <script src="<?php echo asset_url(); ?>js/controllers/pages/home.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/about.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/categories.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/celebrity.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/celebrities.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/brand.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/brands.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/charity.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/charities.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/coupon.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/donation.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/offers.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/get_coupon.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/account.js"></script>

        <!-- COMPONENTS CONTROLLERS -->
        <script src="<?php echo asset_url(); ?>js/controllers/components/header.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/components/single_carusel.js"></script>

        <!-- ANGULAR FACTORIES -->
        <script src="<?php echo asset_url(); ?>js/factories/cache.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/user.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/categories.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/celebrity.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/videos.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/coupons.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/brands.js"></script>
        <!-- ANGULAR FILTERS -->
        <!-- <script src="<?php echo asset_url(); ?>js/controllers/filters/filters.js"></script> -->
        <!-- ANGULAR DIRECTIVES -->
        <script src="<?php echo asset_url(); ?>js/components/single-carusel.js"></script>
        <script src="<?php echo asset_url(); ?>js/components/autocomplete.js"></script>
        <script src="<?php echo asset_url(); ?>/js/controllers/components/jwplayer.js"></script>
        <script src="<?php echo asset_url(); ?>/js/controllers/components/clixCoupon.js"></script>
        <script src="<?php echo asset_url(); ?>/js/controllers/components/carousel3d.js"></script>
        <script src="<?php echo asset_url(); ?>js/components/highlight-filter.js"></script>
        <script src="<?php echo asset_url(); ?>js/components/suggestions.js"></script>
        <!-- END ANGULAR -->
        <script type="text/javascript" src="<?php echo common_asset_url(); ?>js/greensock/TweenMax.min.js"></script>

      <link rel="stylesheet" href="/assets/common/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet"  href="<?php echo asset_url(); ?>css/lightslider.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/less.php" />
        <script type="text/javascript" src="https://content.jwplatform.com/libraries/07qZPa5L.js" ></script>
		<script>jwplayer.key = "wldzyhAXC/pV8hrmoKJJUJQUQU7UwoOXl6rN1w==";</script>
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
    </head>

    <body>
        <?php
            $this->load->view(views_url() . 'components/header', array("categories" => $categories, "tags" => $tags));
         ?>

        <div ng-view autoscroll="true"></div>

         <?php
             $this->load->view(views_url() . 'components/footer', array("categories" => $categories, "tags" => $tags));
          ?>
    </body>
    <script src="<?php echo asset_url(); ?>js/home.js"></script>
    <script src="<?php echo asset_url(); ?>js/coupons.js"></script>
</html>
