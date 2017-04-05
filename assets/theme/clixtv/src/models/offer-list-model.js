(function() {
    angular
        .module('clixtv')
        .factory('OfferListModel', [
            'OfferModel',
            function(OfferModel) {
                return function(data) {
                    this.offers = data.map(function(offer) {
                        return new OfferModel(offer);
                    });
                }
            }
        ]);
}());