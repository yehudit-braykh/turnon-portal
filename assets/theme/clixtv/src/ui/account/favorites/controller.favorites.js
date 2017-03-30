(function() {

    var AccountFavoritesController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {

            var defaultFilterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Home & Auto'
                },
                {
                    label: 'Baby, Kids & Toys'
                },
                {
                    label: 'Electronics'
                }
            ];

            var defaultSortOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];

            $scope.filterStarsOptions = defaultFilterOptions;
            $scope.filterBrandsOptions = defaultFilterOptions;
            $scope.filterCharitiesOptions = defaultFilterOptions;
            $scope.filterCategoriesOptions = defaultFilterOptions;

            $scope.sortStarsOptions = defaultSortOptions;
            $scope.sortBrandsOptions = defaultSortOptions;
            $scope.sortCharitiesOptions = defaultSortOptions;
            $scope.sortCategoriesOptions = defaultSortOptions;

            $q.all(
                    [
                        userService.getFavoriteCelebrities(),
                        userService.getFavoriteBrands(),
                        userService.getFavoriteCharities(),
                        userService.getFavoriteCategories()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.ready = true;
                        $scope.celebrities = data[0];
                        $scope.brands = data[1];
                        $scope.charities = data[2];
                        $scope.categories = data[3];
                    }
                )

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountFavoritesController', AccountFavoritesController);
}());