(function() {

    var analyticsService = [
        '$window',
        '$location',
        '$rootScope',
        '$log',
        '$state',
        'clixConfig',
        function($window, $location, $rootScope, $log, $state, clixConfig) {
            return {
                initialize: function(apiKey) {
                    if (navigator.doNotTrack == 1) {
                        $log.info('Segment has not been initialized. No data will be tracked.');
                        return;
                    }
                    if (clixConfig.environment !== 'prod') {
                        $log.info('Analytics not sent unless production environment is set. No data will be tracked.');
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
                trackPageView: function(event, to, toParams, from, fromParams) {
                    if (!$window.analytics) {
                        return;
                    }

                    var path = $location.path(),
                        querystring = '',
                        referrer = '';

                    if (path.indexOf('?') !== -1) {
                        querystring = path.substring(path.indexOf('?'), path.length);
                    }

                    if (from.name) {
                        referrer = $state.href(from.name, fromParams, {absolute: true});
                    }

                    $window.analytics.page({
                        path: path,
                        referrer: referrer,
                        search: querystring,
                        url: $location.absUrl(),
                        title: 'turnon - Your Stars. Their Passions.'
                    });
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
        .module('turnon')
        .factory('analyticsService', analyticsService);
}());