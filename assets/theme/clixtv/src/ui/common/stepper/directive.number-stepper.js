(function() {

    var numberStepper = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/stepper/view.number-stepper.html',
            scope: {

            },
            link: function(scope) {

                var incrementValue = .10;

                scope.currentValue = 17.60;
                scope.priceDisplay = '';

                function _updatePriceDisplay() {
                    var value = scope.currentValue;
                    if (isNaN(value)) {
                        value = 0;
                    }
                    scope.priceDisplay = '$' + value.toFixed(2);
                }

                scope.onMinusPress = function() {
                    scope.currentValue -= incrementValue;
                    _updatePriceDisplay();
                };

                scope.onPlusPress = function() {
                    scope.currentValue += incrementValue;
                    _updatePriceDisplay();
                };

                scope.onPriceChange = function() {
                    scope.currentValue = parseFloat(scope.priceDisplay.replace(/[^0-9.]/g, ''));
                };

                scope.onPriceBlur = function() {
                    _updatePriceDisplay();
                };

                _updatePriceDisplay();
            }
        }
    };

    angular.module('clixtv')
        .directive('clixNumberStepper', numberStepper);
}());