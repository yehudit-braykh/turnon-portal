(function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['clixtv']);
    });


    var module = angular
        .module('clixtv', [
            'slickCarousel',
            'ui.router',
            'duParallax',
            'ui.bootstrap',
            'puElasticInput',
            'uiSwitch',
            'angularModalService',
            'LocalStorageModule',
            'ngMask',
            'angular.filter'
        ])
        .config([
            '$locationProvider',
            '$httpProvider',
            '$stateProvider',
            '$urlRouterProvider',
            'localStorageServiceProvider',
            function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {
                localStorageServiceProvider.setPrefix('clix');
                $urlRouterProvider.when('', '/');
                $urlRouterProvider.otherwise('/404');

                $stateProvider
                    .state('404', {
                        url: '/404',
                        templateUrl: 'ui/notfound/view.not-found.html',
                        controller: 'NotFoundController'
                    })
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
                        url: '/brand/:id',
                        templateUrl: 'ui/brand/view.brand.html',
                        controller: 'BrandController'
                    })
                    .state('brand-offer', {
                        url: '/brand/:id/offer/:offerId',
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
                        controller: 'StarController',
                        params: {
                            tab: 'video'
                        }
                    })
                    .state('categories', {
                        url: '/categories',
                        templateUrl: 'ui/categories/view.categories.html',
                        controller: 'CategoriesController'
                    })
                    .state('category', {
                        url: '/category/:id',
                        templateUrl: 'ui/categories/view.category.html',
                        controller: 'CategoryController'
                    })
                    .state('offer', {
                        url: '/offer/:id',
                        templateUrl: 'ui/offer/view.offer.html',
                        controller: 'OfferController'
                    })
                    .state('print-redeem-offer', {
                        url: '/offer/:id/redeem/print',
                        templateUrl: 'ui/offer/view.printable-redeem-offer.html',
                        controller: 'PrintableRedeemOfferController',
                        data: {
                            print: true
                        }
                    })
                    .state('account', {
                        url: '/account/:section',
                        templateUrl: 'ui/account/view.account.html',
                        controller: 'AccountController',
                        params: {
                            tab: ''
                        }
                    })
            }
        ])
        .run([
            '$rootScope',
            'userService',
            'catchMediaService',
            'educationModalService',
            function($rootScope, userService, catchMediaService, educationModalService) {

                userService.setLoggedInUser();
                catchMediaService.initialize();
                educationModalService.initialize();

                $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
                    $('html, body').animate({ scrollTop: 0 }, 200);
                    $rootScope.printable = to.data && to.data.print;
                });

                $rootScope.$on('user.login', function(event, data) {
                    if (data && data.id) {
                        catchMediaService.setUser(data.email, 'default', data);
                    }
                });

                $rootScope.$on('user.logout', function(event, data) {
                    catchMediaService.deleteUser();
                });
            }
        ]);
}());
