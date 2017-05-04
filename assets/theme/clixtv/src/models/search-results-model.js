(function() {
    angular
        .module('clixtv')
        .factory('SearchResultsModel', [
            'BrandListModel',
            'CelebrityListModel',
            'SeriesListModel',
            'VideoListModel',
            'OfferListModel',
            'CharityListModel',
            function(BrandListModel, CelebrityListModel, SeriesListModel, VideoListModel, OfferListModel, CharityListModel) {
                return function(data) {
                    this.brands = new BrandListModel(data.campaigns);
                    this.celebrities = new CelebrityListModel(data.celebrities);
                    this.series = new SeriesListModel(data.series);
                    this.videos = new VideoListModel(data.videos);
                    this.offers = new OfferListModel(data.offers);
                    this.charities = new CharityListModel(data.charities);
                }
            }
        ]);
}());