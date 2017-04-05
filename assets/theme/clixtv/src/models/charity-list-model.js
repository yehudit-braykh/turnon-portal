(function() {

    angular
        .module('clixtv')
        .factory('CharityListModel', [
            'CharityModel',
            function(CharityModel) {
                return function(data) {
                    this.charities = data.map(function(charity) {
                        return new CharityModel(charity);
                    });
                }
            }
        ]);
}());