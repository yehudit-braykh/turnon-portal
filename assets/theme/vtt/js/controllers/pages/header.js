var he = null;
vttApp.controller('headerController', function headerController ($scope, $rootScope, $location, $routeParams, User, AuthService) {
      he = $scope;

      $scope.user = User;

      $scope.menu = {
        // 0:{title:"Television Gratis"},
        1:{title:"Videos"},
        2:{title:"Peliculas"},
        3:{title:"Karaoke"},
        4:{title:"Programas"},
        5:{title:"Canales Premium"},
        6:{title:"Como Funciona"}
    };

      $scope.isHome = function(){
        return $location.path()==="/";
      }

      $scope.search = function(){
          $scope.go('/search/'+document.getElementById("search").value);

      }



      $scope.isLoggedIn= function(){
         return AuthService.isLoggedIn();
      }

      $scope.logout = function (){
          AuthService.logout();
          $location.url('/');
      }
      $scope.go = function(path){
          $location.path(path);
      }

      $scope.finished_login = function (data){
          AuthService.getCurrentUser();
          $scope.user = User;
          $scope.go('/');
      };

});
