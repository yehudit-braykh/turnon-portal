(function() {

    angular
        .module('clixtv')
        .factory('BrandModel', [
            '$injector',
            'OfferListModel',
            'CelebrityListModel',
            function($injector, OfferListModel, CelebrityListModel) {
                return function(data) {

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.offers = new OfferListModel(data.offers);
                    this.celebrities = new CelebrityListModel(data.celebrities);

                    if (data.videos) {
                        var VideoListModel = $injector.get('VideoListModel');
                        this.videos = new VideoListModel(data.videos);
                    }

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