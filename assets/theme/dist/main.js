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

angular.module('turnon').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('models/home/home.html',
    "<div class=\"container-fluid home_page\"><div class=\"col-xs-12 sport_list_container\"><div class=kinds_of_sports ng-repeat=\"sl in sportLogos\"><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_title></div></div></div><div class=\"col-xs-12 center_container\"><div class=\"col-xs-12 center_image\" style=\"background-image: url('assets/theme/src/images/bg/football-manch.png')\"></div></div><div class=\"col-xs-12 channels_container\"></div></div>"
  );

}]);

var h = null;
turnOnApp.controller('homeController', function homeController ($scope, $location, $http, $log,$interval) {
  h = $scope;

  $scope.sportLogos = [{title:'Soccer',
                  url:'assets/theme/src/images/sport/1_gray.png'},
                  {title:'American football',
                  url:'assets/theme/src/images/sport/2_gray.png'},
                  {title:'American football_3',
                  url:'assets/theme/src/images/sport/3_gray.png'},
                  {title:'American football_4',
                  url:'assets/theme/src/images/sport/4_gray.png'},
                  {title:'American football_5',
                  url:'assets/theme/src/images/sport/5_gray.png'},
                  {title:'American football_6',
                  url:'assets/theme/src/images/sport/6_gray.png'},
                  {title:'American football_7',
                  url:'assets/theme/src/images/sport/7_gray.png'},
                  {title:'American football_8',
                  url:'assets/theme/src/images/sport/8_gray.png'},
                  {title:'American footbal_9',
                  url:'assets/theme/src/images/sport/9_gray.png'},
                  {title:'Golf',
                  url:'assets/theme/src/images/sport/10_gray.png'},
                  {title:'American football_11',
                  url:'assets/theme/src/images/sport/11_gray.png'},
                  {title:'American footbal_12',
                  url:'assets/theme/src/images/sport/12_gray.png'},
                  {title:'American football_13',
                  url:'assets/theme/src/images/sport/13_gray.png'},
                  {title:'American football_14',
                  url:'assets/theme/src/images/sport/14_gray.png'},
                  {title:'American football_15',
                  url:'assets/theme/src/images/sport/15_gray.png'},
                  {title:'American football_16',
                   url:'assets/theme/src/images/sport/16_gray.png'}];


});
