var h = null;
vttApp.controller('homeController', function homeController ($scope, $location, videoFactory, $http, $log) {
    h = $scope;
    $scope.canalsToShow=6;
    $scope.peliculasToShow=4;
    $scope.down = false;
    $scope.videos = {};
    $scope.channels = [
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/logo.png"}}
    ];

    videoFactory.getRecommendedVideos().then(function(data){
        $scope.videos=data.data;
    });

    videoFactory.getFeaturedVideos().then(function(data){
        $scope.featuredVideos=data.data;
    });




    $scope.go = function(path){
        $location.path(path);
    }

    $scope.moreCanals = function(){
        $scope.canalsToShow=$scope.canalsToShow+6;
    }
    $scope.morePeliculas = function(){
        $scope.peliculasToShow=$scope.peliculasToShow+4;
    }


  });
