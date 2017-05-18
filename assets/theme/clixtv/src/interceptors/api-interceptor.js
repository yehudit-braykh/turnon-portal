(function() {

    var apiInterceptor = [
        'CacheFactory',
        function(CacheFactory) {
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
                apiCache.put(response.config.url, response.data);
                return response;
            };

            service.responseError = function(response) {
                var cacheValue;
                if (response.config.url.indexOf('ui/') !== -1) {
                    return response;
                }
                cacheValue = apiCache.get(response.config.url);
                if (cacheValue) {
                    return {
                        data: cacheValue
                    };
                }
                return response;
            };
        }
    ];

    angular
        .module('clixtv')
        .service('apiInterceptor', apiInterceptor);
}());