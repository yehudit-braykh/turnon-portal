(function() {

    var VideoPermalinkController = [
        '$q',
        '$scope',
        '$rootScope',
        '$timeout',
        '$window',
        '$filter',
        '$stateParams',
        'videosService',
        'celebrityService',
        'userService',
        'catchMediaService',
        'knetikService',
        'clixConfig',
        function($q, $scope, $rootScope, $timeout, $window, $filter, $stateParams, videosService, celebrityService, userService, catchMediaService, knetikService, clixConfig) {

            $scope.isMobile = ($window.innerWidth <= 800);
            $scope.expanded = false;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

            function _resetPageState() {
                if (!$scope.video) {
                    return;
                }
                $scope.isOnWatchlist = userService.isVideoOnWatchlist($scope.video.id);
                $scope.isFavoriteCelebrity = userService.isFavoriteCelebrity($scope.video.celebrity.id);
            }

            function _getNextVideo() {

                // Pull the next video in the series...
                var nextVideos = $scope.series.seasons.seasons[0].episodes.filter(function(episode) {
                    return episode.episodeNumber > $scope.video.episodeNumber;
                });

                if (nextVideos.length > 0) {

                    nextVideos.sort(function(a, b) {
                        return parseInt(a.episodeNumber) - parseInt(b.episodeNumber);
                    });

                    $scope.nextVideo = nextVideos[0];
                    return;
                }

                $scope.nextVideoIsRelated = true;

                // If we're on the last video, pull the first related not from the
                // same series...
                $scope.nextVideo = $scope.relatedVideos.videos.filter(function(episode) {
                    return episode.seriesTitle !== $scope.video.series.title;
                })[0];

                // Otherwise just pull the first in the related list
                if (!$scope.nextVideo) {
                    $scope.nextVideo = $scope.relatedVideos.videos[0];
                }
            }

            $rootScope.$on('video.complete', function() {
                knetikService.viewEpisode($scope.video.id);
                $scope.videoComplete = true;
                $timeout(function() {
                    $scope.$apply();
                });
            });

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetPageState();
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
                _resetPageState();
            });

            $rootScope.$on('favorite.added', _resetPageState);
            $rootScope.$on('favorite.removed', _resetPageState);

            $q.all(
                    [
                        userService.getLoggedInUser(),
                        videosService.getVideoBySlug($stateParams.slug)
                    ]
                )
                .then(
                    function onSuccess(data) {

                        $scope.loggedInUser = data[0];
                        $scope.video = data[1];
                        $scope.ready = true;

                        _resetPageState();

                        return $q.all(
                            [
                                videosService.getRelatedVideos($scope.video.id),
                                videosService.getSeriesById($scope.video.series.id),
                                catchMediaService.getMediaTags($scope.video.id, 'episode')
                            ]
                        );
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.relatedVideos = data[0];
                        $scope.series = data[1];
                        $scope.episodeLiked = data[2][0].tags.like.value;
                        $scope.totalEpisodeLikes = parseInt(data[2][0].tags.like.totals[0].count);
                        _getNextVideo();
                    }
                );


            $scope.onPlayerReady = function(configs) {
                var infoContainerElement = angular.element(document.getElementById('about-video-inner-container')),
                    infoContainerHeight = infoContainerElement.outerHeight(),
                    buttonContainerHeight = angular.element(document.getElementById('toggle-button-container')).outerHeight(),
                    buttonHeight = angular.element(document.getElementById('toggle-button')).outerHeight(),
                    newHeight = (configs.height - buttonContainerHeight - 20);

                if (infoContainerHeight < newHeight || $scope.isMobile) {
                    $scope.forceFullHeight = true;
                    $timeout(function() {
                        $scope.$apply();
                    });
                    infoContainerElement[0].style.height = (newHeight + buttonHeight + 20) + 'px';
                } else {
                    $scope.originalPlayerHeight = newHeight;
                    infoContainerElement[0].style.maxHeight = newHeight + 'px';
                }
            };

            $scope.onExpandToggle = function() {
                var expandedSize = angular.element(document.getElementById('about-video-container')).outerHeight() * 3,
                    infoContainerElement = angular.element(document.getElementById('about-video-inner-container'));
                $scope.expanded = !$scope.expanded;
                infoContainerElement[0].style.maxHeight = ($scope.expanded) ? (expandedSize + 'px') : ($scope.originalPlayerHeight + 'px');

                if ($scope.expanded) {
                    catchMediaService.trackAppEvent('navigation_item', {
                        click_action: 'show_more',
                        target_cm: 'media',
                        target_type: 'episode',
                        target_id: $scope.video.id
                    });
                }
            };

            $scope.onFavoritePress = function() {
                userService.addFavoriteCelebrity($scope.video.celebrity.id)
                    .then(
                        function onSuccess(data) {

                        }
                    );
            };

            $scope.onWatchlistPress = function() {
                if ($scope.isOnWatchlist) {
                    userService.removeVideoFromWatchlist($scope.video.id);
                } else {
                    userService.addVideoToWatchlist($scope.video.id);
                }
            };

            $scope.onFavoriteCelebrityPress = function() {
                if ($scope.isFavoriteCelebrity) {
                    userService.removeFavoriteCelebrity($scope.video.celebrity.id);
                } else {
                    userService.addFavoriteCelebrity($scope.video.celebrity.id);
                }
            };

            $scope.onLikeVideoPress = function() {
                // catchMediaService.trackAppEvent('like', {
                //     target_cm: 'media',
                //     target_type: 'episode',
                //     target_id: $scope.video.id
                // });
                if ($scope.episodeLiked) {
                    catchMediaService.removeEpisodeLike($scope.video.id);
                    $scope.totalEpisodeLikes -= 1;
                    $scope.episodeLiked = false;
                } else {
                    catchMediaService.addEpisodeLike($scope.video.id);
                    $scope.totalEpisodeLikes += 1;
                    $scope.episodeLiked = true;
                }
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());