var ba=null
turnOnApp.directive('videoBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          limit: "=",
          order: "@",
          reverse: "=",
          link: "=",
          search: '='
      },
      controller: ['$scope', '$location', function videoBlockController($scope, $location) {
          ba = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/video_block/video_block.html',
    };
  })
