var mlb=null
turnOnApp.directive('mylistvideoBlock', function() {
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
          mlb = $scope;
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
      templateUrl: '/assets/theme/src/directives/mylist_video_block_page/mylist_video_block.html',
    };
  })
