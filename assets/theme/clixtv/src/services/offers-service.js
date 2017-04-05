(function() {

    var offersService = [
        '$http',
        'OfferModel',
        function($http, OfferModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getOfferById: function(id) {
                    return $http.get('api/brands/get_offer?id=' + id)
                        .then(
                            function(data) {
                                return new OfferModel(data.data[0]);
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('offersService', offersService);
}());