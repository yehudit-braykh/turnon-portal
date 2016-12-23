peruDigitalApp.factory("celebritiesFactory", function($http, $q) {
    var allCelebrities=[{name:'Andrés Remezzano',
                         icon_url:'/assets/theme/ped/images/static-images/celebs/celeb1.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Mariana Kout',
                         icon_url:'/assets/theme/ped/images/static-images/celebs/celeb2.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Reinaldo Aragón',
                         icon_url:'/assets/theme/ped/images/static-images/celebs/celeb3.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Martio Hart',
                         icon_url:'/assets/theme/ped/images/static-images/celebs/celeb4.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Lucho Trizano',
                         icon_url:'/assets/theme/ped/images/static-images/celebs/celeb5.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Josie Sandoval',
                         icon_url:'/assets/theme/ped/images/static-images/celebs/celeb6.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Vernon Colon',
                         icon_url:'/assets/theme/ped/images/static-images/celebs/celeb7.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Christine Farmer', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb8.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Eddie Hammond', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb9.png',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'}];
    return {
        getAllCelebrities: function(){
            return $http({method: 'GET', url: '/api/celebrity/get_all_celebrities'}).
                       success(function(data, status, headers, config) {
                           return data;
                       }).
                       error(function(data, status, headers, config) {
                       });
        },
         getCelebrityByName: function(celebrityName){
             return $http({method: 'GET', url: '/api/celebrity/get_celebrity_by_name/?celebrity='+celebrityName}).
                        success(function(data, status, headers, config) {
                            return data;
                        }).
                        error(function(data, status, headers, config) {
                        });
         }
    }
});
