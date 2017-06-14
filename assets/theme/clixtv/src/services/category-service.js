(function() {

    var categoryService = [
        '$http',
        'CategoryListModel',
        'CategoryModel',
        'cacheService',
        'clixConfig',
        function($http, CategoryListModel, CategoryModel, cacheService, clixConfig) {
            return {

                getAllCategories: function(withVideoCount, page, size) {
                    return $http.get('/api/category/get_all_categories?video_count=' + (withVideoCount || false) + '&page=' + page + '&page_size=' + size, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CategoryListModel(data.data);
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
                                return new CategoryModel(data.data);
                            }
                        );
                },

                getCategoryBySlug: function(slug) {
                    return $http.get(clixConfig.baseApi + '/categories/slug/' + slug, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CategoryModel(data.data);
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