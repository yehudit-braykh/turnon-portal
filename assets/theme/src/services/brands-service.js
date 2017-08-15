(function() {

    var brandsService = [
        '$http',
        'stringUtils',
        'BrandListModel',
        'OfferListModel',
        'CharityListModel',
        'BrandModel',
        'CharityModel',
        'cacheService',
        'turnonConfig',
        function($http, stringUtils, BrandListModel, OfferListModel, CharityListModel, BrandModel, CharityModel, cacheService, turnonConfig) {
            return {
                getAllBrands: function(page, size) {
                    return $http.get(turnonConfig.baseApi + '/campaigns?page=' + page + '&page_size=' + size, { cache: cacheService.getCache() })
                        .then(
                            function(data) {
                                return new BrandListModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getBrandById: function(id) {
                    return $http.get('/api/campaigns/get_campaign?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new BrandModel(data.data);
                            }
                        );
                },

                getBrandBySlug: function(slug) {
                    return $http.get(turnonConfig.baseApi + '/brands/slug/' + slug, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new BrandModel(data.data);
                            }
                        );
                },

                getAllCharities: function() {
                    return $http.get('/api/brands/get_charities_array', { cache: cacheService.getCache() })
                        .then(
                            function(data) {
                                return new CharityListModel(data.data);
                            }
                        );
                },

                getCharityBySlug: function(slug) {

                    return $http.get(turnonConfig.baseApi + '/charities/slug/' + slug, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CharityModel(data.data[0]);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCharityById: function(id) {
                    return $http.get('/api/brands/get_charity?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new CharityModel(data.data[0]);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getAllOffers: function(page, size) {
                    return $http.get('/api/brands/get_offers_array?page=' + page + '&page_size=' + size, { cache: cacheService.getCache() })
                        .then(
                            function(data) {
                                return new OfferListModel(data.data);
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('turnon')
        .factory('brandsService', brandsService);
}());
