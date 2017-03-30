var ps = null;
vttApp.controller('peliculasController', function peliculasController ($scope, $location, categoriesFactory, videoFactory, $http, $log) {
    ps = $scope;

    $scope.selectedCat = '';
    $scope.search='';

    $scope.go = function(path){
        $location.path(path);
    }

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

    // STATIC movies

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
