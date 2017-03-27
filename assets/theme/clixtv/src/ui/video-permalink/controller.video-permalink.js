(function() {

    var VideoPermalinkController = [
        '$q',
        '$scope',
        '$timeout',
        '$window',
        '$stateParams',
        'videosService',
        'celebrityService',
        function($q, $scope, $timeout, $window, $stateParams, videosService, celebrityService) {

            $scope.isMobile = ($window.innerWidth <= 800);
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
                        $scope.video = data;

                        var celebrityId = (data.celebrities) ? data.celebrities[0] : undefined,
                            categoryName = (data.categories && data.categories.length > 0) ? data.categories[0].name : 'Sports';

                        if (!celebrityId) {
                            return $q.when([]);
                        }

                        return $q.all(
                            [
                                celebrityService.getBrandsByCelebrityId(celebrityId),
                                celebrityService.getCharitiesByCelebrityId(celebrityId),
                                celebrityService.getCelebrityById(celebrityId),
                                videosService.getVideosByCategory(categoryName)
                            ]
                        );
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.ready = true;
                        $scope.brands = data[0];
                        $scope.charities = data[1];
                        $scope.celebrities = [data[2]];
                        $scope.relatedVideos = data[3];
                        $scope.nextVideos = data[3];
                    }
                );

            // if ($window.innerWidth <= 1000) {
            //     $scope.playerHeight = 270;
            //     $scope.originalPlayerHeight = $scope.playerHeight;
            // }

            $scope.onPlayerReady = function(configs) {
                var height = (configs.height - angular.element(document.getElementById('toggle-button-container')).outerHeight() - 20);
                if ($scope.isMobile) {
                    height *= 2;
                }
                $scope.playerHeight = height;
                $scope.originalPlayerHeight = $scope.playerHeight;
                $timeout(function() {
                    $scope.$apply();
                });
            };

            $scope.onExpandToggle = function() {
                var height = angular.element(document.getElementById('about-video-container')).outerHeight() * 2,
                    expandedSize = ($window.innerWidth <= 1000) ? 999 : height;
                $scope.expanded = !$scope.expanded;
                $scope.playerHeight = ($scope.expanded) ? expandedSize : ($scope.originalPlayerHeight);
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());