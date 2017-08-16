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

    .otherwise({
        redirectTo: '/'
    });;
});
