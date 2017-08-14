(function() {

    var catchMediaService = [
        '$q',
        '$http',
        '$log',
        function($q, $http, $log) {

            var instance;

            function _reportAppEvent(event, data) {
                if (!instance) {
                    return;
                }
                $log.log('Tracking', '"' + event + '"', 'app event with data', data);
                instance.reportAppEvent(event, data);
            }

            function _reportMediaEvent(id, type, event, data) {
                if (!instance) {
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
                    if (!window.CMSDK) {
                        $log.info('The Catch Media service has not been initialized. No data will be tracked.');
                        return;
                    }
                    if (!instance) {

                        $log.debug('Initializing Catch Media service');

                        /**
                         * @todo - Pull these from a top level config...
                         */
                        instance = new CMSDK({
                            appCode: 'turnon-WEB',
                            partnerId: 3074,
                            appVersion: '1.0.0',
                            allowGeoLocation: false,
                            uninterrupedPlayInterval: 5,
                            idNamespace: 'turnon'
                        });
                        instance.register();
                    }
                },

                setUser: function(email, type, extra) {
                    if (!instance) {
                        return;
                    }
                    instance.setUser(email, type, extra);
                },

                deleteUser: function() {
                    if (!instance) {
                        return;
                    }
                    instance.unsetUser();
                },

                trackVideoPlayerEvent: function(playerInstance) {
                    if (!instance) {
                        return;
                    }
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
                },

                getMediaTags: function(id, type) {
                    var deferred = $q.defer();
                    if (instance) {
                        instance.readAllMediaTags(id, type, function (result) {
                            deferred.resolve(result);
                        });
                    } else {
                        deferred.reject('CatchMedia service unavailable');
                    }
                    return deferred.promise;
                },

                addEpisodeLike: function(id) {
                    if (instance) {
                        instance.createMediaTag(id, 'episode', 'like', 1);
                    }
                },

                removeEpisodeLike: function(id) {
                    if (instance) {
                        instance.deleteMediaTag(id, 'episode', 'like');
                    }
                }
            }
        }
    ];

    angular
        .module('turnon')
        .factory('catchMediaService', catchMediaService);
}());