(function() {

    var DropdownController = [
        '$q',
        '$scope',
        function($q, $scope) {
            $scope.selected = $scope.options[0];
            // console.log($scope.selected);

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