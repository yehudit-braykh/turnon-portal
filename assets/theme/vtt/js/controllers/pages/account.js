var acc = null;
vttApp.controller('aController', function accountController ($scope, $location, $http, $log) {
    acc = $scope;

    $scope.go = function(path){
        $location.path(path);
    }

  });
