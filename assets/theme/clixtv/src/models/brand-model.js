(function() {

    angular
        .module('clixtv')
        .factory('BrandModel', [
            'OfferListModel',
            function(OfferListModel) {
                return function(data) {

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.offers = new OfferListModel(data.offers);

                    if (data.content.BrandTransparentLogo) {
                        this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                    }

                    if (data.content.BackgroundImage) {
                        this.headerImage = data.content.BackgroundImage.downloadUrl;
                    }

                    if (data.content.BrandLogo) {
                        this.logo = data.content.BrandLogo.downloadUrl;
                    }

                    if (data.content.mainTrailer) {
                        this.trailer = data.content.mainTrailer.downloadUrl;
                    }

                    if (data.content.PosterH) {
                        this.trailerThumbnail = data.content.PosterH.downloadUrl;
                    }

                    // console.log(data);
                }
            }
        ]);
}());