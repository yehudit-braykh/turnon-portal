(function() {

    var VideoPlayerController = [
        '$q',
        '$scope',
        'knetikService',
        function($q, $scope, knetikService) {

            if ($scope.video) {
                jwplayer($scope.videoId).setup({
                    file: $scope.video.HLSStream ? $scope.video.HLSStream.url : $scope.video.mainTrailer.url,
                    //  primary: 'html5',
                    androidhls: true,
                    autostart: $scope.autoPlay,
                    aspectratio: '16:9',
                    controls: true,
                    width: '100%',
                    //repeat: true,
                    icons: false,
                    image: $scope.video.PosterH ? $scope.video.PosterH.url : $scope.video.BackgroundImage.url
                });

                jwplayer().on('ready', function() {
                    if ($scope.onReady) {
                        $scope.onReady({
                            height: jwplayer().getHeight()
                        });
                    }
                });
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPlayerController', VideoPlayerController);
}());