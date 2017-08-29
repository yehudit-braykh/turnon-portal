'use strict';
var turnOnApp = angular.module('turnon', ['ngRoute', 'rzModule'])
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
    .when('/discover', {
        templateUrl: '/assets/theme/src/models/discover/discover.html',
        controller: 'discoverController'
    })
    .when('/social', {
        templateUrl: '/assets/theme/src/models/social/social.html',
        controller: 'socialController'
    })
    .when('/market', {
        templateUrl: '/assets/theme/src/models/market/market.html',
        controller: 'marketController'
    })
    .when('/product/:productId', {
        templateUrl: '/assets/theme/src/models/product/product.html',
        controller: 'productController'
    })
    .when('/mybag', {
        templateUrl: '/assets/theme/src/models/mybag/mybag.html',
        controller: 'mybagController'
    })
    .otherwise({
        redirectTo: '/'
    });;
});

angular.module('turnon').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/event_block/event_block.html',
    "<div class=event_block_page><div class=\"col-xs-3 event_list_container\" ng-repeat=\"video in model\"><div class=\"event_container col-xs-12 {{video.live_now ? 'live' : ''}}\"><div class=\"media upper_container\"><div class=media-left><img class=organiztion_image src={{video.organiztion_image}} alt=\"\"></div><div class=media-body><div class=\"left_body col-xs-7\"><div class=channel_image style=\"background-image: url({{video.channel_image}})\"></div><div class=date>{{video.date}}</div></div><div class=\"right_body col-xs-5\"><div class=points_cover ng-if=\"video.status!= 'purchased'\"><div class=points_logo></div><div class=points_num>{{video.points}}</div></div><div class=\"status {{!video.live_now? 'not_live' : ''}}\" ng-if=\"video.status == 'purchased'\">{{video.status}}</div></div></div><div class=line></div><div class=header>{{video.title}}</div><div class=description>{{video.description}}</div><div class=live_now ng-if=video.live_now>live now</div><div class=modal_time><div class=time_block><div class=time_item><div class=time_num>00</div><div class=time_desc>days</div></div><div class=time_item><div class=time_num>18</div><div class=time_desc>hours</div></div><div class=time_item><div class=time_num>23</div><div class=time_desc>mins</div></div><div class=time_item><div class=time_num>49</div><div class=time_desc>sec</div></div></div></div></div><div class=event_hover ng-hide=\"{{video.status =='purchased' && !video.live_now  }}\"><div class=hover_header>{{video.title}}</div><div class=hover_button><div class=text ng-if=\"video.status == 'purchased'\">go live</div><div class=\"text purchased\" ng-click=getPurchaseEvent(video) ng-if=\"video.status != 'purchased'\">purchase</div><div class=triangle ng-if=\"video.status == 'purchased'\"></div></div><div class=reminder_button ng-if=!video.live_now>set a reminder</div></div></div></div></div>"
  );


  $templateCache.put('directives/market_block/market_block.html',
    "<div class=\"col-xs-{{col}} market_item\" ng-repeat=\"product in model | limitTo : limit\"><div class=market_background ng-click=\"go('product/' + product.id)\"><div class=market_item_points><div class=market_points_image><div class=points_logo></div><div class=points_num>{{product.points}}</div></div></div><div class=market_item_image style=\"background-image: url('{{product.url}}')\"></div><div class=market_item_info><div class=market_item_title>{{product.title}}</div><div class=market_item_desc>{{product.type}}</div></div></div></div>"
  );


  $templateCache.put('directives/mybag_block/mybag_block.html',
    "<div class=\"col-xs-12 mybag_block_item\" ng-repeat=\"product in model\"><div class=\"image_section col-xs-3\"><div class=proudct_image style=\"background-image: url({{product.url}})\"></div></div><div class=\"detailes_section col-xs-9\"><div class=header>{{product.title}}</div><div class=type>{{product.type}}</div><div class=mybag_coins><div class=image></div><div class=cost>{{product.points}}</div></div></div><div class=\"line col-xs-12\"></div><div class=close_button></div></div>"
  );


  $templateCache.put('directives/mylist_video_block_page/mylist_video_block.html',
    "<div class=mylist_video_block_page ng-repeat=\"video in model track by $index\"><div class=\"col-xs-3 mylist_video_container {{currentVideo.id == video.id?'active':''}}\"><div class=mylist_video_image style=\"background-image: url('{{video.url_image}}')\"><div class=mylist_video_background></div><div class=video_close style=\"background-image: url('/assets/theme/src/images/icon/x-red.png')\"></div><div class=video_logo style=\"background-image: url('{{video.url_logo}}')\"></div><div class=video_play_button></div><div ng-if=\"video.status=='buy'\" class=video_points><div class=pin_icon></div><div class=points_num>{{video.points}}</div></div><div class=\"status {{video.status=='purchased' ? 'purchased' :''}}\" ng-if=\"video.status !='buy'\">{{video.status}}</div><div class=video_desc_hover><div class=\"col-xs-12 video_desc_title\">{{video.title}}</div><div class=\"col-xs-12 video_desc_info\">{{video.description | limitTo: 100}}<span ng-if=\"video.description.length > 100\">[...]</span></div><div class=\"col-xs-12 video_desc_arrow\" ng-click=\"getFullDescription(video, $index);\"></div></div></div><div class=video_arrow_orange></div></div><div ng-if=\"currentVideo.id && ($index + 1) % 4 == 0 && getLine($index) == currentVideo.line\" class=\"col-xs-12 video_full_desc_container\"><div class=\"col-xs-4 full_desc_info\"><div class=\"col-xs-12 full_desc_title\">{{currentVideo.title}}</div><div class=\"col-xs-12 full_desc_text\">{{currentVideo.description}}</div><div class=\"col-xs-12 full_desc_desc_share\"><div class=full_desc_share_button></div></div></div><div class=\"col-xs-8 full_desc_image\" style=\"background-image: url('{{currentVideo.url_image}}')\"><div class=full_desc_background></div><div class=full_desc_logo style=\"background-image: url('{{currentVideo.url_logo}}')\"></div><div class=full_desc_play_button></div><div class=full_desc_points ng-if=\"currentVideo.status=='buy'\"><div class=pin_icon></div><div class=points_num>{{currentVideo.points}}</div></div><div class=\"full_desc_status {{currentVideo.status=='purchased' ? 'purchased' :''}}\" ng-if=\"currentVideo.status !='buy'\">{{currentVideo.status}}</div></div></div></div>"
  );


  $templateCache.put('directives/social_block/social_block.html',
    "<div class=\"col-xs-{{col}} social_list_container\" ng-repeat=\"social in model\"><div class=\"social_list_image {{social.social}}\" style=\"background-image: url('{{social.url_image}}')\"><div class=social_desc><div class=\"col-xs-3 social_user_image\"><div class=user_image style=\"background-image: url('{{social.url_user_image}}')\"></div></div><div class=\"col-xs-3 social_title\">{{social.title}}</div><div class=\"col-xs-3 social_icon\"></div><div class=\"col-xs-3 social_time\">{{social.time}}</div><div class=\"col-xs-12 social_info\"><div class=social_likes><div class=\"social_heart {{social.social}}\"></div><div class=social_like_num>89</div><div ng-if=\"social.social == 'facebook'\" class=social_like_num>likes</div><div ng-if=\"social.social == 'facebook'\" class=social_comments>13 comments</div></div><div class=social_text>HSo you’re trying to surf a site like myspace, hotmail or yahoo mail from work or school and its blocked by your school, work government.</div><div class=social_points><div class=pin_icon></div><div class=points_num>150</div></div><div class=social_share></div></div></div></div></div>"
  );


  $templateCache.put('directives/video_block/video_block.html',
    "<div ng-repeat=\"video in model track by $index\"><div class=\"col-xs-3 video_list_container {{currentVideo.id == video.id?'active':''}}\"><div class=video_list_image style=\"background-image: url('{{video.url_image}}')\"><div class=video_list_background></div><div class=video_logo style=\"background-image: url('{{video.url_logo}}')\"></div><div class=video_play_button></div><div class=video_points><div class=pin_icon></div><div class=points_num>{{video.points}}</div></div><div class=video_desc_hover><div class=\"col-xs-8 video_desc_title\">{{video.title}}</div><div class=\"col-xs-4 video_desc_share\"><div class=video_add_to_my_list></div><div class=video_share_button></div></div><div class=\"col-xs-12 video_desc_info\">{{video.description | limitTo: 100}}<span ng-if=\"video.description.length > 100\">[...]</span></div><div class=\"col-xs-12 video_desc_arrow\" ng-click=\"getFullDescription(video, $index);\"></div></div></div><div class=video_aroow_green></div></div><div ng-if=\"currentVideo.id && ($index + 1) % 4 == 0 && getLine($index) == currentVideo.line\" class=\"col-xs-12 video_full_desc_container\"><div class=\"col-xs-4 full_desc_info\"><div class=\"col-xs-12 full_desc_title\">{{currentVideo.title}}</div><div class=\"col-xs-12 full_desc_text\">{{currentVideo.description}}</div><div class=\"col-xs-12 full_desc_desc_share\"><div class=full_desc_add_to_my_list></div><div class=full_desc_share_button></div></div></div><div class=\"col-xs-8 full_desc_image\" style=\"background-image: url('{{currentVideo.url_image}}')\"><div class=full_desc_background></div><div class=full_desc_logo style=\"background-image: url('{{currentVideo.url_logo}}')\"></div><div class=full_desc_play_button></div><div class=full_desc_points><div class=pin_icon></div><div class=points_num>{{currentVideo.points}}</div></div></div></div></div>"
  );


  $templateCache.put('directives/vod_block/vod_block.html',
    "<div class=vod_block_page><div class=\"col-xs-15 vod_list_container\" ng-repeat=\"video in model\"><div class=vod_list_image style=\"background-image: url('{{video.url_image}}')\"><div class=video_list_background></div><div class=video_logo style=\"background-image: url('{{video.url_logo}}')\"></div><div class=video_play_button></div><div class=video_points><div class=pin_icon></div><div class=points_num>{{video.points}}</div></div></div><div class=vod_info_section><div class=\"vod_header col-xs-6\">{{video.title}}</div><div class=\"vod_icons col-xs-6\"><div class=add_to_list style=\"background-image: url('/assets/theme/src/images/icon/add_to_list@2x.png')\"></div><div class=share style=\"background-image: url('/assets/theme/src/images/icon/shape.png')\"></div></div><div class=\"vod_desc col-xs-12\">{{video.description | limitTo: 100}}</div></div></div></div>"
  );


  $templateCache.put('models/discover/discover.html',
    "<div class=discover_page><div class=\"page_container row\"><div class=\"col-xs-12 discover_header\"><div class=discover_brand style=\"background-image: url('/assets/theme/src/images/headers/discover.png')\"></div></div><div class=\"col-xs-12 sport_list_container\"><div class=\"kinds_of_sports {{activeSport.id == sl.id?'active':''}}\" ng-repeat=\"sl in sports\" ng-click=getActiveSport(sl);><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_logo_hover style=\"background-image: url('{{sl.url_hover}}')\"></div><div class=sport_title>{{sl.title}}</div></div></div><div class=\"sports_inner col-xs-12\"><div class=\"sport_kind_header col-xs-12\">Soccer</div></div><div class=\"event_block_inner col-xs-12\"><event-block data-model=live_events></event-block></div></div><div class=\"modal fade\" id=discover_modal tabindex=-1 role=dialog><div class=modal-dialog role=document><div class=modal-content><div class=modal-body><div class=close_section><div class=close_button data-dismiss=modal aria-label=Close></div></div><div class=modal_header_section><div class=modal_logo style=\"background-image: url('{{purchasedevent.channel_image}}')\"></div><div class=modal_time_info><div class=modal_organization style=\"background-image:  url('{{purchasedevent.organiztion_image}}')\"></div><div class=modal_date>{{purchasedevent.date}}</div></div><div class=modal_points><div class=points_logo></div><div class=points_num>{{purchasedevent.points}}</div></div></div><div class=modal_center_section><div class=modal_title>{{purchasedevent.title}}</div><div class=modal_description>{{purchasedevent.description}}</div><div class=modal_time><div class=time_block><div class=time_item><div class=time_num>00</div><div class=time_desc>days</div></div><div class=time_item><div class=time_num>18</div><div class=time_desc>hours</div></div><div class=time_item><div class=time_num>23</div><div class=time_desc>mins</div></div><div class=time_item><div class=time_num>49</div><div class=time_desc>sec</div></div></div></div><div class=modal_button><button type=button class=\"btn purchase_button\">purchase</button></div></div></div></div></div></div></div>"
  );


  $templateCache.put('models/footer/footer.html',
    ""
  );


  $templateCache.put('models/header_page/header.html',
    "<div class=header_page ng-controller=headerController><nav class=\"navbar navbar-default\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1 aria-expanded=false><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button><div class=\"dropdown drop-hamburger\" ng-click=open-manu() href=#><i class=\"fa fa-bars\" id=dropdownMenu1 aria-hidden=true data-toggle=dropdown></i><ul class=dropdown-menu aria-labelledby=dropdownMenu1><li class=li-style ng-click=\"go('newsfeed');\"><span>News Feed</span></li><li class=li-style ng-click=\"go('vod');\"><span>VOD</span></li><li class=li-style ng-click=\"go('discover');\"><span>Discover</span></li><li class=li-style ng-click=\"go('social');\"><span>TOSocial</span></li><li class=li-style ng-click=\"go('market');\"><span>Market Place</span></li><li class=li-style ng-click=\"go('');\"><span>Gain Points</span></li></ul></div><div class=navbar-brand ng-click=\"go('/');\"></div></div><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><form class=\"navbar-form navbar-left\"><div class=form-group><input type=text class=form-control> <i class=\"fa fa-search\"></i></div><div class=\"logout-token {{login==true ? 'loged-in':''}}\"></div></form><div ng-show=\"login==false\" ng-click=Signin() class=sign-in>sign in</div><div ng-show=\"login==true\" class=profile-cover><div class=profile-name>sds</div><div class=profile-image></div></div></div></div></nav></div>"
  );


  $templateCache.put('models/home/home.html',
    "<div class=\"container-fluid home_page\"><div class=\"col-xs-12 sport_list_container\"><div class=\"kinds_of_sports {{activeSport.id == sl.id?'active':''}}\" ng-repeat=\"sl in sports\" ng-click=getActiveSport(sl);><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_logo_hover style=\"background-image: url('{{sl.url_hover}}')\"></div><div class=sport_title>{{sl.title}}</div></div></div><div class=\"col-xs-12 center_container\"><div class=\"col-xs-12 center_image\" style=\"background-image: url('assets/theme/src/images/bg/football-manch.png')\"><div class=center_play_button></div><div class=center_points><div class=points_icon></div><div class=points_number>500</div></div><div class=epg_channel_logo style=\"background-image: url('assets/theme/src/images/logo/espn.png')\"></div><div class=center_epg_container><div class=epg_type><div class=type_title>Soccer</div><div class=close_epg_button><div class=epg_button></div></div></div><div class=epg_now_container><div class=epg_now>NOW!</div><div class=epg_now_image style=\"background-image: url('assets/theme/src/images/logo/espn.png')\"></div><div class=epg_now_title>Champions League</div><div class=epg_now_description>Real Madrid - M.United</div><div class=epg_now_time>(49’ min)</div></div><div class=epg_events_title>Next Events</div><div class=epg_container><div class=epg_list style=\"height:{{epgList.length * 5}}vw\"><div class=epg_item ng-repeat=\"epg in epgList\" ng-click=getPurchaseEvent(epg);><div class=epg_info><div class=epg_title>{{epg.title}}</div><div class=epg_desc>{{epg.desc}}</div></div><div class=epg_logo><div class=epg_logo_image style=\"background-image: url('{{epg.url}}')\"></div></div></div></div></div></div></div></div><div class=\"col-xs-12 channels_container\"><div class=channel ng-repeat=\"channel in channels\"><div class=channel_logo style=\"background-image: url('{{channel.url}}')\"></div><div class=channel_background></div></div></div><div class=\"col-xs-12 content_container\"><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title orange title1\">GAIN POINTS!</div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 points_container\"><div class=\"col-xs-15 point\" ng-repeat=\"point in points\"><div class=point_logo style=\"background-image: url('{{point.url}}')\"></div><div class=point_logo_hover style=\"background-image: url('{{point.url_hover}}')\"></div><div class=point_title>{{point.title}}</div><div class=point_num>{{point.points}}</div><div class=point_desc>{{point.description}}</div><div class=point_button><button type=button class=\"btn get_points_button\">GET POINTS</button></div></div></div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div id=carousel_home_page class=\"carousel slide\" data-ride=carousel><ol class=carousel-indicators><li data-target=#carousel_home_page data-slide-to=0 class=active></li><li data-target=#carousel_home_page data-slide-to=1></li><li data-target=#carousel_home_page data-slide-to=2></li><li data-target=#carousel_home_page data-slide-to=3></li><li data-target=#carousel_home_page data-slide-to=4></li></ol><div class=carousel-inner role=listbox><div class=\"item {{$index == 0?'active':''}}\" ng-repeat=\"point in points track by $index\"><div class=item_content style=\"background-image: url('assets/theme/src/images/bg/points_bg@2x.png')\"><div class=item_background><div class=carousel_point_title>{{point.title}}</div><div class=carousel_point_num><div class=pin_icon></div><div class=points_num>{{point.points}}</div></div><div class=carousel_point_desc>{{point.description}}</div><div class=carousel_point_button><button type=button class=\"btn points_button\" ng-click=getPointsModal(point);>GET POINTS</button></div></div></div></div></div></div></div><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title green title1\">NEWS FEED</div></div><video-block data-model=videosList></video-block><div class=col-xs-12 style=\"padding-right: 0.8vw; padding-left: 0.8vw\"><div class=\"col-xs-12 content_title green title1\">TOSocial</div></div><div class=col-xs-12 style=\"padding: 0.5vw\"><social-block data-model=socials data-col=15></social-block></div></div></div><div class=\"modal fade\" id=home_epg_modal tabindex=-1 role=dialog><div class=modal-dialog role=document><div class=modal-content><div class=modal-body><div class=close_section><div class=close_button data-dismiss=modal aria-label=Close></div></div><div class=modal_header_section><div class=modal_logo style=\"background-image: url('{{purchaseEvent.url}}')\"></div><div class=modal_time_info><div class=modal_organization style=\"background-image: url('assets/theme/src/images/logo/uefa.png')\"></div><div class=modal_date>22 March 2017</div></div><div class=modal_points><div class=points_logo></div><div class=points_num>150</div></div></div><div class=modal_center_section><div class=modal_title>{{purchaseEvent.title}}</div><div class=modal_description>With easy access to Broadband and DSL the number of people</div><div class=modal_time><div class=time_block><div class=time_item><div class=time_num>00</div><div class=time_desc>days</div></div><div class=time_item><div class=time_num>18</div><div class=time_desc>hours</div></div><div class=time_item><div class=time_num>23</div><div class=time_desc>mins</div></div><div class=time_item><div class=time_num>49</div><div class=time_desc>sec</div></div></div></div><div class=modal_button><button type=button class=\"btn purchase_button\">purchase</button></div></div></div></div></div></div><div class=\"modal fade\" id=home_points_modal tabindex=-1 role=dialog><div class=modal-dialog role=document><div class=modal-content><div class=modal-body><div class=close_section><div class=close_button data-dismiss=modal aria-label=Close></div></div><div class=modal_center_section><div class=modal_title>earn more points!</div><div class=modal_description>Share with friends</div><div class=modal_social><div class=social_block><div class=\"social_item facebook\"></div><div class=\"social_item instagram\"></div><div class=\"social_item twitter\"></div></div></div><div class=modal_video_content><div class=modal_video_image style=\"background-image: url('assets/theme/src/images/news/3.png')\"><div class=video_background></div><div class=video_title>The Benefits And Drawbacks</div><div class=video_play_button></div><div class=video_points><div class=pin_icon></div><div class=points_num>300</div></div></div></div><div class=modal_button><button type=button class=\"btn points_button\">share now</button></div></div></div></div></div></div>"
  );


  $templateCache.put('models/market/market.html',
    "<div class=\"container-fluid market_page\"><div class=\"col-xs-12 market_header_container\"><div class=market_header_title></div></div><div class=\"col-xs-12 market_content\"><div class=\"col-xs-12 market_sub_header_1\"><div><div class=\"col-xs-6 market_merchandise\"></div><div class=\"col-xs-6 market_header_info\"><div class=market_bag_container><div class=market_likes_image></div><div class=market_bag_title>MY BAG</div></div><div class=market_likes_container><div class=market_likes_image></div><div class=market_likes_title>LIKED</div></div></div></div></div><div class=\"col-xs-12 market_sub_header_2\"><div class=search_input_cover><input type=text class=search_input> <i class=\"fa fa-search\"></i></div><div class=\"btn-group search_menu\"><button type=button class=\"btn btn-default dropdown-toggle btn-block\" data-toggle=dropdown aria-haspopup=true aria-expanded=false>SORT BY <span class=caret></span></button><ul class=dropdown-menu><li><a>Newest</a></li><li><a>Highest-Rated</a></li><li><a>Price-High-Low</a></li><li><a>Price-Low-High</a></li></ul></div></div><aside><div class=market_filters>FILTERS</div><div class=filter_item><div class=filter_title>BRAND</div><div class=checkbox ng-repeat=\"brand in brands\"><label><input type=checkbox name=brand id=brand_{{brand.value}} value={{brand.value}}> <span>{{brand.title}}</span></label></div></div><div class=filter_item><div class=filter_title>TYPE</div><div class=checkbox ng-repeat=\"type in types\"><label><input type=checkbox name=brand id=type_{{type.value}} value={{type.value}}> <span>{{type.title}}</span></label></div></div><div class=filter_item><div class=filter_title>SIZE</div><div class=checkbox ng-repeat=\"size in sizes\"><label><input type=checkbox name=size id=size_{{size.value}} value={{size.value}}> <span>{{size.title}}</span></label></div></div><div class=filter_item><div class=filter_title>COLOR</div><div class=row><div class=col-xs-6 ng-repeat=\"color in colors\"><div class=checkbox><label><input type=checkbox name=color id=color_{{color.value}} value={{color.value}}> <span>{{color.title}}</span></label></div></div></div></div><div class=filter_item><div class=filter_title>PRICE RANGE</div><div class=row><div class=col-xs-6><div class=range_filter_image></div><div class=range_filter_points>10</div></div><div class=col-xs-6><div class=range_filter_image></div><div class=range_filter_points>50 000</div></div></div><rzslider class=market_slider rz-slider-model=slider.minValue rz-slider-high=slider.maxValue rz-slider-options=slider.options></rzslider></div></aside><article><market-block data-model=products data-limit=20 data-col=4></market-block></article></div></div>"
  );


  $templateCache.put('models/my_list/mylist.html',
    "<div class=mylist_page><div class=\"page_container row\"><div class=\"col-xs-12 mylist_header\"><div class=mylist_brand style=\"background-image: url('/assets/theme/src/images/headers/mylist.png')\"></div></div><div class=\"mylist_content col-xs-12\"><mylistvideo-block data-model=videosList></mylistvideo-block></div></div></div>"
  );


  $templateCache.put('models/mybag/mybag.html',
    "<div class=mybag_page><div class=\"col-xs-12 mybag_header\"><div class=mybag_brand style=\"background-image: url('/assets/theme/src/images/headers/market.png')\"></div></div><div class=\"page_container col-xs-12\"><div class=fix_padding><div class=\"mybag_merchandise col-xs-12\"></div></div><div class=\"sub_header col-xs-12 fix_padding\"><div class=\"search_input_cover col-xs-6\"><input type=text class=search_input> <i class=\"fa fa-search\"></i></div><div class=\"col-xs-6 mybag_buttons\"><div class=mybag_bag_container><div class=mybag_likes_image></div><div class=mybag_bag_title>MY BAG</div></div><div class=mybag_likes_container><div class=mybag_likes_image></div><div class=mybag_likes_title>LIKED</div></div></div></div><div class=fix_padding><div class=\"content_section col-xs-12\"><div class=left_div><mybag-block data-model=products></mybag-block></div><div class=right_div><div class=summary>summary</div><div class=line></div><div class=\"subtotal_cover col-xs-12\"><div class=header_subtotal>subtotal</div><div class=mybag_coins><div class=image></div><div class=cost>{{pointscount}}</div></div></div><div class=\"delivery_cover col-xs-12\"><div class=delivery_header>DELIVERY</div><div class=delivery_cost>free</div></div><div class=\"line col-xs-12\"></div><div class=\"subtotal_cover total col-xs-12\"><div class=header_subtotal>total</div><div class=mybag_coins><div class=image></div><div class=cost>{{pointscount}}</div></div></div><div class=\"buy_button_cover col-xs-12\"><div class=button ng-click=open_modal()>buy</div></div></div></div></div><div class=\"you_might_like col-xs-12 fix_padding\">you might also like</div><div class=\"products_container col-xs-12\"><market-block data-model=products data-limit=4 data-col=3></market-block></div></div><div class=\"modal fade\" id=mybag_modal tabindex=-1 role=dialog><div class=modal-dialog role=document><div class=modal-content><div class=modal-body ng-if=!purchase><div class=close_section><div class=close_button data-dismiss=modal aria-label=Close></div></div><div class=modal_header_section>Approve your payment</div><div class=modal_center_section><div class=\"modal_subtotal_cover col-xs-12\"><div class=header_subtotal>total</div><div class=mybag_coins><div class=image></div><div class=cost>{{pointscount}}</div></div></div><div class=\"line col-xs-12\"></div><input ng-model=password type=text class=input_style><div class=modal_button><button ng-disabled=\"password.length < 6\" class=\"purchase_button {{password.length > 5 ?'active':''}}\" ng-click=confirm_purchase()>Approve payment</button></div></div></div><div class=modal-body ng-if=purchase><div class=modal_header_section>THANK YOU</div><div class=detailes>YOUR ORDER IS BEING PROCESSED</div><div class=\"detailes view\"><span class=border>view order detailes</span></div><div class=modal_button><button class=\"purchase_button continue\" ng-click=continue_purchase()>continue shopping</button></div></div></div></div></div></div>"
  );


  $templateCache.put('models/newsfeed/newsfeed.html',
    "<div class=newsfeed_page><div class=\"page_container row\"><div class=\"col-xs-12 news_feed_container\"><div class=newsfeed-brand style=\"background-image: url('/assets/theme/src/images/headers/group-8-copy.png')\"></div></div><div class=contant_container><div id=myCarousel class=\"col-xs-12 carousel slide\" data-ride=carousel><ol class=carousel-indicators><li data-target=#myCarousel data-slide-to=0 class=active></li><li data-target=#myCarousel data-slide-to=1></li><li data-target=#myCarousel data-slide-to=2></li></ol><div class=carousel-inner><div class=\"item active\"><div class=right_div><div class=carousel-image style=\"background-image: url('/assets/theme/src/images/news/rectangle-12-copy-13.png')\"><div class=logo style=\"background-image: url('/assets/theme/src/images/logo/nfl-logo@2x.png')\"></div><div class=play_button style=\"background-image: url('/assets/theme/src/images/icon/play.png')\"></div><div class=full_desc_points><div class=pin_icon style=\"background-image: url('/assets/theme/src/images/icon/pin-icon-yellow.png')\"></div><div class=points_num>200</div></div></div><div class=gradient></div></div><div class=left_div><div class=headline>RAFAEL NADAL MAKING THE RIGHT MOVE</div><div class=description>The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.</div><div class=full_desc_share><div class=full_desc_add_to_my_list style=\"background-image: url('/assets/theme/src/images/icon/add_to_list@2x.png')\"></div><div class=full_desc_share_button style=\"background-image: url('/assets/theme/src/images/icon/shape.png')\"></div></div></div></div><div class=item><div class=right_div><div class=carousel-image style=\"background-image: url('/assets/theme/src/images/news/rectangle-12-copy-13.png')\"><div class=logo style=\"background-image: url('/assets/theme/src/images/logo/nfl-logo@2x.png')\"></div><div class=play_button style=\"background-image: url('/assets/theme/src/images/icon/play.png')\"></div><div class=full_desc_points style=\"background-image: url('/assets/theme/src/images/icon/pin-icon-yellow.png')\"><div class=pin_icon></div><div class=points_num>200</div></div></div><div class=gradient></div></div><div class=left_div><div class=headline>RAFAEL NADAL MAKING THE RIGHT MOVE</div><div class=description>The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.</div><div class=full_desc_share><div class=full_desc_add_to_my_list style=\"background-image: url('/assets/theme/src/images/icon/add_to_list@2x.png')\"></div><div class=full_desc_share_button style=\"background-image: url('/assets/theme/src/images/icon/shape.png')\"></div></div></div></div><div class=item><div class=right_div><div class=carousel-image style=\"background-image: url('/assets/theme/src/images/news/rectangle-12-copy-13.png')\"><div class=logo style=\"background-image: url('/assets/theme/src/images/logo/nfl-logo@2x.png')\"></div><div class=play_button style=\"background-image: url('/assets/theme/src/images/icon/play.png')\"></div><div class=full_desc_points><div class=pin_icon style=\"background-image: url('/assets/theme/src/images/icon/pin-icon-yellow.png')\"></div><div class=points_num>200</div></div></div><div class=gradient></div></div><div class=left_div><div class=headline>RAFAEL NADAL MAKING THE RIGHT MOVE</div><div class=description>The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.</div><div class=full_desc_share><div class=full_desc_add_to_my_list style=\"background-image: url('/assets/theme/src/images/icon/add_to_list@2x.png')\"></div><div class=full_desc_share_button style=\"background-image: url('/assets/theme/src/images/icon/shape.png')\"></div></div></div></div></div></div><div class=\"newsfeed_header col-xs-12\">today’s top stories</div><div class=\"newsfeed_contant_container col-xs-12\"><video-block data-model=videosList></video-block></div><div class=\"newsfeed_header col-xs-12\">yesterday’s top stories</div><div class=\"newsfeed_contant_container col-xs-12\"><video-block data-model=videosList></video-block></div><div class=\"newsfeed_header col-xs-12\">older stories<div class=arrow style=\"background-image: url('/assets/theme/src/images/icon/triangle.png')\"></div></div></div></div></div>"
  );


  $templateCache.put('models/product/product.html',
    "<div class=\"product_page container-fluid\"><div class=\"col-xs-12 product_header\"><div class=product_brand style=\"background-image: url('/assets/theme/src/images/headers/market.png')\"></div></div><div class=\"page_container col-xs-12\"><div class=fix_padding><div class=\"product_merchandise col-xs-12\"></div></div><div class=\"sub_header col-xs-12 fix_padding\"><div class=\"search_input_cover col-xs-6\"><input type=text class=search_input> <i class=\"fa fa-search\"></i></div><div class=\"col-xs-6 product_buttons\"><div class=product_bag_container><div class=product_likes_image></div><div class=product_bag_title>MY BAG</div></div><div class=product_likes_container><div class=product_likes_image></div><div class=product_likes_title>LIKED</div></div></div></div><div class=fix_padding><div class=\"choosed_product_container col-xs-12\"><div class=\"left_div col-xs-4\"><div class=proudct_image style=\"background-image: url({{product.url}})\"></div></div><div class=\"right_div col-xs-8\"><div class=product_title>{{product.title}}</div><div class=product_type>{{product.type}}</div><div class=\"product_coins col-xs-12\"><div class=image></div><div class=cost>{{product.points}}</div></div><div class=\"product_desc col-xs-12\">{{product.description}}</div><div class=\"choosed_product_buttons col-xs-12\"><div class=add_button>Add to bag</div><div class=button_image style=\"background-image: url('/assets/theme/src/images/icon/red_heart.png')\"></div><div class=button_image style=\"background-image: url('/assets/theme/src/images/icon/share_red.png')\"></div></div></div></div></div><div class=\"you_might_like col-xs-12 fix_padding\">you might also like</div><div class=\"products_container col-xs-12\"><market-block data-model=products data-limit=4 data-col=3></market-block></div></div></div>"
  );


  $templateCache.put('models/social/social.html',
    "<div class=\"container-fluid social_page\"><div class=\"col-xs-12 social_header_container\"><div class=social_header_title></div></div><div class=\"col-xs-12 social_content\"><aside><div class=social_container><div class=social_block><div class=\"social_item facebook\"></div><div class=\"social_item instagram\"></div><div class=\"social_item twitter\"></div></div></div><form novalidate class=navbar-form><div class=form-group><input type=text class=form-control> <i class=\"fa fa-search\" id=dropdownMenu1 aria-hidden=true data-toggle=dropdown></i></div></form><div class=social_celebrities><ul><li>Cristiano Ronaldo<span class=close_button></span></li><li>Luis Suárez<span class=close_button></span></li><li>Luis Suárez<span class=close_button></span></li><li>Antoine Griezmann<span class=close_button></span></li><li>Emerick Aubameyang<span class=close_button></span></li></ul></div></aside><article><social-block data-model=socials data-col=3></social-block></article></div></div>"
  );


  $templateCache.put('models/vod_page/vod.html',
    "<div class=\"vod_page row\"><div class=\"col-xs-12 sport_list_container\"><div class=\"kinds_of_sports {{activeSport.id == sl.id?'active':''}}\" ng-repeat=\"sl in sports\" ng-click=getActiveSport(sl);><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_logo_hover style=\"background-image: url('{{sl.url_hover}}')\"></div><div class=sport_title>{{sl.title}}</div></div></div><div class=\"inner_container col-xs-12\"><div class=\"sport_kind_header col-xs-12\">Soccer</div><vod-block class=col-xs-12 data-model=videosList></vod-block><div class=\"see_all col-xs-12\">see all</div><div class=\"sport_kind_header col-xs-12\">Basketball</div><vod-block class=col-xs-12 data-model=videosList></vod-block><div class=\"see_all col-xs-12\">see all</div></div></div>"
  );

}]);

