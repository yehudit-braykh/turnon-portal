(function() {

    var RadioButtonGroupController = [
        '$scope',
        function($scope) {

            $scope.setSelected = function(index) {
                $scope.selected = index;
                $scope.ngModel = $scope.options[index];
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('RadioButtonGroupController', RadioButtonGroupController);
}());