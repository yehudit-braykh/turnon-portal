(function() {

    var AccountNotificationsController = [
        '$scope',
        '$rootScope',
        'userService',
        'notificationsService',
        'turnonConfig',
        function($scope, $rootScope, userService, notificationsService, turnonConfig) {

            // $rootScope.pageTitle = 'Your Notifications - turnon';
            // $scope.notificationEnabled = turnonConfig.notificationEnabled;
            //
            // notificationsService.getNotifications()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.notifications = data;
            //         }
            //     )
        }
    ];

    angular
        .module('turnon')
        .controller('AccountNotificationsController', AccountNotificationsController);
}());
