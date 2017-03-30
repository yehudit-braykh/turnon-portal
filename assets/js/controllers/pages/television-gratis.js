var tg = null;
vttApp.controller('televisionGratisController', function televisionGratisController ($scope, $location, $http, $log) {
    tg = $scope;

    $scope.go = function(path){
        $location.path(path);
    }

  });
