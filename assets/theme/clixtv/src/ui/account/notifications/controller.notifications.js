(function() {

    var AccountNotificationsController = [
        '$scope',
        '$rootScope',
        'userService',
        'notificationsService',
        'clixConfig',
        function($scope, $rootScope, userService, notificationsService, clixConfig) {

            $rootScope.pageTitle = 'Your Notifications - ClixTV';
            $scope.notificationEnabled = clixConfig.notificationEnabled;

            notificationsService.getNotifications()
                .then(
                    function onSuccess(data) {
                        $scope.notifications = data;
                    }
                )
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountNotificationsController', AccountNotificationsController);
}());