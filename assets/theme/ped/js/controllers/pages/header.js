var h = null;
peruDigitalApp.controller('headerController', function homeController ($scope, $location) {
      h = $scope;
      $scope.isLoggedIn= function(){
          return true;
      }

      $scope.user={name:'Larry Vaughn',
                   profile_pic:'/assets/theme/ped/images/static-images/profile-pic.png'};

    $scope.go = function(path){
        $location.path(path);
    }
  });
