peruDigitalApp.factory("categoriesFactory", function($http, $q) {
    var allCategories=[{name:'Politica',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Peru',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'MUNDO',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Deporte',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Entretenimient',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'},
                        {name:'Economia',
                         desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                         While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                         cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'}];
    return {
        getAllCategories: function() {
             return allCategories;
         },
         getCategoryByName: function(categoryName){
             console.log(categoryName);
             for(var celeb in allCategories){
                 if (allCategories[celeb].name.toLowerCase()==categoryName.toLowerCase())
                    return allCategories[celeb];
             }
         }
    }
});
