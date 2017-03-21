(function() {
    var module = angular
        .module('clixtv', [
            'ngRoute',
            'slickCarousel'
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
                    .when('/video/:videoId', {
                        templateUrl: 'ui/video-permalink/view.video-permalink.html',
                        controller: 'VideoPermalinkController'
                    });
            }
        ]);


    angular.element(document).ready(function() {
        angular.bootstrap(document, ['clixtv']);
    });
}());
