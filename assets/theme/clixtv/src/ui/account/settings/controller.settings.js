(function() {

    var AccountSettingsController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {
            $scope.generalSettings = [
                {
                    label: 'Offers Updates',
                    description: 'Get the latest brand updates on ClixTV',
                    value: true
                },
                {
                    label: 'Video Updates',
                    description: 'Get notified when new videos are added to ClixTV',
                    value: true
                },
                {
                    label: 'Charity Updates',
                    description: 'Get notified when new charities are added to ClixTV',
                    value: true
                }
            ];
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountSettingsController', AccountSettingsController);
}());