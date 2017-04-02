(function() {

    var landingVideoContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/page/landing/view.landing-video-content.html',
            transclude: {
                mainContent: '?mainContent',
                contentDescription: 'contentDescription',
                sidebarTitle: 'sidebarTitle',
                sidebarContent: 'sidebarContent',
                footerContent: 'footerContent',
                shareTooltipContent: '?shareTooltipContent'
            },
            scope: {
                video: '=?',
                charity: '@?',
                onPlayerReady: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixLandingVideoContent', landingVideoContent);
}());