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
                        console.log(data);
                        $scope.loggedInUser = data[0];
                        $scope.video = data[1];
                        $scope.ready = true;
                        _resetPageState();
                    }
                );

            catchMediaService.trackVideoPageEvent($stateParams.id);

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
                var expandedSize = angular.element(document.getElementById('about-video-container')).outerHeight(),
                    infoContainerElement = angular.element(document.getElementById('about-video-inner-container'));
                $scope.expanded = !$scope.expanded;
                infoContainerElement[0].style.maxHeight = ($scope.expanded) ? (expandedSize + 'px') : ($scope.originalPlayerHeight + 'px');
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