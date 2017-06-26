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
            'ngSanitize',
            'angular-inview',
            '720kb.socialshare',
            'infinite-scroll',
            'ngclipboard'
        ])
        .constant('clixConfig', {

            // Different environments trigger different functionality through the
            // site. For example, no analytics will be sent unless we're in a
            // production environment.
            environment: window.ENVIRONMENT,

            // Swaps out logos and other components that are only available on the
            // beta version of the site
            beta: true,

            // Enable or disable points, changes all violators to reflect state
            pointsEnabled: false,

            // Enable or disable all sort and filter bars
            filtersEnabled: false,

            // Enable or disable all notifications
            notificationEnabled: false,

            // Base URL for API calls
            baseApi: (window.ENVIRONMENT === 'stage') ? 'http://52.43.246.138' : 'https://api.clixtv.com',

            // A non-logged in user will not be allowed to directly view any episodes
            // that are below this number
            lockedMinimumEpisodeNumber: 2,

            // API key for segment tracking
            segmentApiKey: 'YV8pmcoBPm8xF2ocBVwq6AxxoZXTn8rG',

            // Base URL for images
            baseImageUrl: 'https://advncedcdn.vo.llnwd.net/clixtv_prod_storage/static',

            cacheEnabled: (window.ENVIRONMENT === 'prod')
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
                $locationProvider.html5Mode(true);

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
                        url: '/video/:slug',
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
                        url: '/brand/:slug',
                        templateUrl: 'ui/brand/view.brand.html',
                        controller: 'BrandController'
                    })
                    .state('brand-offer', {
                        url: '/brand/:slug/offer/:offerSlug',
                        templateUrl: 'ui/brand/view.brand.html',
                        controller: 'BrandController'
                    })
                    .state('charity', {
                        url: '/charity/:slug?starId',
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
                        url: '/star/:slug',
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
                        url: '/category/:slug',
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
                    .state('terms-of-use', {
                        url: '/terms-of-use',
                        templateUrl: 'ui/terms-and-conditions/view.terms-and-conditions.html',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('privacy-policy', {
                        url: '/privacy-policy',
                        templateUrl: 'ui/privacy-policy/view.privacy-policy.html',
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
            'analyticsService',
            'clixConfig',
            function($rootScope, $window, userService, catchMediaService, educationModalService, modalService, analyticsService, clixConfig) {

                userService.setLoggedInUser();
                catchMediaService.initialize();
                educationModalService.initialize();
                analyticsService.initialize(clixConfig.segmentApiKey);

                $rootScope.pageTitle = 'ClixTV - Your Stars! Their Passions.';

                $rootScope.clixConfig = clixConfig;

                $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
                    $('html, body').animate({ scrollTop: 0 }, 200);
                    modalService.close();
                    $rootScope.printable = (to.data && to.data.print);
                    $rootScope.solidNavigation = (to.data && to.data.solidNavigation);
                    analyticsService.trackPageView(event, to, toParams, from, fromParams);
                });

                $rootScope.$on('user.login', function(event, data) {
                    if (data && (data.id || data._id)) {
                        catchMediaService.setUser(data.email, 'default', data);
                        analyticsService.identify((data.id || data._id), {
                            email: data.email,
                            avatar: data.avatar,
                            birthdate: data.birthdate,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            phone: data.phone,
                            gender: data.gender,
                            googleConnected: data.googleConnected,
                            tumblrConnected: data.tumblrConnected,
                            twitterConnected: data.twitterConnected,
                            facebookConnected: data.facebookConnected,
                            enableEmailNotifications: data.enableEmailNotifications,
                            enablePushNotifications: data.enablePushNotifications,
                            enableTextNotifications: data.enableTextNotifications
                        });
                    }
                });

                $rootScope.$on('user.logout', function(event, data) {
                    catchMediaService.deleteUser();
                });
            }
        ]);
}());
