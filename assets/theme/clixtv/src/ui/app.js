(function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['clixtv']);
    });


    var module = angular
        .module('clixtv', [
            'slickCarousel',
            'ui.router',
            'duParallax',
            'ui.bootstrap'
        ])
        .config([
            '$locationProvider',
            '$httpProvider',
            '$stateProvider',
            '$urlRouterProvider',
            function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
                // $locationProvider.hashPrefix('!');
                // $httpProvider.defaults.useXDomain = true;
                // delete $httpProvider.defaults.headers.common['X-Requested-With'];

                // $locationProvider.html5Mode(true);
                $urlRouterProvider.when('', '/');

                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'ui/home/view.home.html',
                        controller: 'HomeController'
                    })
                    .state('video', {
                        url: '/video/:id',
                        templateUrl: 'ui/video-permalink/view.video-permalink.html',
                        controller: 'VideoPermalinkController'
                    })
                    .state('brands', {
                        url: '/brands',
                        templateUrl: 'ui/brand/view.brands.html',
                        controller: 'BrandsController'
                    })
                    .state('brand', {
                        url: '/brand/:slug',
                        templateUrl: 'ui/brand/view.brand.html',
                        controller: 'BrandController'
                    })
                    .state('charity', {
                        url: '/charity/:slug',
                        templateUrl: 'ui/charity/view.charity.html',
                        controller: 'CharityController'
                    });
            }
        ]);
}());
