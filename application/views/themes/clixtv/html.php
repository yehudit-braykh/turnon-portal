<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en">
    <head>

        <title>ClixTv Portal</title>

        <meta name="description" content="<?php echo $item_description; ?>">

        <meta name="keywords" content="website, business, store" />
        <meta name="robots" content="index, follow" />
<!--    <meta name="google-site-verification" content="vD6AjRdZ4j60LaYkzVXhsrF_cBgKDRrpYew0aq1H3uI" /> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<!--        <script src="/assets/common/js/jquery-3.1.1.slim.min.js" crossorigin="anonymous"></script>-->
<!--        <script src="/assets/common/js/bootstrap.min.js" crossorigin="anonymous"></script>-->

<!--        <link rel="stylesheet" href="/assets/common/css/bootstrap.min.css" crossorigin="anonymous">-->
        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo asset_url(); ?>dist/main.min.css" />

        <!--
        <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/less.php" />
        <link rel="stylesheet" href="/assets/common/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/common/css/select.min.css">
        <script src="<?php echo asset_url(); ?>js/livequery.js"></script>
        -->

        <!-- ANGULAR FILES -->



        <!--
        <script src="<?php echo asset_url(); ?>js/main.js"></script>


        <script src="<?php echo asset_url(); ?>js/controllers/pages/home.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/about.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/categories.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/category.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/celebrity.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/celebrities.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/brand.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/offer.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/charity.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/charities.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/offers.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/account.js"></script>
        <script src="<?php echo asset_url(); ?>js/controllers/pages/video.js"></script>


        <script src="<?php echo asset_url(); ?>js/controllers/components/header.js"></script>


        <script src="<?php echo asset_url(); ?>js/factories/cache.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/user.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/categories.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/file.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/celebrity.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/videos.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/coupons.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/brands.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/social.js"></script>
        <script src="<?php echo asset_url(); ?>js/factories/knetik.js"></script>


        <script src="<?php echo asset_url(); ?>js/filters/filters.js"></script>


        <script src="<?php echo asset_url(); ?>/js/directives/clix-carousel.js"></script>
        <script src="<?php echo asset_url(); ?>js/directives-helpers/slick.min.js"></script>
        <script src="<?php echo asset_url(); ?>/js/directives/jwplayer.js"></script>
        <script src="<?php echo asset_url(); ?>js/directives/clix-block.js"></script>
        <script src="<?php echo asset_url(); ?>js/directives/clix-sec-block.js"></script>
        <script src="<?php echo asset_url(); ?>js/directives/social-share.js"></script>
        <script src="<?php echo asset_url(); ?>js/directives/mentio.js"></script>
        <script src="<?php echo asset_url(); ?>js/directives/count-to.js"></script>

        -->




        <!-- END ANGULAR -->
    <!--    <script>
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

        </script>-->

    </head>

    <body>

        <clix-header-bar></clix-header-bar>

        <ui-view autoscroll="true"></ui-view>

        <clix-footer></clix-footer>

<!--    <footer ng-include="'/assets/theme/clixtv/html/components/footer.html'"></footer>-->

<!--        <script src="--><?php //echo asset_url(); ?><!--js/angular.min.js"></script>-->
<!--        <script src="--><?php //echo asset_url(); ?><!--js/angular-touch.min.js"></script>-->
<!--        <script src="--><?php //echo asset_url(); ?><!--js/angular-route.min.js"></script>-->
<!--        <script src="--><?php //echo asset_url(); ?><!--js/angular-animate.min.js"></script>-->
<!--        <script src="--><?php //echo asset_url(); ?><!--/js/ng-file-upload.min.js"></script>-->
<!--        <script src="/assets/common/js/select.min.js"></script>-->
<!--        <script src="assets/common/js/select-tpls.min.js"></script>-->

        <script type="text/javascript" src="/assets/common/js/jwplayer-7.9.0/jwplayer.js" ></script>
        <script>jwplayer.key="wldzyhAXC/pV8hrmoKJJUJQUQU7UwoOXl6rN1w==";</script>

        <script src="<?php echo asset_url(); ?>dist/libs.min.js"></script>
        <script src="<?php echo asset_url(); ?>dist/main.min.js"></script>

    </body>
</html>
