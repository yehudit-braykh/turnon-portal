(function() {

    var VideoContentCalloutController = [
        '$q',
        '$scope',
        '$rootScope',
        '$element',
        '$window',
        '$timeout',
        '$state',
        'userService',
        'shareModalService',
        'clixConfig',
        'modalService',
        function($q, $scope, $rootScope, $element, $window, $timeout, $state, userService, shareModalService, clixConfig, modalService) {

            $scope.menuVisible = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetMenuItems();
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
                _resetMenuItems();
            });

            $rootScope.$on('tooltip.open', function() {
                $scope.tooltipOpen = true;
            });

            $rootScope.$on('tooltip.closed', function() {
                $scope.tooltipOpen = false;
                $scope.overlayActive = false;
            });

            // $rootScope.$on('thumbnail.resize', function() {
            //     _recalculateAspectRatio();
            // });

            $rootScope.$on('favorite.added', _resetMenuItems);
            $rootScope.$on('favorite.removed', _resetMenuItems);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetMenuItems();
                    }
                );

            function _resetMenuItems() {

                $scope.isOnWatchlist = userService.isVideoOnWatchlist($scope.video.id);

                if ($scope.loggedInUser) {
                    $scope.videoUnavailable = false;
                } else if ($scope.video.episodeNumber && parseInt($scope.video.episodeNumber) > clixConfig.lockedMinimumEpisodeNumber) {
                    $scope.videoUnavailable = true;
                }

                var isFavoriteStar = ($scope.video.celebrity) ? userService.isFavoriteCelebrity($scope.video.celebrity.id) : false;

                $scope.items = [
                    {
                        label: $scope.isOnWatchlist ? 'Remove from watchlist' : 'Add to watchlist',
                        icon: $scope.isOnWatchlist ? 'icon-remove-icon' : 'icon-redeem-plus-icon',
                        onClick: function() {
                            if ($scope.isOnWatchlist) {
                                userService.removeVideoFromWatchlist($scope.video.id);
                            } else {
                                userService.addVideoToWatchlist($scope.video.id);
                            }
                            $scope.menuVisible = false;
                        }
                    },
                    {
                        label: 'Share',
                        icon: 'icon-share-icon',
                        points: '50',
                        onClick: function() {
                            shareModalService.launchVideoShareModal($scope.video);
                            $scope.menuVisible = false;
                        }
                    },
                    {
                        label: 'Go to Star Page',
                        icon: 'icon-stars-icon',
                        onClick: function() {
                            $state.go('star', { id: $scope.video.celebrity.id })
                        }
                    },
                    {
                        label: isFavoriteStar ? 'Remove Star from Favorites' : 'Add Star to Favorites',
                        icon: isFavoriteStar ? 'icon-remove-icon' : 'icon-favorite-icon',
                        onClick: function() {
                            if (isFavoriteStar) {
                                userService.removeFavoriteCelebrity($scope.video.celebrity.id);
                            } else {
                                userService.addFavoriteCelebrity($scope.video.celebrity.id);
                            }
                            $scope.menuVisible = false;
                        }
                    }
                ];
            }

            // function _recalculateAspectRatio() {
            //     var ASPECT_RATIO = 1.78,
            //         width = $element.find('.clix-video-content-callout').outerWidth();
            //
            //     $scope.containerHeight = (width * ASPECT_RATIO) + 'px';
            //
            //     // $timeout(function() {
            //     //     $scope.$apply();
            //     // });
            // }

            $scope.menuClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };

            $scope.onWatchlistPress = function() {
                if ($scope.isOnWatchlist) {
                    userService.removeVideoFromWatchlist($scope.video.id);
                } else {
                    userService.addVideoToWatchlist($scope.video.id);
                }
            };

            $scope.onMouseover = function() {
                if (!$scope.overlayActive) {
                    $scope.overlayActive = true;
                }
            };

            $scope.onMouseleave = function() {
                if (!$scope.tooltipOpen) {
                    $scope.overlayActive = false;
                }
            };

            $scope.onClick = function($event) {
                if (!angular.element($event.target).hasClass('video-watchlist-button')) {
                    $state.go('video', { id: $scope.video.id });
                }
            };

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

            $scope.onLoginPress = function() {
                modalService.showLogInModal();
            };

            $scope.onImageLoad = function(event) {
                $scope.ready = true;
            };

            // angular.element($window).on('resize.doResize', function () {
            //     _recalculateAspectRatio();
            // });

            // $scope.$watch(function() {
            //     _recalculateAspectRatio();
            // });

            // $timeout(function() {
            //     _recalculateAspectRatio();
            // });



            // console.log($element.outerWidth())
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoContentCalloutController', VideoContentCalloutController);
}());