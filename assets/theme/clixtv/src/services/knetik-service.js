(function() {
    var knetikService = [
        '$http',
        function($http) {
            return {
                getPoints: function() {
                    return $http.get('/api/knetik/get_balance')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('knetikService', knetikService);
}());