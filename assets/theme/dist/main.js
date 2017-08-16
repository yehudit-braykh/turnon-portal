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

  $templateCache.put('models/header_page/header.html',
    "<div class=header_page ng-controller=headersController><nav class=\"navbar navbar-default\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1 aria-expanded=false><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button><div class=navbar-brand href=#>Brand</div></div><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><ul class=\"nav navbar-nav\"><li class=active><a href=#>Link <span class=sr-only>(current)</span></a></li><li><a href=#>Link</a></li><li class=dropdown><a href=# class=dropdown-toggle data-toggle=dropdown role=button aria-haspopup=true aria-expanded=false><span class=caret></span></a><ul class=dropdown-menu><li><a href=#>Action</a></li><li><a href=#>Another action</a></li><li><a href=#>Something else here</a></li><li role=separator class=divider></li><li><a href=#>Separated link</a></li><li role=separator class=divider></li><li><a href=#>One more separated link</a></li></ul></li></ul><form class=\"navbar-form navbar-left\"><div class=form-group><input type=text class=form-control placeholder=Search></div><button type=submit class=\"btn btn-default\">Submit</button></form><ul class=\"nav navbar-nav navbar-right\"><li><a href=#>Link</a></li><li class=dropdown><a href=# class=dropdown-toggle data-toggle=dropdown role=button aria-haspopup=true aria-expanded=false>Dropdown <span class=caret></span></a><ul class=dropdown-menu><li><a href=#>Action</a></li><li><a href=#>Another action</a></li><li><a href=#>Something else here</a></li><li role=separator class=divider></li><li><a href=#>Separated link</a></li></ul></li></ul></div></div></nav></div>"
  );


  $templateCache.put('models/home/home.html',
    "<div class=\"container-fluid home_page\"><div class=\"col-xs-12 sport_list_container\"><div class=kinds_of_sports ng-repeat=\"sl in sportLogos\"><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_title></div></div></div><div class=\"col-xs-12 center_container\"><div class=\"col-xs-12 center_image\" style=\"background-image: url('assets/theme/src/images/bg/football-manch.png')\"></div></div><div class=\"col-xs-12 channels_container\"><div class=channel ng-repeat=\"channel in channels\"><div class=channel_logo style=\"background-image: url('{{channel.url}}')\"></div></div></div><div class=\"col-xs-12 content_container\"><div class=\"col-xs-12 content_title title1\">GAIN POINTS!</div><div class=\"col-xs-12 points_container\"><div class=\"col-xs-15 point\" ng-repeat=\"point in points\"><div class=\"point_logo {{point.class}}\"></div></div></div></div></div>"
  );

}]);

var he = null;
turnOnApp.controller('headersController', function headerController ($scope, $location, $http, $log,$interval) {




});

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

   $scope.channels = [{title:'1',
                   url:'assets/theme/src/images/logo/espn_network.png'},
                   {title:'2',
                   url:'assets/theme/src/images/logo/espn_2.png'},
                   {title:'3',
                   url:'assets/theme/src/images/logo/nfl.png'},
                   {title:'4',
                   url:'assets/theme/src/images/logo/fox_sport.png'},
                   {title:'5',
                   url:'assets/theme/src/images/logo/euro_sport.png'},
                   {title:'6',
                   url:'assets/theme/src/images/logo/espn_network.png'},
                   {title:'7',
                   url:'assets/theme/src/images/logo/nfl.png'}];

   $scope.points = [{title:'Share with friends',
                   class:'icon-share',
                   points: '150'},
                   {title:'Watch advertising',
                   class:'icon-combined-shape',
                   points: '300'},
                   {title:'Participate in a survey',
                   class:'icon-twitter',
                   points: '500'},
                   {title:'Download application',
                   class:'icon-flaticon',
                   points: '250'},
                   {title:'Visit a sponsor page',
                   class:'icon-dollar-qoute',
                   points: '200'}];


});
