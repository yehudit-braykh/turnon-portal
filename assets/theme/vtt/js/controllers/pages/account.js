var acc = null;
peruDigitalApp.controller('accountController', function accountController ($scope, AuthService, User, $location, $routeParams, subscriptionsFactory) {
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

      subscriptionsFactory.getAllPlans().then(function(data){
        $scope.plans = data.data.entries;
      });

      $scope.buyPlan = function(planId){
        console.log(planId);
      }
  });
