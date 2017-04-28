(function() {
    angular
        .module('clixtv')
        .factory('OfferModel', [
            '$injector',
            function($injector) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.expirationDate = data.expirationDate;
                    this.description = data.description;

                    if (data.content) {
                        if (data.content.BrandTransparentLogo) {
                            this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                        }

                        if (data.content.OfferImage) {
                            this.thumbnail = data.content.OfferImage.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }
                    }

                    if (data.brand) {
                        var BrandModel = $injector.get('BrandModel');
                        this.brand = new BrandModel(data.brand);
                    }

                    if (data.videos) {
                        var VideoListModel = $injector.get('VideoListModel');
                        this.videos = new VideoListModel(data.videos);
                    }
                }
            }
        ]);
}());
