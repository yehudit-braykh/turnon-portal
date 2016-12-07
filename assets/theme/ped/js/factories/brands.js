peruDigitalApp.factory("brandsFactory", function($http, $q) {
    return {
       getAllBrands: function() {
            return [{name:'Coca Cola', icon_url:'assets/theme/ped/images/static-images/brands/coca-cola.png'},
                    {name:'', icon_url:'assets/theme/ped/images/static-images/brands/crystal-beer.png'},
                    {name:'Coca Cola', icon_url:'assets/theme/ped/images/static-images/brands/coca-cola.png'},
                    {name:'', icon_url:'assets/theme/ped/images/static-images/brands/crystal-beer.png'},
                    {name:'Coca Cola', icon_url:'assets/theme/ped/images/static-images/brands/coca-cola.png'},
                    {name:'', icon_url:'assets/theme/ped/images/static-images/brands/crystal-beer.png'},
                    {name:'Coca Cola', icon_url:'assets/theme/ped/images/static-images/brands/coca-cola.png'},
                    {name:'', icon_url:'assets/theme/ped/images/static-images/brands/crystal-beer.png'},
                    {name:'Coca Cola', icon_url:'assets/theme/ped/images/static-images/brands/coca-cola.png'},
                    {name:'', icon_url:'assets/theme/ped/images/static-images/brands/crystal-beer.png'},
                    {name:'Coca Cola', icon_url:'assets/theme/ped/images/static-images/brands/coca-cola.png'},
                    {name:'', icon_url:'assets/theme/ped/images/static-images/brands/crystal-beer.png'}];
        }
    };
});
