var h = null;
vttApp.controller('homeController', function homeController ($scope, $location, videoFactory, $http, $log,$interval) {

    h = $scope;

    $scope.check="videos";
    $scope.changeclass = "";
    $scope.peliculasToShow=4;
    $scope.down = false;
    $scope.channelPosition = 0;
    $scope.filldot="";
    




    // My functions
    $scope.incrementLimit = function() {
    $scope.videosToShow = 1000;

};



    // STATIC IMAGES AND OBJECTS


    $scope.videos=[{id: 1,categories:[{name:"free"}], PosterH:{url:'/assets//images/static-images/carousel1.png'},Title:'The Movie',description:"Disney's Beauty and the Beast delivered a monster second weekend, pulling in enough to make it the fourth largest second weekend of all-time and pushing the film over $315 million in a matter of just ten days. Added to that, Lionsgate's release CHiPs..." },
                  {id: 2, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel2.png'}},
                  {id: 3, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel3.png'}},
                  {id: 4, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel4.png'}},
                  {id: 5, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel5.png'}},
                  {id: 6, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel6.png'}},
                  {id: 7, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel7.png'}},
                  {id: 8, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel2.png'}},
                  {id: 9, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel3.png'}},
                  {id: 10,categories:[{name:"free"}], PosterH:{url:'/assets//images/static-images/carousel4.png'}}];
//my slideravengers
  $scope.images=[{id: 1,title:"Avengers",category:"action", description:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…", PosterH:{url:'/assets/images/static-images/avengers.png'}},
                {id: 2,title:"forest",category:"science",  description:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…",categories:[{name:"free"}],PosterH:{url:'assets/images/static-images/home-cover-left.png'}},
                {id: 3, title:"Airplane",category:"fiction", description:"The official Wikipedia Android app is designed to help you find, discover, and explore knowledge on Wikipedia. Settle a bet with a friend search…",categories:[{name:"member"}],PosterH:{url:'/assets/images/static-images/home-cover-right.png'}},
                ];

    $scope.featuredVideos=[
        {id: 11, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel5.png'},Title:'The Movie',description:"Disney's Beauty and the Beast delivered a monster second weekend, pulling in enough to make it the fourth largest second weekend of all-time and pushing the film over $315 million in a matter of just ten days. Added to that, Lionsgate's release CHiPs..." },
                {id: 22, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel4.png'}},
                {id: 33, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel7.png'}},
                {id: 42, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel3.png'}},
                {id: 51, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel2.png'}},
                {id: 61, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel1.png'}},
                {id: 72, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel6.png'}},
                {id: 83, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel2.png'}},
                {id: 92, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel3.png'}},
                {id: 101,categories:[{name:"free"}], PosterH:{url:'/assets//images/static-images/carousel4.png'}}
            ];

    $scope.movies=[{id: 1, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie5.png'},Title:'The Movie',description:"Disney's Beauty and the Beast delivered a monster second weekend, pulling in enough to make it the fourth largest second weekend of all-time and pushing the film over $315 million in a matter of just ten days. Added to that, Lionsgate's release CHiPs..." },
                {id: 2, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie4.png'}},
                {id: 3, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie7.png'}},
                {id: 4, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie3.png'}},
                {id: 5, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie2.png'}},
                {id: 6, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie1.png'}},
                {id: 7, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie6.png'}},
                {id: 8, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie2.png'}},
                {id: 9, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie3.png'}},
                {id: 10,categories:[{name:"free"}], PosterH:{url:'/assets//images/static-images/movie4.png'}}];

    $scope.karaoke=[{id: 1,name:'renchara', categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie5.png'}},
                {id: 2,name:'adel',categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie4.png'}},
                {id: 3,name:'olive', categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie7.png'}},
                {id: 4,name:'adel', categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie3.png'}},
                {id: 5,name:'renchara', categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie2.png'}},
                {id: 6,name:'olive', categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie1.png'}},
                {id: 7,name:'adel', categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie6.png'}},
                {id: 8, name:'renchara',categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie2.png'}},
                {id: 9,name:'adel', categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie3.png'}},
                {id: 10,name:'olive',categories:[{name:"free"}], PosterH:{url:'/assets//images/static-images/movie4.png'}}];

    $scope.logos=[{id:1,PosterH:{url:'/assets/images/logo1.png'}},
                {id:2,PosterH:{url:'/assets/images/logo2.png'}},
                {id:3,PosterH:{url:'/assets/images/logo3.png'}},
                {id:4,PosterH:{url:'/assets/images/logo4.png'}},
                {id:5,PosterH:{url:'/assets/images/logo5.png'}},
                {id:6,PosterH:{url:'/assets/images/logo6.png'}}];

            $scope.limit = function(cat,index) {
                $scope.videosToShow = index;
                $scope.changeclass=cat;
                $scope.collection=$scope[cat];

            };
            $scope.changeclass="videos";
            $scope.collection=$scope["videos"];
            $scope.videosToShow=9;



                videoFactory.getRecommendedVideos().then(function(data){
                    // $scope.videos=data.data;
                });

                videoFactory.getFeaturedVideos().then(function(data){
                    // $scope.featuredVideos=data.data;
                });

                $scope.go = function(path){
                    $location.path(path);
                }

                $scope.morePeliculas = function(){
                    if($scope.peliculasToShow >= $scope.movies.length){
                        $scope.peliculasToShow = 4;
                    }
                    else{
                        $scope.peliculasToShow=$scope.peliculasToShow+4;
                    }
                }


  });
