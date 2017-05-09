(function() {

    var PointsViolatorController = [
        '$scope',
        'clixConfig',
        function($scope, clixConfig) {
            $scope.pointsEnabled = clixConfig.pointsEnabled;
        }
    ];

    angular
        .module('clixtv')
        .controller('PointsViolatorController', PointsViolatorController);
}());