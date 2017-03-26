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
                        url: '/charity/:id',
                        templateUrl: 'ui/charity/view.charity.html',
                        controller: 'CharityController'
                    })
                    .state('charities', {
                        url: '/charities',
                        templateUrl: 'ui/charity/view.charities.html',
                        controller: 'CharitiesController'
                    })
                    .state('stars', {
                        url: '/stars',
                        templateUrl: 'ui/stars/view.stars.html',
                        controller: 'StarsController'
                    })
                    .state('star', {
                        url: '/star/:id',
                        templateUrl: 'ui/stars/view.star.html',
                        controller: 'StarController'
                    })
                    .state('categories', {
                        url: '/categories',
                        templateUrl: 'ui/categories/view.categories.html',
                        controller: 'CategoriesController'
                    })
                    .state('offer', {
                        url: '/offer/:id',
                        templateUrl: 'ui/offer/view.offer.html',
                        controller: 'OfferController'
                    })
                    .state('account', {
                        url: '/account/:section',
                        templateUrl: 'ui/account/view.account.html',
                        controller: 'AccountController'
                    })
            }
        ])
        .run([
            'userService',
            function(userService) {
                userService.getLoggedInUser();
            }
        ]);
}());
