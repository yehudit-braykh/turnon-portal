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

    .otherwise({
        redirectTo: '/'
    });;
});

angular.module('turnon').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/video_block/video_block.html',
    "<div class=video_block_page><div class=\"col-xs-3 video_list_container\" ng-repeat=\"video in model\"><div class=video_list_image style=\"background-image: url('{{video.url_image}}')\"><div class=video_list_background></div><div class=video_logo style=\"background-image: url('{{video.url_logo}}')\"></div><div class=video_play_button></div><div class=video_points><div class=pin_icon></div><div class=points_num>{{video.points}}</div></div><div class=video_desc_hover><div class=\"col-xs-6 video_desc_title\">{{video.title}}</div><div class=\"col-xs-6 video_desc_share\"><div class=video_add_to_my_list></div><div class=video_share_button></div></div><div class=\"col-xs-12 video_desc_info\">{{video.description | limitTo: 100}}<span ng-if=\"video.description.length > 100\">[...]</span></div><div class=\"col-xs-12 video_desc_arrow\"></div></div></div></div></div>"
  );


  $templateCache.put('models/footer/footer.html',
    ""
  );


  $templateCache.put('models/header_page/header.html',
    "<div class=header_page ng-controller=headerController><nav class=\"navbar navbar-default\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1 aria-expanded=false><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button><div class=\"dropdown drop-hamburger\" ng-click=open-manu() href=#><i class=\"fa fa-bars\" id=dropdownMenu1 aria-hidden=true data-toggle=dropdown></i><ul class=dropdown-menu aria-labelledby=dropdownMenu1><li class=li-style><span>News Feed</span></li><li class=li-style><span>VOD</span></li><li class=li-style><span>Discover</span></li><li class=li-style><span>TOSocial</span></li><li class=li-style><span>Market Place</span></li><li class=li-style><span>Gain Points</span></li></ul></div><div class=navbar-brand></div></div><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><form class=\"navbar-form navbar-left\"><div class=form-group><input type=text class=form-control> <i class=\"fa fa-search\" id=dropdownMenu1 aria-hidden=true data-toggle=dropdown></i></div><div class=\"logout-token {{login==true ? 'loged-in':''}}\"></div></form><div ng-show=\"login==false\" ng-click=Signin() class=sign-in>sign in</div><div ng-show=\"login==true\" class=profile-cover><div class=profile-name>sds</div><div class=profile-image></div></div></div></div></nav></div>"
  );


  $templateCache.put('models/home/home.html',
    "<div class=\"container-fluid home_page\"><div class=\"col-xs-12 sport_list_container\"><div class=kinds_of_sports ng-repeat=\"sl in sportLogos\"><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_title></div></div></div><div class=\"col-xs-12 center_container\"><div class=\"col-xs-12 center_image\" style=\"background-image: url('assets/theme/src/images/bg/football-manch.png')\"><div class=center_play_button></div><div class=center_points><div class=points_icon></div><div class=points_number>500</div></div><div class=center_epg_container><div class=epg_type><div class=type_title>Soccer</div><div class=close_epg_button><div class=epg_button></div></div></div><div class=epg_now_container><div class=epg_now>NOW!</div><div class=epg_now_image style=\"background-image: url('assets/theme/src/images/logo/espn.png')\"></div><div class=epg_now_title>Champions League</div><div class=epg_now_description>Real Madrid - M.United</div><div class=epg_now_time>(49’ min)</div></div><div class=epg_events_title>Next Events</div><div class=epg_container><div class=epg_list style=\"height:{{epgList.length * 5}}vw\"><div class=epg_item ng-repeat=\"epg in epgList\"><div class=epg_info><div class=epg_title>{{epg.title}}</div><div class=epg_desc>{{epg.desc}}</div></div><div class=epg_logo><div class=epg_logo_image style=\"background-image: url('{{epg.url}}')\"></div></div></div></div></div></div></div></div><div class=\"col-xs-12 channels_container\"><div class=channel ng-repeat=\"channel in channels\"><div class=channel_logo style=\"background-image: url('{{channel.url}}')\"></div></div></div><div class=\"col-xs-12 content_container\"><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title orange title1\">GAIN POINTS!</div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 points_container\"><div class=\"col-xs-15 point\" ng-repeat=\"point in points\"><div class=point_logo style=\"background-image: url('{{point.url}}')\"></div><div class=point_logo_hover style=\"background-image: url('{{point.url_hover}}')\"></div><div class=point_title>{{point.title}}</div><div class=point_num>{{point.points}}</div><div class=point_desc>{{point.description}}</div><div class=point_button><button type=button class=\"btn get_points_button\">GET POINTS</button></div></div></div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title green title1\">NEWS FEED</div></div><div class=\"col-xs-3 video_list_container\" ng-repeat=\"video in videosList\"><div class=video_list_image style=\"background-image: url('{{video.url_image}}')\"><div class=video_list_background></div><div class=video_logo style=\"background-image: url('{{video.url_logo}}')\"></div><div class=video_play_button></div><div class=video_points><div class=pin_icon></div><div class=points_num>{{video.points}}</div></div><div class=video_desc_hover><div class=\"col-xs-6 video_desc_title\">{{video.title}}</div><div class=\"col-xs-6 video_desc_share\"><div class=video_add_to_my_list></div><div class=video_share_button></div></div><div class=\"col-xs-12 video_desc_info\">{{video.description | limitTo: 100}}<span ng-if=\"video.description.length > 100\">[...]</span></div><div class=\"col-xs-12 video_desc_arrow\"></div></div></div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title green title1\">TOSocial</div></div><div class=col-xs-12 style=\"padding: 0.5vw\"><div class=\"col-xs-15 social_list_container\" ng-repeat=\"social in socials\"><div class=\"social_list_image {{social.social}}\" style=\"background-image: url('{{social.url_image}}')\"><div class=social_desc><div class=\"col-xs-3 social_user_image\"><div class=user_image style=\"background-image: url('{{social.url_user_image}}')\"></div></div><div class=\"col-xs-3 social_title\">{{social.title}}</div><div class=\"col-xs-3 social_icon\"></div><div class=\"col-xs-3 social_time\">{{social.time}}</div></div></div></div></div></div></div>"
  );


  $templateCache.put('models/newsfeed/newsfeed.html',
    "<div class=newsfeed_page><div class=\"col-xs-12 news_feed_container\"></div><div class=newsfeed_contant_container><video-block data-model=videosList></video-block></div></div>"
  );

}]);

