(function() {

    var CategoriesController = [
        '$q',
        '$scope',
        'categoryService',
        'catchMediaService',
        function($q, $scope, categoryService, catchMediaService) {

            $scope.filterOptions = [
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

            $scope.sortOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            $scope.menuItems = [
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Stars',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            categoryService.getAllCategories()
                .then(
                    function onSuccess(data) {
                        $scope.categories = data;
                    }
                );

            catchMediaService.trackCategoryPageEvent();
        }
    ];

    angular
        .module('clixtv')
        .controller('CategoriesController', CategoriesController);
}());