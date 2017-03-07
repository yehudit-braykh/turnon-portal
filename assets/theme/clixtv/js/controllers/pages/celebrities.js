var celebs=null;

clixApp.controller("celebritiesController", function celebritiesController($scope, $location, celebrityFactory){
    celebs=$scope;

    $scope.search='';
    $scope.selectedFilter='';
    $scope.sortField = '';

    celebrityFactory.getAllCelebrities().then(function(data){
        //console.log(data);
        $scope.celebrities = data;
    });

    $scope.celebritiesFilter = function(item){
        if(!$scope.search && !$scope.selectedFilter)
          return item;
      if (!$scope.selectedFilter)
          if(item.title.toLowerCase().includes($scope.search.toLowerCase()))
              return item;
    }

    $scope.sortBy = function(field){
        $scope.sortField = field;
    }

    $scope.go = function (path) {
        $location.path(path);
    }

});
