var kg = null;
vttApp.controller('karaokeGenreController', function karaokeGenreController ($scope, $location, $routeParams, categoriesFactory, videoFactory, $http, $log) {
    kg = $scope;
    $scope.genreName = $routeParams.genreName;
    $scope.selectedCat = '';
    $scope.search='';

    $scope.go = function(path){
        $location.path(path);
    }

    categoriesFactory.getCategoryByName($scope.genreName).then(function(data){
        $scope.genre=data.data;
    });

    categoriesFactory.getAllCategories().then(function(data){
        $scope.categories=data.data;

    });

    categoriesFactory.getCategoryVideos($scope.genreName).then(function(data){
        //$scope.genreVideos=data.data;
    });

    videoFactory.getFeaturedVideos().then(function(data){
        $scope.videos= data.data;
        $scope.genreVideos=data.data;

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

  });
