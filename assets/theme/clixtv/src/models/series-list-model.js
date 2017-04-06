(function() {

    angular
        .module('clixtv')
        .factory('SeriesListModel', [
            'SeriesModel',
            function(SeriesModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.series = data.map(function(series) {
                        return new SeriesModel(series);
                    });
                }
            }
        ]);
}());