clixApp.factory("videosFactory", function($http, $q) {
    return {
        getVideoById: function(id){
                return $http.get('/api/video/get_video_by_id/?id='+id).then(function(data){
                    return data;
                }).catch(function(err){
                    console.log('video not available');
                });
        },
       getVideoByCat: function(category) {
           return $http.get('/api/vod/get_videos_by_category?category='+category).then(function(result) {
               var data = [];
               data[0] = result.data;
               data[1] = category;

               return data;
           }).catch(function(err){
              // for example, "re-throw" to "hide" HTTP specifics
              return $q.reject("Data not available");
             })
        },
        getRelatedVideos: function(id) {
            return $http.get('/api/vod?_id='+id).then(function(result) {
                var data = result.data.related;
                return data;
            }).catch(function(err){
               return $q.reject("Data not available");
              })
         }
     }
});
