angular.module('clixtv').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui/buttons/view.secondary-button.html',
    "<a href=# class=clix-secondary-button><div ng-transclude></div></a>"
  );


  $templateCache.put('ui/categories/view.video-category-scroll-list.html',
    "<div class=video-category-scroll-list ng-show=category.title><h2><a href=#>{{category.title}} <i class=icon-right-arrow></i></a></h2><div ng-if=category.videos class=category-container><slick slides-to-show=5 slides-to-scroll=5 infinite=false variable-width=true prev-arrow=#carousel-previous-{{$id}} next-arrow=#carousel-next-{{$id}} settings=carouselConfig><div ng-repeat=\"video in category.videos\" class=video-content-container style=\"width: {{videoContainerWidth}}px\"><div clix-video-content-box video=video></div></div></slick><div class=\"arrow-container left-arrow-container\" id=carousel-previous-{{$id}} ng-show=leftArrowVisible><div class=arrow-inner-container><i class=icon-left-tall-arrow></i></div></div><div class=\"arrow-container right-arrow-container\" id=carousel-next-{{$id}}><i class=icon-right-tall-arrow></i></div></div></div>"
  );


  $templateCache.put('ui/clix-sec-block/clix-sec-block.html',
    "<div class=BOOP></div>"
  );


  $templateCache.put('ui/footer/view.footer.html',
    "<footer class=clix-footer><div class=footer-content><div class=footer-column><div class=icon-clixtv-footer-logo></div></div><div class=footer-column><div class=footer-label>Company</div><ul class=footer-list><li><a href=#>What is ClixTV?</a></li><li><a href=#>Investor Relations</a></li><li><a href=#>Advertisers</a></li><li><a href=#>Jobs</a></li><li><a href=#>Press</a></li><li><a href=#>News</a></li></ul></div><div class=footer-column><div class=footer-label>Useful Links</div><ul class=footer-list><li><a href=#>Store</a></li><li><a href=#>Charities</a></li><li><a href=#>Celebrities</a></li><li><a href=#>Affiliates</a></li><li><a href=#>Rewards</a></li><li><a href=#>Video Categories</a></li><li><a href=#>Help</a></li><li><a href=#>Contact</a></li></ul></div><div class=footer-column><a href=# class=social-icon><i class=icon-facebook-logo></i> </a><a href=# class=social-icon><i class=icon-twitter-logo></i> </a><a href=# class=social-icon><i class=icon-youtube-logo></i> </a><a href=# class=social-icon><i class=icon-instagram-logo></i></a></div></div><div class=footer-legal-container><div class=footer-legal-column><a href=#>Legal</a></div><div class=footer-legal-column><a href=#>Cookies</a></div><div class=footer-legal-column>&copy; ClixTV, Inc</div></div></footer>"
  );


  $templateCache.put('ui/header/view.header-search-icon.html',
    "<div class=search-bar ng-class=\"{'inactive': !searchBarVisible}\" clix-click-anywhere-else=bodyClicked><div class=search-bar-background><a href=# class=search-icon-container ng-click=searchIconClicked($event)><i class=icon-search-icon></i> </a><input type=text placeholder=Search...></div></div>"
  );


  $templateCache.put('ui/header/view.header.html',
    "<header class=clix-header clix-scroll-offset-class offset=100 scroll-class=filled><h1 class=logo-container><a href=#><img src=assets/theme/clixtv/dist/images/logo.png class=clix-logo></a></h1><nav class=clix-navigation><div class=navigation-item-container><a href=#>Categories</a></div><div class=navigation-item-container><a href=#>Stars</a></div><div class=navigation-item-container><a href=#>Brands</a></div><div class=navigation-item-container><a href=#>Charities</a></div><div class=\"navigation-item-container search-item-container\"><clix-header-search-icon></clix-header-search-icon></div></nav></header>"
  );


  $templateCache.put('ui/home/view.home.html',
    "<div class=home-page><div class=main-video-container><video src=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5829ca559c56fb0004f1fd6d/file.mp4 autoplay=\"\" loop=\"\" muted=\"\"></video><div class=video-overlay></div><div class=carousel-container id=carousel-container><slick dots=true autoplay=true autoplay-speed=5000 prev-arrow=#main-carousel-previous next-arrow=#main-carousel-next pause-on-hover=true><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>The Network That Gives To All.</div><div class=\"carousel-second-line carousel-sub-header\">Support Your Favorite Causes By Watching</div><div class=button-container><a href=# class=primary-button>Sign Up Free</a></div></div></div></div><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>Your Stars. Their Passions.</div><div class=\"carousel-second-line carousel-sub-header\">Premium content from your favorite stars</div><div class=button-container><a href=# class=primary-button>Sign Up Free</a></div></div></div></div><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>Your Stars. Their Passions.</div><div class=\"carousel-second-line carousel-sub-header\">Premium content from your favorite stars</div><div class=button-container><a href=# class=primary-button>Sign Up Free</a></div></div></div></div></slick></div><div id=main-carousel-previous><div class=main-carousel-button><i class=icon-left-tall-arrow></i></div></div><div id=main-carousel-next><div class=main-carousel-button><i class=icon-right-tall-arrow></i></div></div></div><div ng-repeat=\"category in categories\"><clix-video-category-scroll-list category=category></clix-video-category-scroll-list></div></div>"
  );


  $templateCache.put('ui/logo/view.logo.html',
    "<div class=clix-logo-container ng-class=\"{'clix-charity-logo-container': charity}\"><img ng-if=logoUrl ng-src={{logoUrl}} class=logo-image></div>"
  );


  $templateCache.put('ui/tooltip-menu/view.tooltip-menu.html',
    "<div class=tooltip-menu><menu class=menu-container ng-show=menuopen><menuitem ng-repeat=\"item in items\"><a ng-click=item.onClick() class=menu-item><i class=\"menu-icon {{item.icon}}\"></i> <span class=menu-label>{{item.label}}</span></a></menuitem></menu></div>"
  );


  $templateCache.put('ui/video-content-box/view.video-content-box.html',
    "<div class=video-content-box ng-show=ready><div class=header-container><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-inner-content><a href=#><div class=artist-avatar style=\"background-image: url({{video.PosterH.url}})\"></div></a><div class=artist-name><a href=#>{{video.artist_name}}</a></div><a class=menu-icon-container ng-click=menuClicked() clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></a></div></div><div class=video-thumbnail><img ng-src={{video.PosterH.url}} class=video-thumbnail-image clix-on-image-load=onImageLoad($event)><div class=video-thumbnail-action-container><div class=video-thumbnail-inner-container><div class=violator-container><clix-violator>100 Reward Points</clix-violator></div><div class=video-brand-icon-list><div class=video-brand-icon ng-repeat=\"brand in video.brands | limitTo: 5 track by $index\" style=\"background-image: url({{brand.BrandTransparentLogo.url}})\"></div></div></div><div class=action-buttons-container><a href=# class=save-button><div class=\"icon-save-icon-normal button-normal\"></div><div class=\"icon-save-icon-hover button-hover\"></div><div class=\"icon-save-icon-click button-click\"></div></a><a class=play-button ng-click=\"go('/video/' + video._id)\"><div class=\"icon-play-button-normal button-normal\"></div><div class=\"icon-play-button-hover button-hover\"></div><div class=\"icon-play-button-click button-click\"></div></a></div></div></div><div class=footer-container><a href=#><span class=series-title>{{video.title}}</span><br><span class=episode-title>Episode 1: {{video.title}}</span></a></div></div>"
  );


  $templateCache.put('ui/video-permalink/view.video-permalink.html',
    "<div class=video-permalink-page><div class=row><div class=\"col-lg-8 video-player-column-container\"><div class=video-player><div id=videoPlayer></div><clix-video-player ng-if=video video=video auto-play=true video-id=videoPlayer on-ready=onPlayerReady></clix-video-player></div></div><div class=\"col-lg-4 star-info-column-container\"><div class=about-video-container><div class=about-video-inner-container style=\"height: {{playerHeight || 0}}px\"><div class=star-name-container><div class=star-avatar style=\"background-image: url({{video.PosterH.url}})\"></div><div class=star-name>{{video.artist_name}}</div><a href=# class=\"favorite-icon icon-favorite-icon\"></a></div><div class=social-container><div class=violator-container><clix-violator size=large>100 Reward Points</clix-violator></div><div class=social-icon-container><a href=# class=\"social-icon icon-heart-icon\"></a><div class=social-icon-label>256K</div></div><div class=social-icon-container><a href=# class=\"social-icon icon-save-icon\"></a></div><div class=social-icon-container><a href=# class=\"social-icon icon-share-icon\"></a><clix-points-violator>50</clix-points-violator></div></div><div class=video-info-container><div class=series-title>{{video.title}}</div><div class=episode-title>Episode 1: {{video.title}}</div><div class=total-views-available-container><div class=total-views>48,096,110 views</div><div class=available-until>Available Until 2 February 2017</div></div><div class=description>{{video.description}}</div><div class=meta-data><div class=meta-data-row><span class=meta-data-label>Category: </span><span ng-repeat=\"category in video.categories\"><a href=#>{{category.name}}</a><span ng-if=!$last>,</span></span></div></div></div></div><div id=toggle-button-container><div class=visibility-toggle-button><clix-secondary-button>Show More</clix-secondary-button></div><div class=brands-charity-container><div class=brands-container><div class=\"brands-charity-title brands-title\">Brands in this Series</div><div class=logo-list-container><div class=brand-logo clix-logo logo-url=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/58054a355f7c20000319780f/texaco_logo_white.png></div><div class=brand-logo clix-logo logo-url=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/580549d45f7c20000319780c/cabelas_logo_whtie.png></div></div></div><div class=charity-container><div class=\"brands-charity-title charity-title\">Charity</div><div class=logo-list-container><div class=charity-logo clix-logo charity=true logo-url=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d3ffc801b10003711113/special-olympics-world-games1.png></div></div></div></div></div></div></div></div></div>"
  );


  $templateCache.put('ui/violator/view.points-violator.html',
    "<div class=points-violator><span class=plus-sign>+</span><span ng-transclude></span></div>"
  );


  $templateCache.put('ui/violator/view.violator.html',
    "<div class=\"violator {{size}}\">100 Reward Points</div>"
  );

}]);
