var fo = null;
vttApp.controller('footerController', function footerController ($scope, $location) {
      fo = $scope;

      $scope.returnTop = function () {
           $("body").animate({"scrollTop": "0px"}, 500);
      }
      $scope.go = function(path){
          $location.path(path);
      }


});
