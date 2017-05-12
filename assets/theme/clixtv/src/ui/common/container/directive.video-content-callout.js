(function() {

    var videoContentCallout = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/container/view.video-content-callout.html',
            controller: 'VideoContentCalloutController',
            scope: {
                video: '=',
                minimized: '@'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoContentCallout', videoContentCallout);
}());