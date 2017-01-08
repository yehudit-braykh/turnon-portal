var v = null;
vttApp.controller('canalesPremiumController', function canalesPremiumController ($scope, $location, $http, $log) {
    v = $scope;

    $scope.go = function(path){
        $location.path(path);
    }

  });
