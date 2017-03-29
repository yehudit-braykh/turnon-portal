(function() {

    var heroBanner = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/hero-banner/view.hero-banner.html',
            controller: 'HeroBannerController',
            transclude: {
                logo: '?heroBannerLogo'
            },
            scope: {
                titleText: '@',
                buttonText: '@',
                points: '@?',
                subtext: '@?',
                buttonIconClass: '@?',
                backgroundImage: '@',
                backgroundImage2x: '@?',
                charity: '@?',
                shareable: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixHeroBanner', heroBanner);
}());