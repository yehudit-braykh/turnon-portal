peruDigitalApp.factory("subscriptionsFactory", function($http, $q) {
    return {
        getAllPlans: function(){
            return $http({method: 'GET', url: '/api/account/get_subscriptions'}).
                       success(function(data, status, headers, config) {
                           return data.entries;
                       }).
                       error(function(data, status, headers, config) {
                       });
        },


    }
});
