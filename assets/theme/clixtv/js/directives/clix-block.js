clixApp.directive('clixBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
      },
      controller: ['$scope', '$rootScope', '$location', 'User', 'brandsFactory', function clixCarouselController($scope, $rootScope, $location, User, brandsFactory) {
          sc = $scope;

          $scope.go = function (path) {
              $location.path(path);
          }

          brandsFactory.getBrandsAndCharitiesObject().then(function(data){
              $scope.brands= data;
          });


          $scope.addRemoveFavorites = function(item){
              User.addRemoveFavorites(item._id, 'celeb');
          }

          $scope.isFavorite = function(id){
              return User.isFavorite(id, 'celeb');
          }

          $scope.addRemoveWatchlist = function(id){
              User.addRemoveWatchlist(id);
          }

          $scope.isWatchlist = function(id){
              return User.isWatchlist(id);
          }

          $scope.shareModal = function(item){
              $rootScope.$broadcast("socialModal", item);
          }

      }],
      templateUrl: '/assets/theme/clixtv/html/directives/clix-block.html'
    };
  })
