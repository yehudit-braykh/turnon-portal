var se = null;
peruDigitalApp.controller('searchController', function searchController ($scope, $routeParams, videoFactory) {
      se = $scope;

     $scope.keyword= $routeParams.keyword;
     $scope.resultsToShow = 9;
     videoFactory.search($scope.keyword).then(function(data){
         $scope.results=data.data;
     });
  });
