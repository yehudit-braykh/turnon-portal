(function() {

    var datepickerDropdowns = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/datepicker/view.datepicker-dropdowns.html',
                controller: 'DatepickerDropdowns',
                scope: {
                    ngModel: '='
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixDatepickerDropdowns', datepickerDropdowns);
}());