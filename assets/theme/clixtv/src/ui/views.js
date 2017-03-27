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
    "<header class=clix-header clix-scroll-offset-class offset=100 scroll-class=filled><div class=\"clix-header-container hidden-sm hidden-xs hidden-md\"><h1 class=logo-container><a href=/ ><img src=assets/theme/clixtv/dist/images/color-logo.svg class=clix-logo></a></h1><nav class=clix-navigation><div class=navigation-item-container><a ui-sref=categories>Categories</a></div><div class=navigation-item-container><a ui-sref=stars>Stars</a></div><div class=navigation-item-container><a ui-sref=brands>Brands</a></div><div class=navigation-item-container><a ui-sref=charities>Charities</a></div><div class=\"navigation-item-container search-item-container\"><clix-header-search-icon></clix-header-search-icon></div></nav><div class=account-action-container><div ng-if=loggedInUser><div class=header-user-container><clix-header-points-violator></clix-header-points-violator><div class=header-avatar-container><div ng-if=loggedInUser.avatar><a href=# class=header-avatar style=\"background-image: url('{{loggedInUser.avatar}}')\"></a></div><div ng-if=!loggedInUser.avatar><a href=# class=header-avatar style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></a></div><div class=header-notification-count>&nbsp;20</div></div><a ng-click=onNamePress() class=header-name-container><div class=header-name>{{loggedInUser.firstName}}</div><div class=header-expand-icon><div class=icon-left-tall-arrow></div></div></a></div></div><div ng-if=!loggedInUser><clix-callout-button ng-click=onLoginSignupPress(false)>Login</clix-callout-button><a ng-click=onLoginSignupPress(true) class=account-action-label>Register Now</a></div></div></div><div class=\"clix-header-container hidden-lg\"><div class=mobile-header-block><div class=points-violator-container><clix-header-points-violator></clix-header-points-violator></div></div><a href=/ class=\"mobile-logo mobile-header-block\"><img src=assets/theme/clixtv/dist/images/color-logo-light.svg class=clix-logo></a><div class=\"user-avatar-container mobile-header-block\"><div class=user-avatar><div ng-if=!loggedInUser><clix-callout-button ng-click=onLoginSignupPress(false)>Login</clix-callout-button></div><div class=header-user-container ng-if=loggedInUser><div class=header-avatar-container><div ng-if=loggedInUser.avatar><a href=# class=header-avatar style=\"background-image: url('{{loggedInUser.avatar}}')\"></a></div><div ng-if=!loggedInUser.avatar><a href=# class=header-avatar style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></a></div><div class=header-notification-count>&nbsp;20</div></div></div></div></div></div></header>"
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
    "<div class=video-content-box ng-show=ready><div class=header-container><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-inner-content><a href=#><div class=artist-avatar style=\"background-image: url({{video.PosterH.url}})\"></div></a><div class=artist-name><a href=#>{{video.artist_name}}</a></div><a class=menu-icon-container ng-click=menuClicked() clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></a></div></div><div class=video-thumbnail><img ng-src={{video.PosterH.url}} class=video-thumbnail-image clix-on-image-load=onImageLoad($event)><div class=video-thumbnail-action-container><div class=video-thumbnail-inner-container><div class=violator-container><clix-violator>100 Reward Points</clix-violator></div><div class=video-brand-icon-list><div class=video-brand-icon ng-repeat=\"brand in video.brands | limitTo: 5 track by $index\" style=\"background-image: url({{brand.BrandTransparentLogo.url}})\"></div></div></div><div class=action-buttons-container><a href=# class=save-button><div class=\"icon-save-icon-normal button-normal\"></div><div class=\"icon-save-icon-hover button-hover\"></div><div class=\"icon-save-icon-click button-click\"></div></a><a class=play-button ui-sref=\"video({ id: video._id })\"><div class=\"icon-play-button-normal button-normal\"></div><div class=\"icon-play-button-hover button-hover\"></div><div class=\"icon-play-button-click button-click\"></div></a></div></div></div><div class=footer-container><a ui-sref=\"video({ id: video._id })\"><span class=series-title>{{video.title}}</span><br><span class=episode-title>Episode 1: {{video.title}}</span></a></div></div>"
  );


  $templateCache.put('ui/video-permalink/view.video-permalink.html',
    "<div class=video-permalink-page><div class=row><div class=\"col-lg-8 video-player-column-container\"><div class=video-player><div id=videoPlayer></div><clix-video-player ng-if=video video=video auto-play=true video-id=videoPlayer on-ready=onPlayerReady></clix-video-player></div><div class=up-next-container><div class=up-next-header><div class=up-next-label>Up Next in This Series</div><div class=series-dropdown><clix-dropdown options=seriesList></clix-dropdown></div></div><div class=\"row next-video-list\"><div class=\"col-lg-4 next-video\" ng-repeat=\"nextVideo in nextVideos track by $index\"><clix-video-content-box video=nextVideo></clix-video-content-box></div></div></div></div><div class=\"col-lg-4 star-info-column-container\"><div class=about-video-container id=about-video-container><div class=about-video-inner-container id=about-video-inner-container style=\"max-height: {{playerHeight || 0}}px\"><div class=about-video-overlay ng-if=!expanded></div><div class=star-name-container><div class=star-avatar style=\"background-image: url({{video.PosterH.url}})\"></div><div class=star-name>{{video.artist_name}}</div><a href=# class=\"favorite-icon icon-favorite-icon\"></a></div><div class=social-container><div class=violator-container><clix-violator size=large>100 Reward Points</clix-violator></div><div class=social-icon-container><a href=# class=\"social-icon icon-heart-icon\"></a><div class=social-icon-label>256K</div></div><div class=social-icon-container><a href=# class=\"social-icon icon-save-icon\"></a></div><div class=social-icon-container><a href=# class=\"social-icon icon-share-icon\"></a><clix-points-violator>50</clix-points-violator></div></div><div class=video-info-container><div class=series-title>{{video.title}}</div><div class=episode-title>Episode 1: {{video.title}}</div><div class=total-views-available-container><div class=total-views>48,096,110 views</div><div class=available-until>Available Until 2 February 2017</div></div><div class=description>{{video.description}}</div><div class=meta-data><div class=meta-data-row><span class=meta-data-label>Category: </span><span ng-repeat=\"category in video.categories\"><a href=#>{{category.name}}</a><span ng-if=!$last>,</span></span></div></div></div></div><div id=toggle-button-container><div class=visibility-toggle-button><clix-secondary-button ng-click=onExpandToggle()>{{expanded ? 'Show Less' : 'Show More'}}</clix-secondary-button></div><div class=brands-charity-container><div class=brands-container><div class=\"brands-charity-title brands-title\">Brands in this Series</div><div class=logo-list-container><a class=brand-logo-link ui-sref=\"brand({ slug: 'nike' })\"><div class=brand-logo clix-logo logo-url=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/58054a355f7c20000319780f/texaco_logo_white.png></div></a><a class=brand-logo-link ui-sref=\"brand({ slug: 'nike' })\"><div class=brand-logo clix-logo logo-url=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/580549d45f7c20000319780c/cabelas_logo_whtie.png></div></a></div></div><div class=charity-container><div class=\"brands-charity-title charity-title\">Charity</div><div class=logo-list-container><div class=charity-logo clix-logo charity=true logo-url=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d3ffc801b10003711113/special-olympics-world-games1.png></div></div></div></div></div></div><div class=related-videos-container><div class=related-videos-header>Related Videos</div><div class=\"row related-videos-list\"><div class=\"col-lg-6 related-video\" ng-repeat=\"relatedVideo in relatedVideos track by $index\"><clix-video-content-box video=relatedVideo></clix-video-content-box></div></div></div></div></div></div>"
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
