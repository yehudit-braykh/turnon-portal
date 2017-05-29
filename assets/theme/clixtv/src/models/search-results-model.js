(function() {
    angular
        .module('clixtv')
        .factory('SearchResultsModel', [
            'BrandModel',
            'CelebrityModel',
            'SeriesModel',
            'VideoModel',
            'OfferModel',
            'CharityModel',
            'CategoryModel',
            function(BrandModel, CelebrityModel, SeriesModel, VideoModel, OfferModel, CharityModel, CategoryModel) {
                return function(data) {

                    if (data.campaigns && data.campaigns.length > 0) {
                        this.brands = data.campaigns.map(function(campaign) {
                            return new BrandModel(campaign);
                        })
                    }

                    if (data.celebrities && data.celebrities.length > 0) {
                        this.celebrities = data.celebrities.map(function(celebrity) {
                            return new CelebrityModel(celebrity);
                        })
                    }

                    if (data.charities && data.charities.length > 0) {
                        this.charities = data.charities.map(function(charity) {
                            return new CharityModel(charity);
                        })
                    }

                    if (data.offers && data.offers.length > 0) {
                        this.offers = data.offers.map(function(offer) {
                            return new OfferModel(offer);
                        })
                    }

                    if (data.categories && data.categories.length > 0) {
                        this.categories = data.categories.map(function(category) {
                            return new CategoryModel(category);
                        })
                    }

                    if (data.videos && data.videos.length > 0) {
                        this.videos = data.videos.map(function(video) {
                            return new VideoModel(video);
                        })
                    }

                    if (data.series && data.series.length > 0) {
                        this.series = data.series.map(function(series) {
                            return new SeriesModel(series);
                        })
                    }

                    this.error = data.error;

                    if (data._id) {
                        var match;
                        switch(data.media_type) {
                            case 'campaign':
                            case 'brand':
                                match = new BrandModel(data);
                                break;
                            case 'category':
                                match = new CategoryModel(data);
                                break;
                            case 'offer':
                                match = new OfferModel(data);
                                break;
                            case 'charity':
                                match = new CharityModel(data);
                                break;
                            case 'celebrity':
                                match = new CelebrityModel(data);
                                break;
                        }
                        this.type = data.media_type;
                        this.match = match;
                    }
                }
            }
        ]);
}());