(function() {

    angular
        .module('turnon')
        .factory('SeasonListModel', [
            'SeasonModel',
            function(SeasonModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.seasons = data.map(function(season) {
                        return new SeasonModel(season);
                    });
                }
            }
        ]);
}());
