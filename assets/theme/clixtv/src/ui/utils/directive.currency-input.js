(function() {
    var currencyInput = [
        function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(elem, scope, attrs, ngModel) {
                    ngModel.$formatters.push(function(val){
                        return '$' + val
                    });
                    ngModel.$parsers.push(function(val){
                        return val.replace(/[$,]/g, '')
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixCurrencyInput', currencyInput);
}());