var eb=null
turnOnApp.directive('eventBlock', function() {
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
      controller: ['$scope', '$location','$rootScope', function eventController($scope, $location, $rootScope) {
          eb = $scope;
          $scope.date = new Date();
          $scope.currentVideo = [];
          $scope.go = function (path) {
              $location.path(path);
          };
          $scope.getPurchaseEvent = function(choosenevent){
             $rootScope.$broadcast("choose_event",choosenevent);
            // $scope.purchaseEvent = event;
            $('#discover_modal').modal('show');
          }

      }],
      templateUrl: '/assets/theme/src/directives/event_block/event_block.html',
    };
  })

var so = null
turnOnApp.directive('marketBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          limit: "@",
          order: "@",
          reverse: "=",
          link: "=",
          search: '=',
          col: "@"
      },
      controller: ['$scope', '$location', function marketBlockController($scope, $location) {
          so = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/market_block/market_block.html',
    };
  })

var mbb = null
turnOnApp.directive('mybagBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          limit: "=",
          order: "@",
          reverse: "=",
          link: "=",
          search: '=',
          col: "@"
      },
      controller: ['$scope', '$location', function mybagBlockController($scope, $location) {
          mbb = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/mybag_block/mybag_block.html',
    };
  })

var mlb=null
turnOnApp.directive('mylistvideoBlock', function() {
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
          mlb = $scope;
          $scope.currentVideo = [];
          $scope.go = function (path) {
              $location.path(path);
          };

          $scope.getLine = function (i) {
              var line = parseInt(i / 4);
              return line;
          };

          $scope.getFullDescription = function(video, i){
            $scope.currentVideo = video;
            var line = parseInt(i / 4);
            $scope.currentVideo.line = line;
            //console.log($scope.currentVideo);
          }
      }],
      templateUrl: '/assets/theme/src/directives/mylist_video_block_page/mylist_video_block.html',
    };
  })

