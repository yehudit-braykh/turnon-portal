(function() {

    var printablePage = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/printable/view.printable-page.html',
                transclude: true
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixPrintablePage', printablePage);
}());