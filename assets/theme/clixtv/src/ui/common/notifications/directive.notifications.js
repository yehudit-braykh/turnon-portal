(function() {
    var notifications = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.notifications.html',
            scope: {
                notifications: '='
            }
        }
    };

    var notificationItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.notification-item.html',
            controller: 'NotificationsController',
            scope: {
                notification: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixNotifications', notifications)
        .directive('clixNotificationItem', notificationItem);
}());