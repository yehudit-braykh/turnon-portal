(function() {

    var AccountSettingsController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        'clixConfig',
        'educationModalService',
        function($q, $scope, $rootScope, userService, clixConfig, educationModalService) {

            // $rootScope.pageTitle = 'Your Account Settings - turnon';
            // $scope.notificationEnabled = clixConfig.notificationEnabled;
            //
            // if (!clixConfig.notificationEnabled) {
            //     educationModalService.showNotificationsComingSoonModal();
            // }
            //
            // $scope.ready = false;
            //
            // var userSaving = false;
            //
            // function _saveUser() {
            //     if (userSaving) {
            //         return;
            //     }
            //     userSaving = true;
            //     userService.updateUser($scope.loggedInUser)
            //         .finally(
            //             function onFinally() {
            //                 userSaving = false;
            //             }
            //         )
            // }
            //
            // $q.all(
            //         [
            //             userService.getLoggedInUser(),
            //             userService.getAccountSettings()
            //         ]
            //     )
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data[0];
            //             $scope.settings = data[1];
            //             $scope.generalSettings = data[1].settings.filter(function(setting) {
            //                 return setting.type === 'general';
            //             });
            //             $scope.accountSettings = data[1].settings.filter(function(setting) {
            //                 return setting.type === 'myClix';
            //             });
            //             $scope.enableEmailNotifications = ($scope.loggedInUser.enableEmailNotifications !== false);
            //             $scope.enableTextNotifications = ($scope.loggedInUser.enableTextNotifications !== false);
            //             $scope.enablePushNotifications = ($scope.loggedInUser.enablePushNotifications !== false);
            //             $scope.ready = true;
            //         }
            //     );
            //
            // $scope.$watch('enableEmailNotifications', function(newValue) {
            //     if ($scope.loggedInUser.enableEmailNotifications !== newValue) {
            //         $scope.loggedInUser.enableEmailNotifications = newValue;
            //         _saveUser();
            //     }
            // });
            //
            // $scope.$watch('enableTextNotifications', function(newValue) {
            //     if ($scope.loggedInUser.enableTextNotifications !== newValue) {
            //         $scope.loggedInUser.enableTextNotifications = newValue;
            //         _saveUser();
            //     }
            // });
            //
            // $scope.$watch('enablePushNotifications', function(newValue) {
            //     if ($scope.loggedInUser.enablePushNotifications !== newValue) {
            //         $scope.loggedInUser.enablePushNotifications = newValue;
            //         _saveUser();
            //     }
            // });
            //
            // $scope.onSaveField = function() {
            //     _saveUser();
            // };
            //
            // $scope.settingChange = function(setting) {
            //     if (setting.enabled) {
            //         userService.enableAccountSetting(setting.id);
            //     } else {
            //         userService.disableAccountSetting(setting.id);
            //     }
            // };
        }
    ];

    angular
        .module('turnon')
        .controller('AccountSettingsController', AccountSettingsController);
}());
