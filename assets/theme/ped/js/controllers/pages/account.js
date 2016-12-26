var acc = null;
peruDigitalApp.controller('accountController', function accountController ($scope, AuthService, User, $location, $routeParams) {
      acc = $scope;

      $scope.shownView = $routeParams.sectionName;
//      console.log($scope.shownView);
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
          AuthService.updateProfile($scope.user);
      }
  });
