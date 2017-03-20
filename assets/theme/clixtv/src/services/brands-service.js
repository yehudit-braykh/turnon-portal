(function() {

    var brandsService = [
        '$http',
        function($http) {
            return {

                getAllBrands: function() {

                    /**
                     * @todo - Cache this call
                     */
                    return $http.get('/api/brands/get_all_brands_and_charities_object');
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('brandsService', brandsService);
}());