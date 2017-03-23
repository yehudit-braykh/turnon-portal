(function() {

    var viewButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/buttons/view.view-button.html'
        }
    };

    angular.module('clixtv')
        .directive('clixViewButton', viewButton);
}());