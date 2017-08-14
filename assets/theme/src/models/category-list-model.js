(function() {

    angular
        .module('turnon')
        .factory('CategoryListModel', [
            'CategoryModel',
            function(CategoryModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.categories = data.map(function(category) {
                //         return new CategoryModel(category);
                //     });
                // }
            }
        ]);
}());
