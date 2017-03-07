clixApp.factory("fileFactory", function($http, $q) {
    return {
       fileUpload: function(file , upload_url) {
           return $http({method: 'POST', url: '/api/file/upload_file', data:{file: file, url: upload_url }}).then(function(result) {
               console.log(result);
               var data = result.data;
               return data;
           }).catch(function(err){
              // for example, "re-throw" to "hide" HTTP specifics
              return $q.reject("Upload Error");
             })
        }
     }
});
