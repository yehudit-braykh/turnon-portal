'use strict';
var module = angular.module('turnon', ['ngRoute','ngAnimate','ngAria','ngMaterial'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
}])

.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/assets/html/pages/home.html',
        controller: 'homeController'
    })
    
    .otherwise({
        redirectTo: '/'
    });;
});
