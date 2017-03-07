var br = null;
clixApp.controller('brandController', function brandController ($scope, $rootScope, $location, brandsFactory, videosFactory, $routeParams, User) {
      br = $scope;
      $scope.shownTab='Home';
      $scope.sortField = '';

      brandsFactory.getBrandByName($routeParams.brandName).then(function(data){
          $scope.brand=data;

          brandsFactory.getBrandOffers($scope.brand._id).then(function(result){
                  $scope.relatedOffers= result;
        });
      }).then(function(){
            brandsFactory.getBrandCelebs($scope.brand._id).then(function(data){
                $scope.brand.celebrities=data;

            });
            brandsFactory.getBrandVideos($scope.brand._id).then(function(data){
                $scope.brand.relatedVideos=data;
                $scope.brand.video=$scope.brand.relatedVideos[0];

            });
        });

        window.onscroll = function(){
            var windowYOffset = window.pageYOffset,
                elBackgrounPos = "50% " + (-1*windowYOffset * 0.5) + "px";
            $(".brand-page-header").css('background-position', elBackgrounPos);
          };

      $scope.go = function (path) {
          $location.path(path);
      }

      $scope.addToFavorites = function(){
          if($scope.brand)
            User.addRemoveFavorites($scope.brand._id,'brand');
      }

      $scope.isFavorite = function(){
          if($scope.brand)
            return User.isFavorite($scope.brand._id,'brand');
        return false;
      }

      $scope.shareModal = function(){
          $rootScope.$broadcast("socialModal", $scope.brand);
      }

      $scope.sortBy = function(field){
          $scope.sortField = field;
      }

  });
