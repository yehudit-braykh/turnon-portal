var h = null;
vttApp.controller('homeController', function homeController ($scope, $location, $log) {
      h = $scope;

$log.log(h);

    $scope.featuredVideos = {
        0:{url:"/assets/theme/vtt/images/static-images/home-slider/slide1.png", title:"Titulo del Programa",desc:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…"},
        1:{url:"/assets/theme/vtt/images/static-images/home-slider/slide2.png", title:"Titulo del Programa",desc:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…"},
        2:{url:"/assets/theme/vtt/images/static-images/home-slider/slide1.png", title:"Titulo del Programa",desc:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…"},
        3:{url:"/assets/theme/vtt/images/static-images/home-slider/slide2.png", title:"Titulo del Programa",desc:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…"}
    };

    $scope.go = function(path){
        $location.path(path);
    }



  });
