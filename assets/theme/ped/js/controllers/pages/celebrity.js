var celeb = null;
peruDigitalApp.controller('celebrityController', function celebrityController ($scope, videoFactory, celebritiesFactory, $routeParams, $location, brandsFactory) {
      celeb = $scope;

     celebritiesFactory.getCelebrityById($routeParams.celebrityId).then(function(data){

         $scope.celebrity= data.data[0];
         celebritiesFactory.getAllCelebrities().then(function(data){
             $scope.otherCelebrities = data.data;
        //     $scope.otherCelebrities.splice($scope.otherCelebrities.indexOf($scope.celebrity),1);
         });
     });

     videoFactory.getvideoByCelebId($routeParams.celebrityId).then(function(data){

         $scope.videos= data.data;
     });


    brandsFactory.getAllBrands().then(function(data){
        $scope.brands= data.data;
    });

        $scope.go = function(path){
            $location.path(path);
        }
  });
