peruDigitalApp.factory("brandsFactory", function($http, $q) {
    return {
        getAllBrands: function() {
            return $http({method: 'GET', url: '/api/brands/get_brands'}).
                       success(function(data, status, headers, config) {
                           return data;
                       }).
                       error(function(data, status, headers, config) {
                       });
         },
    };
});
