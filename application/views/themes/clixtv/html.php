<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en">
    <head>

        <title ng-bind="pageTitle">ClixTV - Your Stars. Their Passions.</title>

        <link rel="shortcut icon" href="assets/theme/clixtv/dist/images/clixtv_favicon.ico" />
        <meta name="description" content="<?php echo $item_description; ?>">
        <meta name="keywords" content="website, business, store" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" href="/assets/theme/clixtv/dist/main.min.css" />

    </head>

    <body ng-class="{'printable': printable}">

        <clix-blurrable-container>
            <clix-site-notification-bar></clix-site-notification-bar>
            <clix-header-bar></clix-header-bar>
            <div class="clix-page-container">
                <ui-view autoscroll="true"></ui-view>
            </div>
        </clix-blurrable-container>

        <clix-right-navigation></clix-right-navigation>

        <clix-blurrable-container>
            <clix-footer></clix-footer>
        </clix-blurrable-container>
        <clix-mobile-navigation></clix-mobile-navigation>

        <script type="text/javascript" src="https://1115282512.rsc.cdn77.org/plinks/jssdk/CMSDK-qa-latest.min.js"></script>
        <script type="text/javascript" src="/assets/common/js/jwplayer-7.9.0/jwplayer.js" ></script>
        <script>jwplayer.key="wldzyhAXC/pV8hrmoKJJUJQUQU7UwoOXl6rN1w==";</script>
        <script src="/assets/theme/clixtv/dist/libs.min.js"></script>
        <script src="/assets/theme/clixtv/dist/main.min.js"></script>
    </body>
</html>
