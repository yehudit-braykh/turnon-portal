(function() {

    var VideoPermalinkController = [
        '$q',
        '$scope',
        '$timeout',
        '$stateParams',
        'videosService',
        function($q, $scope, $timeout, $stateParams, videosService) {

            $scope.seriesList = [
                {
                    label: 'Series 1: Series Name Here...'
                },
                {
                    label: 'Series 2: Series Name Here...'
                },
                {
                    label: 'Series 3: Series Name Here...'
                },
                {
                    label: 'Series 4: Series Name Here...'
                },
                {
                    label: 'Series 5: Series Name Here...'
                }
            ];

            videosService.getVideoById($stateParams.id)
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