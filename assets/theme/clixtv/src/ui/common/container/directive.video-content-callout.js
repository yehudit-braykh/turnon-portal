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

    var videoContentCalloutList = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/container/view.video-content-callout-list.html',
            scope: {
                videos: '=',
                gridClasses: '@?',
                order: '@'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoContentCallout', videoContentCallout)
        .directive('clixVideoContentCalloutList', videoContentCalloutList);
}());