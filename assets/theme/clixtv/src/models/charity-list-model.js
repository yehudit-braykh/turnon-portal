(function() {

    angular
        .module('clixtv')
        .factory('CharityListModel', [
            'CharityModel',
            function(CharityModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.charities = data.map(function(charity) {
                        return new CharityModel(charity);
                    });
                }
            }
        ]);
}());