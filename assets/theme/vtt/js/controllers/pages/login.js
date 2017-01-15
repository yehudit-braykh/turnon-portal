var lo = null;
vttApp.controller('loginController', function loginController ($scope, $routeParams, videoFactory, $location, User, AuthService) {
      lo = $scope;

      $scope.userLogin={
          email:'',
          password:''
      }
      $scope.go = function(path){
          $location.path(path);
      }

      $scope.loginUser = function () {
          $scope.loginError = null;
          if (!$scope.userLogin.email || !$scope.userLogin.password)
            $scope.loginError= "Please Type Email And Password";
        else{
            $scope.loginError=null;
            AuthService.login($scope.userLogin.email, $scope.userLogin.password);
        }
      };

      $scope.$on("auth-login-success", function (){
          $scope.user = User;
          $scope.go('/');
      });

      $scope.$on("auth-login-error", function (event, args){
        $scope.loginError= args.message;
      });

  });

  var finished_login = function(data){
    $("[ng-controller=headerController]").scope().finished_login(data);

  };
