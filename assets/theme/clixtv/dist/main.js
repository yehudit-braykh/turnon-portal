(function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['clixtv']);
    });


    var module = angular
        .module('clixtv', [
            'slickCarousel',
            'ui.router',
            'duParallax',
            'ui.bootstrap',
            'puElasticInput',
            'uiSwitch',
            'angularModalService',
            'LocalStorageModule',
            'ngMask',
            'angular.filter'
        ])
        .config([
            '$locationProvider',
            '$httpProvider',
            '$stateProvider',
            '$urlRouterProvider',
            'localStorageServiceProvider',
            function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {
                localStorageServiceProvider.setPrefix('clix');
                $urlRouterProvider.when('', '/');
                $urlRouterProvider.otherwise('/404');

                $stateProvider
                    .state('404', {
                        url: '/404',
                        templateUrl: 'ui/notfound/view.not-found.html',
                        controller: 'NotFoundController'
                    })
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
                        url: '/brand/:id',
                        templateUrl: 'ui/brand/view.brand.html',
                        controller: 'BrandController'
                    })
                    .state('brand-offer', {
                        url: '/brand/:id/offer/:offerId',
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
                        controller: 'StarController',
                        params: {
                            tab: 'video'
                        }
                    })
                    .state('categories', {
                        url: '/categories',
                        templateUrl: 'ui/categories/view.categories.html',
                        controller: 'CategoriesController'
                    })
                    .state('category', {
                        url: '/category/:id',
                        templateUrl: 'ui/categories/view.category.html',
                        controller: 'CategoryController'
                    })
                    .state('offer', {
                        url: '/offer/:id',
                        templateUrl: 'ui/offer/view.offer.html',
                        controller: 'OfferController'
                    })
                    .state('print-redeem-offer', {
                        url: '/offer/:id/redeem/print',
                        templateUrl: 'ui/offer/view.printable-redeem-offer.html',
                        controller: 'PrintableRedeemOfferController',
                        data: {
                            print: true
                        }
                    })
                    .state('account', {
                        url: '/account/:section',
                        templateUrl: 'ui/account/view.account.html',
                        controller: 'AccountController',
                        params: {
                            tab: ''
                        }
                    })
            }
        ])
        .run([
            '$rootScope',
            'userService',
            'catchMediaService',
            'educationModalService',
            function($rootScope, userService, catchMediaService, educationModalService) {

                userService.setLoggedInUser();
                catchMediaService.initialize();
                educationModalService.initialize();

                $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
                    $('html, body').animate({ scrollTop: 0 }, 200);
                    $rootScope.printable = to.data && to.data.print;
                });

                $rootScope.$on('user.login', function(event, data) {
                    if (data && data.id) {
                        catchMediaService.setUser(data.email, 'default', data);
                    }
                });

                $rootScope.$on('user.logout', function(event, data) {
                    catchMediaService.deleteUser();
                });
            }
        ]);
}());

