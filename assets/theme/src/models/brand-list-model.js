(function() {

    angular
        .module('turnon')
        .factory('BrandListModel', [
            'BrandModel',
            function(BrandModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.brands = data.map(function(brand) {
                //         if (typeof brand === 'string') {
                //             return {
                //                 id: brand
                //             };
                //         }
                //         return new BrandModel(brand);
                //     });
                // }
            }
        ]);
}());
