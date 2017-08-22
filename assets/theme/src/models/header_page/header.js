var he = null;
turnOnApp.controller('headerController', function headerController ($scope, $location, $http, $log,$interval) {
    he=$scope;
    $scope.login = false;
    $scope.showfade = false;


    $scope.Signin = function(){
        $scope.login = true;
    }

    $scope.openmanu =  function () {
        $scope.showfade = true;
    }

    $scope.go = function (path) {
      $location.path(path);
    };
});
