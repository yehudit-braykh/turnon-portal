(function() {

    var analyticsService = [
        '$window',
        '$location',
        '$log',
        function($window, $location, $log) {
            return {
                initialize: function(apiKey) {
                    if (navigator.doNotTrack == 1) {
                        $log.info('Google Analytics has not been initialized. No data will be tracked.');
                        return;
                    }
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.text = '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";\
                 analytics.load("' + apiKey + '");\
            }}();';

                    var firstScript = document.getElementsByTagName('script')[0];
                    firstScript.parentNode.insertBefore(script, firstScript);
                },
                trackPageView: function() {
                    if (!$window.analytics) {
                        return;
                    }
                    $window.analytics.page($location.path());
                },

                identify: function(identityId, params) {
                    if (!$window.analytics) {
                        return;
                    }
                    $window.analytics.identify(identityId, params);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('analyticsService', analyticsService);
}());