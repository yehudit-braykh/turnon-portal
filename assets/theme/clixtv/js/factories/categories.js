clixApp.factory("categoryFactory", function($http, $q, brandsFactory) {
    return {
       getCategories: function() {
           return $http.get('/api/category/get_all_categories').then(function(result) {
               var data = result.data;
               return data;
           }).catch(function(err){

              // for example, "re-throw" to "hide" HTTP specifics
              return $q.reject("Data not available");
             })
        },
        getCategoryByName: function(name) {
            return $http.get('/api/category/get_category_by_name/?category='+name).then(function(result) {
                var data = result.data;
                return data;
            }).catch(function(err){
                console.log('err');
               // for example, "re-throw" to "hide" HTTP specifics
               return $q.reject("Data not available");
              })
         },
        getCategoryVideos: function(name) {
            return $http.get('/api/category/get_category_videos?category='+name).then(function(result) {
                var data = result.data;
                return data;
            }).catch(function(err){
               // for example, "re-throw" to "hide" HTTP specifics
               return $q.reject("Data not available");
              })
         }
     }
});
