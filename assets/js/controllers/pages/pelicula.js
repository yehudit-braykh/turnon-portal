var p = null;
vttApp.controller('peliculaController', function peliculaController ($scope, $location, $routeParams, categoriesFactory, videoFactory, $http, $log) {
    p = $scope;

    $scope.search='';

    $scope.videoId=$routeParams.PeliculaId;

    $scope.go = function(path){
        $location.path(path);
    }

    categoriesFactory.getAllCategories().then(function(data){
        $scope.categories=data.data;

    });

    videoFactory.getFeaturedVideos().then(function(data){
        $scope.videos= data.data;

    });

    videoFactory.getVideoById($scope.videoId).then(function(data){
        $scope.video=data.data;
        $scope.video.description= "Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas y protagonizada por Will Smith. Aunque se atribuye la historia a las Series de Robots de Isaac Asimov, que incluye una recopilación de cuentos del mismo nombre, Yo, robot, en realidad está basada en un guion de Jeff Vintar, titulado Hardwired. Algunas ideas de Asimov acerca de los robots —la más importante, las Tres leyes de la robótica— fueron añadidas al guion de Vintar después de que los productores adquirieron los derechos sobre el título del libro.";
        $scope.video.duration= 158;
    });

    $scope.addToWatchLish = function(){
        console.log('added to watch list');
    };

    $scope.calcVideoAge =function(){
        var date = $scope.video.date;
        var now = new Date();
        var sub= now.getTime()-date.getTime();
        console.log(sub);
    }

    $scope.videosFilter = function(item){
        if($scope.selectedCat=='' && $scope.search=='')
            return item;
        if($scope.selectedCat=='')
            if(item.title.includes($scope.search))
                return item;
        if($scope.search=='' && item.categories  && item.categories.indexOf($scope.selectedCat.toLowerCase())>=0)
                    return item;
        if(item.categories && item.categories.indexOf($scope.selectedCat.toLowerCase())>=0 && item.title.includes($scope.search))
                return item;
    }

    $scope.movies=[{id: 1, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie5.png'}},
                {id: 2, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie4.png'}},
                {id: 3, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie7.png'}},
                {id: 4, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie3.png'}},
                {id: 5, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie2.png'}},
                {id: 6, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie1.png'}},
                {id: 7, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie6.png'}},
                {id: 8, categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/movie2.png'}},
                {id: 9, categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/movie3.png'}},
                {id: 10,categories:[{name:"free"}], PosterH:{url:'/assets//images/static-images/movie4.png'}}];

  });
