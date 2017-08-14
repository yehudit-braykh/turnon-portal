(function() {
    var favorites = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/favorites/view.favorites.html',
            controller: 'AccountFavoritesController'
        }
    };

    angular.module('turnon')
        .directive('clixAccountFavorites', favorites);
}());
