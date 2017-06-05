(function() {

    angular
        .module('clixtv')
        .factory('CelebrityModel', [
            '$injector',
            '$filter',
            function($injector, $filter) {
                return function(data) {
                    this.id = data._id;
                    this.name = data.title;
                    this.description = data.description;

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.name);
                    }

                    if (data.content) {
                        if (data.content.ProfilePicture) {
                            this.thumbnail = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }
                    }

                    if (data.videos) {
                        if (typeof data.videos === 'number') {
                            this.totalVideos = data.videos;
                        } else {
                            var VideoListModel = $injector.get('VideoListModel');
                            this.videos = new VideoListModel(data.videos);
                            this.totalVideos = this.videos.videos.length;
                        }
                    }

                    if (data.charities) {
                        var CharityListModel = $injector.get('CharityListModel');
                        this.charities = new CharityListModel(data.charities);
                    }

                    if (data.campaigns) {
                        var BrandListModel = $injector.get('BrandListModel');
                        this.brands = new BrandListModel(data.campaigns);
                    }

                    if (data.series) {
                        var SeriesListModel = $injector.get('SeriesListModel');
                        this.series = new SeriesListModel(data.series);
                    }

                    if (data.offers) {
                        var OfferListModel = $injector.get('OfferListModel');
                        this.offers = new OfferListModel(data.offers);
                    }

                }
            }
        ]);
}());