(function() {

    var radioButtonGroup = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/radio-buttons/view.radio-button-group.html',
                controller: 'RadioButtonGroupController',
                scope: {
                    ngModel: '=',
                    options: '='
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixRadioButtonGroup', radioButtonGroup);
}());