(function() {

    var shareService = [
        '$http',
        function($http) {
            return {

                postToTwitter: function(message, link, picture) {
                    return $http.post('/api/social/Twitter', {
                        message: message,
                        link: link,
                        picture: picture
                    });
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('shareService', shareService);
}());