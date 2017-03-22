(function() {

    var VideoPermalinkController = [
        '$q',
        '$scope',
        '$timeout',
        'videosService',
        function($q, $scope, $timeout, videosService) {


            //angular.element(document.getElementById('videoPlayer')).innerHeight()

            videosService.getVideoById('57fd596a878adf00033c9570')
                .then(
                    function onSuccess(data) {
                        $scope.video = data.data;
                        console.log(data.data);
                    }
                );

            $scope.onPlayerReady = function(configs) {
                $scope.playerHeight = configs.height - angular.element(document.getElementById('toggle-button-container')).outerHeight() - 20;
                $timeout(function() {
                    $scope.$apply();
                });
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());