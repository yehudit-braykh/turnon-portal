(function() {

    angular
        .module('clixtv')
        .factory('CharityModel', [
            '$injector',
            function($injector) {
                return function(data) {

                    if (typeof data === 'string') {
                        return;
                    }

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;

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

                    if (data.celebrities) {
                        var CelebrityListModel = $injector.get('CelebrityListModel');
                        this.celebrities = new CelebrityListModel(data.celebrities);
                    }

                    var VideoListModel = $injector.get('VideoListModel');
                    this.videos = new VideoListModel(data.videos);
                }
            }
        ]);
}());