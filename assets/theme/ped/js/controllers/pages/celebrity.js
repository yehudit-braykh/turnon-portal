var celeb = null;
peruDigitalApp.controller('celebrityController', function celebrityController ($scope, videoFactory, celebritiesFactory, $routeParams, $location, brandsFactory) {
      celeb = $scope;

     celebritiesFactory.getCelebrityById($routeParams.celebrityId).then(function(data){

         $scope.celebrity= data.data;

         celebritiesFactory.getAllCelebrities().then(function(data){
             $scope.otherCelebrities = data.data;
        //     $scope.otherCelebrities.splice($scope.otherCelebrities.indexOf($scope.celebrity),1);
         });
     });

    $scope.videos= videoFactory.getAllVideos();

    brandsFactory.getAllBrands().then(function(data){
        $scope.brands= data.data;
    });

        $scope.go = function(path){
            $location.path(path);
        }
  });
