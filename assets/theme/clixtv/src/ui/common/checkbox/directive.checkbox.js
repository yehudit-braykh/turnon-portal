(function() {

    var checkbox = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/checkbox/view.checkbox.html',
            scope: {
                labelText: '@'
            },
            link: function(scope) {

                scope.selected = true;

                scope.onToggle = function() {
                    scope.selected = !scope.selected;
                }
            }
        }
    };

    angular.module('clixtv')
        .directive('clixCheckbox', checkbox);
}());