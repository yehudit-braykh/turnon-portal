var h = null;
peruDigitalApp.controller('headerController', function homeController ($scope) {
      h = $scope;
      $scope.isLoggedIn= function(){
          return false;
      }

      $scope.user={name:'Larry Vaughn',
                   profile_pic:'/assets/theme/ped/images/static-images/profile-pic.png'};
  });
