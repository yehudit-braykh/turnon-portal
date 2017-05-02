(function() {

    var DropdownController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.bodyClicked = function(event) {
                $scope.menuVisible = false;
            };

            $scope.triggerClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.$watch('options', function() {
                if (!$scope.options) {
                    return;
                }
                $scope.selected = $scope.placeholderText ? { label: $scope.placeholderText } : $scope.options[0];
                $scope.dropdownOptions = $scope.options.map(function(option) {
                    return {
                        label: option.label,
                        // onClickDefault: option.onClick,
                        onClick: function() {
                            $scope.selected = option;
                            $scope.menuVisible = false;
                            option.onClick(option);
                        }
                    }
                });
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('DropdownController', DropdownController);
}());