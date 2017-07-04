<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:tp="http://player.theplatform.com/" xml:lang="en" lang="en" ng-app="vtt">
    <head>

        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

        <script type="text/javascript" src="assets/js/frameworks/jquery-3.2.0.min.js"></script>
        <script src="/assets/js/frameworks/bootstrap.min.js" crossorigin="anonymous"></script>

        <link rel="stylesheet" href="/assets/css/frameworks/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/frameworks/bootstrap.min.css">

        <!-- ANGULAR FILES -->
        <script src="assets/js/frameworks/angular.min.js"></script>
        <script src="assets/js/frameworks/angular-route.min.js"></script>
        <script src="assets/js/main.js"></script>
        <script src="assets/js/frameworks/angular-animate.min.js"></script>



       <!-- ANGULAR CONTOLLERS -->
       <script src="assets/js/controllers/pages/home.js"></script>
       <script src="assets/js/controllers/pages/header.js"></script>
       <script src="assets/js/controllers/pages/account.js"></script>
       <script src="assets/js/controllers/pages/login.js"></script>
       <script src="assets/js/controllers/pages/register.js"></script>
       <script src="assets/js/controllers/pages/canales-premium.js"></script>
       <script src="assets/js/controllers/pages/como-funciona.js"></script>
       <script src="assets/js/controllers/pages/karaoke.js"></script>
       <script src="assets/js/controllers/pages/karaokeSinger.js"></script>
       <script src="assets/js/controllers/pages/karaokeGenre.js"></script>
       <script src="assets/js/controllers/pages/peliculas.js"></script>
       <script src="assets/js/controllers/pages/pelicula.js"></script>
       <script src="assets/js/controllers/pages/programas.js"></script>
       <script src="assets/js/controllers/pages/programa.js"></script>
       <script src="assets/js/controllers/pages/season.js"></script>
       <script src="assets/js/controllers/pages/television-gratis.js"></script>
       <script src="assets/js/controllers/pages/video.js"></script>
       <script src="assets/js/controllers/pages/videoCategory.js"></script>
       <script src="assets/js/controllers/pages/videoCategories.js"></script>
       <script src="assets/js/controllers/components/footer.js"></script>
        <!-- COMPONENTS CONTROLLERS -->

        <!-- ANGULAR FACTORIES -->
        <script src="assets/js/factories/user.js"></script>
        <script src="assets/js/factories/user.js"></script>
        <script src="assets/js/factories/categories.js"></script>
        <script src="assets/js/factories/celebrities.js"></script>
        <script src="assets/js/factories/video.js"></script>
        <script src="assets/js/factories/user.js"></script>
        <script src="assets/js/factories/cache.js"></script>
        <script src="assets/js/factories/subscriptions.js"></script>

        <!-- ANGULAR FILTERS -->
        <script src="assets/js/filters/range.js"></script>

        <!-- ANGULAR DIRECTIVES -->
        <script src="assets/js/directives/vtt-carousel.js"></script>
        <script src="assets/js/directives/jwplayer.js"></script>
        <script src="assets/js/directives/Carousel.js"></script>
        <script src="assets/js/directives/videosdir.js"></script>
        <script src="assets/js/directives/moviedir.js"></script>
        <script src="assets/js/directives/featurdir.js"></script>
        <script src="assets/js/directives/karaokedir.js"></script>

        <!-- END ANGULAR -->
        <link rel="stylesheet" type="text/css" href="assets/css/less.php" />

        <script type="text/javascript" src="/assets/js/frameworks/jwplayer-7.9.0/jwplayer.js" ></script>
        <script>jwplayer.key="wldzyhAXC/pV8hrmoKJJUJQUQU7UwoOXl6rN1w==";</script>

    </head>

    <body>
        <header ng-include="'/assets/html/pages/header.html'"></header>

        <div ng-view autoscroll="true"></div>

        <footer ng-include="'/assets/html/pages/footer.html'"></footer>

    </body>
</html>
