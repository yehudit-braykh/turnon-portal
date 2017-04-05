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

                addVideoPlayerEvent: function(playerInstance) {
                    instance.setupJwPlayer(playerInstance, function(mediaId) {
                        return 'video';
                    });
                },

                addFavoriteBrandById: function(id) {

                    // instance.reportAppEvent('FAVORITE_BRAND', { id: id })
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('catchMediaService', catchMediaService);
}());