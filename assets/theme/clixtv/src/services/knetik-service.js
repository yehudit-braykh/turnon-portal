(function() {

    var knetikService = [
        '$http',
        function($http) {
            return {

                getAllBrands: function() {

                    return $http.get('/api/brands/get_all_brands_and_charities_object');
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('knetikService', knetikService);
}());