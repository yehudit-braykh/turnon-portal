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

            function _reportMediaEvent(type, event, data) {
                if (!instance) {
                    $log.warn('Catch Media service has not been initialized yet');
                    return;
                }
                $log.log('Tracking media event with type', '"' + type + '"', ', event', '"' + event + '"', ', and data', data);
                instance.reportMediaEvent(new Date().getTime(), type, event, data);
            }

            function _getEventNameForType(type) {
                switch (type) {
                    case 'categories':
                    case 'category':
                        return '';

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
                        return 'video';
                    });
                },

                trackBrandPageEvent: function(id, tab) {
                    _reportAppEvent('campaign', { id: id, tab: tab });
                },

                trackCelebrityPageEvent: function(id, tab) {
                    _reportAppEvent('person', { id: id, tab: tab });
                },

                trackCharityPageEvent: function(id, tab) {
                    _reportAppEvent('organization', { id: id, tab: tab });
                },

                trackOfferPageEvent: function(id, tab) {
                    _reportAppEvent('offer', { id: id, tab: tab });
                },

                trackVideoPageEvent: function(id, tab) {
                    _reportAppEvent('episode', { id: id, tab: tab });
                },

                trackSearchEvent: function(type, entity) {
                    _reportMediaEvent(_getEventNameForType(type), 'search', {
                        id: entity.id
                    })
                },

                trackShareEvent: function(type, entity) {
                    _reportMediaEvent(_getEventNameForType(type), 'share', {
                        id: entity.id
                    })
                },

                trackFavoriteEvent: function(type, id) {
                    _reportMediaEvent(_getEventNameForType(type), 'favorite', {
                        id: id
                    })
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('catchMediaService', catchMediaService);
}());