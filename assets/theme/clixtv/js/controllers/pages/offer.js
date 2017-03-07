var of = null;
clixApp.controller('offerController', function offerController ($scope, $rootScope, $location, brandsFactory, videosFactory, $routeParams, User) {
      of = $scope;
      $scope.shownTab='OverView';

      $scope.slide = ["/assets/theme/clixtv/images/Nike/1.png","/assets/theme/clixtv/images/Nike/2.png","/assets/theme/clixtv/images/Nike/3.png"];

      brandsFactory.getBrandByID($routeParams.offerName).then(function(data){
          $scope.offer=data;

          brandsFactory.getBrandByID($scope.offer.brands[0]).then(function(data){
              $scope.relatedBrand=data;

              brandsFactory.getBrandOffers($scope.relatedBrand._id).then(function(result){
                  $scope.relatedOffers= result;

                  brandsFactory.getBrandVideos($scope.relatedBrand._id).then(function(data){
                      $scope.offer.relatedVideos=data;
                      $scope.offer.video=$scope.offer.relatedVideos[0];
                  });
            });
          });

          brandsFactory.getBrandCelebs($scope.offer._id).then(function(data){
              $scope.offer.celebrities=data;
          });
      });

    window.onscroll = function(){
        var windowYOffset = window.pageYOffset,
            elBackgrounPos = "50% " + (-1*windowYOffset * 0.5) + "px";
        $(".offer-page-header").css('background-position', elBackgrounPos);
      };

      $scope.go = function (path) {
          $location.path(path);
      }

      $scope.isFavorite = function(){
          if($scope.offer)
            return User.isFavorite($scope.offer._id,'offer');
      }

      $scope.addRemoveFavorites = function(){
          if($scope.offer)
            return User.addRemoveFavorites($scope.offer._id,'offer');
      }

      $scope.addRemoveOffer = function(){
          User.addRemoveOffer($scope.offer.id);

      }

      $scope.isSavedOffer = function(){
          if($scope.offer)
            return User.isSavedOffer($scope.offer.id);
      }

      $scope.shareModal = function(){
          $rootScope.$broadcast("socialModal", $scope.offer);
      }

  });
