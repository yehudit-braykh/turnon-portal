'use strict';
var vttApp = angular.module('vtt', ['ngRoute','ngTouch', 'ngAnimate'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
}]);
// Declare app level module which depends on views, and components

vttApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/assets/theme/vtt/html/pages/home.html',
        controller: 'homeController'
    });
});
