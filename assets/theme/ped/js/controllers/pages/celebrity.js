var celeb = null;
peruDigitalApp.controller('celebrityController', function celebrityController ($scope, videosFactory, celebritiesFactory, $routeParams, $location, brandsFactory) {
      celeb = $scope;

      $scope.celebrity= celebritiesFactory.getCelebrityByName($routeParams.celebrityName);


    $scope.otherCelebrities = celebritiesFactory.getAllCelebrities();

    $scope.otherCelebrities.splice($scope.otherCelebrities.indexOf($scope.celebrity),1);

    $scope.videos= videosFactory.getAllVideos();

    $scope.brands= brandsFactory.getAllBrands();

        $scope.go = function(path){
            $location.path(path);
        }
  });
