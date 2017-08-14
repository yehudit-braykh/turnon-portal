(function() {

    var CategoriesController = [
        '$q',
        '$scope',
        '$rootScope',
        'categoryService',
        'catchMediaService',
        function($q, $scope, $rootScope, categoryService, catchMediaService) {

            // $rootScope.pageTitle = 'Categories - turnon';
            //
            // $scope.filterOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Home & Auto'
            //     },
            //     {
            //         label: 'Baby, Kids & Toys'
            //     },
            //     {
            //         label: 'Electronics'
            //     }
            // ];
            //
            // $scope.sortOptions = [
            //     {
            //         label: 'Expiring Soon'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.menuItems = [
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Go to Stars',
            //         icon: 'icon-stars-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // categoryService.getAllCategories(true)
            //     .then(
            //         function onSuccess(data) {
            //             var categories = data;
            //             categories.categories = categories.categories.filter(function(category) {
            //                 return category.totalVideos && category.totalVideos !== 0;
            //             });
            //
            //             $scope.categories = categories;
            //         }
            //     );
            //
            // catchMediaService.trackAppEvent('navigation', {
            //     target_cm: 'entity',
            //     target_type: 'category'
            // });
        }
    ];

    angular
        .module('turnon')
        .controller('CategoriesController', CategoriesController);
}());
