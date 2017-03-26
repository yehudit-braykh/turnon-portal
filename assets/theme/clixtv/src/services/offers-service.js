(function() {

    var offersService = [
        '$http',
        'stringUtils',
        function($http, stringUtils) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getOfferById: function(id) {
                    return $http.get('api/brands/get_brand/?id=' + id)
                        .then(
                            function(data) {
                                return data.data[0];
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