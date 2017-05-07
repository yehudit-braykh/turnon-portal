(function() {

    var AccountSettingsController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {

            $scope.ready = false;
            userService.getAccountSettings()
                .then(
                    function onSuccess(data) {
                        $scope.settings = data;
                        $scope.generalSettings = data.settings.filter(function(setting) {
                            return setting.type === 'general';
                        });
                        $scope.accountSettings = data.settings.filter(function(setting) {
                            return setting.type === 'myClix';
                        });
                        $scope.ready = true;
                    }
                );

            $scope.settingChange = function(setting) {
                if (setting.enabled) {
                    userService.enableAccountSetting(setting.id);
                } else {
                    userService.disableAccountSetting(setting.id);
                }
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountSettingsController', AccountSettingsController);
}());