(function() {

    var apiInterceptor = [
        '$log',
        'cacheService',
        function($log, cacheService) {

            this.request = function(config) {
                if (config.url.startsWith('ui/')) {
                    return config;
                }

                // The cache factory retires data if the TTL has expired, so we'll
                // "ping" the cache key to trigger a fresh batch in the background
                // if the endpoint calls for it.
                var cache = cacheService.getCache();
                if (cache) {
                    cache.get(config.url);
                }
                return config;
            };
        }
    ];

    angular
        .module('clixtv')
        .service('apiInterceptor', apiInterceptor);
}());