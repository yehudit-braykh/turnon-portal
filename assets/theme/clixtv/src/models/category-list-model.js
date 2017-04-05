(function() {

    angular
        .module('clixtv')
        .factory('CategoryListModel', [
            'CategoryModel',
            function(CategoryModel) {
                return function(data) {
                    this.categories = data.map(function(category) {
                        return new CategoryModel(category);
                    });
                }
            }
        ]);
}());