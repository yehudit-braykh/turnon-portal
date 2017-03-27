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
                }
            ];

            $scope.sortOptions = [
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

            userService.getWatchlist()
                .then(
                    function onSuccess(data) {
                        $scope.watchlist = data;
                    }
                )
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountWatchlistController', AccountWatchlistController);
}());