(function() {
    angular
        .module('clixtv')
        .factory('OfferModel', [
            function() {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                    this.thumbnail = data.content.BrandLogo.downloadUrl;
                }
            }
        ]);
}());