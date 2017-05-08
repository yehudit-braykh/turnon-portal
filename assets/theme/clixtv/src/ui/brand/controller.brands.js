(function() {

    var BrandsController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        'catchMediaService',
        function($q, $scope, $stateParams, brandsService, catchMediaService) {

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

            $scope.offerMenuItems = [
                {
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
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
                }
            ];

            $scope.brandMenuItems = [
                {
                    label: 'Share',
                    points: '50',
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

            $scope.filterBrandsOptions = defaultFilterOptions;
            $scope.filterOffersOptions = defaultFilterOptions;

            $scope.sortBrandsOptions = [
                {
                    label: 'A-Z'
                },
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            $scope.sortOffersOptions = [
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            // Don't wire these 2 calls together in a $q.all(...) because we don't want to have to wait for
            // the order response to come back if the brands are all ready since it's a tabbed interface.
            brandsService.getAllBrands()
                .then(
                    function onSuccess(data) {
                        $scope.ready = true;
                        $scope.active = 0;
                        $scope.brands = data;
                    }
                );

            brandsService.getAllOffers()
                .then(
                    function onSuccess(data) {
                        $scope.offers = data;
                    }
                );

            catchMediaService.trackBrandPageEvent();

        }
    ];

    angular
        .module('clixtv')
        .controller('BrandsController', BrandsController);
}());