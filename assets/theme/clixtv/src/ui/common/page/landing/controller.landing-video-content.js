(function() {

    var LandingVideoContentController = [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {

            $rootScope.$on('video.play', function() {
                $scope.videoPlaying = true;
            });

            $rootScope.$on('video.pause', function() {
                $scope.videoPlaying = false;
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('LandingVideoContentController', LandingVideoContentController);
}());