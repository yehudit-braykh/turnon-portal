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
        controller: 'newsfeedController'
    })
    .when('/vod', {
        templateUrl: '/assets/theme/src/models/vod_page/vod.html',
        controller: 'vodController'
    })
    .when('/mylist', {
        templateUrl: '/assets/theme/src/models/my_list/mylist.html',
        controller: 'mylistController'
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


  $templateCache.put('directives/vod_block/vod_block.html',
    "<div class=vod_block_page><div class=\"col-xs-15 vod_list_container\" ng-repeat=\"video in model\"><div class=vod_list_image style=\"background-image: url('{{video.url_image}}')\"><div class=video_list_background></div><div class=video_logo style=\"background-image: url('{{video.url_logo}}')\"></div><div class=video_play_button></div><div class=video_points><div class=pin_icon></div><div class=points_num>{{video.points}}</div></div></div><div class=vod_info_section><div class=\"vod_header col-xs-6\">{{video.title}}</div><div class=\"vod_icons col-xs-6\"><div class=add_to_list style=\"background-image: url('/assets/theme/src/images/icon/add_to_list@2x.png')\"></div><div class=share style=\"background-image: url('/assets/theme/src/images/icon/shape.png')\"></div></div><div class=\"vod_desc col-xs-12\">{{video.description | limitTo: 100}}</div></div></div></div>"
  );


  $templateCache.put('models/footer/footer.html',
    ""
  );


  $templateCache.put('models/header_page/header.html',
    "<div class=header_page ng-controller=headerController><nav class=\"navbar navbar-default\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1 aria-expanded=false><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button><div class=\"dropdown drop-hamburger\" ng-click=open-manu() href=#><i class=\"fa fa-bars\" id=dropdownMenu1 aria-hidden=true data-toggle=dropdown></i><ul class=dropdown-menu aria-labelledby=dropdownMenu1><li class=li-style><span>News Feed</span></li><li class=li-style><span>VOD</span></li><li class=li-style><span>Discover</span></li><li class=li-style><span>TOSocial</span></li><li class=li-style><span>Market Place</span></li><li class=li-style><span>Gain Points</span></li></ul></div><div class=navbar-brand></div></div><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><form class=\"navbar-form navbar-left\"><div class=form-group><input type=text class=form-control> <i class=\"fa fa-search\" id=dropdownMenu1 aria-hidden=true data-toggle=dropdown></i></div><div class=\"logout-token {{login==true ? 'loged-in':''}}\"></div></form><div ng-show=\"login==false\" ng-click=Signin() class=sign-in>sign in</div><div ng-show=\"login==true\" class=profile-cover><div class=profile-name>sds</div><div class=profile-image></div></div></div></div></nav></div>"
  );


  $templateCache.put('models/home/home.html',
    "<div class=\"container-fluid home_page\"><div class=\"col-xs-12 sport_list_container\"><div class=\"kinds_of_sports {{activeSport.id == sl.id?'active':''}}\" ng-repeat=\"sl in sports\" ng-click=getActiveSport(sl);><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_logo_hover style=\"background-image: url('{{sl.url_hover}}')\"></div><div class=sport_title>{{sl.title}}</div></div></div><div class=\"col-xs-12 center_container\"><div class=\"col-xs-12 center_image\" style=\"background-image: url('assets/theme/src/images/bg/football-manch.png')\"><div class=center_play_button></div><div class=center_points><div class=points_icon></div><div class=points_number>500</div></div><div class=epg_channel_logo style=\"background-image: url('assets/theme/src/images/logo/espn.png')\"></div><div class=center_epg_container><div class=epg_type><div class=type_title>Soccer</div><div class=close_epg_button><div class=epg_button></div></div></div><div class=epg_now_container><div class=epg_now>NOW!</div><div class=epg_now_image style=\"background-image: url('assets/theme/src/images/logo/espn.png')\"></div><div class=epg_now_title>Champions League</div><div class=epg_now_description>Real Madrid - M.United</div><div class=epg_now_time>(49’ min)</div></div><div class=epg_events_title>Next Events</div><div class=epg_container><div class=epg_list style=\"height:{{epgList.length * 5}}vw\"><div class=epg_item ng-repeat=\"epg in epgList\" ng-click=getPurchaseEvent(epg);><div class=epg_info><div class=epg_title>{{epg.title}}</div><div class=epg_desc>{{epg.desc}}</div></div><div class=epg_logo><div class=epg_logo_image style=\"background-image: url('{{epg.url}}')\"></div></div></div></div></div></div></div></div><div class=\"col-xs-12 channels_container\"><div class=channel ng-repeat=\"channel in channels\"><div class=channel_logo style=\"background-image: url('{{channel.url}}')\"></div><div class=channel_background></div></div></div><div class=\"col-xs-12 content_container\"><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title orange title1\">GAIN POINTS!</div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 points_container\"><div class=\"col-xs-15 point\" ng-repeat=\"point in points\"><div class=point_logo style=\"background-image: url('{{point.url}}')\"></div><div class=point_logo_hover style=\"background-image: url('{{point.url_hover}}')\"></div><div class=point_title>{{point.title}}</div><div class=point_num>{{point.points}}</div><div class=point_desc>{{point.description}}</div><div class=point_button><button type=button class=\"btn get_points_button\">GET POINTS</button></div></div></div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div id=carousel_home_page class=\"carousel slide\" data-ride=carousel><ol class=carousel-indicators><li data-target=#carousel_home_page data-slide-to=0 class=active></li><li data-target=#carousel_home_page data-slide-to=1></li><li data-target=#carousel_home_page data-slide-to=2></li><li data-target=#carousel_home_page data-slide-to=3></li><li data-target=#carousel_home_page data-slide-to=4></li></ol><div class=carousel-inner role=listbox><div class=\"item {{$index == 0?'active':''}}\" ng-repeat=\"point in points track by $index\"><div class=item_content style=\"background-image: url('assets/theme/src/images/bg/points_bg@2x.png')\"><div class=item_background><div class=carousel_point_title>{{point.title}}</div><div class=carousel_point_num><div class=pin_icon></div><div class=points_num>{{point.points}}</div></div><div class=carousel_point_desc>{{point.description}}</div><div class=carousel_point_button><button type=button class=\"btn points_button\" ng-click=getPointsModal(point);>GET POINTS</button></div></div></div></div></div></div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title green title1\">NEWS FEED</div></div><div class=\"col-xs-3 video_list_container {{currentVideo.id == video.id?'active':''}}\" ng-repeat=\"video in videosList\"><div class=video_list_image style=\"background-image: url('{{video.url_image}}')\"><div class=video_list_background></div><div class=video_logo style=\"background-image: url('{{video.url_logo}}')\"></div><div class=video_play_button></div><div class=video_points><div class=pin_icon></div><div class=points_num>{{video.points}}</div></div><div class=video_desc_hover><div class=\"col-xs-6 video_desc_title\">{{video.title}}</div><div class=\"col-xs-6 video_desc_share\"><div class=video_add_to_my_list></div><div class=video_share_button></div></div><div class=\"col-xs-12 video_desc_info\">{{video.description | limitTo: 100}}<span ng-if=\"video.description.length > 100\">[...]</span></div><div class=\"col-xs-12 video_desc_arrow\" ng-click=getFullDescription(video);></div></div></div><div class=video_aroow_green></div></div><div ng-if=currentVideo.id class=\"col-xs-12 video_full_desc_container\"><div class=\"col-xs-4 full_desc_info\"><div class=\"col-xs-12 full_desc_title\">{{currentVideo.title}}</div><div class=\"col-xs-12 full_desc_text\">{{currentVideo.description}}</div><div class=\"col-xs-12 full_desc_desc_share\"><div class=full_desc_add_to_my_list></div><div class=full_desc_share_button></div></div></div><div class=\"col-xs-8 full_desc_image\" style=\"background-image: url('{{currentVideo.url_image}}')\"><div class=full_desc_background></div><div class=full_desc_logo style=\"background-image: url('{{currentVideo.url_logo}}')\"></div><div class=full_desc_play_button></div><div class=full_desc_points><div class=pin_icon></div><div class=points_num>{{currentVideo.points}}</div></div></div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title green title1\">TOSocial</div></div><div class=col-xs-12 style=\"padding: 0.5vw\"><div class=\"col-xs-15 social_list_container\" ng-repeat=\"social in socials\"><div class=\"social_list_image {{social.social}}\" style=\"background-image: url('{{social.url_image}}')\"><div class=social_desc><div class=\"col-xs-3 social_user_image\"><div class=user_image style=\"background-image: url('{{social.url_user_image}}')\"></div></div><div class=\"col-xs-3 social_title\">{{social.title}}</div><div class=\"col-xs-3 social_icon\"></div><div class=\"col-xs-3 social_time\">{{social.time}}</div></div></div></div></div></div></div><div class=\"modal fade\" id=home_epg_modal tabindex=-1 role=dialog><div class=modal-dialog role=document><div class=modal-content><div class=modal-body><div class=close_section><div class=close_button data-dismiss=modal aria-label=Close></div></div><div class=modal_header_section><div class=modal_logo style=\"background-image: url('{{purchaseEvent.url}}')\"></div><div class=modal_time_info><div class=modal_organization style=\"background-image: url('assets/theme/src/images/logo/uefa.png')\"></div><div class=modal_date>22 March 2017</div></div><div class=modal_points><div class=points_logo></div><div class=points_num>150</div></div></div><div class=modal_center_section><div class=modal_title>{{purchaseEvent.title}}</div><div class=modal_description>With easy access to Broadband and DSL the number of people</div><div class=modal_time><div class=time_block><div class=time_item><div class=time_num>00</div><div class=time_desc>days</div></div><div class=time_item><div class=time_num>18</div><div class=time_desc>hours</div></div><div class=time_item><div class=time_num>23</div><div class=time_desc>mins</div></div><div class=time_item><div class=time_num>49</div><div class=time_desc>sec</div></div></div></div><div class=modal_button><button type=button class=\"btn purchase_button\">purchase</button></div></div></div></div></div></div><div class=\"modal fade\" id=home_points_modal tabindex=-1 role=dialog><div class=modal-dialog role=document><div class=modal-content><div class=modal-body><div class=close_section><div class=close_button data-dismiss=modal aria-label=Close></div></div><div class=modal_center_section><div class=modal_title>earn more points!</div><div class=modal_description>Share with friends</div><div class=modal_social><div class=social_block><div class=\"social_item facebook\"></div><div class=\"social_item instagram\"></div><div class=\"social_item twitter\"></div></div></div><div class=modal_video_content><div class=modal_video_image style=\"background-image: url('assets/theme/src/images/news/3.png')\"><div class=video_background></div><div class=video_title>The Benefits And Drawbacks</div><div class=video_play_button></div><div class=video_points><div class=pin_icon></div><div class=points_num>300</div></div></div></div><div class=modal_button><button type=button class=\"btn points_button\">share now</button></div></div></div></div></div></div>"
  );


  $templateCache.put('models/my_list/mylist.html',
    "<div class=mylist_page><div class=\"page_container row\"><div class=\"col-xs-12 mylist_container\"><div class=mylist_brand style=\"background-image: url('/assets/theme/src/images/headers/mylist.png')\"></div></div></div></div>"
  );


  $templateCache.put('models/newsfeed/newsfeed.html',
    "<div class=newsfeed_page><div class=\"page_container row\"><div class=\"col-xs-12 news_feed_container\"><div class=newsfeed-brand style=\"background-image: url('/assets/theme/src/images/headers/group-8-copy.png')\"></div></div><div class=contant_container><div id=myCarousel class=\"col-xs-12 carousel slide\" data-ride=carousel><ol class=carousel-indicators><li data-target=#myCarousel data-slide-to=0 class=active></li><li data-target=#myCarousel data-slide-to=1></li><li data-target=#myCarousel data-slide-to=2></li></ol><div class=carousel-inner><div class=\"item active\"><div class=right_div><div class=carousel-image style=\"background-image: url('/assets/theme/src/images/news/rectangle-12-copy-13.png')\"><div class=logo style=\"background-image: url('/assets/theme/src/images/logo/nfl-logo@2x.png')\"></div><div class=play_button style=\"background-image: url('/assets/theme/src/images/icon/play.png')\"></div><div class=full_desc_points><div class=pin_icon style=\"background-image: url('/assets/theme/src/images/icon/pin-icon-yellow.png')\"></div><div class=points_num>200</div></div></div><div class=gradient></div></div><div class=left_div><div class=headline>RAFAEL NADAL MAKING THE RIGHT MOVE</div><div class=description>The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.</div><div class=full_desc_share><div class=full_desc_add_to_my_list style=\"background-image: url('/assets/theme/src/images/icon/add_to_list@2x.png')\"></div><div class=full_desc_share_button style=\"background-image: url('/assets/theme/src/images/icon/shape.png')\"></div></div></div></div><div class=item><div class=right_div><div class=carousel-image style=\"background-image: url('/assets/theme/src/images/news/rectangle-12-copy-13.png')\"><div class=logo style=\"background-image: url('/assets/theme/src/images/logo/nfl-logo@2x.png')\"></div><div class=play_button style=\"background-image: url('/assets/theme/src/images/icon/play.png')\"></div><div class=full_desc_points style=\"background-image: url('/assets/theme/src/images/icon/pin-icon-yellow.png')\"><div class=pin_icon></div><div class=points_num>200</div></div></div><div class=gradient></div></div><div class=left_div><div class=headline>RAFAEL NADAL MAKING THE RIGHT MOVE</div><div class=description>The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.</div><div class=full_desc_share><div class=full_desc_add_to_my_list style=\"background-image: url('/assets/theme/src/images/icon/add_to_list@2x.png')\"></div><div class=full_desc_share_button style=\"background-image: url('/assets/theme/src/images/icon/shape.png')\"></div></div></div></div><div class=item><div class=right_div><div class=carousel-image style=\"background-image: url('/assets/theme/src/images/news/rectangle-12-copy-13.png')\"><div class=logo style=\"background-image: url('/assets/theme/src/images/logo/nfl-logo@2x.png')\"></div><div class=play_button style=\"background-image: url('/assets/theme/src/images/icon/play.png')\"></div><div class=full_desc_points><div class=pin_icon style=\"background-image: url('/assets/theme/src/images/icon/pin-icon-yellow.png')\"></div><div class=points_num>200</div></div></div><div class=gradient></div></div><div class=left_div><div class=headline>RAFAEL NADAL MAKING THE RIGHT MOVE</div><div class=description>The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.</div><div class=full_desc_share><div class=full_desc_add_to_my_list style=\"background-image: url('/assets/theme/src/images/icon/add_to_list@2x.png')\"></div><div class=full_desc_share_button style=\"background-image: url('/assets/theme/src/images/icon/shape.png')\"></div></div></div></div></div></div><div class=\"newsfeed_header col-xs-12\">today’s top stories</div><div class=\"newsfeed_contant_container col-xs-12\"><video-block data-model=videosList></video-block></div><div class=\"newsfeed_header col-xs-12\">yesterday’s top stories</div><div class=\"newsfeed_contant_container col-xs-12\"><video-block data-model=videosList></video-block></div><div class=\"newsfeed_header col-xs-12\">older stories<div class=arrow style=\"background-image: url('/assets/theme/src/images/icon/triangle.png')\"></div></div></div></div></div>"
  );


  $templateCache.put('models/vod_page/vod.html',
    "<div class=\"vod_page row\"><div class=\"col-xs-12 sport_list_container\"><div class=\"kinds_of_sports {{activeSport.id == sl.id?'active':''}}\" ng-repeat=\"sl in sports\" ng-click=getActiveSport(sl);><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_logo_hover style=\"background-image: url('{{sl.url_hover}}')\"></div><div class=sport_title>{{sl.title}}</div></div></div><div class=\"inner_container col-xs-12\"><div class=\"sport_kind_header col-xs-12\">Soccer</div><vod-block class=col-xs-12 data-model=videosList></vod-block><div class=\"see_all col-xs-12\">see all</div><div class=\"sport_kind_header col-xs-12\">Basketball</div><vod-block class=col-xs-12 data-model=videosList></vod-block><div class=\"see_all col-xs-12\">see all</div></div></div>"
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

var va = null
turnOnApp.directive('vodBlock', function() {
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
      controller: ['$scope', '$location', function vodBlockController($scope, $location) {
          va = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/vod_block/vod_block.html',
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

  $scope.currentVideo = [];
  $scope.activeSport = [];
  $scope.purchaseEvent = [];
  $scope.currentPoint = [];

  $scope.sports = [{id: '1',
                  title:'Soccer',
                  url:'assets/theme/src/images/sport/1_gray.png',
                  url_hover:'assets/theme/src/images/sport/1_white.png'},
                  {id: '2',
                  title:'Football',
                  url:'assets/theme/src/images/sport/2_gray.png',
                  url_hover:'assets/theme/src/images/sport/2_white.png'},
                  {id: '3',
                  title:'Basketball',
                  url:'assets/theme/src/images/sport/3_gray.png',
                  url_hover:'assets/theme/src/images/sport/3_white.png'},
                  {id: '4',
                  title:'Hokey',
                  url:'assets/theme/src/images/sport/4_gray.png',
                  url_hover:'assets/theme/src/images/sport/4_white.png'},
                  {id: '5',
                  title:'Tennis',
                  url:'assets/theme/src/images/sport/5_gray.png',
                  url_hover:'assets/theme/src/images/sport/5_white.png'},
                  {id: '6',
                  title:'Pingpong',
                  url:'assets/theme/src/images/sport/6_gray.png',
                  url_hover:'assets/theme/src/images/sport/6_white.png'},
                  {id: '7',
                  title:'Volleyball',
                  url:'assets/theme/src/images/sport/7_gray.png',
                  url_hover:'assets/theme/src/images/sport/7_white.png'},
                  {id: '8',
                  title:'Baseball',
                  url:'assets/theme/src/images/sport/8_gray.png',
                  url_hover:'assets/theme/src/images/sport/8_white.png'},
                  {id: '9',
                  title:'Cricket',
                  url:'assets/theme/src/images/sport/9_gray.png',
                  url_hover:'assets/theme/src/images/sport/9_white.png'},
                  {id: '10',
                  title:'Golf',
                  url:'assets/theme/src/images/sport/10_gray.png',
                  url_hover:'assets/theme/src/images/sport/10_white.png'},
                  {id: '11',
                  title:'Water polo',
                  url:'assets/theme/src/images/sport/11_gray.png',
                  url_hover:'assets/theme/src/images/sport/11_white.png'},
                  {id: '12',
                  title:'Boxing',
                  url:'assets/theme/src/images/sport/12_gray.png',
                  url_hover:'assets/theme/src/images/sport/12_white.png'},
                  {id: '13',
                  title:'Bicycle',
                  url:'assets/theme/src/images/sport/13_gray.png',
                  url_hover:'assets/theme/src/images/sport/13_white.png'},
                  {id: '14',
                  title:'Horse racing',
                  url:'assets/theme/src/images/sport/14_gray.png',
                  url_hover:'assets/theme/src/images/sport/14_white.png'},
                  {id: '15',
                  title:'Archery',
                  url:'assets/theme/src/images/sport/15_gray.png',
                  url_hover:'assets/theme/src/images/sport/15_white.png'},
                  {id: '16',
                  title:'Ski',
                  url:'assets/theme/src/images/sport/16_gray.png',
                  url_hover:'assets/theme/src/images/sport/16_white.png'}];

   $scope.activeSport = $scope.sports[0];

   $scope.getActiveSport = function(sport){
     $scope.activeSport = sport;
   }

   $scope.channels = [{title:'1',
                   url:'assets/theme/src/images/logo/espn_network-logo@2x.png'},
                   {title:'2',
                   url:'assets/theme/src/images/logo/espn-2-logo@2x.png'},
                   {title:'3',
                   url:'assets/theme/src/images/logo/nfl-logo@2x.png'},
                   {title:'4',
                   url:'assets/theme/src/images/logo/fox-sports-logo@2x.png'},
                   {title:'5',
                   url:'assets/theme/src/images/logo/eurosport-logo@2x.png'},
                   {title:'6',
                   url:'assets/theme/src/images/logo/espn_network-logo@2x.png'},
                   {title:'7',
                   url:'assets/theme/src/images/logo/nfl-logo@2x.png'}];

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


 $scope.videosList = [{id: '1',
                 title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/1.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '150',
                 description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

                 {id: '2',
                 title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/2.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '300',
                 description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

                 {id: '3',
                 title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/3.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '500',
                 description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

                 {id: '4',
                 title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/4.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '250',
                 description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

                 {id: '5',
                 title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/1.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '200',
                 description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

                 {id: '6',
                 title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/2.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '500',
                 description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

                 {id: '7',
                 title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/3.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '250',
                 description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

                 {id: '8',
                 title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/4.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
                 points: '200',
                 description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'}];

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


  $scope.getFullDescription = function(video){
    $scope.currentVideo = video;
  }

  $scope.getPurchaseEvent = function(event){
    $scope.purchaseEvent = event;
    $('#home_epg_modal').modal('show');
  }

  $scope.getPointsModal = function(point){
    $scope.currentPoint = point;
    $('#home_points_modal').modal('show');
  }


});

var ml = null;
turnOnApp.controller('mylistController', function mylistController ($scope, $location, $http, $log,$interval) {
    ml=$scope;
});

var nf = null;
turnOnApp.controller('newsfeedController', function newsfeedController ($scope, $location, $http, $log,$interval) {
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

var vod = null;
turnOnApp.controller('vodController', function vodController ($scope, $location, $http, $log,$interval) {
  vod = $scope;

        $scope.sports = [{id: '1',
                  title:'Soccer',
                  url:'assets/theme/src/images/sport/1_gray.png',
                  url_hover:'assets/theme/src/images/sport/1_white.png'},
                  {id: '2',
                  title:'Football',
                  url:'assets/theme/src/images/sport/2_gray.png',
                  url_hover:'assets/theme/src/images/sport/2_white.png'},
                  {id: '3',
                  title:'Basketball',
                  url:'assets/theme/src/images/sport/3_gray.png',
                  url_hover:'assets/theme/src/images/sport/3_white.png'},
                  {id: '4',
                  title:'Hokey',
                  url:'assets/theme/src/images/sport/4_gray.png',
                  url_hover:'assets/theme/src/images/sport/4_white.png'},
                  {id: '5',
                  title:'Tennis',
                  url:'assets/theme/src/images/sport/5_gray.png',
                  url_hover:'assets/theme/src/images/sport/5_white.png'},
                  {id: '6',
                  title:'Pingpong',
                  url:'assets/theme/src/images/sport/6_gray.png',
                  url_hover:'assets/theme/src/images/sport/6_white.png'},
                  {id: '7',
                  title:'Volleyball',
                  url:'assets/theme/src/images/sport/7_gray.png',
                  url_hover:'assets/theme/src/images/sport/7_white.png'},
                  {id: '8',
                  title:'Baseball',
                  url:'assets/theme/src/images/sport/8_gray.png',
                  url_hover:'assets/theme/src/images/sport/8_white.png'},
                  {id: '9',
                  title:'Cricket',
                  url:'assets/theme/src/images/sport/9_gray.png',
                  url_hover:'assets/theme/src/images/sport/9_white.png'},
                  {id: '10',
                  title:'Golf',
                  url:'assets/theme/src/images/sport/10_gray.png',
                  url_hover:'assets/theme/src/images/sport/10_white.png'},
                  {id: '11',
                  title:'Water polo',
                  url:'assets/theme/src/images/sport/11_gray.png',
                  url_hover:'assets/theme/src/images/sport/11_white.png'},
                  {id: '12',
                  title:'Boxing',
                  url:'assets/theme/src/images/sport/12_gray.png',
                  url_hover:'assets/theme/src/images/sport/12_white.png'},
                  {id: '13',
                  title:'Bicycle',
                  url:'assets/theme/src/images/sport/13_gray.png',
                  url_hover:'assets/theme/src/images/sport/13_white.png'},
                  {id: '14',
                  title:'Horse racing',
                  url:'assets/theme/src/images/sport/14_gray.png',
                  url_hover:'assets/theme/src/images/sport/14_white.png'},
                  {id: '15',
                  title:'Archery',
                  url:'assets/theme/src/images/sport/15_gray.png',
                  url_hover:'assets/theme/src/images/sport/15_white.png'},
                  {id: '16',
                  title:'Ski',
                  url:'assets/theme/src/images/sport/16_gray.png',
                  url_hover:'assets/theme/src/images/sport/16_white.png'}];

        $scope.videosList = [{id: '1',
              title:'Top Story 3',
              url_image:'assets/theme/src/images/news/1.png',
              url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
              points: '150',
              description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

              {id: '2',
              title:'Top Story 3',
              url_image:'assets/theme/src/images/news/2.png',
              url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
              points: '300',
              description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

              {id: '3',
              title:'Top Story 3',
              url_image:'assets/theme/src/images/news/3.png',
              url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
              points: '500',
              description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

              {id: '4',
              title:'Top Story 3',
              url_image:'assets/theme/src/images/news/4.png',
              url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
              points: '250',
              description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

              {id: '5',
              title:'Top Story 3',
              url_image:'assets/theme/src/images/news/1.png',
              url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
              points: '200',
              description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

              {id: '6',
              title:'Top Story 3',
              url_image:'assets/theme/src/images/news/2.png',
              url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
              points: '500',
              description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

              {id: '7',
              title:'Top Story 3',
              url_image:'assets/theme/src/images/news/3.png',
              url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
              points: '250',
              description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

              {id: '8',
              title:'Top Story 3',
              url_image:'assets/theme/src/images/news/4.png',
              url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
              points: '200',
              description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'}];


});
