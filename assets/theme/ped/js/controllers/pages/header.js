var he = null;
peruDigitalApp.controller('headerController', function headerController ($scope, $location, AuthService, User) {
      he = $scope;

      $scope.go = function(path){
          $location.path(path);
      }

      $scope.isLoggedIn= function(){
          return AuthService.isLoggedIn();
      }

      $scope.userRegister = {
          email: '',
          password: '',
          first_name:'',
          last_name:''
    };
        $scope.logout = function (){
            AuthService.logout();
            $location.url('/');
        }
        $scope.loginUser = function () {
            $scope.loginError=null;
            AuthService.login($scope.userRegister.email, $scope.userRegister.password);
        };

        $scope.registerUser = function () {
            $scope.registerError=null;
            //   $scope.userRegister.last_name = 'Rozo';
            //   $scope.userRegister.first_name = 'Mark';
            // console.log('here!!!', $scope.user );
            if($scope.userRegister.password != $scope.userRegister.confirmPassword){
                $scope.registerError="Password does not match confirm password!";
            }else{
                AuthService.register($scope.userRegister).then(function(data) {
            });
        }
    };
    $scope.$on("auth-login-success", function (){
        $('.loginModal').modal('hide')
        $scope.user = User;
    });

    $scope.$on("auth-login-error", function (event, args){
      $scope.loginError= args.title;
    });


    $scope.$on("auth-register-success", function (){
        $('.loginModal').modal('hide')
        $scope.loginUser();
    });

    $scope.$on("auth-register-error", function (event, args){
      if(args.message.includes('User already registered'))
          $scope.registerError= "User already registered!";
      else
          $scope.registerError= args.message;
    });

    $scope.$on("auth-logout", function (){
        $scope.user = User;
    });
    $scope.finished_login = function (data){
        AuthService.getCurrentUser();
    };
});

var finished_login = function(data){
  $("[ng-controller=headerController]").scope().finished_login(data);

};
