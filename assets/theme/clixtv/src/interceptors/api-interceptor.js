(function() {

    var apiInterceptor = [
        '$log',
        'CacheFactory',
        function($log, CacheFactory) {
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
                    apiCache.put(response.config.url, btoa(JSON.stringify(response.data)));
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
                            data: JSON.parse(atob(cacheValue))
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