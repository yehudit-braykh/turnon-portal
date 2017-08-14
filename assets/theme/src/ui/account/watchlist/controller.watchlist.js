(function() {

    var AccountWatchlistController = [
        '$scope',
        '$rootScope',
        'userService',
        'clixConfig',
        function($scope, $rootScope, userService, clixConfig) {

            // $rootScope.pageTitle = 'Your Watchlist - turnon';
            //
            // $scope.filtersEnabled = clixConfig.filtersEnabled;
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
            //     },
            //     {
            //         label: 'Grocery, HouseHold & Pets'
            //     },
            //     {
            //         label: 'Health & Beauty'
            //     },
            //     {
            //         label: 'Jewelry & Watches'
            //     },
            //     {
            //         label: 'Men\'s Fashion'
            //     },
            //     {
            //         label: 'Sports & Outdoors'
            //     },
            //     {
            //         label: 'Women\'s Fashion'
            //     }
            // ];
            //
            // $scope.sortOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $rootScope.$on('favorite.removed', function(event, data) {
            //     if (!$scope.watchlist || !$scope.watchlist.videos) {
            //         $scope.watchlist = {
            //             videos: []
            //         }
            //     }
            //     $scope.watchlist.videos = $scope.watchlist.videos.filter(function(item) {
            //         return item.id !== data.id;
            //     });
            // });
            //
            // userService.getWatchlist()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.watchlist = data;
            //             $scope.ready = true;
            //         }
            //     )
        }
    ];

    angular
        .module('turnon')
        .controller('AccountWatchlistController', AccountWatchlistController);
}());
