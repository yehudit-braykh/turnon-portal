(function() {

    var apiInterceptor = [
        '$log',
        'CacheFactory',
        'LZString',
        function($log, CacheFactory, LZString) {
            var apiCache,
                service = this;

            if (!CacheFactory.get('apiCache')) {
                apiCache = CacheFactory('apiCache', {
                    storageMode: 'localStorage'
                });
            }

            service.response = function(response) {
                if (response.config.url.indexOf('ui/') !== -1) {
                    return response;
                }
                try {
                    apiCache.put(response.config.url, LZString.compressToUTF16(JSON.stringify(response.data)));
                } catch (e) {
                    $log.warn('Error putting item in cache', e);
                }
                return response;
            };

            service.responseError = function(response) {
                var cacheValue;
                if (response.config.url.indexOf('ui/') !== -1) {
                    return response;
                }
                try {
                    cacheValue = apiCache.get(response.config.url);
                    if (cacheValue) {
                        return {
                            data: JSON.parse(LZString.decompressFromUTF16(cacheValue))
                        };
                    }
                } catch (e) {
                    $log.warn('Error getting item from cache', e);
                }
                return response;
            };
        }
    ];

    angular
        .module('clixtv')
        .service('apiInterceptor', apiInterceptor);
}());