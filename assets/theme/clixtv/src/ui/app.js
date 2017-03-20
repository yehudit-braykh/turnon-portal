(function() {
    var module = angular
        .module('clixtv', [
            'ngRoute'
        ])
        .config([
            '$locationProvider',
            '$routeProvider',
            '$httpProvider',
            function($locationProvider, $routeProvider, $httpProvider) {
                $locationProvider.hashPrefix('!');
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $routeProvider
                    .when('/', {
                        templateUrl: 'ui/home/view.home.html',
                        controller: 'HomeController'
                    })
            }
        ]);


    angular.element(document).ready(function() {
        angular.bootstrap(document, ['clixtv']);
    });
}());
