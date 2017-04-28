(function() {

    angular
        .module('clixtv')
        .factory('CelebrityModel', [
            '$injector',
            function($injector) {
                return function(data) {
                    this.id = data._id;
                    this.name = data.title;
                    this.description = data.description;

                    if (data.content) {
                        if (data.content.ProfilePicture) {
                            this.thumbnail = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }
                    }

                    if (data.videos) {
                        var VideoListModel = $injector.get('VideoListModel');
                        this.videos = new VideoListModel(data.videos);
                    }

                    if (data.charities) {
                        var CharityListModel = $injector.get('CharityListModel');
                        this.charities = new CharityListModel(data.charities);
                    }

                    if (data.brands) {
                        var BrandListModel = $injector.get('BrandListModel');
                        this.brands = new BrandListModel(data.brands);
                    }

                    if (data.series) {
                        var SeriesListModel = $injector.get('SeriesListModel');
                        this.series = new SeriesListModel(data.series);
                    }

                    if (data.offers) {
                        var OfferListModel = $injector.get('OfferListModel');
                        this.series = new OfferListModel(data.offers);
                    }

                }
            }
        ]);
}());