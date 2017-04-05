(function() {

    angular
        .module('clixtv')
        .factory('SeriesModel', [
            'SeasonListModel',
            function(SeasonListModel) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;

                    if (data.seasons) {
                        this.seasons = new SeasonListModel(data.seasons);
                    }
                }
            }
        ]);
}());