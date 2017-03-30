(function() {
    var savedOffers = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/saved-offers/view.saved-offers.html',
            controller: 'AccountSavedOffersController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountSavedOffers', savedOffers);
}());