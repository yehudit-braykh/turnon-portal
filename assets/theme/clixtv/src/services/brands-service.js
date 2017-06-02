(function() {

    var brandsService = [
        '$http',
        'stringUtils',
        'BrandListModel',
        'OfferListModel',
        'CharityListModel',
        'BrandModel',
        'CharityModel',
        'clixConfig',
        function($http, stringUtils, BrandListModel, OfferListModel, CharityListModel, BrandModel, CharityModel, clixConfig) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllBrands: function(page, size) {
                    return $http.get('/api/campaigns?page=' + page + '&page_size=' + size)
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
                    return $http.get('/api/campaigns/get_campaign_by_id?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new BrandModel(data.data);
                            }
                        );
                },

                getBrandBySlug: function(slug) {
                    return $http.get(clixConfig.baseApi + '/brands/slug/' + slug)
                        .then(
                            function onSuccess(data) {
                                return new BrandModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getAllCharities: function() {
                    return $http.get('/api/brands/get_charities_array')
                        .then(
                            function(data) {
                                return new CharityListModel(data.data);
                            }
                        );
                },

                getCharityBySlug: function(slug) {

                    return $http.get(clixConfig.baseApi + '/charities/slug/' + slug)
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
                    return $http.get('/api/brands/get_offers_array?page=' + page + '&page_size=' + size)
                        .then(
                            function(data) {
                                return new OfferListModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getOffersByBrandId: function(id) {
                    return $http.get('/api/brands/get_brand_offers/?id=' + id)
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getVideosByBrandId: function(id) {
                    return $http.get('/api/brands/get_brand_videos/?id=' + id)
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCelebritiesByBrandId: function(id) {
                    return $http.get('/api/brands/get_brand_celebs/?id=' + id)
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('brandsService', brandsService);
}());