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

          $scope.getLine = function (i) {
              var line = parseInt(i / 4);
              return line;
          };

          $scope.getFullDescription = function(video, i){
            $scope.currentVideo = video;
            var line = parseInt(i / 4);
            $scope.currentVideo.line = line;
            //console.log($scope.currentVideo);
          }


      }],
      templateUrl: '/assets/theme/src/directives/video_block/video_block.html',
    };
  })
