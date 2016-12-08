var h = null;
peruDigitalApp.controller('headerController', function homeController ($scope, $location) {
      h = $scope;
      $scope.isLoggedIn= function(){
          return false;
      }

      $scope.user= {
          name:'Larry Vaughn',
          profile_pic:'/assets/theme/ped/images/static-images/profile-pic.png'
      };
      $scope.go = function(path){
          $location.path(path);
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
  //    console.log("USER", User);
        $scope.user = User;
        $scope.user.reward = {current_balance: 1280}
        //$scope.$apply();
    });

    $scope.$on("auth-login-error", function (event, args){
  //  console.log("login-error", args);
      $scope.loginError= args.title;
    });

    $scope.$on("auth-register-success", function (){
        $('.loginModal').modal('hide')
        //$scope.$apply();
        $scope.loginUser();
    });

    $scope.$on("auth-register-error", function (event, args){
  //  console.log("login-error", args);
      if(args.message.includes('User already registered'))
          $scope.registerError= "User already registered!";
      else
          $scope.registerError= args.message;
    });
    $scope.$on("auth-logout", function (){
        $scope.user = User;
    });
    $scope.finished_login = function (data){
      //   console.log("finished login", $scope, data);
      //   $scope.step2 = false;
      //   setCookie("ci_session", data, 7);
        AuthService.getCurrentUser();
    };
});

var finished_login = function(data){
//  	console.log("finished login 0", data);
  $("[ng-controller=headerController]").scope().finished_login(data);

};