var ba=null
turnOnApp.directive('videoBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          limit: "=",
          order: "@",
          reverse: "=",
          link: "=",
          search: '='
      },
      controller: ['$scope', '$location', function videoBlockController($scope, $location) {
          ba = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/video_block/video_block.html',
    };
  })

var he = null;
turnOnApp.controller('headerController', function headerController ($scope, $location, $http, $log,$interval) {
    he=$scope;
    $scope.login = false;
    $scope.showfade = false;


    $scope.Signin = function(){

        $scope.login = true;
    }
    $scope.openmanu =  function () {
        $scope.showfade = true;
    }
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
                   url:'assets/theme/src/images/icon/share.png',
                   url_hover:'assets/theme/src/images/icon/share-white.png',
                   points: '150',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '},
                   {title:'Watch advertising',
                   url:'assets/theme/src/images/icon/combined-shape.png',
                   url_hover:'assets/theme/src/images/icon/combined-shape-white.png',
                   points: '300',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '},
                   {title:'Participate in a survey',
                   url:'assets/theme/src/images/icon/survey.png',
                   url_hover:'assets/theme/src/images/icon/survey-white.png',
                   points: '500',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '},
                   {title:'Download application',
                   url:'assets/theme/src/images/icon/phone.png',
                   url_hover:'assets/theme/src/images/icon/phone-white.png',
                   points: '250',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '},
                   {title:'Visit a sponsor page',
                   url:'assets/theme/src/images/icon/dollar-qoute.png',
                   url_hover:'assets/theme/src/images/icon/dollar-qoute-white.png',
                   points: '200',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '}];


 $scope.videosList = [{title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/1.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '150',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/2.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '300',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/3.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '500',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/4.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '250',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/1.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '200',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/2.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '500',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/3.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '250',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/4.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '200',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'}];

$scope.socials = [{title:'Frances Patton',
               url_image:'assets/theme/src/images/news/1.png',
               social:'facebook',
               url_user_image:'assets/theme/src/images/icon/profile.png',
               time:'33 min'},
               {title:'Frances Patton',
               url_image:'assets/theme/src/images/news/2.png',
               social:'twitter',
               url_user_image:'assets/theme/src/images/icon/profile.png',
               time:'33 min'},
               {title:'Frances Patton',
               url_image:'assets/theme/src/images/news/3.png',
               social:'instagram',
               url_user_image:'assets/theme/src/images/icon/profile.png',
               time:'33 min'},
               {title:'Frances Patton',
               url_image:'assets/theme/src/images/news/4.png',
               social:'facebook',
               url_user_image:'assets/theme/src/images/icon/profile.png',
               time:'33 min'},
               {title:'Frances Patton',
               url_image:'assets/theme/src/images/news/1.png',
               social:'twitter',
               url_user_image:'assets/theme/src/images/icon/profile.png',
               time:'33 min'},
               {title:'Frances Patton',
               url_image:'assets/theme/src/images/news/2.png',
               social:'instagram',
               url_user_image:'assets/theme/src/images/icon/profile.png',
               time:'33 min'},
              {title:'Frances Patton',
              url_image:'assets/theme/src/images/news/3.png',
              social:'facebook',
              url_user_image:'assets/theme/src/images/icon/profile.png',
              time:'33 min'},
              {title:'Frances Patton',
              url_image:'assets/theme/src/images/news/4.png',
              social:'twitter',
              url_user_image:'assets/theme/src/images/icon/profile.png',
              time:'33 min'},
              {title:'Frances Patton',
              url_image:'assets/theme/src/images/news/1.png',
              social:'instagram',
              url_user_image:'assets/theme/src/images/icon/profile.png',
              time:'33 min'},
              {title:'Frances Patton',
              url_image:'assets/theme/src/images/news/2.png',
              social:'instagram',
              url_user_image:'assets/theme/src/images/icon/profile.png',
              time:'33 min'}];

$scope.epgList = [{title:'Real Madrid - M.United',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/nfl-logo@2x.png'},
                {title:'AC Milan - Inter Milan',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/eurosport-logo.png'},
                {title:'FC Barcelona - Chelsea FC',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/espn.png'},
                {title:'Real Madrid - M.United',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/nfl-logo@2x.png'},
                {title:'AC Milan - Inter Milan',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/eurosport-logo.png'},
                {title:'FC Barcelona - Chelsea FC',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/espn.png'},
                {title:'Real Madrid - M.United',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/nfl-logo@2x.png'},
                {title:'AC Milan - Inter Milan',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/eurosport-logo.png'},
                {title:'FC Barcelona - Chelsea FC',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/espn.png'},
                {title:'Real Madrid - M.United',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/nfl-logo@2x.png'},
                {title:'AC Milan - Inter Milan',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/eurosport-logo.png'},
                {title:'FC Barcelona - Chelsea FC',
                desc: 'Wednesday 22.3.17, 21:30',
                url:'assets/theme/src/images/logo/espn.png'}];


});

var nf = null;
turnOnApp.controller('newsfeedControler', function newsfeedControler ($scope, $location, $http, $log,$interval) {
  nf = $scope;




 $scope.videosList = [{title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/1.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '150',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/2.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '300',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/3.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '500',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/4.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '250',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/1.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '200',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/2.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '500',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Download application',
                 url_image:'assets/theme/src/images/news/3.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '250',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Visit a sponsor page',
                 url_image:'assets/theme/src/images/news/4.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '200',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'}];


});
