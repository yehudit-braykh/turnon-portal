(function() {

    var AccountNotificationsController = [
        '$scope',
        '$rootScope',
        'userService',
        'notificationsService',
        function($scope, $rootScope, userService, notificationsService) {

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