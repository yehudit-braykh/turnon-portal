(function() {

    var AccountWatchlistController = [
        '$scope',
        '$rootScope',
        'userService',
        function($scope, $rootScope, userService) {

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

            $scope.sortOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            userService.getWatchlist()
                .then(
                    function onSuccess(data) {
                        $scope.watchlist = data;
                        $scope.ready = true;
                    }
                )
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountWatchlistController', AccountWatchlistController);
}());