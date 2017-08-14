(function() {
    var siteNotificationBar = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.site-notification-bar.html',
            controller: 'SiteNotificationBarController'
        }
    };

    angular.module('turnon')
        .directive('clixSiteNotificationBar', siteNotificationBar);
}());