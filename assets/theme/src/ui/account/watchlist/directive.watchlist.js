(function() {
    var watchlist = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/watchlist/view.watchlist.html',
            controller: 'AccountWatchlistController'
        }
    };

    angular.module('turnon')
        .directive('clixAccountWatchlist', watchlist);
}());
