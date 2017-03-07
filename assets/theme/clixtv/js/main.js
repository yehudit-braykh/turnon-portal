'use strict';
var clixApp = angular.module('clixApp', ['ngRoute','ngTouch', 'ngAnimate', 'oi.select'])
.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
}]);
// Declare app level module which depends on views, and components

clixApp.config(function($routeProvider, $locationProvider, $httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $routeProvider
    .when('/', {
        templateUrl: '/assets/theme/clixtv/html/pages/home.html',
        controller: 'homeController'
    })
    .when('/about', {
        templateUrl: '/assets/theme/clixtv/html/pages/about.html',
        controller: 'aboutController'
    })
    .when('/account/:accountPage', {
        templateUrl: '/assets/theme/clixtv/html/pages/account.html',
        controller: 'accountController'
    })
    .when('/categories', {
        templateUrl: '/assets/theme/clixtv/html/pages/categories.html',
        controller: 'categoriesController'
    })
    .when('/category/:categoryName', {
        templateUrl: '/assets/theme/clixtv/html/pages/category.html',
        controller: 'categoryController'
    })
    .when('/charity/:charityName', {
        templateUrl: '/assets/theme/clixtv/html/pages/charity.html',
        controller: 'charityController'
    })
    .when('/charities/', {
        templateUrl: '/assets/theme/clixtv/html/pages/charities.html',
        controller: 'charitiesController'
    })
    .when('/celebrity/:celebId', {
        templateUrl: '/assets/theme/clixtv/html/pages/celebrity.html',
        controller: 'celebrityController'
    })
    .when('/celebrities', {
        templateUrl: '/assets/theme/clixtv/html/pages/celebrities.html',
        controller: 'celebritiesController'
    })
    .when('/coupon', {
        templateUrl: '/assets/theme/clixtv/html/pages/coupon.html',
        controller: 'couponController'
    })
    .when('/offers', {
        templateUrl: '/assets/theme/clixtv/html/pages/offers.html',
        controller: 'offersController'
    })
    .when('/brand/:brandName', {
        templateUrl: '/assets/theme/clixtv/html/pages/brand.html',
        controller: 'brandController'
    })
    .when('/offer/:offerName', {
        templateUrl: '/assets/theme/clixtv/html/pages/offer.html',
        controller: 'offerController'
    })
    .when('/video/:videoId', {
        templateUrl: '/assets/theme/clixtv/html/pages/video.html',
        controller: 'videoController'
    });
});
