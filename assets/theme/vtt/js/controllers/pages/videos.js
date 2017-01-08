var v = null;
vttApp.controller('videosController', function videosController ($scope, $location, $http, $log) {
    v = $scope;

    $scope.go = function(path){
        $location.path(path);
    }

  });
