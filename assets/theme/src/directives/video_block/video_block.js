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
          $scope.currentVideo = [];

          $scope.go = function (path) {
              $location.path(path);
          };

          $scope.getFullDescription = function(video){
            $scope.currentVideo = video;
          }

      }],
      templateUrl: '/assets/theme/src/directives/video_block/video_block.html',
    };
  })
