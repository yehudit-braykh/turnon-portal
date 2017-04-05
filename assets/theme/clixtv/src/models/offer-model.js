(function() {
    angular
        .module('clixtv')
        .factory('OfferModel', [
            function() {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;

                    console.log(data);

                    if (data.content.BrandTransparentLogo) {
                        this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                    }

                    if (data.content.BrandLogo) {
                        this.thumbnail = data.content.BrandLogo.downloadUrl;
                    }
                }
            }
        ]);
}());