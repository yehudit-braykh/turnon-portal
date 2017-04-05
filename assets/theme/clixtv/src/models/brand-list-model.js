(function() {

    angular
        .module('clixtv')
        .factory('BrandListModel', [
            'BrandModel',
            function(BrandModel) {
                return function(data) {
                    this.brands = data.map(function(brand) {
                        return new BrandModel(brand);
                    });
                }
            }
        ]);
}());