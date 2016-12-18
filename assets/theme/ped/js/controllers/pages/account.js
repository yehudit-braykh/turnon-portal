var acc = null;
peruDigitalApp.controller('accountController', function accountController ($scope, AuthService, User, $location) {
      acc = $scope;

      $scope.isLoggedIn= function(){
          return AuthService.isLoggedIn();
      }

      if(!$scope.isLoggedIn()){
          $location.path('/');
      }

      $scope.user = User;

      $scope.editing = false;

      $scope.enableEdit = function () {
          if($scope.editing)
            $scope.update_user();
          $scope.editing = !$scope.editing

      }

      $scope.update_user= function(){
          AuthService.saveProfile($scope.user);
      }
  });
