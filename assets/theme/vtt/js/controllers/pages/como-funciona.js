var v = null;
vttApp.controller('comoFuncionaController', function comoFuncionaController ($scope, $location, $http, $log) {
    v = $scope;

    $scope.go = function(path){
        $location.path(path);
    }

  });
