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
                        categoryService.getCategoryByName($stateParams.slug),
                        categoryService.getCategoryVideosByName($stateParams.slug)
                    ]
                )
                .then(
                    function onSuccess(data) {
                        var category = data[1];

                        $scope.categories = data[0];
                        $scope.category = category;
                        $scope.videos = data[2];
                        $scope.configs = {
                            title: category.title,
                            backgroundImage: '/assets/theme/clixtv/dist/images/fun-games-header.jpg',
                            backgroundImage2x: '/assets/theme/clixtv/dist/images/fun-games-header@2x.jpg'
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