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
                $log.log('Tracking', '"' + event + '"', 'app event with data', data);
                instance.reportAppEvent(event, data);
            }

            function _reportMediaEvent(id, type, event, data) {
                if (!instance) {
                    $log.warn('Catch Media service has not been initialized yet');
                    return;
                }
                $log.log('Tracking media event with type', '"' + type + '"', ', event', '"' + event + '"', ', and data', data);
                instance.reportMediaEvent(id, type, event, data);
            }

            function _getEventNameForType(type) {
                switch (type) {
                    case 'categories':
                    case 'category':
                        return 'category';

                    case 'offers':
                    case 'offer':
                        return 'offer';

                    case 'stars':
                    case 'star':
                        return 'person';

                    case 'campaigns':
                    case 'brands':
                    case 'campaign':
                    case 'brand':
                        return 'campaign';

                    case 'charities':
                    case 'charity':
                        return 'organization';
                }
                return undefined;
            }

            return {

                initialize: function() {
                    if (!instance) {

                        $log.debug('Initializing Catch Media service');

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

                setUser: function(email, type, extra) {
                    instance.setUser(email, type, extra);
                },

                deleteUser: function() {
                    instance.unsetUser();
                },

                trackVideoPlayerEvent: function(playerInstance) {
                    instance.setupJwPlayer(playerInstance, function(mediaId) {
                        return 'episode';
                    });
                },

                trackShareEvent: function(type, entity) {
                    _reportAppEvent('share', {
                        id: entity.id,
                        type: _getEventNameForType(type)
                    });
                },

                trackAppEvent: function(type, data) {
                    _reportAppEvent(type, data);
                },

                trackMediaEvent: function(id, contentType, eventType, data) {
                    _reportMediaEvent(id, contentType, eventType, data);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('catchMediaService', catchMediaService);
}());