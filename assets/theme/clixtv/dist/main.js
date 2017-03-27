(function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['clixtv']);
    });


    var module = angular
        .module('clixtv', [
            'slickCarousel',
            'ui.router',
            'duParallax',
            'ui.bootstrap'
        ])
        .config([
            '$locationProvider',
            '$httpProvider',
            '$stateProvider',
            '$urlRouterProvider',
            function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
                // $locationProvider.hashPrefix('!');
                // $httpProvider.defaults.useXDomain = true;
                // delete $httpProvider.defaults.headers.common['X-Requested-With'];

                // $locationProvider.html5Mode(true);
                $urlRouterProvider.when('', '/');

                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'ui/home/view.home.html',
                        controller: 'HomeController'
                    })
                    .state('video', {
                        url: '/video/:id',
                        templateUrl: 'ui/video-permalink/view.video-permalink.html',
                        controller: 'VideoPermalinkController'
                    })
                    .state('brands', {
                        url: '/brands',
                        templateUrl: 'ui/brand/view.brands.html',
                        controller: 'BrandsController'
                    })
                    .state('brand', {
                        url: '/brand/:slug',
                        templateUrl: 'ui/brand/view.brand.html',
                        controller: 'BrandController'
                    })
                    .state('charity', {
                        url: '/charity/:id',
                        templateUrl: 'ui/charity/view.charity.html',
                        controller: 'CharityController'
                    })
                    .state('charities', {
                        url: '/charities',
                        templateUrl: 'ui/charity/view.charities.html',
                        controller: 'CharitiesController'
                    })
                    .state('stars', {
                        url: '/stars',
                        templateUrl: 'ui/stars/view.stars.html',
                        controller: 'StarsController'
                    })
                    .state('star', {
                        url: '/star/:id',
                        templateUrl: 'ui/stars/view.star.html',
                        controller: 'StarController'
                    })
                    .state('categories', {
                        url: '/categories',
                        templateUrl: 'ui/categories/view.categories.html',
                        controller: 'CategoriesController'
                    })
                    .state('category', {
                        url: '/category/:slug',
                        templateUrl: 'ui/categories/view.category.html',
                        controller: 'CategoryController'
                    })
                    .state('offer', {
                        url: '/offer/:id',
                        templateUrl: 'ui/offer/view.offer.html',
                        controller: 'OfferController'
                    })
                    .state('account', {
                        url: '/account/:section',
                        templateUrl: 'ui/account/view.account.html',
                        controller: 'AccountController'
                    })
            }
        ])
        .run([
            'userService',
            function(userService) {
                userService.getLoggedInUser();
            }
        ]);
}());

