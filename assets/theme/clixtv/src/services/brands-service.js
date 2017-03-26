(function() {

    var brandsService = [
        '$http',
        'stringUtils',
        function($http, stringUtils) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllBrands: function() {
                    return $http.get('/api/brands/get_brands_array')
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getAllBrandsAndCharities: function() {
                    return $http.get('/api/brands/get_all_brands_and_charities_object')
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getBrandBySlug: function(slug) {

                    /**
                     * @todo - This loops over all brands and picks the matching one, that's not good...
                     */
                    return $http.get('/api/brands/get_brands_array')
                        .then(
                            function onSuccess(data) {
                                var found = data.data.filter(function(brand) {
                                    return slug === stringUtils.getSlugForString(brand.title);
                                });
                                return found[0];
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
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCharityBySlug: function(slug) {

                    /**
                     * @todo - This loops over all brands and picks the matching one, that's not good...
                     */
                    return $http.get('/api/brands/get_charities_array')
                        .then(
                            function onSuccess(data) {
                                var found = data.data.filter(function(charity) {
                                    return slug === stringUtils.getSlugForString(charity.title);
                                });
                                return found[0];
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCharityById: function(id) {
                    return $http.get('/api/brands/get_brand?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data[0];
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getAllOffers: function() {
                    return $http.get('/api/brands/get_offers_array')
                        .then(
                            function(data) {
                                return data.data;
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