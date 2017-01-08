var p = null;
vttApp.controller('peliculasController', function peliculasController ($scope, $location, $http, $log) {
    p = $scope;

    $scope.go = function(path){
        $location.path(path);
    }

  });
