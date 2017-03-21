(function() {

    var videosService = [
        '$http',
        function($http) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getVideoById: function(id) {
                    return $http.get('/api/video/get_video_by_id/?id=' + id);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('videosService', videosService);
}());