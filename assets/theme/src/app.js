'use strict';
var turnOnApp = angular.module('turnon', ['ngRoute', 'rzModule'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
}])

turnOnApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/assets/theme/src/models/home/home.html',
        controller: 'homeController'
    })
    .when('/newsfeed', {
        templateUrl: '/assets/theme/src/models/newsfeed/newsfeed.html',
        controller: 'newsfeedController'
    })
    .when('/vod', {
        templateUrl: '/assets/theme/src/models/vod_page/vod.html',
        controller: 'vodController'
    })
    .when('/mylist', {
        templateUrl: '/assets/theme/src/models/my_list/mylist.html',
        controller: 'mylistController'
    })
    .when('/discover', {
        templateUrl: '/assets/theme/src/models/discover/discover.html',
        controller: 'discoverController'
    })
    .when('/social', {
        templateUrl: '/assets/theme/src/models/social/social.html',
        controller: 'socialController'
    })
    .when('/market', {
        templateUrl: '/assets/theme/src/models/market/market.html',
        controller: 'marketController'
    })
    .otherwise({
        redirectTo: '/'
    });;
});
