(function() {
    var secondaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.secondary-button.html',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixSecondaryButton', secondaryButton);
}());