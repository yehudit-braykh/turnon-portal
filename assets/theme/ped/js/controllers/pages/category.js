var cat = null;
peruDigitalApp.controller('categoryController', function categoryController ($scope, videosFactory, celebritiesFactory, categoriesFactory, $routeParams, $location, brandsFactory) {
      cat = $scope;

      $scope.category= categoriesFactory.getCategoryByName($routeParams.categoryName);


    $scope.otherCelebrities = celebritiesFactory.getAllCelebrities();

    $scope.otherCelebrities.splice($scope.otherCelebrities.indexOf($scope.celebrity),1);

    $scope.videos= videosFactory.getAllVideos();

    $scope.brands= brandsFactory.getAllBrands();

        $scope.go = function(path){
            $location.path(path);
        }
  });
