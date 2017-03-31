(function() {

    var AccountFavoritesController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {

            $scope.brandMenuItems = [
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
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
                }
            ];

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
                    label: 'Recently'
                },
                {
                    label: 'Favorites'
                },
                {
                    label: 'Most Viewed'
                }
            ];
            $scope.sortBrandsOptions = [
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
            $scope.sortCharitiesOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];
            $scope.sortCategoriesOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];

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