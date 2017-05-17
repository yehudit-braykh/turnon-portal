(function() {

    var AccountFavoritesController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'userService',
        function($q, $scope, $rootScope, $stateParams, userService) {

            $rootScope.pageTitle = 'Your Favorites - ClixTV';

            $scope.ready = false;

            $scope.filterStarsOptions = [
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
            $scope.filterBrandsOptions = [
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
                },
                {
                    label: 'Grocery, HouseHold & Pets'
                },
                {
                    label: 'Health & Beauty'
                },
                {
                    label: 'Jewelry & Watches'
                },
                {
                    label: 'Men\'s Fashion'
                },
                {
                    label: 'Sports & Outdoors'
                },
                {
                    label: 'Women\'s Fashion'
                }
            ];
            $scope.filterCharitiesOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Animals'
                },
                {
                    label: 'Arts & Culture'
                },
                {
                    label: 'Education'
                },
                {
                    label: 'Environmental'
                },
                {
                    label: 'International non-gov'
                },
                {
                    label: 'Health'
                }
            ];
            $scope.filterCategoriesOptions = [
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




            $scope.sortStarsOptions = [
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
            $scope.sortBrandsOptions = [
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
            $scope.sortCharitiesOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];
            $scope.sortCategoriesOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            switch($stateParams.tab) {
                default:
                case 'star':
                    $scope.active = 0;
                    break;
                case 'brand':
                    $scope.active = 1;
                    break;
                case 'charity':
                    $scope.active = 2;
                    break;
                case 'category':
                    $scope.active = 3;
                    break;
            }

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
                );

            function _onCelebrityRemoved(id) {
                if (!$scope.celebrities || !$scope.celebrities.celebrities) {
                    $scope.celebrities = {
                        celebrities: []
                    }
                }
                $scope.celebrities.celebrities = $scope.celebrities.celebrities.filter(function(item) {
                    return item.id !== id;
                });
            }

            function _onBrandRemoved(id) {
                if (!$scope.brands || !$scope.brands.brands) {
                    $scope.brands = {
                        brands: []
                    }
                }
                $scope.brands.brands = $scope.brands.brands.filter(function(item) {
                    return item.id !== id;
                });
            }

            function _onCharityRemoved(id) {
                if (!$scope.charities || !$scope.charities.charities) {
                    $scope.charities = {
                        charities: []
                    }
                }
                $scope.charities.charities = $scope.charities.charities.filter(function(item) {
                    return item.id !== id;
                });
            }

            function _onCategoryRemoved(id) {
                if (!$scope.categories || !$scope.categories.categories) {
                    $scope.categories = {
                        categories: []
                    }
                }
                $scope.categories.categories = $scope.categories.categories.filter(function(item) {
                    return item.id !== id;
                });
            }

            $rootScope.$on('favorite.removed', function(event, data) {
                switch(data.type) {
                    case 'celebrity':
                        _onCelebrityRemoved(data.id);
                        break;
                    case 'brand':
                        _onBrandRemoved(data.id);
                        break;
                    case 'charity':
                        _onCharityRemoved(data.id);
                        break;
                    case 'category':
                        _onCategoryRemoved(data.id);
                        break;
                }
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountFavoritesController', AccountFavoritesController);
}());