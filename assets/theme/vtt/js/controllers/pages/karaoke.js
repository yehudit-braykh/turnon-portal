var k = null;
vttApp.controller('karaokeController', function karaokeController ($scope, $location, $http, $log) {
    k = $scope;

    $scope.go = function(path){
        $location.path(path);
    }

  });
