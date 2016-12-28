var he = null;
peruDigitalApp.controller('headerController', function headerController ($scope, $rootScope, $location, AuthService, User, videoFactory,categoriesFactory, $routeParams) {
      he = $scope;

      $scope.isHome = function(){
        return $location.path()==="/";
      }

      $scope.search = function(){
          $scope.go('/search/'+document.getElementById("search").value);

      }

      categoriesFactory.getAllCategories().then(function(data){

        $scope.categories = data.data
      });

      videoFactory.getChannels().then(function(data){
          $scope.channels = data.data;

          videoFactory.getEpg($scope.channels[0]._id).then(function(data){
              $scope.epg1 = data.data;

          });
          videoFactory.getEpg($scope.channels[0]._id).then(function(data){
              $scope.epg2 = data.data;

          });

      });



      $scope.go = function(path){
          $location.path(path);
      }

      $scope.socialLogin = function(){
          $rootScope.socialLogin= true;
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

    $scope.loginUser = function () {
        $scope.loginError=null;
        AuthService.login($scope.userRegister.email, $scope.userRegister.password);
    };


        $scope.logout = function (){
            AuthService.logout();
            $location.url('/');
        }


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
      $scope.loginError= args.message;
    });


    $scope.$on("auth-register-success", function (){
        $('.loginModal').modal('hide')

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

    $scope.calcPercent = function(startTime,endTime){
        var timeNow = new Date();
        var start= new Date(startTime);
        var end= new Date(endTime);
        if(start>=timeNow)
            return 0;
        if(end<=timeNow)
            return 100;
        return ((timeNow-start)/(end-start)*100);
    }

});

var finished_login = function(data){
  $("[ng-controller=headerController]").scope().finished_login(data);

};
