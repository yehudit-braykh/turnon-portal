var fo = null;
turnOnApp.controller('footerController', function footerController ($scope, $location) {
      fo = $scope;

      $scope.go = function(path){
          $location.path(path);
      }


});
