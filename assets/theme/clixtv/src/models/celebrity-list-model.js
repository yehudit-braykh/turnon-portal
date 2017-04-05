(function() {
    angular
        .module('clixtv')
        .factory('CelebrityListModel', [
            'CelebrityModel',
            function(CelebrityModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.celebrities = data.map(function(celebrity) {
                        return new CelebrityModel(celebrity);
                    });
                }
            }
        ]);
}());