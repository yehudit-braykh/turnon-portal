(function() {

    var celebrityService = [
        '$http',
        'CelebrityListModel',
        'CelebrityModel',
        'clixConfig',
        function($http, CelebrityListModel, CelebrityModel, clixConfig) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCelebrities: function() {
                    return $http.get('/api/celebrity/get_all_celebrities')
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
                    return $http.get(clixConfig.baseApi + '/stars/slug/' + slug)
                        .then(
                            function onSuccess(data) {
                                return new CelebrityModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getBrandsByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_brands?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCharitiesByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_charities?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getOffersByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_offers?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getSeriesByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_series?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getVideosByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_videos?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('celebrityService', celebrityService);
}());