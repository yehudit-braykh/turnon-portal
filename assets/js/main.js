'use strict';
var vttApp = angular.module('vtt', ['ngRoute','ngAnimate'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
}]);
// Declare app level module which depends on views, and components

vttApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/assets/html/pages/home.html',
        controller: 'homeController'
    })
    .when('/Login', {
        templateUrl: '/assets/html/pages/login.html',
        controller: 'loginController'
    })
    .when('/Register', {
        templateUrl: '/assets/html/pages/register.html',
        controller: 'registerController'
    })
    .when('/Video/:videoId', {
        templateUrl: '/assets/html/pages/video.html',
        controller: 'videoController'
    })
    .when('/Video/Category/:categoryName', {
        templateUrl: '/assets/html/pages/video-category.html',
        controller: 'videoCategoryController'
    })
    .when('/Videos', {
        templateUrl: '/assets/html/pages/video-categories.html',
        controller: 'videoCategoriesController'
    })
    .when('/Peliculas', {
        templateUrl: '/assets/html/pages/peliculas.html',
        controller: 'peliculasController'
    })
    .when('/Pelicula/:PeliculaId', {
        templateUrl: '/assets/html/pages/pelicula.html',
        controller: 'peliculaController'
    })
    .when('/Karaoke', {
        templateUrl: '/assets/html/pages/karaoke.html',
        controller: 'karaokeController'
    })
    .when('/Karaoke/Singer/:singerId', {
        templateUrl: '/assets/html/pages/karaoke-singer.html',
        controller: 'karaokeSingerController'
    })
    .when('/Karaoke/Genre/:genreName', {
        templateUrl: '/assets/html/pages/karaoke-genre.html',
        controller: 'karaokeGenreController'
    })
    .when('/Programas', {
        templateUrl: '/assets/html/pages/programas.html',
        controller: 'programasController'
    })
    .when('/Programa/:ProgrmaId', {
        templateUrl: '/assets/html/pages/programa.html',
        controller: 'programaController'
    })
    .when('/Season/:episodeId', {
        templateUrl: '/assets/html/pages/season.html',
        controller: 'seasonController'
    })
    .when('/Canales Premium', {
        templateUrl: '/assets/html/pages/canales-premium.html',
        controller: 'canalesPremiumController'
    })
    .when('/Como Funciona', {
        templateUrl: '/assets/html/pages/como-funciona.html',
        controller: 'comoFuncionaController'
    })
    .when('/mi-cuenta', {
        templateUrl: '/assets/html/pages/account.html',
        controller: 'aController'
    })
    .otherwise({
        redirectTo: '/'
    });;
});
