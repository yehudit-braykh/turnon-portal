(function() {
    var brandCharityLogo = function() {
        return {
            restrict: 'AE',
            controller: 'BrandCharityLogoController',
            replace: true,
            templateUrl: 'ui/common/brand-charity-logo/view.brand-charity-logo.html',
            scope: {
                brand: '='
            }
        }
    };

    var offerLogo = function() {
        return {
            restrict: 'AE',
            controller: 'OfferLogoController',
            replace: true,
            templateUrl: 'ui/common/brand-charity-logo/view.offer-logo.html',
            scope: {
                offer: '='
            }
        }
    };

    var charityLogo = function() {
        return {
            restrict: 'AE',
            controller: 'CharityLogoController',
            replace: true,
            templateUrl: 'ui/common/brand-charity-logo/view.charity-logo.html',
            scope: {
                charity: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixBrandCharityLogo', brandCharityLogo)
        .directive('clixOfferLogo', offerLogo)
        .directive('clixCharityLogo', charityLogo);
}());