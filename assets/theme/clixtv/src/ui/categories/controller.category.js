(function() {

    var CategoryController = [
        '$q',
        '$scope',
        '$stateParams',
        'categoryService',
        function($q, $scope, $stateParams, categoryService) {

            $q.all(
                    [
                        categoryService.getAllCategories(),
                        categoryService.getCategoryByName($stateParams.slug)
                    ]
                )
                .then(
                    function onSuccess(data) {
                        var category = data[1];

                        $scope.categories = data[0];
                        $scope.category = category;
                        $scope.configs = {
                            title: category.title
                        };
                    }
                );

            categoryService.getCategoryByName($stateParams.slug)
                .then(
                    function onSuccess(data) {
                        $scope.configs = {
                            title: data.title
                        }
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('CategoryController', CategoryController);
}());