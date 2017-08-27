var mbb = null
turnOnApp.directive('mybagBlock', function() {
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
      controller: ['$scope', '$location', function mybagBlockController($scope, $location) {
          mbb = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/mybag_block/mybag_block.html',
    };
  })
