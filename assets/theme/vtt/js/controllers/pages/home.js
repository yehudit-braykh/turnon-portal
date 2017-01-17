var h = null;
vttApp.controller('homeController', function homeController ($scope, $location, videoFactory, $http, $log) {
    h = $scope;
    $scope.canalsToShow=7;
    $scope.peliculasToShow=4;
    $scope.down = false;
    $scope.channelPosition = 0;
    $scope.videos = {};

    videoFactory.getRecommendedVideos().then(function(data){
        // $scope.videos=data.data;
    });

    videoFactory.getFeaturedVideos().then(function(data){
        // $scope.featuredVideos=data.data;
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
        if($scope.peliculasToShow >= $scope.movies.length){
            $scope.peliculasToShow = 4;
        }
        else{
            $scope.peliculasToShow=$scope.peliculasToShow+4;
        }
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

    // STATIC IMAGES AND OBJECTS

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

    $scope.videos=[{id: 1,categories:[{name:"free"}], PosterH:{url:'/assets/theme/vtt/images/static-images/carousel1.png'}},
                  {id: 2, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel2.png'}},
                  {id: 3, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel3.png'}},
                  {id: 4, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel4.png'}},
                  {id: 5, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel5.png'}},
                  {id: 6, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel6.png'}},
                  {id: 7, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel7.png'}},
                  {id: 8, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel2.png'}},
                  {id: 9, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel3.png'}},
                  {id: 10,categories:[{name:"free"}], PosterH:{url:'/assets/theme/vtt/images/static-images/carousel4.png'}}];

  $scope.slider=[{id: 1,title:"Titulo del Programa", description:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…", PosterH:{url:'/assets/theme/vtt/images/static-images/slider2.png'}},
                {id: 2,title:"Titulo del Programa", description:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…",categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/slider1.png'}},
                {id: 3, title:"Titulo del Programa", description:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…",categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/home-slider/slide1.png'}},
                {id: 4, title:"Titulo del Programa", description:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…",categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/home-slider/slide2.png'}}];

    $scope.featuredVideos=[{id: 1, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel5.png'}},
                {id: 2, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel4.png'}},
                {id: 3, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel7.png'}},
                {id: 4, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel3.png'}},
                {id: 5, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel2.png'}},
                {id: 6, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel1.png'}},
                {id: 7, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel6.png'}},
                {id: 8, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel2.png'}},
                {id: 9, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/carousel3.png'}},
                {id: 10,categories:[{name:"free"}], PosterH:{url:'/assets/theme/vtt/images/static-images/carousel4.png'}}];

    $scope.movies=[{id: 1, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie5.png'}},
                {id: 2, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie4.png'}},
                {id: 3, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie7.png'}},
                {id: 4, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie3.png'}},
                {id: 5, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie2.png'}},
                {id: 6, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie1.png'}},
                {id: 7, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie6.png'}},
                {id: 8, categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie2.png'}},
                {id: 9, categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/movie3.png'}},
                {id: 10,categories:[{name:"free"}], PosterH:{url:'/assets/theme/vtt/images/static-images/movie4.png'}}];

  });
