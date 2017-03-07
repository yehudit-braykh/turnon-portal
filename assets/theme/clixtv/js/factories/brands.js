clixApp.factory("brandsFactory", function($http, $q, cacheFactory) {
    return {
       getAllBrands: function() {

            var deferred=$q.defer();
            $http({method:'GET',url:'/api/brands/get_brands_array'
                 }).success(function(data,status,headers,config){
                     deferred.resolve(data);
             }).error(function(data,status,headers,config){})
            return deferred.promise;
        },
        getAllOffers: function() {

             var deferred=$q.defer();
             $http({method:'GET',url:'/api/brands/get_offers_array'
                  }).success(function(data,status,headers,config){
                      deferred.resolve(data);
              }).error(function(data,status,headers,config){})
             return deferred.promise;
         },
        getBrandsObject: function() {
            var deferred=cacheFactory.defer("brands");
            var cache=cacheFactory.get("brands","object");
            if(cache){deferred.resolve(cache);
            }else if(!deferred.cache){
                $http({method:'GET',url:'/api/brands/get_brands_object'
                     }).success(function(data,status,headers,config){
                     cacheFactory.set("brands","object",data);
                     deferred.resolve(data);
                 }).error(function(data,status,headers,config){})
             }
             return deferred.promise;
         },
         getBrandsAndCharitiesObject: function() {
             var deferred=cacheFactory.defer("brandsAndCharities");
             var cache=cacheFactory.get("brandsAndCharities","object");
             if(cache){deferred.resolve(cache);
             }else if(!deferred.cache){
                 $http({method:'GET',url:'/api/brands/get_all_brands_and_charities_object'
                      }).success(function(data,status,headers,config){
                      cacheFactory.set("brandsAndCharities","object",data);
                      deferred.resolve(data);
                  }).error(function(data,status,headers,config){})
              }
              return deferred.promise;
          },
         getBrandByName: function(name){
              var deferred= $q.defer();
            //  var cache=cacheFactory.get("brands",name);
            //  if(cache){deferred.resolve(cache);
            //  }else if(!deferred.cache){
             $http({method:'GET',url:'/api/brands/get_brands_array'
                  }).success(function(data,status,headers,config){
                  for(var i=0;i<data.length;i++)
                       if(data[i].title.toLowerCase()==name.toLowerCase()){
                        //    cacheFactory.set("brands",name,data[i]);
                           deferred.resolve(data[i]);
                       }

              }).error(function(data,status,headers,config){})
              return deferred.promise;
         },

         getBrandByID: function(id){
             var deferred=$q.defer();
             $http({method:'GET',url:'/api/brands/get_brand/?id='+id})
             .success(function(data,status,headers,config){
                           deferred.resolve(data[0]);
              }).error(function(data,status,headers,config){});
              return deferred.promise;
         },
         getAllCharities: function() {
             var deferred=cacheFactory.defer("charities");
             var cache=cacheFactory.get("charities","object");
             if(cache){deferred.resolve(cache);
             }else if(!deferred.cache){
                 $http({method:'GET',url:'/api/brands/get_charities_array'
                      }).success(function(data,status,headers,config){
                          cacheFactory.set("charities","object",data);
                          deferred.resolve(data);
                  }).error(function(data,status,headers,config){})
              }
              return deferred.promise;
         },
         getCharityByName: function(name){
             var deferred=cacheFactory.defer("charities");
             var cache=cacheFactory.get("charities",name);
             if(cache){deferred.resolve(cache);
             }else if(!deferred.cache){
                 $http({method:'GET',url:'/api/brands/get_charities_array'
                      }).success(function(data,status,headers,config){

                      for(var i=0;i<data.length;i++)
                           if(data[i].title.toLowerCase()==name.toLowerCase()){
                               cacheFactory.set("charities",name,data[i]);
                                deferred.resolve(data[i]);
                           }

                  }).error(function(data,status,headers,config){})
              }
              return deferred.promise;
         },
         getBrandVideos: function(id){
             return $http.get('/api/brands/get_brand_videos/?id='+id).then(function(result) {
                 var data = result.data;
                 return data;
             }).catch(function(err){
                // for example, "re-throw" to "hide" HTTP specifics
                return $q.reject("Data not available");
               })
         },
         getBrandOffers: function(id){
             return $http.get('/api/brands/get_brand_offers/?id='+id).then(function(result) {
                 var data = result.data;
                 return data;
             }).catch(function(err){
                // for example, "re-throw" to "hide" HTTP specifics
                return $q.reject("Data not available");
               })
         },
         getBrandCelebs: function(id){
             return $http.get('/api/brands/get_brand_celebs/?id='+id).then(function(result) {
                 var data = result.data;
                 return data;
             }).catch(function(err){
                // for example, "re-throw" to "hide" HTTP specifics
                return $q.reject("Data not available");
               })
         }
     }
});
