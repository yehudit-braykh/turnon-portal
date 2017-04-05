(function() {

    angular
        .module('clixtv')
        .factory('SeasonListModel', [
            'SeasonModel',
            function(SeasonModel) {
                return function(data) {
                    this.seasons = data.map(function(season) {
                        return new SeasonModel(season);
                    });
                }
            }
        ]);
}());