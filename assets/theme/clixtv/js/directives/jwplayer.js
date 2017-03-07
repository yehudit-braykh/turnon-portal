clixApp.directive('jwplayer', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          video: '=video',
          autoPlay: '=autoPlay',
          id:'@id'
      },
      controller: ['$scope', 'knetikFactory', function jwpCtrl($scope, knetikFactory) {
          $scope.setupVideo= function(vid){
              if(vid){
                  console.log();
                  jwplayer($scope.id).setup({
                     file: vid.HLSStream?vid.HLSStream.url:vid.mainTrailer.url,
                    //  primary: 'html5',
                     androidhls: true,
                     autostart: $scope.autoPlay,
                     aspectratio: "16:9",
                     controls: true,
                     width: "100%",
                     icons: false,
                     image: vid.PosterH?vid.PosterH.url:vid.BackgroundImage.url,
                 });
                 jwplayer().on('play', function() {
                     document.getElementById($scope.id).style.display = "block";
                     document.getElementById("play-arrow").style.display = "none";
                 })

                 $scope.currentPosition = 0;
                 jwplayer().on('time',function (e) {
                     var positionDiff = e.position - $scope.currentPosition;
                       if (Math.abs(e.position - $scope.currentPosition) > 1) {
                           jwplayer().seek($scope.currentPosition);
                       } else {
                           $scope.currentPosition = e.position;
                       }
                 });



                 jwplayer().on('complete', function() {
                     console.log('complete');
                     knetikFactory.updateActivity(vid, 'show');
                 })
             }
             else{
                 jwplayer($scope.id).remove();
             }
         }



         $scope.playVideo = function(){
             jwplayer().play();
             document.getElementById($scope.id).style.display = "block";
             document.getElementById("play-arrow").style.display = "none";
         }

      }],
      link: function(scope, element, attrs) {
            scope.$watch("video",function(newValue,oldValue) {
                scope.setupVideo(newValue);
            });
        },
      templateUrl: '/assets/theme/clixtv/html/directives/jwplayer.html'
    };
  })
