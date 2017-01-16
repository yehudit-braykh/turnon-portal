var h = null;
vttApp.controller('homeController', function homeController ($scope, $location, videoFactory, $http, $log) {
    h = $scope;
    $scope.canalsToShow=7;
    $scope.peliculasToShow=4;
    $scope.down = false;
    $scope.channelPosition = 0;
    $scope.videos = {};
    $scope.channels=[{id: 1, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo1.png'}},
                     {id: 2, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo2.png'}},
                     {id: 3, title:'Peru', PosterH:{url:'/assets/theme/vtt/images/logo3.png'}},
                     {id: 4, title:'Peru', PosterH:{url:'/assets/theme/vtt/images/logo4.png'}},
                     {id: 5, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo5.png'}},
                     {id: 6, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo6.png'}},
                     {id: 7, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo1.png'}},
                     {id: 8, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo2.png'}},
                     {id: 9, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo3.png'}},
                     {id: 10, title:'Peru', PosterH:{url:'/assets/theme/vtt/images/logo4.png'}},
                     {id: 11, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo5.png'}},
                     {id: 12, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo6.png'}},
                     {id: 13, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo3.png'}},
                     {id: 14, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo2.png'}},
                     {id: 15, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo4.png'}},
                     {id: 16, title:'Peru', PosterH:{url:'/assets/theme/vtt/images/logo5.png'}},
                     {id: 17, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo6.png'}},
                     {id: 18, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo2.png'}},
                     {id: 19, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo4.png'}},
                     {id: 20, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo3.png'}},
                     {id: 21, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo1.png'}},
                     {id: 22, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo5.png'}},
                     {id: 23, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo4.png'}},
                     {id: 24, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo3.png'}},
                     {id: 25, title:'Peru', PosterH:{url:'/assets/theme/vtt/images/logo2.png'}},
                     {id: 26, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo6.png'}},
                     {id: 27, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo1.png'}},
                     {id: 28, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo4.png'}},
                     {id: 29, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo3.png'}},
                     {id: 30, title:'Brazil', PosterH:{url:'/assets/theme/vtt/images/logo5.png'}},
                     {id: 31, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo4.png'}},
                     {id: 32, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo2.png'}},
                     {id: 33, title:'Peru', PosterH:{url:'/assets/theme/vtt/images/logo6.png'}},
                     {id: 34, title:'Argentina', PosterH:{url:'/assets/theme/vtt/images/logo5.png'}},];

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
