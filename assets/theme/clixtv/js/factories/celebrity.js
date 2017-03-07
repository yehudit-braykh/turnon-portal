clixApp.factory("celebrityFactory", function($http, $q, brandsFactory) {
    return {
        getAllCelebrities: function() {
            return $http.get('/api/celebrity/get_all_celebrities/').then(function(result) {
                return result.data;
            }).catch(function(err){
               // for example, "re-throw" to "hide" HTTP specifics
               return $q.reject("Data not available");
              })
         },
       getCelebrity: function(celebId) {
           return $http.get('/api/celebrity/get_celebrity/?id='+celebId).then(function(result) {
               return result.data[0];

           }).catch(function(err){
              // for example, "re-throw" to "hide" HTTP specifics
              return $q.reject("Data not available");
             })
        },
        getCelebrityBrands: function(celebId) {
            return $http.get('/api/celebrity/get_celeb_brands/?id='+celebId).then(function(result) {
                return result.data;

            }).catch(function(err){
               // for example, "re-throw" to "hide" HTTP specifics
               return $q.reject("Data not available");
              })
         },
         getCelebrityVideos: function(celebId) {
             return $http.get('/api/celebrity/get_celeb_videos/?id='+celebId).then(function(result) {
                 return result.data;

             }).catch(function(err){
                // for example, "re-throw" to "hide" HTTP specifics
                return $q.reject("Data not available");
               })
          },
          getCelebrityOffers: function(celebId) {
              return $http.get('/api/celebrity/get_celeb_offers/?id='+celebId).then(function(result) {
                  return result.data;

              }).catch(function(err){
                 // for example, "re-throw" to "hide" HTTP specifics
                 return $q.reject("Data not available");
                })
           },
           getCelebrityCharities: function(celebId) {
               return $http.get('/api/celebrity/get_celeb_charities/?id='+celebId).then(function(result) {
                   return result.data;

               }).catch(function(err){
                  // for example, "re-throw" to "hide" HTTP specifics
                  return $q.reject("Data not available");
                 })
            },
           getCelebritySeries: function(celebId) {
               return $http.get('/api/celebrity/get_celeb_series/?id='+celebId).then(function(result) {
                   return result.data;

               }).catch(function(err){
                  // for example, "re-throw" to "hide" HTTP specifics
                  return $q.reject("Data not available");
                 })
            }
     }
});
