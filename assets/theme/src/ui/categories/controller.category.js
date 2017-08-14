(function() {

    var CategoryController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'categoryService',
        'userService',
        'modalService',
        'catchMediaService',
        'clixConfig',
        function($q, $log, $scope, $rootScope, $state, $stateParams, categoryService, userService, modalService, catchMediaService, clixConfig) {
            //
            // function _resetIsFavorite() {
            //     if ($scope.category) {
            //         $scope.isFavorite = userService.isFavoriteCategory($scope.category.id);
            //     }
            // }
            //
            // $scope.notify = false;
            // $scope.filtersEnabled = clixConfig.filtersEnabled;
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     delete $scope.loggedInUser;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('favorite.added', _resetIsFavorite);
            // $rootScope.$on('favorite.removed', _resetIsFavorite);
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data;
            //             _resetIsFavorite();
            //         }
            //     );
            //
            // $scope.onFavoritePress = function() {
            //     if ($scope.isFavorite) {
            //         userService.removeFavoriteCategory($scope.category.id);
            //     } else {
            //         userService.addFavoriteCategory($scope.category.id);
            //
            //         catchMediaService.trackAppEvent('favorite', {
            //             target_cm: 'entity',
            //             target_type: 'category',
            //             target_name: $scope.category.title
            //         });
            //     }
            // };
            //
            // $scope.filterOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Athletes'
            //     },
            //     {
            //         label: 'Influencers'
            //     },
            //     {
            //         label: 'Movie Stars'
            //     },
            //     {
            //         label: 'Musicians'
            //     },
            //     {
            //         label: 'TV Stars'
            //     }
            // ];
            //
            // $scope.sortOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Recently Added'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.onSignupPress = function() {
            //     modalService.showSignUpModal();
            // };
            //
            // $scope.onLoginPress = function() {
            //     modalService.showLogInModal();
            // };
            //
            // $q.all(
            //         [
            //             categoryService.getCategoryBySlug($stateParams.slug),
            //             categoryService.getAllCategories()
            //         ]
            //     )
            //     .then(
            //         function onSuccess(data) {
            //             $scope.category = data[0];
            //             $scope.categories = data[1];
            //
            //             $rootScope.pageTitle = $scope.category.title + ' Videos - turnon';
            //
            //             catchMediaService.trackAppEvent('navigation_item', {
            //                 target_cm: 'entity',
            //                 target_type: 'category',
            //                 target_name: $scope.category.title
            //             });
            //         }
            //     )
            //     .catch(
            //         function onError(error) {
            //             $log.error(error);
            //             $state.go('404');
            //         }
            //     );
        }
    ];

    angular
        .module('turnon')
        .controller('CategoryController', CategoryController);
}());
