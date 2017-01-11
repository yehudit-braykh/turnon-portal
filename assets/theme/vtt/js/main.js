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
    })
    .when('/Television Gratis', {
        templateUrl: '/assets/theme/vtt/html/pages/television-gratis.html',
        controller: 'televisionGratisController'
    })
    .when('/Video/:videoId', {
        templateUrl: '/assets/theme/vtt/html/pages/video.html',
        controller: 'videoController'
    })
    .when('/Video/Category/:categoryName', {
        templateUrl: '/assets/theme/vtt/html/pages/video-category.html',
        controller: 'videoCategoryController'
    })
    .when('/Videos', {
        templateUrl: '/assets/theme/vtt/html/pages/video-categories.html',
        controller: 'videoCategoriesController'
    })
    .when('/Peliculas', {
        templateUrl: '/assets/theme/vtt/html/pages/peliculas.html',
        controller: 'peliculasController'
    })
    .when('/Pelicula/:PeliculaId', {
        templateUrl: '/assets/theme/vtt/html/pages/pelicula.html',
        controller: 'peliculaController'
    })
    .when('/Karaoke', {
        templateUrl: '/assets/theme/vtt/html/pages/karaoke.html',
        controller: 'karaokeController'
    })
    .when('/Karaoke/Singer/:singerId', {
        templateUrl: '/assets/theme/vtt/html/pages/karaoke-singer.html',
        controller: 'karaokeSingerController'
    })
    .when('/Karaoke/Genre/:genreName', {
        templateUrl: '/assets/theme/vtt/html/pages/karaoke-genre.html',
        controller: 'karaokeGenreController'
    })
    .when('/Programas', {
        templateUrl: '/assets/theme/vtt/html/pages/programas.html',
        controller: 'programasController'
    })
    .when('/Programa/:ProgrmaId', {
        templateUrl: '/assets/theme/vtt/html/pages/programa.html',
        controller: 'programaController'
    })
    .when('/Season/:episodeId', {
        templateUrl: '/assets/theme/vtt/html/pages/season.html',
        controller: 'seasonController'
    })
    .when('/Canales Premium', {
        templateUrl: '/assets/theme/vtt/html/pages/canales-premium.html',
        controller: 'canalesPremiumController'
    })
    .when('/Como Funciona', {
        templateUrl: '/assets/theme/vtt/html/pages/como-funciona.html',
        controller: 'comoFuncionaController'
    })
    .otherwise({
        redirectTo: '/'
    });;
});
