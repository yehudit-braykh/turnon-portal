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
            };

            $scope.options = $scope.options.map(function(option) {
                return {
                    label: option.label,
                    // onClickDefault: option.onClick,
                    onClick: function() {
                        $scope.selected = option;
                        $scope.menuVisible = false;
                        option.onClick();
                    }
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('DropdownController', DropdownController);
}());