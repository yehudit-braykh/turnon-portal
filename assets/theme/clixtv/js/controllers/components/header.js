var he = null;
clixApp.controller('headerController', function headerController ($scope, $rootScope, $http, videosFactory, categoryFactory, $location, User, AuthService, $routeParams, knetikFactory) {
      he = $scope;


      $scope.user = User.getUser();


      $(document).scroll(function() {
          if($(document).scrollTop() > 50) {
              $(".header-clix").addClass('header-black');
           } else {
              $('.header-clix').removeClass('header-black');
           }
       });

      $scope.getLocation = function(){
          return $location.path();
      }

      $scope.unreadNotificationsCount = function(){
          var count = 0;
          for (n in $scope.notifications)
            if(!$scope.notifications[n].read)
                count++;
          return count;
      }

      User.getWatchList().then(function(data){
          $scope.watchList = data;
      });

      User.getNotifications().then(function(data){
          if(data)
              $scope.notifications = data;

      });

      $scope.notificationClick = function(not){
          User.markAsRead(not._id).then(function(data){
             $scope.notifications.splice(not,1);
          });
      }


      $scope.logout = function (){
  		AuthService.logout();
        $scope.user = User.getUser();
        $location.url('/');
  	}
      $scope.resizeInput = function () {
          if ($scope.timeout == 1) return;
          $('.fa-search').css('color', '#e61419');
          if ($( window ).width() < 789) {
              $('#search-terms-mobile').focus();
              $scope.focused = true;
          }else {
              $('#search-terms').focus();
              $scope.focused = true;
          }
      }
      $scope.searchUnfocus = function () {
          $scope.focused = false;
           $('.fa-search').css('color', 'white');
           $scope.timeout = 1;
           setTimeout(function () {
              $scope.timeout = 0;
          }, 300);
      }

      $scope.tags = [
          {title: "Kyrie Irving"},
          {title: "Blake Shelton"},
          {title: "Arnold Schwarzenegger"},
          {title: "50 cent"},
          {title: "Lindsey Vonn"},
          {title: "Taylor Swift"}
      ];
      categoryFactory.getCategories().then(function(categories) {
          $scope.categories = categories;
      });
      $scope.go = function (path) {
          $location.path(path);
      }


      $scope.showLoginModal = function(register = false){
          $rootScope.$broadcast("show-login-modal", register);
      }



      $scope.$on("points-update", function (){
         knetikFactory.getPoints().then(function(data){
           $scope.user.current_balance = data;
         });
      });

      $scope.$on("auth-login-success", function (){
          $rootScope.$broadcast('hide-login-modal');
    //    console.log("USER", User);
          $scope.user = User.getUser();

          knetikFactory.getPoints().then(function(data){
            //  console.log(data);
            $scope.user.current_balance = data;
          });

      });

      $scope.$on("auth-logout", function (){
          $scope.user = User.getUser();
      });
      $scope.finished_login = function (data){
          AuthService.getCurrentUser();
      };



  });

  var finished_login = function(data){
 //  	console.log("finished login 0", data);
  	$("[ng-controller=headerController]").scope().finished_login(data);

  };


clixApp.controller('loginController', function loginController ($scope, $rootScope, $http, videosFactory, categoryFactory, $location, User, AuthService){
    $scope.showRegister = null;
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

    $scope.registerUser = function () {
        $scope.registerError=null;
      if($scope.userRegister.password != $scope.userRegister.confirmPassword){
          $scope.registerError="Password does not match confirm password!";
      }
      else{
        AuthService.register($scope.userRegister).then(function(data) {});
      }
    };

    $rootScope.$on("show-login-modal", function(e, args){
        $scope.showRegister = args;
        $('.loginModal').modal('show');
    });

    $rootScope.$on("hide-login-modal", function(e){
        $('.loginModal').modal('hide');
    });

    $('.loginModal').on('hidden.bs.modal', function(e){
        $scope.userRegister.email = '';
        $scope.userRegister.password = '';
        $scope.userRegister.first_name = '';
        $scope.userRegister.last_name = '';
        $scope.loginError = null;
        $scope.registerError = null;
    });

    $scope.$on("auth-register-success", function (){
        $('.loginModal').modal('hide')
        $scope.loginUser();
    });

    $scope.$on("auth-login-error", function (event, args){
      $scope.loginError= args.message;
    });

    $scope.$on("auth-register-error", function (event, args){
  //  console.log("login-error", args);
      if(args.message.includes('User already registered'))
          $scope.registerError= "User already registered!";
      else
          $scope.registerError= args.message;
    });

    $scope.resetPassword = function(){
        if($scope.userRegister.email)
            AuthService.resetPassword($scope.userRegister.email).then(function(data){
                console.log(data);
                if(data.data)
                    $scope.loginError = "Your new Password has been sent to your e-mail";
                else
                    $scope.loginError = "You are not registered please register";
            });
        else {
            $scope.loginError = "Please Type Your Email"
        }
    }

});
