var h = null;
vttApp.controller('homeController', function homeController ($scope, $location, $http, $log) {
    h = $scope;

    $scope.videos = {};
    $scope.channels = {
        0:{url:"/assets/theme/vtt/images/logo.png"},
        1:{url:"/assets/theme/vtt/images/logo.png"},
        2:{url:"/assets/theme/vtt/images/logo.png"},
        3:{url:"/assets/theme/vtt/images/logo.png"},
        4:{url:"/assets/theme/vtt/images/logo.png"},
        5:{url:"/assets/theme/vtt/images/logo.png"},
        6:{url:"/assets/theme/vtt/images/logo.png"},
        7:{url:"/assets/theme/vtt/images/logo.png"},
        8:{url:"/assets/theme/vtt/images/logo.png"},
        9:{url:"/assets/theme/vtt/images/logo.png"},
        10:{url:"/assets/theme/vtt/images/logo.png"}
    };

    $scope.featuredVideos = {
        0:{url:"/assets/theme/vtt/images/static-images/home-slider/slide1.png", title:"Titulo del Programa",desc:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…"},
        1:{url:"/assets/theme/vtt/images/static-images/home-slider/slide2.png", title:"Titulo del Programa",desc:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…"},
        2:{url:"/assets/theme/vtt/images/static-images/home-slider/slide1.png", title:"Titulo del Programa",desc:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…"},
        3:{url:"/assets/theme/vtt/images/static-images/home-slider/slide2.png", title:"Titulo del Programa",desc:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…"}
    };

    $scope.getNewRelease = function(success,error){
        $http.get("index.php/api/vod/get_new_release").then(success,error);
    };

    $scope.go = function(path){
        $location.path(path);
    }
    function init(){
        $scope.getNewRelease(
            function(response){
                $scope.videos = response.data.content.entries;
            },
            function(){}
        );

    }

    init();

  });
