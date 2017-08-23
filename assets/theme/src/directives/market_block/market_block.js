var so = null
turnOnApp.directive('marketBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          limit: "=",
          order: "@",
          reverse: "=",
          link: "=",
          search: '=',
          col: "@"
      },
      controller: ['$scope', '$location', function marketBlockController($scope, $location) {
          so = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/market_block/market_block.html',
    };
  })
