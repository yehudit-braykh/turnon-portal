(function() {
    var notifications = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/notifications/view.notifications.html',
            controller: 'AccountNotificationsController'
        }
    };

    angular.module('turnon')
        .directive('clixAccountNotifications', notifications);
}());
