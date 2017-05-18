(function() {

    var apiInterceptor = [
        function() {
            var service = this;
            service.request = function(config) {
                return config;
            };
            service.responseError = function(response) {
                console.log(response);
                return response;
            };
        }
    ];

    angular
        .module('clixtv')
        .service('apiInterceptor', apiInterceptor);
}());