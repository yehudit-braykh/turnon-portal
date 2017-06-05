(function() {

    angular
        .module('clixtv')
        .factory('VideoModel', [
            '$injector',
            'CelebrityModel',
            'BrandListModel',
            'CharityModel',
            '$filter',
            function($injector, CelebrityModel, BrandListModel, CharityModel, $filter) {
                return function(data) {

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.seriesTitle = data.serie_title; // ...spelling?
                    this.episodeNumber = data.episode_number;
                    this.runtime = data.runtime;

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.title);
                    }

                    if (data.views) {
                        this.views = parseInt(data.views);
                    } else {
                        this.views = 0;
                    }

                    if (data.celebrity) {
                        this.celebrity = new CelebrityModel(data.celebrity);
                    }

                    if (data.campaigns) {
                        this.brands = new BrandListModel(data.campaigns);
                    }

                    if (data.charity) {
                        this.charity = new CharityModel(data.charity);
                    }

                    if (data.categories) {
                        var CategoryListModel = $injector.get('CategoryListModel');
                        this.categories = new CategoryListModel(data.categories);
                    }

                    if (data.serie) { // ...spelling?

                        // Preventing circular dependencies since a list of videos can
                        // exist in nested models too (series, seasons, etc)
                        var SeriesModel = $injector.get('SeriesModel');
                        this.series = new SeriesModel(data.serie);
                    }

                    if (data.content.PosterH) {
                        this.thumbnail = data.content.PosterH.downloadUrl;
                    }

                    if (data.content.EndPoster) {
                        this.endPoster = data.content.EndPoster.downloadUrl;
                    }

                    if (data.content.HLSStream) {
                        this.streamUrl = data.content.HLSStream.downloadUrl;
                    } else if (data.content.MezzanineVideo) {
                        this.streamUrl = data.content.MezzanineVideo.downloadUrl;
                    }
                }
            }
        ]);
}());