(function() {

    var clixSwitch = function() {
        return {
            restrict: 'AE',
            template: '<switch ng-model="ngModel" class="clix-switch"></switch>',
            scope: {
                ngModel: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSwitch', clixSwitch);
}());