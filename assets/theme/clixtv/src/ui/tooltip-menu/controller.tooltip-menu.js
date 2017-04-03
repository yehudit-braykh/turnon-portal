(function() {

    var TooltipMenuController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.onMouseover = function(item) {
                if (item.icon === 'icon-favorite-icon') {
                    item.icon = 'icon-favorite-icon-filled';
                }
            };

            $scope.onMouseleave = function(item) {
                if (item.icon === 'icon-favorite-icon-filled') {
                    item.icon = 'icon-favorite-icon';
                }
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('TooltipMenuController', TooltipMenuController);
}());