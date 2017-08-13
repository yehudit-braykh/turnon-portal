var he = null;
turnOnApp.controller('headerController', function headerController ($scope, $rootScope, $location, $routeParams, User, AuthService) {
      he = $scope;

      $scope.user = User;


});
