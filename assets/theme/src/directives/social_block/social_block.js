var so = null
turnOnApp.directive('socialBlock', function() {
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
      controller: ['$scope', '$location', function socialBlockController($scope, $location) {
          so = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/social_block/social_block.html',
    };
  })
