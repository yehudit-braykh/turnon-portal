<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en" ng-app="turnon">
    <head>

        <title ng-bind="pageTitle">Turn-on</title>
        <meta http-equiv="Expires" content="31536000" />
        <meta http-equiv="Cache-Control" content="max-age=31536000" />
        <meta name="description" content="<?php echo $item_description; ?>">
        <meta name="keywords" content="website, business, store" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" href="/assets/theme/dist/main.css" />
        <base href="/" />

    </head>

    <body>

        <div ng-view autoscroll="true"></div>

        <!-- JWPlayer -->
        <!-- <script type="text/javascript" src="/assets/common/js/jwplayer-7.9.0/jwplayer.js" ></script> -->
        <!-- <script>jwplayer.key="wldzyhAXC/pV8hrmoKJJUJQUQU7UwoOXl6rN1w==";</script> -->

        <!-- Application -->
        <script src="/assets/theme/dist/libs.js"></script>
        <script src="/assets/theme/dist/main.js"></script>

    </body>
</html>
