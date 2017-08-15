(function() {

    angular
        .module('turnon')
        .factory('CharityListModel', [
            'CharityModel',
            function(CharityModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.charities = data.map(function(charity) {
                        if (typeof charity === 'string') {
                            return {
                                id: charity
                            };
                        }
                        return new CharityModel(charity);
                    });
                }
            }
        ]);
}());
