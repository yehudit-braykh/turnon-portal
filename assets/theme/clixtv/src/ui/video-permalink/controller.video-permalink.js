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
        function($q, $scope, $rootScope, $timeout, $window, $filter, $stateParams, videosService, celebrityService, userService, catchMediaService) {

            $scope.isMobile = ($window.innerWidth <= 800);
            $scope.expanded = false;

            function _resetPageState() {
                if (!$scope.video) {
                    return;
                }
                $scope.isOnWatchlist = userService.isVideoOnWatchlist($scope.video.id);
                $scope.isFavoriteCelebrity = userService.isFavoriteCelebrity($scope.video.celebrity.id);
            }

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
                        videosService.getVideoById($stateParams.id)
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data[0];
                        $scope.video = data[1];
                        $scope.ready = true;
                        _resetPageState();
                    }
                );

            catchMediaService.trackVideoPageEvent($stateParams.id);

            if ($window.innerWidth <= 1000) {
                $scope.playerHeight = 9999;
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
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());