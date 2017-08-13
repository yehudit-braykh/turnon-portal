turnOnApp.factory("celebritiesFactory", function($http, $q) {
    return {
        getAllCelebrities: function(){
            return $http({method: 'GET', url: 'api/celebrity/get_all_celebrities'}).
                       success(function(data, status, headers, config) {
                           return data;
                       }).
                       error(function(data, status, headers, config) {
                       });
        },
         getCelebrityById: function(celebrityId){
             return $http({method: 'GET', url: 'api/celebrity/get_celebrity/?id='+celebrityId}).
                        success(function(data, status, headers, config) {
                            return data;
                        }).
                        error(function(data, status, headers, config) {
                        });
         }

    }
});
