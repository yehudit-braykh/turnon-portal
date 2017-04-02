(function() {

    var VideoContentBoxController = [
        '$q',
        '$scope',
        '$rootScope',
        '$location',
        '$state',
        'userService',
        function($q, $scope, $rootScope, $location, $state, userService) {

            $scope.menuVisible = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                    }
                );

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
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Star Page',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add Star to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

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
                    $state.go('video', { id: video._id });
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