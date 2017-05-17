(function() {

    var brandLogo = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/logos/view.brand-logo.html',
            scope: {
                brand: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixBrandLogo', brandLogo);
}());