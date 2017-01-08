var pr = null;
vttApp.controller('programasController', function programasController ($scope, $location, $http, $log) {
    pr = $scope;

    $scope.go = function(path){
        $location.path(path);
    }

  });
