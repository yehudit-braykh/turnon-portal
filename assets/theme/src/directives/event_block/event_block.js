var eb=null
turnOnApp.directive('eventBlock', function() {
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
      controller: ['$scope', '$location', function eventController($scope, $location) {
          eb = $scope;
          $scope.currentVideo = [];
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/event_block/event_block.html',
    };
  })
