(function() {
    var violator = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/violator/view.violator.html',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixViolator', violator);
}());