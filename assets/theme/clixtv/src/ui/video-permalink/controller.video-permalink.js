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
        'userService',
        function($q, $scope, $timeout, $window, $filter, $stateParams, videosService, celebrityService, userService) {

            $scope.isMobile = ($window.innerWidth <= 800);
            $scope.expanded = false;

            videosService.getVideoById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        $scope.video = data;
                        $scope.ready = true;

                        // var seasons = $filter('orderBy')(data.series.seasons.seasons, 'seasonNumber');
                        //
                        // $scope.seasons = seasons;
                        // $scope.selectedSeason = seasons[0];
                        // $scope.seasonList = seasons.map(function(season) {
                        //     return {
                        //         label: 'Season ' + season.seasonNumber + ': ' + season.title,
                        //         onClick: function() {
                        //             $scope.selectedSeason = season;
                        //         }
                        //     }
                        // });
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

            $scope.onFavoritePress = function() {
                userService.addFavoriteCelebrity($scope.video.celebrity.id)
                    .then(
                        function onSuccess(data) {
                            console.log(data);
                        }
                    );
            };

            $scope.onWatchlistPress = function() {
                userService.addVideoToWatchlist($scope.video.id)
                    .then(
                        function onSuccess(data) {
                            console.log(data);
                        }
                    );
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());