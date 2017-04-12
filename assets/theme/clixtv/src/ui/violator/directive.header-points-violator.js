(function() {
    var headerPointsViolator = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/violator/view.header-points-violator.html',
            scope: {
                points: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixHeaderPointsViolator', headerPointsViolator);
}());