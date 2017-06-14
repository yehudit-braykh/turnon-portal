(function() {

    var cacheService = [
        '$log',
        'CacheFactory',
        'LZString',
        function($log, CacheFactory, LZString) {

            var apiCache;

            return {
                getCache: function() {
                    if (!CacheFactory) {
                        return;
                    }
                    if (!CacheFactory.get('apiCache')) {
                        CacheFactory.createCache('apiCache', {
                            maxAge: 5 * 60 * 1000, // 5 minutes
                            storageMode: 'localStorage',
                            deleteOnExpire: 'passive',
                            onExpire: function(key, value) {
                                $log.info('Cache key ' + key + ' expired, using stale data while fetching fresh data in the background');
                                apiCache.put(key, value);
                                angular.injector(['ng']).get('$http').get(key)
                                    .then(
                                        function onSuccess(data) {
                                            if (data.data) {
                                                $log.info('Received fresh data for key ' + key + '. Updating cache value.');
                                                apiCache.put(key);
                                            }
                                        }
                                    )
                                    .catch(
                                        function onError(error) {
                                            $log.warn('Error getting fresh data for cache for key ' + key + ': ' + JSON.stringify(error));
                                        }
                                    );
                            },
                            storageImpl: {
                                getItem: function (key) {
                                    return LZString.decompressFromUTF16(localStorage.getItem(key));
                                },
                                setItem: function (key, value) {
                                    try {
                                        localStorage.setItem(key, LZString.compressToUTF16(value));
                                    } catch (e) {
                                        $log.warn('Error setting new cache item: ' + JSON.stringify(e));
                                    }
                                },
                                removeItem: function (key) {
                                    localStorage.removeItem(key);
                                }
                            }
                        });
                    }
                    if (!apiCache) {
                        apiCache = CacheFactory.get('apiCache');
                    }
                    return apiCache;
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('cacheService', cacheService);
}());