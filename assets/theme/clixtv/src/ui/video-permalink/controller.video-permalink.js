(function() {

    var VideoPermalinkController = [
        '$q',
        '$scope',
        '$timeout',
        '$stateParams',
        'videosService',
        function($q, $scope, $timeout, $stateParams, videosService) {

            $scope.expanded = false;

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
                        $scope.nextVideos = [];
                        $scope.relatedVideos = [];

                        var i = 0, length = 12;
                        for (i = 0; i < length; i++) {
                            $scope.nextVideos.push(data.data);
                        }
                        for (i = 0; i < length; i++) {
                            $scope.relatedVideos.push(data.data);
                        }
                    }
                );

            $scope.onPlayerReady = function(configs) {
                $scope.playerHeight = (configs.height - angular.element(document.getElementById('toggle-button-container')).outerHeight() - 20);
                $scope.originalPlayerHeight = $scope.playerHeight;
                $timeout(function() {
                    $scope.$apply();
                });
            };

            $scope.onExpandToggle = function() {
                $scope.expanded = !$scope.expanded;
                $scope.playerHeight = ($scope.expanded) ? (angular.element(document.getElementById('about-video-container')).outerHeight()) : ($scope.originalPlayerHeight);
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());