(function() {

    var CategoryController = [
        '$q',
        '$scope',
        '$stateParams',
        'categoryService',
        function($q, $scope, $stateParams, categoryService) {

            $scope.filterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Athletes'
                },
                {
                    label: 'Influencers'
                },
                {
                    label: 'Movie Stars'
                },
                {
                    label: 'Musicians'
                },
                {
                    label: 'TV Stars'
                }
            ];

            $scope.sortOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Recently'
                },
                {
                    label: 'Favorites'
                },
                {
                    label: 'Most Viewed'
                }
            ];

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
                            title: category.title,
                            backgroundImage: '/assets/theme/clixtv/dist/images/fun-games-header.jpg',
                            backgroundImage2x: '/assets/theme/clixtv/dist/images/fun-games-header@2x.jpg'
                        };

                        return categoryService.getCategoryVideosByName(category.title);
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.videos = data;
                    }
                )

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