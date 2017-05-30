(function() {

    angular
        .module('clixtv')
        .factory('SeriesModel', [
            '$injector',
            'SeasonListModel',
            function($injector, SeasonListModel) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;

                    if (data.seasons) {
                        this.seasons = new SeasonListModel(data.seasons);
                    }

                    if (data.campaigns) {
                        var BrandListModel = $injector.get('BrandListModel');
                        this.brands = new BrandListModel(data.campaigns);
                    }

                    if (data.charity) {
                        console.log('>>>>', data.charity);
                        var CharityModel = $injector.get('CharityModel');
                        this.charity = new CharityModel(data.charity);
                    }
                }
            }
        ]);
}());