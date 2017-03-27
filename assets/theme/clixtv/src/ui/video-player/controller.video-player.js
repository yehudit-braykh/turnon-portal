(function() {

    var VideoPlayerController = [
        '$q',
        '$scope',
        '$timeout',
        'knetikService',
        function($q, $scope, $timeout, knetikService) {

            $timeout(function() {
                var playerInstance;

                if ($scope.video) {
                    playerInstance = jwplayer($scope.videoId).setup({
                        file: $scope.video.HLSStream ? $scope.video.HLSStream.url : $scope.video.mainTrailer.url,
                        // primary: 'html5',
                        androidhls: true,
                        autostart: $scope.autoPlay,
                        aspectratio: '16:9',
                        controls: true,
                        width: '100%',
                        //repeat: true,
                        icons: false,
                        image: $scope.video.PosterH ? $scope.video.PosterH.url : $scope.video.BackgroundImage.url
                    });

                    if (playerInstance) {
                        jwplayer().on('ready', function() {
                            if ($scope.onReady) {
                                $scope.onReady({
                                    height: jwplayer().getHeight()
                                });
                            }
                        });

                        jwplayer().on('error', function() {
                            if ($scope.onError) {
                                $scope.onError();
                            }
                        });
                    }
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPlayerController', VideoPlayerController);
}());