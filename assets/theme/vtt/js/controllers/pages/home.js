var h = null;
vttApp.controller('homeController', function homeController ($scope, $location, videoFactory, $http, $log) {
    h = $scope;
    $scope.canalsToShow=7;
    $scope.peliculasToShow=4;
    $scope.down = false;
    $scope.channelPosition = 0;
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
        $scope.moreChannels=true;
    }

    $scope.lessCanals = function(){
        $scope.moreChannels=false;
    }

    $scope.morePeliculas = function(){
        $scope.peliculasToShow=$scope.peliculasToShow+4;
    }

    $scope.moveChannelLeft = function(){
        if ($scope.channelPosition == 0) {
            $scope.channelPosition = 1;
        }else {
            $scope.channelPosition = 0;
        }
    }

    $scope.moveChannelRight = function(){
        if ($scope.channelPosition == 0) {
            $scope.channelPosition = 1;
        }else {
            $scope.channelPosition = 0;
        }
    }

  });
