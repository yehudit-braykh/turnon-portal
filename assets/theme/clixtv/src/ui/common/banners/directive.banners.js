(function() {

    var homePageBanner = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/banners/view.home-page-banner.html',
            controller: 'HomePageBannerController',
            scope: {}
        }
    };

    var landingPageBanner = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/banners/view.landing-page-banner.html',
            controller: 'LandingPageBannerController',
            scope: {
                backgroundImage: '@',
                mobileBackgroundImage: '@?'
            },
            transclude: {
                bannerType: 'bannerType',
                bannerTitle: 'bannerTitle',
                bannerSubTitle: 'bannerSubTitle',
                bannerLogoContainer: 'bannerLogoContainer',
                bannerButtonContainer: 'bannerButtonContainer',
                bannerShareButtonContainer: '?bannerShareButtonContainer'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixHomePageBanner', homePageBanner)
        .directive('clixLandingPageBanner', landingPageBanner);
}());