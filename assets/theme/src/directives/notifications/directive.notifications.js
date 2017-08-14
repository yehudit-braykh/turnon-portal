(function() {
    var notifications = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.notifications.html',
            scope: {
                notifications: '=',
                minify: '@?'
            }
        }
    };

    var notificationItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.notification-item.html',
            controller: 'NotificationsController',
            scope: {
                notification: '=',
                minify: '@?'
            }
        }
    };

    var notificationTooltip = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.notification-tooltip.html',
            scope: {
                notifications: '='
            }
        }
    };

    angular.module('turnon')
        .directive('clixNotifications', notifications)
        .directive('clixNotificationItem', notificationItem)
        .directive('clixNotificationTooltip', notificationTooltip);
}());