angular.module('clixtv').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui/account/overview/view.overview.html',
    "<div class=clix-account-overview><clix-account-header><header-text>Account Overview</header-text></clix-account-header><div class=\"row body-content\"><div class=\"col-md-6 personal-info-container\"><div class=account-info-sub-header>Personal Information</div><div class=personal-info-form><div class=personal-info-form-row><div class=form-header><div class=form-header-label>First Name</div><a ng-click=\"onFieldEdit('firstName')\" class=\"icon-edit-icon form-header-edit\"></a></div><div class=form-value-container><div class=form-value><input ng-model=form.firstName type=text ng-disabled=\"editField !== 'firstName'\"></div></div></div><div class=personal-info-form-row><div class=form-header><div class=form-header-label>Last Name</div><a ng-click=\"onFieldEdit('lastName')\" class=\"icon-edit-icon form-header-edit\"></a></div><div class=form-value-container><div class=form-value><input ng-model=form.lastName type=text ng-disabled=\"editField !== 'lastName'\"></div></div></div><div class=personal-info-form-row><div class=form-header><div class=form-header-label>Email</div><a ng-click=\"onFieldEdit('email')\" class=\"icon-edit-icon form-header-edit\"></a></div><div class=form-value-container><div class=form-value><input ng-model=form.email type=email ng-disabled=\"editField !== 'email'\"></div></div></div><div class=personal-info-form-row><div class=form-header><div class=form-header-label>Password</div><a ng-click=\"onFieldEdit('password')\" class=\"icon-edit-icon form-header-edit\"></a></div><div class=form-value-container><div class=form-value><input ng-model=form.password type=password ng-disabled=\"editField !== 'password'\"></div></div></div><div class=personal-info-form-row><div class=form-header><div class=form-header-label>Date Of Birth</div><a ng-click=\"onFieldEdit('birthdate')\" class=\"icon-edit-icon form-header-edit\"></a></div><div class=form-value-container><div class=form-value><input ng-model=form.birthdate type=text ng-disabled=\"editField !== 'birthdate'\"></div></div></div><div class=personal-info-form-row><div class=form-header><div class=form-header-label>Gender</div><a ng-click=\"onFieldEdit('gender')\" class=\"icon-edit-icon form-header-edit\"></a></div><div class=form-value-container><div class=form-value><input ng-model=form.gender type=text ng-disabled=\"editField !== 'gender'\"></div></div></div><div class=personal-info-form-row><div class=form-header><div class=form-header-label>Phone</div><a ng-click=\"onFieldEdit('phone')\" class=\"icon-edit-icon form-header-edit\"></a></div><div class=form-value-container><div class=form-value><input ng-model=form.phone type=tel ng-disabled=\"editField !== 'phone'\"></div></div></div><div class=personal-info-form-row><div class=form-header><div class=form-header-label>Credit Card</div><a ng-click=\"onFieldEdit('paymentData')\" class=\"icon-edit-icon form-header-edit\"></a></div><div class=form-value-container><div class=form-value><input ng-model=form.paymentData type=tel ng-disabled=\"editField !== 'paymentData'\"></div></div></div></div></div><div class=\"col-md-6 reward-points-container\"><div class=account-info-sub-header>Reward Points</div><div class=reward-points><div class=\"reward-points-block first-block\"><div class=points-label>1760</div><div class=available-balance-label>Available Points Balance<br>$17.60 Cash Balance</div></div><div class=reward-points-block><div class=level-label>Level 2</div><div class=available-balance-label>Reward Status</div></div><div class=\"reward-points-block last-block\"><div class=progress-label>185 of 500 Points</div><div class=clix-progress-bar-container><div class=clix-progress-bar style=\"width: 50%\"></div></div><div class=available-balance-label>Earn 500 points or more this month to stay at <a href=#>Level 2</a></div></div><div class=rewards-button><clix-primary-button ui-sref=\"account({ section: 'rewards' })\" ui-sref-opts={reload:true}>Go To My Rewards</clix-primary-button></div></div></div></div></div>"
  );


  $templateCache.put('ui/account/view.account.html',
    "<div class=clix-account-page><div class=account-navigation><clix-navigation-bar active-item=activeItem on-item-select=onNavigationItemSelect></clix-navigation-bar></div><div class=account-page ng-switch=activeItem><div ng-switch-when=overview><clix-account-overview></clix-account-overview></div><div ng-switch-when=watchlist><clix-account-watchlist></clix-account-watchlist></div></div></div>"
  );


  $templateCache.put('ui/account/watchlist/view.watchlist.html',
    "<div class=clix-account-watchlist><clix-account-header><header-text>Watchlist</header-text><accessory-view><div class=filter-containers><div class=filter-container><clix-dropdown options=filterOptions></clix-dropdown></div><div class=filter-container><clix-dropdown options=sortOptions></clix-dropdown></div></div></accessory-view></clix-account-header><div class=watchlist-container><div ng-if=\"!watchlist || watchlist.length === 0\"><div class=empty-message-container><clix-empty-container>Add videos to watchlist and watch them later</clix-empty-container></div></div><div ng-if=\"watchlist && watchlist.length > 0\"><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-12 col-sm-6 col-md-4 col-lg-3\" ng-repeat=\"video in watchlist\"><clix-video-content-box video=video></clix-video-content-box></div></div></div></div></div>"
  );


  $templateCache.put('ui/brand/view.brand.html',
    "<div class=brand-page ng-if=configs><clix-hero-banner title-text={{configs.title}} button-text=\"{{'+ Favorites'}}\" points=\"{{'50'}}\" subtext=\"{{'18 Offers'}}\" button-icon-class=\"{{'icon-favorite-icon banner-favorite-icon'}}\" background-image={{configs.backgroundImage}} background-image2x={{configs.backgroundImage2x}}><hero-banner-logo><img ng-src={{configs.logo}} ng-srcset=\"{{configs.logo2x}} 2x\"></hero-banner-logo></clix-hero-banner><div class=brand-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Home><div class=home-container><clix-landing-video-content video=video><content-description><clix-secondary-header>About {{configs.title}}</clix-secondary-header><div class=home-description>{{configs.description}}</div></content-description><sidebar-title>More Offers From {{configs.title}}</sidebar-title><sidebar-content><div ng-repeat=\"offer in offers | limitTo: 3\" ng-if=offers><div class=brand-offer><clix-content-callout sref=\"brand({ slug: (offer.title | slug) })\"><header-element><clix-offer-logo offer=offer></clix-offer-logo></header-element><title-content>{{offer.title}}</title-content><subtitle-content>Expires 2/1/2017</subtitle-content></clix-content-callout></div></div></sidebar-content><footer-content><div class=brand-categories-container><clix-secondary-header>Brand Categories <i class=icon-right-arrow></i></clix-secondary-header><div class=brand-category-logo-container><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Sportswear></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Shoes></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Swimwear></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=\"Training & Gym\"></clix-brand-category-logo></div></div></div><div ng-repeat=\"celebrity in celebrities | limitTo: 3\"><clix-video-category-scroll-list category-title=\"{{celebrity.title}} and {{configs.title}}\" category-videos=relatedVideos></clix-video-category-scroll-list></div></footer-content></clix-landing-video-content></div></uib-tab><uib-tab index=1 heading=Offers><div class=\"row clix-block-row offers-container\"><div class=\"clix-block-item col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"offer in offers\" ng-if=offers><clix-content-callout sref=\"offer({ id: '{{offer._id}}' })\"><header-element><clix-offer-logo offer=offer></clix-offer-logo></header-element><title-content>{{offer.title}}</title-content><subtitle-content>Expires 2/1/2017</subtitle-content></clix-content-callout></div></div></uib-tab><uib-tab index=2 heading=Stars><div class=stars-container><div ng-repeat=\"celebrity in celebrities\"><clix-video-category-scroll-list category-title=\"{{celebrity.title}} and {{configs.title}}\" category-videos=relatedVideos></clix-video-category-scroll-list></div></div></uib-tab><uib-tab index=3 heading=Videos><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>All Videos Featuring {{configs.title}}</clix-secondary-header></div><div class=video-sort-container><clix-dropdown options=seriesList></clix-dropdown></div></div><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-6 col-sm-4 col-md-3 col-lg-2-4\" ng-repeat=\"video in videos\" ng-if=videos><clix-video-content-box video=video></clix-video-content-box></div></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/brand/view.brands.html',
    "<div class=brands-page><div class=main-header><clix-main-header>Brands &amp; Offers</clix-main-header></div><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Brands><div class=search-filter-container><clix-search-filter search-placeholder=\"Search Brands\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterBrandsOptions sort-options=sortBrandsOptions></clix-search-filter></div><div class=\"row brands-list\"><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"(id, brand) in brands\"><div class=brand-logo-container><div class=brand-container><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></div></div><a ui-sref=\"brand({ slug: (brand.title | slug) })\" class=brand-footer><span class=brand-title>{{brand.title}} </span><span class=brand-offers>30 Offers</span></a></div></div></uib-tab><uib-tab index=1 heading=Offers><div class=search-filter-container><clix-search-filter search-placeholder=\"Search Offers\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterOffersOptions sort-options=sortOffersOptions></clix-search-filter></div><div class=\"row brands-list\"><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"(id, offer) in offers\"><div class=brand-logo-container><div class=brand-container><clix-offer-logo offer=offer></clix-offer-logo></div></div><a ui-sref=\"brand({ slug: (offer.title | slug) })\" class=brand-footer><span class=brand-title>{{offer.title}} </span><span class=brand-offers>Nike </span><span class=brand-offers>Expires 2/1/2017</span></a></div></div></uib-tab></uib-tabset></div></div>"
  );


  $templateCache.put('ui/buttons/view.callout-button.html',
    "<div class=clix-callout-button><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/buttons/view.primary-button.html',
    "<div class=clix-primary-button ng-class=\"{'button-facebook': type === 'facebook', 'button-google': type === 'google'}\"><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/buttons/view.secondary-button.html',
    "<div class=clix-secondary-button><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/buttons/view.tertiary-button.html',
    "<a href=# class=clix-tertiary-button><div class=\"button-edge left-edge\"></div><div class=\"button-edge right-edge\"></div><div class=button-content><div ng-transclude></div></div></a>"
  );


  $templateCache.put('ui/categories/view.categories.html',
    "<div class=clix-categories-page><clix-filter-page ng-if=categories><page-title>Video Categories</page-title><page-search-filter><clix-search-filter search-placeholder=\"Search Categories\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterOptions sort-options=sortOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=categories><clix-content-callout sref=\"brand({ slug: '{{item.title}}' })\"><header-element><div class=category-logo style=\"background-image: url('{{item.BrandLogo.url}}')\"></div></header-element><title-content>{{item.title}}</title-content><subtitle-content>127 Videos</subtitle-content></clix-content-callout></clix-content-callout-list></page-content></clix-filter-page></div>"
  );


  $templateCache.put('ui/categories/view.category.html',
    "<div class=clix-category-page>Boop</div>"
  );


  $templateCache.put('ui/categories/view.video-category-scroll-list.html',
    "<div class=video-category-scroll-list ng-show=categoryTitle><h2><a href=#>{{categoryTitle}} <i class=icon-right-arrow></i></a></h2><div ng-if=categoryVideos class=category-container><slick slides-to-show=5 slides-to-scroll=5 infinite=false variable-width=true prev-arrow=#carousel-previous-{{$id}} next-arrow=#carousel-next-{{$id}} settings=carouselConfig><div ng-repeat=\"video in categoryVideos\" class=video-content-container style=\"width: {{videoContainerWidth}}px\"><div clix-video-content-box video=video></div></div></slick><div class=\"arrow-container left-arrow-container\" id=carousel-previous-{{$id}} ng-show=leftArrowVisible><div class=arrow-inner-container><i class=icon-left-tall-arrow></i></div></div><div class=\"arrow-container right-arrow-container\" id=carousel-next-{{$id}}><i class=icon-right-tall-arrow></i></div></div></div>"
  );


  $templateCache.put('ui/charity/view.charities.html',
    "<div class=charities-page><div class=main-header><clix-main-header>Charities</clix-main-header></div><div class=search-filter-container><clix-search-filter search-placeholder=\"Search Charities\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterCharitiesOptions sort-options=sortCharitiesOptions></clix-search-filter></div><div class=\"row brands-list\"><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"(id, charity) in charities\"><div class=brand-logo-container><div class=brand-container><clix-charity-logo charity=charity></clix-charity-logo></div></div><a ui-sref=\"charity({ id: '{{charity._id}}' })\" class=brand-footer><span class=brand-title>{{charity.title}} </span><span class=brand-offers>Nike</span></a></div></div></div>"
  );


  $templateCache.put('ui/charity/view.charity.html',
    "<div class=charity-page ng-if=configs><clix-hero-banner title-text={{configs.title}} button-text=\"{{'+ Favorites'}}\" subtext=\"{{'18 Offers'}}\" button-icon-class=\"{{'icon-favorite-icon banner-favorite-icon'}}\" background-image={{configs.backgroundImage}} background-image2x={{configs.backgroundImage2x}}><hero-banner-logo><img ng-src={{configs.logo}} ng-srcset=\"{{configs.logo2x}} 2x\"></hero-banner-logo></clix-hero-banner><div class=charity-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Home>Static content</uib-tab><uib-tab index=1 heading=Donate>Static content</uib-tab><uib-tab index=2 heading=Stars>Static content</uib-tab><uib-tab index=3 heading=Videos>Static content</uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/clix-sec-block/clix-sec-block.html',
    "<div class=BOOP></div>"
  );


  $templateCache.put('ui/common/account/view.account-header.html',
    "<div class=clix-account-header><div class=row><div class=\"header-text col-sm-6\"><div ng-transclude=headerText></div></div><div class=\"accesory-view col-sm-6\"><div ng-transclude=accessoryView></div></div></div></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.brand-category-logo.html',
    "<div class=clix-brand-category-logo><div class=logo-image style=\"background-image: url('{{brand.BrandTransparentLogo.url}}')\"></div><div class=logo-category-title>{{categoryTitle}}</div><div class=logo-category-violator><clix-points-violator>50</clix-points-violator></div></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.brand-charity-logo.html',
    "<div class=clix-brand-charity-logo><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=logo-image style=\"background-image: url('{{brand.BrandTransparentLogo.url}}')\"></div><div class=logo-points><clix-points-violator>50</clix-points-violator></div><div class=logo-overlay><a ui-sref=\"brand({ slug: (brand.title | slug) })\" class=hit-area></a> <a ui-sref=\"brand({ slug: (brand.title | slug) })\" class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></a><div class=logo-save><clix-favorite-button></clix-favorite-button></div><div class=logo-ellipsis><div class=menu-icon-container ng-click=menuClicked($event) clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></div></div></div></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.charity-logo.html',
    "<div class=clix-charity-logo><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=logo-image style=\"background-image: url('{{charity.BrandTransparentLogo.url}}')\"></div><div class=logo-overlay><a ui-sref=\"charity({ id: '{{charity._id}}' })\" class=hit-area></a> <a ui-sref=\"charity({ id: '{{charity._id}}' })\" class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></a><div class=logo-save><clix-favorite-button></clix-favorite-button></div><div class=logo-ellipsis><div class=menu-icon-container ng-click=menuClicked($event) clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></div></div></div></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.offer-logo.html',
    "<div class=clix-offer-logo style=\"background-image: url('{{offer.BrandLogo.url}}')\"><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=logo-overlay-image></div><div class=logo-icon style=\"background-image: url('{{offer.BrandTransparentLogo.url}}')\"></div><div class=logo-points><clix-points-violator>50</clix-points-violator></div><div class=logo-overlay><a ui-sref=\"brand({ slug: (offer.title | slug) })\" class=hit-area></a> <a ui-sref=\"brand({ slug: (offer.title | slug) })\" class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></a><div class=logo-save><clix-save-button></clix-save-button></div><div class=logo-ellipsis><div class=menu-icon-container ng-click=menuClicked($event) clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></div></div></div></div>"
  );


  $templateCache.put('ui/common/buttons/view.ellipsis-button.html',
    "<div class=clix-ellipsis-button><div class=view-button><div class=view-button-text>View</div></div></div>"
  );


  $templateCache.put('ui/common/buttons/view.favorite-button.html',
    "<div class=clix-favorite-icon><i class=icon-favorite-icon></i> <i class=\"icon-favorite-icon-filled fill-state\"></i></div>"
  );


  $templateCache.put('ui/common/buttons/view.save-button.html',
    "<div class=clix-save-button><div class=\"icon-save-icon-normal button-normal\"></div><div class=\"icon-save-icon-hover button-hover\"></div><div class=\"icon-save-icon-click button-click\"></div></div>"
  );


  $templateCache.put('ui/common/buttons/view.view-button.html',
    "<div class=clix-view-button><div class=view-button><div class=view-button-text>{{text || 'View'}}</div></div></div>"
  );


  $templateCache.put('ui/common/container/view.content-callout-list.html',
    "<div class=\"row brands-list\"><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"item in items\" clix-transclude-inject><div ng-transclude></div></div></div>"
  );


  $templateCache.put('ui/common/container/view.content-callout.html',
    "<div class=clix-content-callout><div class=header-callout-container><div class=header-container ng-transclude=headerElement></div><clix-tooltip-menu items=items menuopen=menuVisible class=overlay-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-overlay><a ui-sref={{sref}} class=hit-area></a> <a ui-sref={{sref}} class=view-button-container><div class=view-button><clix-view-button text=Go></clix-view-button></div></a><div class=header-save><clix-favorite-button></clix-favorite-button></div><div class=header-ellipsis><div class=menu-icon-container ng-click=menuClicked($event) clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></div></div></div></div><a ui-sref={{sref}} class=callout-footer-container><span class=callout-title ng-transclude=titleContent></span> <span class=callout-subtitle ng-transclude=subtitleContent></span></a></div>"
  );


  $templateCache.put('ui/common/container/view.empty-container.html',
    "<div class=clix-empty-container><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/headers/view.main-header.html',
    "<div class=clix-main-header><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/headers/view.secondary-header.html',
    "<div class=clix-secondary-header><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/hero-banner/view.hero-banner.html',
    "<div class=clix-hero-banner><img class=hero-background-image ng-src={{backgroundImage}} alt=\"\" draggable=false du-parallax y=background><div class=hero-banner-overlay du-parallax y=background></div><div class=hero-banner-content-container><div class=hero-banner-content><div class=banner-logo-container><div ng-transclude=logo></div></div><div class=banner-title-content><div class=banner-title>{{titleText}}</div><div class=banner-button><clix-tertiary-button>{{buttonText}} <i class={{buttonIconClass}} ng-if=buttonIconClass></i></clix-tertiary-button><a href=# class=\"icon-share-icon banner-share-icon\"></a><div class=header-points-violator ng-if=points><clix-points-violator>{{points}}</clix-points-violator></div></div></div><div class=banner-subtext-container>{{subtext}}</div></div></div></div>"
  );


  $templateCache.put('ui/common/modal/login-signup/view.login-signup.html',
    "<clix-modal><a ng-click=onCloseIconPress() class=\"hidden-md hidden-lg icon-remove-icon clix-modal-close\"></a><div class=signup-modal ng-show=signup><div class=signup-modal-header><div class=\"header-logo-icon icon-colorful-clix-logo\"></div></div><div class=signup-modal-social><div class=social-modal-row><clix-primary-button type=facebook>Sign Up With Facebook</clix-primary-button></div><div class=social-modal-row><clix-primary-button type=google>Sign Up With Google</clix-primary-button></div><div class=or-email-container><span>or with email</span></div></div><div class=signup-modal-form><div class=signup-modal-form-row><i class=\"form-icon small icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=Email name=email></div></div><div class=signup-modal-form-row><i class=\"form-icon small icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=\"Re-Enter Email\" name=email-confirm></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=\"Choose Password\" name=password></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=\"Re-Enter Password\" name=password-confirm></div></div><div class=signup-modal-form-row><i class=\"form-icon large icon-full-name-input-icon\"></i><div class=signup-modal-input><input type=text placeholder=\"Full Name\" name=name></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-dateofbirth-input-icon\"></i><div class=signup-modal-input><input type=text placeholder=\"Date of Birth\" name=birthdate></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-gender-input-icon\"></i><div class=signup-modal-input><input type=text placeholder=Gender name=gender></div></div></div><div class=signup-modal-submit><div class=submit-button><clix-primary-button type=normal>Sign Up</clix-primary-button></div><div class=login-container>Have an account? <a ng-click=onLoginPress()>Log in</a></div></div><div class=signup-modal-footer>By signing in, you agree to our <a ng-click=onTermsPress()>Terms of Service</a> and <a ng-click=onPrivacyPress()>Privacy Policy</a></div></div><div class=signup-modal ng-hide=signup><div class=signup-modal-header><div class=\"header-logo-icon icon-colorful-clix-logo\"></div></div><div class=signup-modal-social><div class=social-modal-row><clix-primary-button type=facebook ng-click=onFacebookLoginPress()>Log In With Facebook</clix-primary-button></div><div class=social-modal-row><clix-primary-button type=google ng-click=onGoogleLoginPress()>Log In With Google</clix-primary-button></div><div class=or-email-container><span>or with email</span></div></div><form ng-submit=onLoginSubmit() class=signup-modal-form><div class=signup-modal-form-row><i class=\"form-icon small icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=Email ng-model=loginModel.email></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=Password ng-model=loginModel.password></div></div><input type=submit></form><div class=signup-modal-submit><div class=submit-button><clix-primary-button type=normal ng-click=onLoginSubmit()>Log In</clix-primary-button></div><div class=login-container><a ng-click=onForgotPasswordPress() class=forgot-password>Forgot Password?</a><br>Don't have an account? <a ng-click=onSignupPress()>Sign up</a></div></div><div class=signup-modal-footer>By signing in, you agree to our <a ng-click=onTermsPress()>Terms of Service</a> and <a ng-click=onPrivacyPress()>Privacy Policy</a></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/view.modal.html',
    "<div class=clix-modal><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/navigation/view.navigation-bar.html',
    "<div class=clix-navigation-bar><div class=\"avatar-container empty-avatar\"><div ng-if=loggedInUser.avatar><div class=avatar-background-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div><div class=avatar-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div></div><div ng-if=!loggedInUser.avatar><div class=avatar-background></div><div class=avatar-image style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></div></div></div><nav class=navigation-list><a ng-click=\"onItemSelect('overview')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'overview'}\"><div class=navigation-list-icon><i class=icon-account-icon></i></div><div class=navigation-list-label>Account</div></a><a ng-click=\"onItemSelect('watchlist')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'watchlist'}\"><div class=navigation-list-icon><i class=icon-plus-icon></i></div><div class=navigation-list-label>Watchlist</div></a><a ng-click=\"onItemSelect('favorites')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'favorites'}\"><div class=navigation-list-icon><i class=icon-favorite-icon></i></div><div class=navigation-list-label>Favorites</div></a><a ng-click=\"onItemSelect('saved-offers')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'saved-offers'}\"><div class=navigation-list-icon><i class=icon-offers-icon></i></div><div class=navigation-list-label>Saved Offers</div></a><a ng-click=\"onItemSelect('rewards')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'rewards'}\"><div class=navigation-list-icon><i class=icon-rewards-icon-left-nav></i></div><div class=navigation-list-label>Rewards</div></a><a ng-click=\"onItemSelect('notifications')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'notifications'}\"><div class=navigation-list-icon><i class=icon-notifications-icon-left-nav></i></div><div class=navigation-list-label>Notifications</div></a><a ng-click=\"onItemSelect('settings')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'settings'}\"><div class=navigation-list-icon><i class=icon-settings-icon-left-nav></i></div><div class=navigation-list-label>Settings</div></a></nav></div>"
  );


  $templateCache.put('ui/common/navigation/view.right-navigation.html',
    "<div class=clix-right-navigation ng-class=\"{'active': open}\"><div class=navigation-background-overlay ng-click=onBackgroundPress() ng-class=\"{'active': visible}\"></div><div class=navigation-bar ng-class=\"{'active': visible}\"><div class=navigation-bar-content><a ng-click=onClosePress() class=navigation-close-icon><div class=icon-right-tall-arrow></div></a><div class=\"avatar-container empty-avatar\"><div ng-if=loggedInUser.avatar><div class=avatar-background-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div><div class=avatar-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div></div><div ng-if=!loggedInUser.avatar><div class=avatar-background></div><div class=avatar-image style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></div></div></div><nav class=navigation-list><a ng-click=\"goToAccount('overview')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-account-icon></i></div><div class=navigation-list-label>Account</div></a><a ng-click=\"goToAccount('watchlist')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-plus-icon></i></div><div class=navigation-list-label>Watchlist</div></a><a ng-click=\"goToAccount('favorites')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-favorite-icon></i></div><div class=navigation-list-label>Favorites</div></a><a ng-click=\"goToAccount('saved-offers')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-offers-icon></i></div><div class=navigation-list-label>Saved Offers</div></a><a ng-click=\"goToAccount('rewards')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-rewards-icon-left-nav></i></div><div class=navigation-list-label>Rewards</div></a><a ng-click=\"goToAccount('notifications')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-notifications-icon-left-nav></i></div><div class=navigation-list-label>Notifications</div></a><a ng-click=\"goToAccount('settings')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-settings-icon-left-nav></i></div><div class=navigation-list-label>Settings</div></a></nav><div class=logout-button-container><clix-secondary-button ng-click=onLogoutPress()>Log Out</clix-secondary-button></div></div></div></div>"
  );


  $templateCache.put('ui/common/page/landing/view.landing-video-content.html',
    "<div class=clix-landing-video-content><div class=row><div class=\"col-md-9 video-content-container\"><div class=row><div class=\"col-sm-7 about-landing-video\"><div ng-show=video><div id=videoPlayer></div><clix-video-player ng-if=video video=video auto-play=false video-id=videoPlayer on-ready=onPlayerReady></clix-video-player><div class=video-violator><clix-violator>100 Reward Points</clix-violator></div></div><div ng-transclude=mainContent></div></div><div class=\"col-sm-5 about-landing-content\"><div class=landing-description><div ng-transclude=contentDescription></div></div><div class=share-container><a href=# class=\"icon-share-icon landing-share-icon\"></a><div class=content-points-validator><clix-points-violator>50</clix-points-violator></div></div></div></div><div class=landing-footer-content><div ng-transclude=footerContent></div></div></div><div class=\"col-md-3 video-sidebar-container\"><div class=sidebar-container><div class=sidebar-title><div ng-transclude=sidebarTitle></div></div><div class=sidebar-content><div ng-transclude=sidebarContent></div></div></div></div></div></div>"
  );


  $templateCache.put('ui/common/page/view.filter-page.html',
    "<div class=clix-filter-page><div class=main-header><clix-main-header><div ng-transclude=pageTitle></div></clix-main-header></div><div class=search-filter-container><div ng-transclude=pageSearchFilter></div></div><div ng-transclude=pageContent></div></div>"
  );


  $templateCache.put('ui/common/page/view.landing-page.html',
    "<div class=clix-landing-page>Boop</div>"
  );


  $templateCache.put('ui/common/parallax/view.parallax.html',
    "<div class=clix-parallax id=parallax-container><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/search/view.search-filter.html',
    "<div class=clix-search-filter><div class=row><div class=col-sm-7><div class=search-bar-container><div class=search-bar><i class=\"search-icon icon-search-icon\"></i> <input type=text class=search-input placeholder={{searchPlaceholder}}></div></div></div><div class=col-sm-5><div class=filters-container><div class=filter-bar><clix-dropdown options=filterOptions></clix-dropdown></div><div class=filter-bar><clix-dropdown options=sortOptions></clix-dropdown></div></div></div></div></div>"
  );


  $templateCache.put('ui/dropdown/view.dropdown.html',
    "<div class=clix-dropdown ng-show=options clix-click-anywhere-else=bodyClicked><div class=dropdown-trigger ng-click=triggerClicked()><div class=dropdown-label>{{ selected.label }}</div><div class=dropdown-icon><i class=icon-down-arrow></i></div></div><clix-tooltip-menu items=options menuopen=menuVisible></clix-tooltip-menu></div>"
  );


  $templateCache.put('ui/footer/view.footer.html',
    "<footer class=clix-footer><div class=\"row footer-content\"><div class=\"col-xs-12 col-sm-3 footer-column\"><div class=footer-logo-container><img src=assets/theme/clixtv/dist/images/white-logo.svg class=clix-logo></div></div><div class=\"col-xs-6 col-sm-3 footer-column\"><div class=footer-label>Company</div><ul class=footer-list><li><a href=#>What is ClixTV?</a></li><li><a href=#>Investor Relations</a></li><li><a href=#>Advertisers</a></li><li><a href=#>Jobs</a></li><li><a href=#>Press</a></li><li><a href=#>News</a></li></ul></div><div class=\"col-xs-6 col-sm-3 footer-column\"><div class=footer-label>Useful Links</div><ul class=footer-list><li><a href=#>Store</a></li><li><a href=#>Charities</a></li><li><a href=#>Celebrities</a></li><li><a href=#>Affiliates</a></li><li><a href=#>Rewards</a></li><li><a href=#>Video Categories</a></li><li><a href=#>Help</a></li><li><a href=#>Contact</a></li></ul></div><div class=\"col-xs-12 col-sm-3 footer-column\"><div class=social-icons><a href=# class=social-icon><i class=icon-facebook-logo></i> </a><a href=# class=social-icon><i class=icon-twitter-logo></i> </a><a href=# class=social-icon><i class=icon-youtube-logo></i> </a><a href=# class=social-icon><i class=icon-instagram-logo></i></a></div></div></div><div class=footer-legal-container><div class=footer-legal-column><a href=#>Legal</a></div><div class=footer-legal-column><a href=#>Cookies</a></div><div class=footer-legal-column>&copy; ClixTV, Inc</div></div></footer>"
  );


  $templateCache.put('ui/header/view.header-search-icon.html',
    "<div class=search-bar ng-class=\"{'inactive': !searchBarVisible}\" clix-click-anywhere-else=bodyClicked><div class=search-bar-background><a href=# class=search-icon-container ng-click=searchIconClicked($event)><i class=icon-search-icon></i> </a><input type=text placeholder=Search...></div></div>"
  );


  $templateCache.put('ui/header/view.header.html',
    "<header class=clix-header clix-scroll-offset-class offset=100 scroll-class=filled ng-class=\"{'clix-header-hidden': scrollDirection === 'up'}\"><div class=\"clix-header-container hidden-sm hidden-xs hidden-md\"><h1 class=logo-container><a href=/ ><img src=assets/theme/clixtv/dist/images/color-logo.svg class=clix-logo></a></h1><nav class=clix-navigation><div class=navigation-item-container><a ui-sref=categories>Categories</a></div><div class=navigation-item-container><a ui-sref=stars>Stars</a></div><div class=navigation-item-container><a ui-sref=brands>Brands</a></div><div class=navigation-item-container><a ui-sref=charities>Charities</a></div><div class=\"navigation-item-container search-item-container\"><clix-header-search-icon></clix-header-search-icon></div></nav><div class=account-action-container><div ng-if=loggedInUser><div class=header-user-container><clix-header-points-violator></clix-header-points-violator><div class=header-avatar-container><div ng-if=loggedInUser.avatar><a href=# class=header-avatar style=\"background-image: url('{{loggedInUser.avatar}}')\"></a></div><div ng-if=!loggedInUser.avatar><a href=# class=header-avatar style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></a></div><div class=header-notification-count>&nbsp;20</div></div><a ng-click=onNamePress() class=header-name-container><div class=header-name>{{loggedInUser.firstName}}</div><div class=header-expand-icon><div class=icon-left-tall-arrow></div></div></a></div></div><div ng-if=!loggedInUser><clix-callout-button ng-click=onLoginSignupPress(false)>Login</clix-callout-button><a ng-click=onLoginSignupPress(true) class=account-action-label>Register Now</a></div></div></div><div class=\"clix-header-container hidden-lg\"><div class=mobile-header-block><div class=points-violator-container><clix-header-points-violator></clix-header-points-violator></div></div><a href=/ class=\"mobile-logo mobile-header-block\"><img src=assets/theme/clixtv/dist/images/color-logo-light.svg class=clix-logo></a><div class=\"user-avatar-container mobile-header-block\"><div class=user-avatar><div ng-if=!loggedInUser><clix-callout-button ng-click=onLoginSignupPress(false)>Login</clix-callout-button></div><div class=header-user-container ng-if=loggedInUser><div class=header-avatar-container><div ng-if=loggedInUser.avatar><a href=# class=header-avatar style=\"background-image: url('{{loggedInUser.avatar}}')\"></a></div><div ng-if=!loggedInUser.avatar><a href=# class=header-avatar style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></a></div><div class=header-notification-count>&nbsp;20</div></div></div></div></div></div></header>"
  );


  $templateCache.put('ui/home/view.home.html',
    "<div class=home-page><div class=main-video-container><video src=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5829ca559c56fb0004f1fd6d/file.mp4 autoplay=\"\" loop=\"\" muted=\"\"></video><div class=video-overlay></div><div class=carousel-container id=carousel-container><slick dots=true autoplay=true autoplay-speed=5000 prev-arrow=#main-carousel-previous next-arrow=#main-carousel-next pause-on-hover=true><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>The Network That Gives To All.</div><div class=\"carousel-second-line carousel-sub-header\">Support Your Favorite Causes By Watching</div><div class=button-container><a href=# class=primary-button>Sign Up Free</a></div></div></div></div><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>Your Stars. Their Passions.</div><div class=\"carousel-second-line carousel-sub-header\">Premium content from your favorite stars</div><div class=button-container><a href=# class=primary-button>Sign Up Free</a></div></div></div></div><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>Your Stars. Their Passions.</div><div class=\"carousel-second-line carousel-sub-header\">Premium content from your favorite stars</div><div class=button-container><a href=# class=primary-button>Sign Up Free</a></div></div></div></div></slick></div><div id=main-carousel-previous><div class=main-carousel-button><i class=icon-left-tall-arrow></i></div></div><div id=main-carousel-next><div class=main-carousel-button><i class=icon-right-tall-arrow></i></div></div></div><div ng-repeat=\"category in categories\" ng-if=\"category && category.videos\"><clix-video-category-scroll-list category-title={{category.title}} category-videos=category.videos></clix-video-category-scroll-list></div></div>"
  );


  $templateCache.put('ui/logo/view.logo.html',
    "<div class=clix-logo-container ng-class=\"{'clix-charity-logo-container': charity, 'large': size === 'large'}\"><img ng-if=logoUrl ng-src={{logoUrl}} class=logo-image></div>"
  );


  $templateCache.put('ui/offer/view.offer.html',
    "<div class=clix-offer-page ng-if=configs><clix-hero-banner title-text={{configs.title}} button-text=\"{{'+ Save Offer'}}\" points=\"{{'50'}}\" subtext=\"{{'Expires 1 February 2017'}}\" background-image={{configs.backgroundImage}}><hero-banner-logo><img ng-src={{configs.logo}} ng-srcset=\"{{configs.logo2x}} 2x\"></hero-banner-logo></clix-hero-banner><div class=main-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Overview><div class=home-container><clix-landing-video-content><main-content><slick dots=true prev-arrow=#main-carousel-previous next-arrow=#main-carousel-next><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-1.png></div><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-2.png></div><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-3.png></div></slick><div id=main-carousel-previous><div class=main-carousel-button><i class=\"arrow-icon icon-left-tall-arrow\"></i></div></div><div id=main-carousel-next><div class=main-carousel-button><i class=\"arrow-icon icon-right-tall-arrow\"></i></div></div></main-content><content-description><div class=home-header>Instructions</div><div class=home-instructions><div class=instructions-row><div class=instructions-number>1</div><div class=instructions-label>Click the button below to shop online at {{brand.title}}. Your Coupon code will be copied to your clipboard automatically.</div></div><div class=instructions-row><div class=instructions-number>2</div><div class=instructions-label>Paste your code during checkout.</div></div><div class=instructions-row><div class=instructions-number>3</div><div class=instructions-label>Enjoy!</div></div></div><div class=offer-buttons><div class=offer-button><div class=save-offer-button><clix-tertiary-button>+ Save Offer</clix-tertiary-button><div class=save-offer-points><clix-points-violator>50</clix-points-violator></div></div></div><div class=offer-button><div class=save-offer-button><clix-tertiary-button>Redeem Now</clix-tertiary-button><div class=save-offer-points><clix-points-violator>50</clix-points-violator></div></div></div></div></content-description><sidebar-title>More Offers From {{brand.title}}</sidebar-title><sidebar-content><div ng-repeat=\"offer in offers | limitTo: 3\" ng-if=offers><div class=brand-offer><clix-content-callout sref=\"brand({ slug: (offer.title | slug) })\"><header-element><clix-offer-logo offer=offer></clix-offer-logo></header-element><title-content>{{offer.title}}</title-content><subtitle-content>Expires 2/1/2017</subtitle-content></clix-content-callout></div></div></sidebar-content><footer-content><div class=\"offer-footer-info row\"><div class=col-md-6><div class=footer-header><clix-secondary-header>The Revolution Never Ends</clix-secondary-header></div><p>Since 1985, the sneakers carrying Michael Jordan’s name and world-renowned “Jumpman” silhouette have helped to define and shape sneaker culture. It began with a standard Nike high top, and evolved with daring designs implemented into each iteration. From graphic prints to patent leather to fighter planes and Ferrari-inspired designs, Jordan sneakers routinely transcend its basketball roots by refreshing its initial offerings with new looks and color schemes to remain prevalent throughout generations.</p><p>- Leather upper for a supportive fit</p><p>- Full-length Nike Zoom Air unit for responsive cushioning</p><p>- Carbon fiber shank helps maximize energy return</p><p>- Rubber sole for traction on a variety of surfaces</p></div><div class=col-md-6><div class=footer-header><clix-secondary-header>About {{brand.title}}</clix-secondary-header></div><p>{{brand.description}}</p></div></div></footer-content></clix-landing-video-content></div></uib-tab><uib-tab index=1 heading=\"Related Offers\"><div class=videos-title-container><div class=videos-title><clix-secondary-header>All {{brand.title}} Offers</clix-secondary-header></div></div><div class=\"row clix-block-row offers-container\"><div class=\"clix-block-item col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"offer in offers\" ng-if=offers><clix-content-callout sref=\"offer({ id: '{{offer._id}}' })\"><header-element><clix-offer-logo offer=offer></clix-offer-logo></header-element><title-content>{{offer.title}}</title-content><subtitle-content>Expires 2/1/2017</subtitle-content></clix-content-callout></div></div></uib-tab><uib-tab index=2 heading=Videos><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>All Videos Featuring {{brand.title}}</clix-secondary-header></div><div class=video-sort-container><clix-dropdown options=seriesList></clix-dropdown></div></div><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-6 col-sm-4 col-md-3 col-lg-2-4\" ng-repeat=\"video in videos\" ng-if=videos><clix-video-content-box video=video></clix-video-content-box></div></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/stars/view.star.html',
    "<div class=clix-star-page ng-if=configs><clix-hero-banner title-text={{configs.title}} button-text=\"{{'+ Favorites'}}\" button-icon-class=\"{{'icon-favorite-icon banner-favorite-icon'}}\" points=\"{{'50'}}\" subtext=\"{{'217 Videos'}}\" background-image={{configs.backgroundImage}}><hero-banner-logo><div class=star-logo style=\"background-image: url('{{configs.logo}}')\"></div></hero-banner-logo></clix-hero-banner></div>"
  );


  $templateCache.put('ui/stars/view.stars.html',
    "<div class=clix-stars-page><clix-filter-page ng-if=stars><page-title>Stars</page-title><page-search-filter><clix-search-filter search-placeholder=\"Search Stars\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterOptions sort-options=sortOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=stars><clix-content-callout sref=\"star({ id: '{{item._id}}' })\"><header-element><div class=star-logo style=\"background-image: url({{item.BrandLogo.url}})\"></div></header-element><title-content>{{item.title}}</title-content><subtitle-content>127 Videos</subtitle-content></clix-content-callout></clix-content-callout-list></page-content></clix-filter-page></div>"
  );


  $templateCache.put('ui/tooltip-menu/view.tooltip-menu.html',
    "<div class=tooltip-menu><menu class=menu-container ng-show=menuopen><menuitem ng-repeat=\"item in items\"><a ng-click=item.onClick() class=menu-item><i class=\"menu-icon {{item.icon}}\"></i> <span class=menu-label>{{item.label}}</span></a></menuitem></menu></div>"
  );


  $templateCache.put('ui/video-content-box/view.video-content-box.html',
    "<div class=video-content-box ng-show=ready><div class=header-container><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-inner-content><a href=#><div class=artist-avatar style=\"background-image: url({{video.PosterH.url}})\"></div></a><div class=artist-name><a href=#>{{video.artist_name}}</a></div><a class=menu-icon-container ng-click=menuClicked() clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></a></div></div><div class=video-thumbnail><img ng-src={{video.PosterH.url}} class=video-thumbnail-image clix-on-image-load=onImageLoad($event)><div class=video-thumbnail-action-container><div class=video-thumbnail-inner-container><div class=violator-container><clix-violator>100 Reward Points</clix-violator></div><div class=video-brand-icon-list><div class=video-brand-icon ng-repeat=\"brand in video.brands | limitTo: 5 track by $index\" style=\"background-image: url({{brand.BrandTransparentLogo.url}})\"></div></div></div><div class=action-buttons-container><a href=# class=save-button><div class=\"icon-save-icon-normal button-normal\"></div><div class=\"icon-save-icon-hover button-hover\"></div><div class=\"icon-save-icon-click button-click\"></div></a><a class=play-button ui-sref=\"video({ id: video._id })\"><div class=\"icon-play-button-normal button-normal\"></div><div class=\"icon-play-button-hover button-hover\"></div><div class=\"icon-play-button-click button-click\"></div></a></div></div></div><div class=footer-container><a ui-sref=\"video({ id: video._id })\"><span class=series-title>{{video.title || '&nbsp;'}}</span><br><span class=episode-title>Episode 1: {{video.title || '&nbsp;'}}</span></a></div></div>"
  );


  $templateCache.put('ui/video-permalink/view.video-permalink.html',
    "<div class=video-permalink-page ng-if=ready><div class=row><div class=\"col-md-7 col-lg-8 video-player-column-container\"><div class=video-player><div id=videoPlayer></div><clix-video-player ng-if=video video=video auto-play=true video-id=videoPlayer on-ready=onPlayerReady></clix-video-player></div><div class=\"visible-sm visible-xs\"><div class=brands-charity-container><div class=brands-container><div class=brands-charity-title><div class=brands-title>Brands in this Series</div><div class=charity-title>Charity</div></div><div class=logo-list-container><a ng-repeat=\"brand in brands | limitTo: 4\" ui-sref=\"brand({ slug: '{{brand.title | slug}}' })\" class=brand-logo-link><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></a><div ng-repeat=\"charity in charities | limitTo: 1\" class=brand-logo-link><clix-charity-logo charity=charity></clix-charity-logo></div></div></div></div></div><div class=\"up-next-container hidden-sm hidden-xs\"><div class=up-next-header><div class=up-next-label>Up Next in This Series</div><div class=series-dropdown><clix-dropdown options=seriesList></clix-dropdown></div></div><div class=\"row next-video-list\"><div class=\"col-lg-4 next-video\" ng-repeat=\"nextVideo in nextVideos track by $index\"><clix-video-content-box video=nextVideo></clix-video-content-box></div></div></div></div><div class=\"col-md-5 col-lg-4 star-info-column-container\"><div class=about-video-container id=about-video-container><div class=about-video-inner-container id=about-video-inner-container style=\"max-height: {{playerHeight || 0}}px\"><div class=about-video-overlay ng-if=!expanded></div><div class=star-name-container><div class=star-avatar style=\"background-image: url({{video.PosterH.url}})\"></div><div class=star-name-favorite-container><div class=star-name>{{video.artist_name}}</div><div class=\"visible-sm visible-xs\"><clix-violator>100 Reward Points</clix-violator></div></div><a href=# class=\"favorite-icon icon-favorite-icon\"></a></div><div class=social-container><div class=\"violator-container hidden-sm hidden-xs\"><clix-violator size=large>100 Reward Points</clix-violator></div><div class=social-icon-container><a href=# class=\"social-icon icon-heart-icon\"></a><div class=social-icon-label>256K</div></div><div class=social-icon-container><a href=# class=\"social-icon save-icon icon-save-icon\"></a></div><div class=social-icon-container><a href=# class=\"social-icon share-icon icon-share-icon\"></a><clix-points-violator>50</clix-points-violator></div></div><div class=video-info-container><div class=series-title>{{video.title}}</div><div class=episode-title>Episode 1: {{video.title}}</div><div class=total-views-available-container><div class=total-views>48,096,110 views</div><div class=available-until>Available Until 2 February 2017</div></div><div class=description>{{video.description}}</div><div class=meta-data><div class=meta-data-row><span class=meta-data-label>Category: </span><span ng-repeat=\"category in video.categories\"><a ui-sref=\"category({ slug: '{{category.name | slug}}' })\">{{category.name}}</a><span ng-if=!$last>,&nbsp;</span></span></div><div class=meta-data-row><span class=meta-data-label>Stars: </span><span ng-repeat=\"celebrity in celebrities\"><a ui-sref=\"star({ id: '{{celebrity._id}}' })\">{{celebrity.title}}</a><span ng-if=!$last>,&nbsp;</span></span></div><div class=meta-data-row><span class=meta-data-label>Brands: </span><span ng-repeat=\"brand in brands\"><a ui-sref=\"brand({ slug: '{{brand.title | slug}}' })\">{{brand.title}}</a><span ng-if=!$last>,&nbsp;</span></span></div><div class=meta-data-row><span class=meta-data-label>Charity: </span><span ng-repeat=\"charity in charities\"><a ui-sref=\"charity({ id: '{{charity._id}}' })\">{{charity.title}}</a><span ng-if=!$last>,&nbsp;</span></span></div></div></div></div><div id=toggle-button-container><div class=visibility-toggle-button><clix-secondary-button ng-click=onExpandToggle()>{{expanded ? 'Show Less' : 'Show More'}}</clix-secondary-button></div><div class=\"brands-charity-container hidden-sm hidden-xs\"><div class=brands-container><div class=brands-charity-title><div class=brands-title>Brands in this Series</div><div class=charity-title>Charity</div></div><div class=logo-list-container><a ng-repeat=\"brand in brands | limitTo: 4\" ui-sref=\"brand({ slug: '{{brand.title | slug}}' })\" class=brand-logo-link><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></a><div ng-repeat=\"charity in charities | limitTo: 1\" class=brand-logo-link><clix-charity-logo charity=charity></clix-charity-logo></div></div></div></div></div></div><div class=related-videos-container><div class=related-videos-header>Related Videos</div><div class=\"row related-videos-list\"><div class=\"col-lg-6 related-video\" ng-repeat=\"relatedVideo in relatedVideos track by $index\"><clix-video-content-box video=relatedVideo></clix-video-content-box></div></div></div></div></div></div>"
  );


  $templateCache.put('ui/violator/view.header-points-violator.html',
    "<div class=clix-header-points-violator><clix-callout-button>0</clix-callout-button>Reward Points</div>"
  );


  $templateCache.put('ui/violator/view.points-violator.html',
    "<div class=points-violator><span class=plus-sign>+</span><span ng-transclude></span></div>"
  );


  $templateCache.put('ui/violator/view.violator.html',
    "<div class=\"violator {{size}}\">100 Reward Points</div>"
  );

}]);

