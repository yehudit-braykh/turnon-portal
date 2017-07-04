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
            'angular.filter',
            'ngTouch',
            'angular-cache',
            'lz-string',
            'ngSanitize',
            'angular-inview',
            '720kb.socialshare',
            'infinite-scroll',
            'ngclipboard'
        ])
        .constant('clixConfig', {

            // Different environments trigger different functionality through the
            // site. For example, no analytics will be sent unless we're in a
            // production environment.
            environment: window.ENVIRONMENT,

            // Swaps out logos and other components that are only available on the
            // beta version of the site
            beta: true,

            // Enable or disable points, changes all violators to reflect state
            pointsEnabled: (window.ENVIRONMENT !== 'prod'),

            // Enable or disable all sort and filter bars
            filtersEnabled: false,

            // Enable or disable all notifications
            notificationEnabled: false,

            // Base URL for API calls
            baseApi: (window.ENVIRONMENT === 'stage') ? 'http://52.43.246.138' : 'https://api.clixtv.com',

            // A non-logged in user will not be allowed to directly view any episodes
            // that are below this number
            lockedMinimumEpisodeNumber: 2,

            // API key for segment tracking
            segmentApiKey: 'YV8pmcoBPm8xF2ocBVwq6AxxoZXTn8rG',

            // Base URL for images
            baseImageUrl: 'https://advncedcdn.vo.llnwd.net/clixtv_prod_storage/static',

            // Only enable browser cache for API calls in production
            cacheEnabled: (window.ENVIRONMENT === 'prod')
        })
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
                $httpProvider.interceptors.push('apiInterceptor');
                $locationProvider.html5Mode(true);

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
                        url: '/video/:slug',
                        templateUrl: 'ui/video-permalink/view.video-permalink.html',
                        controller: 'VideoPermalinkController',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('brands', {
                        url: '/brands',
                        templateUrl: 'ui/brand/view.brands.html',
                        controller: 'BrandsController',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('brand', {
                        url: '/brand/:slug',
                        templateUrl: 'ui/brand/view.brand.html',
                        controller: 'BrandController'
                    })
                    .state('brand-offer', {
                        url: '/brand/:slug/offer/:offerSlug',
                        templateUrl: 'ui/brand/view.brand.html',
                        controller: 'BrandController'
                    })
                    .state('charity', {
                        url: '/charity/:slug?starId',
                        templateUrl: 'ui/charity/view.charity.html',
                        controller: 'CharityController'
                    })
                    .state('charities', {
                        url: '/charities',
                        templateUrl: 'ui/charity/view.charities.html',
                        controller: 'CharitiesController',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('stars', {
                        url: '/stars',
                        templateUrl: 'ui/stars/view.stars.html',
                        controller: 'StarsController',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('star', {
                        url: '/star/:slug',
                        templateUrl: 'ui/stars/view.star.html',
                        controller: 'StarController',
                        params: {
                            tab: 'video'
                        }
                    })
                    .state('categories', {
                        url: '/categories',
                        templateUrl: 'ui/categories/view.categories.html',
                        controller: 'CategoriesController',
                        data: {
                            solidNavigation: true
                        }
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
                        },
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('contact', {
                        url: '/contact/:section',
                        templateUrl: 'ui/contact/view.contact-page.html',
                        controller: 'ContactPageController',
                        params: {
                            section: {
                                squash: true,
                                value: null
                            }
                        },
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('about', {
                        url: '/about',
                        templateUrl: 'ui/about/view.about-page.html',
                        controller: 'AboutPageController',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('terms-of-use', {
                        url: '/terms-of-use',
                        templateUrl: 'ui/terms-and-conditions/view.terms-and-conditions.html',
                        data: {
                            solidNavigation: true
                        }
                    })
                    .state('privacy-policy', {
                        url: '/privacy-policy',
                        templateUrl: 'ui/privacy-policy/view.privacy-policy.html',
                        data: {
                            solidNavigation: true
                        }
                    })
            }
        ])
        .run([
            '$rootScope',
            '$window',
            'userService',
            'catchMediaService',
            'educationModalService',
            'modalService',
            'analyticsService',
            'clixConfig',
            function($rootScope, $window, userService, catchMediaService, educationModalService, modalService, analyticsService, clixConfig) {

                userService.setLoggedInUser();
                catchMediaService.initialize();
                educationModalService.initialize();
                analyticsService.initialize(clixConfig.segmentApiKey);

                $rootScope.pageTitle = 'ClixTV - Your Stars! Their Passions.';

                $rootScope.clixConfig = clixConfig;

                $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
                    $('html, body').animate({ scrollTop: 0 }, 200);
                    modalService.close();
                    $rootScope.printable = (to.data && to.data.print);
                    $rootScope.solidNavigation = (to.data && to.data.solidNavigation);
                    analyticsService.trackPageView(event, to, toParams, from, fromParams);
                });

                $rootScope.$on('user.login', function(event, data) {
                    if (data && (data.id || data._id)) {
                        var user = {
                            email: data.email,
                            avatar: data.avatar,
                            birthdate: data.birthdate,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            phone: data.phone,
                            gender: data.gender,
                            googleConnected: data.googleConnected,
                            tumblrConnected: data.tumblrConnected,
                            twitterConnected: data.twitterConnected,
                            facebookConnected: data.facebookConnected,
                            enableEmailNotifications: data.enableEmailNotifications,
                            enablePushNotifications: data.enablePushNotifications,
                            enableTextNotifications: data.enableTextNotifications
                        };
                        catchMediaService.setUser(data.email, 'default', user);
                        analyticsService.identify((data.id || data._id), user);
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

  $templateCache.put('ui/about/view.about-page.html',
    "<div class=clix-about-page><div class=about-header>Premium content from your favorite stars.</div><div class=header-container><div class=about-tagline>Click. Watch. Share. Get Rewards.</div><div class=about-signup-button><clix-primary-button ng-click=onSignUpPress() ng-hide=loggedInUser>Sign Up Free</clix-primary-button></div><div class=about-header>What is ClixTV?</div><div class=\"row about-callout-row\"><div class=\"col-sm-3 about-callout-block\"><div class=\"icon-gradient-clix-icon about-callout-icon\"></div><div class=about-callout-separator></div><div class=about-callout-title>Premium Video</div><p class=about-callout-desc>Short video series from your favorite stars and influencers, showcasing their passions, hobbies, games and antics.</p></div><div class=\"col-sm-3 about-callout-block\"><div class=\"icon-charities-icon-bottom-nav about-callout-icon\"></div><div class=about-callout-separator></div><div class=about-callout-title>Charity</div><p class=about-callout-desc>You have the opportunity to donate your reward points to any of the ClixTV supported charities.</p></div><div class=\"col-sm-3 about-callout-block\"><div class=\"icon-offers-icon about-callout-icon\"></div><div class=about-callout-separator></div><div class=about-callout-title>Discounts</div><p class=about-callout-desc>Each ClixTV video is paired with discounts, offers and coupons from your favorite brands.</p></div><div class=\"col-sm-3 about-callout-block\"><div class=\"icon-rewards-icon-left-nav about-callout-icon\"></div><div class=about-callout-separator></div><div class=about-callout-title>Rewards</div><p class=about-callout-desc>Wherever you see a green badge, you can earn reward points. Reward points have a cash value that you can use on offers, transfer to a PayPal account, or a Visa Prepaid Card USD or Amazon.com Gift Card.</p></div></div></div><div class=body-container><div class=about-header>Plays on all your devices</div><div class=about-devices-image-container><img ng-src={{$root.clixConfig.baseImageUrl}}/about-us-devices.png ng-srcset=\"{{$root.clixConfig.baseImageUrl}}/about-us-devices@2x.png 2x\"></div></div><div class=footer-container><div class=about-header>ClixTV is FREE.<br>And always will be.</div><div class=about-callout-separator></div><p class=about-footer-desc><span>No pre-roll ads. No post-roll ads. No payments.</span> Just the stars you love, the brands you love, and the charities you love without the noise.</p><div class=about-signup-button><clix-primary-button ng-click=onSignUpPress() ng-hide=loggedInUser>Sign Up Free</clix-primary-button></div></div></div>"
  );


  $templateCache.put('ui/account/favorites/view.favorites.html',
    "<div class=clix-account-favorites><clix-account-header><header-text>Favorites</header-text></clix-account-header><div ng-if=!ready><clix-loader size=large></clix-loader></div><div class=favorites-page-content ng-show=ready><div class=clix-tabs><div class=mobile-tab-overlay ng-class=\"{'at-beginning': tabScrollStart === true, 'at-end': tabScrollEnd === true}\"></div><uib-tabset active=active><uib-tab index=0 heading=Stars><div class=favorites-tab-content><div ng-if=\"!celebrities || !celebrities.celebrities || celebrities.celebrities.length === 0\"><clix-empty-container><header-text>Your favorite Stars will appear here.</header-text><body-text>Browse through Stars and hit the <i class=\"empty-favorite-icon icon-favorite-icon\"></i> to add them to this list.</body-text><call-to-action-button><clix-primary-button ui-sref=stars>Go to Stars</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"celebrities && celebrities.celebrities && celebrities.celebrities.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Stars\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterStarsOptions sort-options=sortStarsOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=celebrities.celebrities large-col-class=col-lg-2-4><clix-star-content-callout star=item></clix-star-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></uib-tab><uib-tab index=1 heading=Brands><div class=favorites-tab-content><div ng-if=\"!brands || !brands.brands || brands.brands.length === 0\"><clix-empty-container><header-text>Your favorite Brands will appear here.</header-text><body-text>Browse through Brands &amp; Offers and hit the <i class=\"empty-favorite-icon icon-favorite-icon\"></i> to add them to this list.</body-text><call-to-action-button><clix-primary-button ui-sref=brands>Go to Brands & Offers</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"brands && brands.brands && brands.brands.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Brands\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterBrandsOptions sort-options=sortBrandsOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=brands.brands large-col-class=col-lg-2-4><clix-brand-content-callout brand=item></clix-brand-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></uib-tab><uib-tab index=2 heading=Charities><div class=favorites-tab-content><div ng-if=\"!charities || !charities.charities || charities.charities.length === 0\"><clix-empty-container><header-text>Your favorite Charities will appear here.</header-text><body-text>Browse through Charities and hit the <i class=\"empty-favorite-icon icon-favorite-icon\"></i> to add them to this list.</body-text><call-to-action-button><clix-primary-button ui-sref=charities>Go to Charities</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"charities && charities.charities && charities.charities.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Charities\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterCharitiesOptions sort-options=sortCharitiesOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=charities.charities large-col-class=col-lg-2-4><clix-charity-content-callout charity=item></clix-charity-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></uib-tab><uib-tab index=3 heading=Categories><div class=favorites-tab-content><div ng-if=\"!categories || !categories.categories || categories.categories.length === 0\"><clix-empty-container><header-text>Your favorite Categories will appear here.</header-text><body-text>Browse through Categories and hit the <i class=\"empty-favorite-icon icon-favorite-icon\"></i> to add them to this list.</body-text><call-to-action-button><clix-primary-button ui-sref=categories>Go to Categories</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"categories && categories.categories && categories.categories.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Categories\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterCategoriesOptions sort-options=sortCategoriesOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=categories.categories large-col-class=col-lg-2-4><clix-category-content-callout category=item></clix-category-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/account/notifications/view.notifications.html',
    "<div class=clix-account-notifications><clix-account-header><header-text>Notifications</header-text></clix-account-header><div ng-if=!notificationEnabled class=disabled-notifications-container><clix-empty-container><header-text>Notifications are coming soon!</header-text><body-text>Soon you will receive notifications on your<br>favorites and saved offers!</body-text></clix-empty-container></div><div class=notifications-container ng-if=notificationEnabled><div class=notifications-header>My Notifications</div><clix-notifications notifications=notifications></clix-notifications></div></div>"
  );


  $templateCache.put('ui/account/overview/view.overview-input.html',
    "<div class=personal-info-form-row><div class=form-header><div class=form-header-label ng-transclude=inputLabel></div><a ng-click=onFieldEdit() class=\"icon-edit-icon form-header-edit\" ng-hide=editing></a></div><div class=form-value-container><div ng-switch=type><div ng-switch-when=email><clix-form-input-error-field show-error=showEmailError><form-field><div class=form-value><input id=account-email ng-model=$parent.$parent.$parent.ngModel type=email ng-disabled=!editing placeholder=\"Enter email address\"></div></form-field><error-message>{{$parent.$parent.emailErrorMessage}}</error-message></clix-form-input-error-field><clix-form-input-error-field show-error=showEmailConfirmationError><form-field><div class=form-value ng-show=editing><input ng-model=$parent.$parent.$parent.emailConfirm type=email placeholder=\"Re-enter email address\"></div></form-field><error-message>{{$parent.$parent.emailConfirmationErrorMessage}}</error-message></clix-form-input-error-field></div><div ng-switch-when=password><clix-form-input-error-field show-error=showOldPasswordError><form-field><div class=form-value><input ng-model=$parent.$parent.$parent.ngModel type=password ng-disabled=!editing placeholder=\"Current password\"></div></form-field><error-message>{{$parent.$parent.oldPasswordErrorMessage}}</error-message></clix-form-input-error-field><clix-form-input-error-field show-error=showNewPasswordError><form-field><div class=form-value ng-show=editing><input ng-model=$parent.$parent.$parent.newPassword type=password placeholder=\"New password\"></div></form-field><error-message>{{$parent.$parent.newPasswordErrorMessage}}</error-message></clix-form-input-error-field><clix-form-input-error-field show-error=showNewPasswordConfirmError><form-field><div class=form-value ng-show=editing><input ng-model=$parent.$parent.$parent.newPasswordConfirm type=password placeholder=\"Re-enter new password\"></div></form-field><error-message>{{$parent.$parent.newPasswordConfirmErrorMessage}}</error-message></clix-form-input-error-field></div><div ng-switch-when=birthdate><div class=form-value ng-show=!editing><input ng-model=$parent.birthdateLabel type=text disabled=disabled></div><div class=form-value ng-show=editing><clix-datepicker-dropdowns ng-model=$parent.ngModel></clix-datepicker-dropdowns></div></div><div ng-switch-when=gender><div class=form-value ng-show=!editing><input ng-model=$parent.gender.label type=text disabled=disabled></div><div class=form-value ng-show=editing><clix-radio-button-group options=genders ng-model=$parent.gender></clix-radio-button-group></div></div><div ng-switch-when=phone><clix-form-input-error-field show-error=showPhoneError><form-field><div class=form-value><input ng-model=$parent.$parent.$parent.ngModel mask=\"(999) 999-9999\" restrict=reject type=text ng-disabled=!editing></div></form-field><error-message>{{$parent.$parent.phoneErrorMessage}}</error-message></clix-form-input-error-field></div><div ng-switch-default><div class=form-value><input ng-model=$parent.ngModel type=text ng-disabled=!editing></div></div></div><div class=form-error-message ng-class=\"{'active': formHasErrors}\">Please fix the errors in the highlighted fields above.</div><div class=form-value-buttons ng-show=editing><div class=form-value-button clix-secondary-button alternate=true ng-click=onCancelPress()>Cancel</div><div class=form-value-button ng-class=\"{'has-errors': formHasErrors}\" clix-secondary-button alternate=true ng-click=onSavePress()><span class=save-button-label>Save</span> <span class=\"save-button-error-label icon-remove-icon\"></span></div></div></div></div>"
  );


  $templateCache.put('ui/account/overview/view.overview.html',
    "<div class=clix-account-overview><clix-account-header><header-text>Account Overview</header-text></clix-account-header><div class=\"row body-content\"><div class=\"col-md-6 personal-info-container\"><div class=account-info-sub-header>Personal Information</div><div class=personal-info-form><clix-account-overview-input ng-model=form.firstName on-save=onSaveField><input-label>First Name</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.lastName on-save=onSaveField><input-label>Last Name</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.email on-save=onSaveField type=email><input-label>Email</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.password on-save=onSaveField type=password><input-label>Password</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.birthdate on-save=onSaveField type=birthdate><input-label>Date of Birth</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.gender on-save=onSaveField type=gender><input-label>Gender</input-label></clix-account-overview-input><clix-account-overview-input ng-model=form.phone on-save=onSaveField type=phone><input-label>Phone</input-label></clix-account-overview-input></div></div><div class=\"col-md-6 reward-points-container\"><div class=account-info-sub-header>Reward Points</div><div class=reward-points ng-show=pointsEnabled><div class=\"reward-points-block first-block\"><div class=points-label>1760</div><div class=available-balance-label>Available Points Balance<br>$17.60 Cash Balance</div></div><div class=rewards-button><clix-primary-button ui-sref=\"account({ section: 'rewards' })\" ui-sref-opts={reload:true}>Go To My Rewards</clix-primary-button></div></div><div class=reward-points ng-show=!pointsEnabled><div class=points-coming-soon-label>Rewards Points are Coming!<br>Please check back soon!</div><div class=available-balance-label>Available Points Balance<br>$0.00 Cash Balance</div><div class=rewards-button><clix-primary-button type=disabled>Redeem</clix-primary-button></div></div></div></div></div>"
  );


  $templateCache.put('ui/account/rewards/view.rewards.html',
    "<div class=clix-account-rewards><clix-account-header><header-text>Rewards</header-text></clix-account-header><div class=rewards-page-content ng-show=ready><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Summary><div class=rewards-tab-content><div class=\"row rewards-summary-row\"><div class=\"col-md-6 rewards-summary-column\"><div class=rewards-summary-block><div class=rewards-summary-header>Rewards Summary</div><div class=reward-points><div class=\"reward-points-block first-block\" ng-show=pointsEnabled><div class=points-label>1760</div><div class=available-balance-label>Available Points Balance<br>$17.60 Cash Balance</div><div class=rewards-button><clix-primary-button ng-click=onRedeemPress()>Redeem</clix-primary-button></div></div><div ng-show=!pointsEnabled><div class=points-coming-soon-label>Rewards Points are Coming! Please check back soon!</div><div class=available-balance-label>Available Points Balance<br>$0.00 Cash Balance</div><div class=rewards-button><clix-primary-button type=disabled>Redeem</clix-primary-button></div></div></div></div></div><div class=\"col-md-6 rewards-summary-column\"><div class=rewards-summary-block ng-if=pointsEnabled><div class=rewards-summary-header>Rewards Activity</div><div class=rewards-activity-container><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div></div><div class=rewards-activity-footer><clix-tertiary-button>See All Activity</clix-tertiary-button></div></div></div></div></div></uib-tab><uib-tab index=1 heading=Activity><div class=rewards-tab-content><div class=\"row rewards-summary-row\"><div class=\"col-md-6 rewards-summary-column\"><div class=rewards-summary-block><div class=rewards-summary-header>Rewards Summary</div><div class=reward-points><div class=\"reward-points-block first-block\" ng-show=pointsEnabled><div class=points-label>1760</div><div class=available-balance-label>Available Points Balance<br>$17.60 Cash Balance</div><div class=rewards-button><clix-primary-button ng-click=onRedeemPress()>Redeem</clix-primary-button></div></div><div ng-show=!pointsEnabled><div class=points-coming-soon-label>Rewards Points are Coming! Please check back soon!</div><div class=available-balance-label>Available Points Balance<br>$0.00 Cash Balance</div><div class=rewards-button><clix-primary-button type=disabled>Redeem</clix-primary-button></div></div></div></div></div></div></div></uib-tab><uib-tab index=2 heading=Redeem><div class=rewards-tab-content><div ng-if=pointsEnabled><p class=redeem-intro>Select your preferred method of redemption and you will be taken to the next page where you will choose your amount and redeem your reward points!</p><div class=\"row redeem-companies-container\"><div class=\"col-xs-6 col-sm-4 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('paypal')\"><div class=redeem-logo-container><img ng-src={{$root.clixConfig.baseImageUrl}}/paypal.png ng-srcset=\"{{$root.clixConfig.baseImageUrl}}/paypal@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>PayPal<br>&nbsp;</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('paypal')\">Redeem Now</a></div></div><div class=\"col-xs-6 col-sm-4 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('visa')\"><div class=redeem-logo-container><img ng-src={{$root.clixConfig.baseImageUrl}}/visa.png ng-srcset=\"{{$root.clixConfig.baseImageUrl}}/visa@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>Visa® Prepaid<br>Card USD^</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('visa')\">Redeem Now</a></div></div><div class=\"col-xs-6 col-sm-4 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('amazon')\"><div class=redeem-logo-container><img ng-src={{$root.clixConfig.baseImageUrl}}/amazon.png ng-srcset=\"{{$root.clixConfig.baseImageUrl}}/amazon@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>Amazon.com<br>Gift Card∞</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('amazon')\">Redeem Now</a></div></div></div><p class=redeem-legal>*PayPal is not a sponsor of the rewards or promotion or otherwise affiliated with this company. The logos and other identifying marks attached are trademarks of and owned by each represented company and/or its affiliates.  Please visit each company's website for additional terms and conditions.</p><p class=redeem-legal>^Card is issued by The Bancorp Bank, Member FDIC, pursuant to a license from Visa U.S.A. Inc.</p><p class=redeem-legal>This reward is non-refundable. The full terms and conditions are available on the Promocode claim site. Click on \"Product Terms\" prior to selecting a Virtual Visa Card or a Plastic Visa Card.  Swift Prepaid Solutions is the Service Provider for your Redemption Account and associated Card Accounts. Your Program Sponsor is the entity that marketed and/or distributed the reward, and is either a direct or indirect Client of Swift Prepaid.</p><p class=redeem-legal>∞Amazon.com is not a sponsor of this promotion. Except as required by law, Amazon.com Gift Cards (\"GCs\") cannot be transferred for value or redeemed for cash. GCs may be used only for purchases of eligible goods on Amazon.com or certain of its affiliated websites. GCs cannot be redeemed for purchases of gift cards. Purchases are deducted from the GC balance. To redeem or view a GC balance, visit \"Your Account\" on Amazon.com. Amazon is not responsible if a GC is lost, stolen, destroyed or used without permission. For complete terms and conditions, see www.amazon.com/gc-legal. GCs are issued by ACI Gift Cards, Inc., a Washington corporation. All Amazon ®, ™ & © are IP of Amazon.com, Inc. or its affiliates. No expiration date or service fees.</p></div><div ng-if=!pointsEnabled><div class=\"row rewards-summary-row\"><div class=\"col-md-6 rewards-summary-column\"><div class=rewards-summary-block><div class=rewards-summary-header>Rewards Summary</div><div class=reward-points><div class=points-coming-soon-label>Rewards Points are Coming! Please check back soon!</div><div class=available-balance-label>Available Points Balance<br>$0.00 Cash Balance</div><div class=rewards-button><clix-primary-button type=disabled>Redeem</clix-primary-button></div></div></div></div></div></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/account/saved-offers/view.saved-offers.html',
    "<div class=clix-account-saved-offers><clix-account-header><header-text>Saved Offers</header-text></clix-account-header><div class=saved-offers-page-content ng-show=ready><div ng-if=\"!offers || !offers.offers || offers.offers.length === 0\"><clix-empty-container><header-text>Your Saved Offers will appear here.</header-text><body-text>Browse through Brands &amp; Offers and hit the <i class=\"empty-add-icon icon-redeem-plus-icon\"></i> to add them to this list.</body-text></clix-empty-container></div><div ng-if=\"offers && offers.offers && offers.offers.length > 0\"><clix-filter-page partial=true><page-search-filter><clix-search-filter search-placeholder=\"Search Saved Offers\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterSavedOffersOptions sort-options=sortSavedOffersOptions></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=offers.offers large-col-class=col-lg-2-4 menu-items=menuItems><clix-offer-content-callout offer=item></clix-offer-content-callout></clix-content-callout-list></page-content></clix-filter-page></div></div></div>"
  );


  $templateCache.put('ui/account/settings/view.settings.html',
    "<div class=clix-account-settings><clix-account-header><header-text>Settings</header-text></clix-account-header><div class=settings-page-content><div ng-if=!ready><clix-loader size=large></clix-loader></div><div ng-if=ready><div class=setting-row ng-repeat=\"setting in generalSettings | orderBy: 'order'\"><div class=setting-row-info><div class=setting-row-title>{{setting.title}}</div><div class=setting-row-description>{{setting.description}}</div></div><div class=setting-row-trigger><switch ng-model=setting.enabled class=setting-switch ng-change=settingChange(setting)></switch></div></div><div class=settings-subtitle><clix-account-header><header-text>Your ClixTV</header-text></clix-account-header></div><div class=setting-row ng-repeat=\"setting in accountSettings | orderBy: 'order'\"><div class=setting-row-info><div class=setting-row-title>{{setting.title}}</div><div class=setting-row-description>{{setting.description}}</div></div><div class=setting-row-trigger><switch ng-model=setting.enabled class=setting-switch ng-change=settingChange(setting)></switch></div></div><div class=settings-subtitle><clix-account-header><header-text>Notifications</header-text></clix-account-header></div><div class=\"setting-row notifications-setting-row\"><div class=setting-row-info><div class=setting-row-title>Send Notifications</div><div class=setting-row-description>How we will keep you Up-To-Date</div></div><div class=\"row setting-notification-container\"><div class=\"col-sm-6 setting-email-container\"><div class=notification-label>Email</div><clix-checkbox ng-model=enableEmailNotifications></clix-checkbox><div class=setting-notification-profile-container><div class=setting-notification-profile-label><clix-account-overview-input ng-model=loggedInUser.email on-save=onSaveField type=email><input-label>Email</input-label></clix-account-overview-input></div><div class=setting-notification-profile-desc>Modifying your email address here will change the email address for your account.</div></div></div><div class=\"col-sm-6 setting-text-push-container\"><div class=row><div class=\"col-xs-6 setting-text-container\"><div class=notification-label>Text</div><clix-checkbox ng-model=enableTextNotifications></clix-checkbox></div><div class=\"col-xs-6 setting-push-container\"><div class=notification-label>Push</div><clix-checkbox ng-model=enablePushNotifications></clix-checkbox></div></div><div class=setting-notification-profile-container><div class=setting-notification-profile-label><clix-account-overview-input ng-model=loggedInUser.phone on-save=onSaveField type=phone><input-label>Phone</input-label></clix-account-overview-input></div></div><div class=setting-notification-profile-desc>Modifying your phone number here will change the phone number for your account.</div></div></div></div></div></div></div>"
  );


  $templateCache.put('ui/account/view.account.html',
    "<div class=clix-account-page><div class=account-navigation><clix-navigation-bar active-item=activeItem on-item-select=onNavigationItemSelect></clix-navigation-bar></div><div class=account-page ng-switch=activeItem ng-if=ready><div ng-switch-when=overview><clix-account-overview></clix-account-overview></div><div ng-switch-when=watchlist><clix-account-watchlist></clix-account-watchlist></div><div ng-switch-when=favorites><clix-account-favorites></clix-account-favorites></div><div ng-switch-when=saved-offers><clix-account-saved-offers></clix-account-saved-offers></div><div ng-switch-when=rewards><clix-account-rewards></clix-account-rewards></div><div ng-switch-when=notifications><clix-account-notifications></clix-account-notifications></div><div ng-switch-when=settings><clix-account-settings></clix-account-settings></div></div></div>"
  );


  $templateCache.put('ui/account/watchlist/view.watchlist.html',
    "<div class=clix-account-watchlist><clix-account-header><header-text>Watchlist</header-text><accessory-view><div class=filter-containers ng-show=\"watchlist && watchlist.videos && watchlist.videos.length > 0 && filtersEnabled !== false\"><div class=filter-container><clix-dropdown options=filterOptions placeholder-text=\"Filter By\"></clix-dropdown></div><div class=filter-container><clix-dropdown options=sortOptions placeholder-text=\"Sort By\"></clix-dropdown></div></div></accessory-view></clix-account-header><div ng-if=!ready><clix-loader size=large></clix-loader></div><div class=watchlist-container ng-show=ready><div ng-if=\"!watchlist || !watchlist.videos || watchlist.videos.length === 0\"><clix-empty-container><header-text>Videos that you would like to watch later will appear here.</header-text><body-text>Browse through videos and hit the <i class=\"empty-watchlist-icon icon-redeem-plus-icon\"></i> to add them to this list.<br></body-text><call-to-action-button><clix-primary-button ui-sref=home>Go to Home Page</clix-primary-button></call-to-action-button></clix-empty-container></div><div ng-if=\"watchlist && watchlist.videos && watchlist.videos.length > 0\"><clix-video-content-callout-list videos=watchlist.videos grid-classes=\"col-xs-6 col-sm-4 col-md-4 col-lg-3\"></clix-video-content-callout-list></div></div></div>"
  );


  $templateCache.put('ui/brand/view.brand.html',
    "<div ng-if=!configs><clix-loader size=large></clix-loader></div><div class=brand-page ng-if=configs><clix-landing-page-banner background-image={{brand.headerImage}} mobile-background-image={{$root.clixConfig.baseImageUrl}}/mobile-brand-cover.jpg><banner-type>Brand</banner-type><banner-title>{{brand.title}}</banner-title><banner-sub-title>{{brand.totalOffers || '0'}} {{brand.totalOffers === 1 ? 'Offer' : 'Offers'}}</banner-sub-title><banner-logo-container><clix-brand-asset-logo brand=brand></clix-brand-asset-logo></banner-logo-container><banner-button-container><div clix-tooltip-trigger tooltip-id=landing-banner-favorite-{{brand.id}}><clix-tertiary-button ng-click=onFavoritePress()>{{isFavorite ? 'Added to Favorites' : 'Favorite'}}</clix-tertiary-button></div></banner-button-container><banner-share-button-container><div clix-tooltip-trigger tooltip-id=landing-banner-share-{{brand.id}}><clix-share-button extra-class=banner-share-icon brand=brand></clix-share-button><clix-points-violator>50</clix-points-violator></div></banner-share-button-container></clix-landing-page-banner><div class=brand-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Home select=\"onTabSelect('home')\"><div class=home-container><clix-landing-video-content video=video><content-description><clix-secondary-header>About {{configs.title}}</clix-secondary-header><div class=home-description ng-bind-html=\"configs.description | clixNewLineBreak\"></div></content-description><sidebar-title>Offers From {{configs.title}}</sidebar-title><sidebar-content><div class=\"row brand-offer-row\"><div class=\"col-xs-6 col-sm-3 col-md-3 col-lg-12 brand-offer-column\" ng-repeat=\"offer in brand.offers.offers | limitTo: 3\"><div class=brand-offer><clix-offer-content-callout offer=offer ng-click=onOfferPress(offer)></clix-offer-content-callout></div></div></div></sidebar-content><footer-content><div class=brand-categories-container><clix-secondary-header>Brand Categories <i class=icon-right-arrow></i></clix-secondary-header><div class=brand-category-logo-container><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Sportswear></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Shoes></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=Swimwear></clix-brand-category-logo></div><div class=brand-category-logo><clix-brand-category-logo brand=video category-title=\"Training & Gym\"></clix-brand-category-logo></div></div></div><div class=brand-celebrity-videos><div ng-repeat=\"celebrity in brand.celebrities.celebrities | limitTo: 3\"><clix-video-category-scroll-list category-title=\"{{celebrity.name}} and {{brand.title}}\" category-videos=celebrity.videos.videos enable-show-more=false order=episodeNumber></clix-video-category-scroll-list></div></div></footer-content><share-tooltip-content><div ng-if=pointsEnabled><div ng-if=loggedInUser>You will receive 50 Reward Points for sharing!</div><div ng-if=!loggedInUser>After signing up, you will receive 50 Reward Points for sharing! <a clix-learn-more-modal-trigger>Learn More</a>.</div></div><div ng-if=!pointsEnabled>Coming Soon! You will receive Reward Points for sharing. <a clix-learn-more-modal-trigger>Learn More</a>.</div></share-tooltip-content><share-icon><clix-share-button extra-class=landing-share-icon brand=brand></clix-share-button></share-icon></clix-landing-video-content></div></uib-tab><uib-tab index=1 heading=Offers select=\"onTabSelect('offers')\"><div class=\"row clix-block-row offers-container\"><div class=\"clix-block-item col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"offer in brand.offers.offers\"><clix-offer-content-callout offer=offer ng-click=onOfferPress(offer)></clix-offer-content-callout></div></div></uib-tab><uib-tab index=2 heading=Stars select=\"onTabSelect('stars')\"><div class=stars-container><div ng-repeat=\"celebrity in brand.celebrities.celebrities\"><clix-video-category-scroll-list category-title=\"{{celebrity.name}} and {{brand.title}}\" category-videos=celebrity.videos.videos enable-show-more=false order=episodeNumber></clix-video-category-scroll-list></div></div></uib-tab><uib-tab index=3 heading=Videos select=\"onTabSelect('videos')\"><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>All Videos Related To {{brand.title}}</clix-secondary-header></div><div class=video-sort-container ng-show=\"filtersEnabled !== false\"><clix-dropdown options=seriesList placeholder-text=\"Sort By\"></clix-dropdown></div></div><clix-video-content-callout-list videos=brand.videos.videos grid-classes=\"col-xs-6 col-sm-4 col-md-4 col-lg-2-4\"></clix-video-content-callout-list></div></uib-tab></uib-tabset></div></div></div><clix-tooltip tooltip-id=landing-banner-favorite-{{brand.id}}>{{loggedInUser ? ((isFavorite) ? 'Remove this brand from your Favorites' : 'Add this brand to your Favorites.') : 'After signing up, you will be able to add this brand to your Favorites.'}}</clix-tooltip><clix-tooltip tooltip-id=landing-banner-share-{{brand.id}}>Share this page</clix-tooltip>"
  );


  $templateCache.put('ui/brand/view.brands.html',
    "<div ng-if=!ready><clix-loader size=large></clix-loader></div><div class=brands-page ng-if=ready><div class=main-header><clix-main-header>Brands &amp; Offers</clix-main-header></div><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Brands select=\"onTabSelect('brands')\"><div class=search-filter-container><clix-search-filter search-placeholder=\"Search Brands\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterBrandsOptions sort-options=sortBrandsOptions type=brand></clix-search-filter></div><div class=\"row brands-list\" infinite-scroll=loadMoreBrands() infinite-scroll-disabled=brandsloading infinite-scroll-distance=1><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"brand in brands.brands\"><clix-brand-content-callout brand=brand></clix-brand-content-callout></div></div></uib-tab><uib-tab index=1 heading=Offers select=\"onTabSelect('offers')\"><div class=search-filter-container><clix-search-filter search-placeholder=\"Search Offers\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterOffersOptions sort-options=sortOffersOptions type=offer></clix-search-filter></div><div class=\"row brands-list\" infinite-scroll=loadMoreOffers() infinite-scroll-disabled=offersloading infinite-scroll-distance=1><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"offer in offers.offers\"><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></uib-tab></uib-tabset></div></div>"
  );


  $templateCache.put('ui/buttons/view.callout-button.html',
    "<div class=clix-callout-button ng-class=\"{'secondary-callout': colorType === 'secondary'}\"><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/buttons/view.primary-button.html',
    "<div class=clix-primary-button ng-class=\"{'button-facebook': type === 'facebook', 'button-google': type === 'google', 'button-charity': type === 'charity', 'circle-button': circle === 'true', 'disabled-button': type === 'disabled', 'hidden-button-content': loading}\"><div class=primary-button-content><div ng-transclude></div></div><div class=primary-button-loader ng-class=\"{'active-button-loader': loading}\"><clix-loader size=extra-small></clix-loader></div></div>"
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
    "<div ng-if=!category><clix-loader size=large></clix-loader></div><div class=clix-category-page ng-if=category><clix-landing-page-banner background-image={{category.headerImage}} mobile-background-image={{category.logo}}><banner-type>Category</banner-type><banner-title>{{category.title}}</banner-title><banner-sub-title>{{category.totalVideos || '0'}} {{category.totalVideos === 1 ? 'Video' : 'Videos'}}</banner-sub-title><banner-logo-container><img ng-src={{category.logo}}></banner-logo-container><banner-button-container><clix-tertiary-button ng-click=onFavoritePress()>{{isFavorite ? 'Added to Favorites' : 'Favorite'}}</clix-tertiary-button></banner-button-container></clix-landing-page-banner><div class=category-page-container><div class=category-page-content><div class=\"category-list-container hidden-sm hidden-xs hidden-md\"><div class=category-list-content><div class=category-list-title>More Categories</div><ul class=category-list><li ng-repeat=\"relatedCategory in categories.categories | orderBy: 'order'\" class=category-list-item ng-class=\"{'active-category': relatedCategory.title === category.title}\"><a ui-sref=\"category({ slug: '{{relatedCategory.title | slug}}' })\" ng-if=\"relatedCategory.videos &&relatedCategory.videos.videos && relatedCategory.videos.videos.length !== 0\">{{relatedCategory.title}}</a></li></ul></div></div><div class=category-content><div class=category-filter-bar><div class=\"category-filter-container row\" ng-class=\"{'hidden-category-filters': (!category.videos.videos || category.videos.videos.length === 0 || filtersEnabled === false)}\"><div class=\"filter-container col-xs-6\"><clix-dropdown options=filterOptions placeholder-text=\"Filter By\"></clix-dropdown></div><div class=\"filter-container col-xs-6\"><clix-dropdown options=sortOptions placeholder-text=\"Sort By\"></clix-dropdown></div></div></div><div class=empty-videos ng-if=\"!category.videos || !category.videos.videos || category.videos.videos.length === 0\"><div class=empty-category-container><div class=\"category-icon icon-lifestyle-icon\"></div><div class=empty-category-title>{{category.title}} videos are coming soon!</div><clix-is-logged-in><logged-in><div class=empty-category-desc>ClixTV can let you know when new<br>content is uploaded into this category!</div><div class=empty-category-notify-container><div class=empty-category-notify><div class=empty-category-notify-label>Notify Me!</div><div class=empty-category-switch><clix-switch ng-model=notify></clix-switch></div></div></div><div class=manage-settings-container><a ui-sref=\"account({ section: 'settings' })\">Manage notification settings</a></div></logged-in><not-logged-in><div class=empty-category-desc>Sign up now to make sure you are<br>notified when videos become available!</div><div class=authentication-container><clix-primary-button ng-click=onSignupPress()>Sign Up Now</clix-primary-button><div class=log-in-button><a ng-click=onLoginPress()>Log In Now</a></div></div></not-logged-in></clix-is-logged-in></div></div><clix-video-content-callout-list videos=category.videos.videos></clix-video-content-callout-list></div></div></div></div>"
  );


  $templateCache.put('ui/categories/view.video-category-scroll-list.html',
    "<div class=video-category-scroll-list><h2><a ui-sref=\"category({ slug: '{{category.title | slug}}' })\" ng-show=\"category.headerLink !== false\">{{category.title}} <i class=icon-right-arrow></i> </a><span ng-show=\"category.headerLink === false\">{{category.title}} <i class=icon-right-arrow></i></span></h2><div class=category-container><div class=\"visible-sm visible-md visible-lg\"><slick slides-to-scroll=3 infinite=false variable-width=true prev-arrow=#carousel-previous-{{$id}} next-arrow=#carousel-next-{{$id}} settings=carouselConfig><div ng-repeat=\"video in category.videos.videos | orderBy: order track by video.id\" class=video-content-container style=\"width: {{videoContainerWidth}}px\"><clix-video-content-callout video=video></clix-video-content-callout></div></slick></div><div class=\"hidden-sm hidden-md hidden-lg\"><div class=\"row video-list-content-container\"><div ng-repeat=\"video in category.videos.videos | orderBy: order | limitTo: 4 track by video.id\" class=\"video-thumbnail-container col-xs-6 col-sm-4 col-md-4\"><clix-video-content-callout video=video></clix-video-content-callout></div></div><div class=more-videos-button-container><clix-secondary-button ui-sref={{sref}} ng-show=\"enableShowMore !== 'false'\">View All {{category.title}}</clix-secondary-button></div></div><div class=\"arrow-container left-arrow-container\" id=carousel-previous-{{$id}} ng-show=leftArrowVisible><div class=arrow-inner-container><i class=\"arrow-icon icon-left-tall-arrow\"></i></div></div><div class=\"arrow-container right-arrow-container\" id=carousel-next-{{$id}}><div class=arrow-inner-container><i class=\"arrow-icon icon-right-tall-arrow\"></i></div></div></div></div>"
  );


  $templateCache.put('ui/charity/view.charities.html',
    "<div ng-if=!charities><clix-loader size=large></clix-loader></div><div class=charities-page><clix-filter-page ng-if=charities><page-title>Charities</page-title><page-search-filter><clix-search-filter search-placeholder=\"Search Charities\" filter-placeholder=\"Filter By\" sort-placeholder=\"Sort By\" filter-options=filterCharitiesOptions sort-options=sortCharitiesOptions type=charity></clix-search-filter></page-search-filter><page-content><clix-content-callout-list items=charities.charities menu-items=menuItems><clix-charity-content-callout charity=item></clix-charity-content-callout></clix-content-callout-list></page-content></clix-filter-page></div>"
  );


  $templateCache.put('ui/charity/view.charity.html',
    "<div ng-if=!charity><clix-loader size=large></clix-loader></div><div class=charity-page ng-if=charity><clix-landing-page-banner background-image={{charity.headerImage}} mobile-background-image={{$root.clixConfig.baseImageUrl}}/mobile-charity-cover.jpg><banner-type>Charity</banner-type><banner-title>{{charity.title}}</banner-title><banner-sub-title>{{charity.totalVideos || '0'}} {{charity.totalVideos === 1 ? 'Video' : 'Videos'}}</banner-sub-title><banner-logo-container><clix-charity-asset-logo charity=charity></clix-charity-asset-logo></banner-logo-container><banner-button-container><div clix-tooltip-trigger tooltip-id=landing-banner-favorite-{{charity.id}}><clix-tertiary-button ng-click=onFavoritePress()>{{isFavorite ? 'Added to Favorites' : 'Favorite'}}</clix-tertiary-button></div></banner-button-container><banner-share-button-container><div clix-tooltip-trigger tooltip-id=landing-banner-share-{{charity.id}}><clix-share-button extra-class=banner-share-icon charity=charity></clix-share-button></div></banner-share-button-container></clix-landing-page-banner><div class=charity-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Home select=\"onTabSelect('home')\"><div class=home-container><clix-landing-video-content video=video charity=true><content-description><div class=charity-description-container><clix-secondary-header>About {{charity.title}}</clix-secondary-header><div class=home-description ng-bind-html=\"charity.description | clixNewLineBreak\"></div><div class=donate-button><clix-primary-button type=charity ng-click=onDonatePress()>Donate</clix-primary-button></div></div></content-description><sidebar-title>Stars Who Support {{charity.title}}</sidebar-title><sidebar-content><div class=\"row brand-offer-row\"><div class=\"col-xs-6 col-sm-4 col-md-3 col-lg-12 brand-offer-column\" ng-repeat=\"celebrity in charity.celebrities.celebrities | limitTo: 3\"><div class=star-support-callout><clix-star-content-callout star=celebrity></clix-star-content-callout></div></div></div></sidebar-content><footer-content><div class=home-footer-content><div class=brand-celebrity-videos><div ng-repeat=\"celebrity in charity.celebrities.celebrities | limitTo: 3\"><clix-video-category-scroll-list category-title=\"{{celebrity.name}} and {{charity.title}}\" category-videos=celebrity.videos.videos view-all-sref=\"star({ slug: '{{celebrity.name | slug}}' })\" order=episodeNumber></clix-video-category-scroll-list></div></div></div></footer-content></clix-landing-video-content></div></uib-tab><uib-tab index=2 heading=Stars select=\"onTabSelect('stars')\"><div class=stars-container><div ng-repeat=\"celebrity in charity.celebrities.celebrities\"><clix-video-category-scroll-list category-title=\"{{celebrity.name}} and {{charity.title}}\" category-videos=celebrity.videos.videos view-all-sref=\"star({ slug: '{{celebrity.name | slug}}' })\" order=episodeNumber></clix-video-category-scroll-list></div></div></uib-tab><uib-tab index=3 heading=Videos select=\"onTabSelect('videos')\"><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>All Videos Related To {{charity.title}}</clix-secondary-header></div><div class=video-sort-container ng-show=\"filtersEnabled !== false\"><clix-dropdown options=seriesList placeholder-text=\"Sort By\"></clix-dropdown></div></div><clix-video-content-callout-list videos=charity.videos.videos grid-classes=\"col-xs-6 col-sm-4 col-md-4 col-lg-2-4\"></clix-video-content-callout-list></div></uib-tab></uib-tabset></div></div></div><clix-tooltip tooltip-id=landing-banner-favorite-{{charity.id}}>{{loggedInUser ? (isFavorite ? 'Remove this charity from your Favorites.' : 'Add this charity to your Favorites.') : 'After signing up, you will be able to add this charity to your Favorites.'}}</clix-tooltip><clix-tooltip tooltip-id=landing-banner-share-{{charity.id}}>Share this page</clix-tooltip>"
  );


  $templateCache.put('ui/clix-sec-block/clix-sec-block.html',
    "<div class=BOOP></div>"
  );


  $templateCache.put('ui/common/account/view.account-header.html',
    "<div class=clix-account-header><div class=row><div class=header-text ng-class=\"{'col-md-6': accessoryViewFilled, 'col-md-12': !accessoryViewFilled}\"><div ng-transclude=headerText></div></div><div class=\"accesory-view col-md-6\" ng-if=accessoryViewFilled><div ng-transclude=accessoryView></div></div></div></div>"
  );


  $templateCache.put('ui/common/banners/view.home-page-banner.html',
    "<div class=clix-home-page-banner><div class=\"desktop-home-banner hidden-xs\"><div id=videoPlayer></div></div><div class=\"mobile-home-banner visible-xs\"><img ng-src={{$root.clixConfig.baseImageUrl}}/giphy-downsized-large.gif class=home-banner-background></div><div class=home-banner-overlay></div><div class=home-banner-content><div class=clixtv-originals-container><span class=clixtv-title-logo>ClixTV</span> Originals</div><div class=banner-main-header>Your Stars!<br>Their Passions.</div><div class=banner-subheader>Premium content from your favorite stars.</div><a ng-click=onSignupPress() class=primary-button ng-show=!loggedInUser>Sign Up Free</a></div></div>"
  );


  $templateCache.put('ui/common/banners/view.landing-page-banner.html',
    "<div class=clix-landing-page-banner><div class=placeholder-container><div class=placeholder><clix-placeholder></clix-placeholder></div></div><div class=\"landing-banner-background hidden-xs\" clix-background-image={{backgroundImage}} du-parallax y=background></div><div class=\"landing-banner-background visible-xs\" clix-background-image=\"{{mobileBackgroundImage || backgroundImage}}\"></div><div class=landing-banner-overlay></div><div class=landing-banner-content><div class=banner-logo ng-transclude=bannerLogoContainer></div><div class=banner-type ng-transclude=bannerType></div><div class=banner-title ng-transclude=bannerTitle></div><div class=\"banner-subtitle visible-xs\" ng-transclude=bannerSubTitle></div><div class=banner-buttons-container><div class=\"banner-button banner-favorite-button\" ng-transclude=bannerButtonContainer></div><div class=\"banner-button banner-share-button\" ng-transclude=bannerShareButtonContainer ng-if=shareButtonProvided></div><div class=\"banner-subtitle hidden-xs\" ng-transclude=bannerSubTitle></div></div></div></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.brand-category-logo.html',
    "<div class=clix-brand-category-logo><div class=logo-image style=\"background-image: url('{{brand.ProfilePicture.url}}')\"></div><div class=logo-category-title>{{categoryTitle}}</div><div class=logo-category-violator clix-tooltip-trigger tooltip-id=tooltip-{{$id}}><clix-points-violator>50</clix-points-violator></div><clix-tooltip tooltip-id=tooltip-{{$id}}><clix-is-logged-in><logged-in>You will receive 50 Reward Points for viewing this category!</logged-in><not-logged-in>After you sign up, you will receive 50 Reward Points for viewing this category! <a ng-click=\"\">Learn more</a>.</not-logged-in></clix-is-logged-in></clix-tooltip></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.brand-charity-logo.html',
    "<div class=clix-brand-charity-logo ng-show=ready><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><img ng-src={{brand.transparentThumbnail}} class=reference-image clix-on-image-load=onImageLoad($event)> <a ui-sref=\"brand({ slug: '{{brand.title | slug}}' })\" class=logo-image style=\"background-image: url('{{brand.transparentThumbnail}}')\"></a><div class=logo-points clix-tooltip-trigger tooltip-id=tooltip-{{$id}}><clix-points-violator>50</clix-points-violator></div><div class=logo-overlay ng-show=hoverEnabled></div><clix-tooltip tooltip-id=tooltip-{{$id}}><div ng-if=pointsEnabled><clix-is-logged-in><logged-in>You will receive 50 Reward Points for viewing this brand!</logged-in><not-logged-in>After you sign up, you will receive 50 Reward Points for viewing this brand! <a clix-learn-more-modal-trigger>Learn More</a>.</not-logged-in></clix-is-logged-in></div><div ng-if=!pointsEnabled>Coming Soon! You will receive Reward Points just for viewing this brand. <a clix-learn-more-modal-trigger>Learn More</a>.</div></clix-tooltip></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.charity-logo.html',
    "<div class=clix-charity-logo ng-show=ready><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><img ng-src={{charity.transparentThumbnail}} class=reference-image clix-on-image-load=onImageLoad($event)><div class=logo-image style=\"background-image: url('{{charity.transparentThumbnail}}')\"></div><div class=logo-overlay><a ui-sref=\"charity({ slug: '{{charity.title | slug}}' })\" class=hit-area></a> <a ui-sref=\"charity({ slug: '{{charity.title | slug}}' })\" class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></a><div class=logo-save><clix-favorite-button></clix-favorite-button></div><div class=logo-ellipsis><div class=menu-icon-container ng-click=menuClicked($event) clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></div></div></div></div>"
  );


  $templateCache.put('ui/common/brand-charity-logo/view.offer-logo.html',
    "<div class=clix-offer-logo ng-show=ready><img ng-src={{offer.thumbnail}} class=reference-image clix-on-image-load=onImageLoad($event)><div class=offer-background-image style=\"background-image: url('{{offer.thumbnail}}')\"></div><clix-tooltip-menu items=items menuopen=menuVisible class=logo-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=logo-overlay-image></div><div class=logo-icon style=\"background-image: url('{{offer.transparentThumbnail}}')\"></div><div class=logo-points clix-tooltip-trigger tooltip-id=tooltip-{{$id}}><clix-points-violator>50</clix-points-violator></div><clix-tooltip tooltip-id=tooltip-{{$id}}><div ng-if=pointsEnabled><clix-is-logged-in><logged-in>You will receive 50 Reward Points for viewing this offer!</logged-in><not-logged-in>After you sign up, you will receive 50 Reward Points for viewing this offer! <a clix-learn-more-modal-trigger>Learn More</a>.</not-logged-in></clix-is-logged-in></div><div ng-if=!pointsEnabled>Coming Soon! You will receive Reward Points for viewing this offer. <a clix-learn-more-modal-trigger>Learn More</a>.</div></clix-tooltip></div>"
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
    "<clix-content-callout sref=\"brand({ slug: '{{brand.title | slug}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('brand', brand)\" is-favorited=\"isFavoriteContent('brand', brand)\" type=brand entity=brand><header-element><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></header-element><title-content>{{brand.title}}</title-content><subtitle-content>{{brand.totalOffers || '0'}} {{brand.totalOffers === 1 ? 'Offer' : 'Offers'}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.category-content-callout.html',
    "<clix-content-callout sref=\"category({ slug: '{{category.title | slug}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('category', category)\" is-favorited=\"isFavoriteContent('category', category)\" type=category entity=category><header-element><div class=category-logo style=\"background-image: url('{{category.logo}}')\"></div></header-element><title-content>{{category.title}}</title-content><subtitle-content>{{category.totalVideos || '0'}} {{category.totalVideos === 1 ? 'Video' : 'Videos'}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.charity-content-callout.html',
    "<clix-content-callout sref=\"charity({ slug: '{{charity.title | slug}}', starId: '{{star.id}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('charity', charity)\" is-favorited=\"isFavoriteContent('charity', charity)\" type=charity entity=charity><header-element><clix-charity-logo charity=charity></clix-charity-logo></header-element><title-content>{{charity.title}}</title-content><subtitle-content>{{charity.totalVideos || '0'}} {{charity.totalVideos === 1 ? 'Video' : 'Videos'}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.content-callout-list.html',
    "<div class=\"row brands-list\"><div class=\"brand-outer-container col-xs-6 col-sm-4 col-md-3 {{largeColClass || 'col-lg-2'}}\" ng-repeat=\"item in items | orderBy: 'order'\" clix-transclude-inject></div></div>"
  );


  $templateCache.put('ui/common/container/view.content-callout.html',
    "<div class=clix-content-callout><div class=header-callout-container><div class=placeholder-container><div class=placeholder><clix-placeholder></clix-placeholder></div></div><a ui-sref={{sref}} class=header-container ng-transclude=headerElement></a><clix-tooltip-menu items=menuItems menuopen=menuVisible class=overlay-menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-overlay><a ui-sref={{sref}} class=hit-area></a> <a ui-sref={{sref}} class=view-button-container><div class=view-button><clix-view-button text=Go></clix-view-button></div></a><div class=header-save ng-click=onFavorite() clix-tooltip-trigger tooltip-id=favorites-button-{{$id}}><clix-favorite-button is-favorite=isFavorited ng-show=\"addButton !== 'true'\"></clix-favorite-button><clix-save-button is-saved=isFavorited ng-show=\"addButton === 'true'\"></clix-save-button></div><div class=header-ellipsis clix-tooltip-trigger tooltip-id=actions-button-{{$id}}><div class=menu-icon-container ng-click=menuClicked($event) clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></div></div><clix-tooltip tooltip-id=favorites-button-{{$id}}>{{isFavorited ? (removeFavoriteTooltip || 'Remove from favorites') : (addFavoriteTooltip || 'Add to favorites')}}</clix-tooltip><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip></div></div><a ui-sref={{sref}} class=callout-footer-container><span class=callout-title ng-transclude=titleContent></span> <span class=callout-subtitle ng-transclude=subtitleContent></span></a></div>"
  );


  $templateCache.put('ui/common/container/view.empty-container.html',
    "<div class=clix-empty-container><div class=empty-icon>!</div><div class=header-text><div ng-transclude=headerText></div></div><div class=body-text><div ng-transclude=bodyText></div></div><div class=call-to-action-container><div ng-transclude=callToActionButton></div></div></div>"
  );


  $templateCache.put('ui/common/container/view.offer-content-callout.html',
    "<clix-content-callout sref=\"brand-offer({ slug: '{{offer.campaign.title | slug}}', offerSlug: '{{offer.title | slug}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('offer', offer)\" is-favorited=\"isFavoriteContent('offer', offer)\" add-button=true add-favorite-tooltip=\"Add to saved offers\" remove-favorite-tooltip=\"Remove from saved offers\" type=offer entity=offer><header-element><clix-offer-logo offer=offer></clix-offer-logo></header-element><title-content>{{offer.title}}</title-content><subtitle-content><div class=offer-campaign-title>{{offer.campaign.title}}</div><div ng-if=offer.expirationDate>Expires {{offer.expirationDate | clixDate}}</div><div ng-if=!offer.expirationDate>Limited Time Offer</div></subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.star-content-callout.html',
    "<clix-content-callout sref=\"star({ slug: '{{star.name | slug}}' })\" menu-items=menuItems on-favorite=\"onFavoritePress('celebrity', star)\" is-favorited=\"isFavoriteContent('celebrity', star)\" type=star entity=star><header-element><div class=star-logo style=\"background-image: url({{star.thumbnail}})\"></div></header-element><title-content>{{star.name}}</title-content><subtitle-content>{{star.totalVideos || '0'}} {{star.totalVideos === 1 ? 'Video' : 'Videos'}}</subtitle-content></clix-content-callout>"
  );


  $templateCache.put('ui/common/container/view.video-content-callout-list.html',
    "<div class=\"clix-video-content-callout-list row\"><div class=\"video-content-callout-item {{gridClasses || 'col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2'}}\" ng-repeat=\"video in videos | orderBy: ['seriesTitle', 'episodeNumber']\"><clix-video-content-callout video=video></clix-video-content-callout></div></div>"
  );


  $templateCache.put('ui/common/container/view.video-content-callout.html',
    "<div class=clix-video-content-callout ng-class=\"{'active': overlayActive, 'minimized': minimized === 'true'}\"><div class=placeholder-container><div class=placeholder><clix-placeholder></clix-placeholder></div></div><div class=video-thumbnail-background style=\"background-image: url('{{video.thumbnail}}')\"></div><div class=video-content-container><div class=video-menu-container><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu></div><div class=star-info-container><div class=star-info-background style=\"background-image: url('{{video.thumbnail}}')\"></div><div class=star-info><a ui-sref=\"star({ slug: '{{video.celebrity.name | slug}}' })\" class=star-avatar style=\"background-image: url('{{video.celebrity.thumbnail}}')\"></a> <a ui-sref=\"star({ slug: '{{video.celebrity.name | slug}}' })\" class=star-name>{{video.celebrity.name}}</a><div clix-tooltip-trigger tooltip-id=actions-button-{{$id}}><a class=video-menu-icon ng-click=menuClicked() clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></a></div></div></div><div class=video-info-container><div class=video-episode-number>Episode {{video.episodeNumber}}:</div><div class=video-episode-title>{{video.title}}</div><div class=video-series-title>{{video.seriesTitle}} Series</div><div class=video-episode-runtime>{{video.runtime}}</div><div class=brands-container><div class=brand-icon ng-repeat=\"brand in video.brands.brands | limitTo: 4 track by $index\" style=\"background-image: url('{{brand.transparentThumbnail}}')\"></div><div class=brand-icon style=\"background-image: url('{{video.charity.transparentThumbnail}}')\"></div></div></div><div class=video-content-overlay ng-class=\"{'active': overlayActive}\" ng-click=onClick($event) ng-mousemove=onMouseover() ng-mouseleave=onMouseleave()><a class=video-watchlist-button ng-class=\"{'icon-redeem-plus-icon': !isOnWatchlist, 'icon-remove-icon remove-icon': isOnWatchlist}\" clix-tooltip-trigger tooltip-id=watchlist-button-{{$id}} ng-click=onWatchlistPress()></a><div class=video-play-button><a ui-sref=\"video({ slug: '{{video.seriesTitle + ' ' + video.title | slug}}' })\"><img ng-src={{$root.clixConfig.baseImageUrl}}/gradient-clix-player-icon.svg></a></div></div><div class=video-points-container clix-tooltip-trigger tooltip-id=signup-watch-points-{{$id}}><div ng-mouseenter=onMouseover() ng-mouseleave=onMouseleave()><clix-violator>100 Reward Points</clix-violator></div></div></div><div class=video-hidden-container ng-if=videoUnavailable><div class=video-hidden-inner-container><div class=video-hidden-content><div class=video-hidden-content-border></div><div class=video-hidden-title><span ng-bind-html=\"'Unlock this episode'\"></span><br>Sign up for a free ClixTV account!</div><div class=video-hidden-signup-button><a ng-click=onSignupPress() class=primary-button>Sign Up Now</a></div><div class=video-hidden-login-container><a ng-click=onLoginPress() class=video-hidden-login>Log In Now</a></div><div class=video-hidden-content-border></div></div></div></div></div><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip><clix-tooltip tooltip-id=watchlist-button-{{$id}}>{{isOnWatchlist ? 'Remove from your watchlist' : 'Add to your Watchlist'}}</clix-tooltip><clix-tooltip tooltip-id=signup-watch-points-{{$id}}><div ng-if=pointsEnabled><clix-is-logged-in><logged-in>You will receive 100 Reward Points for watching this video!</logged-in><not-logged-in>After you sign up, you will receive 100 Reward Points for watching this video! <a clix-learn-more-modal-trigger>Learn More</a>.</not-logged-in></clix-is-logged-in></div><div ng-if=!pointsEnabled>Coming Soon! You will receive Reward Points for watching this video. <a clix-learn-more-modal-trigger>Learn More</a>.</div></clix-tooltip>"
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


  $templateCache.put('ui/common/image/lazy-loader/view.lazy-loader.html',
    "<div class=clix-lazy-loader in-view=\"containerInView($inview, $inviewInfo)\"><div class=lazy-loader-container><img ng-src={{$root.clixConfig.baseImageUrl}}/clixtv-loader-logo.svg class=lazy-loader-placeholder ng-if=\"showPlaceholder !== 'false'\"> <img ng-src={{imageToLoad}} class=lazy-loader-hidden-image clix-on-image-load=onImageLoad()><div class=lazy-loader-image style=\"background-image: url('{{imageToLoad}}')\" ng-class=\"{'image-loaded': imageLoaded}\"></div></div></div>"
  );


  $templateCache.put('ui/common/loader/view.loader.html',
    "<div class=clix-loader><div class=loader-icon ng-class=\"{'loader-extra-small': size === 'extra-small', 'loader-small': size === 'small', 'loader-medium': size === 'medium', 'loader-large': size === 'large'}\"></div></div>"
  );


  $templateCache.put('ui/common/logos/view.brand-logo.html',
    "<div class=\"clix-asset-logo clix-brand-logo\" ng-class=\"{'minimized': minimized === 'true'}\"><div class=clix-logo-content-container style=\"background-image: url('{{brand.transparentThumbnail}}')\"></div></div>"
  );


  $templateCache.put('ui/common/logos/view.charity-logo.html',
    "<div class=\"clix-asset-logo clix-charity-logo\" ng-class=\"{'minimized': minimized === 'true'}\"><div class=clix-logo-content-container style=\"background-image: url('{{charity.transparentThumbnail}}')\"></div></div>"
  );


  $templateCache.put('ui/common/modal/alert/view.alert-modal.html',
    "<clix-message-modal><modal-title>{{title}}</modal-title><modal-body><div ng-bind-html=message></div></modal-body><modal-confirm-button><clix-primary-button ng-click=onCloseButtonPress()>Done</clix-primary-button></modal-confirm-button></clix-message-modal>"
  );


  $templateCache.put('ui/common/modal/confirmation/view.confirmation-modal.html',
    "<clix-message-modal><modal-title>{{title}}</modal-title><modal-body>{{message}}</modal-body><modal-cancel-button><clix-secondary-button alternate=true ng-click=onCloseButtonPress()>Cancel</clix-secondary-button></modal-cancel-button><modal-confirm-button><clix-primary-button ng-click=onConfirmButtonPress()>Remove</clix-primary-button></modal-confirm-button></clix-message-modal>"
  );


  $templateCache.put('ui/common/modal/donate/view.donate.html',
    "<clix-modal modal-title=\"{{state === 'buy' ? 'Buy Points' : 'Donate Points'}}\"><div class=clix-donate-modal><div class=clix-donate-modal-header><div class=stepper-container-container ng-class=\"{'buy-more-points-input-container': state === 'buy'}\"><div ng-show=\"state !== 'buy'\"><clix-number-stepper></clix-number-stepper><div class=donate-stepper-label>Available Cash Balance 1760 Points Balance</div></div><div ng-show=\"state === 'buy'\"><div class=buy-points-input-container ng-click=onBuyPointsContainerPress()><span class=buy-points-symbol>$ </span><input type=text ng-pattern=/^[0-9,]*$/ id=buyPointsInput ng-model=buyPointsModel ng-blur=onBuyPointsBlur(buyPointsModel) style=\"min-width: 35px\" pu-elastic-input-width-delta=5px pu-elastic-input clix-max-length=8> <span class=buy-points-cents>.00</span></div><div class=buy-points-input-label>Input amount to apply to points</div><div class=\"buy-points-input-label buy-points-input-sublabel\">Each dollar equals one point.</div></div></div></div><div class=buy-more-points-container ng-class=\"{'buy-more-points-credit-card': state === 'buy'}\"><div ng-show=pointsEnabled><div ng-show=\"state !== 'buy'\"><div class=buy-points-label>Want to buy more points?</div><clix-secondary-button ng-click=onBuyPointsPress()>Buy Points Here</clix-secondary-button></div><div ng-show=\"state === 'buy'\"><div class=credit-card-form><div class=credit-card-label>Credit Card <i class=\"lock-icon icon-icon-security-lock\"></i></div><div class=\"input-container-row row\"><div class=\"input-container col-sm-6\"><input type=text> <span class=input-container-label>Credit card number</span></div><div class=\"input-container col-xs-5 col-sm-3\"><input type=text> <span class=input-container-label>CCV <i class=\"info-icon icon-info-icon\"></i></span></div><div class=\"input-container col-xs-5 col-sm-3\"><input type=text> <span class=input-container-label>Expiration date</span></div></div><div class=\"input-container-row row\"><div class=\"input-container col-sm-8\"><input type=text> <span class=input-container-label>Name (As shown on card)</span></div><div class=\"input-container col-xs-6 col-sm-4\"><input type=text> <span class=input-container-label>Zip/Postal code</span></div></div></div></div></div><div ng-show=!pointsEnabled><div class=points-coming-soon-label>Rewards Points are coming! Please check back soon!</div></div></div><div class=donate-footer><div ng-if=pointsEnabled><clix-checkbox label-text=\"I accept the Terms and Conditions\"></clix-checkbox></div><div class=\"row donate-footer-buttons hidden-xs hidden-sm\" ng-show=\"state === 'buy'\"><div class=\"col-sm-6 donate-footer-button\"><a ng-click=onBackPress() class=donate-cancel-button>Back</a></div><div class=\"col-sm-6 donate-footer-button\"><clix-primary-button ng-click=onDonatePress()>Complete Purchase</clix-primary-button></div></div><div class=\"row donate-footer-buttons buy-mobile-footer-buttons visible-sm visible-xs\" ng-show=\"state === 'buy'\"><div class=\"col-sm-6 donate-footer-button\"><div class=buy-mobile-footer-button><clix-primary-button ng-click=onDonatePress()>Complete Purchase</clix-primary-button></div></div><div class=\"col-sm-6 donate-footer-button\"><div class=buy-mobile-footer-button><a ng-click=onBackPress() class=donate-cancel-button>Back</a></div></div></div><div class=\"row donate-footer-buttons\" ng-show=\"state !== 'buy'\"><div class=\"col-xs-6 donate-footer-button\"><a ng-click=onCancelPress() class=donate-cancel-button ng-if=pointsEnabled>Cancel</a></div><div class=\"col-xs-6 donate-footer-button\"><div ng-if=pointsEnabled><clix-primary-button ng-click=onDonatePress()>Donate Now</clix-primary-button></div><div ng-if=!pointsEnabled><a ng-click=onCancelPress() class=donate-cancel-button>Cancel</a></div></div></div></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/education/view.education-modal.html',
    "<clix-modal modal-title={{title}}><div ng-if=!ready><clix-loader size=small></clix-loader></div><div ng-if=ready class=clix-education-modal><div class=education-modal-message ng-switch=type><div ng-switch-when=watchlist><clix-is-logged-in><logged-in>This video has been saved to your watchlist, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save a video to your watchlist.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=brand><clix-is-logged-in><logged-in>This brand has been saved to your favorites, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=charity><clix-is-logged-in><logged-in>This charity has been saved to your favorites, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=category><clix-is-logged-in><logged-in>This category has been saved to your favorites, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=celebrity><clix-is-logged-in><logged-in>This star has been saved to your favorites, available in your \"My ClixTV\" section.</logged-in><not-logged-in>You need to sign up for a free ClixTV account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=offer><div ng-if=pointsEnabled><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>Congratulations! You've just received 50 reward points!<br><br>This offer has been saved to your offers, available in your \"My ClixTV\" section.</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>You missed out on 100 reward points! To earn rewards for watching, saving, clicking and sharing, sign up for a free ClixTV account!</not-logged-in></clix-is-logged-in></div><div ng-if=!pointsEnabled><div class=education-modal-icon clix-trophy-indicator-icon></div>Reward Points are coming soon! When they are ready, you will receive points for saving this offer!</div></div><div ng-switch-when=offer-view><div ng-if=pointsEnabled><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>You received 50 Reward Points, just for visiting this offer. Save the offer to receive even more!</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>You missed out on 50 reward points! To earn rewards for watching, saving, clicking and sharing, sign up for a free ClixTV account!</not-logged-in></clix-is-logged-in></div><div ng-if=!pointsEnabled><div class=education-modal-icon clix-trophy-indicator-icon></div>Reward Points are coming soon! When they are ready, you will receive points for clicking on this offer!</div></div><div ng-switch-when=learn-more><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>ClixTV will reward you for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badges, points can be earned.</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>After you sign up, ClixTV will reward you for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badges, points can be earned.</not-logged-in></clix-is-logged-in><div class=learn-more-violators-container><div class=learn-more-violator><clix-points-violator>50</clix-points-violator></div><div class=learn-more-violator><clix-violator>100 Reward Points</clix-violator></div></div><p>ClixTV reward points have a cash value that you can use toward goods and services.</p></div><div ng-switch-when=signup-offer><div class=education-modal-icon clix-error-indicator-icon></div>You need to have an account with us to view offers! Sign up for a free account!</div><div ng-switch-when=notifications-coming-soon><div class=notification-coming-soon-header>Notifications are coming soon!</div>Go ahead and set things up, that way you’ll be ready once we have notifications up and running!</div><div ng-switch-when=anonymous-liked-video><div class=education-modal-icon clix-error-indicator-icon></div>You need to have an account with us to like episodes! Sign up for a free account!</div></div><div class=\"row education-modal-footer\"><div class=\"col-sm-5 save-preference-checkbox-container\"><clix-is-logged-in><logged-in><div ng-switch=type><div ng-switch-when=learn-more></div><div ng-switch-when=signup-offer></div><div ng-switch-when=anonymous-liked-video></div><div ng-switch-default><clix-checkbox ng-model=showAgainModel on-checkbox-change=onShowAgainChange(showAgainModel) label-text=\"{{type === 'notifications-coming-soon' ? 'Don\\'t show this again' : 'Don\\'t show this type again'}}\"></clix-checkbox></div></div></logged-in><not-logged-in><div ng-switch=type><div ng-switch-when=learn-more></div><div ng-switch-when=signup-offer></div><div ng-switch-when=anonymous-liked-video></div><div ng-switch-when=offer-view><clix-checkbox ng-model=showAgainModel on-checkbox-change=onShowAgainChange(showAgainModel) label-text=\"Don't show this type again\"></clix-checkbox></div></div></not-logged-in></clix-is-logged-in></div><div class=\"col-sm-7 buttons-container\"><div class=\"button-container left-button-container\"><clix-secondary-button alternate=true ng-click=onCloseButtonPress(false)>Got it!</clix-secondary-button></div><div class=\"button-container right-button-container\"><clix-is-logged-in><not-logged-in><clix-primary-button ng-click=onSignUpPress()>Sign Up Now</clix-primary-button><a class=login-button ng-click=onLoginPress()>Log In Now</a></not-logged-in><logged-in><div ng-switch=type><div ng-switch-when=watchlist><clix-primary-button ui-sref=\"account({ section: 'watchlist' })\" ng-click=onCloseButtonPress(true)>Go to my Watchlist</clix-primary-button></div><div ng-switch-when=brand><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'brand' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=charity><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'charity' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=category><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'category' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=celebrity><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'star' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=offer><clix-primary-button ui-sref=\"account({ section: 'saved-offers' })\" ng-click=onCloseButtonPress(true)>Go to my Saved Offers</clix-primary-button></div></div></logged-in></clix-is-logged-in></div></div></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/login-signup/view.login-signup.html',
    "<clix-modal><a ng-click=onCloseIconPress() class=\"icon-remove-icon clix-modal-close\"></a><div class=signup-modal ng-show=signup><div class=signup-modal-header><div class=\"header-logo-icon icon-colorful-clix-logo\" ng-if=!isBeta></div><img ng-src={{$root.clixConfig.baseImageUrl}}/clixtv-logo-horizontal-beta.svg class=header-logo-icon ng-if=isBeta></div><div class=signup-modal-social><div class=social-modal-row><clix-primary-button type=facebook ng-click=onFacebookLoginPress()>Sign Up With Facebook</clix-primary-button></div><div class=social-modal-row><clix-primary-button type=google ng-click=onGoogleLoginPress()>Sign Up With Google</clix-primary-button></div><div class=or-email-container><span>or with email</span></div></div><form ng-submit=onSignupSubmit()><div class=signup-modal-form><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=Email name=email ng-model=signupModel.email></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=\"Re-Enter Email\" name=email-confirm ng-model=signupModel.emailConfirm></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=\"Choose Password\" name=password ng-model=signupModel.password></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=\"Re-Enter Password\" name=password-confirm ng-model=signupModel.passwordConfirm></div></div><div class=signup-modal-form-row><i class=\"form-icon large icon-full-name-input-icon\"></i><div class=signup-modal-input><input id=first-name type=text placeholder=\"First Name\" name=first-name ng-model=signupModel.firstName> <input type=text placeholder=\"First Name\" name=real-first-name ng-model=signupModel.realFirstName></div></div><div class=signup-modal-form-row><i class=\"form-icon large icon-full-name-input-icon\"></i><div class=signup-modal-input><input type=text placeholder=\"Last Name\" name=last-name ng-model=signupModel.lastName></div></div></div></form><div class=error-message ng-if=error>{{error}}</div><div class=signup-modal-submit><div class=submit-button><clix-primary-button type=normal ng-click=onSignupSubmit()>Sign Up</clix-primary-button></div><div class=login-container>Have an account? <a ng-click=onLoginPress()>Log in</a></div></div><div class=signup-modal-footer>By signing in, you agree to our <a ui-sref=terms-of-use>Terms of Use</a> and <a ui-sref=privacy-policy>Privacy Policy</a></div></div><div class=signup-modal ng-hide=signup><div class=signup-modal-header><div class=\"header-logo-icon icon-colorful-clix-logo\" ng-if=!isBeta></div><img ng-src={{$root.clixConfig.baseImageUrl}}/clixtv-logo-horizontal-beta.svg class=header-logo-icon ng-if=isBeta></div><div class=signup-modal-social><div class=social-modal-row><clix-primary-button type=facebook ng-click=onFacebookLoginPress()>Log In With Facebook</clix-primary-button></div><div class=social-modal-row><clix-primary-button type=google ng-click=onGoogleLoginPress()>Log In With Google</clix-primary-button></div><div class=or-email-container><span>or with email</span></div></div><form ng-submit=onLoginSubmit() class=signup-modal-form><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=Email ng-model=loginModel.email></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=Password ng-model=loginModel.password></div></div><input type=submit></form><div class=error-message ng-if=error>{{error}}</div><div class=signup-modal-submit><div class=submit-button><clix-primary-button type=normal ng-click=onLoginSubmit()>Log In</clix-primary-button></div><div class=login-container>Don't have an account? <a ng-click=onSignupPress()>Sign up</a></div></div><div class=signup-modal-footer>By signing in, you agree to our <a ui-sref=terms-of-use>Terms of Use</a> and <a ui-sref=privacy-policy>Privacy Policy</a></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/offer/view.offer-modal.html',
    "<clix-modal modal-title=&nbsp;><div class=clix-offer-modal><a ng-click=onClosePress() class=close-modal-icon><div class=icon-remove-icon></div></a><div ng-if=!offer><clix-loader size=small></clix-loader></div><div ng-if=offer><div class=\"offer-image-info-container row\"><div class=offer-background-image style=\"background-image: url('{{offer.carouselPic1}}')\"></div><div class=col-sm-6><slick dots=true prev-arrow=#main-carousel-previous next-arrow=#main-carousel-next><div class=offer-image-container ng-if=offer.carouselPic1><img ng-src={{offer.carouselPic1}} class=offer-image></div><div class=offer-image-container ng-if=offer.carouselPic2><img ng-src={{offer.carouselPic2}} class=offer-image></div><div class=offer-image-container ng-if=offer.carouselPic3><img ng-src={{offer.carouselPic3}} class=offer-image></div></slick><div id=main-carousel-previous><div class=\"main-carousel-button hidden-sm hidden-xs hidden-md\"><i class=\"arrow-icon icon-left-tall-arrow\"></i></div></div><div id=main-carousel-next><div class=\"main-carousel-button hidden-sm hidden-xs hidden-md\"><i class=\"arrow-icon icon-right-tall-arrow\"></i></div></div></div><div class=col-sm-6><div class=offer-expiration-date><span ng-if=offer.expirationDate>Offer Expires {{offer.expirationDate | clixDate : 'long'}} </span><span ng-if=!offer.expirationDate>Limited Time Offer</span></div><div class=offer-title>{{offer.title}}</div><div ng-if=offer.couponCode class=offer-coupon-code ngclipboard data-clipboard-text={{offer.couponCode}} ngclipboard-success=onCopyToClipboardSuccess(e);><div clix-tooltip-trigger tooltip-id=code-copied click-trigger=true>{{offer.couponCode}}</div></div><div class=instructions-title>Instructions</div><div class=instructions-container ng-bind-html=\"offer.instructions | clixNewLineBreak\"></div></div></div><div class=\"offer-buttons-container row\"><div class=col-sm-4><div class=offer-button><clix-tertiary-button ng-click=onSaveOfferPress()>{{isSavedOffer ? 'Offer Saved' : 'Save Offer'}}</clix-tertiary-button><div class=violator-container><clix-points-violator>50</clix-points-violator></div></div></div><div class=col-sm-4><div class=offer-button><clix-tertiary-button ng-click=onOfferRedeemPress()>Redeem Offer</clix-tertiary-button><div class=violator-container><clix-points-violator>50</clix-points-violator></div></div></div><div class=col-sm-4><div class=offer-share><clix-share-button offer=offer></clix-share-button><clix-points-violator>50</clix-points-violator></div></div></div><div class=offer-description-container><div class=offer-description ng-bind-html=\"offer.longDescription || offer.description | clixNewLineBreak\"></div></div></div></div><clix-tooltip tooltip-id=code-copied>Copied to your clipboard</clix-tooltip></clix-modal>"
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


  $templateCache.put('ui/common/modal/share/view.share-modal-connect-button.html',
    "<div class=clix-share-modal-connect-button><div class=share-modal-connect-button-content ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-modal-offer-content.html',
    "<div class=clix-share-modal-offer-content><clix-generic-share-content><share-icon-container><div class=clix-thumbnail-logo><clix-offer-logo offer=offer></clix-offer-logo></div></share-icon-container><share-title>{{offer.title}}</share-title><share-description>{{offer.description | wordTruncate : 275}}</share-description><share-footer-title>ClixTV</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-modal-video-content.html',
    "<div class=clix-share-modal-video-content><div class=\"row share-modal-video-row\"><div class=\"col-sm-5 video-thumbnail-container\"><img ng-src={{video.thumbnail}} class=video-thumbnail></div><div class=\"col-sm-7 video-info-container\"><div class=series-title>Episode {{video.episodeNumber}}: {{video.title}}</div><div class=episode-title>{{video.seriesTitle || video.series.title}} Series</div><div class=\"celebrity-title hidden-sm hidden-xs\">{{video.celebrity.name}}</div><div class=\"video-description hidden-sm hidden-xs\">{{video.description | wordTruncate : 120}}</div><div class=\"video-description visible-sm visible-xs\">{{video.description}}</div><div class=\"video-clix-tv hidden-sm hidden-xs\">ClixTV</div></div></div></div>"
  );


  $templateCache.put('ui/common/modal/share/view.share-settings.html',
    "<clix-modal modal-title=\"Share Settings\"><div class=clix-share-settings-modal><div class=share-settings-row><div class=\"social-network-icon-container facebook-social-network\"><i class=\"icon-facebook-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-7\">Connect your Facebook account</div><div class=\"social-network-connect-button col-sm-5\"><clix-share-modal-connect-button>Connect</clix-share-modal-connect-button></div></div></div><div class=share-settings-row><div class=\"social-network-icon-container twitter-social-network\"><i class=\"icon-twitter-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-7\">Connect your Twitter account</div><div class=\"social-network-connect-button col-sm-5\"><clix-share-modal-connect-button>Connect</clix-share-modal-connect-button></div></div></div><div class=share-settings-row><div class=\"social-network-icon-container tumblr-social-network\"><i class=\"icon-tumblr-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-7\">Connect your Tumblr account</div><div class=\"social-network-connect-button col-sm-5\"><clix-share-modal-connect-button>Connect</clix-share-modal-connect-button></div></div></div><div class=share-settings-footer>We will never store your password.</div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/share/view.share.html',
    "<clix-modal><div class=clix-share-modal><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=\"Post To\" select=\"onTabPress('post')\"><div class=modal-post-content><div ng-if=video><clix-share-modal-video-content video=video></clix-share-modal-video-content></div><div ng-if=celebrity><clix-share-modal-celebrity-content celebrity=celebrity></clix-share-modal-celebrity-content></div><div ng-if=offer><clix-share-modal-offer-content offer=offer></clix-share-modal-offer-content></div><div ng-if=brand><clix-share-modal-brand-content brand=brand></clix-share-modal-brand-content></div><div ng-if=charity><clix-share-modal-charity-content charity=charity></clix-share-modal-charity-content></div></div></uib-tab><uib-tab index=1 heading=\"Send To...\" select=\"onTabPress('send')\"><div class=modal-send-content><div ng-if=video><clix-share-modal-video-content video=video></clix-share-modal-video-content></div><div ng-if=celebrity><clix-share-modal-celebrity-content celebrity=celebrity></clix-share-modal-celebrity-content></div><div ng-if=offer><clix-share-modal-offer-content offer=offer></clix-share-modal-offer-content></div><div ng-if=brand><clix-share-modal-brand-content brand=brand></clix-share-modal-brand-content></div><div ng-if=charity><clix-share-modal-charity-content charity=charity></clix-share-modal-charity-content></div></div></uib-tab></uib-tabset><div class=share-modal-footer><div ng-show=\"tab === 'post'\"><div class=clix-share-modal-textbox><textarea>{{shareContent}}</textarea></div><div class=share-modal-post-container><div class=share-modal-social-networks><div class=share-modal-post-to-label>Post to</div><a class=\"social-network-icon-container facebook-social-network\" ng-click=\"onSocialNetworkPress('facebook')\" ng-class=\"{'active': socialNetworks.indexOf('facebook') !== -1}\"><i class=\"icon-facebook-logo social-network-icon\"></i> </a><a class=\"social-network-icon-container twitter-social-network\" ng-click=\"onSocialNetworkPress('twitter')\" ng-class=\"{'active': socialNetworks.indexOf('twitter') !== -1}\"><i class=\"icon-twitter-logo social-network-icon\"></i> </a><a class=\"social-network-icon-container tumblr-social-network\" ng-click=\"onSocialNetworkPress('tumblr')\" ng-class=\"{'active': socialNetworks.indexOf('tumblr') !== -1}\"><i class=\"icon-tumblr-logo social-network-icon\"></i></a></div></div></div><div ng-show=\"tab === 'send'\"><div class=clix-share-modal-input><input placeholder=\"example@example.com, example@example.com, ...\" ng-model=form.emails></div><div class=\"clix-share-modal-textbox send-textbox\"><textarea ng-model=form.message></textarea></div><div class=\"share-modal-post-container share-modal-copy-link-container\" class=share-modal-copy-link ngclipboard data-clipboard-text={{link}}><div class=share-modal-copy-link clix-tooltip-trigger tooltip-id=link-copied click-trigger=true>Copy {{type}} Link</div></div></div><div class=\"row footer-modal-buttons-container\"><div class=\"col-xs-6 footer-modal-button\"><a class=cancel-button ng-click=onCancelPress()>{{showBackButton ? 'Back' : 'Cancel'}}</a></div><div class=\"col-xs-6 footer-modal-button\"><clix-primary-button ng-show=\"tab === 'send'\" ng-click=onSendPress() loading=sending>Send</clix-primary-button><clix-primary-button ng-show=\"tab === 'post'\" ng-click=onPostPress() loading=sending>Post</clix-primary-button></div></div></div></div></div><clix-tooltip tooltip-id=link-copied>Copied to your clipboard</clix-tooltip></clix-modal>"
  );


  $templateCache.put('ui/common/modal/view.message-modal.html',
    "<clix-modal extra-modal-class=clix-message-modal><div class=clix-modal-header ng-transclude=modalTitle></div><div class=message-modal-body><div ng-transclude=modalBody></div></div><div class=message-modal-footer><div class=buttons-container><div class=button-container><div ng-transclude=modalCancelButton></div></div><div class=button-container><div ng-transclude=modalConfirmButton></div></div></div></div></clix-modal>"
  );


  $templateCache.put('ui/common/modal/view.modal.html',
    "<div class=\"clix-modal {{extraModalClass}}\"><a ng-click=onBackButtonPress() ng-show=showBackButton class=modal-back-button><div class=icon-left-tall-arrow></div></a><div class=clix-modal-header ng-show=modalTitle>{{modalTitle}}</div><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/navigation/view.mobile-navigation.html',
    "<div class=mobile-search-container ng-show=searchVisible><div class=mobile-search clix-site-search is-visible=searchVisible></div><div class=mobile-search-background ng-click=onMobileBackgroundPress()></div></div><div class=\"visible-sm visible-xs visible-md\"><div class=clix-mobile-navigation ng-hide=modalOpen><div class=mobile-navigation-container><div ng-mouseup=\"go('home')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'home'}\"><div class=navigation-icon ng-class=\"{\n" +
    "                    'icon-home-icon-bottom-nav': selectedStateName !== 'home',\n" +
    "                    'icon-home-icon-active-bottom-nav': selectedStateName === 'home'\n" +
    "                }\"></div>Home</div><div ng-mouseup=\"go('categories')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'categories' || selectedStateName === 'category'}\"><div class=navigation-icon ng-class=\"{\n" +
    "                    'icon-categories-icon-active-bottom-nav': (selectedStateName === 'categories' || selectedStateName === 'category'),\n" +
    "                    'icon-categories-icon-bottom-nav': (selectedStateName !== 'categories' && selectedStateName !== 'category')\n" +
    "                }\"></div>Categories</div><div ng-mouseup=\"go('stars')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'stars' || selectedStateName === 'star'}\"><div class=navigation-icon ng-class=\"{\n" +
    "                    'icon-star-icon-active-bottom-nav': (selectedStateName === 'stars' || selectedStateName === 'star'),\n" +
    "                    'icon-stars-icon': (selectedStateName !== 'stars' && selectedStateName !== 'star')\n" +
    "                }\"></div>Stars</div><div ng-mouseup=\"go('brands')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'brands' || selectedStateName === 'brand'}\"><div class=\"navigation-icon brands-navigation-icon\" ng-class=\"{\n" +
    "                    'icon-brands-icon-active-bottom-nav active-brand-icon': (selectedStateName === 'brands' || selectedStateName === 'brand'),\n" +
    "                    'icon-brands-icon-bottom-nav': (selectedStateName !== 'brands' && selectedStateName !== 'brand')\n" +
    "                }\"></div>Brands</div><div ng-mouseup=\"go('charities')\" class=mobile-navigation-item ng-class=\"{'active': selectedStateName === 'charities' || selectedStateName === 'charity'}\"><div class=navigation-icon ng-class=\"{\n" +
    "                    'icon-charities-icon-active-bottom-nav': (selectedStateName === 'charities' || selectedStateName === 'charity'),\n" +
    "                    'icon-charities-icon-bottom-nav': (selectedStateName !== 'charities' && selectedStateName !== 'charity')\n" +
    "                }\"></div>Charities</div><div ng-mouseup=onSearchPress($event) class=mobile-navigation-item><div class=\"navigation-icon icon-search-icon-bottom-nav\"></div>Search</div></div></div></div>"
  );


  $templateCache.put('ui/common/navigation/view.navigation-bar.html',
    "<div class=clix-navigation-bar><div class=\"avatar-container empty-avatar\"><div ng-if=loggedInUser.avatar><div class=avatar-background-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div><div class=avatar-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div></div><div ng-if=!loggedInUser.avatar><div class=avatar-background></div><div class=avatar-image style=\"background-image: url('{{$root.clixConfig.baseImageUrl}}/empty-profile-picture.png')\"></div></div><div class=name-container><div class=display-name>{{loggedInUser.displayName}}</div><div class=my-clixtv>My ClixTV</div></div></div><nav class=navigation-list><a ng-click=\"onItemSelect('overview')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'overview'}\"><div class=navigation-list-icon><i class=icon-account-icon></i></div><div class=navigation-list-label>Account</div></a><a ng-click=\"onItemSelect('watchlist')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'watchlist'}\"><div class=navigation-list-icon><i class=icon-redeem-plus-icon></i></div><div class=navigation-list-label>Watchlist</div></a><a ng-click=\"onItemSelect('favorites')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'favorites'}\"><div class=navigation-list-icon><i class=icon-favorite-icon></i></div><div class=navigation-list-label>Favorites</div></a><a ng-click=\"onItemSelect('saved-offers')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'saved-offers'}\"><div class=navigation-list-icon><i class=icon-offers-icon></i></div><div class=navigation-list-label>Saved Offers</div></a><a ng-click=\"onItemSelect('rewards')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'rewards'}\"><div class=navigation-list-icon><i class=icon-rewards-icon-left-nav></i></div><div class=navigation-list-label>Rewards</div></a><a ng-click=\"onItemSelect('notifications')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'notifications'}\"><div class=navigation-list-icon><i class=icon-notifications-icon-left-nav></i></div><div class=navigation-list-label>Notifications</div></a><a ng-click=\"onItemSelect('settings')\" class=navigation-list-item ng-class=\"{'active-item': activeItem === 'settings'}\"><div class=navigation-list-icon><i class=icon-settings-icon-left-nav></i></div><div class=navigation-list-label>Settings</div></a></nav></div>"
  );


  $templateCache.put('ui/common/navigation/view.right-navigation.html',
    "<div class=clix-right-navigation ng-class=\"{'active': open}\"><div class=navigation-background-overlay ng-click=onBackgroundPress() ng-class=\"{'active': visible}\"></div><div class=navigation-bar ng-class=\"{'active': visible}\"><div class=navigation-bar-content><a ng-click=onClosePress() class=navigation-close-icon><div class=icon-right-tall-arrow></div></a><div class=\"avatar-container empty-avatar\"><div ng-if=loggedInUser.avatar><div class=avatar-background-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div><div class=avatar-image style=\"background-image: url('{{loggedInUser.avatar}}')\"></div></div><div ng-if=!loggedInUser.avatar><div class=avatar-background></div><div class=avatar-image style=\"background-image: url('{{$root.clixConfig.baseImageUrl}}/empty-profile-picture.png')\"></div><div class=camera-icon-container><i class=icon-profile-camera></i></div></div><div class=name-container><div class=display-name>{{loggedInUser.displayName}}</div><div class=my-clixtv>My ClixTV</div></div></div><nav class=navigation-list><a ng-click=\"goToAccount('overview')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-account-icon></i></div><div class=navigation-list-label>Account</div></a><a ng-click=\"goToAccount('watchlist')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-redeem-plus-icon></i></div><div class=navigation-list-label>Watchlist</div></a><a ng-click=\"goToAccount('favorites')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-favorite-icon></i></div><div class=navigation-list-label>Favorites</div></a><a ng-click=\"goToAccount('saved-offers')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-offers-icon></i></div><div class=navigation-list-label>Saved Offers</div></a><a ng-click=\"goToAccount('rewards')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-rewards-icon-left-nav></i></div><div class=navigation-list-label>Rewards</div></a><a ng-click=\"goToAccount('notifications')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-notifications-icon-left-nav></i></div><div class=navigation-list-label>Notifications</div></a><a ng-click=\"goToAccount('settings')\" class=navigation-list-item><div class=navigation-list-icon><i class=icon-settings-icon-left-nav></i></div><div class=navigation-list-label>Settings</div></a></nav><div class=logout-button-container><clix-secondary-button ng-click=onLogoutPress()>Log Out</clix-secondary-button></div></div></div></div>"
  );


  $templateCache.put('ui/common/notifications/view.notification-item.html',
    "<div class=notification-item ng-class=\"{'minimal-notification-item': minify === 'true'}\"><a ui-sref=\"star({ id: '57dacf46ef97110300fe5366' })\" class=notification-thumbnail style=\"background-image: url('http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/57dacf46ef97110300fe5366/kyrie_irving3.png')\"></a><div class=notification-content-container><div class=notification-subject><a ui-sref=\"star({ id: '57dacf46ef97110300fe5366' })\" class=notification-author-name>{{notification.subject}}</a> added a new video: &ldquo;<a ui-sref=\"video({ id: '57d587cf5877ef0300727bc9' })\">{{notification.message}}</a>&rdquo;.</div><div class=notification-timestamp-container><div class=notification-timestamp><i class=\"notification-icon icon-stars-icon\"></i> 2 Hours Ago</div><div class=notification-points-container><clix-violator>100 Reward Points</clix-violator></div></div></div><a ng-click=onNotificationMenuPress(notification) clix-click-anywhere-else=bodyClicked class=notification-more-icon-container><i class=\"notification-more-icon icon-ellipsis\" clix-tooltip-trigger tooltip-id=actions-button-{{$id}}></i></a><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip></div>"
  );


  $templateCache.put('ui/common/notifications/view.notification-tooltip.html',
    "<div class=clix-notification-tooltip><div class=notification-tooltip-header>Notifications</div><div class=disabled-notifications-container ng-if=!notificationEnabled><div class=disabled-notifications-header>Notifications are<br>coming soon!</div><div class=disabled-notifications-body>Soon you will receive notifications on your favorites and saved offers!</div></div><div ng-if=notificationEnabled><clix-notifications notifications=notifications minify=true></clix-notifications></div></div>"
  );


  $templateCache.put('ui/common/notifications/view.notifications.html',
    "<div class=clix-notifications><div class=notification-item-container ng-repeat=\"notification in notifications.notifications\"><clix-notification-item notification=notification minify={{minify}}></clix-notification-item></div></div>"
  );


  $templateCache.put('ui/common/notifications/view.site-notification-bar.html',
    "<div class=clix-site-notification-bar ng-class=\"{'active': active, 'points-bar': receivedPoints}\" ng-mouseover=onMouseover() ng-mouseleave=onMouseleave()><div ng-show=favorite><div ng-switch=type><div ng-switch-when=favorite><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'favorites', tab: tab })\">Favorites</a></div><div ng-switch-when=watchlist><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'watchlist' })\">Watchlist</a></div><div ng-switch-when=offer><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'saved-offers' })\">Saved Offers</a></div></div></div><div ng-show=!favorite><div ng-switch=type><div ng-switch-when=favorite><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'favorites', tab: tab })\">Favorites</a></div><div ng-switch-when=watchlist><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'watchlist' })\">Watchlist</a></div><div ng-switch-when=offer><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'saved-offers' })\">Saved Offers</a></div></div></div></div>"
  );


  $templateCache.put('ui/common/page/landing/view.landing-video-content.html',
    "<div class=clix-landing-video-content><div class=\"row landing-video-content-row\"><div class=\"col-lg-9 video-content-container\"><div class=\"row about-landing-video-content\"><div class=\"col-md-7 about-landing-video\"><div ng-show=video><div id=videoPlayer></div><clix-video-player ng-if=video video=video auto-play=false video-id=videoPlayer on-ready=onPlayerReady></clix-video-player><div class=\"video-violator hidden-sm hidden-xs\" ng-show=\"!charity && !videoPlaying\"><clix-violator>100 Reward Points</clix-violator></div></div><div ng-transclude=mainContent></div></div><div class=\"col-md-5 about-landing-content\"><div class=landing-description><div ng-transclude=contentDescription></div></div><div class=share-container ng-show=!charity><div clix-tooltip-trigger tooltip-id=share-button-{{$id}} ng-transclude=shareIcon></div><div class=content-points-validator><clix-points-violator>50</clix-points-violator></div></div></div></div><div class=landing-footer-content><div ng-transclude=footerContent></div></div></div><div class=\"col-lg-3 video-sidebar-container\"><div class=sidebar-container><div class=sidebar-title><div ng-transclude=sidebarTitle></div></div><div class=sidebar-content><div ng-transclude=sidebarContent></div></div></div></div></div></div><clix-tooltip tooltip-id=share-button-{{$id}}><div ng-transclude=shareTooltipContent></div></clix-tooltip>"
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
    "<div class=clix-printable-page><div class=printable-logo-container><img ng-src={{$root.clixConfig.baseImageUrl}}/clixtv-logo-blk.svg class=clix-logo></div><div ng-transclude></div></div>"
  );


  $templateCache.put('ui/common/radio-buttons/view.radio-button-group.html',
    "<div class=clix-radio-button-group><div ng-repeat=\"option in options\" class=radio-button-select-container ng-class=\"{'active': selected === $index}\" ng-click=setSelected($index)><div class=radio-button-select></div><div class=radio-button-label>{{option.label}}</div></div></div>"
  );


  $templateCache.put('ui/common/search/view.base-search-result-item.html',
    "<div class=clix-search-result-item ui-sref={{sref}}><div class=\"search-result-image search-result-image-circle\" ng-transclude=searchResultImageCircle ng-if=searchResultImageCircle></div><div class=search-result-image ng-transclude=searchResultImage ng-if=!searchResultImageCircle></div><div class=search-result-info><div class=search-result-title ng-transclude=searchResultTitle></div><div class=search-result-subtitle ng-transclude=searchResultSubtitle></div></div></div>"
  );


  $templateCache.put('ui/common/search/view.brand-search-result-item.html',
    "<clix-base-search-result-item sref=\"brand({ slug: '{{brand.title | slug}}' })\"><search-result-image-circle><clix-brand-asset-logo brand=brand minimized=true></clix-brand-asset-logo></search-result-image-circle><search-result-title>{{brand.title}}</search-result-title><search-result-subtitle>Brand</search-result-subtitle></clix-base-search-result-item>"
  );


  $templateCache.put('ui/common/search/view.category-search-result-item.html',
    "<clix-base-search-result-item sref=\"category({ slug: '{{category.title | slug}}' })\"><search-result-image><img ng-src={{category.logo}}></search-result-image><search-result-title>{{category.title}}</search-result-title><search-result-subtitle>Category</search-result-subtitle></clix-base-search-result-item>"
  );


  $templateCache.put('ui/common/search/view.celebrity-search-result-item.html',
    "<clix-base-search-result-item sref=\"star({ slug: '{{celebrity.name | slug}}' })\"><search-result-image-circle><img ng-src={{celebrity.thumbnail}}></search-result-image-circle><search-result-title>{{celebrity.name || celebrity.title}}</search-result-title><search-result-subtitle>Star</search-result-subtitle></clix-base-search-result-item>"
  );


  $templateCache.put('ui/common/search/view.charity-search-result-item.html',
    "<clix-base-search-result-item sref=\"charity({ slug: '{{charity.title | slug}}' })\"><search-result-image-circle><clix-charity-asset-logo charity=charity minimized=true></clix-charity-asset-logo></search-result-image-circle><search-result-title>{{charity.title}}</search-result-title><search-result-subtitle>Charity</search-result-subtitle></clix-base-search-result-item>"
  );


  $templateCache.put('ui/common/search/view.offer-search-result-item.html',
    "<clix-base-search-result-item sref=\"brand-offer({ slug: '{{offer.campaign.title | slug}}', offerSlug: '{{offer.title | slug}}' })\"><search-result-image><img ng-src={{offer.thumbnail}}></search-result-image><search-result-title>{{offer.title}}</search-result-title><search-result-subtitle>Offer</search-result-subtitle></clix-base-search-result-item>"
  );


  $templateCache.put('ui/common/search/view.search-dropdown.html',
    "<div class=clix-search-dropdown ng-if=\"(results || searching || empty) && !forceHide && term.length >= 2\"><div ng-if=searching><clix-loader size=small></clix-loader></div><div class=dropdown-empty-results-container ng-if=\"empty && !searching\"><div class=dropdown-empty-results-message>No results found for &ldquo;{{term}}&rdquo;</div><div class=dropdown-empty-results-desc>Please make sure you spelled everything correctly, or use different words.</div></div><div ng-if=\"!type && results.match\" ng-switch=results.type><div ng-switch-when=charity><clix-charity-search-result-item charity=results.match></clix-charity-search-result-item></div><div ng-switch-when=campaign><clix-brand-search-result-item brand=results.match></clix-brand-search-result-item></div><div ng-switch-when=celebrity><clix-celebrity-search-result-item celebrity=results.match></clix-celebrity-search-result-item></div><div ng-switch-when=category><clix-category-search-result-item category=results.match></clix-category-search-result-item></div><div ng-switch-when=offer><clix-offer-search-result-item offer=results.match></clix-offer-search-result-item></div></div><div ng-if=results.charities><div ng-if=results.match class=dropdown-results-title>Charities Related To {{results.match.title || results.match.name}}</div><div ng-repeat=\"charity in results.charities | limitTo: 3\"><clix-charity-search-result-item charity=charity></clix-charity-search-result-item></div></div><div ng-if=results.brands><div ng-if=results.match class=dropdown-results-title>Brands Related To {{results.match.title || results.match.name}}</div><div ng-repeat=\"brand in results.brands | limitTo: 3\"><clix-brand-search-result-item brand=brand></clix-brand-search-result-item></div></div><div ng-if=results.offers><div ng-if=results.match class=dropdown-results-title>Offers Related To {{results.match.title || results.match.name}}</div><div ng-repeat=\"offer in results.offers | limitTo: 3\"><clix-offer-search-result-item offer=offer></clix-offer-search-result-item></div></div><div ng-if=results.celebrities><div ng-if=results.match class=dropdown-results-title>Stars Related To {{results.match.title || results.match.name}}</div><div ng-repeat=\"celebrity in results.celebrities | limitTo: 3\"><clix-celebrity-search-result-item celebrity=celebrity></clix-celebrity-search-result-item></div></div><div ng-if=results.categories><div ng-if=results.match class=dropdown-results-title>Categories Related To {{results.match.title || results.match.name}}</div><div ng-repeat=\"category in results.categories | limitTo: 3\"><clix-category-search-result-item category=category></clix-category-search-result-item></div></div><div ng-if=results.videos><div ng-if=results.match class=dropdown-results-title>Videos Related To {{results.match.title || results.match.name}}</div><div ng-repeat=\"video in results.videos | limitTo: 3\"><clix-video-search-result-item video=video></clix-video-search-result-item></div></div></div>"
  );


  $templateCache.put('ui/common/search/view.search-filter.html',
    "<div class=clix-search-filter><div class=row><div class=col-md-7><div class=search-bar-container><div class=search-bar clix-click-anywhere-else=onBodyPress><i class=\"search-icon icon-search-icon-bottom-nav\"></i> <input type=text class=search-input ng-model=term placeholder={{searchPlaceholder}} ng-focus=onInputFocus()><div class=search-results-dropdown-container><clix-search-dropdown term=term type=type force-hide=dropdownForceHide></clix-search-dropdown></div></div></div></div><div class=col-md-5 ng-if=\"showFilters !== 'false' && filtersEnabled !== false\"><div class=filters-container><div class=filter-bar><clix-dropdown options=filterOptions placeholder-text={{filterPlaceholder}}></clix-dropdown></div><div class=filter-bar><clix-dropdown options=sortOptions placeholder-text={{sortPlaceholder}}></clix-dropdown></div></div></div></div></div>"
  );


  $templateCache.put('ui/common/search/view.site-search.html',
    "<div class=clix-site-search ng-show=isVisible clix-click-anywhere-else=bodyClicked><div class=search-results-container><div class=search-input-container><div class=search-input-field-container><input class=search-input-field id=site-search-input-field type=text placeholder=Search ng-model=term ng-change=onTermChange()></div></div><clix-search-dropdown term=term></clix-search-dropdown></div></div>"
  );


  $templateCache.put('ui/common/search/view.video-search-result-item.html',
    "<clix-base-search-result-item sref=\"video({ slug: '{{video.seriesTitle + ' ' + video.title | slug}}' })\"><search-result-image><img ng-src={{video.thumbnail}}></search-result-image><search-result-title>{{video.title}}</search-result-title><search-result-subtitle>Video</search-result-subtitle></clix-base-search-result-item>"
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


  $templateCache.put('ui/contact/components/view.contact-sidebar.html',
    "<div class=contact-sidebar-container><div class=contact-sidebar-block><h3 class=contact-sidebar-label>Media Relations</h3><p class=contact-sidebar-description>Media inquiries include a media kit, a press release archive and press contacts.</p></div><div class=contact-sidebar-block><h3 class=contact-sidebar-label>Investor Relations</h3><p class=contact-sidebar-description>Investor inquiries include share information, quarterly results, shareholders meetings, ratings, SEC filings, fixed income securities, listings and the financial calendar for ClixTV.</p></div><div class=contact-sidebar-block><h3 class=contact-sidebar-label>Agency Relations</h3><p class=contact-sidebar-description>Agency inquiries include general interest and questions regarding participation in the ClixTV experience.</p></div><div class=contact-sidebar-block><h3 class=contact-sidebar-label>Our Address</h3><p class=contact-sidebar-description>2554 Lincoln Blvd. #143<br>Venice, CA 90291</p></div></div>"
  );


  $templateCache.put('ui/contact/view.contact-page.html',
    "<div class=clix-contact-page><div class=contact-page-header>Contact Us</div><div class=\"row contact-page-container\"><div class=\"col-md-4 hidden-xs hidden-sm\" ng-include src=\"'ui/contact/components/view.contact-sidebar.html'\"></div><div class=\"col-md-8 contact-page-form-container\"><div class=contact-page-form-header>If you have any questions or comments, please fill out the form below!</div><div class=contact-page-form-header>We will get back to you as soon as we can!</div><div class=\"contact-page-form clix-form\"><div class=clix-form-row><label class=clix-form-input-label>What can we help you with?</label><clix-dropdown options=helpTypes placeholder-text=- ng-model=selectedHelpType></clix-dropdown></div><div class=clix-form-row><label class=clix-form-input-label>Name: <span class=clix-form-input-label-required>*</span></label><clix-form-input-error-field show-error=showNameError><form-field><input type=text class=clix-form-input-field ng-model=form.name></form-field><error-message>Name is required</error-message></clix-form-input-error-field></div><div class=clix-form-row><label class=clix-form-input-label>Email Address: <span class=clix-form-input-label-required>*</span></label><clix-form-input-error-field show-error=showEmailError><form-field><input type=email class=clix-form-input-field ng-model=form.email></form-field><error-message>Email address is required</error-message></clix-form-input-error-field></div><div class=clix-form-row><label class=clix-form-input-label>Subject: <span class=clix-form-input-label-required>*</span></label><clix-form-input-error-field show-error=showSubjectError><form-field><input type=text class=clix-form-input-field ng-model=form.subject></form-field><error-message>Subject is required</error-message></clix-form-input-error-field></div><div class=clix-form-row><label class=clix-form-input-label>Message: <span class=clix-form-input-label-required>*</span></label><clix-form-input-error-field show-error=showDescriptionError><form-field><textarea class=clix-form-textarea-field ng-model=form.description></textarea></form-field><error-message>Message is required</error-message></clix-form-input-error-field></div><div class=\"clix-form-row submit-button-container\"><div class=clix-form-submit-button><clix-primary-button ng-click=onSubmit()>Submit</clix-primary-button></div></div></div></div><div class=\"col-md-4 visible-xs visible-sm\" ng-include src=\"'ui/contact/components/view.contact-sidebar.html'\"></div></div></div>"
  );


  $templateCache.put('ui/dropdown/view.dropdown.html',
    "<div class=clix-dropdown ng-show=options clix-click-anywhere-else=bodyClicked><div class=dropdown-trigger ng-click=triggerClicked()><div class=dropdown-label>{{ selected.label }}</div><div class=dropdown-icon><i class=icon-down-arrow></i></div></div><clix-tooltip-menu items=dropdownOptions menuopen=menuVisible></clix-tooltip-menu></div>"
  );


  $templateCache.put('ui/footer/view.footer.html',
    "<footer class=clix-footer><div class=\"row footer-content\"><div class=\"col-xs-12 col-sm-3 footer-column\"><div class=footer-logo-container><img ng-src={{$root.clixConfig.baseImageUrl}}/white-logo.svg class=clix-logo ng-if=!isBeta> <img ng-src={{$root.clixConfig.baseImageUrl}}/clixtv-logo-white-horizontal-beta.svg class=clix-logo ng-if=isBeta></div></div><div class=\"col-xs-6 col-sm-3 footer-column\"><div class=footer-label>Company</div><ul class=footer-list><li><a ui-sref=about>What is ClixTV?</a></li><li><a ui-sref=\"contact({ section: 'investor-relations' })\">Investor Relations</a></li><li><a ui-sref=\"contact({ section: 'advertisers' })\">Advertisers</a></li><li><a ui-sref=\"contact({ section: 'jobs' })\">Jobs</a></li><li><a ui-sref=\"contact({ section: 'press' })\">Press</a></li><li><a ui-sref=\"contact({ section: 'news' })\">News</a></li></ul></div><div class=\"col-xs-6 col-sm-3 footer-column\"><div class=footer-label>Useful Links</div><ul class=footer-list><li><a ui-sref=charities>Charities</a></li><li><a ui-sref=stars>Stars</a></li><li><a ui-sref=\"contact({ section: 'affiliates' })\">Affiliates</a></li><li><a ui-sref=\"contact({ section: 'rewards' })\">Rewards</a></li><li><a ui-sref=categories>Video Categories</a></li><li><a ui-sref=\"contact({ section: 'help' })\">Help</a></li><li><a ui-sref=\"contact({ section: '' })\">Contact</a></li></ul></div><div class=\"col-xs-12 col-sm-3 footer-column\"><div class=social-icons><a href=https://www.facebook.com/clixtvofficial/ class=social-icon target=_blank><i class=icon-facebook-logo></i> </a><a href=https://twitter.com/clixtvofficial class=social-icon target=_blank><i class=icon-twitter-logo></i> </a><a href=https://www.youtube.com/channel/UCi1BiDw3nS_Ynh4tVTOjAAg class=social-icon target=_blank><i class=icon-youtube-logo></i> </a><a href=https://www.instagram.com/clixtv/ class=social-icon target=_blank><i class=icon-instagram-logo></i></a></div></div></div><div class=footer-legal-container><div class=footer-legal-column><a ui-sref=terms-of-use>Terms of Use</a></div><div class=footer-legal-column><a ui-sref=privacy-policy>Privacy Policy</a></div><div class=footer-legal-column>&copy; ClixTV, Inc</div></div></footer>"
  );


  $templateCache.put('ui/header/view.header-search-icon-row.html',
    "<div class=header-search-row><div class=search-image-container ng-transclude=logoContainer></div><div class=search-content-container><div class=search-title-text ng-transclude=titleText></div><div class=search-subtitle-text ng-transclude=subtitleText></div></div></div>"
  );


  $templateCache.put('ui/header/view.header-search-icon.html',
    "<div class=navigation-search-container ng-class=\"{'active': searchVisible === true}\"><div class=search-icon-container ng-click=onSearchIconPress() clix-click-anywhere-else=bodyClicked><i class=\"search-icon icon-search-icon-bottom-nav\"></i></div><div class=search-results-container><div class=search-input-field-container><input class=search-input-field id=search-input-field type=text placeholder=Search ng-model=term ng-change=onTermChange()></div><div class=search-results><clix-search-dropdown term=term></clix-search-dropdown></div></div></div>"
  );


  $templateCache.put('ui/header/view.header.html',
    "<header class=clix-header clix-scroll-offset-class offset=100 scroll-class=filled ng-class=\"{'clix-header-hidden': scrollDirection === 'up', 'solid-navigation': $root.solidNavigation}\"><div class=\"clix-header-container hidden-xs hidden-sm hidden-md\"><h1 class=logo-container><a href=/ ><img ng-src={{$root.clixConfig.baseImageUrl}}/gradient-logo.svg class=clix-logo ng-if=!isBeta> <img ng-src={{$root.clixConfig.baseImageUrl}}/clixtv-logo-horizontal-beta.svg class=clix-logo ng-if=isBeta></a></h1><nav class=clix-navigation><div class=navigation-item-container ng-class=\"{'active': selectedStateName === 'categories' || selectedStateName === 'category'}\"><a ui-sref=categories>Categories</a></div><div class=navigation-item-container ng-class=\"{'active': selectedStateName === 'stars' || selectedStateName === 'star'}\"><a ui-sref=stars>Stars</a></div><div class=navigation-item-container ng-class=\"{'active': selectedStateName === 'brands' || selectedStateName === 'brand'}\"><a ui-sref=brands>Brands</a></div><div class=navigation-item-container ng-class=\"{'active': selectedStateName === 'charities' || selectedStateName === 'charity'}\"><a ui-sref=charities>Charities</a></div><div class=\"navigation-item-container search-item-container\"><clix-header-search-icon></clix-header-search-icon></div></nav><div class=account-action-container><div ng-if=loggedInUser><div class=header-user-container clix-click-anywhere-else=hideNotificationMenu><clix-header-points-violator points=points></clix-header-points-violator><div class=header-avatar-container><div ng-if=loggedInUser.avatar><a ng-click=onNamePress() class=header-avatar style=\"background-image: url('{{loggedInUser.avatar}}')\"></a></div><div ng-if=!loggedInUser.avatar><a ng-click=onNamePress() class=header-avatar style=\"background-image: url('{{$root.clixConfig.baseImageUrl}}/empty-profile-picture.png')\"></a></div></div><div class=header-name-container><a ng-click=onNamePress() class=header-name>{{loggedInUser.firstName}} </a><a ng-click=onArrowPress() class=header-expand-icon><div class=icon-left-tall-arrow></div></a></div><div class=notification-tooltip-container ng-show=tooltipsShown><clix-notification-tooltip notifications=notifications></clix-notification-tooltip></div></div></div><div ng-if=!loggedInUser><div class=header-user-container><clix-header-points-violator></clix-header-points-violator><div class=header-login-action-container><clix-callout-button color-type=secondary ng-click=onLoginSignupPress(false)>Login</clix-callout-button><a ng-click=onLoginSignupPress(true) class=account-action-label>Register Now</a></div></div></div></div></div><div class=\"clix-header-container hidden-lg\"><div class=mobile-header-block><div class=points-violator-container><clix-header-points-violator></clix-header-points-violator></div></div><a href=/ class=\"mobile-logo mobile-header-block\"><img ng-src={{$root.clixConfig.baseImageUrl}}/color-logo-light.svg class=clix-logo ng-if=!isBeta> <img ng-src={{$root.clixConfig.baseImageUrl}}/clixtv-mobile-beta-logo.svg class=clix-logo ng-if=isBeta></a><div class=\"user-avatar-container mobile-header-block\"><div class=user-avatar><div ng-if=!loggedInUser><clix-callout-button color-type=secondary ng-click=onLoginSignupPress(false)>Login</clix-callout-button></div><div class=header-user-container ng-if=loggedInUser><div class=header-avatar-container><div ng-if=loggedInUser.avatar><a ng-click=onArrowPress() class=header-avatar style=\"background-image: url('{{loggedInUser.avatar}}')\"></a></div><div ng-if=!loggedInUser.avatar><a ng-click=onArrowPress() class=header-avatar style=\"background-image: url('{{$root.clixConfig.baseImageUrl}}/empty-profile-picture.png')\"></a></div></div></div></div></div></div></header>"
  );


  $templateCache.put('ui/home/view.home.html',
    "<div class=home-page><clix-home-page-banner></clix-home-page-banner><div class=home-page-content><div ng-if=!ready><clix-loader size=large></clix-loader></div><div ng-if=ready><div ng-repeat=\"category in categories.categories | orderBy: 'order' track by category.id\" ng-if=\"category && category.videos && category.videos.videos && category.videos.videos.length > 0\"><clix-video-category-scroll-list category=category></clix-video-category-scroll-list></div></div><div in-view=\"onLoadMore($inview, $inviewInfo)\"></div></div></div>"
  );


  $templateCache.put('ui/logo/view.logo.html',
    "<div class=clix-logo-container ng-class=\"{'clix-charity-logo-container': charity, 'large': size === 'large'}\"><img ng-if=logoUrl ng-src={{logoUrl}} class=logo-image></div>"
  );


  $templateCache.put('ui/notfound/view.not-found.html',
    "<div class=clix-not-found-page><clix-search-filter search-placeholder=\"Search ClixTV\" show-filters=false></clix-search-filter><clix-empty-container><header-text><div class=\"visible-sm visible-xs\">Sorry, the page you requested cannot be found. Try searching for something else.</div><div class=\"hidden-sm hidden-xs\">Sorry, the page you requested cannot be found.<br>Try searching for something else.</div></header-text></clix-empty-container><div class=footer-links-container><div class=footer-link><a ui-sref=home>ClixTV Home Page</a></div></div></div>"
  );


  $templateCache.put('ui/offer/view.offer.html',
    "<div ng-if=!configs><clix-loader size=large></clix-loader></div><div class=clix-offer-page ng-if=configs><clix-hero-banner title-text={{configs.title}} button-text=\"{{'Save Offer'}}\" button-tooltip-text=\"{{loggedInUser ? (isFavorite ? 'Remove from your saved offers' : 'You will receive 50 Reward Points for saving this offer!') : 'After you sign up, you will receive 50 Reward Points for saving this offer!'}}\" share-tooltip-text=\"{{loggedInUser ? 'You will receive 50 Reward Points for sharing!' : 'After signing up, you will receive 50 Reward Points for sharing!'}}\" points=\"{{'50'}}\" subtext=\"Expires {{offer.expirationDate | clixDate: 'long'}}\" background-image={{configs.backgroundImage}} banner-type=Offer><favorite-button><clix-tertiary-button ng-click=onFavoritePress() is-active=isFavorite>{{isFavorite ? 'Remove Saved Offer' : 'Save Offer'}}</clix-tertiary-button></favorite-button><share-icon><clix-share-button extra-class=banner-share-icon offer=offer></clix-share-button></share-icon></clix-hero-banner><div class=main-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Overview><div class=home-container><clix-landing-video-content><main-content><div class=offer-carousel><slick dots=true prev-arrow=#main-carousel-previous next-arrow=#main-carousel-next><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-1.png></div><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-2.png></div><div class=offer-slide><img ng-src=assets/theme/clixtv/dist/images/nike-offer-demo-3.png></div></slick><div id=main-carousel-previous><div class=main-carousel-button><i class=\"arrow-icon icon-left-tall-arrow\"></i></div></div><div id=main-carousel-next><div class=main-carousel-button><i class=\"arrow-icon icon-right-tall-arrow\"></i></div></div></div></main-content><content-description><div class=home-header>Instructions</div><div class=home-instructions><div class=instructions-row><div class=instructions-number>1</div><div class=instructions-label>Click the button below to shop online at {{brand.title}}. Your Coupon code will be copied to your clipboard automatically.</div></div><div class=instructions-row><div class=instructions-number>2</div><div class=instructions-label>Paste your code during checkout.</div></div><div class=instructions-row><div class=instructions-number>3</div><div class=instructions-label>Enjoy!</div></div></div><div class=offer-buttons><div class=offer-button><div class=save-offer-button clix-tooltip-trigger tooltip-id=save-offer-button-{{$id}}><clix-tertiary-button ng-click=onFavoritePress() is-active=isFavorite>{{isFavorite ? 'Remove Saved Offer' : 'Save Offer'}}</clix-tertiary-button><div class=save-offer-points><clix-points-violator>50</clix-points-violator></div></div><clix-tooltip tooltip-id=save-offer-button-{{$id}}><div ng-if=loggedInUser>{{isFavorite ? 'Remove from your saved offers' : 'You will receive 50 Reward Points for saving this offer!'}}</div><div ng-if=!loggedInUser>After you sign up, you will receive 50 Reward Points for saving this offer! <a ng-click=\"\">Learn more</a>.</div></clix-tooltip></div><div class=offer-button><div class=save-offer-button clix-tooltip-trigger tooltip-id=redeem-offer-button-{{$id}}><clix-tertiary-button>Redeem Now</clix-tertiary-button><div class=save-offer-points><clix-points-violator>50</clix-points-violator></div></div><clix-tooltip tooltip-id=redeem-offer-button-{{$id}}><div ng-if=loggedInUser>You will receive 50 Reward Points for redeeming this offer!</div><div ng-if=!loggedInUser>After signing up, you will receive 50 Reward Points for redeeming this offer! <a ng-click=\"\">Learn more</a>.</div></clix-tooltip></div></div></content-description><share-tooltip-content><div ng-if=loggedInUser>You will receive 50 Reward Points for sharing!</div><div ng-if=!loggedInUser>After signing up, you will receive 50 Reward Points for sharing! <a ng-click=\"\">Learn more</a>.</div></share-tooltip-content><sidebar-title>More Offers From {{offer.brand.title}}</sidebar-title><sidebar-content><div class=\"row brand-offer-row\"><div class=\"col-xs-6 col-sm-6 col-md-12 col-lg-12 brand-offer-column\" ng-repeat=\"offer in offer.brand.offers.offers | limitTo: 3 | filter: { id: '!' + offer.id }\"><div class=brand-offer><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></div></sidebar-content><footer-content><div class=\"offer-footer-info row\"><div class=\"col-md-6 offer-footer-column\"><div class=footer-header><clix-secondary-header>The Revolution Never Ends</clix-secondary-header></div><p>Since 1985, the sneakers carrying Michael Jordan’s name and world-renowned “Jumpman” silhouette have helped to define and shape sneaker culture. It began with a standard Nike high top, and evolved with daring designs implemented into each iteration. From graphic prints to patent leather to fighter planes and Ferrari-inspired designs, Jordan sneakers routinely transcend its basketball roots by refreshing its initial offerings with new looks and color schemes to remain prevalent throughout generations.</p><p>- Leather upper for a supportive fit</p><p>- Full-length Nike Zoom Air unit for responsive cushioning</p><p>- Carbon fiber shank helps maximize energy return</p><p>- Rubber sole for traction on a variety of surfaces</p></div><div class=\"col-md-6 offer-footer-column\"><div class=footer-header><clix-secondary-header>About {{offer.brand.title}}</clix-secondary-header></div><p>{{offer.brand.description}}</p></div></div></footer-content><share-icon><clix-share-button extra-class=landing-share-icon offer=offer></clix-share-button></share-icon></clix-landing-video-content></div></uib-tab><uib-tab index=1 heading=\"Related Offers\"><div class=\"videos-title-container related-offers-title\"><div class=videos-title><clix-secondary-header>All {{offer.brand.title}} Offers</clix-secondary-header></div></div><div class=\"row clix-block-row offers-container\"><div class=\"clix-block-item col-xs-6 col-sm-4 col-md-3 col-lg-2\" ng-repeat=\"offer in offer.brand.offers.offers | filter: { id: '!' + offer.id }\"><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></uib-tab><uib-tab index=2 heading=Videos><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>All Videos Related To {{offer.brand.title}}</clix-secondary-header></div><div class=video-sort-container><clix-dropdown options=seriesList></clix-dropdown></div></div><div class=\"row clix-block-row\"><div class=\"clix-block-item col-xs-12 col-sm-12 col-md-3 col-lg-2-4\" ng-repeat=\"video in offer.videos.videos\"><clix-video-content-callout video=video></clix-video-content-callout></div></div></div></uib-tab></uib-tabset></div></div></div>"
  );


  $templateCache.put('ui/offer/view.printable-redeem-offer.html',
    "<div clix-printable-page><div class=clix-printable-redeem-offer><div class=redeem-offer-header>Use the Coupon Code Below</div><div class=redeem-offer-details><div class=coupon-code>VPBC500</div><div class=redeem-offer-sub-title>Shop online at Nike</div><div class=redeem-offer-qr></div><div class=redeem-offer-desc><p>Get 20% off when you buy at nike.com. Restrictions apply. See merchant website for more details.</p><p>Offer expires 2/1/2017</p></div></div><div class=redeem-offer-legal><p>ClixTV Legal copy here...</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis odio in ipsum vestibulum aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam ac augue eget metus posuere suscipit. Nunc aliquet iaculis est eu sagittis. Nunc blandit facilisis lorem vel laoreet. In vel ex ligula. Donec justo neque, porta id faucibus id, lobortis vitae enim. Sed a venenatis diam. Quisque ullamcorper ac massa a interdum. Donec venenatis lobortis nulla quis volutpat. Fusce at neque libero.</p><p>Phasellus condimentum elementum nunc, ut laoreet elit convallis et. Morbi viverra, neque nec faucibus aliquet, nulla diam pharetra purus, sed semper elit orci ac nisi. Donec iaculis id mauris vel imperdiet. Donec consectetur felis fringilla eros tristique, at dapibus turpis blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam efficitur tellus mollis ex gravida vestibulum vel eget lacus. Ut ornare varius nunc, malesuada blandit dui consequat at. Curabitur pretium laoreet velit nec ultrices. Donec tincidunt mauris fringilla egestas vehicula. Phasellus molestie justo et efficitur ornare. Phasellus sodales diam eget purus imperdiet aliquam. Cras lobortis ex a eros convallis ultrices.</p><p>Duis imperdiet, tortor vitae posuere cursus, arcu erat luctus sapien, a finibus orci tellus eu nulla. Pellentesque leo libero, egestas sed mattis ut, mollis a nibh. Praesent mattis neque vitae erat facilisis, elementum malesuada est blandit. Etiam erat neque, commodo eget mattis ac, posuere sit amet mi. Morbi vitae tortor quis sapien congue tempus a quis est. Curabitur laoreet molestie tempus. Pellentesque quis elit libero. Nulla felis urna, scelerisque in faucibus at, fringilla in massa.</p><p>Fusce id massa mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed et erat eu urna posuere eleifend in mattis tortor. Etiam semper vel ante quis lacinia. Integer sodales tellus a justo tincidunt, in pellentesque odio fringilla. Pellentesque et scelerisque sapien, vel dignissim tortor. Donec a diam gravida, dignissim lacus quis, dictum est. Vivamus ac purus viverra, pretium nulla ut, pellentesque dui. Sed vel magna iaculis, rhoncus tortor sed, condimentum dolor. Sed lacinia, neque in ullamcorper condimentum, lectus erat volutpat magna, id sodales lacus nunc ac orci. Morbi tincidunt, justo ut cursus faucibus, odio risus finibus libero, sed vestibulum nisi leo quis libero. Fusce in urna nibh. Phasellus dolor velit, fermentum ac diam id, dictum feugiat ligula. Curabitur eget augue blandit, rutrum purus sit amet, pulvinar massa. Sed lacinia iaculis velit sed laoreet. Aliquam elementum elementum mauris, et iaculis ipsum mattis faucibus.</p><p>Suspendisse purus sem, consequat in nibh eget, lobortis viverra turpis. Morbi orci dui, sagittis nec viverra sit amet, iaculis vel tortor. Nulla malesuada imperdiet orci quis scelerisque. Aliquam sit amet nulla aliquet, mattis purus quis, sagittis augue. Maecenas facilisis, sem nec volutpat fermentum, metus sapien malesuada tortor, eu placerat libero purus eget erat. Pellentesque pellentesque, tortor quis laoreet porttitor, odio augue eleifend nibh, sed sodales odio ligula in enim. Quisque urna lacus, faucibus eget sapien sit amet, tristique aliquet nunc. Donec consectetur urna leo, non aliquam sapien placerat quis. Nullam vehicula odio a mauris bibendum, eu fermentum felis efficitur. Integer faucibus pellentesque urna non cursus. Morbi risus nisl, sodales quis porttitor et, aliquet a ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque purus ante, tincidunt ornare risus vel, imperdiet dictum nunc. Etiam ultricies turpis eget felis dignissim, sit amet aliquet mi feugiat.</p><p>Duis dignissim massa augue, ut tincidunt est fermentum sit amet. Curabitur eu purus vel lorem viverra iaculis. Duis sit amet molestie ex, vel sodales enim. Aenean sollicitudin augue in congue facilisis. Fusce consectetur a sapien ut pretium. Proin id fringilla augue. Sed sodales purus ut erat elementum, et viverra nisi ultrices. Praesent et fermentum leo. Nam ante sem, molestie dignissim laoreet at, fermentum sit amet est. Sed pharetra arcu vitae neque sagittis aliquam.</p><p>Donec ac elementum est, id blandit lorem. Nam aliquet tincidunt massa, eget tincidunt justo interdum eget. Curabitur quis porta orci. Phasellus sagittis nisi augue. Phasellus tortor velit, pulvinar ut felis a, tempus convallis urna. Proin faucibus condimentum finibus. In hac habitasse platea dictumst. Pellentesque convallis eros eros, sit amet vehicula arcu auctor sit amet. Integer at efficitur dolor, id pretium nunc. Mauris ultrices sollicitudin augue, et ultrices quam convallis nec. Fusce nulla nibh, interdum id eleifend quis, faucibus a enim.</p><div class=redeem-offer-copyright><clix-copyright></clix-copyright></div></div></div></div>"
  );


  $templateCache.put('ui/privacy-policy/view.privacy-policy.html',
    "<div class=clix-privacy-policy-page><clix-main-header>ClixTV.com Privacy Policy</clix-main-header><div class=clix-privacy-policy-content><p>This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used by ClixTV.com. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.</p><h2>What personal information do we collect from the people that visit our website or app?</h2><p>When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, and, in certain circumstances, your phone number, date of birth, gender or other details to help provide you with a better user experience.</p><h2>When do we collect information?</h2><p>We collect information from you when you register on our site, fill out a form, open a support ticket, or provide us with feedback on our products or services.</p><p>We also collect PII you’ve provided to Facebook or Google, which they provide when you use them as your login mechanism on our website.</p><h2>How do we use your information?</h2><p>We may use the information we collect from you when you register or use certain other site features in the following ways:</p><ul><li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li><li>To improve our website in order to better serve you.</li><li>To allow us to better service you in responding to your customer service requests.</li><li>To administer a contest, promotion, survey or other site feature.</li><li>To quickly process your transactions.</li><li>To send periodic emails regarding your order or other products and services.</li><li>To follow up with them after correspondence (live chat, email or phone inquiries)</li></ul><h2>How do we protect your information?</h2><p>We do not use vulnerability scanning and/or scanning to PCI standards.<br>An external PCI compliant payment gateway handles all CC transactions.<br>We use regular Malware Scanning.</p><p>Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p><p>We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information.</p><p>All transactions are processed through a gateway provider and are not stored or processed on our servers.</p><h2>Do we use 'cookies'?</h2><p>Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p><h2>We use cookies to:</h2><ul><li>Understand and save user's preferences for future visits.</li><li>Keep track of advertisements.</li><li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.</li></ul><p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since each browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.</p><h2>If users disable cookies in their browser:</h2><p>If you turn cookies off, some of the features that make your site experience more efficient may not function properly.</p><h2>Third-party disclosure</h2><h2>Do we disclose the information we collect to Third-Parties?</h2><p>We transfer to outside parties your name and online contact identifier, such as email, name of chat account etc., to enable third-party features, including couponing, product purchases, membership rewards and redemption, and other features intended to improve the user experience.</p><h2>Third-party links</h2><h2>Google</h2><p>Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users.</p><p><a href=\"https://support.google.com/adwordspolicy/answer/1316548?hl=en\" target=_blank rel=nofollow>https://support.google.com/adwordspolicy/answer/1316548?hl=en</a></p><p>Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.</p><h2>We have implemented the following:</h2><ul><li>Demographics and Interests Reporting</li></ul><p>We, along with third-party vendors such as Google use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together to compile data regarding user interactions with ad impressions and other ad service functions as they relate to our website.</p><h2>Opting out:</h2><p>Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt out by visiting the Network Advertising Initiative Opt Out page or by using the Google Analytics Opt Out Browser add on.</p><h2>California Online Privacy Protection Act</h2><p>CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates websites collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals or companies with whom it is being shared. - See more at: <a href=http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf target=_blank>http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf</a></p><h2>According to CalOPPA, we agree to the following:</h2><p>Users can visit our site anonymously.<br>Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website.<br>Our Privacy Policy link includes the word 'Privacy' and can easily be found on the page specified above.</p><p>You will be notified of any Privacy Policy changes:</p><ul><li>On our Privacy Policy Page</li></ul><p>You can change your personal information:</p><ul><li>By logging in to your account</li></ul><h2>How does our site handle Do Not Track signals?</h2><p>We honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.</p><h2>Does our site allow third-party behavioral tracking?</h2><p>It's also important to note that we allow third-party behavioral tracking</p><h2>COPPA (Children Online Privacy Protection Act)</h2><p>When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.</p><p>We do not specifically market to children under the age of 13 years old.</p><h2>Fair Information Practices</h2><p>The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.</p><h2>In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:</h2><p>We will notify you via email</p><ul><li>Within 7 business days</li></ul><p>We will notify the users via in-site notification</p><ul><li>Within 7 business days</li></ul><p>We also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.</p><h2>CAN SPAM Act</h2><p>The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.</p><h2>We collect your email address in order to:</h2><ul><li>Send information, respond to inquiries, and/or other requests or questions</li><li>Market to our mailing list or continue to send emails to our clients after the original transaction has occurred.</li></ul><h2>To be in accordance with CANSPAM, we agree to the following:</h2><ul><li>Not use false or misleading subjects or email addresses.</li><li>Identify the message as an advertisement in some reasonable way.</li><li>Include the physical address of our business or site headquarters.</li><li>Monitor third-party email marketing services for compliance, if one is used.</li><li>Honor opt-out/unsubscribe requests quickly.</li><li>Allow users to unsubscribe by using the link at the bottom of each email.</li></ul><h2>If at any time you would like to unsubscribe from receiving future emails, you can follow the instructions at the bottom of each email and we will promptly remove you from ALL correspondence.</h2><h2>Contacting Us</h2><p>If there are any questions regarding this privacy policy, you may contact us using the information below.</p><p>ClixTV.com<br>2554 Lincoln Blvd. #143<br>Venice, CA 90291<br><a href=mailto:help@clixtv.com>help@clixtv.com</a><br>(424) 228-4639</p></div></div>"
  );


  $templateCache.put('ui/stars/view.star.html',
    "<div ng-if=!celebrity><clix-loader size=large></clix-loader></div><div class=clix-star-page ng-if=celebrity><clix-landing-page-banner background-image={{celebrity.headerImage}}><banner-type>Star</banner-type><banner-title>{{celebrity.name}}</banner-title><banner-sub-title>{{celebrity.totalVideos || '0'}} {{celebrity.totalVideos === 1 ? 'Video' : 'Videos'}}</banner-sub-title><banner-logo-container><img ng-src={{celebrity.thumbnail}}></banner-logo-container><banner-button-container><div clix-tooltip-trigger tooltip-id=landing-banner-favorite-{{celebrity.id}}><clix-tertiary-button ng-click=onFavoritePress()>{{isFavorite ? 'Added to Favorites' : 'Favorite'}}</clix-tertiary-button></div></banner-button-container><banner-share-button-container><div clix-tooltip-trigger tooltip-id=landing-banner-share-{{celebrity.id}}><clix-share-button extra-class=banner-share-icon celebrity=celebrity></clix-share-button></div></banner-share-button-container></clix-landing-page-banner><div class=brand-page-content><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=Video select=\"onTabSelect('video')\"><div class=videos-container><div class=videos-title-container><div class=videos-title><clix-secondary-header>{{selectedSeries.label}} Series: {{selectedSeries.totalEpisodes}} {{selectedSeries.totalEpisodes === 1 ? 'Episode' : 'Episodes'}}</clix-secondary-header></div><div class=video-sort-container><clix-dropdown options=seriesList placeholder-text=\"Select Series\"></clix-dropdown></div></div><div class=row ng-repeat=\"series in celebrity.series.series\" ng-show=\"series.title === selectedSeries.label\"><div class=col-md-8><clix-video-content-callout-list videos=series.seasons.seasons[0].episodes order=episodeNumber grid-classes=\"col-xs-6 col-sm-4 col-md-4 col-lg-4\"></clix-video-content-callout-list></div><div class=\"col-md-4 star-sidebar-container\"><div class=sidebar-container><div class=sidebar-title>Brands in this Series</div><div class=\"row brand-row\"><div ng-repeat=\"brand in series.brands.brands\" class=\"brand-container col-xs-6 col-sm-3 col-md-6\"><clix-brand-content-callout brand=brand></clix-brand-content-callout></div></div></div><div class=sidebar-container><div class=sidebar-title>Charities in this Series</div><div class=\"row brand-row\"><div class=\"brand-container col-xs-6 col-sm-3 col-md-6\"><clix-charity-content-callout charity=series.charity star=celebrity></clix-charity-content-callout></div></div></div></div></div></div></uib-tab><uib-tab index=1 heading=\"Brands & Offers\" select=\"onTabSelect('brands_offers')\"><div class=brands-offers-title><div class=visible-xs><clix-secondary-header>Brands Related To<br>{{celebrity.name}}</clix-secondary-header></div><div class=hidden-xs><clix-secondary-header>Brands Related To {{celebrity.name}}</clix-secondary-header></div></div><div class=\"row brand-row\"><div ng-repeat=\"brand in celebrity.brands.brands\" class=\"brand-container col-xs-6 col-sm-3 col-md-3 col-lg-2\"><clix-brand-content-callout brand=brand></clix-brand-content-callout></div></div><div class=brands-offers-title ng-show=celebrity.offers><div class=visible-xs><clix-secondary-header>Offers Related To<br>{{celebrity.name}}</clix-secondary-header></div><div class=hidden-xs><clix-secondary-header>Offers Related To {{celebrity.name}}</clix-secondary-header></div></div><div class=\"row brand-row\"><div ng-repeat=\"offer in celebrity.offers.offers\" class=\"brand-container col-xs-6 col-sm-3 col-md-3 col-lg-2\"><clix-offer-content-callout offer=offer></clix-offer-content-callout></div></div></uib-tab><uib-tab index=2 heading=Charity select=\"onTabSelect('charity')\"><div class=brands-offers-title><div class=visible-xs><clix-secondary-header>Charities Related To<br>{{celebrity.name}}</clix-secondary-header></div><div class=hidden-xs><clix-secondary-header>Charities Related To {{celebrity.name}}</clix-secondary-header></div></div><div class=\"row brand-row\"><div ng-repeat=\"charity in celebrity.charities.charities\" class=\"brand-container col-xs-6 col-sm-3 col-md-3 col-lg-2\"><clix-charity-content-callout charity=charity star=celebrity></clix-charity-content-callout></div></div></uib-tab></uib-tabset></div></div></div><clix-tooltip tooltip-id=landing-banner-favorite-{{celebrity.id}}>{{loggedInUser ? ((isFavorite) ? 'Remove this star from your Favorites' : 'Add this star to your Favorites.') : 'After signing up, you will be able to add this star to your Favorites.'}}</clix-tooltip><clix-tooltip tooltip-id=landing-banner-share-{{celebrity.id}}>Share this page</clix-tooltip>"
  );


  $templateCache.put('ui/stars/view.stars.html',
    "<div ng-if=!stars><clix-loader size=large></clix-loader></div><div class=clix-stars-page><clix-filter-page ng-if=stars><page-title>Stars</page-title><page-content><clix-content-callout-list items=stars.celebrities><clix-star-content-callout star=item></clix-star-content-callout></clix-content-callout-list></page-content></clix-filter-page></div>"
  );


  $templateCache.put('ui/terms-and-conditions/view.terms-and-conditions.html',
    "<div class=clix-terms-and-conditions-page><clix-main-header>Terms of Use</clix-main-header><div class=clix-terms-and-conditions-content><p>Welcome to ClixTV, operated by Clix, Inc.. (the \"Company\" or \"ClixTV\").</p><p>By accessing the ClixTV application or its website found at www.ClixTV.com, whether through a mobile device, mobile application or computer (collectively, the \"Service\") you agree to be bound by these Terms of Use (this \"Agreement\"), whether or not you create a ClixTV account. If you wish to create a ClixTV account and make use of the Service, please read these Terms of Use.</p><p>You should also read the ClixTV <a ui-sref=privacy-policy>Privacy Policy</a>, which is incorporated by reference into this Agreement. If you do not accept and agree to be bound by all of the terms of this Agreement, including the ClixTV <a ui-sref=privacy-policy>Privacy Policy</a>, do not use the Service. Please contact us with any questions regarding this Agreement.</p><ol><li>Acceptance of Terms of Use Agreement.<ol type=a><li>This Agreement is an electronic contract that establishes the legally binding terms you must accept to use the Service. This Agreement includes the Company’s (i) <a ui-sref=privacy-policy>Privacy Policy</a>, (ii) terms disclosed and agreed to by you if you purchase or accept additional features, products or services we offer on the Service, such as terms governing the Clix Rewards Program, features, free trials, discounts and promotions.</li><li>By accessing or using the Service, you accept this Agreement and agree to the terms, conditions and notices contained or referenced herein and consent to have this Agreement and all notices provided to you in electronic form. To withdraw this consent, you must cease using the Service and terminate your account. Please print a copy of this Agreement for your records. To receive a non-electronic copy of this Agreement, please contact us at <a href=mailto:help@clixtv.com>help@ClixTV.com</a>. This Agreement may be modified by the Company from time to time, such modifications to be effective upon posting by the Company in the Service.</li></ol></li><li>Eligibility.<p>No part of ClixTV is directed to persons under the age of 13. You must be at least 13 years of age to access and use the Service. Any use of the Service is void where prohibited. By accessing and using the Service, you represent and warrant that you have the right, authority and capacity to enter into this Agreement and to abide by all of the terms and conditions of this Agreement. If you create an account, you represent and warrant that you have never been convicted of a felony and that you are not required to register as a sex offender with any government entity. Using the Service may be prohibited or restricted in certain countries. If you use the Service from outside of the United States, you are responsible for complying with the laws and regulations of the territory from which you access or use the Service.</p></li><li>Creating an Account.<p>ClixTV.com is free to use, however, if you wish to receive access to all of the features and benefits of ClixTV, including earning Rewards points, you must become a member. To do so, you have the option of either creating a ClixTV account by entering your email address and creating a password or signing in using your Facebook or Google login. If you do so, you authorize us to access and use certain Facebook or Google account information, including but not limited to your public Facebook or Google profile and information about Facebook or Google connections you might share in common with other ClixTV users. For more information regarding the information we collect from you and how we use it, please consult our <a ui-sref=privacy-policy>Privacy Policy</a>.</p></li><li>Term and Termination.<p>This Agreement will remain in full force and effect while you use the Service and/or have a ClixTV account. You may disable your account at any time, for any reason, by emailing <a href=mailto:accounts@clixtv.com>accounts@ClixTV.com</a>. The Company may terminate or suspend your account at any time without notice if the Company believes that you have breached this Agreement, or for any other reason, with or without cause, in its sole discretion. Upon such termination or suspension, you will not be entitled to any refund of Rewards. The Company is not required to disclose, and may be prohibited by law from disclosing, the reason for the termination or suspension of your account.</p><p>After your account is terminated for any reason, all terms of this Agreement survive such termination, and continue in full force and effect, except for any terms that by their nature expire or are fully satisfied.</p></li><li>Non-commercial Use by Users.<p>The Service is for personal use only. Users may not use the Service or any content contained in the Service (including, but not limited to, content of other users, designs, text, graphics, images, video, information, logos, software, audio files and computer code) in connection with any commercial endeavors, such as (i) advertising or soliciting any user to buy or sell any products or services not offered by the Company or (ii) soliciting others to attend parties or other social functions, or networking, for commercial purposes. Users of the Service may not use any information obtained from the Service to contact, advertise to, solicit, or sell to any other user without his or her prior explicit consent. Organizations, companies, and/or businesses may not use the Service for any purpose except with ClixTV’s express consent (such as for promoted profiles or other advertisements), which ClixTV may provide or deny in its sole discretion. The Company may investigate and take any available legal action in response to illegal and/or unauthorized uses of the Service, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email and unauthorized framing of or linking to the Service.</p></li><li>Account Security.<p>You are responsible for maintaining the confidentiality of the username and password you designate during the registration process, including accounts created through the use of your Facebook or Google account credentials, and you are solely responsible for all activities that occur under your username and password. You agree to immediately notify the Company of any disclosure or unauthorized use of your username or password or any other breach of security at <a href=mailto:help@clixtv.com>help@ClixTV.com</a> and ensure that you log out from your account at the end of each session.</p></li><li>Your Interactions with Other Users.<p>YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS. YOU UNDERSTAND THAT THE COMPANY CURRENTLY DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS OR SCREENINGS ON ITS USERS. THE COMPANY ALSO DOES NOT INQUIRE INTO THE BACKGROUNDS OF ALL OF ITS USERS OR ATTEMPT TO VERIFY THE STATEMENTS OF ITS USERS. THE COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF USERS OR THEIR COMPATIBILITY WITH ANY CURRENT OR FUTURE USERS. THE COMPANY RESERVES THE RIGHT TO CONDUCT ANY CRIMINAL BACKGROUND CHECK OR OTHER SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES), AT ANY TIME AND USING AVAILABLE PUBLIC RECORDS.</p></li><li>User Conduct<p>The Company is not responsible for the conduct of any user. As noted in and without limiting Sections 11 and 17 below, in no event shall the Company, its affiliates or its partners be liable (directly or indirectly) for any losses or damages whatsoever, whether direct, indirect, general, special, compensatory, consequential, and/or incidental, arising out of or relating to the conduct of you or anyone else in connection with the use of the Service including, without limitation, death, bodily injury, emotional distress, and/or any other damages resulting from communications or meetings with other users or persons you meet through the Service. You agree to take all necessary precautions in all interactions with other users, particularly if you decide to communicate off the Service or meet in person, or if you decide to send money to another user. You understand that the Company makes no guarantees, either express or implied, regarding your ultimate compatibility with individuals you meet through the Service. You should not provide your financial information (for example, your credit card or bank account information), or wire or otherwise send money, to other users.</p></li><li>Prohibited Activities.<p>The Company reserves the right to investigate, suspend and/or terminate your account if you have misused the Service or behaved in a way the Company regards as inappropriate or unlawful, including actions or communications the occur off the Service but involve users you meet through the Service. The following is a partial list of the type of actions that you may not engage in with respect to the Service. You will not:</p><ol type=a><li>impersonate any person or entity.</li><li>solicit money from any users.</li><li>post any Content that is prohibited by Section 10.</li><li>\"stalk\" or otherwise harass any person.</li><li>express or imply that any statements you make are endorsed by the Company without our specific prior written consent.</li><li>use the Service in an illegal manner or to commit an illegal act;</li><li>access the Service in a jurisdiction in which it is illegal or unauthorized;</li><li>ask or use users to conceal the identity, source, or destination of any illegally gained money or products.</li><li>use any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, \"data mine\", or in any way reproduce or circumvent the navigational structure or presentation of the Service or its contents.</li><li>collect usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email or unauthorized framing of or linking to the Service.</li><li>interfere with or disrupt the Service or the servers or networks connected to the Service.</li><li>email or otherwise transmit any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment.</li><li>forge headers or otherwise manipulate identifiers in order to disguise the origin of any information transmitted to or through the Service (either directly or indirectly through use of third party software).</li><li>\"frame\" or \"mirror\" any part of the Service, without the Company's prior written authorization.</li><li>use meta tags or code or other devices containing any reference to the Company or the Service (or any trademark, trade name, service mark, logo or slogan of the Company) to direct any person to any other website for any purpose.</li><li>modify, adapt, sublicense, translate, sell, reverse engineer, decipher, decompile or otherwise disassemble any portion of the Service any software used on or for the Service, or cause others to do so.</li><li>post, use, transmit or distribute, directly or indirectly, (e.g. screen scrape) in any manner or media any content or information obtained from the Service other than solely in connection with your use of the Service in accordance with this Agreement</li></ol><p>The Company reserves the right, in its sole discretion, to investigate and take any legal action against anyone who violates this provision, including removing the offending communication from the Service and terminating or suspending the account of such violators.</p></li><li>Content Posted by You in the Service.<ol type=a><li>You are solely responsible for the content and information that you post, upload, publish, link to, transmit, record, display or otherwise make available (hereinafter, \"post\") on the Service or transmit to other users, including text messages, chat, videos (including streaming videos), photographs, or profile text, whether publicly posted or privately transmitted (collectively, \"Content\"). You may not post as part of the Service, or transmit to the Company or any other user (either on or off the Service), any offensive, inaccurate, incomplete, abusive, obscene, profane, threatening, intimidating, harassing, racially offensive, or illegal material, or any material that infringes or violates another person’s rights (including intellectual property rights, and rights of privacy and publicity). You represent and warrant that (i) all information that you submit upon creation of your account, including information submitted from your Facebook or GoogleLinkedaccount, is accurate and truthful and that you will promptly update any information provided by you that subsequently becomes inaccurate, incomplete, misleading or false and (ii) you have the right to post the Content on the Service and grant the licenses set forth below.</li><li>You agree that any Content you place on the Service may be viewed by other users and may be viewed by any person visiting or participating in the Service.</li><li>In addition to the types of Content described in Section 9 above, the following is a partial list of the kind of Content that is prohibited in the Service. You may not post, upload, display or otherwise make available Content that:<ol type=i><li>promotes racism, bigotry, hatred or physical harm of any kind against any group or individual;</li><li>advocates harassment or intimidation of another person;</li><li>requests money from, or is intended to otherwise defraud, other users of the Service;</li><li>involves the transmission of \"junk mail\", \"chain letters,\" or unsolicited mass mailing or \"spamming\" (or \"spimming\", \"phishing\", \"trolling\" or similar activities);</li><li>promotes information that is false or misleading, or promotes illegal activities or conduct that is defamatory, libelous or otherwise objectionable;</li><li>promotes an illegal or unauthorized copy of another person’s copyrighted work, such as providing pirated computer programs or links to them, providing information to circumvent manufacture-installed copy-protect devices, or providing pirated images, audio or video, or links to pirated images, audio or video files;</li><li>contains video, audio photographs, or images of another person without his or her permission (or in the case of a minor, the minor’s legal guardian);</li><li>contains restricted or password only access pages, or hidden pages or images (those not linked to or from another accessible page);</li><li>provides material that exploits people in a sexual, violent or other illegal manner, or solicits personal information from anyone under the age of 18;</li><li>provides instructional information about illegal activities such as making or buying illegal weapons or drugs, violating someone’s privacy, or providing, disseminating or creating computer viruses;</li><li>contains viruses, time bombs, trojan horses, cancelbots, worms or other harmful, or disruptive codes, components or devices;</li><li>impersonates, or otherwise misrepresents affiliation, connection or association with, any person or entity;</li><li>provides information or data you do not have a right to make available under law or under contractual or fiduciary relationships (such as inside information, proprietary and confidential information);</li><li>disrupts the normal flow of dialogue, causes a screen to \"scroll\" faster than other users are able to type, or otherwise negatively affects other users’ ability to engage in real time exchanges;</li><li>solicits passwords or personal identifying information for commercial or unlawful purposes from other users or disseminates another person’s personal information without his or her permission; and</li><li>publicizes or promotes commercial activities and/or sales without our prior written consent such as contests, sweepstakes, barter, advertising, and pyramid schemes.</li></ol></li><li>Your use of the Service, including all Content you post through the Service, must comply with all applicable laws and regulations. You agree that the Company may access, preserve and disclose your account information and Content if required to do so by law or in a good faith belief that such access, preservation or disclosure is reasonably necessary, such as to: (i) comply with legal process; (ii) enforce this Agreement; (iii) respond to claims that any Content violates the rights of third parties; (iv) respond to your requests for customer service or allow you to use the Service in the future; or (v) protect the rights, property or personal safety of the Company or any other person.</li><li>By posting Content as part of the Service, you automatically grant to the Company, its affiliates, licensees and successors, an irrevocable, perpetual, non-exclusive, transferable, sub-licensable, fully paid-up, worldwide right and license to (i) use, copy, store, perform, display, reproduce, record, play, adapt, modify and distribute the Content, (ii) prepare derivative works of the Content or incorporate the Content into other works, and (iii) grant and authorize sublicenses of the foregoing in any media now known or hereafter created. You represent and warrant that any posting and use of your Content by the Company will not infringe or violate the rights of any third party.</li><li>You understand and agree that the Company may, but is not obligated to, monitor or review any Content you post as part of a Service. The Company may delete any Content, in whole or in part, that in the sole judgment of the Company violates this Agreement or may harm the reputation of the Service or the Company.</li></ol></li><li>Indemnity by You.<p>You agree to indemnify and hold the Company, its subsidiaries, and affiliates, and its and their directors, officers, agents, partners and employees, harmless from any loss, liability, claim, or demand, including reasonable attorney's fees, made by any third party due to or arising out of your breach of or failure to comply with this Agreement (including any breach of your representations and warranties contained herein), any postings or Content you post in the Service, and the violation of any law or regulation by you. The Company reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with the Company in connection therewith.</p></li><li>Modifications to Service.<p>The Company reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that the Company shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service. To protect the integrity of the Service, the Company reserves the right at any time in its sole discretion to block users from certain IP addresses from accessing the Service.</p></li><li>Links.<ol type=a><li>The Service may contain, and the Service or third parties may provide, advertisements and promotions offered by third parties and links to other web sites or resources. You acknowledge and agree that the Company is not responsible for the availability of such external websites or resources, and does not endorse and is not responsible or liable for any content, information, statements, advertising, goods or services, or other materials on or available from such websites or resources. Your correspondence or business dealings with, or participation in promotions of, third parties found in or through the Service, including payment and delivery of related goods or services, and any other terms, conditions, warranties or representations associated with such dealings, are solely between you and such third party. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of, or reliance upon, any such content, information, statements, advertising, goods or services or other materials available on or through any such website or resource.</li><li><p>From time to time, the Company may make third party opinions, advice, statements, offers, or other third party information or content available through the Service. All third party content is the responsibility of the respective authors thereof and should not necessarily be relied upon. Such third party authors are solely responsible for such content.</p><p>THE COMPANY DOES NOT: (I) GUARANTEE THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY THIRD PARTY CONTENT PROVIDED THROUGH THE SERVICE, OR (II) ADOPT, ENDORSE OR ACCEPT RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY OPINION, ADVICE, OR STATEMENT MADE BY ANY PARTY THAT APPEARS IN THE SERVICE. UNDER NO CIRCUMSTANCES WILL THE COMPANY OR ITS AFFILIATES BE RESPONSIBLE OR LIABLE FOR ANY LOSS OR DAMAGE RESULTING FROM YOUR RELIANCE ON INFORMATION OR OTHER CONTENT POSTED IN THE SERVICE, OR TRANSMITTED TO OR BY ANY USERS.</p></li><li><p>In addition to the preceding paragraph and other provisions of this Agreement, any advice that may be posted in the Service is for informational and entertainment purposes only and is not intended to replace or substitute for any professional financial, medical, legal, or other advice. The Company makes no representations or warranties and expressly disclaims any and all liability concerning any treatment, action by, or effect on any person following the information offered or provided within or through the Service. If you have specific concerns or a situation arises in which you require professional or medical advice, you should consult with an appropriately trained and qualified specialist.</p><p>ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE IS ACCESSED AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR AND HEREBY WAIVE ANY AND ALL CLAIMS AND CAUSES OF ACTION WITH RESPECT TO ANY DAMAGE TO YOUR DEVICE, COMPUTER SYSTEM, INTERNET ACCESS, DOWNLOAD OR DISPLAY DEVICE, OR LOSS OR CORRUPTION OF DATA THAT RESULTS OR MAY RESULT FROM THE DOWNLOAD OF ANY SUCH MATERIAL. IF YOU DO NOT ACCEPT THIS LIMITATION OF LIABILITY, YOU ARE NOT AUTHORIZED TO DOWNLOAD OR OBTAIN ANY MATERIAL THROUGH THE SERVICE.</p></li></ol></li><li>Copyright Policy.<p>You may not post, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior written consent of the owner of such proprietary rights. Without limiting the foregoing, if you believe that your work has been copied and posted on the Service in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information:</p><ol type=a><li>an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;</li><li>a description of the copyrighted work that you claim has been infringed;</li><li>a description of where the material that you claim is infringing is located on the Service (and such description must be reasonably sufficient to enable the Company to find the alleged infringing material, such as a url);</li><li>your address, telephone number and email address;</li><li>a written statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and</li><li>a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li></ol><p>Notice of claims of copyright infringement should be provided to the Company’s Copyright Agent at <a href=mailto:copyright@clixtv.com>copyright@ClixTV.com</a></p><p>The Company will terminate the accounts of repeat infringers.</p></li><li>Customer Service.<p>The Company provides assistance and guidance through its customer care representatives. When communicating with our customer care representatives, you agree to not be abusive, obscene, profane, offensive, sexist, threatening, harassing, racially offensive, or to not otherwise behave inappropriately. If we feel that your behavior towards any of our customer care representatives or other employees is at any time threatening or offensive, we reserve the right to immediately terminate your account.</p></li><li>Proprietary Rights.<p>The Company owns and retains all proprietary rights in the Service, and in all content, trademarks, trade names, service marks and other intellectual property rights related thereto. The Service contains the copyrighted material, trademarks, and other proprietary information of the Company and its licensors. You agree to not copy, modify, transmit, create any derivative works from, make use of, or reproduce in any way any copyrighted material, trademarks, trade names, service marks, or other intellectual property or proprietary information accessible through the Service, without first obtaining the prior written consent of the Company or, if such property is not owned by the Company, the owner of such intellectual property or proprietary rights. You agree to not remove, obscure or otherwise alter any proprietary notices appearing on any content, including copyright, trademark and other intellectual property notices.</p></li><li>Disclaimer.<p>You acknowledge and agree that neither the Company nor its affiliates and third party partners are responsible for and shall not have any liability, directly or indirectly, for any loss or damage, including personal injury or death, as a result of or alleged to be the result of (i) any incorrect or inaccurate Content posted in the Service, whether caused by users or any of the equipment or programming associated with or utilized in the Service; (ii) the timeliness, deletion or removal, incorrect delivery or failure to store any Content, communications or personalization settings; (iii) the conduct, whether online or offline, of any user; (iv) any error, omission or defect in, interruption, deletion, alteration, delay in operation or transmission, theft or destruction of, or unauthorized access to, any user or user communications; or (v) any problems, failure or technical malfunction of any telephone network or lines, computer online systems, servers or providers, computer equipment, software, failure of email or players on account of technical problems or traffic congestion on the Internet or at any website or combination thereof, including injury or damage to users or to any other person’s computer or device related to or resulting from participating or downloading materials in connection with the Internet and/or in connection with the Service.</p><p>TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, THE COMPANY PROVIDES THE SERVICE ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS AND GRANTS NO WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE WITH RESPECT TO THE SERVICE (INCLUDING ALL CONTENT CONTAINED THEREIN), INCLUDING (WITHOUT LIMITATION) ANY IMPLIED WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. THE COMPANY DOES NOT REPRESENT OR WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR FREE, SECURE OR THAT ANY DEFECTS OR ERRORS IN THE SERVICE WILL BE CORRECTED.</p></li><li>Notice.<p>The Company may provide you with notices, including those regarding changes to this Agreement, using any reasonable means now known or hereafter developed, including by email, regular mail, SMS, MMS, text message or postings in the Service. Such notices may not be received if you violate this Agreement by accessing the Service in an unauthorized manner. You agree that you are deemed to have received any and all notices that would have been delivered had you accessed the Service in an authorized manner.</p></li><li>Entire Agreement.<p>This Agreement, with the <a ui-sref=privacy-policy>Privacy Policy</a> and any specific guidelines or rules that are separately posted for particular services or offers in the Service, contains the entire agreement between you and the Company regarding the use of the Service. If any provision of this Agreement is held invalid, the remainder of this Agreement shall continue in full force and effect. The failure of the Company to exercise or enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision. You agree that your online account is non-transferable and all of your rights to your profile or contents within your account terminate upon your death. No agency, partnership, joint venture or employment is created as a result of this Agreement and you may not make any representations or bind the Company in any manner.</p></li><li>Amendment.<p>This Agreement is subject to change by the Company at any time.</p></li><li>Limitation on Liability.<p>TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, BUSINESS PARTNERS, LICENSORS OR SERVICE PROVIDERS BE LIABLE TO YOU OR ANY THIRD PERSON FOR ANY INDIRECT, RELIANCE, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, LOSS OF GOODWILL, DAMAGES FOR LOSS, CORRUPTION OR BREACHES OF DATA OR PROGRAMS, SERVICE INTERRUPTIONS AND PROCUREMENT OF SUBSTITUTE SERVICES, EVEN IF THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, THE COMPANY'S LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO THE COMPANY FOR THE SERVICE WHILE YOU HAVE AN ACCOUNT. YOU AGREE THAT REGARDLESS OF ANY STATUTE OR LAW TO THE CONTRARY, ANY CLAIM OR CAUSE OF ACTION ARISING OUT OF OR RELATED TO USE OF THE SERVICE OR THE TERMS OF THIS AGREEMENT MUST BE FILED WITHIN ONE YEAR AFTER SUCH CLAIM OR CAUSE OF ACTION AROSE OR BE FOREVER BARRED.</p></li><li>Arbitration and Governing Law.<p>The exclusive means of resolving any dispute or claim arising out of or relating to this Agreement (including any alleged breach thereof) or the Service shall be BINDING ARBITRATION administered by the American Arbitration Association. The one exception to the exclusivity of arbitration is that you have the right to bring an individual claim against the Company in a small-claims court of competent jurisdiction. But whether you choose arbitration or small-claims court, you may not under any circumstances commence or maintain against the Company any class action, class arbitration, or other representative action or proceeding.</p></li></ol></div></div>"
  );


  $templateCache.put('ui/tooltip-menu/view.tooltip-menu.html',
    "<div class=tooltip-menu><menu class=menu-container ng-show=menuopen><menuitem ng-repeat=\"item in items track by $index\"><a ng-click=onItemPress(item) class=menu-item ng-mouseover=onMouseover(item) ng-mouseleave=onMouseleave(item) ng-class=\"{'with-points': item.points}\"><i class=\"menu-icon {{item.icon}}\"></i> <span class=menu-label>{{item.label}}</span><clix-points-violator ng-if=item.points>{{item.points}}</clix-points-violator></a></menuitem></menu></div>"
  );


  $templateCache.put('ui/video-content-box/view.video-content-box.html',
    "<div class=\"video-content-box {{extraClass}}\" ng-show=ready><div class=header-container><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-inner-content><a ui-sref=\"star({ slug: '{{video.celebrity.name | slug}}' })\"><div class=artist-avatar style=\"background-image: url({{video.celebrity.thumbnail}})\"></div></a><div class=artist-name><a ui-sref=\"star({ slug: '{{video.celebrity.name | slug}}' })\">{{video.celebrity.name}}</a></div><div clix-tooltip-trigger tooltip-id=actions-button-{{$id}}><a class=menu-icon-container ng-click=menuClicked() clix-click-anywhere-else=bodyClicked><i class=icon-ellipsis></i></a></div><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip></div></div><div class=video-thumbnail ng-click=\"onPlayPress($event, video)\"><img ng-src={{video.thumbnail}} class=video-thumbnail-image clix-on-image-load=onImageLoad($event)><div class=violator-container clix-tooltip-trigger tooltip-id=signup-watch-points-{{$id}}><clix-violator>100 Reward Points</clix-violator></div><div class=video-thumbnail-action-container><div class=video-thumbnail-inner-container><div class=video-brand-icon-list><div class=video-brand-icon ng-repeat=\"brand in video.brands.brands | limitTo: 5 track by $index\" style=\"background-image: url({{brand.transparentThumbnail}})\"></div><div class=video-brand-icon style=\"background-image: url({{video.charity.transparentThumbnail}})\"></div></div></div><div class=action-buttons-container><div class=\"plus-icon save-button\" ng-class=\"{'icon-redeem-plus-icon': !isOnWatchlist, 'icon-remove-icon remove-icon': isOnWatchlist}\" clix-tooltip-trigger tooltip-id=watchlist-button-{{$id}} ng-click=onWatchlistPress()></div><clix-tooltip tooltip-id=watchlist-button-{{$id}}>{{isOnWatchlist ? 'Remove from your watchlist' : 'Add to your Watchlist'}}</clix-tooltip><div class=play-button><div class=play-button-hit-area><img ng-src={{$root.clixConfig.baseImageUrl}}/gradient-clix-icon.svg></div></div></div></div></div><div class=footer-container><a ui-sref=\"video({ id: video.id })\"><span class=series-title>Episode {{video.episodeNumber}}: {{video.title || '&nbsp;'}}</span><br><span class=episode-title>{{video.seriesTitle || '&nbsp;'}}</span></a></div></div><clix-tooltip tooltip-id=signup-watch-points-{{$id}}><div ng-show=!loggedInUser>After you sign up, you will receive 100 Reward Points for watching this video! <a ng-click=\"\">Learn More</a>.</div><div ng-show=loggedInUser>You will receive 100 Reward Points for watching this video!</div></clix-tooltip>"
  );


  $templateCache.put('ui/video-permalink/view.video-permalink.html',
    "<div ng-if=!ready><clix-loader size=large></clix-loader></div><div class=video-permalink-page ng-if=ready><div class=row><div class=\"col-md-7 col-lg-8 video-player-column-container\"><div class=video-player-container><div class=video-player ng-class=\"{'next-video-shown': videoComplete}\"><div id=videoPlayer></div><clix-video-player ng-if=\"video && !isMobile\" video=video auto-play=true video-id=videoPlayer on-ready=onPlayerReady></clix-video-player><clix-video-player ng-if=\"video && isMobile\" video=video auto-play=false video-id=videoPlayer on-ready=onPlayerReady></clix-video-player></div><div class=next-video-overlay-container ng-show=videoComplete ng-if=nextVideo><div class=next-video-container><div class=next-video-label>{{nextVideoIsRelated ? 'Click below to start another popular series!' : 'Click to watch the next video in this series'}}</div><div class=next-video><clix-video-content-callout video=nextVideo></clix-video-content-callout></div></div></div></div><div class=\"visible-sm visible-xs\"><div class=brands-charity-container><div class=brands-container><div class=brands-charity-title><div class=brands-title>Brands in this Series</div><div class=charity-title ng-if=video.charity>Charity</div></div><div class=logo-list-container><a ng-repeat=\"brand in video.brands.brands | limitTo: 4\" ui-sref=\"brand({ slug: '{{brand.title | slug}}' })\" class=brand-logo-link><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></a><div class=brand-logo-link ng-if=video.charity ui-sref=\"charity({ slug: '{{video.charity.title | slug}}' })\"><clix-charity-logo charity=video.charity></clix-charity-logo></div></div></div></div></div><div class=\"star-meta-info row\"><div class=\"col-lg-4 star-name-container\"><div class=star-avatar style=\"background-image: url({{video.celebrity.thumbnail}})\"></div><div class=star-name-favorite-container><div class=star-name>{{video.celebrity.name}}</div></div><div class=favorite-button clix-tooltip-trigger tooltip-id=favorite-button-{{$id}}><clix-favorite-button ng-click=onFavoriteCelebrityPress() is-favorite=isFavoriteCelebrity></clix-favorite-button></div><clix-tooltip tooltip-id=favorite-button-{{$id}}>{{isFavoriteCelebrity ? 'Remove this Star from your Favorites.' : 'Add this Star to your Favorites.'}}</clix-tooltip></div><div class=\"col-lg-8 social-container\"><div class=violator-container clix-tooltip-trigger tooltip-id=reward-points-button-{{$id}}><clix-violator size=large>100 Reward Points</clix-violator></div><clix-tooltip tooltip-id=reward-points-button-{{$id}}><div ng-if=pointsEnabled><clix-is-logged-in><logged-in>You will receive 100 Reward Points for watching this video!</logged-in><not-logged-in>After you sign up, you will receive 100 Reward Points for watching this video! <a clix-learn-more-modal-trigger>Learn More</a>.</not-logged-in></clix-is-logged-in></div><div ng-if=!pointsEnabled>Coming Soon! You will receive Reward Points for watching this video. <a clix-learn-more-modal-trigger>Learn More</a>.</div></clix-tooltip><div class=social-icon-container><a class=social-icon ng-class=\"{'icon-icon-favorite-heart-filled' : episodeLiked, 'icon-heart-icon' : !episodeLiked}\" clix-tooltip-trigger tooltip-id=heart-button-{{$id}} ng-click=onLikeVideoPress()></a><clix-tooltip tooltip-id=heart-button-{{$id}}>{{episodeLiked ? 'Video liked!' : 'Like this video!'}}</clix-tooltip><div class=social-icon-label>{{totalEpisodeLikes || '0' | shortNumber}}</div></div><div class=social-icon-container clix-tooltip-trigger tooltip-id=watchlist-button-{{$id}}><clix-save-button ng-click=onWatchlistPress() is-saved=isOnWatchlist></clix-save-button></div><clix-tooltip tooltip-id=watchlist-button-{{$id}}>{{isOnWatchlist ? 'Remove this video from your Watchlist.' : 'Add this video to your Watchlist.'}}</clix-tooltip><div class=social-icon-container><div clix-tooltip-trigger tooltip-id=share-button-{{$id}}><clix-share-button extra-class=\"social-icon share-icon\" video=video></clix-share-button></div><clix-tooltip tooltip-id=share-button-{{$id}}><div ng-if=pointsEnabled><div ng-if=loggedInUser>You will receive 50 Reward Points for sharing!</div><div ng-if=!loggedInUser>After signing up, you will receive 50 Reward Points for sharing! <a clix-learn-more-modal-trigger>Learn More</a>.</div></div><div ng-if=!pointsEnabled>Coming Soon! You will receive Reward Points for sharing. <a clix-learn-more-modal-trigger>Learn More</a>.</div></clix-tooltip><clix-points-violator>50</clix-points-violator></div></div></div><div class=\"hidden-xs hidden-sm\"><div class=up-next-container><div class=up-next-label>Up Next in This Series</div></div><div ng-if=!series><clix-loader size=small></clix-loader></div><div class=\"row next-video-list\"><div class=\"col-md-6 col-lg-4 next-video\" ng-repeat=\"nextVideo in series.seasons.seasons[0].episodes | orderBy : 'episodeNumber' track by $index\" ng-show=\"nextVideo.id !== video.id\"><clix-video-content-callout video=nextVideo></clix-video-content-callout></div></div></div></div><div class=\"col-md-5 col-lg-4 star-info-column-container\"><div class=about-video-container id=about-video-container><div class=about-video-inner-container id=about-video-inner-container><div class=\"about-video-overlay hidden-xs hidden-sm\" ng-if=!expanded></div><div class=video-info-container><div class=episode-number>Episode {{video.episodeNumber}}:</div><div class=episode-title>{{video.title}}</div><div class=series-title>{{video.series.title}}</div><div class=\"row total-views-available-container\"><div class=\"col-sm-6 total-views\">{{video.views | number}} views</div><div class=\"col-sm-6 available-until\" ng-if=video.expirationDate>Available Until {{video.expirationDate | clixDate: 'long'}}</div></div><div class=description>{{video.description}}</div><div class=meta-data><div class=meta-data-row ng-if=video.categories><span class=meta-data-label>Category: </span><span ng-repeat=\"category in video.categories.categories\"><a ui-sref=\"category({ slug: '{{category.title | slug}}' })\">{{category.title}}</a><span ng-if=!$last>,&nbsp;</span></span></div><div class=meta-data-row ng-if=video.celebrity><span class=meta-data-label>Stars: </span><a ui-sref=\"star({ slug: '{{video.celebrity.name | slug}}' })\">{{video.celebrity.name}}</a></div><div class=meta-data-row ng-if=video.brands><span class=meta-data-label>Brands: </span><span ng-repeat=\"brand in video.brands.brands\"><a ui-sref=\"brand({ slug: '{{brand.title | slug}}' })\">{{brand.title}}</a><span ng-if=!$last>,&nbsp;</span></span></div><div class=meta-data-row ng-if=video.charity><span class=meta-data-label>Charity: </span><a ui-sref=\"charity({ slug: '{{video.charity.title | slug}}' })\">{{video.charity.title}}</a></div></div></div></div><div id=toggle-button-container><div class=\"visibility-toggle-button hidden-xs hidden-sm\" id=toggle-button ng-show=!forceFullHeight><clix-secondary-button ng-click=onExpandToggle()>{{expanded ? 'Show Less' : 'Show More'}}</clix-secondary-button></div><div class=\"brands-charity-container hidden-sm hidden-xs\"><div class=brands-container><div class=brands-charity-title><div class=brands-title>Brands in this Series</div><div class=charity-title ng-if=video.charity>Charity</div></div><div class=logo-list-container><a ng-repeat=\"brand in video.brands.brands | limitTo: 4\" ui-sref=\"brand({ slug: '{{brand.title | slug}}' })\" class=brand-logo-link><clix-brand-charity-logo brand=brand hover-enabled=true></clix-brand-charity-logo></a><div class=brand-logo-link ng-if=video.charity><clix-charity-logo charity=video.charity></clix-charity-logo></div></div></div></div></div></div><div class=\"related-videos-container hidden-sm hidden-xs\"><div class=related-videos-header>Related Videos</div><div class=\"row related-videos-list\"><div ng-if=!relatedVideos><clix-loader size=small></clix-loader></div><div class=\"col-md-6 col-lg-6 related-video\" ng-repeat=\"relatedVideo in relatedVideos.videos | limitTo: 6 track by $index\"><clix-video-content-callout video=relatedVideo minimized=true></clix-video-content-callout></div></div></div></div></div><div class=\"visible-xs visible-sm\"><div class=up-next-container><div class=up-next-label>Up Next in This Series</div></div><div ng-if=!series><clix-loader size=small></clix-loader></div><div class=\"row next-video-list\"><div class=\"col-xs-6 next-video\" ng-repeat=\"nextVideo in series.seasons.seasons[0].episodes | orderBy : 'episodeNumber' track by $index\" ng-show=\"nextVideo.id !== video.id\"><clix-video-content-callout video=nextVideo></clix-video-content-callout></div></div></div><div class=\"related-videos-container visible-sm visible-xs\"><div class=related-videos-header>Related Videos</div><div class=\"row related-videos-list\"><div ng-if=!relatedVideos><clix-loader size=small></clix-loader></div><div class=\"col-xs-6 related-video\" ng-repeat=\"relatedVideo in relatedVideos.videos | limitTo: 6 track by $index\"><clix-video-content-callout video=relatedVideo></clix-video-content-callout></div></div></div></div>"
  );


  $templateCache.put('ui/violator/view.header-points-violator.html',
    "<div class=clix-header-points-violator ng-click=onRewardPointsPress() clix-tooltip-trigger tooltip-id=rewards-points-tooltip-{{$id}} cleanup=false><clix-callout-button><span ng-if=pointsEnabled>{{points ? points : 0}} </span><span ng-if=!pointsEnabled class=coming-soon-label>Coming Soon!</span></clix-callout-button>Reward Points</div><clix-tooltip tooltip-id=rewards-points-tooltip-{{$id}}><div ng-if=pointsEnabled>ClixTV rewards users for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badge, points can be earned.<br><br><a clix-learn-more-modal-trigger>Learn More</a>.</div><div ng-if=!pointsEnabled>Coming Soon! ClixTV will reward users for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badge, points will be earned.<br><br><a clix-learn-more-modal-trigger>Learn More</a>.</div></clix-tooltip>"
  );


  $templateCache.put('ui/violator/view.points-violator.html',
    "<div class=points-violator ng-class=\"{'points-disabled': !pointsEnabled}\"><span ng-if=pointsEnabled><span class=plus-sign>+</span><span ng-transclude></span> </span><span ng-if=!pointsEnabled><div class=\"trophy-icon icon-rewards-icon-left-nav\"></div></span></div>"
  );


  $templateCache.put('ui/violator/view.violator.html',
    "<div class=\"violator {{size}}\" ng-class=\"{'points-disabled': !pointsEnabled}\"><span ng-if=pointsEnabled>100 Reward Points </span><span ng-if=!pointsEnabled><div class=\"trophy-icon icon-rewards-icon-left-nav\"></div>Rewards Coming Soon!</span></div>"
  );

}]);

(function() {

    var AboutPageController = [
        '$scope',
        '$rootScope',
        'userService',
        'modalService',
        function($scope, $rootScope, userService, modalService) {

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignUpPress = function() {
                modalService.showSignUpModal();
            };

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('AboutPageController', AboutPageController);
}());
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
        '$timeout',
        '$stateParams',
        'userService',
        function($q, $scope, $rootScope, $timeout, $stateParams, userService) {

            $rootScope.pageTitle = 'Your Favorites - ClixTV';

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
                        _initTabScroll();
                    }
                );

            function _initTabScroll() {
                var element = document.getElementsByClassName('nav-tabs');
                if (!element) {
                    return;
                }
                $scope.tabScrollStart = true;
                element = element[0];
                angular.element(element).on('scroll', function(event) {
                    var $element = angular.element(element),
                        width = $element.outerWidth(),
                        scrollLeft = $element.scrollLeft(),
                        scrollWidth = $element[0].scrollWidth;
                    if (scrollLeft <= 0) {
                        $scope.tabScrollStart = true;
                    } else if ($scope.tabScrollStart) {
                        $scope.tabScrollStart = false;
                    }

                    if (scrollWidth - width === scrollLeft) {
                        $scope.tabScrollEnd = true;
                    } else if ($scope.tabScrollEnd) {
                        $scope.tabScrollEnd = false;
                    }

                    $timeout(function() {
                        $scope.$apply();
                    });
                });
            }

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
        'clixConfig',
        function($scope, $rootScope, userService, notificationsService, clixConfig) {

            $rootScope.pageTitle = 'Your Notifications - ClixTV';
            $scope.notificationEnabled = clixConfig.notificationEnabled;

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

                if ($scope.type === 'gender' && (typeof $scope.ngModel === 'string')) {
                    $scope.gender = $scope.genders.filter(function(availableGender) {
                        return availableGender.value === $scope.ngModel.toLowerCase();
                    })[0];
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

            $rootScope.pageTitle = 'Your Account Overview - ClixTV';

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        $scope.form = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
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
        'clixConfig',
        function($q, $scope, $rootScope, $uibModal, clixConfig) {

            $rootScope.pageTitle = 'Your Rewards - ClixTV';

            $scope.active = 0;
            $scope.pointsEnabled = clixConfig.pointsEnabled;
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

            $rootScope.pageTitle = 'Your Saved Offers - ClixTV';

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

            $rootScope.$on('favorite.removed', function(event, data) {
                if (!$scope.offers || !$scope.offers.offers) {
                    $scope.offers = {
                        offers: []
                    }
                }
                $scope.offers.offers = $scope.offers.offers.filter(function(item) {
                    return item.id !== data.id;
                });
            });

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
        'clixConfig',
        'educationModalService',
        function($q, $scope, $rootScope, userService, clixConfig, educationModalService) {

            $rootScope.pageTitle = 'Your Account Settings - ClixTV';
            $scope.notificationEnabled = clixConfig.notificationEnabled;

            if (!clixConfig.notificationEnabled) {
                educationModalService.showNotificationsComingSoonModal();
            }

            $scope.ready = false;

            var userSaving = false;

            function _saveUser() {
                if (userSaving) {
                    return;
                }
                userSaving = true;
                userService.updateUser($scope.loggedInUser)
                    .finally(
                        function onFinally() {
                            userSaving = false;
                        }
                    )
            }

            $q.all(
                    [
                        userService.getLoggedInUser(),
                        userService.getAccountSettings()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data[0];
                        $scope.settings = data[1];
                        $scope.generalSettings = data[1].settings.filter(function(setting) {
                            return setting.type === 'general';
                        });
                        $scope.accountSettings = data[1].settings.filter(function(setting) {
                            return setting.type === 'myClix';
                        });
                        $scope.enableEmailNotifications = ($scope.loggedInUser.enableEmailNotifications !== false);
                        $scope.enableTextNotifications = ($scope.loggedInUser.enableTextNotifications !== false);
                        $scope.enablePushNotifications = ($scope.loggedInUser.enablePushNotifications !== false);
                        $scope.ready = true;
                    }
                );

            $scope.$watch('enableEmailNotifications', function(newValue) {
                if ($scope.loggedInUser.enableEmailNotifications !== newValue) {
                    $scope.loggedInUser.enableEmailNotifications = newValue;
                    _saveUser();
                }
            });

            $scope.$watch('enableTextNotifications', function(newValue) {
                if ($scope.loggedInUser.enableTextNotifications !== newValue) {
                    $scope.loggedInUser.enableTextNotifications = newValue;
                    _saveUser();
                }
            });

            $scope.$watch('enablePushNotifications', function(newValue) {
                if ($scope.loggedInUser.enablePushNotifications !== newValue) {
                    $scope.loggedInUser.enablePushNotifications = newValue;
                    _saveUser();
                }
            });

            $scope.onSaveField = function() {
                _saveUser();
            };

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
        'clixConfig',
        function($scope, $rootScope, userService, clixConfig) {

            $rootScope.pageTitle = 'Your Watchlist - ClixTV';

            $scope.filtersEnabled = clixConfig.filtersEnabled;

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

            $rootScope.$on('favorite.removed', function(event, data) {
                if (!$scope.watchlist || !$scope.watchlist.videos) {
                    $scope.watchlist = {
                        videos: []
                    }
                }
                $scope.watchlist.videos = $scope.watchlist.videos.filter(function(item) {
                    return item.id !== data.id;
                });
            });

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
        '$filter',
        '$state',
        '$stateParams',
        'brandsService',
        'userService',
        'modalService',
        'catchMediaService',
        'knetikService',
        'clixConfig',
        function($q, $log, $scope, $rootScope, $filter, $state, $stateParams, brandsService, userService, modalService, catchMediaService, knetikService, clixConfig) {

            $scope.filtersEnabled = clixConfig.filtersEnabled;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

            $scope.onOfferPress = function(offer) {
                if ($stateParams.offerSlug === $filter('slug')(offer.title)) {
                    _showOfferModal();
                }
            };

            function _showOfferModal() {
                if ($scope.loggedInUser) {
                    modalService.showModal({
                        controller: 'OfferModalController',
                        templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
                        data: {
                            offerSlug: $stateParams.offerSlug
                        }
                    });
                } else {
                    modalService.showModal({
                        templateUrl: 'ui/common/modal/education/view.education-modal.html',
                        controller: 'EducationModalController',
                        data: {
                            type: 'signup-offer',
                            slug: $stateParams.offerSlug
                        }
                    });
                }
            }

            function _resetIsFavorite() {
                if ($scope.brand) {
                    $scope.isFavorite = userService.isFavoriteBrand($scope.brand.id);
                }
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
                _resetIsFavorite();
            });

            $rootScope.$on('favorite.added', _resetIsFavorite);
            $rootScope.$on('favorite.removed', _resetIsFavorite);

            $rootScope.$on('video.complete', function() {
                knetikService.viewCampaignVideo($scope.brand.id);
            });

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                        if ($stateParams.offerSlug) {
                            _showOfferModal();
                        }
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteBrand($scope.brand.id);
                } else {
                    userService.addFavoriteBrand($scope.brand.id);
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

                switch(tab) {

                    case 'offers':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'offer',
                            source_cm: 'media',
                            source_type: 'campaign',
                            source_id: $scope.brand.id
                        });
                        break;

                    case 'stars':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'person',
                            source_cm: 'media',
                            source_type: 'campaign',
                            source_id: $scope.brand.id
                        });
                        break;

                    case 'videos':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'episode',
                            source_cm: 'media',
                            source_type: 'campaign',
                            source_id: $scope.brand.id
                        });
                        break;
                }
            };

            brandsService.getBrandBySlug($stateParams.slug)
                .then(
                    function onSuccess(data) {

                        $scope.brand = data;
                        $scope.active = 0;

                        // Don't overwrite the title if we're showing an offer
                        if (!$stateParams.offerSlug) {
                            $rootScope.pageTitle = $scope.brand.title + ' - ClixTV';
                        }

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

                        catchMediaService.trackAppEvent('navigation_item', {
                            target_cm: 'media',
                            target_type: 'campaign',
                            target_id: $scope.brand.id
                        });
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
        .controller('BrandController', BrandController);
}());
(function() {

    var BrandsController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'brandsService',
        'catchMediaService',
        function($q, $scope, $rootScope, $stateParams, brandsService, catchMediaService) {

            $rootScope.pageTitle = 'Brands - ClixTV';
            $scope.activeTab = 'brands';

            var offersLoading = false,
                canLoadMoreOffers = true,
                offerPage = 0,
                OFFER_LIMIT = 24,
                brandsLoading = false,
                canLoadMoreBrands = true,
                brandPage = 0,
                BRAND_LIMIT = 24;

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

            $scope.onTabSelect = function(tab) {
                $scope.activeTab = tab;
                switch (tab) {
                    case 'offers':
                        if (!$scope.offers) {
                            _loadOffers();
                        }
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'offer'
                        });
                        break;
                }
            };

            $scope.loadMoreOffers = function() {
                _loadOffers();
            };

            $scope.loadMoreBrands = function() {
                _loadBrands();
            };

            function _loadOffers() {
                if (offersLoading || $scope.activeTab !== 'offers' || !canLoadMoreOffers) {
                    return;
                }
                offersLoading = true;
                return brandsService.getAllOffers(offerPage, OFFER_LIMIT)
                    .then(
                        function onSuccess(data) {
                            if ($scope.offers) {
                                $scope.offers.offers = $scope.offers.offers.concat(data.offers);
                            } else {
                                $scope.offers = data;
                            }
                            offersLoading = false;
                            offerPage += 1;
                            if (!data.offers || !data.offers || data.offers.length === 0) {
                                canLoadMoreOffers = false;
                            }
                        }
                    );
            }

            function _loadBrands() {
                if (brandsLoading || $scope.activeTab !== 'brands' || !canLoadMoreBrands) {
                    return;
                }
                brandsLoading = true;
                $scope.active = 0;
                return brandsService.getAllBrands(brandPage, BRAND_LIMIT)
                    .then(
                        function onSuccess(data) {
                            $scope.ready = true;
                            if ($scope.brands) {
                                $scope.brands.brands = $scope.brands.brands.concat(data.brands);
                            } else {
                                $scope.brands = data;
                            }
                            brandsLoading = false;
                            brandPage += 1;
                            if (!data.brands || !data.brands || data.brands.length === 0) {
                                canLoadMoreBrands = false;
                            }
                        }
                    );
            }

            _loadBrands();

            catchMediaService.trackAppEvent('navigation', {
                target_cm: 'media',
                target_type: 'campaign'
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('BrandsController', BrandsController);
}());
(function() {

    var PrimaryButtonController = [
        '$scope',
        function($scope) {

        }
    ];

    angular
        .module('clixtv')
        .controller('PrimaryButtonController', PrimaryButtonController);
}());
(function() {

    var primaryButton = function() {
        return {
            restrict: 'AE',
            transclude: true,
            controller: 'PrimaryButtonController',
            templateUrl: 'ui/buttons/view.primary-button.html',
            scope: {
                type: '@?',
                circle: '@?',
                loading: '=?'
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
        '$rootScope',
        'categoryService',
        'catchMediaService',
        function($q, $scope, $rootScope, categoryService, catchMediaService) {

            $rootScope.pageTitle = 'Categories - ClixTV';

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

            categoryService.getAllCategories(true)
                .then(
                    function onSuccess(data) {
                        var categories = data;
                        categories.categories = categories.categories.filter(function(category) {
                            return category.totalVideos && category.totalVideos !== 0;
                        });

                        $scope.categories = categories;
                    }
                );

            catchMediaService.trackAppEvent('navigation', {
                target_cm: 'entity',
                target_type: 'category'
            });
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
        'clixConfig',
        function($q, $log, $scope, $rootScope, $state, $stateParams, categoryService, userService, modalService, catchMediaService, clixConfig) {

            function _resetIsFavorite() {
                if ($scope.category) {
                    $scope.isFavorite = userService.isFavoriteCategory($scope.category.id);
                }
            }

            $scope.notify = false;
            $scope.filtersEnabled = clixConfig.filtersEnabled;

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
                    userService.removeFavoriteCategory($scope.category.id);
                } else {
                    userService.addFavoriteCategory($scope.category.id);

                    catchMediaService.trackAppEvent('favorite', {
                        target_cm: 'entity',
                        target_type: 'category',
                        target_name: $scope.category.title
                    });
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
                        categoryService.getCategoryBySlug($stateParams.slug),
                        categoryService.getAllCategories()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.category = data[0];
                        $scope.categories = data[1];

                        $rootScope.pageTitle = $scope.category.title + ' Videos - ClixTV';

                        catchMediaService.trackAppEvent('navigation_item', {
                            target_cm: 'entity',
                            target_type: 'category',
                            target_name: $scope.category.title
                        });
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

    var VIDEO_MARGIN_LEFT = 6;

    var VideoCategoryScrollList = [
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        function($scope, $rootScope, $window, $timeout) {

            $scope.left = 0;

            if ($scope.viewAllSref) {
                $scope.sref = $scope.viewAllSref;
            } else if ($scope.category) {
                $scope.sref = 'category({ slug: \'{{' + $scope.category.title + ' | slug}}\' })';
            } else {
                $scope.sref = 'home';
            }

            function _resetArrowStates() {
                var minWidth = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
                $scope.leftArrowVisible = $scope.left <= minWidth;
                $scope.rightArrowVisible = $scope.left >= 0;
            }

            function _recalculateWidth() {

                var splitWidth = 2;

                if ($window.innerWidth > 480) {
                    splitWidth = 3.7;
                }

                if ($window.innerWidth > 992) {
                    splitWidth = 3.7;
                }

                if ($window.innerWidth > 1200) {
                    splitWidth = 5.7;
                }

                $scope.videoContainerWidth = ($window.innerWidth - VIDEO_MARGIN_LEFT) / splitWidth;
                $scope.arrowScrollWidth = $scope.videoContainerWidth + VIDEO_MARGIN_LEFT;

                $timeout(function() {
                    $scope.$apply();
                    $rootScope.$broadcast('thumbnail.resize');
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
                        angular.element(window).trigger("checkInView");
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
                categoryVideos: '=?',
                enableShowMore: '@?',
                viewAllSref: '@?',
                order: '@?'
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
        '$rootScope',
        '$stateParams',
        'brandsService',
        'catchMediaService',
        function($q, $scope, $rootScope, $stateParams, brandsService, catchMediaService) {

            $rootScope.pageTitle = 'Charities - ClixTV';

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

            catchMediaService.trackAppEvent('navigation', {
                target_cm: 'media',
                target_type: 'organization'
            });
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
        '$filter',
        '$uibModal',
        '$state',
        '$stateParams',
        'brandsService',
        'userService',
        'catchMediaService',
        'clixConfig',
        function($q, $log, $scope, $rootScope, $filter, $uibModal, $state, $stateParams, brandsService, userService, catchMediaService, clixConfig) {

            $scope.filtersEnabled = clixConfig.filtersEnabled;

            function _resetIsFavorite() {
                if ($scope.charity) {
                    $scope.isFavorite = userService.isFavoriteCharity($scope.charity.id);
                }
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
                    userService.removeFavoriteCharity($scope.charity.id);
                } else {
                    userService.addFavoriteCharity($scope.charity.id);
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

            brandsService.getCharityBySlug($stateParams.slug)
                .then(
                    function onSuccess(data) {

                        if (!data || !data.id) {
                            throw new Error('Invalid data returned');
                        }

                        $scope.charity = data;


                        var eventParams = {
                            target_cm: 'media',
                            target_type: 'organization',
                            target_id: $scope.charity.id
                        };

                        if ($stateParams.starId) {
                            eventParams.source_cm = 'media';
                            eventParams.source_type = 'person';
                            eventParams.source_id = $stateParams.starId;
                        }

                        catchMediaService.trackAppEvent('navigation_item', eventParams);

                        $filter('orderBy')($scope.charity.videos.videos, ['episodeNumber']);

                        $scope.active = 0;

                        $rootScope.pageTitle = $scope.charity.title + ' - ClixTV';

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

            $scope.onTabSelect = function(tab) {

                switch (tab) {

                    case 'stars':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'person',
                            source_cm: 'media',
                            source_type: 'organization',
                            source_id: $scope.charity.id
                        });
                        break;

                    case 'videos':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'episode',
                            source_cm: 'media',
                            source_type: 'organization',
                            source_id: $scope.charity.id
                        });
                        break;
                }
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

    var HomePageBannerController = [
        '$scope',
        '$rootScope',
        'modalService',
        'userService',
        function($scope, $rootScope, modalService, userService) {

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                    }
                );

            var backgroundVideo = jwplayer('videoPlayer').setup({
                file: 'https://s3-us-west-2.amazonaws.com/clixtv.prod/clix-home-video2.m3u8',
                autostart: true,
                controls: false,
                mute: true,
                repeat: true,
                width: '100%',
                aspectratio: '16:9'
            });

            // For whatever reason, JWPlayer doesn't honor the 'repeat: true' param
            // with an HLS file, so we'll force it here.
            backgroundVideo.on('time', function(e) {
                if (e.position >= (e.duration - 0.25)) {
                    backgroundVideo.seek(0);
                }
            });


        }
    ];

    angular
        .module('clixtv')
        .controller('HomePageBannerController', HomePageBannerController);
}());
(function() {

    var LandingPageBannerController = [
        '$scope',
        '$transclude',
        'parallaxHelper',
        function($scope, $transclude, parallaxHelper) {
            $scope.shareButtonProvided = $transclude.isSlotFilled('bannerShareButtonContainer');
            $scope.background = parallaxHelper.createAnimator(-0.3);
        }
    ];

    angular
        .module('clixtv')
        .controller('LandingPageBannerController', LandingPageBannerController);
}());
(function() {

    var homePageBanner = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/banners/view.home-page-banner.html',
            controller: 'HomePageBannerController',
            scope: {}
        }
    };

    var landingPageBanner = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/banners/view.landing-page-banner.html',
            controller: 'LandingPageBannerController',
            scope: {
                backgroundImage: '@',
                mobileBackgroundImage: '@?'
            },
            transclude: {
                bannerType: 'bannerType',
                bannerTitle: 'bannerTitle',
                bannerSubTitle: 'bannerSubTitle',
                bannerLogoContainer: 'bannerLogoContainer',
                bannerButtonContainer: 'bannerButtonContainer',
                bannerShareButtonContainer: '?bannerShareButtonContainer'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixHomePageBanner', homePageBanner)
        .directive('clixLandingPageBanner', landingPageBanner);
}());
(function() {

    var BrandCharityLogoController = [
        '$q',
        '$scope',
        'clixConfig',
        function($q, $scope, clixConfig) {

            $scope.menuVisible = false;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

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

            $scope.onImageLoad = function() {
                $scope.ready = true;
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

            $scope.onImageLoad = function() {
                $scope.ready = true;
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
        'clixConfig',
        function($q, $scope, clixConfig) {

            $scope.menuVisible = false;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

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

            $scope.onImageLoad = function() {
                $scope.ready = true;
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

                if (type === 'category' && !isFavorited) {
                    catchMediaService.trackAppEvent('favorite', {
                        target_cm: 'entity',
                        target_type: 'category',
                        target_name: item.title
                    });
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
        '$element',
        '$filter',
        '$window',
        '$timeout',
        '$state',
        'userService',
        'shareModalService',
        'clixConfig',
        'modalService',
        function($q, $scope, $rootScope, $element, $filter, $window, $timeout, $state, userService, shareModalService, clixConfig, modalService) {

            $scope.menuVisible = false;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

            // Not a fan of state aware components, but the site is riddled with this view
            // and it's a quicker path this way
            $scope.isVideoPage = ($state.current.name === 'video');

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

            // $rootScope.$on('thumbnail.resize', function() {
            //     _recalculateAspectRatio();
            // });

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

                if ($scope.loggedInUser) {
                    $scope.videoUnavailable = false;
                } else if ($scope.video.episodeNumber && parseInt($scope.video.episodeNumber) > clixConfig.lockedMinimumEpisodeNumber) {
                    $scope.videoUnavailable = true;
                }

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

            // function _recalculateAspectRatio() {
            //     var ASPECT_RATIO = 1.78,
            //         width = $element.find('.clix-video-content-callout').outerWidth();
            //
            //     $scope.containerHeight = (width * ASPECT_RATIO) + 'px';
            //
            //     // $timeout(function() {
            //     //     $scope.$apply();
            //     // });
            // }

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
                    $state.go('video', { slug: $filter('slug')($scope.video.seriesTitle + ' ' + $scope.video.title)});
                }
            };

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

            $scope.onLoginPress = function() {
                modalService.showLogInModal();
            };

            $scope.onImageLoad = function(event) {
                $scope.ready = true;
            };

            // angular.element($window).on('resize.doResize', function () {
            //     _recalculateAspectRatio();
            // });

            // $scope.$watch(function() {
            //     _recalculateAspectRatio();
            // });

            // $timeout(function() {
            //     _recalculateAspectRatio();
            // });



            // console.log($element.outerWidth())
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
                    charity: '=',
                    star: '=?'
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
                video: '=',
                minimized: '@'
            }
        }
    };

    var videoContentCalloutList = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/container/view.video-content-callout-list.html',
            scope: {
                videos: '=',
                gridClasses: '@?',
                order: '@'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoContentCallout', videoContentCallout)
        .directive('clixVideoContentCalloutList', videoContentCalloutList);
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
        '$rootScope',
        function($scope, $rootScope) {

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

            $rootScope.$on('$stateChangeStart', function() {
                angular.element(document.getElementById('clix-form-input-error-' + $scope.$id)).remove();
            });

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

    var LazyLoaderController = [
        '$scope',
        '$timeout',
        function($scope, $timeout) {
            $scope.containerInView = function($inview, $inviewInfo) {
                if (!$inview) {
                    return;
                }

                // Weird bug where sometimes it fires right as the page content loads...
                if ($inviewInfo && $inviewInfo.elementRect && $inviewInfo.elementRect.left === 0 && $inviewInfo.elementRect.top === 0) {
                    return;
                }

                $scope.imageToLoad = $scope.imageSource;
            };

            $scope.onImageLoad = function() {
                $scope.imageLoaded = true;
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('LazyLoaderController', LazyLoaderController);
}());
(function() {
    var lazyLoader = [
        function() {
            return {
                restrict: 'AE',
                controller: 'LazyLoaderController',
                templateUrl: 'ui/common/image/lazy-loader/view.lazy-loader.html',
                scope: {
                    imageSource: '@?',
                    showPlaceholder: '@?'
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixLazyLoader', lazyLoader);
}());
(function() {
    var placeholder = [
        function() {
            return {
                restrict: 'AE',
                replace: true,
                template: '<img class="clix-placeholder" ng-src="{{$root.clixConfig.baseImageUrl}}/clixtv-loader-logo.svg" />'
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixPlaceholder', placeholder);
}());
(function() {

    var infiniteScroll = function() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="clix-infinite-scroll" in-view="$inview && onLoadMore($inview, $inviewInfo)"><clix-loader size="small"></clix-loader></div>',
            scope: {
                onLoadMore: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixInfiniteScroll', infiniteScroll);
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

    var brandLogo = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/logos/view.brand-logo.html',
            scope: {
                brand: '=',
                minimized: '@?'
            }
        }
    };

    var charityLogo = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/logos/view.charity-logo.html',
            scope: {
                charity: '=',
                minimized: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixBrandAssetLogo', brandLogo)
        .directive('clixCharityAssetLogo', charityLogo);
}());
(function() {

    var AlertModalController = [
        '$scope',
        '$uibModalInstance',
        'data',
        'modalService',
        function($scope, $uibModalInstance, data, modalService) {
            $scope.title = data.title;
            $scope.message = data.message;

            $scope.onCloseButtonPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close();
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('AlertModalController', AlertModalController);
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
        'clixConfig',
        function($scope, $timeout, $filter, $uibModalInstance, clixConfig) {

            $scope.buyPointsModel = 0;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

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
        'clixConfig',
        function($q, $scope, $rootScope, $timeout, $uibModalInstance, data, userService, videosService, brandsService, celebrityService, categoryService, offersService, modalService, preferencesService, clixConfig) {

            $scope.showAgainModel = false;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

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
                        if ($scope.pointsEnabled) {
                            title = (isLoggedIn) ? 'Reward Points Earned' : 'Reward Points Missed!';
                        } else {
                            title = 'Reward points coming soon';
                        }
                        break;

                    case 'learn-more':
                        title = (isLoggedIn) ? 'Earn Rewards!' : 'Earn Reward Points!';
                        break;

                    case 'anonymous-liked-video':
                    case 'signup-offer':
                        title = 'Sign Up Now';
                        break;

                    case 'notifications-coming-soon':
                        title = 'Notifications Coming Soon';
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

                    case 'anonymous-liked-video':
                    case 'signup-offer':
                        return $q.when();
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
        'clixConfig',
        function($scope, $rootScope, $uibModalInstance, userService, data, clixConfig) {

            $scope.signup = data.signup;

            $scope.isBeta = (clixConfig.beta === true);

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
                realFirstName: '',
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
                $scope.error = undefined;
                if (!$scope.loginModel.email || !$scope.loginModel.password) {
                    $scope.error = 'All fields are required';
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
                            $scope.error = 'Incorrect login information';
                            console.log(error);
                        }
                    );
            };

            $scope.onSignupSubmit = function() {

                // Honeypot field...
                if ($scope.signupModel.firstName) {
                    return;
                }

                $scope.error = undefined;

                if (
                    !$scope.signupModel.email ||
                    !$scope.signupModel.password ||
                    !$scope.signupModel.realFirstName ||
                    !$scope.signupModel.lastName/* ||
                    !$scope.signupModel.birthdate ||
                    !$scope.signupModel.gender*/
                ) {
                    $scope.error = 'All fields are required';
                    return;
                }

                if ($scope.signupModel.email !== $scope.signupModel.emailConfirm) {
                    $scope.error = 'Email and confirmation do not match';
                    return;
                }

                if ($scope.signupModel.password !== $scope.signupModel.passwordConfirm) {
                    $scope.error = 'Password and confirmation do not match';
                    return;
                }



                userService.signupUser($scope.signupModel.email, $scope.signupModel.password, $scope.signupModel.realFirstName, $scope.signupModel.lastName)
                    .then(
                        function onSuccess(data) {
                            $uibModalInstance.close();
                            userService.addUserToNewsletter($scope.signupModel.email, $scope.signupModel.realFirstName, $scope.signupModel.lastName);
                        }
                    )
                    .catch(
                        function onError(error) {
                            $scope.error = 'Account already exists with this email address';
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
                            userService.addUserToNewsletter(data.email, data.firstName, data.lastName);
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
        '$window',
        '$rootScope',
        'modalService',
        'educationModalService',
        'offersService',
        'userService',
        'data',
        'knetikService',
        'catchMediaService',
        function($q, $scope, $window, $rootScope, modalService, educationModalService, offersService, userService, data, knetikService, catchMediaService) {

            function _setIsSaved() {
                if ($scope.offer) {
                    $scope.isSavedOffer = userService.isSavedOffer($scope.offer.id);
                }
            }

            $rootScope.$on('user.login', _setIsSaved);

            offersService.getOfferBySlug(data.offerSlug)
                .then(
                    function onSuccess(data) {
                        var brand = data.brand || data.campaign;
                        $scope.offer = data;

                        knetikService.viewOffer($scope.offer.id);

                        $rootScope.pageTitle = $scope.offer.title + ' Offer at ' + (brand ? brand.title : '') + ' - ClixTV';

                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'offer',
                            target_id: $scope.offer.id
                        });
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
                    knetikService.saveOffer($scope.offer.id);
                    $scope.isSavedOffer = true;

                    userService.getLoggedInUser()
                        .then(
                            function onSuccess(data) {
                                if (data !== false) {
                                    catchMediaService.trackMediaEvent($scope.offer.id, 'offer', 'offer_saved');
                                }
                            }
                        );
                }
            };

            $scope.onOfferRedeemPress = function() {
                var rfiLink, slug = $scope.offer.slug;

                if ($scope.offer.rfiLink) {
                    $window.open($scope.offer.rfiLink, '_blank');
                    return;
                }

                /**
                 * @todo - Remove this once the CMS works correctly...
                 */
                switch (slug) {
                    case 'up-to-50percent-off-mens-sneakers':
                        rfiLink = 'http://store.nike.com/us/en_us/pw/mens-clearance-shoes/47Z7puZoi3?mid=38660&mid=38660&cp=usns_aff_nike_080113_FPWseZFEpyY&site=FPWseZFEpyY-0vukNjv0tIeI5INdBP9IdQ';
                        break;
                    case 'up-to-50percent-off-hoodies-and-pullovers':
                        rfiLink = 'http://store.nike.com/us/en_us/pw/mens-clearance-sweatshirts-hoodies/47Z7puZobq?ipp=63&mid=38660&cp=usns_aff_nike_080113_FPWseZFEpyY&site=FPWseZFEpyY-ecYOD_SFVLx2TReCgcdgAA';
                        break;
                    case 'save-on-items-for-girls':
                        rfiLink = 'http://store.nike.com/us/en_us/pw/girls-clearance/47Z7pw?ipp=120';
                        break;
                    case '50percent-off-scuderia-ferrari-tincan-carbon-sunglasses':
                        rfiLink = 'https://www.groupon.com/deals/gg-oakley-scuderia-ferrari-tincan-carbon-sunglasses';
                        break;
                    case '57percent-off-sunglasses-for-men-and-women':
                        rfiLink = 'https://www.groupon.com/deals/gg-oakley-sunglasses-for-men-and-women-5';
                        break;
                    case '30percent-off-patio-furniture':
                        rfiLink = 'http://www.target.com/p/7pc-sling-folding-patio-dining-set-turquoise-room-essentials-153/-/A-51611881';
                        break;
                    case 'dollar30-off-kitchenaidr-mixer':
                        rfiLink = 'https://www.target.com/p/kitchenaid-174-ultra-power-plus-4-5-qt-tilt-head-stand-mixer-ksm96/-/A-51575208';
                        break;
                    case '70percent-off-schwinn-mens-trailway-28':
                        rfiLink = 'http://www.target.com/p/schwinn-men-s-trailway-28-700c-hybrid-bike-bronze/-/A-15547829';
                        break;
                    case 'pandora-trial-subscriptions':
                        rfiLink = 'https://www.pandora.com/account/register';
                        break;
                    case 'dollar20-lyft-credit':
                        rfiLink = 'https://www.lyft.com/promo-coupon-code-free-rides';
                        break;
                    case 'dollar10-lyft-credit':
                        rfiLink = 'https://www.lyft.com/promo-coupon-code-free-rides';
                        break;
                    case 'dollar9-lyft-credit':
                        rfiLink = 'https://www.lyft.com/promo-coupon-code-free-rides';
                        break;
                    case 'up-to-55percent-off-dentalife':
                        rfiLink = 'https://www.groupon.com/deals/gs-purina-dentalife-daily-oral-care-small-medium-dog-treats';
                        break;
                    case '60percent-off-dentalife-cat-treats':
                        rfiLink = 'https://www.groupon.com/deals/gs-purina-dentalife-flavored-cat-treats-1-8-oz-pouch-pack-of-10';
                        break;
                    case '10percent-below-msrp-on-select-2017-corvettes':
                        rfiLink = 'http://www.chevrolet.com/current-deals?ppc=GOOGLE_700000001294388_71700000018229594_58700002071064306_p16389339423&gclid=CjwKEAjw3pTJBRChgZ3e7s_YhAkSJAASG9VrrN1r6Q0jEWZNtwT78okGE1hHmJ-o3YsbRBcobrkSNBoCPozw_wcB&gclsrc=aw.ds';
                        break;
                    case 'dollar1500-purchase-bonus-cash-on-select-2017-camaros':
                        rfiLink = 'http://www.chevrolet.com/current-deals?ppc=GOOGLE_700000001294388_71700000018229594_58700002071064306_p16389339423&gclid=CjwKEAjw3pTJBRChgZ3e7s_YhAkSJAASG9VrrN1r6Q0jEWZNtwT78okGE1hHmJ-o3YsbRBcobrkSNBoCPozw_wcB&gclsrc=aw.ds';
                        break;
                    case '39percent-apr-for-60-months-plus-dollar4500-purchase-bonus-cash':
                        rfiLink = 'http://www.chevrolet.com/current-deals?ppc=GOOGLE_700000001294388_71700000018229594_58700002071064306_p16389339423&gclid=CjwKEAjw3pTJBRChgZ3e7s_YhAkSJAASG9VrrN1r6Q0jEWZNtwT78okGE1hHmJ-o3YsbRBcobrkSNBoCPozw_wcB&gclsrc=aw.ds';
                        break;
                    case 'dollar5-thin-crust-spinach-and-mushroom':
                        rfiLink = 'http://www.target.com/p/digiorno-thin-crust-spinach-and-mushroom-pizza-18-oz/-/A-41982816';
                        break;
                    case 'dollar5-thin-crust-pepperoni':
                        rfiLink = 'http://www.target.com/p/digiorno-pizzeria-thin-crust-primo-pepperoni-pizza-17-2-oz/-/A-17092815';
                        break;
                    case 'dollar5-thin-crust-supreme-special':
                    case 'dollar5-thin-crust-supreme-speciale':
                        rfiLink = 'http://www.target.com/p/pizza-digiorno/-/A-17092814';
                        break;
                    case 'dollar20-off-select-polos':
                        rfiLink = 'http://store.partyrock.com/sport/tennis-polos/tennis-polo-lime-black.html';
                        break;
                    case '33percent-off-mens-select-tennis-shorts':
                        rfiLink = 'http://store.partyrock.com/sport/tennis-shorts/tennis-shorts-black-zebra.html';
                        break;
                    case '58percent-off-livingston-sweater':
                        rfiLink = 'http://www.6pm.com/p/vans-livingston-cement-heather-black/product/8601289/color/308643';
                        break;
                    case '57percent-off-satellite-tank-top':
                        rfiLink = 'http://www.6pm.com/p/vans-satellite-tank-top-black/product/8736416/color/3';
                        break;
                    case '38percent-off-classic-slip-ontm-shoes':
                        rfiLink = 'http://www.6pm.com/p/vans-kids-classic-slip-on-little-kid-big-kid-prism-pink-perf-leather/product/8689692/color/618221';
                        break;
                    case '20percent-off-party-socks':
                        rfiLink = 'http://store.partyrock.com/';
                        break;
                }

                $window.open(rfiLink, '_blank');
            };

            $scope.onCopyToClipboardSuccess = function(e) {

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
        'clixConfig',
        function($scope, $uibModalInstance, type, clixConfig) {

            switch (type) {
                case 'visa':
                    $scope.image = clixConfig.baseImageUrl + '/visa.png';
                    $scope.imageHighRes = clixConfig.baseImageUrl + '/visa@2x.png';
                    $scope.title = 'Visa® Prepaid Card USD';
                    $scope.disclaimer = 'Visa® Prepaid Card USD works just like cash. Your ClixTV reward points have a cash value. Just transfer the balance to a Visa® Prepaid Card USD! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
                case 'paypal':
                    $scope.image = clixConfig.baseImageUrl + '/paypal.png';
                    $scope.imageHighRes = clixConfig.baseImageUrl + '/paypal@2x.png';
                    $scope.title = 'PayPal';
                    $scope.disclaimer = 'PayPal works just like cash. Your ClixTV reward points have a cash value. Just transfer the balance to your PayPal Account! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
                case 'amazon':
                    $scope.image = clixConfig.baseImageUrl + '/amazon.png';
                    $scope.imageHighRes = clixConfig.baseImageUrl + '/amazon@2x.png';
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
        '$window',
        'data',
        'modalService',
        'catchMediaService',
        'shareService',
        'userService',
        'notificationsService',
        function($scope, $location, $uibModalInstance, $state, $window, data, modalService, catchMediaService, shareService, userService, notificationsService) {

            $scope.tab = 'post';
            $scope.socialNetworks = [];

            $scope.video = data.shareModalVideo;
            $scope.offer = data.shareModalOffer;
            $scope.celebrity = data.shareModalCelebrity;
            $scope.brand = data.shareModalBrand;
            $scope.charity = data.shareModalCharity;
            $scope.category = data.shareModalCategory;

            var type, entity, link, picture, description, title, message,
                currentUrl = $location.absUrl(),
                shareContent = '';

            if (data.shareModalVideo) {
                message = 'Here\'s a video I thought you\'d enjoy from #ClixTV';
                link = $state.href('video', { slug: data.shareModalVideo.slug }, {absolute: true});
                shareContent = message + ' - ';
                shareContent += data.shareModalVideo.title + ' ' + link;
                type = 'video';
                entity = data.shareModalVideo;
                picture = $scope.video.thumbnail;
                description = $scope.video.description;
                title = 'Episode ' + $scope.video.episodeNumber + ': ' + $scope.video.title + ' on ClixTV';
            }

            if (data.shareModalOffer) {
                message = 'Here\'s an offer I thought you\'d enjoy from #ClixTV';
                link = $state.href('brand-offer', { slug: data.shareModalOffer.campaign.slug, offerSlug: data.shareModalOffer.slug }, {absolute: true});
                shareContent = message + ' - ';
                shareContent += data.shareModalOffer.title + ' ' + link;
                type = 'offer';
                entity = data.shareModalOffer;
                picture = $scope.offer.thumbnail;
                description = $scope.offer.description;
                title = $scope.offer.title + ' on ClixTV';
            }

            if (data.shareModalCelebrity) {
                message = 'I thought you\'d like to check out ' + data.shareModalCelebrity.name + ' on #ClixTV';
                link = $state.href('star', { slug: data.shareModalCelebrity.slug }, {absolute: true});
                shareContent = message + ' - ';
                shareContent += link;
                type = 'star';
                entity = data.shareModalCelebrity;
                picture = $scope.celebrity.thumbnail;
                description = $scope.celebrity.description;
                title = $scope.celebrity.name + ' on ClixTV';
            }

            if (data.shareModalBrand) {
                message = 'I thought you\'d enjoy visiting ' + data.shareModalBrand.title + ' on #ClixTV';
                link = $state.href('brand', { slug: data.shareModalBrand.slug }, {absolute: true});
                shareContent = message + ' - ';
                shareContent += link;
                type = 'brand';
                entity = data.shareModalBrand;
                picture = $scope.brand.headerImage;
                description = $scope.brand.description;
                title = $scope.brand.title + ' on ClixTV';
            }

            if (data.shareModalCharity) {
                message = 'I thought you\'d enjoy visiting the charity page for ' + data.shareModalCharity.title + ' on #ClixTV';
                link = $state.href('charity', { slug: data.shareModalCharity.slug }, {absolute: true});
                shareContent = ' - ';
                shareContent += link;
                type = 'charity';
                entity = data.shareModalCharity;
                picture = $scope.charity.headerImage;
                description = $scope.charity.description;
                title = $scope.charity.title + ' on ClixTV';
            }

            $scope.shareContent = shareContent;
            $scope.link = link;
            $scope.type = type;

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

            $scope.form = {
                emails: '',
                message: shareContent
            };

            $scope.onSendPress = function() {
                if (!$scope.form.emails) {
                    return;
                }
                var emails = $scope.form.emails.split(',').map(function(email) {
                    return email.trim();
                });

                catchMediaService.trackShareEvent(type, entity);

                if (!$scope.loggedInUser) {
                    $window.open('mailto:' + emails.join(',') + '?subject=I Thought You\'d Like This!&body=' + $scope.form.message, '_self');
                    $uibModalInstance.close();
                    return;
                }

                $scope.sending = true;
                notificationsService.sendShareEmail($scope.loggedInUser.email, $scope.loggedInUser.firstName + ' ' + $scope.loggedInUser.lastName, emails, $scope.form.message)
                    .then(
                        function onSuccess(data) {
                            $scope.form.emails = '';
                            modalService.showAlertModal('Success!', 'This ' + type + ' has been successfully sent!');
                        }
                    )
                    .finally(
                        function onFinally() {
                            $scope.sending = false;
                        }
                    );
            };

            $scope.onPostPress = function() {

                var missingNetwork = false;
                switch($scope.socialNetworks[0]) {
                    case 'facebook':
                        shareService.postToFacebook(shareContent, title, description, link, picture);
                        break;
                    case 'twitter':
                        shareService.postToTwitter(message, title, description, link, picture);
                        break;
                    case 'tumblr':
                        shareService.postToTumblr(shareContent, title, description, link, picture);
                        break;
                    default:
                        missingNetwork = true;
                        break;
                }
                if (!missingNetwork) {
                    if ($scope.showBackButton) {
                        modalService.pop();
                    } else {
                        $uibModalInstance.close();
                    }
                    catchMediaService.trackShareEvent(type, entity);
                }
            };

            $scope.onSocialNetworkPress = function(socialNetwork) {

                $scope.socialNetworks = [socialNetwork];

                userService.getLoggedInUser()
                    .then(
                        function onSuccess(data) {
                            switch (socialNetwork) {
                                case 'facebook':
                                    if (!data.facebookConnected) {

                                    }
                                    break;
                                case 'twitter':
                                    if (!data.twitterConnected) {
                                        // window.open('/hauth/login/Twitter', 'tw', 'left=20,top=20,width=600,height=500,toolbar=1,resizable=0');
                                    }
                                    break;
                                case 'tumblr':
                                    if (!data.tumblrConnected) {

                                    }
                                    break;
                            }
                        }
                    );

                // Only one social network is allowed to be posted at a time...
                // var index = $scope.socialNetworks.indexOf(socialNetwork);
                // if (index !== -1) {
                //     $scope.socialNetworks.splice(index, 1);
                // } else {
                //     $scope.socialNetworks.push(socialNetwork);
                // }
            };

            $scope.onSettingsPress = function() {
                modalService.showModal({
                    templateUrl: 'ui/common/modal/share/view.share-settings.html',
                    controller: 'ShareSettingsController'
                })
            };

            $scope.showBackButton = modalService.getNumberOfModalsInStack() >= 2;

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                    }
                )
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

    var shareModalConnectButton = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-connect-button.html',
            transclude: true
        }
    };

    angular.module('clixtv')
        .directive('clixShareModalVideoContent', shareModalVideoContent)
        .directive('clixShareModalCelebrityContent', shareModalCelebrityContent)
        .directive('clixShareModalOfferContent', shareModalOfferContent)
        .directive('clixShareModalBrandContent', shareModalBrandContent)
        .directive('clixShareModalCharityContent', shareModalCharityContent)
        .directive('clixGenericShareContent', genericModalCelebrityContent)
        .directive('clixShareModalConnectButton', shareModalConnectButton);
}());
(function() {

    var NavigationBarController = [
        '$scope',
        '$rootScope',
        '$timeout',
        '$window',
        '$state',
        'userService',
        function($scope, $rootScope, $timeout, $window, $state, userService) {

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        if ($scope.loggedInUser) {
                            $scope.loggedInUser.displayName = $scope.loggedInUser.firstName + ' ' + $scope.loggedInUser.lastName;
                        }
                    }
                );

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.update', function(event, data) {
                $scope.loggedInUser = data;
                if ($scope.loggedInUser) {
                    $scope.loggedInUser.displayName = $scope.loggedInUser.firstName + ' ' + $scope.loggedInUser.lastName;
                }
            });

            $rootScope.$on('modal.open', function(event, data) {
                $scope.modalOpen = true;
            });

            $rootScope.$on('modal.close', function(event, data) {
                $scope.modalOpen = false;
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

            $scope.onSearchPress = function($event) {
                $scope.searchVisible = !$scope.searchVisible;
                $rootScope.$broadcast(($scope.searchVisible) ? 'mobilesearch.open' : 'mobilesearch.close');
                if ($scope.searchVisible) {
                    $window.document.getElementById('site-search-input-field').focus();
                }
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
                if ($scope.loggedInUser) {
                    $scope.loggedInUser.displayName = $scope.loggedInUser.firstName + ' ' + $scope.loggedInUser.lastName;
                }
            });

            $rootScope.$on('user.update', function(event, data) {
                $scope.loggedInUser = data;
                if ($scope.loggedInUser) {
                    $scope.loggedInUser.displayName = $scope.loggedInUser.firstName + ' ' + $scope.loggedInUser.lastName;
                }
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
        'clixConfig',
        function($scope, $rootScope, $timeout, $state, userService, clixConfig) {

            $scope.notificationEnabled = clixConfig.notificationEnabled;

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
    var SearchDropdownController = [
        '$scope',
        '$timeout',
        'searchService',
        function($scope, $timeout, searchService) {

            var searchTimeout;

            function _getSearchMethod() {
                switch ($scope.type) {
                    case 'brand':
                        return 'getBrandSearchResults';
                    case 'charity':
                        return 'getCharitySearchResults';
                    case 'offer':
                        return 'getOfferSearchResults';
                    default:
                        return 'getSearchResults';
                }
            }

            function _onSearchTermChange() {
                var method = _getSearchMethod();
                $scope.results = undefined;
                $scope.empty = false;
                if (!$scope.term || $scope.term.length < 2) {
                    return;
                }
                $scope.searching = true;

                if (searchTimeout) {
                    $timeout.cancel(searchTimeout);
                }
                searchTimeout = $timeout(function() {
                    searchService[method]($scope.term, 0, 5)
                        .then(
                            function onSuccess(data) {
                                $scope.searching = false;
                                if (!data || data.length === 0 || data.error) {
                                    $scope.empty = true;
                                } else {
                                    $scope.empty = false;
                                    $scope.results = data;
                                }
                            }
                        );
                }, 250);
            }

            $scope.$watch('term', _onSearchTermChange);
        }
    ];

    angular
        .module('clixtv')
        .controller('SearchDropdownController', SearchDropdownController);
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
                console.log($scope.term);
                // if ($scope.term.length < 2) {
                //     return _hideSearchResults();
                // }
                // _performSearch();
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
                    $timeout(function() {
                        $window.document.getElementById('site-search-input-field').focus();
                    });
                }
            };

            $rootScope.$on('$stateChangeSuccess', function(){
                $scope.term = '';
                $scope.searchVisible = false;
                _hideSearchResults();
            });

            $scope.onResultPress = function(event, entity) {
                switch(event) {
                    case 'star':
                        catchMediaService.trackAppEvent('search', {
                            target_cm: 'media',
                            target_type: 'person'
                        });
                        break;
                    case 'brand':
                        catchMediaService.trackAppEvent('search', {
                            target_cm: 'media',
                            target_type: 'campaign'
                        });
                        break;
                    case 'charity':
                        catchMediaService.trackAppEvent('search', {
                            target_cm: 'media',
                            target_type: 'organization'
                        });
                        break;
                    case 'category':
                        catchMediaService.trackAppEvent('search', {
                            target_cm: 'entity',
                            target_type: 'category'
                        });
                        break;

                }
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('SiteSearchController', SiteSearchController);
}());
(function() {

    var searchDropdown = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.search-dropdown.html',
            controller: 'SearchDropdownController',
            scope: {
                term: '=',
                type: '=?',
                forceHide: '=?'
            }
        }
    };

    var baseSearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.base-search-result-item.html',
            transclude: {
                searchResultImage: '?searchResultImage',
                searchResultImageCircle: '?searchResultImageCircle',
                searchResultTitle: 'searchResultTitle',
                searchResultSubtitle: 'searchResultSubtitle'
            },
            scope: {
                sref: '@'
            },
            link: function(scope, element, attributes, ctrl, transclude) {
                scope.searchResultImageCircle = transclude.isSlotFilled('searchResultImageCircle');
            }
        }
    };

    var charitySearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.charity-search-result-item.html',
            scope: {
                charity: '='
            }
        }
    };

    var brandSearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.brand-search-result-item.html',
            scope: {
                brand: '='
            }
        }
    };

    var offerSearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.offer-search-result-item.html',
            scope: {
                offer: '='
            }
        }
    };

    var celebritySearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.celebrity-search-result-item.html',
            scope: {
                celebrity: '='
            }
        }
    };

    var categorySearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.category-search-result-item.html',
            scope: {
                category: '='
            }
        }
    };

    var videoSearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.video-search-result-item.html',
            scope: {
                video: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSearchDropdown', searchDropdown)
        .directive('clixBaseSearchResultItem', baseSearchResultItem)
        .directive('clixCharitySearchResultItem', charitySearchResultItem)
        .directive('clixBrandSearchResultItem', brandSearchResultItem)
        .directive('clixOfferSearchResultItem', offerSearchResultItem)
        .directive('clixCelebritySearchResultItem', celebritySearchResultItem)
        .directive('clixCategorySearchResultItem', categorySearchResultItem)
        .directive('clixVideoSearchResultItem', videoSearchResultItem);
}());
(function() {

    var searchFilter = [
        'clixConfig',
        function(clixConfig) {
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
                    showFilters: '@?',
                    type: '@?'
                },
                link: function(scope) {
                    scope.term = '';
                    scope.filtersEnabled = clixConfig.filtersEnabled;

                    scope.onBodyPress = function() {
                        scope.dropdownForceHide = true;
                    };

                    scope.onInputFocus = function() {
                        scope.dropdownForceHide = false;
                    }
                }
            }
        }
    ];

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
                    tooltipId: '@',
                    cleanup: '@',
                    clickTrigger: '@?'
                },
                link: function(scope, element) {

                    var showTimeout, hideTimeout;

                    $rootScope.$on('$stateChangeStart', function() {
                        if (scope.cleanup !== 'false') {
                            angular.element(document.getElementById(scope.tooltipId)).remove();
                        }
                    });

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

                    function _hideTooltip(delay) {
                        hideTimeout = $timeout(function() {
                            var tooltipElement = document.getElementById(scope.tooltipId);

                            angular.element(tooltipElement).removeClass('active');

                            $rootScope.$broadcast('tooltip.closed');

                            $timeout(function() {
                                if (tooltipElement) {
                                    tooltipElement.style.top = '-999px';
                                    tooltipElement.style.left = '-999px';
                                }
                            }, 250);

                            if (showTimeout) {
                                $timeout.cancel(showTimeout);
                            }
                        }, delay);
                    }

                    var currentTooltipElement,
                        events = (scope.clickTrigger) ? 'scroll' : 'scroll click';

                    // Hide tooltip on window scroll
                    angular.element($window).on(events, function() {

                        if (!currentTooltipElement) {
                            currentTooltipElement = document.getElementById(scope.tooltipId);
                        }

                        angular.element(currentTooltipElement).removeClass('active');

                        $rootScope.$broadcast('tooltip.closed');

                        if (currentTooltipElement) {
                            currentTooltipElement.style.top = '-999px';
                            currentTooltipElement.style.left = '-999px';
                        }
                    });

                    /**
                     * @todo - Prevent tooltip from extending beyond page bounds
                     */

                    var event = (scope.clickTrigger) ? 'click' : 'mouseenter';
                    angular.element(element).off(event).on(event, function(event) {

                        if (hideTimeout) {
                            $timeout.cancel(hideTimeout);
                        }

                        showTimeout = $timeout(function() {

                            var trigger = angular.element(element),
                                tooltipElement = document.getElementById(scope.tooltipId),
                                height = trigger[0].offsetHeight,
                                width = trigger[0].offsetWidth,
                                tooltipElementWidth = tooltipElement.offsetWidth;

                            var position = _getPosition(trigger[0]),
                                top = (position.y + height),
                                left = ((position.x + (width / 2)) - (tooltipElementWidth / 2));

                            if (left < 0) {
                                left = 0;
                            }

                            if (tooltipElement) {
                                tooltipElement.style.top = top + 'px';
                                tooltipElement.style.left = left + 'px';
                            }

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
                                        if (tooltipElement) {
                                            tooltipElement.style.top = '-999px';
                                            tooltipElement.style.left = '-999px';
                                        }
                                    }, 250);

                                    if (showTimeout) {
                                        $timeout.cancel(showTimeout);
                                    }

                                }, HIDE_TOOLTIP_DELAY_MS);
                            });
                        }, (scope.clickTrigger) ? 0 : SHOW_TOOLTIP_DELAY_MS);
                    });

                    angular.element(element).on('mouseleave', function() {
                        _hideTooltip(HIDE_TOOLTIP_DELAY_MS);
                    });

                    $rootScope.$on('modal.open', function() {
                        _hideTooltip(0);
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

    var ContactPageController = [
        '$scope',
        '$log',
        '$rootScope',
        '$stateParams',
        'userService',
        'notificationsService',
        'modalService',
        function($scope, $log, $rootScope, $stateParams, userService, notificationsService, modalService) {

            $scope.helpTypes = [
                {
                    label: 'Investor Relations',
                    data: 'investor-relations'
                },
                {
                    label: 'Advertisers',
                    data: 'advertisers'
                },
                {
                    label: 'Jobs',
                    data: 'jobs'
                },
                {
                    label: 'Press',
                    data: 'press'
                },
                {
                    label: 'News',
                    data: 'news'
                },
                {
                    label: 'Affiliates',
                    data: 'affiliates'
                },
                {
                    label: 'Rewards',
                    data: 'rewards'
                },
                {
                    label: 'Help',
                    data: 'help'
                }
            ];

            $scope.form = {
                name: '',
                email: '',
                subject: '',
                description: ''
            };

            $scope.onSubmit = function() {
                var error = false,
                    helpType = ($scope.selectedHelpType) ? $scope.selectedHelpType.data : '';
                _resetErrorStates();
                if (!$scope.form.name) {
                    $scope.showNameError = true;
                    error = true;
                }

                if (!$scope.form.email) {
                    $scope.showEmailError = true;
                    error = true;
                }

                if (!$scope.form.subject) {
                    $scope.showSubjectError = true;
                    error = true;
                }

                if (!$scope.form.description) {
                    $scope.showDescriptionError = true;
                    error = true;
                }

                if (error) {
                    return;
                }

                notificationsService.sendContactNotification(helpType || 'help', $scope.form.name, $scope.form.email, $scope.form.subject, $scope.form.description)
                    .then(
                        function onSuccess(data) {
                            if (!data || !data.success) {
                                throw new Error('Invalid response from API');
                            }
                            modalService.showAlertModal('Success', 'Your message has been sent.<br />We will respond back as soon as we can!');
                            $scope.form.subject = '';
                            $scope.form.description = '';
                        }
                    )
                    .catch(
                        function onError(error) {
                            $log.error(error);
                            modalService.showAlertModal('Error', 'There was an error sending your message.<br />Please try again later.');
                        }
                    )
            };

            if ($stateParams.section) {
                var selected = $scope.helpTypes.filter(function(type) {
                    return type.data === $stateParams.section;
                })[0];
                if (selected) {
                    $scope.selectedHelpType = selected;
                }
            }

            function _resetErrorStates() {
                $scope.showNameError = false;
                $scope.showEmailError = false;
                $scope.showSubjectError = false;
                $scope.showDescriptionError = false;
            }

            function _setDefaultInfo(user) {
                if (!user) {
                    return;
                }
                if (!$scope.form.name) {
                    $scope.form.name = user.firstName + ' ' + user.lastName;
                }
                if (!$scope.form.email) {
                    $scope.form.email = user.email;
                }
            }

            $rootScope.$on('user.login', function(event, data) {
                _setDefaultInfo(data);
            });

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        _setDefaultInfo(data);
                    }
                );
        }
    ];

    angular
        .module('clixtv')
        .controller('ContactPageController', ContactPageController);
}());
(function() {

    var DropdownController = [
        '$q',
        '$scope',
        '$timeout',
        function($q, $scope, $timeout) {

            $scope.bodyClicked = function(event) {
                $scope.menuVisible = false;
            };

            $scope.triggerClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.$watch('ngModel', function() {
                $timeout(function() {
                    if ($scope.ngModel) {
                        $scope.selected = $scope.ngModel;
                        $scope.$apply();
                    }
                });
            });

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
                            $scope.ngModel = option;
                            $timeout(function() {
                                $scope.$apply();
                            });
                            if (option.onClick) {
                                option.onClick(option);
                            }
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
                placeholderText: '@?',
                ngModel: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixDropdown', dropdown);
}());
(function() {

    var FooterController = [
        '$scope',
        'clixConfig',
        function($scope, clixConfig) {
            $scope.isBeta = (clixConfig.beta === true);
        }
    ];

    angular
        .module('clixtv')
        .controller('FooterController', FooterController);
}());
(function() {
    var footer = function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/footer/view.footer.html',
            controller: 'FooterController',
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
                    $timeout(function() {
                        $window.document.getElementById('search-input-field').focus();
                    });
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
        'clixConfig',
        function($q, $scope, $rootScope, $window, $timeout, $uibModal, notificationsService, knetikService, modalService, catchMediaService, clixConfig) {

            var latestOffset = 0;

            $scope.isBeta = (clixConfig.beta === true);

            function _populateHeaderData() {
                $q.all(
                        [
                            notificationsService.getNotifications(),
                            knetikService.getPoints()
                        ]
                    )
                    .then(
                        function onSuccess(data) {
                            var points = data[1];
                            $scope.notifications = data[0];
                            if (points && !isNaN(points.balance)) {
                                $scope.points = parseInt(points.balance);
                            } else {
                                $scope.points = 0;
                            }
                        }
                    );
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _populateHeaderData();
            });

            $rootScope.$on('user.update', function(event, data) {
                $scope.loggedInUser = data;
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
        'modalService',
        function($q, $scope, $rootScope, $timeout, $window, $uibModal, categoryService, modalService) {

            var moreToLoad = true;

            $rootScope.pageTitle = 'ClixTV - Your Stars. Their Passions.';

            $scope.PAGE_LIMIT = 2;
            $scope.currentPage = 0;

            $scope.showMobileCarousel = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

            $scope.onLoadMore = function($inview) {
                if (!$scope.ready || !$inview) {
                    return;
                }
                _loadCategories();
            };

            function _recalculateHeight() {
                var carouselElement = angular.element(document.getElementById('carousel-container'));
                
                if (!carouselElement) {
                    return;
                }
                $scope.videoContainerHeight = carouselElement.innerHeight();
                // $timeout(function() {
                //     $scope.$apply();
                // });
            }

            function _recalculateWidth() {
                $scope.showMobileCarousel = ($window.innerWidth < 768);
                _recalculateHeight();
            }

            function _loadCategories() {
                if ($scope.loading || !moreToLoad) {
                    return;
                }
                $scope.loading = true;
                categoryService.getAllCategories(false, $scope.currentPage, $scope.PAGE_LIMIT)
                    .then(
                        function onSuccess(data) {
                            if ($scope.categories) {
                                $scope.categories.categories = $scope.categories.categories.concat(data.categories);
                            } else {
                                $scope.categories = data;
                            }
                            if (!data || data.categories.length === 0) {
                                moreToLoad = false;
                            }
                            $scope.ready = true;
                            $scope.currentPage += 1;
                            $timeout(function() {
                                angular.element(window).trigger('resize.doResize');
                                $scope.loading = false;
                            });
                        }
                    );
            }


            angular.element($window).on('resize.doResize', function () {
                _recalculateWidth();
            });
            _loadCategories();
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
                if ($scope.celebrity) {
                    $scope.isFavorite = userService.isFavoriteCelebrity($scope.celebrity.id);
                }
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
                    userService.removeFavoriteCelebrity($scope.celebrity.id);
                } else {
                    userService.addFavoriteCelebrity($scope.celebrity.id);
                }
            };

            $scope.onTabSelect = function(tab) {

                switch (tab) {

                    case 'brands_offers':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'offer',
                            source_cm: 'media',
                            source_type: 'person',
                            source_id: $scope.celebrity.id
                        });
                        break;

                    case 'charity':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'organization',
                            source_cm: 'media',
                            source_type: 'person',
                            source_id: $scope.celebrity.id
                        });
                        break;
                }
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

            celebrityService.getCelebrityBySlug($stateParams.slug)
                .then(
                    function onSuccess(data) {

                        if (!data || !data.id) {
                            throw new Error('No celebrity found');
                        }

                        $scope.celebrity = data;
                        $scope.active = 0;

                        $rootScope.pageTitle = $scope.celebrity.name + ' - ClixTV';

                        catchMediaService.trackAppEvent('navigation_item', {
                            target_cm: 'media',
                            target_type: 'person',
                            target_id: $scope.celebrity.id
                        });

                        if (data.series && data.series.series) {
                            $scope.seriesList = data.series.series.map(function(series) {
                                if (!series.seasons) {
                                    return {}
                                }
                                return {
                                    label: series.title,
                                    series: series,
                                    totalEpisodes: (series.seasons.seasons[0]) ? series.seasons.seasons[0].episodes.length : 0,
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
        '$rootScope',
        'celebrityService',
        'catchMediaService',
        function($q, $scope, $rootScope, celebrityService, catchMediaService) {

            $rootScope.pageTitle = 'Stars - ClixTV';

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
                        var stars = data;
                        stars.celebrities = stars.celebrities.filter(function(star) {
                            return star.totalVideos && star.totalVideos > 0;
                        });
                        $scope.stars = stars;
                    }
                );

            catchMediaService.trackAppEvent('navigation', {
                target_cm: 'media',
                target_type: 'person'
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('StarsController', StarsController);
}());
(function() {
    var TermsConditionsController = [
        function() {

        }
    ];

    angular
        .module('clixtv')
        .controller('TermsConditionsController', TermsConditionsController);
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
    var backgroundImage = [
        '$parse',
        function($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    attrs.$observe('clixBackgroundImage', function(value) {
                        element.css({
                            'background-image': 'url(' + value +')'
                        });
                    });
                }
            };
        }
    ];

    angular.module('clixtv')
        .directive('clixBackgroundImage', backgroundImage);
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
        'knetikService',
        'educationModalService',
        'clixConfig',
        function($q, $scope, $rootScope, $timeout, $window, $filter, $stateParams, videosService, celebrityService, userService, catchMediaService, knetikService, educationModalService, clixConfig) {

            $scope.isMobile = ($window.innerWidth <= 800);
            $scope.expanded = false;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

            function _resetPageState() {
                if (!$scope.video) {
                    return;
                }
                $scope.isOnWatchlist = userService.isVideoOnWatchlist($scope.video.id);
                $scope.isFavoriteCelebrity = userService.isFavoriteCelebrity($scope.video.celebrity.id);
            }

            function _getNextVideo() {

                // Pull the next video in the series...
                var nextVideos = $scope.series.seasons.seasons[0].episodes.filter(function(episode) {
                    return episode.episodeNumber > $scope.video.episodeNumber;
                });

                if (nextVideos.length > 0) {

                    nextVideos.sort(function(a, b) {
                        return parseInt(a.episodeNumber) - parseInt(b.episodeNumber);
                    });

                    $scope.nextVideo = nextVideos[0];
                    return;
                }

                $scope.nextVideoIsRelated = true;

                // If we're on the last video, pull the first related not from the
                // same series...
                $scope.nextVideo = $scope.relatedVideos.videos.filter(function(episode) {
                    return episode.seriesTitle !== $scope.video.series.title;
                })[0];

                // Otherwise just pull the first in the related list
                if (!$scope.nextVideo) {
                    $scope.nextVideo = $scope.relatedVideos.videos[0];
                }
            }

            $rootScope.$on('video.complete', function() {
                knetikService.viewEpisode($scope.video.id);
                $scope.videoComplete = true;
                $timeout(function() {
                    $scope.$apply();
                });
            });

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetPageState();
                if ($scope.video) {
                    catchMediaService.getMediaTags($scope.video.id, 'episode')
                        .then(
                            function onSuccess(data) {
                                $scope.episodeLiked = data[0].tags.like.value || false;
                            }
                        )
                }
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
                $scope.episodeLiked = false;
                _resetPageState();
            });

            $rootScope.$on('favorite.added', _resetPageState);
            $rootScope.$on('favorite.removed', _resetPageState);

            $q.all(
                    [
                        userService.getLoggedInUser(),
                        videosService.getVideoBySlug($stateParams.slug)
                    ]
                )
                .then(
                    function onSuccess(data) {

                        $scope.loggedInUser = data[0];
                        $scope.video = data[1];
                        $scope.ready = true;

                        _resetPageState();

                        return $q.all(
                            [
                                videosService.getRelatedVideos($scope.video.id),
                                videosService.getSeriesById($scope.video.series.id),
                                catchMediaService.getMediaTags($scope.video.id, 'episode')
                            ]
                        );
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.relatedVideos = data[0];
                        $scope.series = data[1];
                        $scope.episodeLiked = data[2][0].tags.like.value || false;
                        if (data[2][0].tags.like.totals.length === 0) {
                            $scope.totalEpisodeLikes = 0;
                        } else {
                            $scope.totalEpisodeLikes = parseInt(data[2][0].tags.like.totals[0].count);
                        }
                        _getNextVideo();
                    }
                );


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
                var expandedSize = angular.element(document.getElementById('about-video-container')).outerHeight() * 3,
                    infoContainerElement = angular.element(document.getElementById('about-video-inner-container'));
                $scope.expanded = !$scope.expanded;
                infoContainerElement[0].style.maxHeight = ($scope.expanded) ? (expandedSize + 'px') : ($scope.originalPlayerHeight + 'px');

                if ($scope.expanded) {
                    catchMediaService.trackAppEvent('navigation_item', {
                        click_action: 'show_more',
                        target_cm: 'media',
                        target_type: 'episode',
                        target_id: $scope.video.id
                    });
                }
            };

            $scope.onFavoritePress = function() {
                userService.addFavoriteCelebrity($scope.video.celebrity.id)
                    .then(
                        function onSuccess(data) {

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

            $scope.onLikeVideoPress = function() {
                if (!$scope.loggedInUser) {
                    educationModalService.showAnonymousLikedVideo();
                    return;
                }
                // catchMediaService.trackAppEvent('like', {
                //     target_cm: 'media',
                //     target_type: 'episode',
                //     target_id: $scope.video.id
                // });
                if ($scope.episodeLiked) {
                    catchMediaService.removeEpisodeLike($scope.video.id);
                    $scope.totalEpisodeLikes -= 1;
                    $scope.episodeLiked = false;
                } else {
                    catchMediaService.addEpisodeLike($scope.video.id);
                    $scope.totalEpisodeLikes += 1;
                    $scope.episodeLiked = true;
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
                        'controlbar.idlehide': true,
                        width: '100%',
                        //repeat: true,
                        icons: false,
                        image: $scope.video.endPoster || $scope.video.thumbnail,
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
                            $rootScope.$broadcast('video.error');
                            if ($scope.onError) {
                                $scope.onError();
                            }
                        });

                        jwplayer().on('setupError', function() {
                            $rootScope.$broadcast('video.setupError');
                        });

                        jwplayer().on('play', function() {
                            $rootScope.$broadcast('video.play');
                        });

                        jwplayer().on('pause', function() {
                            $rootScope.$broadcast('video.pause');
                        });

                        jwplayer().on('complete', function() {
                            $rootScope.$broadcast('video.complete');
                            if ($scope.onComplete) {
                                $scope.onComplete();
                            }
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

    var PointsViolatorController = [
        '$scope',
        'clixConfig',
        function($scope, clixConfig) {
            $scope.pointsEnabled = clixConfig.pointsEnabled;
        }
    ];

    angular
        .module('clixtv')
        .controller('PointsViolatorController', PointsViolatorController);
}());
(function() {
    var headerPointsViolator = [
        'userService',
        '$state',
        function(userService, $state) {
            return {
                restrict: 'AE',
                transclude: true,
                controller: 'PointsViolatorController',
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
            controller: 'PointsViolatorController',
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
            controller: 'PointsViolatorController',
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
            '$filter',
            function($injector, OfferListModel, CelebrityListModel, $filter) {
                return function(data) {
                    if (!data) {
                        return;
                    }
                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.celebrities = new CelebrityListModel(data.celebrities);

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.title);
                    }

                    if (data.offers) {
                        if (typeof data.offers === 'number') {
                            this.totalOffers = data.offers;
                        } else {
                            this.offers = new OfferListModel(data.offers);
                            this.totalOffers = this.offers.offers.length;
                        }
                    }

                    if (data.videos) {
                        if (typeof data.videos === 'number') {
                            this.totalVideos = data.videos;
                        } else {
                            var VideoListModel = $injector.get('VideoListModel');
                            this.videos = new VideoListModel(data.videos);
                            this.totalVideos = this.videos.videos.length;
                        }
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
            '$filter',
            function(VideoListModel, $filter) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.order = data.order;

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.title);
                    }

                    if (data.videos) {
                        if (typeof data.videos === 'number') {
                            this.totalVideos = data.videos;
                        } else {
                            this.videos = new VideoListModel(data.videos);
                            this.totalVideos = this.videos.videos.length;
                        }
                    }

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
            '$filter',
            function($injector, $filter) {
                return function(data) {
                    this.id = data._id;
                    this.name = data.title;
                    this.description = data.description;

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.name);
                    }

                    if (data.content) {
                        if (data.content.ProfilePicture) {
                            this.thumbnail = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }
                    }

                    if (data.videos) {
                        if (typeof data.videos === 'number') {
                            this.totalVideos = data.videos;
                        } else {
                            var VideoListModel = $injector.get('VideoListModel');
                            this.videos = new VideoListModel(data.videos);
                            this.totalVideos = this.videos.videos.length;
                        }
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
            '$filter',
            function($injector, $filter) {
                return function(data) {

                    if (typeof data === 'string') {
                        return;
                    }

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.title);
                    }

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

                    if (data.videos) {
                        if (typeof data.videos === 'number') {
                            this.totalVideos = data.videos;
                        } else {
                            var VideoListModel = $injector.get('VideoListModel');
                            this.videos = new VideoListModel(data.videos);
                            this.totalVideos = this.videos.videos.length;
                        }
                    }
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
            '$filter',
            function($injector, $filter) {
                return function(data) {
                    var BrandModel;
                    this.id = data._id;
                    this.title = data.title;
                    this.expirationDate = data.expiration_date;
                    this.description = data.description;
                    this.longDescription = data.long_description;
                    this.instructions = data.instructions_description;

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.title);
                    }

                    if (data.coupon_code) {
                        this.couponCode = data.coupon_code;
                    }

                    if (data.rfi_link) {
                        this.rfiLink = data.rfi_link;
                    }

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
                        if (typeof data.videos === 'number') {
                            this.totalVideos = data.videos;
                        } else {
                            var VideoListModel = $injector.get('VideoListModel');
                            this.videos = new VideoListModel(data.videos);
                            this.totalVideos = this.videos.videos.length;
                        }
                    }
                }
            }
        ]);
}());

(function() {
    angular
        .module('clixtv')
        .factory('SearchResultsModel', [
            'BrandModel',
            'CelebrityModel',
            'SeriesModel',
            'VideoModel',
            'OfferModel',
            'CharityModel',
            'CategoryModel',
            function(BrandModel, CelebrityModel, SeriesModel, VideoModel, OfferModel, CharityModel, CategoryModel) {
                return function(data) {

                    if (data.campaigns && data.campaigns.length > 0) {
                        this.brands = data.campaigns.map(function(campaign) {
                            return new BrandModel(campaign);
                        })
                    }

                    if (data.celebrities && data.celebrities.length > 0) {
                        this.celebrities = data.celebrities.map(function(celebrity) {
                            return new CelebrityModel(celebrity);
                        })
                    }

                    if (data.charities && data.charities.length > 0) {
                        this.charities = data.charities.map(function(charity) {
                            return new CharityModel(charity);
                        })
                    }

                    if (data.offers && data.offers.length > 0) {
                        this.offers = data.offers.map(function(offer) {
                            return new OfferModel(offer);
                        })
                    }

                    if (data.categories && data.categories.length > 0) {
                        this.categories = data.categories.map(function(category) {
                            return new CategoryModel(category);
                        })
                    }

                    if (data.videos && data.videos.length > 0) {
                        this.videos = data.videos.map(function(video) {
                            return new VideoModel(video);
                        })
                    }

                    if (data.series && data.series.length > 0) {
                        this.series = data.series.map(function(series) {
                            return new SeriesModel(series);
                        })
                    }

                    this.error = data.error;

                    if (data._id) {
                        var match;
                        switch(data.media_type) {
                            case 'campaign':
                            case 'brand':
                                match = new BrandModel(data);
                                break;
                            case 'category':
                                match = new CategoryModel(data);
                                break;
                            case 'offer':
                                match = new OfferModel(data);
                                break;
                            case 'charity':
                                match = new CharityModel(data);
                                break;
                            case 'celebrity':
                                match = new CelebrityModel(data);
                                break;
                        }
                        this.type = data.media_type;
                        this.match = match;
                    }
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
            '$filter',
            function($injector, CelebrityModel, BrandListModel, CharityModel, $filter) {
                return function(data) {

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.seriesTitle = data.serie_title; // ...spelling?

                    if (!this.seriesTitle && data.serie) {
                        this.seriesTitle = data.serie.title;
                    }

                    this.episodeNumber = data.episode_number;
                    this.runtime = data.runtime;
                    this.slug = $filter('slug')(this.seriesTitle + ' ' + this.title);

                    if (data.views) {
                        this.views = parseInt(data.views);
                    } else {
                        this.views = 0;
                    }

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

                    if (data.content.EndPoster) {
                        this.endPoster = data.content.EndPoster.downloadUrl;
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

    var analyticsService = [
        '$window',
        '$location',
        '$rootScope',
        '$log',
        '$state',
        'clixConfig',
        function($window, $location, $rootScope, $log, $state, clixConfig) {
            return {
                initialize: function(apiKey) {
                    if (navigator.doNotTrack == 1) {
                        $log.info('Segment has not been initialized. No data will be tracked.');
                        return;
                    }
                    if (clixConfig.environment !== 'prod') {
                        $log.info('Analytics not sent unless production environment is set. No data will be tracked.');
                        return;
                    }
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.text = '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";\
                 analytics.load("' + apiKey + '");\
            }}();';

                    var firstScript = document.getElementsByTagName('script')[0];
                    firstScript.parentNode.insertBefore(script, firstScript);
                },
                trackPageView: function(event, to, toParams, from, fromParams) {
                    if (!$window.analytics) {
                        return;
                    }

                    var path = $location.path(),
                        querystring = '',
                        referrer = '';

                    if (path.indexOf('?') !== -1) {
                        querystring = path.substring(path.indexOf('?'), path.length);
                    }

                    if (from.name) {
                        referrer = $state.href(from.name, fromParams, {absolute: true});
                    }

                    $window.analytics.page({
                        path: path,
                        referrer: referrer,
                        search: querystring,
                        url: $location.absUrl(),
                        title: 'ClixTV - Your Stars. Their Passions.'
                    });
                },

                identify: function(identityId, params) {
                    if (!$window.analytics) {
                        return;
                    }
                    $window.analytics.identify(identityId, params);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('analyticsService', analyticsService);
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
        'cacheService',
        'clixConfig',
        function($http, stringUtils, BrandListModel, OfferListModel, CharityListModel, BrandModel, CharityModel, cacheService, clixConfig) {
            return {
                getAllBrands: function(page, size) {
                    return $http.get(clixConfig.baseApi + '/campaigns?page=' + page + '&page_size=' + size, { cache: cacheService.getCache() })
                        .then(
                            function(data) {
                                return new BrandListModel(data.data);
                            }
                        );
                },

                /**
                 * @todo - Cache this call
                 */
                getBrandById: function(id) {
                    return $http.get('/api/campaigns/get_campaign?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new BrandModel(data.data);
                            }
                        );
                },

                getBrandBySlug: function(slug) {
                    return $http.get(clixConfig.baseApi + '/brands/slug/' + slug, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new BrandModel(data.data);
                            }
                        );
                },

                getAllCharities: function() {
                    return $http.get('/api/brands/get_charities_array', { cache: cacheService.getCache() })
                        .then(
                            function(data) {
                                return new CharityListModel(data.data);
                            }
                        );
                },

                getCharityBySlug: function(slug) {

                    return $http.get(clixConfig.baseApi + '/charities/slug/' + slug, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CharityModel(data.data[0]);
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
                getAllOffers: function(page, size) {
                    return $http.get('/api/brands/get_offers_array?page=' + page + '&page_size=' + size, { cache: cacheService.getCache() })
                        .then(
                            function(data) {
                                return new OfferListModel(data.data);
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

    var cacheService = [
        '$log',
        'CacheFactory',
        'LZString',
        'clixConfig',
        function($log, CacheFactory, LZString, clixConfig) {

            var apiCache;

            return {
                getCache: function() {
                    if (!CacheFactory) {
                        return;
                    }
                    if (!clixConfig.cacheEnabled) {
                        return;
                    }
                    if (!CacheFactory.get('apiCache')) {
                        CacheFactory.createCache('apiCache', {
                            maxAge: 5 * 60 * 1000, // 5 minutes
                            storageMode: 'localStorage',
                            deleteOnExpire: 'passive',
                            onExpire: function(key, value) {
                                $log.info('Cache key ' + key + ' expired, using stale data while fetching fresh data in the background');
                                apiCache.put(key, value);
                                angular.injector(['ng']).get('$http').get(key)
                                    .then(
                                        function onSuccess(data) {
                                            if (data.data) {
                                                $log.info('Received fresh data for key ' + key + '. Updating cache value.');
                                                apiCache.put(key);
                                            }
                                        }
                                    )
                                    .catch(
                                        function onError(error) {
                                            $log.warn('Error getting fresh data for cache for key ' + key + ': ' + JSON.stringify(error));
                                        }
                                    );
                            },
                            storageImpl: {
                                getItem: function (key) {
                                    try {
                                        return LZString.decompressFromUTF16(localStorage.getItem(key));
                                    } catch (e) {
                                        $log.warn('Error getting cache item: ' + JSON.stringify(e));
                                    }
                                    return undefined;
                                },
                                setItem: function (key, value) {
                                    try {
                                        localStorage.setItem(key, LZString.compressToUTF16(value));
                                    } catch (e) {
                                        $log.warn('Error setting new cache item: ' + JSON.stringify(e));
                                    }
                                },
                                removeItem: function (key) {
                                    localStorage.removeItem(key);
                                }
                            }
                        });
                    }
                    if (!apiCache) {
                        apiCache = CacheFactory.get('apiCache');
                    }
                    return apiCache;
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('cacheService', cacheService);
}());
(function() {

    var catchMediaService = [
        '$q',
        '$http',
        '$log',
        function($q, $http, $log) {

            var instance;

            function _reportAppEvent(event, data) {
                if (!instance) {
                    return;
                }
                $log.log('Tracking', '"' + event + '"', 'app event with data', data);
                instance.reportAppEvent(event, data);
            }

            function _reportMediaEvent(id, type, event, data) {
                if (!instance) {
                    return;
                }
                $log.log('Tracking media event with type', '"' + type + '"', ', event', '"' + event + '"', ', and data', data);
                instance.reportMediaEvent(id, type, event, data);
            }

            function _getEventNameForType(type) {
                switch (type) {
                    case 'categories':
                    case 'category':
                        return 'category';

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
                    if (!window.CMSDK) {
                        $log.info('The Catch Media service has not been initialized. No data will be tracked.');
                        return;
                    }
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
                    if (!instance) {
                        return;
                    }
                    instance.setUser(email, type, extra);
                },

                deleteUser: function() {
                    if (!instance) {
                        return;
                    }
                    instance.unsetUser();
                },

                trackVideoPlayerEvent: function(playerInstance) {
                    if (!instance) {
                        return;
                    }
                    instance.setupJwPlayer(playerInstance, function(mediaId) {
                        return 'episode';
                    });
                },

                trackShareEvent: function(type, entity) {
                    _reportAppEvent('share', {
                        id: entity.id,
                        type: _getEventNameForType(type)
                    });
                },

                trackAppEvent: function(type, data) {
                    _reportAppEvent(type, data);
                },

                trackMediaEvent: function(id, contentType, eventType, data) {
                    _reportMediaEvent(id, contentType, eventType, data);
                },

                getMediaTags: function(id, type) {
                    var deferred = $q.defer();
                    if (instance) {
                        instance.readAllMediaTags(id, type, function (result) {
                            deferred.resolve(result);
                        });
                    } else {
                        deferred.reject('CatchMedia service unavailable');
                    }
                    return deferred.promise;
                },

                addEpisodeLike: function(id) {
                    if (instance) {
                        instance.createMediaTag(id, 'episode', 'like', 1);
                    }
                },

                removeEpisodeLike: function(id) {
                    if (instance) {
                        instance.deleteMediaTag(id, 'episode', 'like');
                    }
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
        'cacheService',
        'clixConfig',
        function($http, CategoryListModel, CategoryModel, cacheService, clixConfig) {
            return {

                getAllCategories: function(withVideoCount, page, size) {
                    return $http.get('/api/category/get_all_categories?video_count=' + (withVideoCount || false) + '&page=' + page + '&page_size=' + size, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CategoryListModel(data.data);
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

                getCategoryBySlug: function(slug) {
                    return $http.get(clixConfig.baseApi + '/categories/slug/' + slug, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CategoryModel(data.data);
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
        '$q',
        '$http',
        'CacheFactory',
        'CelebrityListModel',
        'CelebrityModel',
        'cacheService',
        'clixConfig',
        function($q, $http, CacheFactory, CelebrityListModel, CelebrityModel, cacheService, clixConfig) {

            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCelebrities: function() {
                    return $http.get(clixConfig.baseApi + '/celebrity/get_all_celebrities', { cache: cacheService.getCache() })
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

                getCelebrityBySlug: function(slug) {
                    return $http.get(clixConfig.baseApi + '/stars/slug/' + slug, { cache: cacheService.getCache() })
                        .then(
                            function onSuccess(data) {
                                return new CelebrityModel(data.data);
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
                },

                saveOffer: function(id) {
                    // return $http.post('/api/knetik/save_offer', {
                    //     id: id
                    // });
                },

                viewOffer: function(id) {
                    return $http.post('/api/knetik/offer_view', {
                        id: id
                    });
                },

                shareCampaign: function(id) {
                    // return $http.post('/api/knetik/share', {
                    //     id: id
                    // });
                },

                shareEpisode: function(id) {
                    // return $http.post('/api/knetik/video_share', {
                    //     id: id
                    // });
                },

                viewEpisode: function(id) {
                    // return $http.post('/api/knetik/view', {
                    //     id: id
                    // });
                },

                viewCampaignVideo: function(id) {
                    // return $http.post('/api/knetik/ad_video_view', {
                    //     id: id
                    // });
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
        'clixConfig',
        'NotificationListModel',
        function($http, clixConfig, NotificationListModel) {
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
                },

                sendContactNotification: function(type, name, email, subject, message) {
                    return $http.post(clixConfig.baseApi + '/notifications/contact', {
                            type: type,
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        })
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                sendShareEmail: function(fromEmail, fromName, toEmails, message) {
                    return $http.post(clixConfig.baseApi + '/notifications/share', {
                            type: 'email',
                            emailList: toEmails,
                            fromEmail: fromEmail,
                            fromName: fromName,
                            message: message
                        })
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
        .factory('notificationsService', notificationsService);
}());
(function() {

    var offersService = [
        '$http',
        'OfferModel',
        'clixConfig',
        function($http, OfferModel, clixConfig) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getOfferById: function(id) {
                    return $http.get('api/brands/get_offer?id=' + id)
                        .then(
                            function(data) {
                                return new OfferModel(data.data);
                            }
                        );
                },

                getOfferBySlug: function(slug) {
                    return $http.get(clixConfig.baseApi + '/offers/slug/' + slug)
                        .then(
                            function(data) {
                                return new OfferModel(data.data);
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
        '$q',
        '$http',
        'SearchResultsModel',
        'CharityListModel',
        'BrandListModel',
        'OfferListModel',
        function($q, $http, SearchResultsModel, CharityListModel, BrandListModel, OfferListModel) {

            var searchCanceler;

            return {

                getSearchResults: function(term, offset, limit) {
                    var deferred = $q.defer();
                    if (searchCanceler) {
                        searchCanceler.resolve();
                        searchCanceler = undefined;
                    }
                    searchCanceler = $q.defer();
                    $http.get('/api/search?keyword=' + term, {timeout: searchCanceler.promise})
                        .then(
                            function onSuccess(data) {

                                // A cancelled request won't have a status code
                                if (!data.status || !data.data) {
                                    return;
                                }
                                deferred.resolve(new SearchResultsModel(data.data));
                            }
                        );
                    return deferred.promise;
                },

                getBrandSearchResults: function(term) {
                    var deferred = $q.defer();
                    if (searchCanceler) {
                        searchCanceler.resolve();
                        searchCanceler = undefined;
                    }
                    searchCanceler = $q.defer();
                    $http.get('/api/search/campaign?keyword=' + term, {timeout: searchCanceler.promise})
                        .then(
                            function onSuccess(data) {
                                if (!data.status || data.status === -1) {
                                    return;
                                }
                                deferred.resolve(new BrandListModel(data.data));
                            }
                        );
                    return deferred.promise;
                },

                getCharitySearchResults: function(term) {
                    var deferred = $q.defer();
                    if (searchCanceler) {
                        searchCanceler.resolve();
                        searchCanceler = undefined;
                    }
                    searchCanceler = $q.defer();
                    $http.get('/api/search/charity?keyword=' + term, {timeout: searchCanceler.promise})
                        .then(
                            function onSuccess(data) {
                                if (!data.status || data.status === -1) {
                                    return;
                                }
                                deferred.resolve(new CharityListModel(data.data));
                            }
                        );
                    return deferred.promise;
                },

                getOfferSearchResults: function(term) {
                    var deferred = $q.defer();
                    if (searchCanceler) {
                        searchCanceler.resolve();
                        searchCanceler = undefined;
                    }
                    searchCanceler = $q.defer();
                    $http.get('/api/search/offer?keyword=' + term, {timeout: searchCanceler.promise})
                        .then(
                            function onSuccess(data) {
                                if (!data.status || data.status === -1) {
                                    return;
                                }
                                deferred.resolve(new OfferListModel(data.data));
                            }
                        );
                    return deferred.promise;
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('searchService', searchService);
}());
(function() {

    var shareService = [
        'Socialshare',
        function(Socialshare) {
            return {

                postToFacebook: function(message, title, description, link, picture) {
                    Socialshare.share({
                        provider: 'facebook',
                        attrs: {
                            socialshareType: 'share',
                            socialshareVia: '1818150935069308',
                            socialshareUrl: link,
                            socialshareTitle: title,
                            socialshareDescription: description,
                            socialshareMedia: picture,
                            socialsharePopupHeight: 500,
                            socialsharePopupWidth : 600,
                            socialshareHashtags: '#ClixTV'
                        }
                    });
                },

                postToTwitter: function(message, title, description, link, picture) {
                    Socialshare.share({
                        provider: 'twitter',
                        attrs: {
                            socialshareVia: 'clixtvofficial',
                            socialshareText: message,
                            socialsharePopupHeight: 500,
                            socialsharePopupWidth : 600
                        }
                    });
                },

                postToTumblr: function(message, title, description, link, picture) {
                    Socialshare.share({
                        provider: 'tumblr',
                        attrs: {
                            socialshareUrl: link,
                            socialshareText: message,
                            socialsharePopupHeight: 500,
                            socialsharePopupWidth : 600
                        }
                    });
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('shareService', shareService);
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
                },

                showNotificationsComingSoonModal: function() {
                    _launchEducationModal('notifications-coming-soon');
                },

                showAnonymousLikedVideo: function() {
                    _launchEducationModal('anonymous-liked-video');
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

                showAlertModal: function(title, message) {
                    this.showModal({
                        controller: 'AlertModalController',
                        templateUrl: 'ui/common/modal/alert/view.alert-modal.html',
                        data: {
                            title: title,
                            message: message
                        }
                    });
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
        'clixConfig',
        function($q, $http, $log, $rootScope, BrandListModel, OfferListModel, CharityListModel, CelebrityListModel, CategoryListModel, VideoListModel, AccountSettingListModel, UserModel, modalService, catchMediaService, clixConfig) {

            var loggedInUser, loggedInUserChecked;

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

                switch(type) {
                    case 'celebrity':
                        catchMediaService.trackAppEvent('favorite', {
                            target_cm: 'media',
                            target_type: 'person',
                            target_id: id
                        });
                        break;
                    case 'brand':
                        catchMediaService.trackAppEvent('favorite', {
                            target_cm: 'media',
                            target_type: 'campaign',
                            target_id: id
                        });
                        break;
                    case 'charity':
                        catchMediaService.trackAppEvent('favorite', {
                            target_cm: 'media',
                            target_type: 'organization',
                            target_id: id
                        });
                        break;
                    case 'watchlist':
                        catchMediaService.trackMediaEvent(id, 'episode', 'watchlist_add');
                        break;
                }

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
                                if (!data || !data.data || !data.data._id) {
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
                        })
                        .then(
                            function onSuccess(data) {
                                loggedInUser = data.data;
                                $rootScope.$broadcast('user.update', loggedInUser);
                                return data.data;
                            }
                        )
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
                    var deferred = $q.defer();
                    if (loggedInUserChecked) {
                        return $q.when(loggedInUser);
                    }
                    $rootScope.$on('user.login', function() {
                        deferred.resolve(loggedInUser);
                    });
                    return deferred.promise;
                },

                setLoggedInUser: function() {
                    return $http.get('/api/account/get_current')
                        .then(
                            function onSuccess(data) {

                                loggedInUserChecked = true;

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
                },

                addUserToNewsletter: function(email, firstName, lastName) {
                    return $http.post(clixConfig.baseApi + '/users/newsletter', {
                        email: email
                    });
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
        'VideoListModel',
        'SeriesModel',
        'clixConfig',
        function($http, VideoModel, VideoListModel, SeriesModel, clixConfig) {
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

                getVideoBySlug: function(slug) {
                    return $http.get(clixConfig.baseApi + '/episodes/slug/' + slug)
                        .then(
                            function onSuccess(data) {
                                return new VideoModel(data.data);
                            }
                        );
                },

                addVideoLike: function(id) {
                    return $http.post('/api/video/add_like', {
                        id: id
                    });
                },

                getRelatedVideos: function(id) {
                    return $http.get('/api/video/get_related_videos?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new VideoListModel(data.data);
                            }
                        );
                },

                getSeriesById: function(id) {
                    return $http.get('/api/video/get_serie_by_id?id=' + id)
                        .then(
                            function onSuccess(data) {
                                return new SeriesModel(data.data);
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

    var shortNumberFilter = [
        function() {
            return function (number, fractionSize) {
                if(number === null) return null;
                if(number === 0) return "0";

                if(!fractionSize || fractionSize < 0)
                    fractionSize = 1;

                var abs = Math.abs(number);
                var rounder = Math.pow(10,fractionSize);
                var isNegative = number < 0;
                var key = '';
                var powers = [
                    {key: "Q", value: Math.pow(10,15)},
                    {key: "T", value: Math.pow(10,12)},
                    {key: "B", value: Math.pow(10,9)},
                    {key: "M", value: Math.pow(10,6)},
                    {key: "K", value: 1000}
                ];

                for(var i = 0; i < powers.length; i++) {

                    var reduced = abs / powers[i].value;

                    reduced = Math.round(reduced * rounder) / rounder;

                    if(reduced >= 1){
                        abs = reduced;
                        key = powers[i].key;
                        break;
                    }
                }

                return (isNegative ? '-' : '') + abs + key;
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('shortNumber', shortNumberFilter);
}());
(function() {

    window.slug.charmap['%'] = 'percent';

    var slugFilter = [
        'stringUtils',
        function(stringUtils) {
            return function (input) {
                if (!input) {
                    return input;
                }
                return window.slug(input, {
                    lower: true
                });
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
(function() {

    var apiInterceptor = [
        '$log',
        'cacheService',
        function($log, cacheService) {

            this.request = function(config) {
                if (config.url.startsWith('ui/')) {
                    return config;
                }

                // The cache factory retires data if the TTL has expired, so we'll
                // "ping" the cache key to trigger a fresh batch in the background
                // if the endpoint calls for it.
                var cache = cacheService.getCache();
                if (cache) {
                    cache.get(config.url);
                }
                return config;
            };
        }
    ];

    angular
        .module('clixtv')
        .service('apiInterceptor', apiInterceptor);
}());