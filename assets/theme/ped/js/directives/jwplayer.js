peruDigitalApp.directive('jwplayer', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          video: '=video',
          autoPlay: '=autoPlay',
          id:'@id'
      },
      controller: ['$scope', function jwpCtrl($scope) {
          $scope.setupVideo= function(vid){
            console.log(vid);
              if(vid){
                  jwplayer($scope.id).setup({
                     file: vid.HLSStream.url,
                     primary: 'flash',
                     androidhls: true,
                     autostart: $scope.autoPlay,
                     aspectratio: "16:9",
                     controls: true,
                     width: "100%",
                     icons: false,
                 });
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
      templateUrl: '/assets/theme/ped/html/directives/jwplayer.html'
    };
  })
