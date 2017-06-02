(function() {

    var BrandsController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'brandsService',
        'catchMediaService',
        function($q, $scope, $rootScope, $stateParams, brandsService, catchMediaService) {

            $rootScope.pageTitle = 'Brands - ClixTV';
            $scope.activeTab = 'brands';

            var offersLoading = false,
                canLoadMoreOffers = true,
                offerPage = 0,
                OFFER_LIMIT = 24,
                brandsLoading = false,
                canLoadMoreBrands = true,
                brandPage = 0,
                BRAND_LIMIT = 24;

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

            $scope.onTabSelect = function(tab) {
                $scope.activeTab = tab;
                switch (tab) {
                    case 'offers':
                        if (!$scope.offers) {
                            _loadOffers();
                        }
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'offer'
                        });
                        break;
                }
            };

            $scope.loadMoreOffers = function() {
                _loadOffers();
            };

            $scope.loadMoreBrands = function() {
                _loadBrands();
            };

            function _loadOffers() {
                if (offersLoading || $scope.activeTab !== 'offers' || !canLoadMoreOffers) {
                    return;
                }
                offersLoading = true;
                return brandsService.getAllOffers(offerPage, OFFER_LIMIT)
                    .then(
                        function onSuccess(data) {
                            if ($scope.offers) {
                                $scope.offers.offers = $scope.offers.offers.concat(data.offers);
                            } else {
                                $scope.offers = data;
                            }
                            offersLoading = false;
                            offerPage += 1;
                            if (!data.offers || !data.offers || data.offers.length === 0) {
                                canLoadMoreOffers = false;
                            }
                        }
                    );
            }

            function _loadBrands() {
                if (brandsLoading || $scope.activeTab !== 'brands' || !canLoadMoreBrands) {
                    return;
                }
                brandsLoading = true;
                $scope.active = 0;
                return brandsService.getAllBrands(brandPage, BRAND_LIMIT)
                    .then(
                        function onSuccess(data) {
                            $scope.ready = true;
                            if ($scope.brands) {
                                $scope.brands.brands = $scope.brands.brands.concat(data.brands);
                            } else {
                                $scope.brands = data;
                            }
                            brandsLoading = false;
                            brandPage += 1;
                            if (!data.brands || !data.brands || data.brands.length === 0) {
                                canLoadMoreBrands = false;
                            }
                        }
                    );
            }

            _loadBrands();

            catchMediaService.trackAppEvent('navigation', {
                target_cm: 'media',
                target_type: 'campaign'
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('BrandsController', BrandsController);
}());