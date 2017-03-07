var o = null;
clixApp.controller('offersController', function offersController ($scope, $location, brandsFactory) {
    o = $scope;
    $scope.shownTab='Brands';
    $scope.search='';
    $scope.selectedFilter='';
    $scope.sortField = '';

    brandsFactory.getAllBrands().then(function(data){
        $scope.brands = data;
    });

    brandsFactory.getAllOffers().then(function(data){
        $scope.offers = data;
    });

    $scope.go = function (path) {
        $location.path(path);
    }

    $scope.offersFilter = function(item){
        if(!$scope.search && !$scope.selectedFilter)
          return item;
      if (!$scope.selectedFilter)
          if(item.title.toLowerCase().includes($scope.search.toLowerCase()))
              return item;
    }

    $scope.sortBy = function(field){
        $scope.sortField = field;
    }



  });
