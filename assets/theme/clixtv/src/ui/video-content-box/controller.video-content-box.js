(function() {

    var VideoContentBoxController = [
        '$q',
        '$scope',
        '$rootScope',
        '$location',
        '$state',
        'userService',
        'shareModalService',
        function($q, $scope, $rootScope, $location, $state, userService, shareModalService) {

            $scope.menuVisible = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetMenuItems();
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
                _resetMenuItems();
            });

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

                var isFavoriteStar = userService.isFavoriteCelebrity($scope.video.celebrity.id);

                $scope.items = [
                    {
                        label: 'Add to Watchlist',
                        icon: 'icon-redeem-plus-icon',
                        onClick: function() {
                            console.log('SHARE');
                        }
                    },
                    {
                        label: 'Share',
                        icon: 'icon-share-icon',
                        points: '50',
                        onClick: function() {
                            shareModalService.launchVideoShareModal($scope.video);
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
                        }
                    }
                ];
            }

            $scope.menuClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };

            $scope.onImageLoad = function(event) {
                $scope.ready = true;
                if ($scope.onContentLoad) {
                    $scope.onContentLoad();
                }
            };

            $scope.go = function(path) {
                $location.path(path);
            };

            $scope.onPlayPress = function($event, video) {

                // Safari has a problem with the ng-click element within the active element, so we'll
                // just capture the click event of the overlay container and determine what to do from
                // here.
                var isSaving = angular.element($event.target).parent().hasClass('save-button');
                if (!isSaving) {
                    $state.go('video', { id: video.id });
                }
            };

            $scope.onSaveButtonPress = function() {
                console.log('SAVE');
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoContentBoxController', VideoContentBoxController);
}());