(function() {

    var AccountController = [
        '$q',
        '$scope',
        '$stateParams',
        function($q, $scope, $stateParams) {

            $scope.activeItem = $stateParams.section;

            $scope.onNavigationItemSelect = function(item) {
                $scope.activeItem = item;
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountController', AccountController);
}());
(function() {

    var AccountOverviewController = [
        '$scope',
        '$rootScope',
        'userService',
        function($scope, $rootScope, userService) {

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.form = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            password: '*********',
                            gender: (data.gender) ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : undefined,
                            phone: data.phone
                        }
                    }
                )
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountOverviewController', AccountOverviewController);
}());
(function() {
    var overview = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/overview/view.overview.html',
            controller: 'AccountOverviewController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountOverview', overview);
}());
(function() {

    var AccountWatchlistController = [
        '$scope',
        '$rootScope',
        'userService',
        function($scope, $rootScope, userService) {

            $scope.filterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Home & Auto'
                },
                {
                    label: 'Baby, Kids & Toys'
                },
                {
                    label: 'Electronics'
                }
            ];

            $scope.sortOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];

            userService.getWatchlist()
                .then(
                    function onSuccess(data) {
                        $scope.watchlist = data;
                    }
                )
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountWatchlistController', AccountWatchlistController);
}());
(function() {
    var watchlist = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/watchlist/view.watchlist.html',
            controller: 'AccountWatchlistController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountWatchlist', watchlist);
}());
(function() {

    var BrandController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        function($q, $scope, $stateParams, brandsService) {

            $scope.seriesList = [
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Most Viewed'
                }
            ];


            brandsService.getBrandBySlug($stateParams.slug)
                .then(
                    function onSuccess(data) {
                        $scope.video = data;
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: '/assets/theme/clixtv/dist/images/nike-header.jpg',
                            backgroundImage2x: '/assets/theme/clixtv/dist/images/nike-header@2x.jpg',
                            logo: data.BrandTransparentLogo.url
                        };
                        return $q.all(
                            [
                                brandsService.getOffersByBrandId(data._id),
                                brandsService.getVideosByBrandId(data._id),
                                brandsService.getCelebritiesByBrandId(data._id)
                            ]
                        )
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.offers = data[0];
                        $scope.relatedVideos = data[1];
                        $scope.videos = data[1];
                        $scope.celebrities = data[2];

                        console.log(data[2]);
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('BrandController', BrandController);
}());
(function() {

    var BrandsController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        function($q, $scope, $stateParams, brandsService) {

            var defaultFilterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Home & Auto'
                },
                {
                    label: 'Baby, Kids & Toys'
                },
                {
                    label: 'Electronics'
                }
            ];

            var defaultSortOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];

            $scope.filterBrandsOptions = defaultFilterOptions;
            $scope.filterOffersOptions = defaultFilterOptions;
            $scope.sortBrandsOptions = defaultSortOptions;
            $scope.sortOffersOptions = defaultSortOptions;

            brandsService.getAllBrands()
                .then(
                    function onSuccess(data) {
                        $scope.brands = data;
                    }
                );

            brandsService.getAllOffers()
                .then(
                    function onSuccess(data) {
                        $scope.offers = data;
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('BrandsController', BrandsController);
}());
(function() {

    var primaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.primary-button.html',
            scope: {
                type: '@?'
            }
        }
    };

    var secondaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.secondary-button.html',
            scope: {

            }
        }
    };

    var tertiaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.tertiary-button.html',
            scope: {

            }
        }
    };

    var calloutButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.callout-button.html'
        }
    };

    angular.module('clixtv')
        .directive('clixPrimaryButton', primaryButton)
        .directive('clixSecondaryButton', secondaryButton)
        .directive('clixTertiaryButton', tertiaryButton)
        .directive('clixCalloutButton', calloutButton);
}());
(function() {

    var CategoriesController = [
        '$q',
        '$scope',
        'categoryService',
        function($q, $scope, categoryService) {

            $scope.filterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Home & Auto'
                },
                {
                    label: 'Baby, Kids & Toys'
                },
                {
                    label: 'Electronics'
                }
            ];

            $scope.sortOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];

            categoryService.getAllCategories()
                .then(
                    function onSuccess(data) {
                        $scope.categories = data;
                    }
                )

        }
    ];

    angular
        .module('clixtv')
        .controller('CategoriesController', CategoriesController);
}());
(function() {

    var CategoryController = [
        '$q',
        '$scope',
        'categoryService',
        function($q, $scope, categoryService) {

        }
    ];

    angular
        .module('clixtv')
        .controller('CategoryController', CategoryController);
}());
(function() {

    var VIDEO_MARGIN_LEFT = 12;

    var VideoCategoryScrollList = [
        '$scope',
        '$window',
        '$timeout',
        function($scope, $window, $timeout) {

            $scope.left = 0;

            function _resetArrowStates() {
                var minWidth = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
                $scope.leftArrowVisible = $scope.left <= minWidth;
                $scope.rightArrowVisible = $scope.left >= 0;
            }

            function _recalculateWidth() {
                $scope.videoContainerWidth = $window.innerWidth / 5.7;
                $scope.arrowScrollWidth = $scope.videoContainerWidth + VIDEO_MARGIN_LEFT;

                $timeout(function() {
                    $scope.$apply();
                });
            }

            $scope.onPrevious = function() {
                var left = $scope.left + $window.innerWidth;
                if (left >= 0) {
                    left = 0;
                }
                $scope.left = left;
                _resetArrowStates();
            };

            $scope.onNext = function() {
                var left = $scope.left - $window.innerWidth,
                    minLeft = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
                if (left < minLeft) {
                    left = minLeft;
                }
                $scope.left = left;
                _resetArrowStates();
            };

            $scope.$watch('categoryVideos', function() {
                if (!$scope.categoryVideos) {
                    return;
                }
                $scope.rightArrowVisible = ($scope.videoContainerWidth + VIDEO_MARGIN_LEFT) * $scope.categoryVideos.length > $window.innerWidth;
            });

            $scope.carouselConfig = {
                event: {
                    afterChange: function (event, slick, currentSlide, nextSlide) {
                        $scope.leftArrowVisible = currentSlide !== 0;
                        // $scope.rightArrowVisible = (currentSlide );
                        // console.log('slick afterChange', 'currentSlide:', currentSlide, 'nextSlide:', nextSlide);
                    }
                }
            };

            angular.element($window).on('resize.doResize', function () {
                _recalculateWidth();
            });

            _recalculateWidth();
            _resetArrowStates();
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoCategoryScrollList', VideoCategoryScrollList);
}());
(function() {
    var videoCategoryScrollList = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/categories/view.video-category-scroll-list.html',
            controller: 'VideoCategoryScrollList',
            scope: {
                category: '=',
                categoryTitle: '@',
                categoryVideos: '='
            },
            link: function(scope, element) {
                scope.scrollListElement = angular.element(element).find('.video-inner-list-container');
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoCategoryScrollList', videoCategoryScrollList);
}());
(function() {

    var CharitiesController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        function($q, $scope, $stateParams, brandsService) {

            var defaultFilterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Home & Auto'
                },
                {
                    label: 'Baby, Kids & Toys'
                },
                {
                    label: 'Electronics'
                }
            ];

            var defaultSortOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];

            $scope.filterCharitiesOptions = defaultFilterOptions;
            $scope.sortCharitiesOptions = defaultSortOptions;

            brandsService.getAllCharities()
                .then(
                    function onSuccess(data) {
                        $scope.charities = data;
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('CharitiesController', CharitiesController);
}());
(function() {

    var CharityController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        function($q, $scope, $stateParams, brandsService) {

            brandsService.getCharityById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        console.log(data);
                        $scope.configs = {
                            title: data.title,
                            backgroundImage: '/assets/theme/clixtv/dist/images/nike-header.jpg',
                            backgroundImage2x: '/assets/theme/clixtv/dist/images/nike-header@2x.jpg',
                            logo: data.BrandTransparentLogo.url
                        }
                    }
                )

        }
    ];

    angular
        .module('clixtv')
        .controller('CharityController', CharityController);
}());
(function() {
    var clixSecBlock = function() {
        return {
            restrict: 'A',
            templateUrl: 'ui/clix-sec-block/view.clix-sec-block.html',
            scope: {

            }
        }
    };
    angular.module('clixtv')
        .directive('clix-sec-block', clixSecBlock);
}());
(function() {
    var accountHeader = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/account/view.account-header.html',
            transclude: {
                headerText: 'headerText',
                accessoryView: '?accessoryView'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixAccountHeader', accountHeader);
}());
(function() {

    var BrandCharityLogoController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.menuVisible = false;

            $scope.items = [
                {
                    label: 'Add to Watchlist',
                    icon: 'icon-save-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Star Page',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add Star to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.menuClicked = function($event) {
                $event.stopPropagation();
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('BrandCharityLogoController', BrandCharityLogoController);
}());
(function() {

    var CharityLogoController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.menuVisible = false;

            $scope.items = [
                {
                    label: 'Add to Watchlist',
                    icon: 'icon-save-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Star Page',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add Star to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.menuClicked = function($event) {
                $event.stopPropagation();
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('CharityLogoController', CharityLogoController);
}());
(function() {

    var OfferLogoController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.menuVisible = false;

            $scope.items = [
                {
                    label: 'Add to Watchlist',
                    icon: 'icon-save-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Star Page',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add Star to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.menuClicked = function($event) {
                $event.stopPropagation();
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('OfferLogoController', OfferLogoController);
}());
(function() {
    var brandCharityLogo = function() {
        return {
            restrict: 'AE',
            controller: 'BrandCharityLogoController',
            replace: true,
            templateUrl: 'ui/common/brand-charity-logo/view.brand-charity-logo.html',
            scope: {
                brand: '='
            }
        }
    };

    var offerLogo = function() {
        return {
            restrict: 'AE',
            controller: 'OfferLogoController',
            replace: true,
            templateUrl: 'ui/common/brand-charity-logo/view.offer-logo.html',
            scope: {
                offer: '='
            }
        }
    };

    var charityLogo = function() {
        return {
            restrict: 'AE',
            controller: 'CharityLogoController',
            replace: true,
            templateUrl: 'ui/common/brand-charity-logo/view.charity-logo.html',
            scope: {
                charity: '='
            }
        }
    };

    var brandCategoryLogo = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/brand-charity-logo/view.brand-category-logo.html',
            scope: {
                brand: '=',
                categoryTitle: '@'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixBrandCharityLogo', brandCharityLogo)
        .directive('clixOfferLogo', offerLogo)
        .directive('clixCharityLogo', charityLogo)
        .directive('clixBrandCategoryLogo', brandCategoryLogo);
}());
(function() {

    var viewButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/buttons/view.view-button.html',
            scope: {
                text: '@?'
            }
        }
    };

    var saveButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/buttons/view.save-button.html'
        }
    };

    var favoriteButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/buttons/view.favorite-button.html'
        }
    };

    angular.module('clixtv')
        .directive('clixViewButton', viewButton)
        .directive('clixSaveButton', saveButton)
        .directive('clixFavoriteButton', favoriteButton);
}());
(function() {

    var ContentCalloutController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.menuVisible = false;

            $scope.items = [
                {
                    label: 'Add to Watchlist',
                    icon: 'icon-save-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Star Page',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add Star to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.menuClicked = function($event) {
                $event.stopPropagation();
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('ContentCalloutController', ContentCalloutController);
}());
(function() {

    var calloutCalloutList = function() {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            templateUrl: 'ui/common/container/view.content-callout-list.html',
            scope: {
                items: '='
            }
        }
    };

    var calloutCallout = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/container/view.content-callout.html',
            require: '^clixContentCalloutList',
            controller: 'ContentCalloutController',
            transclude: {
                headerElement: 'headerElement',
                titleContent: 'titleContent',
                subtitleContent: 'subtitleContent'
            },
            scope: {
                sref: '@'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixContentCalloutList', calloutCalloutList)
        .directive('clixContentCallout', calloutCallout);
}());
(function() {

    var emptyContainer = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/container/view.empty-container.html',
            transclude: true
        }
    };

    angular.module('clixtv')
        .directive('clixEmptyContainer', emptyContainer);
}());
(function() {

    var mainHeader = function() {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            templateUrl: 'ui/common/headers/view.main-header.html'
        }
    };

    var secondaryHeader = function() {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            templateUrl: 'ui/common/headers/view.secondary-header.html'
        }
    };

    angular.module('clixtv')
        .directive('clixMainHeader', mainHeader)
        .directive('clixSecondaryHeader', secondaryHeader);
}());
(function() {

    var HeroBannerController = [
        '$q',
        '$scope',
        'parallaxHelper',
        function($q, $scope, parallaxHelper) {
            $scope.background = parallaxHelper.createAnimator(-0.3)
        }
    ];

    angular
        .module('clixtv')
        .controller('HeroBannerController', HeroBannerController);
}());
(function() {

    var heroBanner = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/hero-banner/view.hero-banner.html',
            controller: 'HeroBannerController',
            transclude: {
                logo: 'heroBannerLogo'
            },
            scope: {
                titleText: '@',
                buttonText: '@',
                points: '@?',
                subtext: '@?',
                buttonIconClass: '@?',
                backgroundImage: '@',
                backgroundImage2x: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixHeroBanner', heroBanner);
}());
(function() {
    var modal = [
        function() {
            return {
                restrict: 'AE',
                transclude: true,
                templateUrl: 'ui/common/modal/view.modal.html'
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixModal', modal);
}());
(function() {

    var LoginSignupController = [
        '$scope',
        '$uibModalInstance',
        'userService',
        'signup',
        function($scope, $uibModalInstance, userService, signup) {

            $scope.signup = signup;

            $scope.loginModel = {
                email: '',
                password: ''
            };

            $scope.signupModel = {
                email: '',
                password: ''
            };

            $scope.onLoginPress = function() {
                $scope.signup = false;
            };

            $scope.onSignupPress = function() {
                $scope.signup = true;
            };

            $scope.onLoginSubmit = function() {
                if (!$scope.loginModel.email || !$scope.loginModel.password) {
                    // todo - Error state for validation...
                    return;
                }
                userService.loginWithEmailPassword($scope.loginModel.email, $scope.loginModel.password)
                    .then(
                        function onSuccess(data) {
                            $uibModalInstance.close();
                        }
                    )
                    .catch(
                        function onError(error) {
                            // todo - Error state...
                            console.log(error);
                        }
                    );
            };

            $scope.onFacebookLoginPress = function() {
                console.log('fdsa');
            };

            $scope.onGoogleLoginPress = function() {
                console.log('fdsa111');
            };

            $scope.onCloseIconPress = function() {
                $uibModalInstance.close();
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('LoginSignupController', LoginSignupController);
}());
(function() {

    var NavigationBarController = [
        '$scope',
        '$rootScope',
        '$timeout',
        '$state',
        'userService',
        function($scope, $rootScope, $timeout, $state, userService) {

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                    }
                );

            $scope.changeSection = function(section) {
                $state.go('account', { section: section });
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('NavigationBarController', NavigationBarController);
}());
(function() {

    var RightNavigationController = [
        '$scope',
        '$rootScope',
        '$timeout',
        '$state',
        'userService',
        function($scope, $rootScope, $timeout, $state, userService) {

            $scope.open = false;
            $scope.visible = false;

            $rootScope.$on('rightnav.open', _openNavigation);

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $scope.onBackgroundPress = _closeNavigation;
            $scope.onClosePress = _closeNavigation;

            $scope.onLogoutPress = function() {
                userService.logout()
                    .then(
                        function onSuccess(data) {
                            _closeNavigation();
                        }
                    );
            };

            $scope.goToAccount = function(section) {
                $state.go('account', { section: section });
                _closeNavigation();
            };

            function _closeNavigation() {
                $scope.visible = false;
                $timeout(function() {
                    $scope.open = false;
                }, 500);
            }

            function _openNavigation() {
                $scope.open = true;
                $scope.visible = true;
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('RightNavigationController', RightNavigationController);
}());
(function() {
    var navigationBar = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/navigation/view.navigation-bar.html',
            controller: 'NavigationBarController',
            scope: {
                activeItem: '=',
                onItemSelect: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixNavigationBar', navigationBar);
}());
(function() {
    var rightNavigation = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/navigation/view.right-navigation.html',
            controller: 'RightNavigationController'
        }
    };

    angular.module('clixtv')
        .directive('clixRightNavigation', rightNavigation);
}());
(function() {

    var filterPage = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/page/view.filter-page.html',
            transclude: {
                pageTitle: 'pageTitle',
                pageSearchFilter: 'pageSearchFilter',
                pageContent: 'pageContent'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixFilterPage', filterPage);
}());
(function() {

    var landingPage = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/page/view.landing-page.html',
            transclude: {
                pageTitle: 'pageTitle'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixLandingPage', landingPage);
}());
(function() {

    var landingVideoContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/page/landing/view.landing-video-content.html',
            transclude: {
                mainContent: '?mainContent',
                contentDescription: 'contentDescription',
                sidebarTitle: 'sidebarTitle',
                sidebarContent: 'sidebarContent',
                footerContent: 'footerContent'
            },
            scope: {
                video: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixLandingVideoContent', landingVideoContent);
}());
(function() {

    var parallax = [
        '$window',
        function($window) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/parallax/view.parallax.html',
                transclude: true,
                scope: {

                },
                link: function(scope, element, attributes) {
                    var parallaxElement = document.getElementById('parallax-container');
                    angular.element($window).on('scroll', function() {
                        parallaxElement.style.top = -(this.pageYOffset * .2) + 'px';
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixParallax', parallax);
}());
(function() {

    var searchFilter = function() {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            templateUrl: 'ui/common/search/view.search-filter.html',
            scope: {
                searchPlaceholder: '@',
                filterPlaceholder: '@',
                sortPlaceholder: '@',
                filterOptions: '=',
                sortOptions: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSearchFilter', searchFilter);
}());
(function() {

    var DropdownController = [
        '$q',
        '$scope',
        function($q, $scope) {
            $scope.selected = $scope.options[0];
            // console.log($scope.selected);

            $scope.bodyClicked = function(event) {
                $scope.menuVisible = false;
            };

            $scope.triggerClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('DropdownController', DropdownController);
}());
(function() {

    var dropdown = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/dropdown/view.dropdown.html',
            controller: 'DropdownController',
            scope: {
                options: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixDropdown', dropdown);
}());
(function() {
    var footer = function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/footer/view.footer.html',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixFooter', footer);
}());
(function() {

    var HeaderSearchIconController = [
        '$scope',
        '$window',
        '$timeout',
        function($scope, $window, $timeout) {

            $scope.searchBarVisible = false;

            $scope.searchIconClicked = function($event) {
                $event.preventDefault();
                $scope.searchBarVisible = !$scope.searchBarVisible;
            };

            $scope.bodyClicked = function() {
                $scope.searchBarVisible = false;
                $timeout(function() {
                    $scope.$apply();
                });
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderSearchIconController', HeaderSearchIconController);
}());
(function() {

    var HeaderController = [
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        '$uibModal',
        function($scope, $rootScope, $window, $timeout, $uibModal) {

            var latestOffset = 0;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
            });

            $scope.onNamePress = function() {
                $rootScope.$broadcast('rightnav.open');
            };

            $scope.onLoginSignupPress = function(signup) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                    controller: 'LoginSignupController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-md',
                    resolve: {
                        signup: (signup !== false)
                    }
                });

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            };

            angular.element($window).on('scroll', function() {
                var direction;
                if (latestOffset > this.pageYOffset) {
                    direction = 'down';
                } else if (latestOffset < this.pageYOffset) {
                    direction = 'up';
                }
                latestOffset = this.pageYOffset;
                if ($scope.scrollDirection !== direction) {
                    $scope.scrollDirection = direction;
                    $timeout(function() {
                        $scope.$apply();
                    });
                }
            //    this.pageYOffset
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderController', HeaderController);
}());
(function() {
    var header = function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/header/view.header.html',
            controller: 'HeaderController',
            scope: {

            }
        }
    };

    var headerSearchIcon = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/header/view.header-search-icon.html',
            controller: 'HeaderSearchIconController'
        }
    };

    angular.module('clixtv')
        .directive('clixHeaderBar', header)
        .directive('clixHeaderSearchIcon', headerSearchIcon);
}());
(function() {

    var HomeController = [
        '$q',
        '$scope',
        '$timeout',
        '$window',
        'categoryService',
        'brandsService',
        function($q, $scope, $timeout, $window, categoryService, brandsService) {

            var carouselElement = angular.element(document.getElementById('carousel-container'));

            function _recalculateHeight() {
                $scope.videoContainerHeight = carouselElement.innerHeight();
                $timeout(function() {
                    $scope.$apply();
                });
            }

            function _loadVideosForCategoryIndex(index) {
                var category = $scope.categories[index];
                if (!category) {
                    return;
                }

                categoryService.getCategoryVideosByName(category.title)
                    .then(
                        function onSuccess(data) {
                            var videos = data.data;

                            // Assign the brands for each video
                            videos.forEach(function(video) {
                                video.brands = (video.brands || []).map(function(brand) {
                                    return $scope.brands[brand];
                                });
                            });

                            $scope.categories[index].videos = videos;
                        }
                    );

                _loadVideosForCategoryIndex(index + 1);
            }

            $q.all(
                    [
                        categoryService.getAllCategories(),
                        brandsService.getAllBrandsAndCharities()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.categories = data[0];
                        $scope.brands = data[1];
                        _loadVideosForCategoryIndex(0);
                    }
                );


            angular.element($window).on('resize.doResize', function () {
                _recalculateHeight();
            });

            _recalculateHeight();
        }
    ];

    angular
        .module('clixtv')
        .controller('HomeController', HomeController);
}());
(function() {
    var logo = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/logo/view.logo.html',
            scope: {
                charity: '@?',
                logoUrl: '@?',
                size: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixLogo', logo);
}());
(function() {

    var OfferController = [
        '$q',
        '$scope',
        '$stateParams',
        'offersService',
        'brandsService',
        function($q, $scope, $stateParams, offersService, brandsService) {

            $scope.seriesList = [
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Most Viewed'
                }
            ];


            offersService.getOfferById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        var brandId = '5804d1e7a7889d000337f0e2',
                            brandSlug = 'nike';

                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.BackgroundImage.url,
                            logo: data.BrandTransparentLogo.url
                        };
                        return $q.all(
                            [
                                brandsService.getOffersByBrandId(brandId),
                                brandsService.getBrandBySlug(brandSlug),
                                brandsService.getVideosByBrandId(brandId)
                            ]
                        );
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.offers = data[0];
                        $scope.brand = data[1];
                        $scope.videos = data[2];
                    }
                );
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferController', OfferController);
}());
(function() {

    var StarController = [
        '$q',
        '$scope',
        '$stateParams',
        'celebrityService',
        function($q, $scope, $stateParams, celebrityService) {

            celebrityService.getCelebrityById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        console.log(data);
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.BackgroundImage.url,
                            logo: data.BrandLogo.url
                        };
                    }
                )
        }
    ];



    angular
        .module('clixtv')
        .controller('StarController', StarController);
}());
(function() {

    var StarsController = [
        '$q',
        '$scope',
        'celebrityService',
        function($q, $scope, celebrityService) {

            $scope.filterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Home & Auto'
                },
                {
                    label: 'Baby, Kids & Toys'
                },
                {
                    label: 'Electronics'
                }
            ];

            $scope.sortOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];

            celebrityService.getAllCelebrities()
                .then(
                    function onSuccess(data) {
                        $scope.stars = data;
                    }
                )

        }
    ];

    angular
        .module('clixtv')
        .controller('StarsController', StarsController);
}());
(function() {

    var TooltipMenuController = [
        '$q',
        '$scope',
        function($q, $scope) {

        }
    ];

    angular
        .module('clixtv')
        .controller('TooltipMenuController', TooltipMenuController);
}());
(function() {

    var tooltipMenu = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/tooltip-menu/view.tooltip-menu.html',
            controller: 'TooltipMenuController',
            scope: {
                items: '=',
                menuopen: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixTooltipMenu', tooltipMenu);
}());
(function() {
    var clickAnywhereElse = [
        '$document',
        function($document) {
            return {
                restrict: 'A',
                scope: {
                    callback : '=clixClickAnywhereElse'
                },
                link: function(scope, element) {
                    var handler = function(event) {
                        if (!element[0].contains(event.target)) {
                            scope.callback(event);
                        }
                    };

                    $document.on('click', handler);
                    scope.$on('$destroy', function() {
                        $document.off('click', handler);
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixClickAnywhereElse', clickAnywhereElse);
}());
(function() {
    var onImageLoad = [
        '$parse',
        function($parse) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var fn = $parse(attrs.clixOnImageLoad);
                    elem.on('load', function (event) {
                        scope.$apply(function() {
                            fn(scope, { $event: event });
                        });
                    });
                }
            };
        }
    ];

    angular.module('clixtv')
        .directive('clixOnImageLoad', onImageLoad);
}());
(function() {
    var scrollOffsetClass = [
        '$window',
        function($window) {
            return {
                restrict: 'AE',
                scope: {
                    offset: '@',
                    scrollClass: '@'
                },
                link: function(scope, element) {
                    angular.element($window).on('scroll', function() {
                        if (this.pageYOffset >= parseInt(scope.offset)) {
                            element.addClass(scope.scrollClass);
                        } else {
                            element.removeClass(scope.scrollClass);
                        }
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixScrollOffsetClass', scrollOffsetClass);
}());
(function() {
    var transcludeInject = [
        function() {
            return {
                link: function($scope, $element, $attrs, controller, $transclude) {
                    if (!$transclude) {
                        throw minErr('ngTransclude')('orphan',
                            'Illegal use of ngTransclude directive in the template! ' +
                            'No parent directive that requires a transclusion found. ' +
                            'Element: {0}',
                            startingTag($element));
                    }
                    var innerScope = $scope.$new();
                    $transclude(innerScope, function(clone) {
                        $element.empty();
                        $element.append(clone);
                        $element.on('$destroy', function() {
                            innerScope.$destroy();
                        });
                    });
                }
            };
        }
    ];

    angular.module('clixtv')
        .directive('clixTranscludeInject', transcludeInject);
}());
(function() {

    var VideoContentBoxController = [
        '$q',
        '$scope',
        '$location',
        function($q, $scope, $location) {

            $scope.menuVisible = false;

            $scope.items = [
                {
                    label: 'Add to Watchlist',
                    icon: 'icon-save-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Star Page',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add Star to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.menuClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };

            $scope.onImageLoad = function(event) {
                $scope.ready = true;
            };

            $scope.go = function(path) {
                $location.path(path);
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoContentBoxController', VideoContentBoxController);
}());
(function() {
    var videoContentBox = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/video-content-box/view.video-content-box.html',
            controller: 'VideoContentBoxController',
            scope: {
                video: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoContentBox', videoContentBox);
}());
(function() {

    var VideoPermalinkController = [
        '$q',
        '$scope',
        '$timeout',
        '$window',
        '$stateParams',
        'videosService',
        'celebrityService',
        function($q, $scope, $timeout, $window, $stateParams, videosService, celebrityService) {

            $scope.expanded = false;

            $scope.seriesList = [
                {
                    label: 'Series 1: Series Name Here...'
                },
                {
                    label: 'Series 2: Series Name Here...'
                },
                {
                    label: 'Series 3: Series Name Here...'
                },
                {
                    label: 'Series 4: Series Name Here...'
                },
                {
                    label: 'Series 5: Series Name Here...'
                }
            ];

            videosService.getVideoById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        $scope.video = data;

                        var celebrityId = (data.celebrities) ? data.celebrities[0] : undefined,
                            categoryName = (data.categories && data.categories.length > 0) ? data.categories[0].name : 'Sports';

                        if (!celebrityId) {
                            return $q.when([]);
                        }

                        return $q.all(
                            [
                                celebrityService.getBrandsByCelebrityId(celebrityId),
                                celebrityService.getCharitiesByCelebrityId(celebrityId),
                                celebrityService.getCelebrityById(celebrityId),
                                videosService.getVideosByCategory(categoryName)
                            ]
                        );
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.ready = true;
                        $scope.brands = data[0];
                        $scope.charities = data[1];
                        $scope.celebrities = [data[2]];
                        $scope.relatedVideos = data[3];
                        $scope.nextVideos = data[3];
                    }
                );

            if ($window.innerWidth <= 1000) {
                $scope.playerHeight = 270;
                $scope.originalPlayerHeight = $scope.playerHeight;
            }

            $scope.onPlayerReady = function(configs) {
                $scope.playerHeight = (configs.height - angular.element(document.getElementById('toggle-button-container')).outerHeight() - 20);
                $scope.originalPlayerHeight = $scope.playerHeight;
                $timeout(function() {
                    $scope.$apply();
                });
            };

            $scope.onExpandToggle = function() {
                var expandedSize = ($window.innerWidth <= 1000) ? 999 : (angular.element(document.getElementById('about-video-container')).outerHeight());
                $scope.expanded = !$scope.expanded;
                $scope.playerHeight = ($scope.expanded) ? expandedSize : ($scope.originalPlayerHeight);
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());
(function() {

    var VideoPlayerController = [
        '$q',
        '$scope',
        '$timeout',
        'knetikService',
        function($q, $scope, $timeout, knetikService) {

            $timeout(function() {
                var playerInstance;

                if ($scope.video) {
                    playerInstance = jwplayer($scope.videoId).setup({
                        file: $scope.video.HLSStream ? $scope.video.HLSStream.url : $scope.video.mainTrailer.url,
                        // primary: 'html5',
                        androidhls: true,
                        autostart: $scope.autoPlay,
                        aspectratio: '16:9',
                        controls: true,
                        width: '100%',
                        //repeat: true,
                        icons: false,
                        image: $scope.video.PosterH ? $scope.video.PosterH.url : $scope.video.BackgroundImage.url
                    });

                    if (playerInstance) {
                        jwplayer().on('ready', function() {
                            if ($scope.onReady) {
                                $scope.onReady({
                                    height: jwplayer().getHeight()
                                });
                            }
                        });

                        jwplayer().on('error', function() {
                            if ($scope.onError) {
                                $scope.onError();
                            }
                        });
                    }
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPlayerController', VideoPlayerController);
}());
(function() {
    var videoPlayer = function() {
        return {
            restrict: 'AE',
            controller: 'VideoPlayerController',
            scope: {
                video: '=',
                autoPlay: '=',
                videoId: '@',
                onReady: '=?',
                onError: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoPlayer', videoPlayer);
}());
(function() {
    var headerPointsViolator = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/violator/view.header-points-violator.html',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixHeaderPointsViolator', headerPointsViolator);
}());
(function() {
    var pointsViolator = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/violator/view.points-violator.html',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixPointsViolator', pointsViolator);
}());
(function() {
    var violator = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/violator/view.violator.html',
            scope: {
                size: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixViolator', violator);
}());
(function() {

    var brandsService = [
        '$http',
        'stringUtils',
        function($http, stringUtils) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllBrands: function() {
                    return $http.get('/api/brands/get_brands_array')
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getAllBrandsAndCharities: function() {
                    return $http.get('/api/brands/get_all_brands_and_charities_object')
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getBrandBySlug: function(slug) {

                    /**
                     * @todo - This loops over all brands and picks the matching one, that's not good...
                     */
                    return $http.get('/api/brands/get_brands_array')
                        .then(
                            function onSuccess(data) {
                                var found = data.data.filter(function(brand) {
                                    return slug === stringUtils.getSlugForString(brand.title);
                                });
                                return found[0];
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getAllCharities: function() {
                    return $http.get('/api/brands/get_charities_array')
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCharityBySlug: function(slug) {

                    /**
                     * @todo - This loops over all brands and picks the matching one, that's not good...
                     */
                    return $http.get('/api/brands/get_charities_array')
                        .then(
                            function onSuccess(data) {
                                var found = data.data.filter(function(charity) {
                                    return slug === stringUtils.getSlugForString(charity.title);
                                });
                                return found[0];
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCharityById: function(id) {
                    return $http.get('/api/brands/get_brand?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data[0];
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getAllOffers: function() {
                    return $http.get('/api/brands/get_offers_array')
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getOffersByBrandId: function(id) {
                    return $http.get('/api/brands/get_brand_offers/?id=' + id)
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getVideosByBrandId: function(id) {
                    return $http.get('/api/brands/get_brand_videos/?id=' + id)
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCelebritiesByBrandId: function(id) {
                    return $http.get('/api/brands/get_brand_celebs/?id=' + id)
                        .then(
                            function(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('brandsService', brandsService);
}());
(function() {

    var categoryService = [
        '$http',
        function($http) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCategories: function() {
                    return $http.get('/api/category/get_all_categories')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryByName: function(name) {
                    return $http.get('/api/category/get_category_by_name/?category=' + name);
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryVideosByName: function(name) {
                    return $http.get('/api/category/get_category_videos?category=' + name);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('categoryService', categoryService);
}());
(function() {

    var celebrityService = [
        '$http',
        function($http) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCelebrities: function() {
                    return $http.get('/api/celebrity/get_all_celebrities')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCelebrityById: function(id) {
                    return $http.get('/api/celebrity/get_celebrity?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data[0];
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getBrandsByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_brands?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCharitiesByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_charities?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getSeriesByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_series?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('celebrityService', celebrityService);
}());
(function() {

    var knetikService = [
        '$http',
        function($http) {
            return {

                getAllBrands: function() {

                    return $http.get('/api/brands/get_all_brands_and_charities_object');
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('knetikService', knetikService);
}());
(function() {

    var offersService = [
        '$http',
        'stringUtils',
        function($http, stringUtils) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getOfferById: function(id) {
                    return $http.get('api/brands/get_brand/?id=' + id)
                        .then(
                            function(data) {
                                return data.data[0];
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('offersService', offersService);
}());
(function() {

    var userService = [
        '$q',
        '$http',
        '$rootScope',
        function($q, $http, $rootScope) {

            var loggedInUser;

            return {

                loginWithEmailPassword: function(email, password) {
                    return $http.post('/api/account/login_user', {
                            email: email,
                            password: password
                        })
                        .then(
                            function onSuccess(data) {
                                if (!data || !data.data || data.data.error) {
                                    throw new Error(data.data);
                                }

                                loggedInUser = data.data.content;

                                $rootScope.$broadcast('user.login', loggedInUser);
                                return data.data;
                            }
                        );
                },

                logout: function() {
                    return $http.post('/api/account/logout')
                        .then(
                            function onSuccess(data) {

                                loggedInUser = undefined;

                                $rootScope.$broadcast('user.logout');
                                return data;
                            }
                        );
                },

                getLoggedInUser: function() {
                    if (loggedInUser) {
                        return $q.when(loggedInUser);
                    }
                    return $http.get('/api/account/get_current')
                        .then(
                            function onSuccess(data) {
                                loggedInUser = data.data;

                                $rootScope.$broadcast('user.login', loggedInUser);

                                return loggedInUser;
                            }
                        );
                },

                getWatchlist: function() {
                    return $http.get('/api/account/get_watchlist')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('userService', userService);
}());
(function() {

    var videosService = [
        '$http',
        function($http) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getVideoById: function(id) {
                    return $http.get('/api/video/get_video_by_id/?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getVideosByCategory: function(category) {
                    return $http.get('/api/vod/get_videos_by_category?category=' + category)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('videosService', videosService);
}());
(function() {

    var stringUtils = [
        function() {
            return {
                getSlugForString: function(value) {
                    return value.toLowerCase().replace(/\s/g,'+').replace(/[^\w-+]+/g,'');
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('stringUtils', stringUtils);
}());
(function() {

    var slugFilter = [
        'stringUtils',
        function(stringUtils) {
            return function (input) {
                if (!input) {
                    return input;
                }
                return stringUtils.getSlugForString(input);
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('slug', slugFilter);
}());