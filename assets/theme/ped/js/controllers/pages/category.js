var cat = null;
peruDigitalApp.controller('categoryController', function categoryController ($scope, videoFactory, celebritiesFactory, categoriesFactory, $routeParams, $location, brandsFactory) {
      cat = $scope;

    categoriesFactory.getCategoryByName($routeParams.categoryName).then(function(data){

        $scope.category=  data.data;
    });


    celebritiesFactory.getAllCelebrities().then(function(data){

        $scope.otherCelebrities = data.data;

    });

    categoriesFactory.getCategoryVideos($routeParams.categoryName).then(function(data){

        $scope.videos= data.data;
    });


    brandsFactory.getAllBrands().then(function(data){
        $scope.brands= data.data;
    });

        $scope.go = function(path){
            $location.path(path);
        }
  });
