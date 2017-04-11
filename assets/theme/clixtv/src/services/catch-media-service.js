(function() {

    var catchMediaService = [
        '$http',
        '$log',
        function($http, $log) {

            var instance;

            function _reportAppEvent(event, data) {
                if (!instance) {
                    $log.warn('Catch Media service has not been initialized yet');
                    return;
                }
                $log.log('Tracking', '"' + event + '"', 'event with data', data);
                instance.reportAppEvent(event, data);
            }

            return {

                initialize: function() {
                    if (!instance) {

                        /**
                         * @todo - Pull these from a top level config...
                         */
                        instance = new CMSDK({
                            appCode: 'CLIXTV-WEB',
                            partnerId: 3074,
                            appVersion: '1.0.0',
                            allowGeoLocation: false,
                            uninterrupedPlayInterval: 5,
                            idNamespace: 'clixtv'
                        });
                        instance.register();
                    }
                },

                setUserId: function(id) {

                },

                deleteUserId: function() {

                },

                trackVideoPlayerEvent: function(playerInstance) {
                    instance.setupJwPlayer(playerInstance, function(mediaId) {
                        return 'video';
                    });
                },

                trackBrandPageEvent: function(id) {
                    _reportAppEvent('campaign', { id: id });
                },

                trackCelebrityPageEvent: function(id) {
                    _reportAppEvent('person', { id: id });
                },

                trackCharityPageEvent: function(id) {
                    _reportAppEvent('organization', { id: id });
                },

                trackOfferPageEvent: function(id) {
                    _reportAppEvent('offer', { id: id });
                },

                trackVideoPageEvent: function(id) {
                    _reportAppEvent('episode', { id: id });
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('catchMediaService', catchMediaService);
}());