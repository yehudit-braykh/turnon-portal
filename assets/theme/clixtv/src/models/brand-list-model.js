(function() {

    angular
        .module('clixtv')
        .factory('BrandListModel', [
            'BrandModel',
            function(BrandModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.brands = data.map(function(brand) {
                        return new BrandModel(brand);
                    });
                }
            }
        ]);
}());