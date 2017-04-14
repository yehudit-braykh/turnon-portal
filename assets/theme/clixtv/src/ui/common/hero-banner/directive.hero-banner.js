(function() {

    var heroBanner = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/hero-banner/view.hero-banner.html',
            controller: 'HeroBannerController',
            transclude: {
                logo: '?heroBannerLogo',
                shareIcon: '?shareIcon',
                favoriteButton: '?favoriteButton'
            },
            scope: {
                titleText: '@',
                buttonText: '@',
                points: '@?',
                subtext: '@?',
                buttonIconClass: '@?',
                backgroundImage: '@',
                backgroundImage2x: '@?',
                backgroundImage3x: '@?',
                charity: '@?',
                shareable: '@?',
                buttonTooltipText: '@?',
                shareTooltipText: '@?',
                bannerType: '@'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixHeroBanner', heroBanner);
}());