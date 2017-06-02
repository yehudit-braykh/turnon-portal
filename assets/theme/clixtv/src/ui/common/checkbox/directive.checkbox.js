(function() {

    var checkbox = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/checkbox/view.checkbox.html',
            scope: {
                labelText: '@',
                ngModel: '=',
                onCheckboxChange: '&'
            },
            controller: [
                '$scope',
                '$timeout',
                function($scope, $timeout) {

                    $scope.onToggle = function() {

                        $scope.ngModel = !$scope.ngModel;
                        $timeout(function() {
                            if ($scope.onCheckboxChange) {
                                $scope.onCheckboxChange();
                            }
                        });
                    };
                }
            ]
        }
    };

    angular.module('clixtv')
        .directive('clixCheckbox', checkbox);
}());