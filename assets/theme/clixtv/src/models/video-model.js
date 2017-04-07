(function() {

    angular
        .module('clixtv')
        .factory('VideoModel', [
            '$injector',
            'CelebrityModel',
            'BrandListModel',
            'CharityModel',
            function($injector, CelebrityModel, BrandListModel, CharityModel) {
                return function(data) {

                    console.log(data);

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.seriesTitle = data.serie_title; // ...spelling?
                    this.episodeNumber = data.episode_number;

                    if (data.celebrity) {
                        this.celebrity = new CelebrityModel(data.celebrity);
                    }

                    if (data.brands) {
                        this.brands = new BrandListModel(data.brands);
                    }

                    if (data.charity) {
                        this.charity = new CharityModel(data.charity);
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

                    if (data.content.HLSStream) {
                        this.streamUrl = data.content.HLSStream.downloadUrl;
                    } else if (data.content.MezzanineVideo) {
                        this.streamUrl = data.content.MezzanineVideo.downloadUrl;
                    }
                }
            }
        ]);
}());