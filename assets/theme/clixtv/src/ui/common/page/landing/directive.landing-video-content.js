(function() {

    var landingVideoContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/page/landing/view.landing-video-content.html',
            transclude: {
                contentDescription: 'contentDescription',
                sidebarTitle: 'sidebarTitle',
                sidebarContent: 'sidebarContent',
                footerContent: 'footerContent'
            },
            scope: {
                video: '=',
                contentTitle: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixLandingVideoContent', landingVideoContent);
}());