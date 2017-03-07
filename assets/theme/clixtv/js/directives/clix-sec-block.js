clixApp.directive('clixSecBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          brand: '=',
          offer: '=',
          charity: '=',
          category: '=',
          href: '@',
          hrefParam: '@',
          subMenu: '=',
          reward: '='
      },
      controller: ['$scope', '$rootScope', '$location', 'User', function clixSecCarouselController($scope, $rootScope, $location, User) {
          sc = $scope;

          $scope.go = function (path) {
              $location.path(path);
          }

          $scope.addRemoveFavorites = function(item){
              if($scope.brand){
                  User.addRemoveFavorites(item._id, 'brand');
              }
              if($scope.offer){
                  User.addRemoveFavorites(item.id, 'offer');
              }
              if($scope.category){
                  User.addRemoveFavorites(item._id, 'category');
              }
              if($scope.charity){
                  User.addRemoveFavorites(item._id, 'charity');
              }

          }

          $scope.isFavorite = function(id){
              if($scope.brand){
                  return User.isFavorite(id, 'brand');
              }
              if($scope.offer){
                  return User.isFavorite(id, 'offer');
              }
              if($scope.category){
                  return User.isFavorite(id, 'category');
              }
              if($scope.charity){
                  return User.isFavorite(id, 'charity');
              }
              return false;
          }

          $scope.addRemoveOffer = function(item){
              User.addRemoveOffer(item._id);

          }

          $scope.isSavedOffer = function(id){
              return User.isSavedOffer(id);
          }

          $scope.shareModal = function(){
              $rootScope.$broadcast("socialModal", $scope.model);
          }


      }],
      templateUrl: '/assets/theme/clixtv/html/directives/clix-sec-block.html'
    };
  })