angular.module('clixtv').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui/account/favorites/view.favorites.html',
    "<div class=clix-account-favorites><clix-account-header><header-text>Favorites</header-text></clix-account-header><div ng-if=!ready><clix-loader size=large></clix-loader></div><div class=favorites-page-content ng-show=ready><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Stars><div class=favorites-tab-content><div ng-if=\"!celebrities || !celebrities.celebrities || celebrities.celebrities.length === 0\"><clix-empty-container><header-text>Your favorite Stars will appear here.</header-text><body-text>Browse through Stars and hit the <i class=\"empty-favorite-icon icon-favorite-icon\"></i> to add them to this list.</body-text><call-to-action-button><clix-primary-button ui-sref=stars>Go to Stars</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"celebrities && celebrities.celebrities && celebrities.celebrities.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Stars\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterStarsOptions sort-options=sortStarsOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=celebrities.celebrities large-col-class=col-lg-2-4><clix-star-content-callout star=item></clix-star-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></uib-tab><uib-tab index=1 heading=Brands><div class=favorites-tab-content><div ng-if=\"!brands || !brands.brands || brands.brands.length === 0\"><clix-empty-container><header-text>Your favorite Brands will appear here.</header-text><body-text>Browse through Brands &amp; Offers and hit the <i class=\"empty-favorite-icon icon-favorite-icon\"></i> to add them to this list.</body-text><call-to-action-button><clix-primary-button ui-sref=brands>Go to Brands & Offers</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"brands && brands.brands && brands.brands.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Brands\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterBrandsOptions sort-options=sortBrandsOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=brands.brands large-col-class=col-lg-2-4><clix-brand-content-callout brand=item></clix-brand-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></uib-tab><uib-tab index=2 heading=Charities><div class=favorites-tab-content><div ng-if=\"!charities || !charities.charities || charities.charities.length === 0\"><clix-empty-container><header-text>Your favorite Charities will appear here.</header-text><body-text>Browse through Charities and hit the <i class=\"empty-favorite-icon icon-favorite-icon\"></i> to add them to this list.</body-text><call-to-action-button><clix-primary-button ui-sref=charities>Go to Charities</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"charities && charities.charities && charities.charities.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Charities\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterCharitiesOptions sort-options=sortCharitiesOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=charities.charities large-col-class=col-lg-2-4><clix-charity-content-callout charity=item></clix-charity-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></uib-tab><uib-tab index=3 heading=Categories><div class=favorites-tab-content><div ng-if=\"!categories || !categories.categories || categories.categories.length === 0\"><clix-empty-container><header-text>Your favorite Categories will appear here.</header-text><body-text>Browse through Categories and hit the <i class=\"empty-favorite-icon icon-favorite-icon\"></i> to add them to this list.</body-text><call-to-action-button><clix-primary-button ui-sref=categories>Go to Categories</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"categories && categories.categories && categories.categories.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Categories\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterCategoriesOptions sort-options=sortCategoriesOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=categories.categories large-col-class=col-lg-2-4><clix-category-content-callout category=item></clix-category-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/account/notifications/view.notifications.html',
    "<div class=clix-account-notifications><clix-account-header><header-text>Notifications</header-text></clix-account-header><div class=notifications-container><div class=notifications-header>My Notifications</div><clix-notifications notifications=notifications></clix-notifications></div></div>"
  );


  $templateCache.put('ui/account/overview/view.overview-input.html',
    "<div class=personal-info-form-row><div class=form-header><div class=form-header-label ng-transclude=inputLabel></div><a ng-click=onFieldEdit() class=\"icon-edit-icon form-header-edit\" ng-hide=editing></a></div><div class=form-value-container><div ng-switch=type><div ng-switch-when=email><clix-form-input-error-field show-error=showEmailError><form-field><div class=form-value><input id=account-email ng-model=$parent.$parent.$parent.ngModel type=email ng-disabled=!editing placeholder=\"Enter email address\"></div></form-field><error-message>{{$parent.$parent.emailErrorMessage}}</error-message></clix-form-input-error-field><clix-form-input-error-field show-error=showEmailConfirmationError><form-field><div class=form-value ng-show=editing><input ng-model=$parent.$parent.$parent.emailConfirm type=email placeholder=\"Re-enter email address\"></div></form-field><error-message>{{$parent.$parent.emailConfirmationErrorMessage}}</error-message></clix-form-input-error-field></div><div ng-switch-when=password><clix-form-input-error-field show-error=showOldPasswordError><form-field><div class=form-value><input ng-model=$parent.$parent.$parent.ngModel type=password ng-disabled=!editing placeholder=\"Current password\"></div></form-field><error-message>{{$parent.$parent.oldPasswordErrorMessage}}</error-message></clix-form-input-error-field><clix-form-input-error-field show-error=showNewPasswordError><form-field><div class=form-value ng-show=editing><input ng-model=$parent.$parent.$parent.newPassword type=password placeholder=\"New password\"></div></form-field><error-message>{{$parent.$parent.newPasswordErrorMessage}}</error-message></clix-form-input-error-field><clix-form-input-error-field show-error=showNewPasswordConfirmError><form-field><div class=form-value ng-show=editing><input ng-model=$parent.$parent.$parent.newPasswordConfirm type=password placeholder=\"Re-enter new password\"></div></form-field><error-message>{{$parent.$parent.newPasswordConfirmErrorMessage}}</error-message></clix-form-input-error-field></div><div ng-switch-when=birthdate><div class=form-value ng-show=!editing><input ng-model=$parent.birthdateLabel type=text disabled=disabled></div><div class=form-value ng-show=editing><clix-datepicker-dropdowns ng-model=$parent.ngModel></clix-datepicker-dropdowns></div></div><div ng-switch-when=gender><div class=form-value ng-show=!editing><input ng-model=$parent.gender.label type=text disabled=disabled></div><div class=form-value ng-show=editing><clix-radio-button-group options=genders ng-model=$parent.gender></clix-radio-button-group></div></div><div ng-switch-when=phone><clix-form-input-error-field show-error=showPhoneError><form-field><div class=form-value><input ng-model=$parent.$parent.$parent.ngModel mask=\"(999) 999-9999\" restrict=reject type=text ng-disabled=!editing></div></form-field><error-message>{{$parent.$parent.phoneErrorMessage}}</error-message></clix-form-input-error-field></div><div ng-switch-default><div class=form-value><input ng-model=$parent.ngModel type=text ng-disabled=!editing></div></div></div><div class=form-error-message ng-class=\"{'active': formHasErrors}\">Please fix the errors in the highlighted fields above.</div><div class=form-value-buttons ng-show=editing><div class=form-value-button clix-secondary-button alternate=true ng-click=onCancelPress()>Cancel</div><div class=form-value-button ng-class=\"{'has-errors': formHasErrors}\" clix-secondary-button alternate=true ng-click=onSavePress()><span class=save-button-label>Save</span> <span class=\"save-button-error-label icon-remove-icon\"></span></div></div></div></div>"
  );


  $templateCache.put('ui/account/overview/view.overview.html',
    "<div class=clix-account-overview><clix-account-header><header-text>Account Overview</header-text></clix-account-header><div class=\"row body-content\"><div class=\"col-md-6 personal-info-container\"><div class=account-info-sub-header>Personal Information</div><div class=personal-info-form><clix-account-overview-input ng-model=form.firstName on-save=onSaveField><input-label>First Name</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.lastName on-save=onSaveField><input-label>Last Name</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.email on-save=onSaveField type=email><input-label>Email</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.password on-save=onSaveField type=password><input-label>Password</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.birthdate on-save=onSaveField type=birthdate><input-label>Date of Birth</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.gender on-save=onSaveField type=gender><input-label>Gender</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.phone on-save=onSaveField type=phone><input-label>Phone</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.paymentData on-save=onSaveField type=creditcard><input-label>Credit Card</input-label></clix-account-overview-input></div></div><div class=\"col-md-6 reward-points-container\"><div class=account-info-sub-header>Reward Points</div><div class=reward-points><div class=\"reward-points-block first-block\"><div class=points-label>1760</div><div class=available-balance-label>Available Points Balance<br>$17.60 Cash Balance</div></div><div class=rewards-button><clix-primary-button ui-sref=\"account({ section: 'rewards' })\" ui-sref-opts={reload:true}>Go To My Rewards</clix-primary-button></div></div></div></div></div>"
  );


  $templateCache.put('ui/account/rewards/view.rewards.html',
    "<div class=clix-account-rewards><clix-account-header><header-text>Rewards</header-text></clix-account-header><div class=rewards-page-content ng-show=ready><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Summary><div class=rewards-tab-content><div class=\"row rewards-summary-row\"><div class=\"col-sm-6 rewards-summary-column\"><div class=rewards-summary-block><div class=rewards-summary-header>Rewards Summary</div><div class=reward-points><div class=\"reward-points-block first-block\"><div class=points-label>1760</div><div class=available-balance-label>Available Points Balance<br>$17.60 Cash Balance</div></div><div class=rewards-button><clix-primary-button ng-click=onRedeemPress()>Redeem</clix-primary-button></div></div></div></div><div class=\"col-sm-6 rewards-summary-column\"><div class=rewards-summary-block><div class=rewards-summary-header>Rewards Activity</div><div class=rewards-activity-container><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div></div><div class=rewards-activity-footer><clix-tertiary-button>See All Activity</clix-tertiary-button></div></div></div></div></div></uib-tab><uib-tab index=1 heading=Activity><div class=rewards-tab-content></div></uib-tab><uib-tab index=2 heading=Redeem><div class=rewards-tab-content><p class=redeem-intro>Select your preferred method of redemption and you will be taken to the next page where you will choose your amount and redeem your reward points!</p><div class=\"row redeem-companies-container\"><div class=\"col-xs-6 col-sm-6 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('paypal')\"><div class=redeem-logo-container><img src=/assets/theme/clixtv/dist/images/paypal.png srcset=\"/assets/theme/clixtv/dist/images/paypal@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>PayPal<br>&nbsp;</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('paypal')\">Redeem Now</a></div></div><div class=\"col-xs-6 col-sm-6 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('visa')\"><div class=redeem-logo-container><img src=/assets/theme/clixtv/dist/images/visa.png srcset=\"/assets/theme/clixtv/dist/images/visa@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>Visa® Prepaid<br>Card USD^</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('visa')\">Redeem Now</a></div></div><div class=\"col-xs-6 col-sm-6 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('amazon')\"><div class=redeem-logo-container><img src=/assets/theme/clixtv/dist/images/amazon.png srcset=\"/assets/theme/clixtv/dist/images/amazon@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>Amazon.com<br>Gift Card∞</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('amazon')\">Redeem Now</a></div></div></div><p class=redeem-legal>*PayPal is not a sponsor of the rewards or promotion or otherwise affiliated with this company. The logos and other identifying marks attached are trademarks of and owned by each represented company and/or its affiliates.  Please visit each company's website for additional terms and conditions.</p><p class=redeem-legal>^Card is issued by The Bancorp Bank, Member FDIC, pursuant to a license from Visa U.S.A. Inc.</p><p class=redeem-legal>This reward is non-refundable. The full terms and conditions are available on the Promocode claim site. Click on \"Product Terms\" prior to selecting a Virtual Visa Card or a Plastic Visa Card.  Swift Prepaid Solutions is the Service Provider for your Redemption Account and associated Card Accounts. Your Program Sponsor is the entity that marketed and/or distributed the reward, and is either a direct or indirect Client of Swift Prepaid.</p><p class=redeem-legal>∞Amazon.com is not a sponsor of this promotion. Except as required by law, Amazon.com Gift Cards (\"GCs\") cannot be transferred for value or redeemed for cash. GCs may be used only for purchases of eligible goods on Amazon.com or certain of its affiliated websites. GCs cannot be redeemed for purchases of gift cards. Purchases are deducted from the GC balance. To redeem or view a GC balance, visit \"Your Account\" on Amazon.com. Amazon is not responsible if a GC is lost, stolen, destroyed or used without permission. For complete terms and conditions, see www.amazon.com/gc-legal. GCs are issued by ACI Gift Cards, Inc., a Washington corporation. All Amazon ®, ™ & © are IP of Amazon.com, Inc. or its affiliates. No expiration date or service fees.</p></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/account/saved-offers/view.saved-offers.html',
    "<div class=clix-account-saved-offers><clix-account-header><header-text>Saved Offers</header-text></clix-account-header><div class=saved-offers-page-content ng-show=ready><div ng-if=\"!offers || !offers.offers || offers.offers.length === 0\"><clix-empty-container><header-text>Your Saved Offers will appear here.</header-text><body-text>Browse through Brands &amp; Offers and hit the <i class=\"empty-add-icon icon-redeem-plus-icon\"></i> to add them to this list.</body-text></clix-empty-container></div><div ng-if=\"offers && offers.offers && offers.offers.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Saved Offers\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterSavedOffersOptions sort-options=sortSavedOffersOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=offers.offers large-col-class=col-lg-2-4 menu-items=menuItems><clix-offer-content-callout offer=item></clix-offer-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></div>"
  );


  $templateCache.put('ui/account/settings/view.settings.html',
    "<div class=clix-account-settings><clix-account-header><header-text>Settings</header-text></clix-account-header><div class=settings-page-content><div ng-if=!ready><clix-loader size=large></clix-loader></div><div ng-id=ready><div class=setting-row ng-repeat=\"setting in generalSettings | orderBy: 'order'\"><div class=setting-row-info><div class=setting-row-title>{{setting.title}}</div><div class=setting-row-description>{{setting.description}}</div></div><div class=setting-row-trigger><switch ng-model=setting.enabled class=setting-switch ng-change=settingChange(setting)></switch></div></div><div class=settings-subtitle><clix-account-header><header-text>Your ClixTV</header-text></clix-account-header></div><div class=setting-row ng-repeat=\"setting in accountSettings | orderBy: 'order'\"><div class=setting-row-info><div class=setting-row-title>{{setting.title}}</div><div class=setting-row-description>{{setting.description}}</div></div><div class=setting-row-trigger><switch ng-model=setting.enabled class=setting-switch ng-change=settingChange(setting)></switch></div></div><div class=settings-subtitle><clix-account-header><header-text>Notifications</header-text></clix-account-header></div><div class=setting-row><div class=setting-row-info><div class=setting-row-title>Send Notifications</div><div class=setting-row-description>How we will keep you Up-To-Date</div></div><div class=\"row setting-notification-container\"><div class=col-xs-6></div><div class=col-xs-6></div></div></div></div></div></div>"
  );


  $templateCache.put('ui/account/view.account.html',
    "<div class=clix-account-page><div class=account-navigation><clix-navigation-bar active-item=activeItem on-item-select=onNavigationItemSelect></clix-navigation-bar></div><div class=account-page ng-switch=activeItem ng-if=ready><div ng-switch-when=overview><clix-account-overview></clix-account-overview></div><div ng-switch-when=watchlist><clix-account-watchlist></clix-account-watchlist></div><div ng-switch-when=favorites><clix-account-favorites></clix-account-favorites></div><div ng-switch-when=saved-offers><clix-account-saved-offers></clix-account-saved-offers></div><div ng-switch-when=rewards><clix-account-rewards></clix-account-rewards></div><div ng-switch-when=notifications><clix-account-notifications></clix-account-notifications></div><div ng-switch-when=settings><clix-account-settings></clix-account-settings></div></div></div>"
  );


  $templateCache.put('ui/account/watchlist/view.watchlist.html',
    "<div class=clix-account-watchlist><clix-account-header><header-text>Watchlist</header-text><accessory-view><div class=filter-containers ng-show=\"watchlist && watchlist.videos && watchlist.videos.length > 0\"><div class=filter-container><clix-dropdown options=filterOptions placeholder-text=\"Filter By\"></clix-dropdown></div><div class=filter-container><clix-dropdown options=sortOptions placeholder-text=\"Sort By\"></clix-dropdown></div></div></accessory-view></clix-account-header><div ng-if=!ready><clix-loader size=large></clix-loader></div><div class=watchlist-container ng-show=ready><div ng-if=\"!watchlist || !watchlist.videos || watchlist.videos.length === 0\"><clix-empty-container><header-text>Videos that you would like to watch later will appear here.</header-text><body-text>Browse through videos and hit the <i class=\"empty-watchlist-icon icon-redeem-plus-icon\"></i> to add them to this list.<br></body-text><call-to-action-button><clix-primary-button ui-sref=home>Go to Home Page</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"watchlist && watchlist.videos && watchlist.videos.length > 0\"><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-12 col-sm-6 col-md-4 col-lg-3\" ng-repeat=\"video in watchlist.videos\"><clix-video-content-callout video=video></clix-video-content-callout></div></div></div></div></div>"
  );


  $templateCache.put('ui/brand/view.brand.html',
    "<div ng-if=!configs><clix-loader size=large></clix-loader></div><div class=brand-page ng-if=configs><clix-hero-banner title-text={{configs.title}} button-text=\"{{'Favorites'}}\" points=\"{{'50'}}\" subtext=\"{{brand.offers.offers.length}} {{brand.offers.offers.length === 1 ? 'Offer' : 'Offers'}}\" button-icon-class=\"{{'icon-favorite-icon banner-favorite-icon'}}\" background-image={{configs.backgroundImage}} background-image2x={{configs.backgroundImage2x}} background-image3x={{configs.backgroundImage3x}} button-tooltip-text=\"{{loggedInUser ? (isFavorite ? 'Remove this brand from your Favorites.' : 'Add this brand to your Favorites.') : 'After signing up, you will be able to add this brand to your Favorites.'}}\" share-tooltip-text=\"Share this brand.\" banner-type=Brand><favorite-button><clix-tertiary-button ng-click=onFavoritePress()>{{isFavorite ? 'Added to Favorites' : 'Favorite'}}</clix-tertiary-button></favorite-button><share-icon><clix-share-button extra-class=banner-share-icon brand=brand></clix-share-button></share-icon></clix-hero-banner><div class=brand-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Home select=\"onTabSelect('home')\"><div class=home-container><clix-landing-video-content video=video><content-description><clix-secondary-header>About {{configs.title}}</clix-secondary-header><div class=home-description ng-bind-html=\"configs.description | clixNewLineBreak\"></div></content-description><sidebar-title>More Offers From {{configs.title}}</sidebar-title><sidebar-content><div class=\"row brand-offer-row\"><div class=\"col-xs-6 col-sm-6 col-md-12 col-lg-12 brand-offer-column\" ng-repeat=\"offer in brand.offers.offers | limitTo: 3\"><div class=brand-offer><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></div></sidebar-content><footer-content><div class=brand-categories-container><clix-secondary-header>Brand Categories <i class=icon-right-arrow></i></clix-secondary-header><div class=brand-category-logo-container><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Sportswear></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Shoes></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Swimwear></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=\"Training & Gym\"></clix-brand-category-logo></div></div></div><div class=brand-celebrity-videos><div ng-repeat=\"celebrity in brand.celebrities.celebrities | limitTo: 3\"><clix-video-category-scroll-list category-title=\"{{celebrity.name}} and {{brand.title}}\" category-videos=celebrity.videos.videos></clix-video-category-scroll-list></div></div></footer-content><share-tooltip-content><div ng-if=loggedInUser>You will receive 50 Reward Points for sharing!</div><div ng-if=!loggedInUser>After signing up, you will receive 50 Reward Points for sharing! <a ng-click=\"\">Learn more</a>.</div></share-tooltip-content><share-icon><clix-share-button extra-class=landing-share-icon brand=brand></clix-share-button></share-icon></clix-landing-video-content></div></uib-tab><uib-tab index=1 heading=Offers select=\"onTabSelect('offers')\"><div class=\"row clix-block-row offers-container\"><div class=\"clix-block-item col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"offer in brand.offers.offers\"><clix-offer-content-callout offer=offer ng-click=onOfferPress(offer)></clix-offer-content-callout></div></div></uib-tab><uib-tab index=2 heading=Stars select=\"onTabSelect('stars')\"><div class=stars-container><div ng-repeat=\"celebrity in brand.celebrities.celebrities\"><clix-video-category-scroll-list category-title=\"{{celebrity.name}} and {{brand.title}}\" category-videos=celebrity.videos.videos></clix-video-category-scroll-list></div></div></uib-tab><uib-tab index=3 heading=Videos select=\"onTabSelect('videos')\"><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>All Videos Featuring {{brand.title}}</clix-secondary-header></div><div class=video-sort-container><clix-dropdown options=seriesList placeholder-text=\"Sort By\"></clix-dropdown></div></div><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-12 col-sm-12 col-md-3 col-lg-2-4\" ng-repeat=\"video in brand.videos.videos\"><clix-video-content-callout video=video></clix-video-content-callout></div></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/brand/view.brands.html',
    "<div ng-if=!ready><clix-loader size=large></clix-loader></div><div class=brands-page ng-if=ready><div class=main-header><clix-main-header>Brands &amp; Offers</clix-main-header></div><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Brands><div class=search-filter-container><clix-search-filter search-placeholder=\"Search Brands\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterBrandsOptions sort-options=sortBrandsOptions></clix-search-filter></div><div class=\"row brands-list\"><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"brand in brands.brands\"><clix-brand-content-callout brand=brand></clix-brand-content-callout></div></div></uib-tab><uib-tab index=1 heading=Offers><div class=search-filter-container><clix-search-filter search-placeholder=\"Search Offers\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterOffersOptions sort-options=sortOffersOptions></clix-search-filter></div><div class=\"row brands-list\"><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"offer in offers.offers\"><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></uib-tab></uib-tabset></div></div>"
  );


  $templateCache.put('ui/buttons/view.callout-button.html',
    "<div class=clix-callout-button ng-class=\"{'secondary-callout': colorType === 'secondary'}\"><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/buttons/view.primary-button.html',
    "<div class=clix-primary-button ng-class=\"{'button-facebook': type === 'facebook', 'button-google': type === 'google', 'button-charity': type === 'charity', 'circle-button': circle === 'true'}\"><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/buttons/view.secondary-button.html',
    "<div class=clix-secondary-button ng-class=\"{'alternate': alternate}\"><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/buttons/view.tertiary-button.html',
    "<div class=clix-tertiary-button ng-class=\"{'active': isActive}\"><div class=\"button-edge left-edge\"></div><div class=\"button-edge right-edge\"></div><div class=button-content><div ng-transclude></div></div></div>"
  );


  $templateCache.put('ui/categories/view.categories.html',
    "<div ng-if=!categories><clix-loader size=large></clix-loader></div><div class=clix-categories-page><clix-filter-page ng-if=categories><page-title>Video Categories</page-title><page-content><clix-content-callout-list items=categories.categories menu-items=menuItems><clix-category-content-callout category=item></clix-category-content-callout></clix-content-callout-list></page-content></clix-filter-page></div>"
  );


  $templateCache.put('ui/categories/view.category.html',
    "<div ng-if=!category><clix-loader size=large></clix-loader></div><div class=clix-category-page ng-if=category><clix-hero-banner title-text={{category.title}} button-text=\"{{'Favorites'}}\" subtext=\"{{category.videos.videos.length}} {{category.videos.videos.length === 1 ? 'Video' : 'Videos'}}\" button-icon-class=\"{{'icon-favorite-icon banner-favorite-icon'}}\" background-image={{category.headerImage}} background-image2x={{category.headerImage}} background-image3x={{category.headerImage}} shareable=false button-tooltip-text=\"{{loggedInUser ? (isFavorite ? 'Remove this category from your Favorites' : 'Add this category to your Favorites.') : 'After signing up, you will be able to add this category to your Favorites.'}}\" share-tooltip-text=\"Share this category.\" banner-type=Category><favorite-button><clix-tertiary-button ng-click=onFavoritePress()>{{isFavorite ? 'Added to Favorites' : 'Favorite'}}</clix-tertiary-button></favorite-button></clix-hero-banner><div class=category-page-container><div class=category-page-content><div class=\"category-list-container hidden-sm hidden-xs\"><div class=category-list-content><div class=category-list-title>More Categories</div><ul class=category-list><li ng-repeat=\"relatedCategory in categories.categories | orderBy: 'order'\" class=category-list-item ng-class=\"{'active-category': relatedCategory.title === category.title}\"><a ui-sref=\"category({ id: '{{relatedCategory.id}}' })\">{{relatedCategory.title}}</a></li></ul></div></div><div class=category-content><div class=category-filter-bar><div class=\"category-filter-container row\" ng-class=\"{'hidden-category-filters': (!category.videos.videos || category.videos.videos.length === 0)}\"><div class=\"filter-container col-xs-6\"><clix-dropdown options=filterOptions placeholder-text=\"Filter By\"></clix-dropdown></div><div class=\"filter-container col-xs-6\"><clix-dropdown options=sortOptions placeholder-text=\"Sort By\"></clix-dropdown></div></div></div><div class=empty-videos ng-if=\"!category.videos || !category.videos.videos || category.videos.videos.length === 0\"><div class=empty-category-container><div class=\"category-icon icon-lifestyle-icon\"></div><div class=empty-category-title>{{category.title}} videos are coming soon!</div><clix-is-logged-in><logged-in><div class=empty-category-desc>ClixTV can let you know when new<br>content is uploaded into this category!</div><div class=empty-category-notify-container><div class=empty-category-notify><div class=empty-category-notify-label>Notify Me!</div><div class=empty-category-switch><clix-switch ng-model=notify></clix-switch></div></div></div><div class=manage-settings-container><a ui-sref=\"account({ section: 'settings' })\">Manage notification settings</a></div></logged-in><not-logged-in><div class=empty-category-desc>Sign up now to make sure you are<br>notified when videos become available!</div><div class=authentication-container><clix-primary-button ng-click=onSignupPress()>Sign Up Now</clix-primary-button><div class=log-in-button><a ng-click=onLoginPress()>Log In Now</a></div></div></not-logged-in></clix-is-logged-in></div></div><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-12 col-sm-12 col-lg-3\" ng-repeat=\"video in category.videos.videos\"><clix-video-content-callout video=video></clix-video-content-callout></div></div></div></div></div></div>"
  );


  $templateCache.put('ui/categories/view.video-category-scroll-list.html',
    "<div class=video-category-scroll-list><h2><a ui-sref=\"category({ id: '{{category.id}}' })\" ng-show=\"category.headerLink !== false\">{{category.title}} <i class=icon-right-arrow></i> </a><span ng-show=\"category.headerLink === false\">{{category.title}} <i class=icon-right-arrow></i></span></h2><div class=category-container><div class=visible-lg><slick slides-to-show=5 slides-to-scroll=4 infinite=false variable-width=true prev-arrow=#carousel-previous-{{$id}} next-arrow=#carousel-next-{{$id}} settings=carouselConfig><div ng-repeat=\"video in category.videos.videos\" class=video-content-container style=\"width: {{videoContainerWidth}}px\"><clix-video-content-callout video=video></clix-video-content-callout></div></slick></div><div class=hidden-lg><div ng-repeat=\"video in category.videos.videos | limitTo: 4\" class=video-content-container><clix-video-content-callout video=video></clix-video-content-callout></div><div class=more-videos-button-container><clix-secondary-button ui-sref=\"category({ slug: '{{category.title | slug}}' })\">View All {{category.title}}</clix-secondary-button></div></div><div class=\"arrow-container left-arrow-container\" id=carousel-previous-{{$id}} ng-show=leftArrowVisible><div class=arrow-inner-container><i class=\"arrow-icon icon-left-tall-arrow\"></i></div></div><div class=\"arrow-container right-arrow-container\" id=carousel-next-{{$id}}><div class=arrow-inner-container><i class=\"arrow-icon icon-right-tall-arrow\"></i></div></div></div></div>"
  );


  $templateCache.put('ui/charity/view.charities.html',
    "<div ng-if=!charities><clix-loader size=large></clix-loader></div><div class=charities-page><clix-filter-page ng-if=charities><page-title>Charities</page-title><page-search-filter><clix-search-filter search-placeholder=\"Search Charities\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterCharitiesOptions sort-options=sortCharitiesOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=charities.charities menu-items=menuItems><clix-charity-content-callout charity=item></clix-charity-content-callout></clix-content-callout-list></page-content></clix-filter-page></div>"
  );


  $templateCache.put('ui/charity/view.charity.html',
    "<div ng-if=!charity><clix-loader size=large></clix-loader></div><div class=charity-page ng-if=charity><clix-hero-banner title-text={{charity.title}} button-text=\"{{'Favorites'}}\" subtext=\"{{charity.videos.videos.length}} {{charity.videos.videos.length === 1 ? 'Video' : 'Videos'}}\" button-icon-class=\"{{'icon-favorite-icon banner-favorite-icon'}}\" background-image={{charity.headerImage}} background-image2x={{charity.headerImage}} background-image3x={{charity.headerImage}} charity=true button-tooltip-text=\"{{loggedInUser ? (isFavorite ? 'Remove this charity from your Favorites.' : 'Add this charity to your Favorites.') : 'After signing up, you will be able to add this charity to your Favorites.'}}\" share-tooltip-text=\"Share this page.\" banner-type=Charity><favorite-button><clix-tertiary-button ng-click=onFavoritePress()>{{isFavorite ? 'Added to Favorites' : 'Favorite'}}</clix-tertiary-button></favorite-button><share-icon><clix-share-button extra-class=banner-share-icon charity=charity></clix-share-button></share-icon></clix-hero-banner><div class=charity-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Home select=\"onTabSelect('home')\"><div class=home-container><clix-landing-video-content video=video charity=true><content-description><div class=charity-description-container><clix-secondary-header>About {{charity.title}}</clix-secondary-header><div class=home-description ng-bind-html=\"charity.description | clixNewLineBreak\"></div><div class=donate-button><clix-primary-button type=charity ng-click=onDonatePress()>Donate</clix-primary-button></div></div></content-description><sidebar-title>Stars Who Support {{charity.title}}</sidebar-title><sidebar-content><div class=\"row brand-offer-row\"><div class=\"col-xs-6 col-sm-6 col-md-12 col-lg-12 brand-offer-column\" ng-repeat=\"celebrity in charity.celebrities.celebrities | limitTo: 3\"><div class=star-support-callout><clix-star-content-callout star=celebrity></clix-star-content-callout></div></div></div></sidebar-content><footer-content><div class=home-footer-content><div class=brand-celebrity-videos><div ng-repeat=\"celebrity in charity.celebrities.celebrities | limitTo: 3\"><clix-video-category-scroll-list category-title=\"{{celebrity.name}} and {{charity.title}}\" category-videos=celebrity.videos.videos></clix-video-category-scroll-list></div></div></div></footer-content></clix-landing-video-content></div></uib-tab><uib-tab index=2 heading=Stars select=\"onTabSelect('stars')\"><div class=stars-container><div ng-repeat=\"celebrity in charity.celebrities.celebrities\"><clix-video-category-scroll-list category-title=\"{{celebrity.name}} and {{charity.title}}\" category-videos=celebrity.videos.videos></clix-video-category-scroll-list></div></div></uib-tab><uib-tab index=3 heading=Videos select=\"onTabSelect('videos')\"><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>All Videos Featuring {{charity.title}}</clix-secondary-header></div><div class=video-sort-container><clix-dropdown options=seriesList placeholder-text=\"Sort By\"></clix-dropdown></div></div><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-12 col-sm-12 col-md-3 col-lg-2-4\" ng-repeat=\"video in charity.videos.videos\"><clix-video-content-callout video=video></clix-video-content-callout></div></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/clix-sec-block/clix-sec-block.html',
    "<div class=BOOP></div>"
  );


  $templateCache.put('ui/common/account/view.account-header.html',
    "<div class=clix-account-header><div class=row><div class=header-text ng-class=\"{'col-sm-6': accessoryViewFilled, 'col-sm-12': !accessoryViewFilled}\"><div ng-transclude=headerText></div></div><div class=\"accesory-view col-sm-6\" ng-if=accessoryViewFilled><div ng-transclude=accessoryView></div></div></div></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.brand-category-logo.html',
    "<div class=clix-brand-category-logo><div class=logo-image style=\"background-image: url('{{brand.ProfilePicture.url}}')\"></div><div class=logo-category-title>{{categoryTitle}}</div><div class=logo-category-violator clix-tooltip-trigger tooltip-id=tooltip-{{$id}}><clix-points-violator>50</clix-points-violator></div><clix-tooltip tooltip-id=tooltip-{{$id}}><clix-is-logged-in><logged-in>You will receive 50 Reward Points for viewing this category!</logged-in><not-logged-in>After you sign up, you will receive 50 Reward Points for viewing this category! <a ng-click=\"\">Learn more</a>.</not-logged-in></clix-is-logged-in></clix-tooltip></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.brand-charity-logo.html',
    "<div class=clix-brand-charity-logo><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><a ui-sref=\"brand({ id: '{{brand.id}}' })\" class=logo-image style=\"background-image: url('{{brand.transparentThumbnail}}')\"></a><div class=logo-points clix-tooltip-trigger tooltip-id=tooltip-{{$id}}><clix-points-violator>50</clix-points-violator></div><div class=logo-overlay ng-show=hoverEnabled></div><clix-tooltip tooltip-id=tooltip-{{$id}}><clix-is-logged-in><logged-in>You will receive 50 Reward Points for viewing this brand!</logged-in><not-logged-in>After you sign up, you will receive 50 Reward Points for viewing this brand! <a ng-click=\"\">Learn more</a>.</not-logged-in></clix-is-logged-in></clix-tooltip></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.charity-logo.html',
    "<div class=clix-charity-logo><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=logo-image style=\"background-image: url('{{charity.transparentThumbnail}}')\"></div><div class=logo-overlay><a ui-sref=\"charity({ id: charity.id })\" class=hit-area></a> <a ui-sref=\"charity({ id: charity.id })\" class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></a><div class=logo-save><clix-favorite-button></clix-favorite-button></div><div class=logo-ellipsis><div class=menu-icon-container ng-click=menuClicked($event) clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></div></div></div></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.offer-logo.html',
    "<div class=clix-offer-logo style=\"background-image: url('{{offer.thumbnail}}')\"><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=logo-overlay-image></div><div class=logo-icon style=\"background-image: url('{{offer.transparentThumbnail}}')\"></div><div class=logo-points clix-tooltip-trigger tooltip-id=tooltip-{{$id}}><clix-points-violator>50</clix-points-violator></div><clix-tooltip tooltip-id=tooltip-{{$id}}><clix-is-logged-in><logged-in>You will receive 50 Reward Points for viewing this offer!</logged-in><not-logged-in>After you sign up, you will receive 50 Reward Points for viewing this offer! <a ng-click=\"\">Learn more</a>.</not-logged-in></clix-is-logged-in></clix-tooltip></div>"
  );


  $templateCache.put('ui/common/buttons/view.ellipsis-button.html',
    "<div class=clix-ellipsis-button><div class=view-button><div class=view-button-text>View</div></div></div>"
  );


  $templateCache.put('ui/common/buttons/view.favorite-button.html',
    "<div class=clix-favorite-icon ng-class=\"{'active': isFavorite}\"><i class=icon-favorite-icon></i> <i class=\"icon-favorite-icon-filled fill-state\"></i></div>"
  );


  $templateCache.put('ui/common/buttons/view.save-button.html',
    "<div class=clix-save-button><div class=\"plus-icon icon-redeem-plus-icon\" ng-show=!isSaved></div><div class=\"remove-icon icon-remove-icon\" ng-show=isSaved></div></div>"
  );


  $templateCache.put('ui/common/buttons/view.share-button.html',
    "<a ng-click=onShareIconPress() class=\"clix-share-icon icon-share-icon {{extraClass}}\"></a>"
  );


  $templateCache.put('ui/common/buttons/view.view-button.html',
    "<div class=clix-view-button><div class=view-button><div class=view-button-text>{{text || 'View'}}</div></div></div>"
  );


  $templateCache.put('ui/common/checkbox/view.checkbox.html',
    "<div class=clix-checkbox ng-click=onToggle()><div class=checkbox-container ng-class=\"{'selected': ngModel}\"><i class=\"check-icon icon-checkmark-icon\"></i></div><div class=checkbox-label>{{labelText}}</div></div>"
  );


  $templateCache.put('ui/common/container/view.blurrable-container.html',
    "<div class=clix-blurrable-container ng-class=\"{'active': blurred}\"><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/container/view.brand-content-callout.html',
    "<clix-content-callout sref=\"brand({ id: '{{brand.id}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('brand', brand)\" is-favorited=\"isFavoriteContent('brand', brand)\" type=brand entity=brand><header-element><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></header-element><title-content>{{brand.title}}</title-content><subtitle-content>{{brand.offers.offers.length}} {{brand.offers.offers.length === 1 ? 'Offer' : 'Offers'}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.category-content-callout.html',
    "<clix-content-callout sref=\"category({ id: '{{category.id}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('category', category)\" is-favorited=\"isFavoriteContent('category', category)\" type=category entity=category><header-element><div class=category-logo style=\"background-image: url('{{category.logo}}')\"></div></header-element><title-content>{{category.title}}</title-content><subtitle-content>{{category.videos.videos.length}} {{category.videos.videos.length === 1 ? 'Video' : 'Videos'}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.charity-content-callout.html',
    "<clix-content-callout sref=\"charity({ id: '{{charity.id}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('charity', charity)\" is-favorited=\"isFavoriteContent('charity', charity)\" type=charity entity=charity><header-element><clix-charity-logo charity=charity></clix-charity-logo></header-element><title-content>{{charity.title}}</title-content><subtitle-content>{{charity.videos.videos.length}} {{charity.videos.videos.length === 1 ? 'Video' : 'Videos'}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.content-callout-list.html',
    "<div class=\"row brands-list\"><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 {{largeColClass || 'col-lg-2'}}\" ng-repeat=\"item in items | orderBy: 'order'\" clix-transclude-inject></div></div>"
  );


  $templateCache.put('ui/common/container/view.content-callout.html',
    "<div class=clix-content-callout><div class=header-callout-container><a ui-sref={{sref}} class=header-container ng-transclude=headerElement></a><clix-tooltip-menu items=menuItems menuopen=menuVisible class=overlay-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-overlay><a ui-sref={{sref}} class=hit-area></a> <a ui-sref={{sref}} class=view-button-container><div class=view-button><clix-view-button text=Go></clix-view-button></div></a><div class=header-save ng-click=onFavorite() clix-tooltip-trigger tooltip-id=favorites-button-{{$id}}><clix-favorite-button is-favorite=isFavorited ng-show=\"addButton !== 'true'\"></clix-favorite-button><clix-save-button is-saved=isFavorited ng-show=\"addButton === 'true'\"></clix-save-button></div><div class=header-ellipsis clix-tooltip-trigger tooltip-id=actions-button-{{$id}}><div class=menu-icon-container ng-click=menuClicked($event) clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></div></div><clix-tooltip tooltip-id=favorites-button-{{$id}}>{{isFavorited ? (removeFavoriteTooltip || 'Remove from favorites') : (addFavoriteTooltip || 'Add to favorites')}}</clix-tooltip><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip></div></div><a ui-sref={{sref}} class=callout-footer-container><span class=callout-title ng-transclude=titleContent></span> <span class=callout-subtitle ng-transclude=subtitleContent></span></a></div>"
  );


  $templateCache.put('ui/common/container/view.empty-container.html',
    "<div class=clix-empty-container><div class=empty-icon>!</div><div class=header-text><div ng-transclude=headerText></div></div><div class=body-text><div ng-transclude=bodyText></div></div><div class=call-to-action-container><div ng-transclude=callToActionButton></div></div></div>"
  );


  $templateCache.put('ui/common/container/view.offer-content-callout.html',
    "<clix-content-callout sref=\"brand-offer({ id: '{{offer.campaign}}', offerId: '{{offer.id}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('offer', offer)\" is-favorited=\"isFavoriteContent('offer', offer)\" add-button=true add-favorite-tooltip=\"Add to saved offers\" remove-favorite-tooltip=\"Remove from saved offers\" type=offer entity=offer><header-element><clix-offer-logo offer=offer></clix-offer-logo></header-element><title-content>{{offer.title}}</title-content><subtitle-content>Expires {{offer.expirationDate | clixDate}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.star-content-callout.html',
    "<clix-content-callout sref=\"star({ id: '{{star.id}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('celebrity', star)\" is-favorited=\"isFavoriteContent('celebrity', star)\" type=star entity=star><header-element><div class=star-logo style=\"background-image: url({{star.thumbnail}})\"></div></header-element><title-content>{{star.name}}</title-content><subtitle-content>{{star.videos.videos.length}} {{star.videos.videos.length === 1 ? 'Video' : 'Videos'}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.video-content-callout.html',
    "<div class=clix-video-content-callout><img ng-src={{video.thumbnail}} class=video-thumbnail><div class=video-content-container><div class=video-menu-container><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu></div><div class=star-info-container><div class=star-info-background style=\"background-image: url('{{video.thumbnail}}')\"></div><div class=star-info><a ui-sref=\"star({ id: video.celebrity.id })\" class=star-avatar style=\"background-image: url({{video.celebrity.thumbnail}})\"></a> <a ui-sref=\"star({ id: video.celebrity.id })\" class=star-name>{{video.celebrity.name}}</a><div clix-tooltip-trigger tooltip-id=actions-button-{{$id}}><a class=video-menu-icon ng-click=menuClicked() clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></a></div></div></div><div class=video-info-container><div class=video-episode-number>Episode {{video.episodeNumber}}:</div><div class=video-episode-title>{{video.title}}</div><div class=video-series-title>{{video.seriesTitle}} Series</div><div class=brands-container><div class=brand-icon ng-repeat=\"brand in video.brands.brands | limitTo: 4 track by $index\" style=\"background-image: url({{brand.transparentThumbnail}})\"></div><div class=brand-icon style=\"background-image: url({{video.charity.transparentThumbnail}})\"></div></div></div><div class=video-content-overlay ng-class=\"{'active': overlayActive}\" ng-click=onClick($event) ng-mousemove=onMouseover() ng-mouseleave=onMouseleave()><a class=video-watchlist-button ng-class=\"{'icon-redeem-plus-icon': !isOnWatchlist, 'icon-remove-icon remove-icon': isOnWatchlist}\" clix-tooltip-trigger tooltip-id=watchlist-button-{{$id}} ng-click=onWatchlistPress()></a><div class=video-play-button><a ui-sref=\"video({ id: video.id })\"><img src=/assets/theme/clixtv/dist/images/gradient-clix-icon.svg></a></div></div><div class=video-points-container clix-tooltip-trigger tooltip-id=signup-watch-points-{{$id}}><div ng-mouseenter=onMouseover() ng-mouseleave=onMouseleave()><clix-violator>100 Reward Points</clix-violator></div></div></div></div><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip><clix-tooltip tooltip-id=watchlist-button-{{$id}}>{{isOnWatchlist ? 'Remove from your watchlist' : 'Add to your Watchlist'}}</clix-tooltip><clix-tooltip tooltip-id=signup-watch-points-{{$id}}><clix-is-logged-in><logged-in>You will receive 100 Reward Points for watching this video!</logged-in><not-logged-in>After you sign up, you will receive 100 Reward Points for watching this video! <a clix-learn-more-modal-trigger>Learn More</a>.</not-logged-in></clix-is-logged-in></clix-tooltip>"
  );


  $templateCache.put('ui/common/datepicker/view.datepicker-dropdowns.html',
    "<div class=clix-datepicker-dropdowns><div class=datepicker-dropdown-container><clix-dropdown placeholder-text=Month options=months></clix-dropdown></div><div class=datepicker-dropdown-container><clix-dropdown placeholder-text=Day options=days></clix-dropdown></div><div class=datepicker-dropdown-container><clix-dropdown placeholder-text=Year options=years></clix-dropdown></div></div>"
  );


  $templateCache.put('ui/common/form/view.form-input.html',
    "<div class=clix-form-input id=clix-form-input-{{$id}} ng-class=\"{'input-error': showError}\"><div ng-transclude=formField></div><div class=clix-form-error id=clix-form-input-error-{{$id}} ng-class=\"{'active': showError}\"><div class=error-message-container><div ng-transclude=errorMessage></div></div></div></div>"
  );


  $templateCache.put('ui/common/headers/view.main-header.html',
    "<div class=clix-main-header><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/headers/view.secondary-header.html',
    "<div class=clix-secondary-header><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/hero-banner/view.hero-banner.html',
    "<div class=clix-hero-banner><img class=hero-background-image id=hero-background-image ng-src={{backgroundImage}} ng-srcset=\"{{backgroundImage2x}} 2x, {{backgroundImage3x}} 3x\" alt=\"\" draggable=false du-parallax y=background clix-on-image-load=onImageLoad()><div class=hero-banner-content-container><div class=hero-banner-content><div class=banner-logo-container ng-class=\"{'charity-logo': charity}\" ng-show=logoProvided><div ng-transclude=logo></div></div><div class=banner-title-content ng-class=\"{'with-logo': logoProvided}\"><div class=banner-type>{{bannerType}}</div><div class=banner-title>{{titleText}}</div><div class=banner-button><div clix-tooltip-trigger tooltip-id=hero-banner-button-{{$id}} ng-transclude=favoriteButton></div><div clix-tooltip-trigger tooltip-id=hero-banner-share-{{$id}} ng-transclude=shareIcon></div><div class=header-points-violator ng-if=points><clix-points-violator>{{points}}</clix-points-violator></div><div class=\"banner-subtext-container hidden-sm hidden-xs\">{{subtext}}</div></div><div class=\"banner-subtext-container visible-sm visible-xs\">{{subtext}}</div></div></div></div></div><clix-tooltip tooltip-id=hero-banner-button-{{$id}}>{{buttonTooltipText}}</clix-tooltip><clix-tooltip tooltip-id=hero-banner-share-{{$id}}>{{shareTooltipText}}</clix-tooltip>"
  );


  $templateCache.put('ui/common/loader/view.loader.html',
    "<div class=clix-loader><div class=loader-icon ng-class=\"{'loader-small': size === 'small', 'loader-medium': size === 'medium', 'loader-large': size === 'large'}\"></div></div>"
  );


  $templateCache.put('ui/common/modal/confirmation/view.confirmation-modal.html',
    "<clix-message-modal><modal-title>{{title}}</modal-title><modal-body>{{message}}</modal-body><modal-cancel-button><clix-secondary-button alternate=true ng-click=onCloseButtonPress()>Cancel</clix-secondary-button></modal-cancel-button><modal-confirm-button><clix-primary-button ng-click=onConfirmButtonPress()>Remove</clix-primary-button></modal-confirm-button></clix-message-modal>"
  );


  $templateCache.put('ui/common/modal/donate/view.donate.html',
    "<clix-modal modal-title=\"{{state === 'buy' ? 'Buy Points' : 'Donate Points'}}\"><div class=clix-donate-modal><div class=clix-donate-modal-header><div class=stepper-container-container ng-class=\"{'buy-more-points-input-container': state === 'buy'}\"><div ng-show=\"state !== 'buy'\"><clix-number-stepper></clix-number-stepper><div class=donate-stepper-label>Available Cash Balance 1760 Points Balance</div></div><div ng-show=\"state === 'buy'\"><div class=buy-points-input-container ng-click=onBuyPointsContainerPress()><span class=buy-points-symbol>$ </span><input type=text ng-pattern=/^[0-9,]*$/ id=buyPointsInput ng-model=buyPointsModel ng-blur=onBuyPointsBlur(buyPointsModel) style=\"min-width: 35px\" pu-elastic-input-width-delta=5px pu-elastic-input clix-max-length=8> <span class=buy-points-cents>.00</span></div><div class=buy-points-input-label>Input amount to apply to points</div><div class=\"buy-points-input-label buy-points-input-sublabel\">Each dollar equals one point.</div></div></div><div class=buy-more-points-container ng-class=\"{'buy-more-points-credit-card': state === 'buy'}\"><div ng-show=\"state !== 'buy'\"><div class=buy-points-label>Want to buy more points?</div><clix-secondary-button ng-click=onBuyPointsPress()>Buy Points Here</clix-secondary-button></div><div ng-show=\"state === 'buy'\"><div class=credit-card-form><div class=credit-card-label>Credit Card <i class=\"lock-icon icon-icon-security-lock\"></i></div><div class=\"input-container-row row\"><div class=\"input-container col-sm-6\"><input type=text> <span class=input-container-label>Credit card number</span></div><div class=\"input-container col-xs-5 col-sm-3\"><input type=text> <span class=input-container-label>CCV <i class=\"info-icon icon-info-icon\"></i></span></div><div class=\"input-container col-xs-5 col-sm-3\"><input type=text> <span class=input-container-label>Expiration date</span></div></div><div class=\"input-container-row row\"><div class=\"input-container col-sm-8\"><input type=text> <span class=input-container-label>Name (As shown on card)</span></div><div class=\"input-container col-xs-6 col-sm-4\"><input type=text> <span class=input-container-label>Zip/Postal code</span></div></div></div></div></div><div class=donate-footer><clix-checkbox label-text=\"I accept the Terms and Conditions\"></clix-checkbox><div class=\"row donate-footer-buttons hidden-xs hidden-sm\" ng-show=\"state === 'buy'\"><div class=\"col-sm-6 donate-footer-button\"><a ng-click=onBackPress() class=donate-cancel-button>Back</a></div><div class=\"col-sm-6 donate-footer-button\"><clix-primary-button ng-click=onDonatePress()>Complete Purchase</clix-primary-button></div></div><div class=\"row donate-footer-buttons buy-mobile-footer-buttons visible-sm visible-xs\" ng-show=\"state === 'buy'\"><div class=\"col-sm-6 donate-footer-button\"><div class=buy-mobile-footer-button><clix-primary-button ng-click=onDonatePress()>Complete Purchase</clix-primary-button></div></div><div class=\"col-sm-6 donate-footer-button\"><div class=buy-mobile-footer-button><a ng-click=onBackPress() class=donate-cancel-button>Back</a></div></div></div><div class=\"row donate-footer-buttons\" ng-show=\"state !== 'buy'\"><div class=\"col-xs-6 donate-footer-button\"><a ng-click=onCancelPress() class=donate-cancel-button>Cancel</a></div><div class=\"col-xs-6 donate-footer-button\"><clix-primary-button ng-click=onDonatePress()>Donate Now</clix-primary-button></div></div></div></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/education/view.education-modal.html',
    "<clix-modal modal-title={{title}}><div ng-if=!ready><clix-loader size=small></clix-loader></div><div ng-if=ready class=clix-education-modal><div class=education-modal-message ng-switch=type><div ng-switch-when=watchlist><clix-is-logged-in><logged-in>This video has been saved to your watchlist, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save a video to your watchlist.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=brand><clix-is-logged-in><logged-in>This brand has been saved to your favorites, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=charity><clix-is-logged-in><logged-in>This charity has been saved to your favorites, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=category><clix-is-logged-in><logged-in>This category has been saved to your favorites, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=celebrity><clix-is-logged-in><logged-in>This star has been saved to your favorites, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=offer><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>Congratulations! You've just received 50 reward points!<br><br>This offer has been saved to your offers, available in your \"My ClixTV\" section.</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>You missed out on 100 reward points! To earn rewards for watching, saving, clicking and sharing, sign up for a free ClixTV account!</not-logged-in></clix-is-logged-in></div><div ng-switch-when=offer-view><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>You received 50 Reward Points, just for visiting this offer. Save the offer to receive even more!</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>You missed out on 50 reward points! To earn rewards for watching, saving, clicking and sharing, sign up for a free ClixTV account!</not-logged-in></clix-is-logged-in></div><div ng-switch-when=learn-more><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>ClixTV will reward you for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badges, points can be earned.</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>After you sign up, ClixTV will reward you for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badges, points can be earned.</not-logged-in></clix-is-logged-in><div class=learn-more-violators-container><div class=learn-more-violator><clix-points-violator>50</clix-points-violator></div><div class=learn-more-violator><clix-violator>100 Reward Points</clix-violator></div></div><p>ClixTV reward points have a cash value that you can use toward goods and services.</p></div></div><div class=\"row education-modal-footer\"><div class=\"col-sm-5 save-preference-checkbox-container\"><clix-is-logged-in><logged-in><div ng-switch=type><div ng-switch-when=learn-more></div><div ng-switch-default><clix-checkbox ng-model=showAgainModel on-checkbox-change=onShowAgainChange(showAgainModel) label-text=\"Don't show this type again\"></clix-checkbox></div></div></logged-in><not-logged-in><div ng-switch=type><div ng-switch-when=learn-more></div><div ng-switch-when=offer-view><clix-checkbox ng-model=showAgainModel on-checkbox-change=onShowAgainChange(showAgainModel) label-text=\"Don't show this type again\"></clix-checkbox></div></div></not-logged-in></clix-is-logged-in></div><div class=\"col-sm-7 buttons-container\"><div class=\"button-container left-button-container\"><clix-secondary-button alternate=true ng-click=onCloseButtonPress(false)>Got it!</clix-secondary-button></div><div class=\"button-container right-button-container\"><clix-is-logged-in><not-logged-in><clix-primary-button ng-click=onSignUpPress()>Sign Up Now</clix-primary-button><a class=login-button ng-click=onLoginPress()>Log In Now</a></not-logged-in><logged-in><div ng-switch=type><div ng-switch-when=watchlist><clix-primary-button ui-sref=\"account({ section: 'watchlist' })\" ng-click=onCloseButtonPress(true)>Go to my Watchlist</clix-primary-button></div><div ng-switch-when=brand><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'brand' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=charity><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'charity' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=category><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'category' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=celebrity><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'star' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=offer><clix-primary-button ui-sref=\"account({ section: 'saved-offers' })\" ng-click=onCloseButtonPress(true)>Go to my Saved Offers</clix-primary-button></div></div></logged-in></clix-is-logged-in></div></div></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/login-signup/view.login-signup.html',
    "<clix-modal><a ng-click=onCloseIconPress() class=\"hidden-md hidden-lg icon-remove-icon clix-modal-close\"></a><div class=signup-modal ng-show=signup><div class=signup-modal-header><div class=\"header-logo-icon icon-colorful-clix-logo\"></div></div><div class=signup-modal-social><div class=social-modal-row><clix-primary-button type=facebook>Sign Up With Facebook</clix-primary-button></div><div class=social-modal-row><clix-primary-button type=google>Sign Up With Google</clix-primary-button></div><div class=or-email-container><span>or with email</span></div></div><form ng-submit=onSignupSubmit()><div class=signup-modal-form><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=Email name=email ng-model=signupModel.email></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=\"Re-Enter Email\" name=email-confirm ng-model=signupModel.emailConfirm></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=\"Choose Password\" name=password ng-model=signupModel.password></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=\"Re-Enter Password\" name=password-confirm ng-model=signupModel.passwordConfirm></div></div><div class=signup-modal-form-row><i class=\"form-icon large icon-full-name-input-icon\"></i><div class=signup-modal-input><input type=text placeholder=\"First Name\" name=first-name ng-model=signupModel.firstName></div></div><div class=signup-modal-form-row><i class=\"form-icon large icon-full-name-input-icon\"></i><div class=signup-modal-input><input type=text placeholder=\"Last Name\" name=last-name ng-model=signupModel.lastName></div></div></div></form><div class=signup-modal-submit><div class=submit-button><clix-primary-button type=normal ng-click=onSignupSubmit()>Sign Up</clix-primary-button></div><div class=login-container>Have an account? <a ng-click=onLoginPress()>Log in</a></div></div><div class=signup-modal-footer>By signing in, you agree to our <a ng-click=onTermsPress()>Terms of Service</a> and <a ng-click=onPrivacyPress()>Privacy Policy</a></div></div><div class=signup-modal ng-hide=signup><div class=signup-modal-header><div class=\"header-logo-icon icon-colorful-clix-logo\"></div></div><div class=signup-modal-social><div class=social-modal-row><clix-primary-button type=facebook ng-click=onFacebookLoginPress()>Log In With Facebook</clix-primary-button></div><div class=social-modal-row><clix-primary-button type=google ng-click=onGoogleLoginPress()>Log In With Google</clix-primary-button></div><div class=or-email-container><span>or with email</span></div></div><form ng-submit=onLoginSubmit() class=signup-modal-form><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=Email ng-model=loginModel.email></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=Password ng-model=loginModel.password></div></div><input type=submit></form><div class=signup-modal-submit><div class=submit-button><clix-primary-button type=normal ng-click=onLoginSubmit()>Log In</clix-primary-button></div><div class=login-container><a ng-click=onForgotPasswordPress() class=forgot-password>Forgot Password?</a><br>Don't have an account? <a ng-click=onSignupPress()>Sign up</a></div></div><div class=signup-modal-footer>By signing in, you agree to our <a ng-click=onTermsPress()>Terms of Service</a> and <a ng-click=onPrivacyPress()>Privacy Policy</a></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/offer/view.offer-modal.html',
    "<div class=clix-offer-modal><a ng-click=onClosePress() class=close-modal-icon><div class=icon-remove-icon></div></a><div ng-if=!offer><clix-loader size=small></clix-loader></div><div ng-if=offer><div class=offer-title>{{offer.title}}</div><div class=\"offer-image-info-container row\"><div class=col-xs-6><img ng-if=offer.carouselPic1 ng-src={{offer.carouselPic1}} class=offer-image><div class=offer-expiration-date>Expires {{offer.expirationDate | clixDate : 'long'}}</div></div><div class=col-xs-6><div class=instructions-title>Instructions</div><div class=instructions-container><div class=instruction-row><div class=instruction-step-container><div class=instruction-step>1</div></div><div class=instruction-info>Click the button below to shop online at {{offer.brand.title}}. Your Coupon code will be copied to your clipboard automatically.</div></div><div class=instruction-row><div class=instruction-step-container><div class=instruction-step>2</div></div><div class=instruction-info>Paste your code during checkout.</div></div><div class=instruction-row><div class=instruction-step-container><div class=instruction-step>3</div></div><div class=instruction-info>Enjoy!</div></div></div></div></div><div class=\"offer-buttons-container row\"><div class=col-xs-4><div class=offer-button><clix-tertiary-button ng-click=onSaveOfferPress()>{{isSavedOffer ? 'Offer Saved' : 'Save Offer'}}</clix-tertiary-button><div class=violator-container><clix-points-violator>50</clix-points-violator></div></div></div><div class=col-xs-4><div class=offer-button><clix-tertiary-button>Redeem Offer</clix-tertiary-button><div class=violator-container><clix-points-violator>50</clix-points-violator></div></div></div><div class=col-xs-4><div class=offer-share><clix-share-button offer=offer></clix-share-button><clix-points-violator>50</clix-points-violator></div></div></div><div class=offer-description-container><div class=offer-description-header>The Revolution Never Ends</div><div class=offer-description ng-bind-html=\"offer.longDescription || offer.description | clixNewLineBreak\"></div></div></div></div>"
  );


  $templateCache.put('ui/common/modal/rewards/view.redeem-rewards.html',
    "<clix-modal modal-title=\"Redeem Rewards\"><div class=clix-redeem-rewards-modal><div class=reward-callout><div class=reward-image><img ng-src={{image}} ng-srcset=\"{{imageHighRes}} 2x\"></div><div class=reward-info><div class=reward-title>{{title}}</div><div class=reward-subtitle>Redeem Online Only</div></div></div><div class=reward-stepper><clix-number-stepper></clix-number-stepper><div class=reward-stepper-label>Available Cash Balance 1760 Points Balance</div></div><div class=redeem-rewards-footer><div class=redeem-rewards-legal>{{disclaimer}}</div><div class=\"row redeem-rewards-buttons\"><div class=\"col-xs-6 redeem-rewards-button\"><a ng-click=onCancelPress() class=redeem-rewards-cancel-button>Cancel</a></div><div class=\"col-xs-6 redeem-rewards-button\"><clix-primary-button ng-click=onRedeemPress()>Redeem Now</clix-primary-button></div></div></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/share/view.generic-share-content.html',
    "<div class=clix-generic-share-content><div class=share-icon-container ng-transclude=shareIconContainer></div><div class=share-content-container><div class=share-content-title ng-transclude=shareTitle></div><div class=share-content-description ng-transclude=shareDescription></div><div class=share-content-footer ng-transclude=shareFooterTitle></div></div></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-modal-brand-content.html',
    "<div class=clix-share-modal-brand-content><clix-generic-share-content><share-icon-container><div class=clix-thumbnail-logo><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></div></share-icon-container><share-title>{{brand.title}}</share-title><share-description>{{brand.description | wordTruncate : 275}}</share-description><share-footer-title>ClixTV</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-modal-celebrity-content.html',
    "<div class=clix-share-modal-celebrity-content><clix-generic-share-content><share-icon-container><div class=celebrity-thumbnail style=\"background-image:url('{{celebrity.thumbnail}}')\"></div></share-icon-container><share-title>{{celebrity.name}}</share-title><share-description>{{celebrity.description | wordTruncate : 275}}</share-description><share-footer-title>ClixTV</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-modal-charity-content.html',
    "<div class=clix-share-modal-charity-content><clix-generic-share-content><share-icon-container><div class=clix-thumbnail-logo><clix-charity-logo charity=charity></clix-charity-logo></div></share-icon-container><share-title>{{charity.title}}</share-title><share-description>{{charity.description | wordTruncate : 275}}</share-description><share-footer-title>ClixTV</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-modal-offer-content.html',
    "<div class=clix-share-modal-offer-content><clix-generic-share-content><share-icon-container><div class=clix-thumbnail-logo><clix-offer-logo offer=offer></clix-offer-logo></div></share-icon-container><share-title>{{offer.title}}</share-title><share-description>{{offer.description | wordTruncate : 275}}</share-description><share-footer-title>ClixTV</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-modal-video-content.html',
    "<div class=clix-share-modal-video-content><div class=\"row share-modal-video-row\"><div class=\"col-sm-5 video-thumbnail-container\"><img ng-src={{video.thumbnail}} class=video-thumbnail></div><div class=\"col-sm-7 video-info-container\"><div class=series-title>Episode {{video.episodeNumber}}: {{video.title}}</div><div class=episode-title>{{video.seriesTitle || video.series.title}} Series</div><div class=\"celebrity-title hidden-sm hidden-xs\">{{video.celebrity.name}}</div><div class=\"video-description hidden-sm hidden-xs\">{{video.description | wordTruncate : 120}}</div><div class=\"video-description visible-sm visible-xs\">{{video.description}}</div><div class=\"video-clix-tv hidden-sm hidden-xs\">ClixTV</div></div></div></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-settings.html',
    "<clix-modal modal-title=\"Share Settings\"><div class=clix-share-settings-modal><div class=share-settings-row><div class=\"social-network-icon-container facebook-social-network\"><i class=\"icon-facebook-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-8\">Connect your Facebook account</div><div class=\"social-network-connect-button col-sm-4\"><clix-tertiary-button>Connect</clix-tertiary-button></div></div></div><div class=share-settings-row><div class=\"social-network-icon-container twitter-social-network\"><i class=\"icon-twitter-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-8\">Connect your Twitter account</div><div class=\"social-network-connect-button col-sm-4\"><clix-tertiary-button>Connect</clix-tertiary-button></div></div></div><div class=share-settings-row><div class=\"social-network-icon-container tumblr-social-network\"><i class=\"icon-tumblr-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-8\">Connect your Tumblr account</div><div class=\"social-network-connect-button col-sm-4\"><clix-tertiary-button>Connect</clix-tertiary-button></div></div></div><div class=share-settings-footer>We will never store your password.</div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/share/view.share.html',
    "<clix-modal><div class=clix-share-modal><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=\"Post To\" select=\"onTabPress('post')\"><div class=modal-post-content><div ng-if=video><clix-share-modal-video-content video=video></clix-share-modal-video-content></div><div ng-if=celebrity><clix-share-modal-celebrity-content celebrity=celebrity></clix-share-modal-celebrity-content></div><div ng-if=offer><clix-share-modal-offer-content offer=offer></clix-share-modal-offer-content></div><div ng-if=brand><clix-share-modal-brand-content brand=brand></clix-share-modal-brand-content></div><div ng-if=charity><clix-share-modal-charity-content charity=charity></clix-share-modal-charity-content></div></div></uib-tab><uib-tab index=1 heading=\"Send To...\" select=\"onTabPress('send')\"><div class=modal-send-content><div ng-if=video><clix-share-modal-video-content video=video></clix-share-modal-video-content></div><div ng-if=celebrity><clix-share-modal-celebrity-content celebrity=celebrity></clix-share-modal-celebrity-content></div><div ng-if=offer><clix-share-modal-offer-content offer=offer></clix-share-modal-offer-content></div><div ng-if=brand><clix-share-modal-brand-content brand=brand></clix-share-modal-brand-content></div><div ng-if=charity><clix-share-modal-charity-content charity=charity></clix-share-modal-charity-content></div></div></uib-tab></uib-tabset><div class=share-modal-footer><div ng-show=\"tab === 'post'\"><div class=clix-share-modal-textbox><textarea>{{shareContent}}</textarea></div><div class=share-modal-post-container><div class=share-modal-social-networks><div class=share-modal-post-to-label>Post to</div><a class=\"social-network-icon-container facebook-social-network\" ng-click=\"onSocialNetworkPress('facebook')\" ng-class=\"{'active': socialNetworks.indexOf('facebook') !== -1}\"><i class=\"icon-facebook-logo social-network-icon\"></i> </a><a class=\"social-network-icon-container twitter-social-network\" ng-click=\"onSocialNetworkPress('twitter')\" ng-class=\"{'active': socialNetworks.indexOf('twitter') !== -1}\"><i class=\"icon-twitter-logo social-network-icon\"></i> </a><a class=\"social-network-icon-container tumblr-social-network\" ng-click=\"onSocialNetworkPress('tumblr')\" ng-class=\"{'active': socialNetworks.indexOf('tumblr') !== -1}\"><i class=\"icon-tumblr-logo social-network-icon\"></i></a></div><a ng-click=onSettingsPress() class=share-modal-settings>Settings</a></div></div><div ng-show=\"tab === 'send'\"><div class=clix-share-modal-input><input placeholder=\"Search Friends\"></div><div class=\"clix-share-modal-textbox send-textbox\"><textarea>{{shareContent}}</textarea></div><div class=\"share-modal-post-container share-modal-copy-link-container\"><a href=# class=share-modal-copy-link>Copy Video Link</a></div></div><div class=\"row footer-modal-buttons-container\"><div class=\"col-xs-6 footer-modal-button\"><a class=cancel-button ng-click=onCancelPress()>{{showBackButton ? 'Back' : 'Cancel'}}</a></div><div class=\"col-xs-6 footer-modal-button\"><clix-primary-button ng-show=\"tab === 'send'\" ng-click=onSendPress()>Send</clix-primary-button><clix-primary-button ng-show=\"tab === 'post'\" ng-click=onPostPress()>Post</clix-primary-button></div></div></div></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/view.message-modal.html',
    "<clix-modal extra-modal-class=clix-message-modal><div class=clix-modal-header ng-transclude=modalTitle></div><div class=message-modal-body><div ng-transclude=modalBody></div></div><div class=message-modal-footer><div class=buttons-container><div class=button-container><div ng-transclude=modalCancelButton></div></div><div class=button-container><div ng-transclude=modalConfirmButton></div></div></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/view.modal.html',
    "<div class=\"clix-modal {{extraModalClass}}\"><a ng-click=onBackButtonPress() ng-show=showBackButton class=modal-back-button><div class=icon-left-tall-arrow></div></a><div class=clix-modal-header ng-show=modalTitle>{{modalTitle}}</div><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/navigation/view.mobile-navigation.html',
    "<div class=mobile-search-container ng-if=searchVisible><div class=mobile-search clix-site-search is-visible=searchVisible></div><div class=mobile-search-background ng-click=onMobileBackgroundPress()></div></div><div class=\"visible-sm visible-xs\"><div class=clix-mobile-navigation><div class=mobile-navigation-container><div ng-mouseup=\"go('home')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'home'}\"><div class=\"navigation-icon icon-home-icon-bottom-nav\"></div>Home</div><div ng-mouseup=\"go('categories')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'categories' || selectedStateName === 'category'}\"><div class=\"navigation-icon icon-categories-icon-bottom-nav\"></div>Categories</div><div ng-mouseup=\"go('stars')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'stars' || selectedStateName === 'star'}\"><div class=\"navigation-icon icon-stars-icon\"></div>Stars</div><div ng-mouseup=\"go('brands')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'brands' || selectedStateName === 'brand'}\"><div class=\"navigation-icon brands-navigation-icon icon-brands-icon-bottom-nav\"></div>Brands</div><div ng-mouseup=\"go('charities')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'charities' || selectedStateName === 'charity'}\"><div class=\"navigation-icon icon-charities-icon-bottom-nav\"></div>Charities</div><div ng-mouseup=onSearchPress() class=mobile-navigation-item><div class=\"navigation-icon icon-search-icon-bottom-nav\"></div>Search</div></div></div></div>"
  );


  $templateCache.put('ui/common/navigation/view.navigation-bar.html',
    "<div class=clix-navigation-bar><div class=\"avatar-container empty-avatar\"><div ng-if=loggedInUser.avatar><div class=avatar-background-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div><div class=avatar-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div></div><div ng-if=!loggedInUser.avatar><div class=avatar-background></div><div class=avatar-image style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></div></div><div class=name-container><div class=display-name>{{loggedInUser.displayName}}</div><div class=my-clixtv>My ClixTV</div></div></div><nav class=navigation-list><a ng-click=\"onItemSelect('overview')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'overview'}\"><div class=navigation-list-icon><i class=icon-account-icon></i></div><div class=navigation-list-label>Account</div></a><a ng-click=\"onItemSelect('watchlist')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'watchlist'}\"><div class=navigation-list-icon><i class=icon-redeem-plus-icon></i></div><div class=navigation-list-label>Watchlist</div></a><a ng-click=\"onItemSelect('favorites')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'favorites'}\"><div class=navigation-list-icon><i class=icon-favorite-icon></i></div><div class=navigation-list-label>Favorites</div></a><a ng-click=\"onItemSelect('saved-offers')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'saved-offers'}\"><div class=navigation-list-icon><i class=icon-offers-icon></i></div><div class=navigation-list-label>Saved Offers</div></a><a ng-click=\"onItemSelect('rewards')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'rewards'}\"><div class=navigation-list-icon><i class=icon-rewards-icon-left-nav></i></div><div class=navigation-list-label>Rewards</div></a><a ng-click=\"onItemSelect('notifications')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'notifications'}\"><div class=navigation-list-icon><i class=icon-notifications-icon-left-nav></i></div><div class=navigation-list-label>Notifications</div></a><a ng-click=\"onItemSelect('settings')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'settings'}\"><div class=navigation-list-icon><i class=icon-settings-icon-left-nav></i></div><div class=navigation-list-label>Settings</div></a></nav></div>"
  );


  $templateCache.put('ui/common/navigation/view.right-navigation.html',
    "<div class=clix-right-navigation ng-class=\"{'active': open}\"><div class=navigation-background-overlay ng-click=onBackgroundPress() ng-class=\"{'active': visible}\"></div><div class=navigation-bar ng-class=\"{'active': visible}\"><div class=navigation-bar-content><a ng-click=onClosePress() class=navigation-close-icon><div class=icon-right-tall-arrow></div></a><div class=\"avatar-container empty-avatar\"><div ng-if=loggedInUser.avatar><div class=avatar-background-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div><div class=avatar-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div></div><div ng-if=!loggedInUser.avatar><div class=avatar-background></div><div class=avatar-image style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></div><div class=camera-icon-container><i class=icon-profile-camera></i></div></div><div class=name-container><div class=display-name>{{loggedInUser.displayName}}</div><div class=my-clixtv>My ClixTV</div></div></div><nav class=navigation-list><a ng-click=\"goToAccount('overview')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-account-icon></i></div><div class=navigation-list-label>Account</div></a><a ng-click=\"goToAccount('watchlist')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-redeem-plus-icon></i></div><div class=navigation-list-label>Watchlist</div></a><a ng-click=\"goToAccount('favorites')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-favorite-icon></i></div><div class=navigation-list-label>Favorites</div></a><a ng-click=\"goToAccount('saved-offers')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-offers-icon></i></div><div class=navigation-list-label>Saved Offers</div></a><a ng-click=\"goToAccount('rewards')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-rewards-icon-left-nav></i></div><div class=navigation-list-label>Rewards</div></a><a ng-click=\"goToAccount('notifications')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-notifications-icon-left-nav></i></div><div class=navigation-list-label>Notifications</div></a><a ng-click=\"goToAccount('settings')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-settings-icon-left-nav></i></div><div class=navigation-list-label>Settings</div></a></nav><div class=logout-button-container><clix-secondary-button ng-click=onLogoutPress()>Log Out</clix-secondary-button></div></div></div></div>"
  );


  $templateCache.put('ui/common/notifications/view.notification-item.html',
    "<div class=notification-item ng-class=\"{'minimal-notification-item': minify === 'true'}\"><a ui-sref=\"star({ id: '57dacf46ef97110300fe5366' })\" class=notification-thumbnail style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/57dacf46ef97110300fe5366/kyrie_irving3.png')\"></a><div class=notification-content-container><div class=notification-subject><a ui-sref=\"star({ id: '57dacf46ef97110300fe5366' })\" class=notification-author-name>{{notification.subject}}</a> added a new video: &ldquo;<a ui-sref=\"video({ id: '57d587cf5877ef0300727bc9' })\">{{notification.message}}</a>&rdquo;.</div><div class=notification-timestamp-container><div class=notification-timestamp><i class=\"notification-icon icon-stars-icon\"></i> 2 Hours Ago</div><div class=notification-points-container><clix-violator>100 Reward Points</clix-violator></div></div></div><a ng-click=onNotificationMenuPress(notification) clix-click-anywhere-else=bodyClicked class=notification-more-icon-container><i class=\"notification-more-icon icon-ellipsis\" clix-tooltip-trigger tooltip-id=actions-button-{{$id}}></i></a><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip></div>"
  );


  $templateCache.put('ui/common/notifications/view.notification-tooltip.html',
    "<div class=clix-notification-tooltip><div class=notification-tooltip-header>Notifications</div><clix-notifications notifications=notifications minify=true></clix-notifications></div>"
  );


  $templateCache.put('ui/common/notifications/view.notifications.html',
    "<div class=clix-notifications><div class=notification-item-container ng-repeat=\"notification in notifications.notifications\"><clix-notification-item notification=notification minify={{minify}}></clix-notification-item></div></div>"
  );


  $templateCache.put('ui/common/notifications/view.site-notification-bar.html',
    "<div class=clix-site-notification-bar ng-class=\"{'active': active, 'points-bar': receivedPoints}\" ng-mouseover=onMouseover() ng-mouseleave=onMouseleave()><div ng-show=favorite><div ng-switch=type><div ng-switch-when=favorite><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'favorites', tab: tab })\">Favorites</a></div><div ng-switch-when=watchlist><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'watchlist' })\">Watchlist</a></div><div ng-switch-when=offer><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'saved-offers' })\">Saved Offers</a> | You received 50 Reward Points!</div></div></div><div ng-show=!favorite><div ng-switch=type><div ng-switch-when=favorite><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'favorites', tab: tab })\">Favorites</a></div><div ng-switch-when=watchlist><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'watchlist' })\">Watchlist</a></div><div ng-switch-when=offer><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'saved-offers' })\">Saved Offers</a></div></div></div></div>"
  );


  $templateCache.put('ui/common/page/landing/view.landing-video-content.html',
    "<div class=clix-landing-video-content><div class=\"row landing-video-content-row\"><div class=\"col-md-9 video-content-container\"><div class=\"row about-landing-video-content\"><div class=\"col-sm-7 about-landing-video\"><div ng-show=video><div id=videoPlayer></div><clix-video-player ng-if=video video=video auto-play=false video-id=videoPlayer on-ready=onPlayerReady></clix-video-player><div class=\"video-violator hidden-sm hidden-xs\" ng-show=\"!charity && !videoPlaying\"><clix-violator>100 Reward Points</clix-violator></div></div><div ng-transclude=mainContent></div></div><div class=\"col-sm-5 about-landing-content\"><div class=landing-description><div ng-transclude=contentDescription></div></div><div class=share-container ng-show=!charity><div clix-tooltip-trigger tooltip-id=share-button-{{$id}} ng-transclude=shareIcon></div><div class=content-points-validator><clix-points-violator>50</clix-points-violator></div></div></div></div><div class=landing-footer-content><div ng-transclude=footerContent></div></div></div><div class=\"col-md-3 video-sidebar-container\"><div class=sidebar-container><div class=sidebar-title><div ng-transclude=sidebarTitle></div></div><div class=sidebar-content><div ng-transclude=sidebarContent></div></div></div></div></div></div><clix-tooltip tooltip-id=share-button-{{$id}}><div ng-transclude=shareTooltipContent></div></clix-tooltip>"
  );


  $templateCache.put('ui/common/page/view.filter-page.html',
    "<div class=clix-filter-page ng-class=\"{'partial-page': partial === 'true'}\"><div class=main-header ng-show=pageTitleProvided><clix-main-header><div ng-transclude=pageTitle></div></clix-main-header></div><div class=search-filter-container ng-class=\"{'with-search-filter': searchFilterProvided}\"><div ng-transclude=pageSearchFilter></div></div><div ng-transclude=pageContent></div></div>"
  );


  $templateCache.put('ui/common/page/view.landing-page.html',
    "<div class=clix-landing-page>Boop</div>"
  );


  $templateCache.put('ui/common/parallax/view.parallax.html',
    "<div class=clix-parallax id=parallax-container><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/printable/view.printable-page.html',
    "<div class=clix-printable-page><div class=printable-logo-container><img src=assets/theme/clixtv/dist/images/clixtv-logo-blk.svg class=clix-logo></div><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/radio-buttons/view.radio-button-group.html',
    "<div class=clix-radio-button-group><div ng-repeat=\"option in options\" class=radio-button-select-container ng-class=\"{'active': selected === $index}\" ng-click=setSelected($index)><div class=radio-button-select></div><div class=radio-button-label>{{option.label}}</div></div></div>"
  );


  $templateCache.put('ui/common/search/view.search-filter.html',
    "<div class=clix-search-filter><div class=row><div class=col-sm-7><div class=search-bar-container><div class=search-bar><i class=\"search-icon icon-search-icon-bottom-nav\"></i> <input type=text class=search-input placeholder={{searchPlaceholder}}></div></div></div><div class=col-sm-5 ng-if=\"showFilters !== 'false'\"><div class=filters-container><div class=filter-bar><clix-dropdown options=filterOptions placeholder-text={{filterPlaceholder}}></clix-dropdown></div><div class=filter-bar><clix-dropdown options=sortOptions placeholder-text={{sortPlaceholder}}></clix-dropdown></div></div></div></div></div>"
  );


  $templateCache.put('ui/common/search/view.site-search.html',
    "<div class=clix-site-search ng-if=isVisible clix-click-anywhere-else=bodyClicked><div class=search-results-container><div class=search-input-container><div class=search-input-field-container><input class=search-input-field id=search-input-field type=text placeholder=Search ng-model=$parent.term ng-change=onTermChange()></div></div><div class=search-results><div class=search-results-loader ng-if=loading><clix-loader size=small></clix-loader></div><div ng-if=results><div class=search-results-block ng-if=\"results.celebrities && results.celebrities.celebrities && results.celebrities.celebrities.length > 0\"><div class=search-results-title>Stars</div><clix-header-search-row ng-repeat=\"celebrity in results.celebrities.celebrities\" ui-sref=\"star({ id: celebrity.id })\" ng-click=\"onResultPress('star', celebrity)\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{celebrity.thumbnail}}')\"></div></logo-container><title-text>{{celebrity.name}}</title-text><subtitle-text>Star</subtitle-text></clix-header-search-row></div><div class=search-results-block ng-if=\"results.series && results.series.series && results.series.series.length > 0\"><div class=search-results-title>Series</div><clix-header-search-row ng-repeat=\"series in results.series.series\" ng-click=\"onResultPress('series', series)\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{series.thumbnail}}')\"></div></logo-container><title-text>{{series.title}}</title-text><subtitle-text>Series</subtitle-text></clix-header-search-row></div><div class=search-results-block ng-if=\"results.brands && results.brands.brands && results.brands.brands.length > 0\"><div class=search-results-title>Brands Related To {{term}}</div><clix-header-search-row ng-repeat=\"brand in results.brands.brands\" ui-sref=\"brand({ id: brand.id })\" ng-click=\"onResultPress('brand', brand)\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{brand.thumbnail}}')\"></div></logo-container><title-text>{{brand.title}}</title-text><subtitle-text>Brand</subtitle-text></clix-header-search-row></div><div class=search-results-block ng-if=\"results.charities && results.charities.charities && results.charities.charities.length > 0\"><div class=search-results-title>Charities Related To {{term}}</div><clix-header-search-row ng-repeat=\"charity in results.charities.charities\" ui-sref=\"charity({ id: charity.id })\" ng-click=\"onResultPress('charity', charity)\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{charity.thumbnail}}')\"></div></logo-container><title-text>{{charity.title}}</title-text><subtitle-text>Charity</subtitle-text></clix-header-search-row></div><div class=search-results-block ng-if=\"results.videos && results.videos.videos && results.videos.videos.length > 0\"><div class=search-results-title>Videos</div><clix-header-search-row ng-repeat=\"video in results.videos.videos\" ui-sref=\"video({ id: video.id })\" ng-click=\"onResultPress('video', video)\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{video.thumbnail}}')\"></div></logo-container><title-text>{{video.title}}</title-text><subtitle-text>Video</subtitle-text></clix-header-search-row></div></div></div></div></div>"
  );


  $templateCache.put('ui/common/stepper/view.number-stepper.html',
    "<div class=clix-number-stepper><clix-primary-button circle=true ng-click=onMinusPress()><i class=\"button-icon icon-redeem-minus-icon\"></i></clix-primary-button><div class=value-container><input type=text ng-model=priceDisplay ng-change=onPriceChange() ng-blur=onPriceBlur()></div><clix-primary-button circle=true ng-click=onPlusPress()><i class=\"button-icon icon-redeem-plus-icon\"></i></clix-primary-button></div>"
  );


  $templateCache.put('ui/common/tooltip/view.tooltip-templates.html',
    "<clix-tooltip tooltip-id=rewards-points-tooltip></clix-tooltip>"
  );


  $templateCache.put('ui/common/tooltip/view.tooltip.html',
    "<div class=clix-tooltip id={{tooltipId}}><div class=clix-tooltip-content><div class=tooltip-arrow></div><div ng-transclude></div></div></div>"
  );


  $templateCache.put('ui/dropdown/view.dropdown.html',
    "<div class=clix-dropdown ng-show=options clix-click-anywhere-else=bodyClicked><div class=dropdown-trigger ng-click=triggerClicked()><div class=dropdown-label>{{ selected.label }}</div><div class=dropdown-icon><i class=icon-down-arrow></i></div></div><clix-tooltip-menu items=dropdownOptions menuopen=menuVisible></clix-tooltip-menu></div>"
  );


  $templateCache.put('ui/footer/view.footer.html',
    "<footer class=clix-footer><div class=\"row footer-content\"><div class=\"col-xs-12 col-sm-3 footer-column\"><div class=footer-logo-container><img src=assets/theme/clixtv/dist/images/white-logo.svg class=clix-logo></div></div><div class=\"col-xs-6 col-sm-3 footer-column\"><div class=footer-label>Company</div><ul class=footer-list><li><a href=#>What is ClixTV?</a></li><li><a href=#>Investor Relations</a></li><li><a href=#>Advertisers</a></li><li><a href=#>Jobs</a></li><li><a href=#>Press</a></li><li><a href=#>News</a></li></ul></div><div class=\"col-xs-6 col-sm-3 footer-column\"><div class=footer-label>Useful Links</div><ul class=footer-list><li><a href=#>Store</a></li><li><a href=#>Charities</a></li><li><a href=#>Celebrities</a></li><li><a href=#>Affiliates</a></li><li><a href=#>Rewards</a></li><li><a href=#>Video Categories</a></li><li><a href=#>Help</a></li><li><a href=#>Contact</a></li></ul></div><div class=\"col-xs-12 col-sm-3 footer-column\"><div class=social-icons><a href=# class=social-icon><i class=icon-facebook-logo></i> </a><a href=# class=social-icon><i class=icon-twitter-logo></i> </a><a href=# class=social-icon><i class=icon-youtube-logo></i> </a><a href=# class=social-icon><i class=icon-instagram-logo></i></a></div></div></div><div class=footer-legal-container><div class=footer-legal-column><a href=#>Legal</a></div><div class=footer-legal-column><a href=#>Cookies</a></div><div class=footer-legal-column>&copy; ClixTV, Inc</div></div></footer>"
  );


  $templateCache.put('ui/header/view.header-search-icon-row.html',
    "<div class=header-search-row><div class=search-image-container ng-transclude=logoContainer></div><div class=search-content-container><div class=search-title-text ng-transclude=titleText></div><div class=search-subtitle-text ng-transclude=subtitleText></div></div></div>"
  );


  $templateCache.put('ui/header/view.header-search-icon.html',
    "<div class=navigation-search-container ng-class=\"{'active': searchVisible === true}\"><div class=search-icon-container ng-click=onSearchIconPress() clix-click-anywhere-else=bodyClicked><i class=\"search-icon icon-search-icon-bottom-nav\"></i></div><div class=search-results-container><div class=search-input-field-container><input class=search-input-field id=search-input-field type=text placeholder=Search ng-model=term ng-change=onTermChange()></div><div class=search-results><div class=search-results-loader ng-if=loading><clix-loader size=small></clix-loader></div><div ng-if=results><div class=search-results-block ng-if=\"results.celebrities && results.celebrities.celebrities && results.celebrities.celebrities.length > 0\"><div class=search-results-title>Stars</div><clix-header-search-row ng-repeat=\"celebrity in results.celebrities.celebrities\" ui-sref=\"star({ id: celebrity.id })\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{celebrity.thumbnail}}')\"></div></logo-container><title-text>{{celebrity.name}}</title-text><subtitle-text>Star</subtitle-text></clix-header-search-row></div><div class=search-results-block ng-if=\"results.series && results.series.series && results.series.series.length > 0\"><div class=search-results-title>Series</div><clix-header-search-row ng-repeat=\"series in results.series.series\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{series.thumbnail}}')\"></div></logo-container><title-text>{{series.title}}</title-text><subtitle-text>Series</subtitle-text></clix-header-search-row></div><div class=search-results-block ng-if=\"results.brands && results.brands.brands && results.brands.brands.length > 0\"><div class=search-results-title>Brands Related To {{term}}</div><clix-header-search-row ng-repeat=\"brand in results.brands.brands\" ui-sref=\"brand({ id: brand.id })\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{brand.thumbnail}}')\"></div></logo-container><title-text>{{brand.title}}</title-text><subtitle-text>Brand</subtitle-text></clix-header-search-row></div><div class=search-results-block ng-if=\"results.charities && results.charities.charities && results.charities.charities.length > 0\"><div class=search-results-title>Charities Related To {{term}}</div><clix-header-search-row ng-repeat=\"charity in results.charities.charities\" ui-sref=\"charity({ id: charity.id })\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{charity.thumbnail}}')\"></div></logo-container><title-text>{{charity.title}}</title-text><subtitle-text>Charity</subtitle-text></clix-header-search-row></div><div class=search-results-block ng-if=\"results.videos && results.videos.videos && results.videos.videos.length > 0\"><div class=search-results-title>Videos</div><clix-header-search-row ng-repeat=\"video in results.videos.videos\" ui-sref=\"video({ id: video.id })\"><logo-container><div class=search-results-circle-image style=\"background-image: url('{{video.thumbnail}}')\"></div></logo-container><title-text>{{video.title}}</title-text><subtitle-text>Video</subtitle-text></clix-header-search-row></div></div></div></div></div>"
  );


  $templateCache.put('ui/header/view.header.html',
    "<header class=clix-header clix-scroll-offset-class offset=100 scroll-class=filled ng-class=\"{'clix-header-hidden': scrollDirection === 'up'}\"><div class=\"clix-header-container hidden-sm hidden-xs\"><h1 class=logo-container><a href=/ ><img src=assets/theme/clixtv/dist/images/gradient-logo.svg class=clix-logo></a></h1><nav class=clix-navigation><div class=navigation-item-container ng-class=\"{'active': selectedStateName === 'categories' || selectedStateName === 'category'}\"><a ui-sref=categories>Categories</a></div><div class=navigation-item-container ng-class=\"{'active': selectedStateName === 'stars' || selectedStateName === 'star'}\"><a ui-sref=stars>Stars</a></div><div class=navigation-item-container ng-class=\"{'active': selectedStateName === 'brands' || selectedStateName === 'brand'}\"><a ui-sref=brands>Brands</a></div><div class=navigation-item-container ng-class=\"{'active': selectedStateName === 'charities' || selectedStateName === 'charity'}\"><a ui-sref=charities>Charities</a></div><div class=\"navigation-item-container search-item-container\"><clix-header-search-icon></clix-header-search-icon></div></nav><div class=account-action-container><div ng-if=loggedInUser><div class=header-user-container clix-click-anywhere-else=hideNotificationMenu><clix-header-points-violator points=points></clix-header-points-violator><div class=header-avatar-container><div ng-if=loggedInUser.avatar><a ng-click=onNamePress() class=header-avatar style=\"background-image: url('{{loggedInUser.avatar}}')\"></a></div><div ng-if=!loggedInUser.avatar><a ng-click=onNamePress() class=header-avatar style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></a></div><div class=header-notification-count ng-show=\"notifications.notifications.length > 0\">&nbsp;{{notifications.notifications.length}}</div></div><div class=header-name-container><a ng-click=onNamePress() class=header-name>{{loggedInUser.firstName}} </a><a ng-click=onArrowPress() class=header-expand-icon><div class=icon-left-tall-arrow></div></a></div><div class=notification-tooltip-container ng-show=tooltipsShown><clix-notification-tooltip notifications=notifications></clix-notification-tooltip></div></div></div><div ng-if=!loggedInUser><div class=header-user-container><clix-header-points-violator></clix-header-points-violator><div class=header-login-action-container><clix-callout-button color-type=secondary ng-click=onLoginSignupPress(false)>Login</clix-callout-button><a ng-click=onLoginSignupPress(true) class=account-action-label>Register Now</a></div></div></div></div></div><div class=\"clix-header-container hidden-lg hidden-md\"><div class=mobile-header-block><div class=points-violator-container><clix-header-points-violator></clix-header-points-violator></div></div><a href=/ class=\"mobile-logo mobile-header-block\"><img src=assets/theme/clixtv/dist/images/color-logo-light.svg class=clix-logo></a><div class=\"user-avatar-container mobile-header-block\"><div class=user-avatar><div ng-if=!loggedInUser><clix-callout-button color-type=secondary ng-click=onLoginSignupPress(false)>Login</clix-callout-button></div><div class=header-user-container ng-if=loggedInUser><div class=header-avatar-container><div ng-if=loggedInUser.avatar><a ng-click=onArrowPress() class=header-avatar style=\"background-image: url('{{loggedInUser.avatar}}')\"></a></div><div ng-if=!loggedInUser.avatar><a ng-click=onArrowPress() class=header-avatar style=\"background-image: url('assets/theme/clixtv/dist/images/empty-profile-picture.png')\"></a></div><div class=header-notification-count ng-show=\"notifications.notifications.length > 0\">&nbsp;{{notifications.notifications.length}}</div></div></div></div></div></div></header>"
  );


  $templateCache.put('ui/home/view.home.html',
    "<div class=home-page><div class=mobile-header ng-if=showMobileCarousel><img src=/assets/theme/clixtv/dist/images/redfoo-header.jpg srcset=\"/assets/theme/clixtv/dist/images/redfoo-header@2x.jpg 2x\"><div class=mobile-header-content><div class=header-content-title>Your Stars. Their Passions.</div><div class=header-content-subtitle>Premium content from<br>your favorite stars</div><a ng-click=onSignupPress() class=primary-button ng-show=!loggedInUser>Sign Up Free</a></div></div><div class=\"main-video-container hidden-xs\"><video src=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5829ca559c56fb0004f1fd6d/file.mp4 autoplay=\"\" loop=\"\" muted=\"\" ng-if=!showMobileCarousel></video><div class=video-overlay></div><div class=carousel-container id=carousel-container><slick dots=true autoplay=true autoplay-speed=5000 prev-arrow=#main-carousel-previous next-arrow=#main-carousel-next pause-on-hover=true><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>The Network That Gives.</div><div class=\"carousel-second-line carousel-sub-header\">Support Your Favorite Causes By Watching</div><div class=button-container ng-show=!loggedInUser><a class=primary-button ng-click=onSignupPress()>Sign Up Free</a></div></div></div></div><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>Your Stars. Their Passions.</div><div class=\"carousel-second-line carousel-sub-header\">Premium content from your favorite stars</div><div class=button-container ng-show=!loggedInUser><a class=primary-button ng-click=onSignupPress()>Sign Up Free</a></div></div></div></div><div><div class=carousel-slide style=\"height: {{videoContainerHeight}}px\"><div class=carouse-slide-content><div class=carousel-main-header>Your Stars. Their Passions.</div><div class=\"carousel-second-line carousel-sub-header\">Premium content from your favorite stars</div><div class=button-container ng-show=!loggedInUser><a class=primary-button ng-click=onSignupPress()>Sign Up Free</a></div></div></div></div></slick></div><div id=main-carousel-previous><div class=main-carousel-button><i class=icon-left-tall-arrow></i></div></div><div id=main-carousel-next><div class=main-carousel-button><i class=icon-right-tall-arrow></i></div></div></div><div ng-if=!ready><clix-loader size=large></clix-loader></div><div ng-show=ready><div ng-repeat=\"category in categories.categories | orderBy: 'order'\" ng-if=\"category && category.videos && category.videos.videos && category.videos.videos.length > 0\"><clix-video-category-scroll-list category=category></clix-video-category-scroll-list></div></div></div>"
  );


  $templateCache.put('ui/logo/view.logo.html',
    "<div class=clix-logo-container ng-class=\"{'clix-charity-logo-container': charity, 'large': size === 'large'}\"><img ng-if=logoUrl ng-src={{logoUrl}} class=logo-image></div>"
  );


  $templateCache.put('ui/notfound/view.not-found.html',
    "<div class=clix-not-found-page><clix-search-filter search-placeholder=\"Search ClixTV\" show-filters=false></clix-search-filter><clix-empty-container><header-text><div class=\"visible-sm visible-xs\">Sorry, the page you requested cannot be found. Try searching for something else.</div><div class=\"hidden-sm hidden-xs\">Sorry, the page you requested cannot be found.<br>Try searching for something else.</div></header-text></clix-empty-container><div class=footer-links-container><div class=footer-link><a ui-sref=home>ClixTV Home Page</a></div></div></div>"
  );


  $templateCache.put('ui/offer/view.offer.html',
    "<div ng-if=!configs><clix-loader size=large></clix-loader></div><div class=clix-offer-page ng-if=configs><clix-hero-banner title-text={{configs.title}} button-text=\"{{'Save Offer'}}\" button-tooltip-text=\"{{loggedInUser ? (isFavorite ? 'Remove from your saved offers' : 'You will receive 50 Reward Points for saving this offer!') : 'After you sign up, you will receive 50 Reward Points for saving this offer!'}}\" share-tooltip-text=\"{{loggedInUser ? 'You will receive 50 Reward Points for sharing!' : 'After signing up, you will receive 50 Reward Points for sharing!'}}\" points=\"{{'50'}}\" subtext=\"Expires {{offer.expirationDate | clixDate: 'long'}}\" background-image={{configs.backgroundImage}} banner-type=Offer><favorite-button><clix-tertiary-button ng-click=onFavoritePress() is-active=isFavorite>{{isFavorite ? 'Remove Saved Offer' : 'Save Offer'}}</clix-tertiary-button></favorite-button><share-icon><clix-share-button extra-class=banner-share-icon offer=offer></clix-share-button></share-icon></clix-hero-banner><div class=main-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Overview><div class=home-container><clix-landing-video-content><main-content><div class=offer-carousel><slick dots=true prev-arrow=#main-carousel-previous next-arrow=#main-carousel-next><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-1.png></div><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-2.png></div><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-3.png></div></slick><div id=main-carousel-previous><div class=main-carousel-button><i class=\"arrow-icon icon-left-tall-arrow\"></i></div></div><div id=main-carousel-next><div class=main-carousel-button><i class=\"arrow-icon icon-right-tall-arrow\"></i></div></div></div></main-content><content-description><div class=home-header>Instructions</div><div class=home-instructions><div class=instructions-row><div class=instructions-number>1</div><div class=instructions-label>Click the button below to shop online at {{brand.title}}. Your Coupon code will be copied to your clipboard automatically.</div></div><div class=instructions-row><div class=instructions-number>2</div><div class=instructions-label>Paste your code during checkout.</div></div><div class=instructions-row><div class=instructions-number>3</div><div class=instructions-label>Enjoy!</div></div></div><div class=offer-buttons><div class=offer-button><div class=save-offer-button clix-tooltip-trigger tooltip-id=save-offer-button-{{$id}}><clix-tertiary-button ng-click=onFavoritePress() is-active=isFavorite>{{isFavorite ? 'Remove Saved Offer' : 'Save Offer'}}</clix-tertiary-button><div class=save-offer-points><clix-points-violator>50</clix-points-violator></div></div><clix-tooltip tooltip-id=save-offer-button-{{$id}}><div ng-if=loggedInUser>{{isFavorite ? 'Remove from your saved offers' : 'You will receive 50 Reward Points for saving this offer!'}}</div><div ng-if=!loggedInUser>After you sign up, you will receive 50 Reward Points for saving this offer! <a ng-click=\"\">Learn more</a>.</div></clix-tooltip></div><div class=offer-button><div class=save-offer-button clix-tooltip-trigger tooltip-id=redeem-offer-button-{{$id}}><clix-tertiary-button>Redeem Now</clix-tertiary-button><div class=save-offer-points><clix-points-violator>50</clix-points-violator></div></div><clix-tooltip tooltip-id=redeem-offer-button-{{$id}}><div ng-if=loggedInUser>You will receive 50 Reward Points for redeeming this offer!</div><div ng-if=!loggedInUser>After signing up, you will receive 50 Reward Points for redeeming this offer! <a ng-click=\"\">Learn more</a>.</div></clix-tooltip></div></div></content-description><share-tooltip-content><div ng-if=loggedInUser>You will receive 50 Reward Points for sharing!</div><div ng-if=!loggedInUser>After signing up, you will receive 50 Reward Points for sharing! <a ng-click=\"\">Learn more</a>.</div></share-tooltip-content><sidebar-title>More Offers From {{offer.brand.title}}</sidebar-title><sidebar-content><div class=\"row brand-offer-row\"><div class=\"col-xs-6 col-sm-6 col-md-12 col-lg-12 brand-offer-column\" ng-repeat=\"offer in offer.brand.offers.offers | limitTo: 3 | filter: { id: '!' + offer.id }\"><div class=brand-offer><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></div></sidebar-content><footer-content><div class=\"offer-footer-info row\"><div class=\"col-md-6 offer-footer-column\"><div class=footer-header><clix-secondary-header>The Revolution Never Ends</clix-secondary-header></div><p>Since 1985, the sneakers carrying Michael Jordan’s name and world-renowned “Jumpman” silhouette have helped to define and shape sneaker culture. It began with a standard Nike high top, and evolved with daring designs implemented into each iteration. From graphic prints to patent leather to fighter planes and Ferrari-inspired designs, Jordan sneakers routinely transcend its basketball roots by refreshing its initial offerings with new looks and color schemes to remain prevalent throughout generations.</p><p>- Leather upper for a supportive fit</p><p>- Full-length Nike Zoom Air unit for responsive cushioning</p><p>- Carbon fiber shank helps maximize energy return</p><p>- Rubber sole for traction on a variety of surfaces</p></div><div class=\"col-md-6 offer-footer-column\"><div class=footer-header><clix-secondary-header>About {{offer.brand.title}}</clix-secondary-header></div><p>{{offer.brand.description}}</p></div></div></footer-content><share-icon><clix-share-button extra-class=landing-share-icon offer=offer></clix-share-button></share-icon></clix-landing-video-content></div></uib-tab><uib-tab index=1 heading=\"Related Offers\"><div class=\"videos-title-container related-offers-title\"><div class=videos-title><clix-secondary-header>All {{offer.brand.title}} Offers</clix-secondary-header></div></div><div class=\"row clix-block-row offers-container\"><div class=\"clix-block-item col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"offer in offer.brand.offers.offers | filter: { id: '!' + offer.id }\"><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></uib-tab><uib-tab index=2 heading=Videos><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>All Videos Featuring {{offer.brand.title}}</clix-secondary-header></div><div class=video-sort-container><clix-dropdown options=seriesList></clix-dropdown></div></div><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-12 col-sm-12 col-md-3 col-lg-2-4\" ng-repeat=\"video in offer.videos.videos\"><clix-video-content-callout video=video></clix-video-content-callout></div></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/offer/view.printable-redeem-offer.html',
    "<div clix-printable-page><div class=clix-printable-redeem-offer><div class=redeem-offer-header>Use the Coupon Code Below</div><div class=redeem-offer-details><div class=coupon-code>VPBC500</div><div class=redeem-offer-sub-title>Shop online at Nike</div><div class=redeem-offer-qr></div><div class=redeem-offer-desc><p>Get 20% off when you buy at nike.com. Restrictions apply. See merchant website for more details.</p><p>Offer expires 2/1/2017</p></div></div><div class=redeem-offer-legal><p>ClixTV Legal copy here...</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis odio in ipsum vestibulum aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam ac augue eget metus posuere suscipit. Nunc aliquet iaculis est eu sagittis. Nunc blandit facilisis lorem vel laoreet. In vel ex ligula. Donec justo neque, porta id faucibus id, lobortis vitae enim. Sed a venenatis diam. Quisque ullamcorper ac massa a interdum. Donec venenatis lobortis nulla quis volutpat. Fusce at neque libero.</p><p>Phasellus condimentum elementum nunc, ut laoreet elit convallis et. Morbi viverra, neque nec faucibus aliquet, nulla diam pharetra purus, sed semper elit orci ac nisi. Donec iaculis id mauris vel imperdiet. Donec consectetur felis fringilla eros tristique, at dapibus turpis blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam efficitur tellus mollis ex gravida vestibulum vel eget lacus. Ut ornare varius nunc, malesuada blandit dui consequat at. Curabitur pretium laoreet velit nec ultrices. Donec tincidunt mauris fringilla egestas vehicula. Phasellus molestie justo et efficitur ornare. Phasellus sodales diam eget purus imperdiet aliquam. Cras lobortis ex a eros convallis ultrices.</p><p>Duis imperdiet, tortor vitae posuere cursus, arcu erat luctus sapien, a finibus orci tellus eu nulla. Pellentesque leo libero, egestas sed mattis ut, mollis a nibh. Praesent mattis neque vitae erat facilisis, elementum malesuada est blandit. Etiam erat neque, commodo eget mattis ac, posuere sit amet mi. Morbi vitae tortor quis sapien congue tempus a quis est. Curabitur laoreet molestie tempus. Pellentesque quis elit libero. Nulla felis urna, scelerisque in faucibus at, fringilla in massa.</p><p>Fusce id massa mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed et erat eu urna posuere eleifend in mattis tortor. Etiam semper vel ante quis lacinia. Integer sodales tellus a justo tincidunt, in pellentesque odio fringilla. Pellentesque et scelerisque sapien, vel dignissim tortor. Donec a diam gravida, dignissim lacus quis, dictum est. Vivamus ac purus viverra, pretium nulla ut, pellentesque dui. Sed vel magna iaculis, rhoncus tortor sed, condimentum dolor. Sed lacinia, neque in ullamcorper condimentum, lectus erat volutpat magna, id sodales lacus nunc ac orci. Morbi tincidunt, justo ut cursus faucibus, odio risus finibus libero, sed vestibulum nisi leo quis libero. Fusce in urna nibh. Phasellus dolor velit, fermentum ac diam id, dictum feugiat ligula. Curabitur eget augue blandit, rutrum purus sit amet, pulvinar massa. Sed lacinia iaculis velit sed laoreet. Aliquam elementum elementum mauris, et iaculis ipsum mattis faucibus.</p><p>Suspendisse purus sem, consequat in nibh eget, lobortis viverra turpis. Morbi orci dui, sagittis nec viverra sit amet, iaculis vel tortor. Nulla malesuada imperdiet orci quis scelerisque. Aliquam sit amet nulla aliquet, mattis purus quis, sagittis augue. Maecenas facilisis, sem nec volutpat fermentum, metus sapien malesuada tortor, eu placerat libero purus eget erat. Pellentesque pellentesque, tortor quis laoreet porttitor, odio augue eleifend nibh, sed sodales odio ligula in enim. Quisque urna lacus, faucibus eget sapien sit amet, tristique aliquet nunc. Donec consectetur urna leo, non aliquam sapien placerat quis. Nullam vehicula odio a mauris bibendum, eu fermentum felis efficitur. Integer faucibus pellentesque urna non cursus. Morbi risus nisl, sodales quis porttitor et, aliquet a ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque purus ante, tincidunt ornare risus vel, imperdiet dictum nunc. Etiam ultricies turpis eget felis dignissim, sit amet aliquet mi feugiat.</p><p>Duis dignissim massa augue, ut tincidunt est fermentum sit amet. Curabitur eu purus vel lorem viverra iaculis. Duis sit amet molestie ex, vel sodales enim. Aenean sollicitudin augue in congue facilisis. Fusce consectetur a sapien ut pretium. Proin id fringilla augue. Sed sodales purus ut erat elementum, et viverra nisi ultrices. Praesent et fermentum leo. Nam ante sem, molestie dignissim laoreet at, fermentum sit amet est. Sed pharetra arcu vitae neque sagittis aliquam.</p><p>Donec ac elementum est, id blandit lorem. Nam aliquet tincidunt massa, eget tincidunt justo interdum eget. Curabitur quis porta orci. Phasellus sagittis nisi augue. Phasellus tortor velit, pulvinar ut felis a, tempus convallis urna. Proin faucibus condimentum finibus. In hac habitasse platea dictumst. Pellentesque convallis eros eros, sit amet vehicula arcu auctor sit amet. Integer at efficitur dolor, id pretium nunc. Mauris ultrices sollicitudin augue, et ultrices quam convallis nec. Fusce nulla nibh, interdum id eleifend quis, faucibus a enim.</p><div class=redeem-offer-copyright><clix-copyright></clix-copyright></div></div></div></div>"
  );


  $templateCache.put('ui/stars/view.star.html',
    "<div ng-if=!celebrity><clix-loader size=large></clix-loader></div><div class=clix-star-page ng-if=celebrity><clix-hero-banner title-text={{celebrity.name}} button-text=\"{{isFavorite ? 'Remove from Favorites' : 'Favorite'}}\" button-icon-class=\"{{'icon-favorite-icon banner-favorite-icon'}}\" button-tooltip-text=\"{{loggedInUser ? ((isFavorite) ? 'Remove this star from your Favorites' : 'Add this star to your Favorites.') : 'After signing up, you will be able to add this star to your Favorites.'}}\" subtext=\"{{celebrity.videos.videos.length}} {{celebrity.videos.videos.length === 1 ? 'Video' : 'Videos'}}\" background-image={{celebrity.headerImage}} share-tooltip-text=\"Share this page.\" banner-type=Star><favorite-button><clix-tertiary-button ng-click=onFavoritePress()>{{isFavorite ? 'Added to Favorites' : 'Favorite'}}</clix-tertiary-button></favorite-button><share-icon><clix-share-button extra-class=banner-share-icon celebrity=celebrity></clix-share-button></share-icon></clix-hero-banner><div class=brand-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Video select=\"onTabSelect('video')\"><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>{{celebrity.name}}: {{selectedSeries.label}}</clix-secondary-header></div><div class=video-sort-container><clix-dropdown options=seriesList placeholder-text=\"Select Series\"></clix-dropdown></div></div><div class=row ng-repeat=\"series in celebrity.series.series\" ng-show=\"series.title === selectedSeries.label\"><div class=col-sm-8><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-12 col-sm-12 col-md-6 col-lg-4\" ng-repeat=\"video in series.seasons.seasons[0].episodes | orderBy: 'episodeNumber'\"><clix-video-content-callout video=video></clix-video-content-callout></div></div></div><div class=col-sm-4><div class=sidebar-container><div class=sidebar-title>Brands in this Series</div><div class=\"row brand-row\"><div ng-repeat=\"brand in series.brands.brands\" class=\"brand-container col-xs-6\"><clix-brand-content-callout brand=brand></clix-brand-content-callout></div></div></div><div class=sidebar-container><div class=sidebar-title>Charities in this Series</div><div class=\"row brand-row\"><div class=\"brand-container col-xs-6\"><clix-charity-content-callout charity=series.charity></clix-charity-content-callout></div></div></div></div></div></div></uib-tab><uib-tab index=1 heading=\"Brands & Offers\" select=\"onTabSelect('brands_offers')\"><div class=brands-offers-title><div class=\"visible-sm visible-xs\"><clix-secondary-header>Brands Related To<br>{{celebrity.name}}</clix-secondary-header></div><div class=\"hidden-sm hidden-xs\"><clix-secondary-header>Brands Related To {{celebrity.name}}</clix-secondary-header></div></div><div class=\"row brand-row\"><div ng-repeat=\"brand in celebrity.brands.brands\" class=\"brand-container col-xs-6 col-sm-4 col-md-3 col-lg-2\"><clix-brand-content-callout brand=brand></clix-brand-content-callout></div></div><div class=brands-offers-title ng-show=celebrity.offers><div class=\"visible-sm visible-xs\"><clix-secondary-header>Offers Related To<br>{{celebrity.name}}</clix-secondary-header></div><div class=\"hidden-sm hidden-xs\"><clix-secondary-header>Offers Related To {{celebrity.name}}</clix-secondary-header></div></div><div class=\"row brand-row\"><div ng-repeat=\"offer in celebrity.offers.offers\" class=\"brand-container col-xs-6 col-sm-4 col-md-3 col-lg-2\"><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></uib-tab><uib-tab index=2 heading=Charity select=\"onTabSelect('charity')\"><div class=brands-offers-title><div class=\"visible-sm visible-xs\"><clix-secondary-header>Charities Related To<br>{{celebrity.name}}</clix-secondary-header></div><div class=\"hidden-sm hidden-xs\"><clix-secondary-header>Charities Related To {{celebrity.name}}</clix-secondary-header></div></div><div class=\"row brand-row\"><div ng-repeat=\"charity in celebrity.charities.charities\" class=\"brand-container col-xs-6 col-sm-4 col-md-3 col-lg-2\"><clix-charity-content-callout charity=charity></clix-charity-content-callout></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/stars/view.stars.html',
    "<div ng-if=!stars><clix-loader size=large></clix-loader></div><div class=clix-stars-page><clix-filter-page ng-if=stars><page-title>Stars</page-title><page-content><clix-content-callout-list items=stars.celebrities><clix-star-content-callout star=item></clix-star-content-callout></clix-content-callout-list></page-content></clix-filter-page></div>"
  );


  $templateCache.put('ui/tooltip-menu/view.tooltip-menu.html',
    "<div class=tooltip-menu><menu class=menu-container ng-show=menuopen><menuitem ng-repeat=\"item in items track by $index\"><a ng-click=onItemPress(item) class=menu-item ng-mouseover=onMouseover(item) ng-mouseleave=onMouseleave(item) ng-class=\"{'with-points': item.points}\"><i class=\"menu-icon {{item.icon}}\"></i> <span class=menu-label>{{item.label}}</span><clix-points-violator ng-if=item.points>{{item.points}}</clix-points-violator></a></menuitem></menu></div>"
  );


  $templateCache.put('ui/video-content-box/view.video-content-box.html',
    "<div class=\"video-content-box {{extraClass}}\" ng-show=ready><div class=header-container><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-inner-content><a ui-sref=\"star({ id: video.celebrity.id })\"><div class=artist-avatar style=\"background-image: url({{video.celebrity.thumbnail}})\"></div></a><div class=artist-name><a ui-sref=\"star({ id: video.celebrity.id })\">{{video.celebrity.name}}</a></div><div clix-tooltip-trigger tooltip-id=actions-button-{{$id}}><a class=menu-icon-container ng-click=menuClicked() clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></a></div><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip></div></div><div class=video-thumbnail ng-click=\"onPlayPress($event, video)\"><img ng-src={{video.thumbnail}} class=video-thumbnail-image clix-on-image-load=onImageLoad($event)><div class=violator-container clix-tooltip-trigger tooltip-id=signup-watch-points-{{$id}}><clix-violator>100 Reward Points</clix-violator></div><div class=video-thumbnail-action-container><div class=video-thumbnail-inner-container><div class=video-brand-icon-list><div class=video-brand-icon ng-repeat=\"brand in video.brands.brands | limitTo: 5 track by $index\" style=\"background-image: url({{brand.transparentThumbnail}})\"></div><div class=video-brand-icon style=\"background-image: url({{video.charity.transparentThumbnail}})\"></div></div></div><div class=action-buttons-container><div class=\"plus-icon save-button\" ng-class=\"{'icon-redeem-plus-icon': !isOnWatchlist, 'icon-remove-icon remove-icon': isOnWatchlist}\" clix-tooltip-trigger tooltip-id=watchlist-button-{{$id}} ng-click=onWatchlistPress()></div><clix-tooltip tooltip-id=watchlist-button-{{$id}}>{{isOnWatchlist ? 'Remove from your watchlist' : 'Add to your Watchlist'}}</clix-tooltip><div class=play-button><div class=play-button-hit-area><img src=/assets/theme/clixtv/dist/images/gradient-clix-icon.svg></div></div></div></div></div><div class=footer-container><a ui-sref=\"video({ id: video.id })\"><span class=series-title>Episode {{video.episodeNumber}}: {{video.title || '&nbsp;'}}</span><br><span class=episode-title>{{video.seriesTitle || '&nbsp;'}}</span></a></div></div><clix-tooltip tooltip-id=signup-watch-points-{{$id}}><div ng-show=!loggedInUser>After you sign up, you will receive 100 Reward Points for watching this video! <a ng-click=\"\">Learn More</a>.</div><div ng-show=loggedInUser>You will receive 100 Reward Points for watching this video!</div></clix-tooltip>"
  );


  $templateCache.put('ui/video-permalink/view.video-permalink.html',
    "<div ng-if=!ready><clix-loader size=large></clix-loader></div><div class=video-permalink-page ng-if=ready><div class=row><div class=\"col-md-7 col-lg-8 video-player-column-container\"><div class=video-player><div id=videoPlayer></div><clix-video-player ng-if=\"video && !isMobile\" video=video auto-play=true video-id=videoPlayer on-ready=onPlayerReady></clix-video-player><clix-video-player ng-if=\"video && isMobile\" video=video auto-play=false video-id=videoPlayer on-ready=onPlayerReady></clix-video-player></div><div class=\"visible-sm visible-xs\"><div class=brands-charity-container><div class=brands-container><div class=brands-charity-title><div class=brands-title>Brands in this Series</div><div class=charity-title ng-if=video.charity>Charity</div></div><div class=logo-list-container><a ng-repeat=\"brand in video.brands.brands | limitTo: 4\" ui-sref=\"brand({ id: '{{brand.id}}' })\" class=brand-logo-link><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></a><div class=brand-logo-link ng-if=video.charity><clix-charity-logo charity=video.charity></clix-charity-logo></div></div></div></div></div><div class=\"star-meta-info row\"><div class=\"col-sm-6 star-name-container\"><div class=star-avatar style=\"background-image: url({{video.celebrity.thumbnail}})\"></div><div class=star-name-favorite-container><div class=star-name>{{video.celebrity.name}}</div></div><div class=favorite-button clix-tooltip-trigger tooltip-id=favorite-button-{{$id}}><clix-favorite-button ng-click=onFavoriteCelebrityPress() is-favorite=isFavoriteCelebrity></clix-favorite-button></div><clix-tooltip tooltip-id=favorite-button-{{$id}}>{{isFavoriteCelebrity ? 'Remove this Star from your Favorites.' : 'Add this Star to your Favorites.'}}</clix-tooltip></div><div class=\"col-sm-6 social-container\"><div class=violator-container clix-tooltip-trigger tooltip-id=reward-points-button-{{$id}}><clix-violator size=large>100 Reward Points</clix-violator></div><clix-tooltip tooltip-id=reward-points-button-{{$id}}><clix-is-logged-in><logged-in>You will receive 100 Reward Points for watching this video!</logged-in><not-logged-in>After you sign up, you will receive 100 Reward Points for watching this video! <a ng-click=\"\">Learn more</a>.</not-logged-in></clix-is-logged-in></clix-tooltip><div class=social-icon-container><a href=# class=\"social-icon icon-heart-icon\" clix-tooltip-trigger tooltip-id=heart-button-{{$id}}></a><clix-tooltip tooltip-id=heart-button-{{$id}}>Like this video!</clix-tooltip><div class=social-icon-label>256K</div></div><div class=social-icon-container clix-tooltip-trigger tooltip-id=watchlist-button-{{$id}}><clix-save-button ng-click=onWatchlistPress() is-saved=isOnWatchlist></clix-save-button></div><clix-tooltip tooltip-id=watchlist-button-{{$id}}>{{isOnWatchlist ? 'Remove this video from your Watchlist.' : 'Add this video to your Watchlist.'}}</clix-tooltip><div class=social-icon-container><div clix-tooltip-trigger tooltip-id=share-button-{{$id}}><clix-share-button extra-class=\"social-icon share-icon\" video=video></clix-share-button></div><clix-tooltip tooltip-id=share-button-{{$id}}><clix-is-logged-in><logged-in>You will receive 50 Reward Points for sharing!</logged-in><not-logged-in>After signing up, you will receive 50 Reward Points for sharing! <a ng-click=\"\">Learn more</a>.</not-logged-in></clix-is-logged-in></clix-tooltip><clix-points-violator>50</clix-points-violator></div></div></div></div><div class=\"col-md-5 col-lg-4 star-info-column-container\"><div class=about-video-container id=about-video-container><div class=about-video-inner-container id=about-video-inner-container><div class=\"about-video-overlay hidden-xs hidden-sm\" ng-if=!expanded></div><div class=video-info-container><div class=episode-number>Episode {{video.episodeNumber}}:</div><div class=episode-title>{{video.title}}</div><div class=series-title>{{video.series.title}}</div><div class=\"row total-views-available-container\"><div class=\"col-sm-6 total-views\">48,096,110 views</div><div class=\"col-sm-6 available-until\" ng-if=video.expirationDate>Available Until {{video.expirationDate | clixDate: 'long'}}</div></div><div class=description>{{video.description}}</div><div class=meta-data><div class=meta-data-row ng-if=video.categories><span class=meta-data-label>Category: </span><span ng-repeat=\"category in video.categories.categories\"><a ui-sref=\"category({ id: '{{category.id}}' })\">{{category.title}}</a><span ng-if=!$last>,&nbsp;</span></span></div><div class=meta-data-row ng-if=video.celebrity><span class=meta-data-label>Stars: </span><a ui-sref=\"star({ id: '{{video.celebrity.id}}' })\">{{video.celebrity.name}}</a></div><div class=meta-data-row ng-if=video.brands><span class=meta-data-label>Brands: </span><span ng-repeat=\"brand in video.brands.brands\"><a ui-sref=\"brand({ id: '{{brand.id}}' })\">{{brand.title}}</a><span ng-if=!$last>,&nbsp;</span></span></div><div class=meta-data-row ng-if=video.charity><span class=meta-data-label>Charity: </span><a ui-sref=\"charity({ id: video.charity.id })\">{{video.charity.title}}</a></div></div></div></div><div id=toggle-button-container><div class=\"visibility-toggle-button hidden-xs hidden-sm\" id=toggle-button ng-show=!forceFullHeight><clix-secondary-button ng-click=onExpandToggle()>{{expanded ? 'Show Less' : 'Show More'}}</clix-secondary-button></div><div class=\"brands-charity-container hidden-sm hidden-xs\"><div class=brands-container><div class=brands-charity-title><div class=brands-title>Brands in this Series</div><div class=charity-title ng-if=video.charity>Charity</div></div><div class=logo-list-container><a ng-repeat=\"brand in video.brands.brands | limitTo: 4\" ui-sref=\"brand({ id: '{{brand.id}}' })\" class=brand-logo-link><clix-brand-charity-logo brand=brand hover-enabled=true></clix-brand-charity-logo></a><div class=brand-logo-link ng-if=video.charity><clix-charity-logo charity=video.charity></clix-charity-logo></div></div></div></div></div></div><div class=\"related-videos-container hidden-sm hidden-xs\"><div class=related-videos-header>Related Videos</div><div class=\"row related-videos-list\"><div class=\"col-lg-6 related-video\" ng-repeat=\"relatedVideo in relatedVideos track by $index\"><clix-video-content-callout video=relatedVideo></clix-video-content-callout></div></div></div></div></div><div class=\"related-videos-container visible-sm visible-xs\"><div class=related-videos-header>Related Videos</div><div class=\"row related-videos-list\"><div class=\"col-xs-6 related-video\" ng-repeat=\"relatedVideo in relatedVideos track by $index\"><clix-video-content-callout video=relatedVideo></clix-video-content-callout></div></div></div></div>"
  );


  $templateCache.put('ui/violator/view.header-points-violator.html',
    "<div class=clix-header-points-violator ng-click=onRewardPointsPress() clix-tooltip-trigger tooltip-id=rewards-points-tooltip-{{$id}}><clix-callout-button>{{points ? points : 0}}</clix-callout-button>Reward Points</div><clix-tooltip tooltip-id=rewards-points-tooltip-{{$id}}>ClixTV rewards users for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badge, points can be earned.<br><br><a clix-learn-more-modal-trigger>Learn More</a>.</clix-tooltip>"
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
        '$rootScope',
        '$state',
        '$stateParams',
        'userService',
        function($q, $scope, $rootScope, $state, $stateParams, userService) {

            var loggedInUserChecked = false;

            $scope.activeItem = $stateParams.section;

            $scope.onNavigationItemSelect = function(item) {
                $scope.activeItem = item;
            };

            function _setLoggedInUser(user) {
                if (!user && loggedInUserChecked) {
                    $state.go('home');
                    return;
                }
                loggedInUserChecked = true;
                $scope.loggedInUser = user;
                if (user) {
                    $scope.ready = true;
                }
            }

            $rootScope.$on('user.login', function(event, data) {
                _setLoggedInUser(data);
            });

            $rootScope.$on('user.logout', function(event, data) {
                $state.go('home');
            });

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        _setLoggedInUser(data);
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountController', AccountController);
}());
(function() {

    var AccountFavoritesController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'userService',
        function($q, $scope, $rootScope, $stateParams, userService) {

            $scope.ready = false;

            $scope.filterStarsOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Athletes'
                },
                {
                    label: 'Influencers'
                },
                {
                    label: 'Movie Stars'
                },
                {
                    label: 'Musicians'
                },
                {
                    label: 'TV Stars'
                }
            ];
            $scope.filterBrandsOptions = [
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
                },
                {
                    label: 'Grocery, HouseHold & Pets'
                },
                {
                    label: 'Health & Beauty'
                },
                {
                    label: 'Jewelry & Watches'
                },
                {
                    label: 'Men\'s Fashion'
                },
                {
                    label: 'Sports & Outdoors'
                },
                {
                    label: 'Women\'s Fashion'
                }
            ];
            $scope.filterCharitiesOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Animals'
                },
                {
                    label: 'Arts & Culture'
                },
                {
                    label: 'Education'
                },
                {
                    label: 'Environmental'
                },
                {
                    label: 'International non-gov'
                },
                {
                    label: 'Health'
                }
            ];
            $scope.filterCategoriesOptions = [
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




            $scope.sortStarsOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Most Viewed'
                }
            ];
            $scope.sortBrandsOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Most Viewed'
                }
            ];
            $scope.sortCharitiesOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];
            $scope.sortCategoriesOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            switch($stateParams.tab) {
                default:
                case 'star':
                    $scope.active = 0;
                    break;
                case 'brand':
                    $scope.active = 1;
                    break;
                case 'charity':
                    $scope.active = 2;
                    break;
                case 'category':
                    $scope.active = 3;
                    break;
            }

            $q.all(
                    [
                        userService.getFavoriteCelebrities(),
                        userService.getFavoriteBrands(),
                        userService.getFavoriteCharities(),
                        userService.getFavoriteCategories()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.ready = true;
                        $scope.celebrities = data[0];
                        $scope.brands = data[1];
                        $scope.charities = data[2];
                        $scope.categories = data[3];
                    }
                );

            function _onCelebrityRemoved(id) {
                if (!$scope.celebrities || !$scope.celebrities.celebrities) {
                    $scope.celebrities = {
                        celebrities: []
                    }
                }
                $scope.celebrities.celebrities = $scope.celebrities.celebrities.filter(function(item) {
                    return item.id !== id;
                });
            }

            function _onBrandRemoved(id) {
                if (!$scope.brands || !$scope.brands.brands) {
                    $scope.brands = {
                        brands: []
                    }
                }
                $scope.brands.brands = $scope.brands.brands.filter(function(item) {
                    return item.id !== id;
                });
            }

            function _onCharityRemoved(id) {
                if (!$scope.charities || !$scope.charities.charities) {
                    $scope.charities = {
                        charities: []
                    }
                }
                $scope.charities.charities = $scope.charities.charities.filter(function(item) {
                    return item.id !== id;
                });
            }

            function _onCategoryRemoved(id) {
                if (!$scope.categories || !$scope.categories.categories) {
                    $scope.categories = {
                        categories: []
                    }
                }
                $scope.categories.categories = $scope.categories.categories.filter(function(item) {
                    return item.id !== id;
                });
            }

            $rootScope.$on('favorite.removed', function(event, data) {
                switch(data.type) {
                    case 'celebrity':
                        _onCelebrityRemoved(data.id);
                        break;
                    case 'brand':
                        _onBrandRemoved(data.id);
                        break;
                    case 'charity':
                        _onCharityRemoved(data.id);
                        break;
                    case 'category':
                        _onCategoryRemoved(data.id);
                        break;
                }
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountFavoritesController', AccountFavoritesController);
}());
(function() {
    var favorites = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/favorites/view.favorites.html',
            controller: 'AccountFavoritesController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountFavorites', favorites);
}());
(function() {

    var AccountNotificationsController = [
        '$scope',
        '$rootScope',
        'userService',
        'notificationsService',
        function($scope, $rootScope, userService, notificationsService) {

            notificationsService.getNotifications()
                .then(
                    function onSuccess(data) {
                        $scope.notifications = data;
                    }
                )
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountNotificationsController', AccountNotificationsController);
}());
(function() {
    var notifications = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/notifications/view.notifications.html',
            controller: 'AccountNotificationsController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountNotifications', notifications);
}());
(function() {

    var AccountOverviewInputController = [
        '$scope',
        '$rootScope',
        '$timeout',
        function($scope, $rootScope, $timeout) {

            var oldValue;

            function _getRangeDropdownOptions(from, to) {
                var options = [];
                for(var i = from, length = to; i <= length; i++) {
                    options.push({
                        label: i
                    });
                }
                return options;
            }

            function _disableAllErrorStates() {
                [
                    'showEmailError',
                    'showEmailConfirmationError',
                    'showOldPasswordError',
                    'showNewPasswordError',
                    'showNewPasswordConfirmError',
                    'showPhoneError'
                ].forEach(function(key) {
                    $scope[key] = false;
                });
                $scope.formHasErrors = false;
            }

            function _isEmailValid() {
                _disableAllErrorStates();

                // Invalid email...
                if ($scope.ngModel === undefined || $scope.ngModel === null) {
                    $scope.emailErrorMessage = 'Invalid email address';
                    $timeout(function() {
                        $scope.showEmailError = true;
                    });
                    return false;
                }

                // Empty email...
                if ($scope.ngModel.length === 0) {
                    $scope.emailErrorMessage = 'Email is required';
                    $timeout(function() {
                        $scope.showEmailError = true;
                    });
                    return false;
                }

                // Matching email confirmation...
                if ($scope.ngModel !== $scope.emailConfirm) {
                    $scope.emailConfirmationErrorMessage = 'Email does not match';
                    $timeout(function() {
                        $scope.showEmailConfirmationError = true;
                    });
                    return false;
                }

                return true;
            }

            function _isPasswordValid() {
                _disableAllErrorStates();

                // Invalid old password...
                if ($scope.ngModel === undefined || $scope.ngModel === '') {
                    $scope.oldPasswordErrorMessage = 'Password is required';
                    $timeout(function() {
                        $scope.showOldPasswordError = true;
                    });
                    return false;
                }

                // Invalid new password...
                if ($scope.newPassword === undefined || $scope.newPassword === '') {
                    $scope.newPasswordErrorMessage = 'Password is required';
                    $timeout(function() {
                        $scope.showNewPasswordError = true;
                    });
                    return false;
                }

                // Matching password confirmation...
                if ($scope.newPassword !== $scope.newPasswordConfirm) {
                    $scope.newPasswordConfirmErrorMessage = 'Password does not match';
                    $timeout(function() {
                        $scope.showNewPasswordConfirmError = true;
                    });
                    return false;
                }

                return true;
            }

            function _isPhoneNumberValid() {
                var phoneNumber;
                _disableAllErrorStates();
                if (!$scope.ngModel) {
                    return true;
                }

                phoneNumber = $scope.ngModel.replace(/[^0-9]/g, '');

                if (phoneNumber.length !== 10) {
                    $scope.phoneErrorMessage = 'Not a valid phone number';
                    $timeout(function() {
                        $scope.showPhoneError = true;
                    });
                    return false;
                }

                return true;
            }

            $scope.editing = false;
            $scope.days = _getRangeDropdownOptions(1, 31);
            $scope.months = _getRangeDropdownOptions(1, 12);
            $scope.years = _getRangeDropdownOptions(1900, 2000);

            $scope.genders = [
                {
                    label: 'Male',
                    value: 'male'
                },
                {
                    label: 'Female',
                    value: 'female'
                },
                {
                    label: 'Other',
                    value: 'other'
                }
            ];

            $scope.onFieldEdit = function() {
                oldValue = $scope.ngModel;
                $rootScope.$broadcast('account.edit');
                $scope.editing = true;

                if ($scope.type === 'email') {
                    $scope.ngModel = '';
                    $scope.emailConfirm = '';
                }

                if ($scope.type === 'password') {
                    $scope.ngModel = '';
                    $scope.newPassword = '';
                    $scope.newPasswordConfirm = '';
                }
            };

            $scope.onCancelPress = function() {
                $scope.editing = false;
                $scope.ngModel = oldValue;
                _disableAllErrorStates();
            };

            $scope.onSavePress = function() {
                var isValid = true;

                $scope.formHasErrors = false;

                if ($scope.type === 'email') {
                    isValid = _isEmailValid();
                }

                if ($scope.type === 'password') {
                    isValid = _isPasswordValid();
                }

                if ($scope.type === 'phone') {
                    isValid = _isPhoneNumberValid();
                }

                if ($scope.type === 'birthdate' && $scope.birthdate) {
                    $scope.ngModel = $scope.birthdate;
                }

                if ($scope.type === 'gender' && $scope.gender) {
                    $scope.ngModel = $scope.gender.value;
                }

                if (isValid) {
                    $timeout(function() {
                        $scope.editing = false;
                        $scope.onSave();
                    });
                } else {
                    $scope.formHasErrors = true;
                }
            };

            $rootScope.$on('account.edit', function() {
                if ($scope.editing) {
                    $scope.onCancelPress();
                }
            });

            $scope.$watch('ngModel', function() {
                if ($scope.type === 'birthdate' && ($scope.ngModel instanceof Date)) {
                    $scope.birthdateLabel = moment($scope.ngModel).format('M/D/YY')
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountOverviewInputController', AccountOverviewInputController);
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
                        $scope.loggedInUser = data;
                        $scope.form = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: /*data.email*/ 'justin.podzimek@gmail.com',
                            password: '*********',
                            gender: (data.gender) ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : undefined,
                            phone: data.phone,
                            birthdate: (data.birthdate) ? new Date(parseFloat(data.birthdate) * 1000) : undefined
                        };
                    }
                );

            $scope.onSaveField = function() {
                userService.updateUser({
                    firstName: $scope.form.firstName,
                    lastName: $scope.form.lastName,
                    birthdate: ($scope.form.birthdate instanceof Date) ? ($scope.form.birthdate.getTime() / 1000) : null,
                    gender: ($scope.form.gender) ? $scope.form.gender.toLowerCase() : null,
                    phone: ($scope.form.phone) ? $scope.form.phone.replace(/[^0-9]/g, '') : null
                });
            }
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

    var overviewInput = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/account/overview/view.overview-input.html',
            controller: 'AccountOverviewInputController',
            transclude: {
                inputLabel: 'inputLabel'
            },
            scope: {
                ngModel: '=',
                onSave: '=',
                type: '@'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixAccountOverview', overview)
        .directive('clixAccountOverviewInput', overviewInput)
}());
(function() {

    var AccountRewardsController = [
        '$q',
        '$scope',
        '$rootScope',
        '$uibModal',
        function($q, $scope, $rootScope, $uibModal) {

            $scope.active = 0;
            $scope.ready = true;

            $scope.onRedeemRewardsPress = function(type) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/rewards/view.redeem-rewards.html',
                    controller: 'RedeemRewardsController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-lg',
                    resolve: {
                        type: function() {
                            return type;
                        }
                    }
                });

                modalInstance.opened.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.open');
                    }
                );

                modalInstance.closed.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.close');
                    }
                );

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            };

            $scope.onRedeemPress = function() {
                $scope.active = 2;
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountRewardsController', AccountRewardsController);
}());
(function() {
    var rewards = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/rewards/view.rewards.html',
            controller: 'AccountRewardsController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountRewards', rewards);
}());
(function() {

    var AccountSavedOffersController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {

            $scope.menuItems = [
                {
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
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
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.filterSavedOffersOptions = [
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
                },
                {
                    label: 'Grocery, HouseHold & Pets'
                },
                {
                    label: 'Health & Beauty'
                },
                {
                    label: 'Jewelry & Watches'
                },
                {
                    label: 'Men\'s Fashion'
                },
                {
                    label: 'Sports & Outdoors'
                },
                {
                    label: 'Women\'s Fashion'
                }
            ];
            $scope.sortSavedOffersOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            userService.getSavedOffers()
                .then(
                    function onSuccess(data) {
                        $scope.offers = data;
                        $scope.ready = true;
                    }
                )

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountSavedOffersController', AccountSavedOffersController);
}());
(function() {
    var savedOffers = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/saved-offers/view.saved-offers.html',
            controller: 'AccountSavedOffersController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountSavedOffers', savedOffers);
}());
(function() {

    var AccountSettingsController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {

            $scope.ready = false;
            userService.getAccountSettings()
                .then(
                    function onSuccess(data) {
                        $scope.settings = data;
                        $scope.generalSettings = data.settings.filter(function(setting) {
                            return setting.type === 'general';
                        });
                        $scope.accountSettings = data.settings.filter(function(setting) {
                            return setting.type === 'myClix';
                        });
                        $scope.ready = true;
                    }
                );

            $scope.settingChange = function(setting) {
                if (setting.enabled) {
                    userService.enableAccountSetting(setting.id);
                } else {
                    userService.disableAccountSetting(setting.id);
                }
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountSettingsController', AccountSettingsController);
}());
(function() {
    var settings = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/settings/view.settings.html',
            controller: 'AccountSettingsController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountSettings', settings);
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
                },
                {
                    label: 'Grocery, HouseHold & Pets'
                },
                {
                    label: 'Health & Beauty'
                },
                {
                    label: 'Jewelry & Watches'
                },
                {
                    label: 'Men\'s Fashion'
                },
                {
                    label: 'Sports & Outdoors'
                },
                {
                    label: 'Women\'s Fashion'
                }
            ];

            $scope.sortOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            userService.getWatchlist()
                .then(
                    function onSuccess(data) {
                        $scope.watchlist = data;
                        $scope.ready = true;
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
        '$log',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'brandsService',
        'userService',
        'modalService',
        'catchMediaService',
        function($q, $log, $scope, $rootScope, $state, $stateParams, brandsService, userService, modalService, catchMediaService) {

            if ($stateParams.offerId) {
                modalService.showModal({
                    controller: 'OfferModalController',
                    templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
                    data: {
                        offerId: $stateParams.offerId
                    }
                });
            }

            $scope.onOfferPress = function(offer) {
                modalService.showModal({
                    controller: 'OfferModalController',
                    templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
                    data: {
                        offerId: $stateParams.offerId
                    }
                });
            }

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteBrand($stateParams.id);
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
                _resetIsFavorite();
            });

            $rootScope.$on('favorite.added', _resetIsFavorite);
            $rootScope.$on('favorite.removed', _resetIsFavorite);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteBrand($stateParams.id);
                } else {
                    userService.addFavoriteBrand($stateParams.id);
                }
            };

            $scope.seriesList = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            $scope.offerMenuItems = [
                {
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.onTabSelect = function(tab) {
                catchMediaService.trackBrandPageEvent($stateParams.id, tab);
            };

            brandsService.getBrandById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        $scope.brand = data;
                        $scope.active = 0;

                        $scope.video = {
                            streamUrl: data.trailer,
                            thumbnail: data.trailerThumbnail
                        };
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.headerImage,
                            backgroundImage2x: data.headerImage,
                            backgroundImage3x: data.headerImage,
                            logo: data.logo
                        };
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );

            catchMediaService.trackBrandPageEvent($stateParams.id);
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
                },
                {
                    label: 'Grocery, HouseHold & Pets'
                },
                {
                    label: 'Health & Beauty'
                },
                {
                    label: 'Jewelry & Watches'
                },
                {
                    label: 'Men\'s Fashion'
                },
                {
                    label: 'Sports & Outdoors'
                },
                {
                    label: 'Women\'s Fashion'
                }
            ];

            $scope.offerMenuItems = [
                {
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.brandMenuItems = [
                {
                    label: 'Share',
                    points: '50',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.filterBrandsOptions = defaultFilterOptions;
            $scope.filterOffersOptions = defaultFilterOptions;

            $scope.sortBrandsOptions = [
                {
                    label: 'A-Z'
                },
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            $scope.sortOffersOptions = [
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            // Don't wire these 2 calls together in a $q.all(...) because we don't want to have to wait for
            // the order response to come back if the brands are all ready since it's a tabbed interface.
            brandsService.getAllBrands()
                .then(
                    function onSuccess(data) {
                        $scope.ready = true;
                        $scope.active = 0;
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
                type: '@?',
                circle: '@?'
            }
        }
    };

    var secondaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.secondary-button.html',
            scope: {
                alternate: '@?'
            }
        }
    };

    var tertiaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.tertiary-button.html',
            scope: {
                isActive: '=?'
            }
        }
    };

    var calloutButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'ui/buttons/view.callout-button.html',
            scope: {
                colorType: '@?'
            }
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
                }
            ];

            $scope.menuItems = [
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Stars',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
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
        '$log',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'categoryService',
        'userService',
        'modalService',
        'catchMediaService',
        function($q, $log, $scope, $rootScope, $state, $stateParams, categoryService, userService, modalService, catchMediaService) {

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteCategory($stateParams.id);
            }

            $scope.notify = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
                _resetIsFavorite();
            });

            $rootScope.$on('favorite.added', _resetIsFavorite);
            $rootScope.$on('favorite.removed', _resetIsFavorite);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteCategory($stateParams.id);
                } else {
                    userService.addFavoriteCategory($stateParams.id);
                }
            };

            $scope.filterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Athletes'
                },
                {
                    label: 'Influencers'
                },
                {
                    label: 'Movie Stars'
                },
                {
                    label: 'Musicians'
                },
                {
                    label: 'TV Stars'
                }
            ];

            $scope.sortOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

            $scope.onLoginPress = function() {
                modalService.showLogInModal();
            };

            $q.all(
                    [
                        categoryService.getCategoryById($stateParams.id),
                        categoryService.getAllCategories()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.category = data[0];
                        $scope.categories = data[1];
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );
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

                var splitWidth = 1;

                if ($window.innerWidth > 480) {
                    splitWidth = 2.7;
                }

                if ($window.innerWidth > 992) {
                    splitWidth = 3.7;
                }

                if ($window.innerWidth > 1200) {
                    splitWidth = 4.7;
                }


                $scope.videoContainerWidth = ($window.innerWidth - VIDEO_MARGIN_LEFT) / splitWidth;
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
                category: '=?',
                categoryTitle: '@?',
                categoryVideos: '=?'
            },
            link: function(scope, element) {
                scope.scrollListElement = angular.element(element).find('.video-inner-list-container');

                if (!scope.category) {
                    scope.category = {
                        headerLink: false,
                        title: scope.categoryTitle,
                        videos: {
                            videos: scope.categoryVideos
                        }
                    }
                }
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
                    label: 'Animals'
                },
                {
                    label: 'Arts & Culture'
                },
                {
                    label: 'Education'
                },
                {
                    label: 'Environmental'
                },
                {
                    label: 'International non-gov'
                },
                {
                    label: 'Health'
                }
            ];

            var defaultSortOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            $scope.filterCharitiesOptions = defaultFilterOptions;
            $scope.sortCharitiesOptions = defaultSortOptions;

            $scope.menuItems = [
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

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
        '$log',
        '$scope',
        '$rootScope',
        '$uibModal',
        '$state',
        '$stateParams',
        'brandsService',
        'userService',
        'catchMediaService',
        function($q, $log, $scope, $rootScope, $uibModal, $state, $stateParams, brandsService, userService, catchMediaService) {

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteCharity($stateParams.id);
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
                _resetIsFavorite();
            });

            $rootScope.$on('favorite.added', _resetIsFavorite);
            $rootScope.$on('favorite.removed', _resetIsFavorite);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteCharity($stateParams.id);
                } else {
                    userService.addFavoriteCharity($stateParams.id);
                }
            };

            $scope.seriesList = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            brandsService.getCharityById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        if (!data || !data.id) {
                            throw new Error('Invalid data returned');
                        }

                        $scope.charity = data;
                        $scope.active = 0;

                        $scope.video = {
                            streamUrl: data.trailer,
                            thumbnail: data.trailerThumbnail
                        };
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );

            catchMediaService.trackCharityPageEvent($stateParams.id);

            $scope.onTabSelect = function(tab) {
                catchMediaService.trackCharityPageEvent($stateParams.id, tab);
            };

            $scope.onDonatePress = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/donate/view.donate.html',
                    controller: 'DonateController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-lg'
                });

                modalInstance.opened.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.open');
                    }
                );

                modalInstance.closed.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.close');
                    }
                );

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            }

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
            },
            link: function(scope, element, attrs, ctrl, transclude) {
                scope.accessoryViewFilled = transclude.isSlotFilled('accessoryView');
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
                    label: 'Share',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
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
                    icon: 'icon-redeem-plus-icon',
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
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
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
                    label: 'Add to Favorites',
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
                brand: '=',
                hoverEnabled: '@?'
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

    var ShareButtonController = [
        '$q',
        '$scope',
        '$rootScope',
        '$uibModal',
        'shareModalService',
        function($q, $scope, $rootScope, $uibModal, shareModalService) {

            $scope.onShareIconPress = function() {

                if ($scope.video) {
                    shareModalService.launchVideoShareModal($scope.video);
                } else if ($scope.offer) {
                    shareModalService.launchOfferShareModal($scope.offer);
                } else if ($scope.celebrity) {
                    shareModalService.launchCelebrityShareModal($scope.celebrity);
                } else if ($scope.brand) {
                    shareModalService.launchBrandShareModal($scope.brand);
                } else if ($scope.charity) {
                    shareModalService.launchCharityShareModal($scope.charity);
                } else if ($scope.category) {
                    shareModalService.launchCategoryShareModal($scope.category);
                }

            };

        }
    ];

    angular
        .module('clixtv')
        .controller('ShareButtonController', ShareButtonController);
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
            templateUrl: 'ui/common/buttons/view.save-button.html',
            scope: {
                isSaved: '='
            }
        }
    };

    var favoriteButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/buttons/view.favorite-button.html',
            scope: {
                isFavorite: '='
            }
        }
    };

    var shareButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            controller: 'ShareButtonController',
            templateUrl: 'ui/common/buttons/view.share-button.html',
            scope: {
                extraClass: '@?',
                offer: '=?',
                video: '=?',
                celebrity: '=?',
                brand: '=?',
                charity: '=?',
                category: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixViewButton', viewButton)
        .directive('clixSaveButton', saveButton)
        .directive('clixFavoriteButton', favoriteButton)
        .directive('clixShareButton', shareButton);
}());
(function() {

    var checkbox = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/checkbox/view.checkbox.html',
            scope: {
                labelText: '@',
                ngModel: '=',
                onCheckboxChange: '&'
            },
            controller: [
                '$scope',
                '$timeout',
                function($scope, $timeout) {
                    $scope.onToggle = function() {

                        $scope.ngModel = !$scope.ngModel;
                        $timeout(function() {
                            if ($scope.onCheckboxChange) {
                                $scope.onCheckboxChange();
                            }
                        });
                    };
                }
            ]
        }
    };

    angular.module('clixtv')
        .directive('clixCheckbox', checkbox);
}());
(function() {

    var ContentCalloutController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$uibModal',
        'shareModalService',
        'userService',
        'catchMediaService',
        function($q, $log, $scope, $rootScope, $uibModal, shareModalService, userService, catchMediaService) {

            $scope.menuVisible = false;

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

            $scope.onSharePress = function(type, item) {
                shareModalService.launchShareModal(type, item);
            };

            $scope.onFavoritePress = function(type, item) {
                var serviceMethod,
                    isFavorited = $scope.isFavoriteContent(type, item);

                switch(type) {
                    case 'brand':
                        serviceMethod = (isFavorited) ? 'removeFavoriteBrand' : 'addFavoriteBrand';
                        break;
                    case 'category':
                        serviceMethod = (isFavorited) ? 'removeFavoriteCategory' : 'addFavoriteCategory';
                        break;
                    case 'celebrity':
                        serviceMethod = (isFavorited) ? 'removeFavoriteCelebrity' : 'addFavoriteCelebrity';
                        break;
                    case 'charity':
                        serviceMethod = (isFavorited) ? 'removeFavoriteCharity' : 'addFavoriteCharity';
                        break;
                    case 'offer':
                        serviceMethod = (isFavorited) ? 'removeSavedOffer' : 'addSavedOffer';
                        break;
                }
                if (!serviceMethod) {
                    return;
                }
                userService[serviceMethod](item.id);
            };

            $scope.isFavoriteContent = function(type, item) {
                switch(type) {
                    case 'brand':
                        return userService.isFavoriteBrand(item.id);
                    case 'category':
                        return userService.isFavoriteCategory(item.id);
                    case 'celebrity':
                        return userService.isFavoriteCelebrity(item.id);
                    case 'charity':
                        return userService.isFavoriteCharity(item.id);
                    case 'offer':
                        return userService.isSavedOffer(item.id);
                }
                return false;
            };

            $rootScope.$on('favorite.added', function(event, data) {
                $scope.loggedInUser = data.user;
            });

            $rootScope.$on('favorite.removed', function(event, data) {
                $scope.loggedInUser = data.user;
            });

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('ContentCalloutController', ContentCalloutController);
}());
(function() {

    var VideoContentCalloutController = [
        '$q',
        '$scope',
        '$rootScope',
        '$state',
        'userService',
        'shareModalService',
        function($q, $scope, $rootScope, $state, userService, shareModalService) {

            $scope.menuVisible = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetMenuItems();
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
                _resetMenuItems();
            });

            $rootScope.$on('tooltip.open', function() {
                $scope.tooltipOpen = true;
            });

            $rootScope.$on('tooltip.closed', function() {
                $scope.tooltipOpen = false;
                $scope.overlayActive = false;
            });

            $rootScope.$on('favorite.added', _resetMenuItems);
            $rootScope.$on('favorite.removed', _resetMenuItems);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetMenuItems();
                    }
                );

            function _resetMenuItems() {

                $scope.isOnWatchlist = userService.isVideoOnWatchlist($scope.video.id);

                var isFavoriteStar = ($scope.video.celebrity) ? userService.isFavoriteCelebrity($scope.video.celebrity.id) : false;

                $scope.items = [
                    {
                        label: $scope.isOnWatchlist ? 'Remove from watchlist' : 'Add to watchlist',
                        icon: $scope.isOnWatchlist ? 'icon-remove-icon' : 'icon-redeem-plus-icon',
                        onClick: function() {
                            if ($scope.isOnWatchlist) {
                                userService.removeVideoFromWatchlist($scope.video.id);
                            } else {
                                userService.addVideoToWatchlist($scope.video.id);
                            }
                            $scope.menuVisible = false;
                        }
                    },
                    {
                        label: 'Share',
                        icon: 'icon-share-icon',
                        points: '50',
                        onClick: function() {
                            shareModalService.launchVideoShareModal($scope.video);
                            $scope.menuVisible = false;
                        }
                    },
                    {
                        label: 'Go to Star Page',
                        icon: 'icon-stars-icon',
                        onClick: function() {
                            $state.go('star', { id: $scope.video.celebrity.id })
                        }
                    },
                    {
                        label: isFavoriteStar ? 'Remove Star from Favorites' : 'Add Star to Favorites',
                        icon: isFavoriteStar ? 'icon-remove-icon' : 'icon-favorite-icon',
                        onClick: function() {
                            if (isFavoriteStar) {
                                userService.removeFavoriteCelebrity($scope.video.celebrity.id);
                            } else {
                                userService.addFavoriteCelebrity($scope.video.celebrity.id);
                            }
                            $scope.menuVisible = false;
                        }
                    }
                ];
            }

            $scope.menuClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };

            $scope.onWatchlistPress = function() {
                if ($scope.isOnWatchlist) {
                    userService.removeVideoFromWatchlist($scope.video.id);
                } else {
                    userService.addVideoToWatchlist($scope.video.id);
                }
            };

            $scope.onMouseover = function() {
                if (!$scope.overlayActive) {
                    $scope.overlayActive = true;
                }
            };

            $scope.onMouseleave = function() {
                if (!$scope.tooltipOpen) {
                    $scope.overlayActive = false;
                }
            };

            $scope.onClick = function($event) {
                if (!angular.element($event.target).hasClass('video-watchlist-button')) {
                    $state.go('video', { id: $scope.video.id });
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoContentCalloutController', VideoContentCalloutController);
}());
(function() {

    var blurrableContainer = [
        '$rootScope',
        function($rootScope) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.blurrable-container.html',
                transclude: true,
                replace: true,
                link: function(scope) {

                    scope.blurred = false;

                    function _triggerBlurOn() {
                        scope.blurred = true;
                    }

                    function _triggerBlurOff() {
                        scope.blurred = false;
                    }

                    $rootScope.$on('rightnav.open', _triggerBlurOn);
                    $rootScope.$on('rightnav.close', _triggerBlurOff);

                    $rootScope.$on('modal.open', _triggerBlurOn);
                    $rootScope.$on('modal.close', _triggerBlurOff);

                    $rootScope.$on('mobilesearch.open', _triggerBlurOn);
                    $rootScope.$on('mobilesearch.close', _triggerBlurOff);
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixBlurrableContainer', blurrableContainer);
}());
(function() {

    var calloutCalloutList = function() {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            templateUrl: 'ui/common/container/view.content-callout-list.html',
            scope: {
                items: '=',
                largeColClass: '@?'
            }
        }
    };

    var calloutCallout = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/container/view.content-callout.html',
            controller: 'ContentCalloutController',
            transclude: {
                headerElement: 'headerElement',
                titleContent: 'titleContent',
                subtitleContent: 'subtitleContent'
            },
            scope: {
                sref: '@',
                menuItems: '=',
                addButton: '@?',
                onFavorite: '&',
                isFavorited: '=',
                addFavoriteTooltip: '@?',
                removeFavoriteTooltip: '@?',
                type: '@',
                entity: '='
            }
        }
    };

    var starContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.star-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    star: '='
                },
                link: function(scope) {

                    function _resetMenuItems() {
                        var isFavorite = userService.isFavoriteCelebrity(scope.star.id);
                        scope.menuItems = [
                            {
                                label: 'Share',
                                icon: 'icon-share-icon',
                                points: '50',
                                onClick: function() {
                                    scope.onSharePress('celebrity', scope.star);
                                }
                            },
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('celebrity', scope.star);
                                }
                            },
                            {
                                label: 'Go to Star Page',
                                icon: 'icon-stars-icon',
                                onClick: function() {
                                    $state.go('star', { id: scope.star.id });
                                }
                            },
                            {
                                label: 'Go to Offers',
                                icon: 'icon-offers-icon',
                                onClick: function() {
                                    $state.go('star', { id: scope.star.id, tab: 'brands' });
                                }
                            },
                            {
                                label: 'Go to Charities',
                                icon: 'icon-charities-icon-bottom-nav',
                                onClick: function() {
                                    $state.go('star', { id: scope.star.id, tab: 'charities' });
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();

                }
            }
        }
    ];

    var brandContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.brand-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    brand: '='
                },
                link: function(scope) {

                    function _resetMenuItems() {
                        var isFavorite = userService.isFavoriteBrand(scope.brand.id);
                        scope.menuItems = [
                            {
                                label: 'Share',
                                icon: 'icon-share-icon',
                                points: '50',
                                onClick: function() {
                                    scope.onSharePress('brand', scope.brand);
                                }
                            },
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('brand', scope.brand);
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();
                }
            }
        }
    ];

    var charityContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.charity-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    charity: '='
                },
                link: function(scope) {

                    function _resetMenuItems() {
                        var isFavorite = userService.isFavoriteCharity(scope.charity.id);
                        scope.menuItems = [
                            {
                                label: 'Share',
                                icon: 'icon-share-icon',
                                points: '50',
                                onClick: function() {
                                    scope.onSharePress('charity', scope.charity);
                                }
                            },
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('charity', scope.charity);
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();
                }
            }
        }
    ];

    var offerContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.offer-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    offer: '='
                },
                link: function(scope) {
                    function _resetMenuItems() {

                        var isFavorite = userService.isSavedOffer(scope.offer.id);
                        scope.menuItems = [
                            {
                                label: isFavorite ? 'Remove from saved offers' : 'Save Offer',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-redeem-plus-icon',
                                onClick: function() {
                                    scope.onFavoritePress('offer', scope.offer);
                                }
                            },
                            {
                                label: 'Share',
                                icon: 'icon-share-icon',
                                points: '50',
                                onClick: function() {
                                    scope.onSharePress('offer', scope.offer);
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();
                }
            }
        }
    ];

    var categoryContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.category-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    category: '='
                },
                link: function(scope) {
                    function _resetMenuItems() {
                        var isFavorite = userService.isFavoriteCategory(scope.category.id);
                        scope.menuItems = [
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('category', scope.category);
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixContentCalloutList', calloutCalloutList)
        .directive('clixContentCallout', calloutCallout)
        .directive('clixStarContentCallout', starContentCallout)
        .directive('clixBrandContentCallout', brandContentCallout)
        .directive('clixCharityContentCallout', charityContentCallout)
        .directive('clixOfferContentCallout', offerContentCallout)
        .directive('clixCategoryContentCallout', categoryContentCallout);
}());
(function() {

    var emptyContainer = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/container/view.empty-container.html',
            transclude: {
                headerText: 'headerText',
                bodyText: '?bodyText',
                callToActionButton: '?callToActionButton'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixEmptyContainer', emptyContainer);
}());
(function() {

    var videoContentCallout = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/container/view.video-content-callout.html',
            controller: 'VideoContentCalloutController',
            scope: {
                video: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoContentCallout', videoContentCallout);
}());
(function() {
    var copyright = function() {
        return {
            restrict: 'AE',
            template: '<span>&copy; {{year}} ClixTV, Inc</span>',
            link: function(scope) {
                scope.year = new Date().getFullYear();
            }
        }
    };

    angular.module('clixtv')
        .directive('clixCopyright', copyright);
}());
(function() {

    var DatepickerDropdowns = [
        '$scope',
        function($scope) {

            function _getMonthOptions() {
                return moment.monthsShort().map(function(month, i) {
                    return {
                        label: month,
                        value: (i + 1),
                        onClick: function() {
                            $scope.selectedMonth = (i + 1);
                            $scope.days = _getDayOptions();
                            _updateModelDate();
                        }
                    }
                });
            }

            function _getDayOptions() {
                var numberOfDays,
                    options = [];
                if (!$scope.selectedMonth) {
                    $scope.selectedMonth = 1;
                }

                // Set the current selected day back to undefined since changing the
                // month will update the possible number of days to choose from
                $scope.selectedDay = undefined;

                // Force set the year to a leap year to give Feb the max possible
                // amount of days to choose from
                numberOfDays = moment('2016-' + $scope.selectedMonth, 'YYYY-M').daysInMonth();
                for (var i = 1, length = numberOfDays; i <= length; i++) {
                    (function(day) {
                        options.push({
                            label: i,
                            value: i,
                            onClick: function () {
                                $scope.selectedDay = day;
                                _updateModelDate();
                            }
                        })
                    }(i));
                }
                return options;
            }

            function _getYearOptions() {
                var options = [],
                    currentYear = new Date().getFullYear(),
                    minimumYear = currentYear - 100;
                for (var i = minimumYear, length = currentYear; i <= length; i++) {
                    (function(year) {
                        options.push({
                            label: i,
                            value: i,
                            onClick: function() {
                                $scope.selectedYear = year;
                                _updateModelDate();
                            }
                        })
                    }(i));
                }
                return options.reverse();
            }

            function _updateModelDate() {
                var month = $scope.selectedMonth,
                    day = $scope.selectedDay,
                    year = $scope.selectedYear;

                if (!month || !day || !year) {
                    $scope.ngModel = undefined;
                    return;
                }

                $scope.ngModel = moment(month + '-' + day + '-' + year, 'M-D-YYYY').toDate();
            }

            $scope.months = _getMonthOptions();
            $scope.days = _getDayOptions();
            $scope.years = _getYearOptions();

        }
    ];

    angular
        .module('clixtv')
        .controller('DatepickerDropdowns', DatepickerDropdowns);
}());
(function() {

    var datepickerDropdowns = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/datepicker/view.datepicker-dropdowns.html',
                controller: 'DatepickerDropdowns',
                scope: {
                    ngModel: '='
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixDatepickerDropdowns', datepickerDropdowns);
}());
(function() {

    var FormInputController = [
        '$scope',
        function($scope) {

            function _getErrorContainer() {
                return angular.element(document.getElementById('clix-form-input-error-' + $scope.$id));
            }

            function _getTriggerCoordinates() {
                var trigger = angular.element(document.getElementById('clix-form-input-' + $scope.$id)),
                    triggerRect = trigger[0].getBoundingClientRect(),
                    bodyRect = document.body.getBoundingClientRect();
                return {
                    top: triggerRect.top - bodyRect.top,
                    left: triggerRect.left,
                    height: trigger[0].offsetHeight,
                    width: trigger[0].offsetWidth
                };
            }

            function _repositionError() {
                var errorContainer = _getErrorContainer(),
                    coordinates = _getTriggerCoordinates(),
                    triggerVerticalMiddle = (coordinates.top + (coordinates.height / 2)),
                    errorContainerHeight = errorContainer[0].offsetHeight,
                    errorContainerWidth = errorContainer[0].offsetWidth;

                errorContainer[0].style.top = ((triggerVerticalMiddle) - (errorContainerHeight / 2)) + 'px';
                errorContainer[0].style.left = ((coordinates.left + coordinates.width) - errorContainerWidth - 7) + 'px';
            }

            function _hideError() {
                var errorContainer = _getErrorContainer();
                if (errorContainer && errorContainer[0]) {
                    errorContainer[0].style.left = '-9999px';
                }
            }

            $scope.$watch('showError', function() {
                if ($scope.showError) {
                    _repositionError();
                } else {
                    _hideError();
                }
            });

            $scope.init = function() {
                _repositionError();
                _hideError();
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('FormInputController', FormInputController);
}());
(function() {

    var clixFormInputErrorField = [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'AE',
                transclude: {
                    formField: 'formField',
                    errorMessage: 'errorMessage'
                },
                templateUrl: 'ui/common/form/view.form-input.html',
                controller: 'FormInputController',
                scope: {
                    showError: '='
                },
                link: function(scope, element) {

                    // Move the error message to the end of the <body /> so as to
                    // not disrupt the page flow
                    $timeout(function() {
                        var errorMessageContainer = angular.element(document.getElementById('clix-form-input-error-' + scope.$id));
                        angular.element(document.body).append(errorMessageContainer);
                        scope.init();
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixFormInputErrorField', clixFormInputErrorField);
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
        '$transclude',
        '$window',
        'parallaxHelper',
        function($q, $scope, $transclude, $window, parallaxHelper) {

            var backgroundImage;

            function _handleResize() {
                if (!backgroundImage) {
                    backgroundImage = document.getElementById('hero-background-image');
                }
                if (backgroundImage) {
                    backgroundImage.style.left = ($window.innerWidth / 2) - (backgroundImage.offsetWidth / 2) + 'px';
                }
            }

            angular.element($window).on('resize.doResize', function () {
                _handleResize();
            });

            $scope.background = parallaxHelper.createAnimator(-0.3);

            $scope.logoProvided = $transclude.isSlotFilled('logo');

            $scope.onImageLoad = function() {
                _handleResize();
            };

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
                logo: '?heroBannerLogo',
                shareIcon: '?shareIcon',
                favoriteButton: '?favoriteButton'
            },
            scope: {
                titleText: '@',
                buttonText: '@',
                points: '@?',
                subtext: '@?',
                buttonIconClass: '@?',
                backgroundImage: '@',
                backgroundImage2x: '@?',
                backgroundImage3x: '@?',
                charity: '@?',
                shareable: '@?',
                buttonTooltipText: '@?',
                shareTooltipText: '@?',
                bannerType: '@'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixHeroBanner', heroBanner);
}());
(function() {
    var trophyIndicatorIcon = [
        function() {
            return {
                restrict: 'AE',
                template: '<div class="clix-trophy-indicator-icon clix-circle-container-icon"><div class="icon-rewards-icon-left-nav"></div></div>'
            }
        }
    ];

    var errorIndicatorIcon = [
        function() {
            return {
                restrict: 'AE',
                template: '<div class="clix-error-indicator-icon clix-circle-container-icon"><div class="icon-remove-icon"></div></div>'
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixTrophyIndicatorIcon', trophyIndicatorIcon)
        .directive('clixErrorIndicatorIcon', errorIndicatorIcon);
}());
(function() {
    var loader = [
        function() {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'ui/common/loader/view.loader.html',
                scope: {
                    size: '@?'
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixLoader', loader);
}());
(function() {

    var ConfirmationModalController = [
        '$scope',
        '$rootScope',
        'data',
        '$uibModalInstance',
        'modalService',
        function($scope, $rootScope, data, $uibModalInstance, modalService) {
            $scope.key = data.key;
            $scope.title = data.title;
            $scope.message = data.message;

            $scope.onCloseButtonPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close();
                }
            };

            $scope.onConfirmButtonPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close();
                }
                $rootScope.$broadcast('modal.confirm', {
                    key: data.key
                })
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('ConfirmationModalController', ConfirmationModalController);
}());
(function() {

    var ModalController = [
        '$q',
        '$log',
        '$scope',
        'modalService',
        function($q, $log, $scope, modalService) {
            if (modalService.getNumberOfModalsInStack() >= 2) {
                $scope.showBackButton = true;
            }

            $scope.onBackButtonPress = function() {
                modalService.pop();
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('ModalController', ModalController);
}());
(function() {
    var modal = [
        function() {
            return {
                restrict: 'AE',
                transclude: true,
                controller: 'ModalController',
                templateUrl: 'ui/common/modal/view.modal.html',
                scope: {
                    modalTitle: '@?',
                    extraModalClass: '@?'
                }
            }
        }
    ];

    var messageModal = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/modal/view.message-modal.html',
                transclude: {
                    modalTitle: 'modalTitle',
                    modalBody: 'modalBody',
                    modalConfirmButton: '?modalConfirmButton',
                    modalCancelButton: '?modalCancelButton'
                }
            }
        }
    ];

    var learnMoreModalTrigger = [
        'educationModalService',
        function(educationModalService) {
            return {
                restrict: 'AE',
                link: function(scope, element) {
                    element.bind('click', function(e) {
                        e.preventDefault();
                        educationModalService.showLearnMoreModal();
                    })
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixModal', modal)
        .directive('clixMessageModal', messageModal)
        .directive('clixLearnMoreModalTrigger', learnMoreModalTrigger);
}());
(function() {

    var DonateController = [
        '$scope',
        '$timeout',
        '$filter',
        '$uibModalInstance',
        function($scope, $timeout, $filter, $uibModalInstance) {

            $scope.buyPointsModel = 0;

            $scope.onBuyPointsPress = function() {
                $scope.state = 'buy';
            };

            $scope.onCancelPress = function() {
                $uibModalInstance.close();
            };

            $scope.onDonatePress = function() {
                // todo - API call...
                $uibModalInstance.close();
            };

            $scope.onBackPress = function() {
                $scope.state = 'donate';
            };

            $scope.onBuyPointsContainerPress = function() {
                var element = document.getElementById('buyPointsInput');
                element.focus();
                element.select();
            };

            $scope.onBuyPointsChange = function() {

            };

            $scope.onBuyPointsBlur = function(value) {
                $timeout(function() {
                    var input = value || '';
                    input = input.replace(/[0-9]/g, '');
                    $scope.buyPointsModel = $filter('number')(input);
                });
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('DonateController', DonateController);
}());
(function() {

    var EducationModalController = [
        '$q',
        '$scope',
        '$rootScope',
        '$timeout',
        '$uibModalInstance',
        'data',
        'userService',
        'videosService',
        'brandsService',
        'celebrityService',
        'categoryService',
        'offersService',
        'modalService',
        'preferencesService',
        function($q, $scope, $rootScope, $timeout, $uibModalInstance, data, userService, videosService, brandsService, celebrityService, categoryService, offersService, modalService, preferencesService) {

            $scope.showAgainModel = false;

            var itemData = data;

            function _getModalTitle() {
                var title,
                    isLoggedIn = ($scope.loggedInUser !== undefined && $scope.loggedInUser);

                switch(itemData.type) {

                    case 'watchlist':
                        title = (isLoggedIn) ? 'Success!' : 'Saving to Watchlist';
                        break;

                    case 'brand':
                    case 'celebrity':
                    case 'category':
                    case 'charity':
                        title = (isLoggedIn) ? 'Success!' : 'Saving to Favorites';
                        break;

                    case 'offer-view':
                    case 'offer':
                        title = (isLoggedIn) ? 'Reward Points Earned' : 'Reward Points Missed!';
                        break;

                    case 'learn-more':
                        title = (isLoggedIn) ? 'Earn Rewards!' : 'Earn Reward Points!';
                        break;
                }

                return title;
            }

            function _getItem() {
                var id = itemData.id;
                if (!itemData.id) {
                    return $q.when();
                }
                switch(itemData.type) {

                    case 'watchlist':
                        return videosService.getVideoById(id);

                    case 'brand':
                        return brandsService.getBrandById(id);

                    case 'celebrity':
                        return celebrityService.getCelebrityById(id);

                    case 'category':
                        return categoryService.getCategoryById(id);

                    case 'charity':
                        return brandsService.getCharityById(id);

                    case 'offer-view':
                    case 'offer':
                        return offersService.getOfferById(id);
                }

                throw new Error('Error looking up item for type ' + itemData.type);
            }

            $scope.loggedInUser = itemData.loggedInUser;
            $scope.title = _getModalTitle();
            $scope.type = itemData.type;

            $scope.onCloseButtonPress = function(navigation) {
                if (modalService.getNumberOfModalsInStack() >= 2 && !navigation) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close({
                        navigation: navigation
                    });
                    modalService.close();
                }
            };

            $scope.onSignUpPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.showSignUpModal();
                } else {
                    $uibModalInstance.close();
                    $timeout(function() {
                        modalService.showSignUpModal();
                    }, 100);
                }
            };

            $scope.onLoginPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.showLogInModal();
                } else {
                    $uibModalInstance.close();
                    $timeout(function() {
                        modalService.showLogInModal();
                    }, 100);
                }
            };

            $scope.onShowAgainChange = function(model) {
                preferencesService.setShowEducationModalPreference(itemData.type, model);
            };

            $q.all(
                    [
                        _getItem()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.item = data[0];
                        $scope.ready = true;
                    }
                );
        }
    ];

    angular
        .module('clixtv')
        .controller('EducationModalController', EducationModalController);
}());
(function() {

    var LoginSignupController = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'userService',
        'data',
        function($scope, $rootScope, $uibModalInstance, userService, data) {

            $scope.signup = data.signup;

            $scope.loginModel = {
                email: '',
                password: ''
            };

            $scope.signupModel = {
                email: '',
                emailConfirm: '',
                password: '',
                passwordConfirm: '',
                firstName: '',
                lastName: '',
                birthdate: '',
                gender: ''
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

            $scope.onSignupSubmit = function() {

                if (
                    !$scope.signupModel.email ||
                    !$scope.signupModel.password ||
                    !$scope.signupModel.firstName ||
                    !$scope.signupModel.lastName/* ||
                    !$scope.signupModel.birthdate ||
                    !$scope.signupModel.gender*/
                ) {
                    // todo - Error state for validation...
                    return;
                }

                if ($scope.signupModel.email !== $scope.signupModel.emailConfirm) {
                    // todo - Error state for validation...
                    return;
                }

                if ($scope.signupModel.password !== $scope.signupModel.passwordConfirm) {
                    // todo - Error state for validation...
                    return;
                }

                userService.signupUser($scope.signupModel.email, $scope.signupModel.password, $scope.signupModel.firstName, $scope.signupModel.lastName)
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

            $scope.onCloseIconPress = function() {
                $uibModalInstance.close();
            };

            $scope.onFacebookLoginPress = function() {
                window.open('/hauth/login/Facebook', 'fb', 'left=20,top=20,width=600,height=500,toolbar=1,resizable=0');
            };

            $scope.onGoogleLoginPress = function() {
                window.open('/hauth/login/Google', 'google', 'left=20,top=20,width=600,height=500,toolbar=1,resizable=0');
            };

            /**
             * @fixme - This is legacy "login with social network" code that'll take a much larger effort to refactor
             */
            // gross...
            window.finished_login = function() {
                userService.setLoggedInUser()
                    .then(
                        function onSuccess(data) {
                            $uibModalInstance.close();
                        }
                    );
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('LoginSignupController', LoginSignupController);
}());
(function() {

    var OfferModalController = [
        '$q',
        '$scope',
        '$rootScope',
        'modalService',
        'educationModalService',
        'offersService',
        'userService',
        'data',
        function($q, $scope, $rootScope, modalService, educationModalService, offersService, userService, data) {

            function _setIsSaved() {
                $scope.isSavedOffer = userService.isSavedOffer(data.offerId);
            }

            $rootScope.$on('user.login', _setIsSaved);


            offersService.getOfferById(data.offerId)
                .then(
                    function onSuccess(data) {
                        $scope.offer = data;
                        console.log(data);
                    }
                );

            $scope.onClosePress = function() {
                modalService.close();
            };

            $scope.onSaveOfferPress = function() {
                if ($scope.isSavedOffer) {
                    userService.removeSavedOffer($scope.offer.id)
                        .then(
                            function onSuccess() {
                                $scope.isSavedOffer = false;
                            }
                        );
                } else {
                    userService.addSavedOffer($scope.offer.id);
                    $scope.isSavedOffer = true;
                }
            };

            _setIsSaved();
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferModalController', OfferModalController);
}());
(function() {

    var RedeemRewardsController = [
        '$scope',
        '$uibModalInstance',
        'type',
        function($scope, $uibModalInstance, type) {

            switch (type) {
                case 'visa':
                    $scope.image = '/assets/theme/clixtv/dist/images/visa.png';
                    $scope.imageHighRes = '/assets/theme/clixtv/dist/images/visa@2x.png';
                    $scope.title = 'Visa® Prepaid Card USD';
                    $scope.disclaimer = 'Visa® Prepaid Card USD works just like cash. Your ClixTV reward points have a cash value. Just transfer the balance to a Visa® Prepaid Card USD! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
                case 'paypal':
                    $scope.image = '/assets/theme/clixtv/dist/images/paypal.png';
                    $scope.imageHighRes = '/assets/theme/clixtv/dist/images/paypal@2x.png';
                    $scope.title = 'PayPal';
                    $scope.disclaimer = 'PayPal works just like cash. Your ClixTV reward points have a cash value. Just transfer the balance to your PayPal Account! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
                case 'amazon':
                    $scope.image = '/assets/theme/clixtv/dist/images/amazon.png';
                    $scope.imageHighRes = '/assets/theme/clixtv/dist/images/amazon@2x.png';
                    $scope.title = 'Amazon.com Gift Card';
                    $scope.disclaimer = 'Your ClixTV reward points have a cash value. Just transfer the balance to a Amazon.com Gift Card! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
            }

            $scope.onRedeemPress = function() {

                // todo - API call...
                $uibModalInstance.close();
            };

            $scope.onCancelPress = function() {
                $uibModalInstance.close();
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('RedeemRewardsController', RedeemRewardsController);
}());
(function() {

    var ShareSettingsController = [
        '$scope',
        'modalService',
        function($scope, modalService) {

        }
    ];

    angular
        .module('clixtv')
        .controller('ShareSettingsController', ShareSettingsController);
}());
(function() {

    var ShareController = [
        '$scope',
        '$location',
        '$uibModalInstance',
        '$state',
        'data',
        'modalService',
        'catchMediaService',
        function($scope, $location, $uibModalInstance, $state, data, modalService, catchMediaService) {

            $scope.tab = 'post';
            $scope.socialNetworks = [];

            $scope.video = data.shareModalVideo;
            $scope.offer = data.shareModalOffer;
            $scope.celebrity = data.shareModalCelebrity;
            $scope.brand = data.shareModalBrand;
            $scope.charity = data.shareModalCharity;
            $scope.category = data.shareModalCategory;

            var type, entity,
                currentUrl = $location.absUrl(),
                shareContent = '';

            if (data.shareModalVideo) {
                shareContent = 'Here\'s a video I thought you\'d enjoy from #ClixTV - ';
                shareContent += data.shareModalVideo.title + ' ' + $state.href('video', { id: data.shareModalVideo.id }, {absolute: true});
                type = 'video';
                entity = data.shareModalVideo;
            }

            if (data.shareModalOffer) {
                shareContent = 'Here\'s an offer I thought you\'d enjoy from #ClixTV - ';
                shareContent += data.shareModalOffer.title + ' ' + $state.href('brand-offer', { id: data.shareModalOffer.campaign.id, offerId: data.shareModalOffer.id }, {absolute: true});
                type = 'offer';
                entity = data.shareModalOffer;
            }

            if (data.shareModalCelebrity) {
                shareContent = 'I thought you\'d like to check out ' + data.shareModalCelebrity.name + ' on #ClixTV - ';
                shareContent += $state.href('star', { id: data.shareModalCelebrity.id }, {absolute: true});
                type = 'star';
                entity = data.shareModalCelebrity;
            }

            if (data.shareModalBrand) {
                shareContent = 'I thought you\'d enjoy visiting ' + data.shareModalBrand.title + ' on #ClixTV - ';
                shareContent += $state.href('brand', { id: data.shareModalBrand.id }, {absolute: true});
                type = 'brand';
                entity = data.shareModalBrand;
            }

            if (data.shareModalCharity) {
                shareContent = 'I thought you\'d enjoy visiting the charity page for ' + data.shareModalCharity.title + ' on #ClixTV - ';
                shareContent += $state.href('charity', { id: data.shareModalCharity.id }, {absolute: true});
                type = 'charity';
                entity = data.shareModalCharity;
            }

            $scope.shareContent = shareContent;

            $scope.onTabPress = function(tab) {
                $scope.tab = tab;
            };

            $scope.onCancelPress = function() {
                if ($scope.showBackButton) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close();
                }
            };

            $scope.onSendPress = function() {
                $uibModalInstance.close();
                catchMediaService.trackShareEvent(type, entity);
            };

            $scope.onPostPress = function() {
                $uibModalInstance.close();
                catchMediaService.trackShareEvent(type, entity);
            };

            $scope.onSocialNetworkPress = function(socialNetwork) {
                var index = $scope.socialNetworks.indexOf(socialNetwork);
                if (index !== -1) {
                    $scope.socialNetworks.splice(index, 1);
                } else {
                    $scope.socialNetworks.push(socialNetwork);
                }
            };

            $scope.onSettingsPress = function() {
                modalService.showModal({
                    templateUrl: 'ui/common/modal/share/view.share-settings.html',
                    controller: 'ShareSettingsController'
                })
            };

            $scope.showBackButton = modalService.getNumberOfModalsInStack() >= 2;
        }
    ];

    angular
        .module('clixtv')
        .controller('ShareController', ShareController);
}());
(function() {

    var shareModalVideoContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-video-content.html',
            scope: {
                video: '='
            }
        }
    };

    var shareModalCelebrityContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-celebrity-content.html',
            scope: {
                celebrity: '='
            }
        }
    };

    var shareModalOfferContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-offer-content.html',
            scope: {
                offer: '='
            }
        }
    };

    var shareModalBrandContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-brand-content.html',
            scope: {
                brand: '='
            }
        }
    };

    var shareModalCharityContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-charity-content.html',
            scope: {
                charity: '='
            }
        }
    };

    var genericModalCelebrityContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.generic-share-content.html',
            transclude: {
                shareTitle: 'shareTitle',
                shareDescription: '?shareDescription',
                shareIconContainer: 'shareIconContainer',
                shareFooterTitle: 'shareFooterTitle'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixShareModalVideoContent', shareModalVideoContent)
        .directive('clixShareModalCelebrityContent', shareModalCelebrityContent)
        .directive('clixShareModalOfferContent', shareModalOfferContent)
        .directive('clixShareModalBrandContent', shareModalBrandContent)
        .directive('clixShareModalCharityContent', shareModalCharityContent)
        .directive('clixGenericShareContent', genericModalCelebrityContent)
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

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $scope.changeSection = function(section) {
                $state.go('account', { section: section });
            };

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                if (toState) {
                    $scope.selectedStateName = toState.name;
                    $scope.searchVisible = false;
                    $rootScope.$broadcast('mobilesearch.close');
                }
            });

            $scope.go = function(path) {
                $state.go(path);
            };

            $scope.onSearchPress = function() {
                $scope.searchVisible = !$scope.searchVisible;
                $rootScope.$broadcast(($scope.searchVisible) ? 'mobilesearch.open' : 'mobilesearch.close');
            };

            $scope.onMobileBackgroundPress = function() {
                $scope.searchVisible = false;
                $rootScope.$broadcast('mobilesearch.close');
            };

            // $scope.bodyClicked = function(event) {
            //     if (angular.element(event.target).hasClass('mobile-search-container')) {
            //         return;
            //     }
            //     $scope.searchVisible = !$scope.searchVisible;
            //     $rootScope.$broadcast('mobilesearch.close');
            // };
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
                $rootScope.$broadcast('rightnav.close');
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
    var mobileNavigation = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/navigation/view.mobile-navigation.html',
            controller: 'NavigationBarController',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixMobileNavigation', mobileNavigation);
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

    var NotificationsController = [
        '$scope',
        '$rootScope',
        '$timeout',
        '$state',
        'userService',
        function($scope, $rootScope, $timeout, $state, userService) {

            $scope.items = [
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
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
                }
            ];

            $scope.onNotificationMenuPress = function(notification) {
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
        .controller('NotificationsController', NotificationsController);
}());
(function() {

    var HIDE_NOTIFICATION_BAR_DELAY = 3000;

    var SiteNotificationBarController = [
        '$scope',
        '$rootScope',
        '$timeout',
        function($scope, $rootScope, $timeout) {

            var displayTimeout,
                modalIsOpen = false,
                waitUntilModalCloses = false;

            function _showNotificationBar() {

                $scope.active = true;
                displayTimeout = $timeout(_hideNotificationBar, HIDE_NOTIFICATION_BAR_DELAY);
            }

            function _hideNotificationBar() {
                $scope.active = false;
            }

            function _onFavoriteUpdateNotification(isFavorite, data) {
                $scope.type = data.type;
                $scope.favorite = isFavorite;
                $scope.data = data;
                $scope.receivedPoints = false;

                switch (data.type) {
                    case 'celebrity':
                        $scope.type = 'favorite';
                        $scope.tab = 'star';
                        break;
                    case 'brand':
                        $scope.type = 'favorite';
                        $scope.tab = 'brand';
                        break;
                    case 'category':
                        $scope.type = 'favorite';
                        $scope.tab = 'category';
                        break;
                    case 'charity':
                        $scope.type = 'favorite';
                        $scope.tab = 'charity';
                        break;
                    case 'watchlist':
                        $scope.type = 'watchlist';
                        break;
                    case 'offer':
                        $scope.type = 'offer';
                        if (isFavorite) {
                            $scope.receivedPoints = true;
                        }
                        break;
                }


                $timeout(function() {
                    if (modalIsOpen) {
                        waitUntilModalCloses = true;
                        return;
                    }
                    waitUntilModalCloses = false;
                    _showNotificationBar();
                }, 250);
            }

            $scope.onMouseover = function() {
                if (displayTimeout) {
                    $timeout.cancel(displayTimeout);
                }
            };

            $scope.onMouseleave = function() {
                displayTimeout = $timeout(_hideNotificationBar, HIDE_NOTIFICATION_BAR_DELAY);
            };

            $rootScope.$on('favorite.added', function(event, data) {
                _onFavoriteUpdateNotification(true, data);
            });

            $rootScope.$on('favorite.removed', function(event, data) {
                _onFavoriteUpdateNotification(false, data);
            });

            $rootScope.$on('modal.open', function() {
                modalIsOpen = true;
            });

            $rootScope.$on('modal.close', function(event, data) {
                modalIsOpen = false;
                if (waitUntilModalCloses) {
                    waitUntilModalCloses = false;
                    _showNotificationBar();
                }
            });

            $rootScope.$on('$stateChangeSuccess', function() {
                modalIsOpen = false;
                waitUntilModalCloses = false;
                _hideNotificationBar();
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('SiteNotificationBarController', SiteNotificationBarController);
}());
(function() {
    var notifications = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.notifications.html',
            scope: {
                notifications: '=',
                minify: '@?'
            }
        }
    };

    var notificationItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.notification-item.html',
            controller: 'NotificationsController',
            scope: {
                notification: '=',
                minify: '@?'
            }
        }
    };

    var notificationTooltip = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.notification-tooltip.html',
            scope: {
                notifications: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixNotifications', notifications)
        .directive('clixNotificationItem', notificationItem)
        .directive('clixNotificationTooltip', notificationTooltip);
}());
(function() {
    var siteNotificationBar = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/notifications/view.site-notification-bar.html',
            controller: 'SiteNotificationBarController'
        }
    };

    angular.module('clixtv')
        .directive('clixSiteNotificationBar', siteNotificationBar);
}());
(function() {

    var PageFilterController = [
        '$q',
        '$scope',
        '$transclude',
        function($q, $scope, $transclude) {

            $scope.pageTitleProvided = $transclude.isSlotFilled('pageTitle');

        }
    ];

    angular
        .module('clixtv')
        .controller('PageFilterController', PageFilterController);
}());
(function() {

    var filterPage = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/page/view.filter-page.html',
            controller: 'PageFilterController',
            transclude: {
                pageTitle: '?pageTitle',
                pageSearchFilter: '?pageSearchFilter',
                pageContent: 'pageContent'
            },
            scope: {
                partial: '@?'
            },
            link: function(scope, element, attributes, ctrl, transclude) {
                scope.searchFilterProvided = transclude.isSlotFilled('pageSearchFilter');
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

    var LandingVideoContentController = [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {

            $rootScope.$on('video.play', function() {
                $scope.videoPlaying = true;
            });

            $rootScope.$on('video.pause', function() {
                $scope.videoPlaying = false;
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('LandingVideoContentController', LandingVideoContentController);
}());
(function() {

    var landingVideoContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/page/landing/view.landing-video-content.html',
            controller: 'LandingVideoContentController',
            transclude: {
                mainContent: '?mainContent',
                contentDescription: 'contentDescription',
                sidebarTitle: 'sidebarTitle',
                sidebarContent: 'sidebarContent',
                footerContent: 'footerContent',
                shareTooltipContent: '?shareTooltipContent',
                shareIcon: '?shareIcon'
            },
            scope: {
                video: '=?',
                charity: '@?',
                onPlayerReady: '=?'
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

    var printablePage = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/printable/view.printable-page.html',
                transclude: true
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixPrintablePage', printablePage);
}());
(function() {

    var RadioButtonGroupController = [
        '$scope',
        function($scope) {

            $scope.setSelected = function(index) {
                $scope.selected = index;
                $scope.ngModel = $scope.options[index];
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('RadioButtonGroupController', RadioButtonGroupController);
}());
(function() {

    var radioButtonGroup = [
        function() {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/radio-buttons/view.radio-button-group.html',
                controller: 'RadioButtonGroupController',
                scope: {
                    ngModel: '=',
                    options: '='
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixRadioButtonGroup', radioButtonGroup);
}());
(function() {

    var SiteSearchController = [
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        'searchService',
        'catchMediaService',
        function($scope, $rootScope, $window, $timeout, searchService, catchMediaService) {

            var searchTimeout;

            $scope.term = '';

            $scope.searchVisible = false;

            function _hideSearchResults() {
                $scope.loading = false;
                $scope.results = undefined;
            }

            function _performSearch() {
                $scope.loading = true;
                $scope.results = undefined;

                if (searchTimeout) {
                    $timeout.cancel(searchTimeout);
                }

                searchTimeout = $timeout(function() {
                    searchService.getSearchResults($scope.term, 0, 10)
                        .then(
                            function onSuccess(data) {
                                $scope.results = data;
                            }
                        )
                        .finally(
                            function onFinally() {
                                $scope.loading = false;
                            }
                        )
                }, 250);
            }

            $scope.onTermChange = function() {
                $scope.searchVisible = true;
                if ($scope.term.length < 2) {
                    return _hideSearchResults();
                }
                _performSearch();
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('search-input-field')) {
                    return;
                }
                $scope.term = '';
                $scope.searchVisible = false;
                _hideSearchResults();
                $timeout(function() {
                    $scope.$apply();
                });
            };

            $scope.onSearchIconPress = function() {
                $scope.searchVisible = !$scope.searchVisible;
                if ($scope.searchVisible) {
                    $window.document.getElementById('search-input-field').focus();
                }
            };

            $rootScope.$on('$stateChangeSuccess', function(){
                $scope.term = '';
                $scope.searchVisible = false;
                _hideSearchResults();
            });

            $scope.onResultPress = function(event, entity) {
                catchMediaService.trackSearchEvent(event, entity);
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('SiteSearchController', SiteSearchController);
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
                sortOptions: '=',
                showFilters: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSearchFilter', searchFilter);
}());
(function() {

    var siteSearch = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.site-search.html',
            controller: 'SiteSearchController',
            scope: {
                isVisible: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSiteSearch', siteSearch);
}());
(function() {

    var numberStepper = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/stepper/view.number-stepper.html',
            scope: {

            },
            link: function(scope) {

                var incrementValue = .10;

                scope.currentValue = 17.60;
                scope.priceDisplay = '';

                function _updatePriceDisplay() {
                    var value = scope.currentValue;
                    if (isNaN(value)) {
                        value = 0;
                    }
                    scope.priceDisplay = '$' + value.toFixed(2);
                }

                scope.onMinusPress = function() {
                    scope.currentValue -= incrementValue;
                    if (scope.currentValue < 0) {
                        scope.currentValue = 0;
                    }
                    _updatePriceDisplay();
                };

                scope.onPlusPress = function() {
                    scope.currentValue += incrementValue;
                    _updatePriceDisplay();
                };

                scope.onPriceChange = function() {
                    scope.currentValue = parseFloat(scope.priceDisplay.replace(/[^0-9.]/g, ''));
                };

                scope.onPriceBlur = function() {
                    _updatePriceDisplay();
                };

                _updatePriceDisplay();
            }
        }
    };

    angular.module('clixtv')
        .directive('clixNumberStepper', numberStepper);
}());
(function() {

    var clixSwitch = function() {
        return {
            restrict: 'AE',
            template: '<switch ng-model="ngModel" class="clix-switch"></switch>',
            scope: {
                ngModel: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSwitch', clixSwitch);
}());
(function() {

    var TooltipController = [
        '$q',
        '$scope',
        function($q, $scope) {

        }
    ];

    angular
        .module('clixtv')
        .controller('TooltipController', TooltipController);
}());
(function() {

    var SHOW_TOOLTIP_DELAY_MS = 500,
        HIDE_TOOLTIP_DELAY_MS = 200;

    var tooltip = function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'ui/common/tooltip/view.tooltip.html',
            scope: {
                tooltipId: '@'
            },
            link: function(scope, element) {
                angular.element(document.body).append(element);
            }
        }
    };

    var tooltipTrigger = [
        '$timeout',
        '$window',
        '$rootScope',
        function($timeout, $window, $rootScope) {
            return {
                restrict: 'A',
                controller: 'TooltipController',
                scope: {
                    tooltipId: '@'
                },
                link: function(scope, element) {

                    var showTimeout, hideTimeout;

                    function _getPosition(el) {
                        var xPos = 0;
                        var yPos = 0;

                        while (el) {
                            if (el.tagName == "BODY") {
                                // deal with browser quirks with body/window/document and page scroll
                                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                                var yScroll = el.scrollTop || document.documentElement.scrollTop;

                                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                                yPos += (el.offsetTop - yScroll + el.clientTop);
                            } else {
                                // for all other non-BODY elements
                                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
                            }

                            el = el.offsetParent;
                        }
                        return {
                            x: xPos,
                            y: yPos
                        };
                    }

                    var currentTooltipElement;

                    // Hide tooltip on window scroll
                    angular.element($window).on('scroll click', function() {

                        if (!currentTooltipElement) {
                            currentTooltipElement = document.getElementById(scope.tooltipId);
                        }

                        angular.element(currentTooltipElement).removeClass('active');

                        $rootScope.$broadcast('tooltip.closed');

                        currentTooltipElement.style.top = '-999px';
                        currentTooltipElement.style.left = '-999px';
                    });

                    /**
                     * @todo - Prevent tooltip from extending beyond page bounds
                     */

                    angular.element(element).off('mouseenter').on('mouseenter', function() {

                        if (hideTimeout) {
                            $timeout.cancel(hideTimeout);
                        }

                        showTimeout = $timeout(function() {

                            var trigger = angular.element(element),
                                tooltipElement = document.getElementById(scope.tooltipId),
                                height = trigger[0].offsetHeight,
                                width = trigger[0].offsetWidth,
                                tooltipElementWidth = tooltipElement.offsetWidth;

                            var position = _getPosition(trigger[0]);

                            tooltipElement.style.top = (position.y + height) + 'px';
                            tooltipElement.style.left = ((position.x + (width / 2)) - (tooltipElementWidth / 2)) + 'px';
                            angular.element(tooltipElement).addClass('active');

                            $rootScope.$broadcast('tooltip.open');

                            // Don't hide the tooltip if the user hovers over it (since we're mousing off the trigger element)
                            angular.element(document.getElementById(scope.tooltipId)).off('mouseenter').on('mouseenter', function() {
                                if (hideTimeout) {
                                    $timeout.cancel(hideTimeout);
                                }
                            });

                            // Hide the tooltip if the user mouses off of it
                            angular.element(document.getElementById(scope.tooltipId)).off('mouseleave').on('mouseleave', function() {
                                hideTimeout = $timeout(function() {

                                    angular.element(tooltipElement).removeClass('active');

                                    $rootScope.$broadcast('tooltip.closed');

                                    $timeout(function() {
                                        tooltipElement.style.top = '-999px';
                                        tooltipElement.style.left = '-999px';
                                    }, 250);

                                    if (showTimeout) {
                                        $timeout.cancel(showTimeout);
                                    }

                                }, HIDE_TOOLTIP_DELAY_MS);
                            });
                        }, SHOW_TOOLTIP_DELAY_MS);
                    });

                    angular.element(element).on('mouseleave', function() {

                        hideTimeout = $timeout(function() {
                            var tooltipElement = document.getElementById(scope.tooltipId);

                            angular.element(tooltipElement).removeClass('active');

                            $rootScope.$broadcast('tooltip.closed');

                            $timeout(function() {
                                tooltipElement.style.top = '-999px';
                                tooltipElement.style.left = '-999px';
                            }, 250);

                            if (showTimeout) {
                                $timeout.cancel(showTimeout);
                            }
                        }, HIDE_TOOLTIP_DELAY_MS);
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixTooltip', tooltip)
        .directive('clixTooltipTrigger', tooltipTrigger);
}());
(function() {

    var DropdownController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.bodyClicked = function(event) {
                $scope.menuVisible = false;
            };

            $scope.triggerClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.$watch('options', function() {
                if (!$scope.options) {
                    return;
                }
                $scope.selected = $scope.placeholderText ? { label: $scope.placeholderText } : $scope.options[0];
                $scope.dropdownOptions = $scope.options.map(function(option) {
                    return {
                        label: option.label,
                        // onClickDefault: option.onClick,
                        onClick: function() {
                            $scope.selected = option;
                            $scope.menuVisible = false;
                            option.onClick(option);
                        }
                    }
                });
            });
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
                options: '=',
                placeholderText: '@?'
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
        'searchService',
        function($scope, $window, $timeout, searchService) {

            var searchTimeout;

            $scope.term = '';

            $scope.searchVisible = false;

            function _hideSearchResults() {
                $scope.loading = false;
                $scope.results = undefined;
            }

            function _performSearch() {
                $scope.loading = true;
                $scope.results = undefined;

                if (searchTimeout) {
                    $timeout.cancel(searchTimeout);
                }

                searchTimeout = $timeout(function() {
                    searchService.getSearchResults($scope.term, 0, 10)
                        .then(
                            function onSuccess(data) {
                                $scope.results = data;
                            }
                        )
                        .finally(
                            function onFinally() {
                                $scope.loading = false;
                            }
                        )
                }, 250);
            }

            $scope.onTermChange = function() {
                $scope.searchVisible = true;
                if ($scope.term.length < 2) {
                    return _hideSearchResults();
                }
                _performSearch();
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('search-input-field')) {
                    return;
                }
                $scope.term = '';
                $scope.searchVisible = false;
                _hideSearchResults();
                $timeout(function() {
                    $scope.$apply();
                });
            };

            $scope.onSearchIconPress = function() {
                $scope.searchVisible = !$scope.searchVisible;
                if ($scope.searchVisible) {
                    $window.document.getElementById('search-input-field').focus();
                }
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderSearchIconController', HeaderSearchIconController);
}());
(function() {

    var HeaderController = [
        '$q',
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        '$uibModal',
        'notificationsService',
        'knetikService',
        'modalService',
        'catchMediaService',
        function($q, $scope, $rootScope, $window, $timeout, $uibModal, notificationsService, knetikService, modalService, catchMediaService) {

            var latestOffset = 0;

            function _populateHeaderData() {
                $q.all(
                        [
                            notificationsService.getNotifications(),
                            knetikService.getPoints()
                        ]
                    )
                    .then(
                        function onSuccess(data) {
                            $scope.notifications = data[0];
                            $scope.points = isNaN(data[1]) ? 0 : data[1];
                        }
                    );
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _populateHeaderData();
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
            });

            $scope.onArrowPress = function() {
                $rootScope.$broadcast('rightnav.open');
            };

            $scope.onNamePress = function() {
                if ($scope.notifications.notifications.length === 0) {
                    return;
                }
                $scope.tooltipsShown = !$scope.tooltipsShown;
            };

            $scope.hideNotificationMenu = function(event) {
                $scope.tooltipsShown = false;
            };

            $scope.onLoginSignupPress = function(signup) {
                if (signup) {
                    modalService.showSignUpModal();
                } else {
                    modalService.showLogInModal();
                }
            };

            angular.element($window).on('scroll', function() {
                var direction;
                if (latestOffset > this.pageYOffset) {
                    direction = 'down';
                } else if (latestOffset < this.pageYOffset && this.pageYOffset > 250) {
                    direction = 'up';
                }
                latestOffset = this.pageYOffset;
                if ($scope.scrollDirection !== direction) {
                    $scope.scrollDirection = direction;
                    $timeout(function() {
                        $scope.$apply();
                    });
                }
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                if (toState) {
                    $scope.selectedStateName = toState.name;
                }
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

    var headerSearchRow = function() {
        return {
            restrict: 'AE',
            transclude: {
                logoContainer: 'logoContainer',
                titleText: 'titleText',
                subtitleText: 'subtitleText'
            },
            templateUrl: 'ui/header/view.header-search-icon-row.html'
        }
    };

    angular.module('clixtv')
        .directive('clixHeaderBar', header)
        .directive('clixHeaderSearchIcon', headerSearchIcon)
        .directive('clixHeaderSearchRow', headerSearchRow);
}());
(function() {

    var HomeController = [
        '$q',
        '$scope',
        '$rootScope',
        '$timeout',
        '$window',
        '$uibModal',
        'categoryService',
        function($q, $scope, $rootScope, $timeout, $window, $uibModal, categoryService) {

            $scope.showMobileCarousel = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignupPress = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                    controller: 'LoginSignupController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-md',
                    resolve: {
                        signup: true
                    }
                });

                modalInstance.opened.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.open');
                    }
                );

                modalInstance.closed.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.close');
                    }
                );

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            };

            function _recalculateHeight() {
                var carouselElement = angular.element(document.getElementById('carousel-container'));
                
                if (!carouselElement) {
                    return;
                }
                $scope.videoContainerHeight = carouselElement.innerHeight();
                $timeout(function() {
                    $scope.$apply();
                });
            }

            function _recalculateWidth() {
                $scope.showMobileCarousel = ($window.innerWidth <= 768);
                _recalculateHeight();
            }


            categoryService.getAllCategories()
                .then(
                    function onSuccess(data) {
                        $scope.categories = data;
                        $scope.ready = true;
                    }
                );


            angular.element($window).on('resize.doResize', function () {
                _recalculateWidth();
            });
            _recalculateWidth();
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
    var NotFoundController = [
        function() {

        }
    ];

    angular
        .module('clixtv')
        .controller('NotFoundController', NotFoundController);
}());
(function() {

    var OfferController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'offersService',
        'brandsService',
        'userService',
        'catchMediaService',
        'educationModalService',
        'modalService',
        function($q, $scope, $rootScope, $stateParams, offersService, brandsService, userService, catchMediaService, educationModalService, modalService) {


            modalService.showModal({
                controller: 'OfferModalController',
                templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
                data: {
                    offerId: $stateParams.id
                }
            });


            function _resetIsFavorite() {
                $scope.isFavorite = userService.isSavedOffer($stateParams.id);
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
                _resetIsFavorite();
            });

            $rootScope.$on('favorite.added', _resetIsFavorite);
            $rootScope.$on('favorite.removed', _resetIsFavorite);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeSavedOffer($stateParams.id);
                } else {
                    userService.addSavedOffer($stateParams.id);
                }
            };

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

            $scope.offerMenuItems = [
                {
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            offersService.getOfferById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        $scope.offer = data;
                        $scope.active = 0;

                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.headerImage,
                            logo: data.brand ? data.brand.transparentThumbnail : undefined
                        };
                    }
                );

            catchMediaService.trackOfferPageEvent($stateParams.id);
            educationModalService.showOfferViewedModal($stateParams.id);
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferController', OfferController);
}());
(function() {

    var PrintableRedeemOfferController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'offersService',
        function($q, $scope, $rootScope, $stateParams, offersService) {

            offersService.getOfferById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        console.log(data);
                    }
                );


        }
    ];



    angular
        .module('clixtv')
        .controller('PrintableRedeemOfferController', PrintableRedeemOfferController);
}());
(function() {

    var StarController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'celebrityService',
        'userService',
        'catchMediaService',
        function($q, $log, $scope, $rootScope, $state, $stateParams, celebrityService, userService, catchMediaService) {

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteCelebrity($stateParams.id);
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
                _resetIsFavorite();
            });

            $rootScope.$on('favorite.added', _resetIsFavorite);
            $rootScope.$on('favorite.removed', _resetIsFavorite);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteCelebrity($stateParams.id);
                } else {
                    userService.addFavoriteCelebrity($stateParams.id);
                }
            };

            $scope.onTabSelect = function(tab) {
                catchMediaService.trackCelebrityPageEvent($stateParams.id, tab);
            };

            $scope.offerMenuItems = [
                {
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.charityMenuItems = [
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.brandMenuItems = [
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            function _setEpisodeList() {

            }

            celebrityService.getCelebrityById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        $scope.celebrity = data;
                        $scope.active = 0;

                        if (data.series && data.series.series) {
                            $scope.seriesList = data.series.series.map(function(series) {
                                return {
                                    label: series.title,
                                    series: series,
                                    onClick: function(option) {
                                        $scope.selectedSeries = option;
                                        _setEpisodeList();
                                    }
                                }
                            });

                            $scope.selectedSeries = $scope.seriesList[0];
                            _setEpisodeList();
                        }
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );

            catchMediaService.trackCelebrityPageEvent($stateParams.id);

            switch($stateParams.tab) {
                case 'brands':
                    $scope.active = 1;
                    break;
                case 'charities':
                    $scope.active = 2;
                    break;
                default:
                    $scope.active = 0;
                    break;
            }
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
                    label: 'Athletes'
                },
                {
                    label: 'Influencers'
                },
                {
                    label: 'Movie Stars'
                },
                {
                    label: 'Musicians'
                },
                {
                    label: 'TV Stars'
                }
            ];

            $scope.sortOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Most Viewed'
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

            $scope.onMouseover = function(item) {
                if (item.icon === 'icon-favorite-icon') {
                    item.icon = 'icon-favorite-icon-filled';
                }
            };

            $scope.onMouseleave = function(item) {
                if (item.icon === 'icon-favorite-icon-filled') {
                    item.icon = 'icon-favorite-icon';
                }
            };

            $scope.onItemPress = function(item) {
                if (item.onClick) {
                    item.onClick();
                }
            };
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
    var currencyInput = [
        function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(elem, scope, attrs, ngModel) {
                    ngModel.$formatters.push(function(val){
                        return '$' + val
                    });
                    ngModel.$parsers.push(function(val){
                        return val.replace(/[$,]/g, '')
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixCurrencyInput', currencyInput);
}());
(function() {
    var maxLength = [
        function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    attrs.$set('ngTrim', 'false');
                    var limitLength = parseInt(attrs.clixMaxLength, 10);
                    scope.$watch(attrs.ngModel, function(newValue) {
                        if(ngModel.$viewValue.length > limitLength){
                            ngModel.$setViewValue(ngModel.$viewValue.substring(0, limitLength));
                            ngModel.$render();
                        }
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixMaxLength', maxLength);
}());
(function() {
    var isLoggedIn = [
        '$rootScope',
        'userService',
        function($rootScope, userService) {
            return {
                restrict: 'AE',
                transclude: {
                    loggedIn: '?loggedIn',
                    notLoggedIn: '?notLoggedIn'
                },
                template: '<div><div ng-if="loggedInUser" ng-transclude="loggedIn"></div><div ng-if="!loggedInUser" ng-transclude="notLoggedIn"></div></div>',
                link: function(scope, element) {

                    $rootScope.$on('user.login', function(event, data) {
                        scope.loggedInUser = data;
                    });

                    $rootScope.$on('user.logout', function(event, data) {
                        scope.loggedInUser = undefined;
                    });

                    userService.getLoggedInUser()
                        .then(
                            function onSuccess(data) {
                                scope.loggedInUser = data;
                            }
                        )
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixIsLoggedIn', isLoggedIn);
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
    var requiredLoginClick = [
        '$rootScope',
        '$uibModal',
        'userService',
        function($rootScope, $uibModal, userService) {
            return {
                restrict: 'A',
                scope: {
                    clixRequiredLoginClick: '&'
                },
                link: function (scope, elem, attrs) {

                    function _openLoginModal() {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                            controller: 'LoginSignupController',
                            windowClass: 'clix-modal-window',
                            size: 'clix-md',
                            resolve: {
                                signup: false
                            }
                        });

                        modalInstance.opened.then(
                            function onSuccess() {
                                $rootScope.$broadcast('modal.open');
                            }
                        );

                        modalInstance.closed.then(
                            function onSuccess() {
                                $rootScope.$broadcast('modal.close');
                            }
                        );

                        modalInstance.result.then(
                            function onSuccess(data) {

                            },
                            function onError(error) {

                            }
                        )
                    }

                    elem.bind('click', function(e) {
                        e.preventDefault();
                        userService.getLoggedInUser()
                            .then(
                                function onSuccess(data) {
                                    if (data) {
                                        scope.clixRequiredLoginClick();
                                    } else {
                                        _openLoginModal();
                                    }
                                }
                            );
                    });
                }
            };
        }
    ];

    angular.module('clixtv')
        .directive('clixRequiredLoginClick', requiredLoginClick);
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
        '$rootScope',
        '$location',
        '$state',
        'userService',
        'shareModalService',
        function($q, $scope, $rootScope, $location, $state, userService, shareModalService) {

            $scope.menuVisible = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetMenuItems();
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
                _resetMenuItems();
            });

            $rootScope.$on('favorite.added', _resetMenuItems);
            $rootScope.$on('favorite.removed', _resetMenuItems);

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetMenuItems();
                    }
                );

            function _resetMenuItems() {

                $scope.isOnWatchlist = userService.isVideoOnWatchlist($scope.video.id);

                var isFavoriteStar = ($scope.video.celebrity) ? userService.isFavoriteCelebrity($scope.video.celebrity.id) : false;

                $scope.items = [
                    {
                        label: $scope.isOnWatchlist ? 'Remove from watchlist' : 'Add to watchlist',
                        icon: $scope.isOnWatchlist ? 'icon-remove-icon' : 'icon-redeem-plus-icon',
                        onClick: function() {
                            if ($scope.isOnWatchlist) {
                                userService.removeVideoFromWatchlist($scope.video.id);
                            } else {
                                userService.addVideoToWatchlist($scope.video.id);
                            }
                            $scope.menuVisible = false;
                        }
                    },
                    {
                        label: 'Share',
                        icon: 'icon-share-icon',
                        points: '50',
                        onClick: function() {
                            shareModalService.launchVideoShareModal($scope.video);
                            $scope.menuVisible = false;
                        }
                    },
                    {
                        label: 'Go to Star Page',
                        icon: 'icon-stars-icon',
                        onClick: function() {
                            $state.go('star', { id: $scope.video.celebrity.id })
                        }
                    },
                    {
                        label: isFavoriteStar ? 'Remove Star from Favorites' : 'Add Star to Favorites',
                        icon: isFavoriteStar ? 'icon-remove-icon' : 'icon-favorite-icon',
                        onClick: function() {
                            if (isFavoriteStar) {
                                userService.removeFavoriteCelebrity($scope.video.celebrity.id);
                            } else {
                                userService.addFavoriteCelebrity($scope.video.celebrity.id);
                            }
                            $scope.menuVisible = false;
                        }
                    }
                ];
            }

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
                if ($scope.onContentLoad) {
                    $scope.onContentLoad();
                }
            };

            $scope.go = function(path) {
                $location.path(path);
            };

            $scope.onPlayPress = function($event, video) {

                // Safari has a problem with the ng-click element within the active element, so we'll
                // just capture the click event of the overlay container and determine what to do from
                // here.
                var isSaving = angular.element($event.target).hasClass('save-button');
                if (!isSaving) {
                    $state.go('video', { id: video.id });
                }
            };

            $scope.onSaveButtonPress = function() {
                console.log('SAVE');
            };

            $scope.onWatchlistPress = function() {
                if ($scope.isOnWatchlist) {
                    userService.removeVideoFromWatchlist($scope.video.id);
                } else {
                    userService.addVideoToWatchlist($scope.video.id);
                }
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
                video: '=',
                extraClass: '@?',
                onContentLoad: '=?'
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
        '$rootScope',
        '$timeout',
        '$window',
        '$filter',
        '$stateParams',
        'videosService',
        'celebrityService',
        'userService',
        'catchMediaService',
        function($q, $scope, $rootScope, $timeout, $window, $filter, $stateParams, videosService, celebrityService, userService, catchMediaService) {

            $scope.isMobile = ($window.innerWidth <= 800);
            $scope.expanded = false;

            function _resetPageState() {
                if (!$scope.video) {
                    return;
                }
                $scope.isOnWatchlist = userService.isVideoOnWatchlist($scope.video.id);
                $scope.isFavoriteCelebrity = userService.isFavoriteCelebrity($scope.video.celebrity.id);
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetPageState();
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
                _resetPageState();
            });

            $rootScope.$on('favorite.added', _resetPageState);
            $rootScope.$on('favorite.removed', _resetPageState);

            $q.all(
                    [
                        userService.getLoggedInUser(),
                        videosService.getVideoById($stateParams.id)
                    ]
                )
                .then(
                    function onSuccess(data) {

                        $scope.loggedInUser = data[0];
                        $scope.video = data[1];
                        $scope.ready = true;
                        _resetPageState();
                    }
                );

            catchMediaService.trackVideoPageEvent($stateParams.id);

            $scope.onPlayerReady = function(configs) {
                var infoContainerElement = angular.element(document.getElementById('about-video-inner-container')),
                    infoContainerHeight = infoContainerElement.outerHeight(),
                    buttonContainerHeight = angular.element(document.getElementById('toggle-button-container')).outerHeight(),
                    buttonHeight = angular.element(document.getElementById('toggle-button')).outerHeight(),
                    newHeight = (configs.height - buttonContainerHeight - 20);

                if (infoContainerHeight < newHeight || $scope.isMobile) {
                    $scope.forceFullHeight = true;
                    $timeout(function() {
                        $scope.$apply();
                    });
                    infoContainerElement[0].style.height = (newHeight + buttonHeight + 20) + 'px';
                } else {
                    $scope.originalPlayerHeight = newHeight;
                    infoContainerElement[0].style.maxHeight = newHeight + 'px';
                }
            };

            $scope.onExpandToggle = function() {
                var expandedSize = angular.element(document.getElementById('about-video-container')).outerHeight(),
                    infoContainerElement = angular.element(document.getElementById('about-video-inner-container'));
                $scope.expanded = !$scope.expanded;
                infoContainerElement[0].style.maxHeight = ($scope.expanded) ? (expandedSize + 'px') : ($scope.originalPlayerHeight + 'px');
            };

            $scope.onFavoritePress = function() {
                userService.addFavoriteCelebrity($scope.video.celebrity.id)
                    .then(
                        function onSuccess(data) {
                            console.log(data);
                        }
                    );
            };

            $scope.onWatchlistPress = function() {
                if ($scope.isOnWatchlist) {
                    userService.removeVideoFromWatchlist($scope.video.id);
                } else {
                    userService.addVideoToWatchlist($scope.video.id);
                }
            };

            $scope.onFavoriteCelebrityPress = function() {
                if ($scope.isFavoriteCelebrity) {
                    userService.removeFavoriteCelebrity($scope.video.celebrity.id);
                } else {
                    userService.addFavoriteCelebrity($scope.video.celebrity.id);
                }
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
        '$rootScope',
        '$timeout',
        'knetikService',
        'catchMediaService',
        function($q, $scope, $rootScope, $timeout, knetikService, catchMediaService) {

            $timeout(function() {
                var playerInstance;

                if ($scope.video) {

                    playerInstance = jwplayer($scope.videoId).setup({
                        file: $scope.video.streamUrl,
                        // primary: 'html5',
                        androidhls: true,
                        autostart: $scope.autoPlay,
                        aspectratio: '16:9',
                        controls: true,
                        width: '100%',
                        //repeat: true,
                        icons: false,
                        image: $scope.video.thumbnail,
                        mediaid: $scope.video.id
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

                        jwplayer().on('complete', function() {
                            if ($scope.onComplete) {
                                $scope.onComplete();
                            }
                        });

                        jwplayer().on('play', function() {
                            $rootScope.$broadcast('video.play');
                        });

                        jwplayer().on('pause', function() {
                            $rootScope.$broadcast('video.pause');
                        });

                        jwplayer().on('complete', function() {
                            $rootScope.$broadcast('video.complete');
                        });

                        catchMediaService.trackVideoPlayerEvent(playerInstance);
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
                onError: '=?',
                onComplete: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoPlayer', videoPlayer);
}());
(function() {
    var headerPointsViolator = [
        'userService',
        '$state',
        function(userService, $state) {
            return {
                restrict: 'AE',
                transclude: true,
                templateUrl: 'ui/violator/view.header-points-violator.html',
                scope: {
                    points: '='
                },
                link: function(scope) {
                    scope.onRewardPointsPress = function() {
                        userService.getLoggedInUser()
                            .then(
                                function onSuccess(data) {
                                    if (data && data._id) {
                                        $state.go('account', { section: 'rewards' });
                                    }
                                }
                            )
                    };
                }
            }
        }
        ];

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

    angular
        .module('clixtv')
        .factory('AccountSettingListModel', [
            'AccountSettingModel',
            function(AccountSettingModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.settings = data.map(function(setting) {
                        return new AccountSettingModel(setting);
                    });
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('AccountSettingModel', [
            function() {
                return function(data) {
                    if (!data) {
                        return;
                    }
                    this.id = data._id;
                    this.type = data.type;
                    this.enabled = data.enabled;
                    this.description = data.description;
                    this.title = data.title;
                    this.order = data.order;
                }
            }
        ]);
}());

(function() {

    angular
        .module('clixtv')
        .factory('BrandListModel', [
            'BrandModel',
            function(BrandModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.brands = data.map(function(brand) {
                        if (typeof brand === 'string') {
                            return {
                                id: brand
                            };
                        }
                        return new BrandModel(brand);
                    });
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('BrandModel', [
            '$injector',
            'OfferListModel',
            'CelebrityListModel',
            function($injector, OfferListModel, CelebrityListModel) {
                return function(data) {
                    if (!data) {
                        return;
                    }
                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.offers = new OfferListModel(data.offers);
                    this.celebrities = new CelebrityListModel(data.celebrities);

                    if (data.videos) {
                        var VideoListModel = $injector.get('VideoListModel');
                        this.videos = new VideoListModel(data.videos);
                    }

                    if (data.content) {
                        if (data.content.BrandTransparentLogo) {
                            this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }

                        if (data.content.ProfilePicture) {
                            this.logo = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.Video) {
                            this.trailer = data.content.Video.downloadUrl;
                        }

                        if (data.content.PosterH) {
                            this.trailerThumbnail = data.content.PosterH.downloadUrl;
                        }
                    }
                }
            }
        ]);
}());

(function() {

    angular
        .module('clixtv')
        .factory('CategoryListModel', [
            'CategoryModel',
            function(CategoryModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.categories = data.map(function(category) {
                        return new CategoryModel(category);
                    });
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('CategoryModel', [
            'VideoListModel',
            function(VideoListModel) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.order = data.order;
                    this.videos = new VideoListModel(data.videos);

                    if (data.content) {
                        if (data.content.ProfilePicture) {
                            this.logo = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }
                    }
                }
            }
        ]);
}());
(function() {
    angular
        .module('clixtv')
        .factory('CelebrityListModel', [
            'CelebrityModel',
            function(CelebrityModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.celebrities = data.map(function(celebrity) {
                        return new CelebrityModel(celebrity);
                    });
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('CelebrityModel', [
            '$injector',
            function($injector) {
                return function(data) {
                    this.id = data._id;
                    this.name = data.title;
                    this.description = data.description;

                    if (data.content) {
                        if (data.content.ProfilePicture) {
                            this.thumbnail = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }
                    }

                    if (data.videos) {
                        var VideoListModel = $injector.get('VideoListModel');
                        this.videos = new VideoListModel(data.videos);
                    }

                    if (data.charities) {
                        var CharityListModel = $injector.get('CharityListModel');
                        this.charities = new CharityListModel(data.charities);
                    }

                    if (data.campaigns) {
                        var BrandListModel = $injector.get('BrandListModel');
                        this.brands = new BrandListModel(data.campaigns);
                    }

                    if (data.series) {
                        var SeriesListModel = $injector.get('SeriesListModel');
                        this.series = new SeriesListModel(data.series);
                    }

                    if (data.offers) {
                        var OfferListModel = $injector.get('OfferListModel');
                        this.offers = new OfferListModel(data.offers);
                    }

                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('CharityListModel', [
            'CharityModel',
            function(CharityModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.charities = data.map(function(charity) {
                        if (typeof charity === 'string') {
                            return {
                                id: charity
                            };
                        }
                        return new CharityModel(charity);
                    });
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('CharityModel', [
            '$injector',
            function($injector) {
                return function(data) {

                    if (typeof data === 'string') {
                        return;
                    }

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;

                    if (data.content) {
                        if (data.content.ProfilePicture) {
                            this.transparentThumbnail = data.content.ProfilePicture.downloadUrl;
                            this.logo = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }

                        if (data.content.Video) {
                            this.trailer = data.content.Video.downloadUrl;
                        }

                        if (data.content.PosterH) {
                            this.trailerThumbnail = data.content.PosterH.downloadUrl;
                        }
                    }

                    if (data.celebrities) {
                        var CelebrityListModel = $injector.get('CelebrityListModel');
                        this.celebrities = new CelebrityListModel(data.celebrities);
                    }

                    var VideoListModel = $injector.get('VideoListModel');
                    this.videos = new VideoListModel(data.videos);
                }
            }
        ]);
}());

(function() {
    angular
        .module('clixtv')
        .factory('NotificationListModel', [
            'NotificationModel',
            function(NotificationModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.notifications = data.map(function(notification) {
                        return new NotificationModel(notification);
                    });
                }
            }
        ]);
}());
(function() {
    angular
        .module('clixtv')
        .factory('NotificationModel', [
            function() {
                return function(data) {
                    this.id = data._id;
                    this.message = data.message;
                    this.subject = data.subject;
                    this.addedDate = data.added;
                    this.updatedDate = data.updated;
                }
            }
        ]);
}());
(function() {
    angular
        .module('clixtv')
        .factory('OfferListModel', [
            'OfferModel',
            function(OfferModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.offers = data.map(function(offer) {
                        return new OfferModel(offer);
                    });
                }
            }
        ]);
}());
(function() {
    angular
        .module('clixtv')
        .factory('OfferModel', [
            '$injector',
            function($injector) {
                return function(data) {
                    var BrandModel;
                    this.id = data._id;
                    this.title = data.title;
                    this.expirationDate = data.expiration_date;
                    this.description = data.description;
                    this.longDescription = data.long_description;

                    if (typeof data.campaign === 'string') {
                        this.campaign = data.campaign;
                    } else {
                        BrandModel = $injector.get('BrandModel');
                        this.campaign = new BrandModel(data.campaign);
                    }

                    if (data.content) {
                        if (data.content.BrandTransparentLogo) {
                            this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                        }

                        if (data.content.OfferImage) {
                            this.thumbnail = data.content.OfferImage.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }

                        if (data.content.CouponImage) {
                            this.couponImage = data.content.CouponImage.downloadUrl;
                        }

                        if (data.content.CarouselPic1) {
                            this.carouselPic1 = data.content.CarouselPic1.downloadUrl;
                        }

                        if (data.content.CarouselPic2) {
                            this.carouselPic2 = data.content.CarouselPic2.downloadUrl;
                        }

                        if (data.content.CarouselPic3) {
                            this.carouselPic3 = data.content.CarouselPic3.downloadUrl;
                        }
                    }

                    if (data.brand) {
                        BrandModel = $injector.get('BrandModel');
                        this.brand = new BrandModel(data.brand);
                    }

                    if (data.videos) {
                        var VideoListModel = $injector.get('VideoListModel');
                        this.videos = new VideoListModel(data.videos);
                    }
                }
            }
        ]);
}());

(function() {
    angular
        .module('clixtv')
        .factory('SearchResultsModel', [
            'BrandListModel',
            'CelebrityListModel',
            'SeriesListModel',
            'VideoListModel',
            'OfferListModel',
            'CharityListModel',
            function(BrandListModel, CelebrityListModel, SeriesListModel, VideoListModel, OfferListModel, CharityListModel) {
                return function(data) {
                    this.brands = new BrandListModel(data.campaigns);
                    this.celebrities = new CelebrityListModel(data.celebrities);
                    this.series = new SeriesListModel(data.series);
                    this.videos = new VideoListModel(data.videos);
                    this.offers = new OfferListModel(data.offers);
                    this.charities = new CharityListModel(data.charities);
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('SeasonListModel', [
            'SeasonModel',
            function(SeasonModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.seasons = data.map(function(season) {
                        return new SeasonModel(season);
                    });
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('SeasonModel', [
            'VideoModel',
            function(VideoModel) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.seasonNumber = parseInt(data.season_number);

                    if (data.episodes) {
                        this.episodes = data.episodes.map(function(episode) {
                            return new VideoModel(episode);
                        });
                    }
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('SeriesListModel', [
            'SeriesModel',
            function(SeriesModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.series = data.map(function(series) {
                        return new SeriesModel(series);
                    });
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('SeriesModel', [
            '$injector',
            'SeasonListModel',
            function($injector, SeasonListModel) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;

                    if (data.seasons) {
                        this.seasons = new SeasonListModel(data.seasons);
                    }

                    if (data.campaigns) {
                        var BrandListModel = $injector.get('BrandListModel');
                        this.brands = new BrandListModel(data.campaigns);
                    }

                    if (data.charity) {
                        var CharityModel = $injector.get('CharityModel');
                        this.charity = new CharityModel(data.charity);
                    }
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('UserModel', [
            function() {
                return function(data) {

                    if (!data) {
                        return;
                    }

                    this.id = data._id;
                    this.email = data.email;
                    this.displayName = data.displayName;

                    this.watchlist = data.watchlist;
                    this.offersSaved = data.offersSaved;
                    this.favoriteCharities = data.favoriteCharities;
                    this.favoriteCelebs = data.favoriteCelebs;
                    this.favoriteCategories = data.favoriteCategories;
                    this.favoriteBrands = data.favoriteBrands;

                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('VideoListModel', [
            'VideoModel',
            function(VideoModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        this.videos = [];
                        return;
                    }
                    this.videos = data.map(function(video) {
                        return new VideoModel(video);
                    });
                }
            }
        ]);
}());
(function() {

    angular
        .module('clixtv')
        .factory('VideoModel', [
            '$injector',
            'CelebrityModel',
            'BrandListModel',
            'CharityModel',
            function($injector, CelebrityModel, BrandListModel, CharityModel) {
                return function(data) {

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.seriesTitle = data.serie_title; // ...spelling?
                    this.episodeNumber = data.episode_number;

                    if (data.celebrity) {
                        this.celebrity = new CelebrityModel(data.celebrity);
                    }

                    if (data.campaigns) {
                        this.brands = new BrandListModel(data.campaigns);
                    }

                    if (data.charity) {
                        this.charity = new CharityModel(data.charity);
                    }

                    if (data.categories) {
                        var CategoryListModel = $injector.get('CategoryListModel');
                        this.categories = new CategoryListModel(data.categories);
                    }

                    if (data.serie) { // ...spelling?

                        // Preventing circular dependencies since a list of videos can
                        // exist in nested models too (series, seasons, etc)
                        var SeriesModel = $injector.get('SeriesModel');
                        this.series = new SeriesModel(data.serie);
                    }

                    if (data.content.PosterH) {
                        this.thumbnail = data.content.PosterH.downloadUrl;
                    }

                    if (data.content.HLSStream) {
                        this.streamUrl = data.content.HLSStream.downloadUrl;
                    } else if (data.content.MezzanineVideo) {
                        this.streamUrl = data.content.MezzanineVideo.downloadUrl;
                    }
                }
            }
        ]);
}());
(function() {

    var brandsService = [
        '$http',
        'stringUtils',
        'BrandListModel',
        'OfferListModel',
        'CharityListModel',
        'BrandModel',
        'CharityModel',
        function($http, stringUtils, BrandListModel, OfferListModel, CharityListModel, BrandModel, CharityModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllBrands: function() {
                    return $http.get('/api/campaigns')
                        .then(
                            function(data) {
                                return new BrandListModel(data.data);
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
                getBrandById: function(id) {
                    return $http.get('/api/campaigns/get_campaign_by_id?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new BrandModel(data.data);
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
                                return new CharityListModel(data.data);
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
                    return $http.get('/api/brands/get_charity?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new CharityModel(data.data[0]);
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
                                return new OfferListModel(data.data);
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

    var catchMediaService = [
        '$http',
        '$log',
        function($http, $log) {

            var instance;

            function _reportAppEvent(event, data) {
                if (!instance) {
                    $log.warn('Catch Media service has not been initialized yet');
                    return;
                }
                $log.log('Tracking', '"' + event + '"', 'app event with data', data);
                instance.reportAppEvent(event, data);
            }

            function _reportMediaEvent(type, event, data) {
                if (!instance) {
                    $log.warn('Catch Media service has not been initialized yet');
                    return;
                }
                $log.log('Tracking media event with type', '"' + type + '"', ', event', '"' + event + '"', ', and data', data);
                instance.reportMediaEvent(new Date().getTime(), type, event, data);
            }

            function _getEventNameForType(type) {
                switch (type) {
                    case 'categories':
                    case 'category':
                        return '';

                    case 'offers':
                    case 'offer':
                        return 'offer';

                    case 'stars':
                    case 'star':
                        return 'person';

                    case 'campaigns':
                    case 'brands':
                    case 'campaign':
                    case 'brand':
                        return 'campaign';

                    case 'charities':
                    case 'charity':
                        return 'organization';
                }
                return undefined;
            }

            return {

                initialize: function() {
                    if (!instance) {

                        $log.debug('Initializing Catch Media service');

                        /**
                         * @todo - Pull these from a top level config...
                         */
                        instance = new CMSDK({
                            appCode: 'CLIXTV-WEB',
                            partnerId: 3074,
                            appVersion: '1.0.0',
                            allowGeoLocation: false,
                            uninterrupedPlayInterval: 5,
                            idNamespace: 'clixtv'
                        });
                        instance.register();
                    }
                },

                setUser: function(email, type, extra) {
                    instance.setUser(email, type, extra);
                },

                deleteUser: function() {
                    instance.unsetUser();
                },

                trackVideoPlayerEvent: function(playerInstance) {
                    instance.setupJwPlayer(playerInstance, function(mediaId) {
                        return 'video';
                    });
                },

                trackBrandPageEvent: function(id, tab) {
                    _reportAppEvent('campaign', { id: id, tab: tab });
                },

                trackCelebrityPageEvent: function(id, tab) {
                    _reportAppEvent('person', { id: id, tab: tab });
                },

                trackCharityPageEvent: function(id, tab) {
                    _reportAppEvent('organization', { id: id, tab: tab });
                },

                trackOfferPageEvent: function(id, tab) {
                    _reportAppEvent('offer', { id: id, tab: tab });
                },

                trackVideoPageEvent: function(id, tab) {
                    _reportAppEvent('episode', { id: id, tab: tab });
                },

                trackSearchEvent: function(type, entity) {
                    _reportMediaEvent(_getEventNameForType(type), 'search', {
                        id: entity.id
                    })
                },

                trackShareEvent: function(type, entity) {
                    _reportMediaEvent(_getEventNameForType(type), 'share', {
                        id: entity.id
                    })
                },

                trackFavoriteEvent: function(type, id) {
                    _reportMediaEvent(_getEventNameForType(type), 'favorite', {
                        id: id
                    })
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('catchMediaService', catchMediaService);
}());
(function() {

    var categoryService = [
        '$http',
        'CategoryListModel',
        'CategoryModel',
        function($http, CategoryListModel, CategoryModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCategories: function() {
                    return $http.get('/api/category/get_all_categories')
                        .then(
                            function onSuccess(data) {
                                return new CategoryListModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryByName: function(name) {
                    return $http.get('/api/category/get_category_by_name/?category=' + name)
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryById: function(id) {
                    return $http.get('/api/category/get_category_by_id?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new CategoryModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryVideosByName: function(name) {
                    return $http.get('/api/category/get_category_videos?category=' + name)
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
        .factory('categoryService', categoryService);
}());
(function() {

    var celebrityService = [
        '$http',
        'CelebrityListModel',
        'CelebrityModel',
        function($http, CelebrityListModel, CelebrityModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCelebrities: function() {
                    return $http.get('/api/celebrity/get_all_celebrities')
                        .then(
                            function onSuccess(data) {
                                return new CelebrityListModel(data.data);
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
                                return new CelebrityModel(data.data);
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
                getOffersByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_offers?id=' + id)
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
                },

                /**
                 * @todo - Cache this call
                 */
                getVideosByCelebrityId: function(id) {
                    return $http.get('/api/celebrity/get_celeb_videos?id=' + id)
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
                getPoints: function() {
                    return $http.get('/api/knetik/balance')
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
        .factory('knetikService', knetikService);
}());

(function() {

    var notificationsService = [
        '$http',
        'NotificationListModel',
        function($http, NotificationListModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getNotifications: function() {
                    return $http.get('/api/notifications/get_notifications')
                        .then(
                            function(data) {
                                return new NotificationListModel(data.data);
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('notificationsService', notificationsService);
}());
(function() {

    var offersService = [
        '$http',
        'OfferModel',
        function($http, OfferModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getOfferById: function(id) {
                    return $http.get('api/brands/get_offer?id=' + id)
                        .then(
                            function(data) {
                                return new OfferModel(data.data[0]);
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

    var preferencesService = [
        'storageService',
        'userService',
        function(storageService, userService) {

            function _getShowEducationModalPreferenceKey(type) {
                return userService.getLoggedInUser()
                    .then(
                        function onSuccess(data) {
                            var userId = (data && data._id) ? data._id : '';
                            return 'hide-' + type + '-' + userId;
                        }
                    )
            }

            return {

                setShowEducationModalPreference: function(type, show) {
                    return _getShowEducationModalPreferenceKey(type)
                        .then(
                            function onSuccess(data) {
                                return storageService.setItem(data, show);
                            }
                        )
                },

                getShowEducationModalPreference: function(type) {
                    return _getShowEducationModalPreferenceKey(type)
                        .then(
                            function onSuccess(data) {
                                return storageService.getItem(data);
                            }
                        )
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('preferencesService', preferencesService);
}());
(function() {

    var searchService = [
        '$http',
        'SearchResultsModel',
        function($http, SearchResultsModel) {
            return {

                getSearchResults: function(term, offset, limit) {
                    return $http.get('/api/search?keyword=' + term)
                        .then(
                            function onSuccess(data) {
                                return new SearchResultsModel(data.data);
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('searchService', searchService);
}());
(function() {

    var storageService = [
        'localStorageService',
        function(localStorageService) {
            return {

                setItem: function(key, value) {
                    return localStorageService.set(key, value);
                },

                getItem: function(key) {
                    return localStorageService.get(key);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('storageService', storageService);
}());
(function() {

    var educationModalService = [
        '$q',
        '$log',
        '$rootScope',
        '$uibModal',
        'userService',
        'modalService',
        'preferencesService',
        function($q, $log, $rootScope, $uibModal, userService, modalService, preferencesService) {

            function _launchEducationModal(type, id) {
                $q.all(
                        [
                            userService.getLoggedInUser(),
                            preferencesService.getShowEducationModalPreference(type)
                        ]
                    )
                    .then(
                        function onSuccess(data) {
                            var hide = data[1];
                            if (hide === true || hide === 'true') {
                                return;
                            }

                            modalService.showModal({
                                templateUrl: 'ui/common/modal/education/view.education-modal.html',
                                controller: 'EducationModalController',
                                data: {
                                    loggedInUser: data[0],
                                    type: type,
                                    id: id
                                }
                            });
                        }
                    );

            }

            function _launchFavoriteEducationModal(event, data) {
                _launchEducationModal(data.type, data.id);
            }

            return {
                initialize: function() {
                    $log.debug('Initializing education modal service');

                    $rootScope.$on('favorite.added', _launchFavoriteEducationModal);
                    $rootScope.$on('favorite.added.anonymous', _launchFavoriteEducationModal);
                },

                showOfferViewedModal: function(id) {
                    _launchEducationModal('offer-view', id);
                },

                showOfferSavedModal: function (id) {
                    _launchEducationModal('offer', id);
                },

                showLearnMoreModal: function() {
                    _launchEducationModal('learn-more');
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('educationModalService', educationModalService);
}());
(function() {

    var modalService = [
        '$q',
        '$log',
        '$rootScope',
        '$timeout',
        '$injector',
        '$uibModal',
        function($q, $log, $rootScope, $timeout, $injector, $uibModal) {

            var _modalStack = [];

            $rootScope.$on('modal.close', function() {
                _modalStack = [];
            });

            return {
                showSignUpModal: function() {
                    this.showModal({
                        templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                        controller: 'LoginSignupController',
                        size: 'clix-md',
                        data: {
                            signup: true
                        }
                    });
                },

                showLogInModal: function() {
                    this.showModal({
                        templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                        controller: 'LoginSignupController',
                        size: 'clix-md',
                        data: {
                            signup: false
                        }
                    });
                },

                showConfirmationModal: function(title, message) {
                    var deregisterListener,
                        deferred = $q.defer(),
                        key = new Date().getTime();
                    this.showModal({
                        controller: 'ConfirmationModalController',
                        templateUrl: 'ui/common/modal/confirmation/view.confirmation-modal.html',
                        data: {
                            key: key,
                            title: title,
                            message: message
                        }
                    });

                    deregisterListener = $rootScope.$on('modal.confirm', function(event, data) {
                        if (data.key === key) {
                            deregisterListener();
                            deferred.resolve();
                        }
                    });

                    return deferred.promise;
                },

                showModal: function(options) {
                    var deferred, modalInstance;

                    // Go through all modals in the stack and add the "slide-out" class so they
                    // move out of the way of the new modal coming in.
                    if (_modalStack.length > 0) {
                        [].forEach.bind(document.getElementsByClassName('clix-modal-window'), function(modal) {
                            angular.element(modal).addClass('slide-out');
                        })();
                    }

                    deferred = $q.defer();
                    modalInstance = $uibModal.open({
                        animation: true,
                        backdrop: _modalStack.length > 0 ? false : 'static',
                        controller: options.controller,
                        templateUrl: options.templateUrl,
                        windowClass: 'clix-modal-window ' + ((_modalStack.length > 0) ? 'slide-in' : ''),
                        size: options.size || 'clix-lg',
                        resolve: {
                            data: options.data
                        }
                    });

                    _modalStack.push(modalInstance);

                    modalInstance.opened.then(
                        function onSuccess() {
                            $rootScope.$broadcast('modal.open');
                        }
                    );

                    modalInstance.closed.then(
                        function onSuccess() {
                            $rootScope.$broadcast('modal.close');
                        }
                    );

                    modalInstance.result.then(
                        function onSuccess(data) {
                            deferred.resolve(data);
                        },
                        function onError(error) {
                            // deferred.reject(error);
                        }
                    );
                    return deferred.promise;
                },

                pop: function() {
                    if (_modalStack.length < 2) {

                        $log.log('Not enough modals in the stack to pop(...)');
                        return;
                    }

                    var modalInstances = document.getElementsByClassName('clix-modal-window'),
                        backdropInstances = document.getElementsByClassName('modal-backdrop');

                    var currentInstance = modalInstances[0],
                        previousInstance = modalInstances[1];

                    var currentBackdropInstance = backdropInstances[0],
                        backdropZIndex = currentBackdropInstance ? parseFloat(currentBackdropInstance.style.zIndex) : 0;

                    angular.element(currentInstance).removeClass('in');
                    angular.element(previousInstance).removeClass('slide-out');

                    previousInstance.style.zIndex = backdropZIndex + 1;

                    $timeout(function() {
                        angular.element(currentInstance).remove();
                    }, 250);

                    _modalStack.splice(-1);

                },

                getNumberOfModalsInStack: function() {
                    return _modalStack.length;
                },

                closeOrPop: function() {
                    if (_modalStack.length >= 2) {
                        this.pop();
                    } else {
                        var $uibModalInstance = $injector.get('$uibModalInstance');
                        if ($uibModalInstance) {
                            $uibModalInstance.resolve();
                        }
                    }
                },

                dismissOrPop: function() {
                    if (_modalStack.length >= 2) {
                        this.pop();
                    } else {
                        var $uibModalInstance = $injector.get('$uibModalInstance');
                        if ($uibModalInstance) {
                            $uibModalInstance.resolve();
                        }
                    }
                },

                close: function() {

                    var $uibModalStack = $injector.get('$uibModalStack');

                    $uibModalStack.dismissAll();

                    _modalStack = [];
                }

            }
        }
    ];

    angular
        .module('clixtv')
        .factory('modalService', modalService);
}());
(function() {

    var shareModalService = [
        '$log',
        '$rootScope',
        '$uibModal',
        'modalService',
        function($log, $rootScope, $uibModal, modalService) {

            function _showModalForType(type, item) {

                var resolve = {
                    shareModalVideo: (type === 'video') ? item : undefined,
                    shareModalOffer: (type === 'offer') ? item : undefined,
                    shareModalCelebrity: (type === 'celebrity') ? item : undefined,
                    shareModalBrand: (type === 'brand') ? item : undefined,
                    shareModalCharity: (type === 'charity') ? item : undefined,
                    shareModalCategory: (type === 'category') ? item : undefined
                };

                modalService.showModal({
                    templateUrl: 'ui/common/modal/share/view.share.html',
                    controller: 'ShareController',
                    data: resolve
                });
            }

            return {
                launchVideoShareModal: function(item) {
                    _showModalForType('video', item);
                },

                launchOfferShareModal: function(item) {
                    _showModalForType('offer', item);
                },

                launchCelebrityShareModal: function(item) {
                    _showModalForType('celebrity', item);
                },

                launchBrandShareModal: function(item) {
                    _showModalForType('brand', item);
                },

                launchCharityShareModal: function(item) {
                    _showModalForType('charity', item);
                },

                launchCategoryShareModal: function(item) {
                    _showModalForType('category', item);
                },

                launchShareModal: function(type, item) {
                    _showModalForType(type, item);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('shareModalService', shareModalService);
}());
(function() {

    var userService = [
        '$q',
        '$http',
        '$log',
        '$rootScope',
        'BrandListModel',
        'OfferListModel',
        'CharityListModel',
        'CelebrityListModel',
        'CategoryListModel',
        'VideoListModel',
        'AccountSettingListModel',
        'UserModel',
        'modalService',
        'catchMediaService',
        function($q, $http, $log, $rootScope, BrandListModel, OfferListModel, CharityListModel, CelebrityListModel, CategoryListModel, VideoListModel, AccountSettingListModel, UserModel, modalService, catchMediaService) {

            var loggedInUser;

            function _getFavoriteMethodForType(type, isDelete) {
                switch(type) {
                    case 'celebrity':
                        return isDelete ? 'remove_favorite_celebrity' : 'add_favorite_celebrity';
                    case 'brand':
                        return isDelete ? 'remove_favorite_brand' : 'add_favorite_brand';
                    case 'category':
                        return isDelete ? 'remove_favorite_category' : 'add_favorite_category';
                    case 'charity':
                        return isDelete ? 'remove_favorite_charity' : 'add_favorite_charity';
                    case 'offer':
                        return isDelete ? 'unsave_offer' : 'save_offer';
                    case 'watchlist':
                        return isDelete ? 'remove_watchlist_item' : 'add_watchlist_item';
                }
                return undefined;
            }

            function _getFavoritePropertyForType(type) {
                switch(type) {
                    case 'celebrity':
                        return 'favoriteCelebs';
                    case 'brand':
                        return 'favoriteBrands';
                    case 'category':
                        return 'favoriteCategories';
                    case 'charity':
                        return 'favoriteCharities';
                    case 'offer':
                        return 'offersSaved';
                    case 'watchlist':
                        return 'watchlist';
                }
                return undefined;
            }

            function _addFavorite(id, type) {
                var userFavoriteMethod, favoriteProperty, favorites;

                if (!loggedInUser) {

                    $rootScope.$broadcast('favorite.added.anonymous', {
                        type: type,
                        id: id
                    });

                    $log.warn('No logged in user found to add favorite', type);
                    return;
                }

                if (!id) {
                    $log.error('No ID provided to add to favorites');
                    return;
                }

                userFavoriteMethod = _getFavoriteMethodForType(type, false);
                favoriteProperty = _getFavoritePropertyForType(type);

                if (!userFavoriteMethod) {
                    throw new Error('Invalid type provided for favorite');
                }
                if (favoriteProperty) {
                    favorites = loggedInUser[favoriteProperty];
                    if (!favorites) {
                        favorites = [];
                    }
                    if (favorites.indexOf(id) === -1) {
                        favorites.push(id);
                        loggedInUser[favoriteProperty] = favorites;
                        $rootScope.$broadcast('favorite.added', {
                            user: loggedInUser,
                            type: type,
                            id: id
                        });
                    }
                }

                catchMediaService.trackFavoriteEvent(type, id);

                return $http.post('/api/account/' + userFavoriteMethod, {
                    id: id
                });
            }

            function _getRemoveConfirmationModalData(type) {
                var title, message;
                switch(type) {
                    case 'celebrity':
                    case 'brand':
                    case 'category':
                    case 'charity':
                        var attribute = type;
                        if (attribute === 'celebrity') {
                            attribute = 'star';
                        }
                        title = 'Remove From Favorites?';
                        message = 'Are you sure you want to remove this ' + attribute + ' from your favorites? You will no longer receive notifications when new content or any special offers are added.';
                        break;

                    case 'watchlist':
                        title = 'Remove From Watchlist?';
                        message = 'Are you sure you want to remove this video from your watchlist?';
                        break;

                    case 'offer':
                        title = 'Remove From Saved Offers?';
                        message = 'Are you sure you want to remove this offer from your list of saved offers?';
                        break;
                }
                return {
                    title: title,
                    message: message
                }
            }

            function _removeFavorite(id, type) {
                var userFavoriteMethod, favoriteProperty, favorites;

                if (!loggedInUser) {
                    $log.error('No logged in user found to remove favorite', type);
                    return;
                }

                if (!id) {
                    $log.error('No ID provided to remove from favorites');
                    return;
                }

                userFavoriteMethod = _getFavoriteMethodForType(type, true);
                favoriteProperty = _getFavoritePropertyForType(type);

                if (!userFavoriteMethod) {
                    throw new Error('Invalid type provided for favorite');
                }

                var modalData = _getRemoveConfirmationModalData(type);
                return modalService.showConfirmationModal(modalData.title, modalData.message)
                    .then(
                        function onSuccess() {

                            if (favoriteProperty) {
                                favorites = loggedInUser[favoriteProperty];
                                if (!favorites) {
                                    favorites = [];
                                }
                                if (favorites.indexOf(id) !== -1) {

                                    favorites.splice(favorites.indexOf(id), 1);
                                    loggedInUser[favoriteProperty] = favorites;
                                    $rootScope.$broadcast('favorite.removed', {
                                        user: loggedInUser,
                                        type: type,
                                        id: id
                                    });
                                }
                            }

                            return $http.post('/api/account/' + userFavoriteMethod, {
                                id: id
                            });
                        }
                    );
            }

            function _isFavorite(id, type) {
                var favoriteProperty, favorites;
                if (!loggedInUser) {
                    return false;
                }

                favoriteProperty = _getFavoritePropertyForType(type);

                if (!favoriteProperty) {
                    throw new Error('Invalid property defined to look up favorite: ' + type);
                }

                favorites = loggedInUser[favoriteProperty];

                if (!favorites) {
                    favorites = [];
                }

                return favorites.indexOf(id) !== -1;
            }

            var methods = {

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

                                loggedInUser = data.data;

                                $rootScope.$broadcast('user.login', loggedInUser);
                                return data.data;
                            }
                        );
                },

                signupUser: function(email, password, firstName, lastName, birthdate, gender) {
                    return $http.post('/api/account/register', {
                            email: email,
                            password: password,
                            first_name: firstName,
                            last_name: lastName
                        })
                        .then(
                            function onSuccess(data) {
                                if (!data || !data.data || data.data.error) {
                                    throw new Error(data.data);
                                }

                                loggedInUser = data.data;

                                $rootScope.$broadcast('user.login', loggedInUser);
                                return data.data;
                            }
                        )
                },

                updateUser: function(user) {
                    return $http.post('/api/account/update_profile', {
                        data: user
                    });
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
                    return $q.when(loggedInUser);
                },

                setLoggedInUser: function() {
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
                                return new VideoListModel(data.data);
                            }
                        );
                },

                getFavoriteCelebrities: function() {
                    return $http.get('/api/account/get_favorite_celebrities')
                        .then(
                            function onSuccess(data) {
                                return new CelebrityListModel(data.data);
                            }
                        );
                },

                getFavoriteBrands: function() {
                    return $http.get('/api/account/get_favorite_brands')
                        .then(
                            function onSuccess(data) {
                                return new BrandListModel(data.data);
                            }
                        );
                },

                getFavoriteCharities: function() {
                    return $http.get('/api/account/get_favorite_charities')
                        .then(
                            function onSuccess(data) {
                                return new CharityListModel(data.data);
                            }
                        );
                },

                getFavoriteCategories: function() {
                    return $http.get('/api/account/get_favorite_categories')
                        .then(
                            function onSuccess(data) {
                                return new CategoryListModel(data.data);
                            }
                        );
                },

                getSavedOffers: function() {
                    return $http.get('/api/account/get_saved_offers')
                        .then(
                            function onSuccess(data) {
                                return new OfferListModel(data.data);
                            }
                        );
                },

                getAccountSettings: function() {
                    return $http.get('/api/account/get_settings')
                        .then(
                            function onSuccess(data) {
                                return new AccountSettingListModel(data.data);
                            }
                        );
                },

                enableAccountSetting: function(id) {
                    return $http.post('/api/account/enable_setting', {
                        id: id
                    });
                },

                disableAccountSetting: function(id) {
                    return $http.post('/api/account/disable_setting', {
                        id: id
                    });
                },

                isSavedOffer: function(id) {
                    return _isFavorite(id, 'offer');
                },

                addSavedOffer: function(id) {
                    return _addFavorite(id, 'offer');
                },

                removeSavedOffer: function(id) {
                    return _removeFavorite(id, 'offer');
                },

                isFavoriteCelebrity: function(id) {
                    return _isFavorite(id, 'celebrity');
                },

                addFavoriteCelebrity: function(id) {
                    return _addFavorite(id, 'celebrity');
                },

                removeFavoriteCelebrity: function(id) {
                    return _removeFavorite(id, 'celebrity');
                },

                isFavoriteBrand: function(id) {
                    return _isFavorite(id, 'brand');
                },

                addFavoriteBrand: function(id) {
                    return _addFavorite(id, 'brand');
                },

                removeFavoriteBrand: function(id) {
                    return _removeFavorite(id, 'brand');
                },

                isFavoriteCategory: function(id) {
                    return _isFavorite(id, 'category');
                },

                addFavoriteCategory: function(id) {
                    return _addFavorite(id, 'category');
                },

                removeFavoriteCategory: function(id) {
                    return _removeFavorite(id, 'category');
                },

                isFavoriteCharity: function(id) {
                    return _isFavorite(id, 'charity');
                },

                addFavoriteCharity: function(id) {
                    return _addFavorite(id, 'charity');
                },

                removeFavoriteCharity: function(id) {
                    return _removeFavorite(id, 'charity');
                },

                isVideoOnWatchlist: function(id) {
                    return _isFavorite(id, 'watchlist');
                },

                addVideoToWatchlist: function(id) {
                    _addFavorite(id, 'watchlist');
                },

                removeVideoFromWatchlist: function(id) {
                    _removeFavorite(id, 'watchlist');
                }
            };

            return methods;
        }
    ];

    angular
        .module('clixtv')
        .factory('userService', userService);
}());
(function() {

    var videosService = [
        '$http',
        'VideoModel',
        function($http, VideoModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getVideoById: function(id) {
                    return $http.get('/api/video/get_video_by_id/?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new VideoModel(data.data);
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
    var dateFilter = [
        function() {
            return function (input, type) {
                if (!input) {
                    return input;
                }
                var format = (type === 'long') ? 'D MMMM YYYY' : 'M/D/YYYY';
                return moment(input).format(format);
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('clixDate', dateFilter);
}());
(function() {
    var newLineBreakFilter = [
        '$sce',
        function($sce) {
            return function (input) {
                if (!input) {
                    return input;
                }
                var breakTag = '<br />';
                var msg = (input + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
                return $sce.trustAsHtml(msg);
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('clixNewLineBreak', newLineBreakFilter);
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
(function() {

    var wordTruncateFilter = [
        function() {
            return function (input, limit, respectWordBoundaries, suffix) {
                if (!input) {
                    return input;
                }
                if (angular.isUndefined(respectWordBoundaries)) {
                    respectWordBoundaries = true;
                }
                if (angular.isUndefined(suffix)) {
                    suffix = '...';
                }

                if (input.length <= limit) {
                    return input;
                }

                limit = limit - suffix.length;

                var trimmedString = input.substr(0, limit);
                if (respectWordBoundaries) {
                    return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + suffix;
                }
                return trimmedString + suffix;
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('wordTruncate', wordTruncateFilter);
}());