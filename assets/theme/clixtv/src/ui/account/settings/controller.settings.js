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

            $scope.accountSettings = [
                {
                    label: 'Recommended Videos',
                    description: 'ClixTV videos we think you\'ll like',
                    value: true
                },
                {
                    label: 'Video Category Updates',
                    description: 'A favorite video category of yours is updated',
                    value: true
                },
                {
                    label: 'Star Updates',
                    description: 'A favorite star of yours is updated',
                    value: true
                },
                {
                    label: 'Brand Updates',
                    description: 'A favorite brand of yours is updated',
                    value: true
                },
                {
                    label: 'Charity Updates',
                    description: 'A favorite charity of yours is updated',
                    value: true
                }
            ];

            $scope.notifications = [
                {
                    label: 'Send Notifications',
                    description: 'How we will keep you Up-To-Date'
                }
            ]
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountSettingsController', AccountSettingsController);
}());