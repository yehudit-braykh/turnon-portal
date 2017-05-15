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
        function($q, $log, $scope, $rootScope, $state, $stateParams, categoryService, userService, modalService, catchMediaService) {

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteCategory($stateParams.id);
            }

            $scope.notify = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
                _resetIsFavorite();
            });

            $rootScope.$on('favorite.added', _resetIsFavorite);
            $rootScope.$on('favorite.removed', _resetIsFavorite);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteCategory($stateParams.id);
                } else {
                    userService.addFavoriteCategory($stateParams.id);
                }
            };

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
                    label: 'Recently Added'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

            $scope.onLoginPress = function() {
                modalService.showLogInModal();
            };

            $q.all(
                    [
                        categoryService.getCategoryById($stateParams.id),
                        categoryService.getAllCategories()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.category = data[0];
                        $scope.categories = data[1];

                        catchMediaService.trackAppEvent('navigation_item', {
                            target_cm: 'entity',
                            target_type: 'category',
                            target_name: $scope.category.title
                        });
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );
        }
    ];

    angular
        .module('clixtv')
        .controller('CategoryController', CategoryController);
}());