var so = null
turnOnApp.directive('socialBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          limit: "=",
          order: "@",
          reverse: "=",
          link: "=",
          search: '=',
          col: "@"
      },
      controller: ['$scope', '$location', function socialBlockController($scope, $location) {
          so = $scope;
          $scope.go = function (path) {
              $location.path(path);
          };

      }],
      templateUrl: '/assets/theme/src/directives/social_block/social_block.html',
    };
  })

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
          $scope.currentVideo = [];

          $scope.go = function (path) {
              $location.path(path);
          };

          $scope.getLine = function (i) {
              var line = parseInt(i / 4);
              return line;
          };

          $scope.getFullDescription = function(video, i){
            $scope.currentVideo = video;
            var line = parseInt(i / 4);
            $scope.currentVideo.line = line;
            //console.log($scope.currentVideo);
          }


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

var dis = null;
turnOnApp.controller('discoverController', function discoverController ($scope, $location, $http, $log,$interval) {
    dis=$scope;
    $scope.purchasedevent={};
    $scope.date = new Date();
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
     $scope.$on('choose_event', function (event, data) {
        $scope.purchasedevent = data;

     });


    $scope.live_events = [{id: '1',
          title:'Real Madrid (esp) - Arsenal (eng)',
          channel_image :'assets/theme/src/images/logo/espn.png',
          date : '1 januery 2017',
          organiztion_image:'assets/theme/src/images/logo/uefa.png',
          url_image:'assets/theme/src/images/news/1.png',
          status: 'purchased',
          live_now :true,
          points: '150',
          description: 'With easy access to Broadband and DSL the number of people'},

          {id: '2',
          title:'Real Madrid (esp) - Arsenal (eng)',
          channel_image :'assets/theme/src/images/logo/espn.png',
          date : '1 januery 2017',
          organiztion_image:'assets/theme/src/images/logo/uefa.png',
          url_image:'assets/theme/src/images/news/2.png',
          status: 'buy',
          live_now :false,
          points: '300',
          description: 'With easy access to Broadband and DSL the number of people'},

          {id: '3',
          title:'Real Madrid (esp) - Arsenal (eng)',
          channel_image :'assets/theme/src/images/logo/espn.png',
          date : '1 januery 2017',
          organiztion_image:'assets/theme/src/images/logo/uefa.png',
          url_image:'assets/theme/src/images/news/3.png',
          status: 'buy',
          live_now :false,
          points: '500',
          description: 'With easy access to Broadband and DSL the number of people'},

          {id: '4',
          title:'Real Madrid (esp) - Arsenal (eng)',
          channel_image :'assets/theme/src/images/logo/espn.png',
          date : '1 januery 2017',
          organiztion_image:'assets/theme/src/images/logo/uefa.png',
          url_image:'assets/theme/src/images/news/4.png',
          status: 'live',
          live_now :false,
          points: '250',
          description: 'With easy access to Broadband and DSL the number of people'},

          {id: '5',
          title:'Real Madrid (esp) - Arsenal (eng)',
          channel_image :'assets/theme/src/images/logo/espn.png',
          date : '1 januery 2017',
          organiztion_image:'assets/theme/src/images/logo/uefa.png',
          url_image:'assets/theme/src/images/news/1.png',
          status: 'purchased',
          live_now :false,
          points: '200',
          description: 'With easy access to Broadband and DSL the number of people'},

          {id: '6',
           title:'Real Madrid (esp) - Arsenal (eng)',
          channel_image :'assets/theme/src/images/logo/espn.png',
          date : '1 januery 2017',
          organiztion_image:'assets/theme/src/images/logo/uefa.png',
          url_image:'assets/theme/src/images/news/2.png',
          status: 'live',
          live_now :false,
          points: '500',
          description: 'With easy access to Broadband and DSL the number of people'},

          {id: '7',
          title:'Real Madrid (esp) - Arsenal (eng)',
          channel_image :'assets/theme/src/images/logo/espn.png',
          date : '1 januery 2017',
          organiztion_image:'assets/theme/src/images/logo/uefa.png',
          url_image:'assets/theme/src/images/news/3.png',
          status: 'purchased',
          live_now :false,
          points: '250',
         description: 'With easy access to Broadband and DSL the number of people'},
          {id: '8',
          title:'Real Madrid (esp) - Arsenal (eng)',
          channel_image :'assets/theme/src/images/logo/espn.png',
          date : '1 januery 2017',
          organiztion_image:'assets/theme/src/images/logo/uefa.png',
          url_image:'assets/theme/src/images/news/4.png',
          status: 'live',
          live_now :false,
          points: '200',
          description: 'With easy access to Broadband and DSL the number of people'},];

});

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

    $scope.go = function (path) {
      $location.path(path);
    };
});

