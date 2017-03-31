(function() {

    var AccountSavedOffersController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {

            $scope.menuItems = [
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

            $scope.filterSavedOffersOptions = [
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
            $scope.sortSavedOffersOptions = [
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

            userService.getSavedOffers()
                .then(
                    function onSuccess(data) {
                        $scope.offers = data;
                        $scope.ready = true;
                    }
                )

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountSavedOffersController', AccountSavedOffersController);
}());