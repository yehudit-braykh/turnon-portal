(function() {

    var celebrityService = [
        '$http',
        function($http) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCelebrities: function() {
                    return $http.get('/api/celebrity/get_all_celebrities')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCelebrityById: function(id) {
                    return $http.get('/api/celebrity/get_celebrity?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data[0];
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('celebrityService', celebrityService);
}());