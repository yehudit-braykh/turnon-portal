(function() {

    var VideoPermalinkController = [
        '$q',
        '$scope',
        '$timeout',
        '$window',
        '$filter',
        '$stateParams',
        'videosService',
        'celebrityService',
        'catchMediaService',
        function($q, $scope, $timeout, $window, $filter, $stateParams, videosService, celebrityService, catchMediaService) {

            $scope.isMobile = ($window.innerWidth <= 800);
            $scope.expanded = false;

            videosService.getVideoById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        $scope.video = data;

                        var seasons = $filter('orderBy')(data.series.seasons.seasons, 'seasonNumber');

                        $scope.seasons = seasons;
                        $scope.selectedSeason = seasons[0];
                        $scope.seasonList = seasons.map(function(season) {
                            return {
                                label: 'Season ' + season.seasonNumber + ': ' + season.title,
                                onClick: function() {
                                    $scope.selectedSeason = season;
                                }
                            }
                        });

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
                        $scope.brands = data[0];
                        $scope.charities = data[1];
                        $scope.celebrities = [data[2]];
                        $scope.relatedVideos = data[3];
                        $scope.nextVideos = data[3];
                        $scope.ready = true;

                        catchMediaService.addWatchByVideoId($scope.video.id);
                    }
                );

            if ($window.innerWidth <= 1000) {
                $scope.playerHeight = 270;
                $scope.originalPlayerHeight = $scope.playerHeight;
            }

            $scope.onPlayerReady = function(configs) {
                $scope.playerHeight = (configs.height - angular.element(document.getElementById('toggle-button-container')).outerHeight() - 20);

                if ($scope.isMobile) {
                    $scope.playerHeight = 400;
                }

                $scope.originalPlayerHeight = $scope.playerHeight;
                $timeout(function() {
                    $scope.$apply();
                });
            };

            $scope.onExpandToggle = function() {
                var expandedSize = angular.element(document.getElementById('about-video-container')).outerHeight();
                $scope.expanded = !$scope.expanded;
                $scope.playerHeight = ($scope.expanded) ? expandedSize : ($scope.originalPlayerHeight);
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());