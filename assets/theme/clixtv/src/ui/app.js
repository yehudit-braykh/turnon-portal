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
            'angular.filter',
            'ngTouch',
            'angular-cache',
            'lz-string',
            'ngSanitize'
        ])
        .constant('clixConfig', {

            // Swaps out logos and other components that are only available on the
            // beta version of the site
            beta: true,

            // Enable or disable points, changes all violators to reflect state
            pointsEnabled: false,

            // Enable or disable all sort and filter bars
            filtersEnabled: false,

            // Base URL for API calls
            baseApi: '//34.209.221.167',

            // A non-logged in user will not be allowed to directly view any episodes
            // that are below this number
            lockedMinimumEpisodeNumber: 2
        })
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
                $httpProvider.interceptors.push('apiInterceptor');

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
                        controller: 'VideoPermalinkController',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('brands', {
                        url: '/brands',
                        templateUrl: 'ui/brand/view.brands.html',
                        controller: 'BrandsController',
                        data: {
                            solidNavigation: true
                        }
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
                        url: '/charity/:id?starId',
                        templateUrl: 'ui/charity/view.charity.html',
                        controller: 'CharityController'
                    })
                    .state('charities', {
                        url: '/charities',
                        templateUrl: 'ui/charity/view.charities.html',
                        controller: 'CharitiesController',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('stars', {
                        url: '/stars',
                        templateUrl: 'ui/stars/view.stars.html',
                        controller: 'StarsController',
                        data: {
                            solidNavigation: true
                        }
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
                        controller: 'CategoriesController',
                        data: {
                            solidNavigation: true
                        }
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
                        },
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('contact', {
                        url: '/contact/:section',
                        templateUrl: 'ui/contact/view.contact-page.html',
                        controller: 'ContactPageController',
                        params: {
                            section: {
                                squash: true,
                                value: null
                            }
                        },
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('about', {
                        url: '/about',
                        templateUrl: 'ui/about/view.about-page.html',
                        controller: 'AboutPageController',
                        data: {
                            solidNavigation: true
                        }
                    })
            }
        ])
        .run([
            '$rootScope',
            '$window',
            'userService',
            'catchMediaService',
            'educationModalService',
            'modalService',
            function($rootScope, $window, userService, catchMediaService, educationModalService, modalService) {

                userService.setLoggedInUser();
                catchMediaService.initialize();
                educationModalService.initialize();

                $rootScope.pageTitle = 'ClixTV - Your Stars. Their Passions.';

                $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
                    $('html, body').animate({ scrollTop: 0 }, 200);
                    modalService.close();
                    $rootScope.printable = (to.data && to.data.print);
                    $rootScope.solidNavigation = (to.data && to.data.solidNavigation);
                });

                $rootScope.$on('user.login', function(event, data) {
                    if (data && (data.id || data._id)) {
                        catchMediaService.setUser(data.email, 'default', data);
                    }
                });

                $rootScope.$on('user.logout', function(event, data) {
                    catchMediaService.deleteUser();
                });
            }
        ]);
}());
