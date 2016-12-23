var celeb = null;
peruDigitalApp.controller('celebrityController', function celebrityController ($scope, videoFactory, celebritiesFactory, $routeParams, $location, brandsFactory) {
      celeb = $scope;

      $scope.celebrity= celebritiesFactory.getCelebrityByName($routeParams.celebrityName);


    $scope.otherCelebrities = celebritiesFactory.getAllCelebrities();

    $scope.otherCelebrities.splice($scope.otherCelebrities.indexOf($scope.celebrity),1);

    $scope.videos= videoFactory.getAllVideos();

    brandsFactory.getAllBrands().then(function(data){
        $scope.brands= data.data;
    });

        $scope.go = function(path){
            $location.path(path);
        }
  });
