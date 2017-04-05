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
                            uninterrupedPlayInterval: 5
                        });
                        instance.register();
                    }
                },

                setUserId: function(id) {

                },

                deleteUserId: function() {

                },

                addWatchByVideoId: function(id) {
                    _reportAppEvent('WATCH_VIDEO', { id: id });
                },

                addFavoriteBrandById: function(id) {
                    console.log(id);
                    // instance.reportAppEvent('FAVORITE_BRAND', { id: id })
                }

            }
        }
    ];

    angular
        .module('clixtv')
        .factory('catchMediaService', catchMediaService);
}());