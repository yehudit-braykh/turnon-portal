(function() {
    angular
        .module('clixtv')
        .factory('OfferListModel', [
            'OfferModel',
            function(OfferModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.offers = data.map(function(offer) {
                        return new OfferModel(offer);
                    });
                }
            }
        ]);
}());