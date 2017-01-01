var h = null;
vttApp.controller('homeController', function homeController ($scope, $location) {
      h = $scope;

    $scope.go = function(path){
        $location.path(path);
    }



  });
