(function() {

    var NotificationsController = [
        '$scope',
        '$rootScope',
        '$timeout',
        '$state',
        'userService',
        'clixConfig',
        function($scope, $rootScope, $timeout, $state, userService, clixConfig) {

            $scope.notificationEnabled = clixConfig.notificationEnabled;

            $scope.items = [
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
                }
            ];

            $scope.onNotificationMenuPress = function(notification) {
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('NotificationsController', NotificationsController);
}());