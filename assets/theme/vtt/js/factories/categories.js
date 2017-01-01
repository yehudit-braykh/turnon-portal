peruDigitalApp.factory("categoriesFactory", function($http, $q) {
    var allCategories=[{name:'Politica',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'},
                        {name:'Peru',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'},
                        {name:'MUNDO',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'},
                        {name:'Deporte',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'},
                        {name:'Entretenimient',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'},
                        {name:'Economia',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'}];
    return {
        getAllCategories: function() {
            return $http({method: 'GET', url: '/api/category/get_all_categories'}).
                       success(function(data, status, headers, config) {
                           return data;
                       }).
                       error(function(data, status, headers, config) {
                       });
         },
         getCategoryByName: function(categoryName){
             return $http({method: 'GET', url: '/api/category/get_category_by_name/?category='+ categoryName}).
                        success(function(data, status, headers, config) {
                            return data;
                        }).
                        error(function(data, status, headers, config) {
                        });
         },
         getCategoryVideos: function(categoryName){
             return $http({method: 'GET', url: '/api/category/get_category_videos/?category='+ categoryName}).
                        success(function(data, status, headers, config) {
                            return data;
                        }).
                        error(function(data, status, headers, config) {
                        });
         }
    }
});
