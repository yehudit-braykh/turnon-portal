(function() {
    var settings = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/settings/view.settings.html',
            controller: 'AccountSettingsController'
        }
    };

    angular.module('turnon')
        .directive('clixAccountSettings', settings);
}());
