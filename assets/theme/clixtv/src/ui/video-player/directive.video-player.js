(function() {
    var videoPlayer = function() {
        return {
            restrict: 'AE',
            controller: 'VideoPlayerController',
            scope: {
                video: '=',
                autoPlay: '=',
                videoId: '@',
                onReady: '=?',
                onError: '=?',
                onComplete: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoPlayer', videoPlayer);
}());