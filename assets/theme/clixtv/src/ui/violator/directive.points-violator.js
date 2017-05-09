(function() {
    var pointsViolator = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/violator/view.points-violator.html',
            controller: 'PointsViolatorController',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixPointsViolator', pointsViolator);
}());