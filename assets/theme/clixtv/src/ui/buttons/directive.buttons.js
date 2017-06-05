(function() {

    var primaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            controller: 'PrimaryButtonController',
            templateUrl: 'ui/buttons/view.primary-button.html',
            scope: {
                type: '@?',
                circle: '@?',
                loading: '=?'
            }
        }
    };

    var secondaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.secondary-button.html',
            scope: {
                alternate: '@?'
            }
        }
    };

    var tertiaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.tertiary-button.html',
            scope: {
                isActive: '=?'
            }
        }
    };

    var calloutButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.callout-button.html',
            scope: {
                colorType: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixPrimaryButton', primaryButton)
        .directive('clixSecondaryButton', secondaryButton)
        .directive('clixTertiaryButton', tertiaryButton)
        .directive('clixCalloutButton', calloutButton);
}());