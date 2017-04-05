(function() {

    var categoryService = [
        '$http',
        'CategoryListModel',
        'CategoryModel',
        function($http, CategoryListModel, CategoryModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCategories: function() {
                    return $http.get('/api/category/get_all_categories')
                        .then(
                            function onSuccess(data) {
                                return new CategoryListModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryByName: function(name) {
                    return $http.get('/api/category/get_category_by_name/?category=' + name)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryById: function(id) {
                    return $http.get('/api/category/get_category_by_id?id=' + id)
                        .then(
                            function onSuccess(data) {
                                var categories = data.data.entries,
                                    category = categories.filter(function(cat) {
                                        return cat._id === id;
                                    });
                                return new CategoryModel(category[0]);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryVideosByName: function(name) {
                    return $http.get('/api/category/get_category_videos?category=' + name)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('categoryService', categoryService);
}());