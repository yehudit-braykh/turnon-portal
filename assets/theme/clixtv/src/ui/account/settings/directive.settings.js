(function() {
    var settings = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/settings/view.settings.html',
            controller: 'AccountSettingsController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountSettings', settings);
}());