'use strict';
var peruDigitalApp = angular.module('peruDigital', ['ngRoute','ngTouch', 'ngAnimate'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
}]);
// Declare app level module which depends on views, and components

peruDigitalApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/assets/theme/ped/html/pages/home.html',
        controller: 'homeController'
    })
    .when('/category/:categoryName', {
        templateUrl: '/assets/theme/ped/html/pages/category.html',
        controller: 'categoryController'
    })
    .when('/celebrities', {
        templateUrl: '/assets/theme/ped/html/pages/celebrities.html',
        controller: 'celebritiesController'
    })
    .when('/celebrity/:celebrityName', {
        templateUrl: '/assets/theme/ped/html/pages/celebrity.html',
        controller: 'celebrityController'
    })
    .when('/video/:videoId', {
        templateUrl: '/assets/theme/ped/html/pages/video.html',
        controller: 'videoController'
    })
    .when('/account/:sectionName', {
        templateUrl: '/assets/theme/ped/html/pages/account.html',
        controller: 'accountController'
    })
    .when('/lottery', {
        templateUrl: '/assets/theme/ped/html/pages/lottery.html',
        controller: 'lotteryController'
    })
    .when('/survey', {
        templateUrl: '/assets/theme/ped/html/pages/syrvey.html',
        controller: 'surveyController'
    });
});
