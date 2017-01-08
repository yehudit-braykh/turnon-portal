var p = null;
vttApp.controller('peliculasController', function peliculasController ($scope, $location, categoriesFactory, videoFactory, $http, $log) {
    p = $scope;

    $scope.selectedCat = '';

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
        if($scope.selectedCat=='')
            return item;
        if(item.categories){
          if(item.categories.indexOf($scope.selectedCat.toLowerCase())>=0)
            return item;
        }
    }

  });
