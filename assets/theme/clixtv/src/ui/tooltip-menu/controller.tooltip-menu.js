(function() {

    var TooltipMenuController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.onMouseover = function(item) {

            };

            $scope.onMouseleave = function(item) {

            };

        }
    ];

    angular
        .module('clixtv')
        .controller('TooltipMenuController', TooltipMenuController);
}());