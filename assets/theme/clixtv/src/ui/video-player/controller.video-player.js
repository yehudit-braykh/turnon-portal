(function() {

    var VideoPlayerController = [
        '$q',
        '$scope',
        '$timeout',
        'knetikService',
        'catchMediaService',
        function($q, $scope, $timeout, knetikService, catchMediaService) {

            $timeout(function() {
                var playerInstance;

                if ($scope.video) {

                    playerInstance = jwplayer($scope.videoId).setup({
                        file: $scope.video.streamUrl,
                        // primary: 'html5',
                        androidhls: true,
                        autostart: $scope.autoPlay,
                        aspectratio: '16:9',
                        controls: true,
                        width: '100%',
                        //repeat: true,
                        icons: false,
                        image: $scope.video.thumbnail,
                        mediaid: $scope.video.id
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

                        jwplayer().on('complete', function() {
                            if ($scope.onComplete) {
                                $scope.onComplete();
                            }
                        });

                        catchMediaService.trackVideoPlayerEvent(playerInstance);
                    }
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPlayerController', VideoPlayerController);
}());