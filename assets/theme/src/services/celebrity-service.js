(function() {

    var celebrityService = [
        '$q',
        '$http',
        'CacheFactory',
        'CelebrityListModel',
        'CelebrityModel',
        'cacheService',
        'turnonConfig',
        function($q, $http, CacheFactory, CelebrityListModel, CelebrityModel, cacheService, turnonConfig) {

            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCelebrities: function() {
                    return $http.get(turnonConfig.baseApi + '/celebrity/get_all_celebrities', { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CelebrityListModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCelebrityById: function(id) {
                    return $http.get('/api/celebrity/get_celebrity?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new CelebrityModel(data.data);
                            }
                        );
                },

                getCelebrityBySlug: function(slug) {
                    return $http.get(turnonConfig.baseApi + '/stars/slug/' + slug, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CelebrityModel(data.data);
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('turnon')
        .factory('celebrityService', celebrityService);
}());