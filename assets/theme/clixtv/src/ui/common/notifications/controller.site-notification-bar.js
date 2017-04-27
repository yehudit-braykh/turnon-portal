(function() {

    var HIDE_NOTIFICATION_BAR_DELAY = 3000;

    var SiteNotificationBarController = [
        '$scope',
        '$rootScope',
        '$timeout',
        function($scope, $rootScope, $timeout) {

            var displayTimeout,
                modalIsOpen = false,
                waitUntilModalCloses = false;

            function _showNotificationBar() {

                $scope.active = true;
                displayTimeout = $timeout(_hideNotificationBar, HIDE_NOTIFICATION_BAR_DELAY);
            }

            function _hideNotificationBar() {
                $scope.active = false;
            }

            function _onFavoriteUpdateNotification(isFavorite, data) {
                $scope.type = data.type;
                $scope.favorite = isFavorite;
                $scope.data = data;
                $scope.receivedPoints = false;

                switch (data.type) {
                    case 'celebrity':
                        $scope.type = 'favorite';
                        $scope.tab = 'star';
                        break;
                    case 'brand':
                        $scope.type = 'favorite';
                        $scope.tab = 'brand';
                        break;
                    case 'category':
                        $scope.type = 'favorite';
                        $scope.tab = 'category';
                        break;
                    case 'charity':
                        $scope.type = 'favorite';
                        $scope.tab = 'charity';
                        break;
                    case 'watchlist':
                        $scope.type = 'watchlist';
                        break;
                    case 'offer':
                        $scope.type = 'offer';
                        if (isFavorite) {
                            $scope.receivedPoints = true;
                        }
                        break;
                }


                $timeout(function() {
                    if (modalIsOpen) {
                        waitUntilModalCloses = true;
                        return;
                    }
                    waitUntilModalCloses = false;
                    _showNotificationBar();
                }, 250);
            }

            $scope.onMouseover = function() {
                if (displayTimeout) {
                    $timeout.cancel(displayTimeout);
                }
            };

            $scope.onMouseleave = function() {
                displayTimeout = $timeout(_hideNotificationBar, HIDE_NOTIFICATION_BAR_DELAY);
            };

            $rootScope.$on('favorite.added', function(event, data) {
                _onFavoriteUpdateNotification(true, data);
            });

            $rootScope.$on('favorite.removed', function(event, data) {
                _onFavoriteUpdateNotification(false, data);
            });

            $rootScope.$on('modal.open', function() {
                modalIsOpen = true;
            });

            $rootScope.$on('modal.close', function(event, data) {
                modalIsOpen = false;
                if (waitUntilModalCloses) {
                    waitUntilModalCloses = false;
                    _showNotificationBar();
                }
            });

            $rootScope.$on('$stateChangeSuccess', function() {
                modalIsOpen = false;
                waitUntilModalCloses = false;
                _hideNotificationBar();
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('SiteNotificationBarController', SiteNotificationBarController);
}());