var h = null;
turnOnApp.controller('homeController', function homeController ($scope, $location, $http, $log,$interval) {
  h = $scope;

  //$scope.currentVideo = [];
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


  // $scope.getFullDescription = function(video){
  //   $scope.currentVideo = video;
  // }

  $scope.getPurchaseEvent = function(event){
    $scope.purchaseEvent = event;
    $('#home_epg_modal').modal('show');
  }

  $scope.getPointsModal = function(point){
    $scope.currentPoint = point;
    $('#home_points_modal').modal('show');
  }


});

var ma = null;
turnOnApp.controller('marketController', function marketController ($scope, $location, $http, $log,$interval) {
  ma = $scope;

  $scope.go = function (path) {
    $location.path(path);
  };
  
  $scope.products = [{ id:'1',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  points: '15 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  { id: '2',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  points: '50 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {id: '3',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_2@2x.png',
                  points: '10 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {id: '4',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_1@2x.png',
                  points: '10 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {id: '5',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  points: '15 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {id: '6',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  points: '50 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {id: '7',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_2@2x.png',
                  points: '10 000',
                  description: "MEN'S FOOTBALL SHIRT"}];

  $scope.brands = [{title:'Nike',
                  value: "nike"},
                  {title:'Adidas',
                  value: "adidas"},
                  {title:'Puma',
                  value: "puma"},
                  {title:'Reebok',
                  value: "reebok"},
                  {title:'New Balance',
                  value: "new_balance"}];

  $scope.types = [{title:'Trainers',
                  value: "trainers"},
                  {title:'Shirt',
                  value: "shirt"},
                  {title:'Sweatshirt',
                  value: "sweatshirt"},
                  {title:'Pants',
                  value: "pants"},
                  {title:'Shorts',
                  value: "shorts"}];

  $scope.sizes = [{title:'S',
                  value: "s"},
                  {title:'M',
                  value: "m"},
                  {title:'L',
                  value: "l"},
                  {title:'XL',
                  value: "xl"},
                  {title:'XXL',
                  value: "xxl"}];

  $scope.colors = [{title:'Blue',
                  value: "blue"},
                  {title:'Gold',
                  value: "gold"},
                  {title:'White',
                  value: "white"},
                  {title:'Black',
                  value: "black"},
                  {title:'Green',
                  value: "green"},
                  {title:'Brown',
                  value: "brown"},
                  {title:'Yellow',
                  value: "yellow"},
                  {title:'Purple',
                  value: "purple"},
                  {title:'Pink',
                  value: "pink"},
                  {title:'Gray',
                  value: "gray"}];
  $scope.slider = {
      minValue: 10000,
      maxValue: 25000,
      options: {
          floor: 10,
          ceil: 50000,
          step: 10
      }
  };

});

var ml = null;
turnOnApp.controller('mylistController', function mylistController ($scope, $location, $http, $log,$interval) {
    ml=$scope;

    $scope.videosList = [{id: '1',
          title:'Real Madrid Vs. Arsenal ',
          url_image:'assets/theme/src/images/news/1.png',
          url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
          status: 'purchased',
          points: '150',
          description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to […]'},

          {id: '2',
          title:'Real Madrid Vs. Arsenal ',
          url_image:'assets/theme/src/images/news/2.png',
          url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
          status: 'buy',
          points: '300',
          description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

          {id: '3',
          title:'Real Madrid Vs. Arsenal ',
          url_image:'assets/theme/src/images/news/3.png',
          url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
           status: 'buy',
          points: '500',
          description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

          {id: '4',
          title:'Real Madrid Vs. Arsenal ',
          url_image:'assets/theme/src/images/news/4.png',
          url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
           status: 'live',
          points: '250',
          description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

          {id: '5',
          title:'Real Madrid Vs. Arsenal ',
          url_image:'assets/theme/src/images/news/1.png',
          url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
           status: 'purchased',
          points: '200',
          description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

          {id: '6',
           title:'Real Madrid Vs. Arsenal ',
          url_image:'assets/theme/src/images/news/2.png',
          url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
           status: 'live',
          points: '500',
          description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

          {id: '7',
          title:'Real Madrid Vs. Arsenal ',
          url_image:'assets/theme/src/images/news/3.png',
          url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
           status: 'purchased',
          points: '250',
          description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

          {id: '8',
          title:'Real Madrid Vs. Arsenal ',
          url_image:'assets/theme/src/images/news/4.png',
          url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
           status: 'live',
          points: '200',
          description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'}];

});

var mb = null;
var l = null;
turnOnApp.controller('mybagController', function mybagController ($scope, $location, $http, $log,$interval,$routeParams) {
  mb = $scope;
  l=$location;
  $scope.password = '';
  $scope.purchase = false;
  $scope.pointscount = 0;
  $scope.products = [{ id:'1',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '15000'},
                  { id: '2',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '50000'},
                  {id: '3',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_2@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10000'},
                  {id: '4',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10000'},
                  {id: '5',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '15000'},
                  {id: '6',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                   points: '50000'},
                  {id: '7',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_2@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10000'

              }];
  $scope.products.forEach (function(item){
          $scope.itempoint = parseInt(item.points)
          $scope.pointscount +=  $scope.itempoint;
  },this);
  $scope.open_modal = function(){
    $('#mybag_modal').modal('show');
  }
  $scope.confirm_purchase = function(){
    $scope.purchase = true;
  }

  $scope.continue_purchase = function () {
      $('#mybag_modal').modal('toggle');
      $('#mybag_modal').on("hidden.bs.modal", function(){
          $scope.go('/market');
      });
  };
  $scope.go = function (path) {
      if (path== '/market') {
          $location.path(path);
          $scope.$apply();
      }
  };

});

var nf = null;
turnOnApp.controller('newsfeedController', function newsfeedController ($scope, $location, $http, $log,$interval) {
  nf = $scope;




  $scope.videosList = [{id: '1',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/1.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
        status: 'purchased',
        points: '150',
        description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to […]'},

        {id: '2',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/2.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
        status: 'buy',
        points: '300',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '3',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/3.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'buy',
        points: '500',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '4',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/4.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'live',
        points: '250',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '5',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/1.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'purchased',
        points: '200',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '6',
         title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/2.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'live',
        points: '500',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '7',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/3.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'purchased',
        points: '250',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '8',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/4.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'live',
        points: '200',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'}];


});

var pr = null;
turnOnApp.controller('productController', function productController ($scope, $location, $http, $log,$interval,$routeParams) {
  pr = $scope;
  $scope.productId = $routeParams.productId;
  $scope.products = [{ id:'1',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '15 000'},
                  { id: '2',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '50 000'},
                  {id: '3',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_2@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10 000'},
                  {id: '4',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10 000'},
                  {id: '5',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '15 000'},
                  {id: '6',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                   points: '50 000'},
                  {id: '7',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_2@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10 000'}];

//this function give me the selectd proudct
  $scope.products.forEach (function(item){
      if (item.id == $scope.productId )
      {
          $scope.product = item;
      }

  },this);

  });

var soc = null;
turnOnApp.controller('socialController', function socialController ($scope, $location, $http, $log,$interval) {
  soc = $scope;

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
