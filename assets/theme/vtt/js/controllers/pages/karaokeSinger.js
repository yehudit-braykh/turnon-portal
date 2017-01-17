var ks = null;
vttApp.controller('karaokeSingerController', function karaokeSingerController ($scope, $location, $routeParams, categoriesFactory, videoFactory, $http, $log) {
    ks = $scope;
    $scope.singerId = $routeParams.singerId;
    $scope.selectedCat = '';
    $scope.search='';
    $scope.selectedAlbum='';

    $scope.go = function(path){
        $location.path(path);
    }

    videoFactory.getVideoById($scope.singerId).then(function(data){
        $scope.singer=data.data;
        $scope.singer.description= "Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas y protagonizada por Will Smith. Aunque se atribuye la historia a las Series de Robots de Isaac Asimov, que incluye una recopilación de cuentos del mismo nombre, Yo, robot, en realidad está basada en un guion de Jeff Vintar, titulado Hardwired. Algunas ideas de Asimov acerca de los robots —la más importante, las Tres leyes de la robótica— fueron añadidas al guion de Vintar después de que los productores adquirieron los derechos sobre el título del libro.";
        $scope.singer.duration= 158;
    });

    categoriesFactory.getAllCategories().then(function(data){
        $scope.categories=data.data;

    });

    videoFactory.getFeaturedVideos().then(function(data){
        $scope.videos= data.data;

    });

    $scope.changeSelectedCat = function (cat) {
        if($scope.selectedCat==cat)
            $scope.selectedCat='';
        else
            $scope.selectedCat = cat;
    };

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

    $scope.album=[{id: 1, title:"Clasicos",PosterH:{url:'/assets/theme/vtt/images/static-images/album5.png'}},
                {id: 2, title:"Ranchera",PosterH:{url:'/assets/theme/vtt/images/static-images/album4.png'}},
                {id: 3, title:"Rock & POP",PosterH:{url:'/assets/theme/vtt/images/static-images/album1.png'}},
                {id: 4, title:"Romantico",PosterH:{url:'/assets/theme/vtt/images/static-images/album3.png'}},
                {id: 5, title:"Salsa & Merengue",PosterH:{url:'/assets/theme/vtt/images/static-images/album2.png'}},
                {id: 6, title:"Blues",PosterH:{url:'/assets/theme/vtt/images/static-images/singer1.png'}},
                {id: 7, title:"Romantico",PosterH:{url:'/assets/theme/vtt/images/static-images/singer5.png'}},
                {id: 8, title:"Clasicos",PosterH:{url:'/assets/theme/vtt/images/static-images/singer2.png'}},
                {id: 9, title:"Jazz",PosterH:{url:'/assets/theme/vtt/images/static-images/singer3.png'}},
                {id: 10,title:"Hip Hop", PosterH:{url:'/assets/theme/vtt/images/static-images/singer4.png'}}];

  });
