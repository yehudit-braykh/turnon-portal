(function() {

    var brandLogo = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/logos/view.brand-logo.html',
            scope: {
                brand: '=',
                minimized: '@?'
            }
        }
    };

    var charityLogo = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/logos/view.charity-logo.html',
            scope: {
                charity: '=',
                minimized: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixBrandAssetLogo', brandLogo)
        .directive('clixCharityAssetLogo', charityLogo);
}());