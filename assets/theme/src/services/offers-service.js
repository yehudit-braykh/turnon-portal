(function() {

    var offersService = [
        '$http',
        'OfferModel',
        'turnonConfig',
        function($http, OfferModel, turnonConfig) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getOfferById: function(id) {
                    return $http.get('api/brands/get_offer?id=' + id)
                        .then(
                            function(data) {
                                return new OfferModel(data.data);
                            }
                        );
                },

                getOfferBySlug: function(slug) {
                    return $http.get(turnonConfig.baseApi + '/offers/slug/' + slug)
                        .then(
                            function(data) {
                                return new OfferModel(data.data);
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('turnon')
        .factory('offersService', offersService);
}());