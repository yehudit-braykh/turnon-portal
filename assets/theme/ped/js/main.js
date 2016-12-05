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
    });
});
