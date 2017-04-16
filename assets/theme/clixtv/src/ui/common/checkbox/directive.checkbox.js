(function() {

    var checkbox = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/checkbox/view.checkbox.html',
            scope: {
                labelText: '@',
                ngModel: '='
            },
            link: function(scope) {

                scope.onToggle = function() {
                    scope.ngModel = !scope.ngModel;
                }
            }
        }
    };

    angular.module('clixtv')
        .directive('clixCheckbox', checkbox);
}());