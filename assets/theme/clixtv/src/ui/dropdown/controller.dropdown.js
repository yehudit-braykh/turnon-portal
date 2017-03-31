(function() {

    var DropdownController = [
        '$q',
        '$scope',
        function($q, $scope) {
            $scope.selected = $scope.placeholderText ? { label: $scope.placeholderText } : $scope.options[0];

            $scope.bodyClicked = function(event) {
                $scope.menuVisible = false;
            };

            $scope.triggerClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('DropdownController', DropdownController);
}());