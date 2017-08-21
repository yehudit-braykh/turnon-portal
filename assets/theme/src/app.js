'use strict';
var turnOnApp = angular.module('turnon', ['ngRoute'])
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
        controller: 'newsfeedControler'
    })
    .when('/vod', {
        templateUrl: '/assets/theme/src/models/vod_page/vod.html',
        controller: 'vodControler'
    })
    .when('/mylist', {
        templateUrl: '/assets/theme/src/models/my_list/mylist.html',
        controller: 'mylistControler'
    })

    .otherwise({
        redirectTo: '/'
    });;
});
