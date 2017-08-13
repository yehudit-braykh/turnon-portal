'use strict';
var turnOnApp = angular.module('turnOn', ['ngRoute','ngAnimate'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
}]);

turnOnApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/assets/html/pages/home.html',
        controller: 'homeController'
    })
    .otherwise({
        redirectTo: '/'
    });;
});
