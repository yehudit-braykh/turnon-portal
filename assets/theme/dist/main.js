(function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['turnon']);
    });


    var module = angular
        .module('turnon', [
            'slickCarousel',
            'ui.router',
            'duParallax',
            'ui.bootstrap',
            'puElasticInput',
            'uiSwitch',
            'angularModalService',
            'LocalStorageModule',
            'ngMask',
            'angular.filter',s
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
            baseApi: (window.ENVIRONMENT === 'stage') ? 'http://52.43.246.138' : 'https://api.turnon.com',

            // A non-logged in user will not be allowed to directly view any episodes
            // that are below this number
            lockedMinimumEpisodeNumber: 2,

            // API key for segment tracking
            segmentApiKey: 'YV8pmcoBPm8xF2ocBVwq6AxxoZXTn8rG',

            // Base URL for images
            baseImageUrl: 'https://advncedcdn.vo.llnwd.net/turnon_prod_storage/static',

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
                    // .state('video', {
                    //     url: '/video/:slug',
                    //     templateUrl: 'ui/video-permalink/view.video-permalink.html',
                    //     controller: 'VideoPermalinkController',
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('brands', {
                    //     url: '/brands',
                    //     templateUrl: 'ui/brand/view.brands.html',
                    //     controller: 'BrandsController',
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('brand', {
                    //     url: '/brand/:slug',
                    //     templateUrl: 'ui/brand/view.brand.html',
                    //     controller: 'BrandController'
                    // })
                    // .state('brand-offer', {
                    //     url: '/brand/:slug/offer/:offerSlug',
                    //     templateUrl: 'ui/brand/view.brand.html',
                    //     controller: 'BrandController'
                    // })
                    // .state('charity', {
                    //     url: '/charity/:slug?starId',
                    //     templateUrl: 'ui/charity/view.charity.html',
                    //     controller: 'CharityController'
                    // })
                    // .state('charities', {
                    //     url: '/charities',
                    //     templateUrl: 'ui/charity/view.charities.html',
                    //     controller: 'CharitiesController',
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('stars', {
                    //     url: '/stars',
                    //     templateUrl: 'ui/stars/view.stars.html',
                    //     controller: 'StarsController',
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('star', {
                    //     url: '/star/:slug',
                    //     templateUrl: 'ui/stars/view.star.html',
                    //     controller: 'StarController',
                    //     params: {
                    //         tab: 'video'
                    //     }
                    // })
                    // .state('categories', {
                    //     url: '/categories',
                    //     templateUrl: 'ui/categories/view.categories.html',
                    //     controller: 'CategoriesController',
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('category', {
                    //     url: '/category/:slug',
                    //     templateUrl: 'ui/categories/view.category.html',
                    //     controller: 'CategoryController'
                    // })
                    // .state('offer', {
                    //     url: '/offer/:id',
                    //     templateUrl: 'ui/offer/view.offer.html',
                    //     controller: 'OfferController'
                    // })
                    // .state('print-redeem-offer', {
                    //     url: '/offer/:id/redeem/print',
                    //     templateUrl: 'ui/offer/view.printable-redeem-offer.html',
                    //     controller: 'PrintableRedeemOfferController',
                    //     data: {
                    //         print: true
                    //     }
                    // })
                    // .state('account', {
                    //     url: '/account/:section',
                    //     templateUrl: 'ui/account/view.account.html',
                    //     controller: 'AccountController',
                    //     params: {
                    //         tab: ''
                    //     },
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('contact', {
                    //     url: '/contact/:section',
                    //     templateUrl: 'ui/contact/view.contact-page.html',
                    //     controller: 'ContactPageController',
                    //     params: {
                    //         section: {
                    //             squash: true,
                    //             value: null
                    //         }
                    //     },
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('about', {
                    //     url: '/about',
                    //     templateUrl: 'ui/about/view.about-page.html',
                    //     controller: 'AboutPageController',
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('terms-of-use', {
                    //     url: '/terms-of-use',
                    //     templateUrl: 'ui/terms-and-conditions/view.terms-and-conditions.html',
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
                    // .state('privacy-policy', {
                    //     url: '/privacy-policy',
                    //     templateUrl: 'ui/privacy-policy/view.privacy-policy.html',
                    //     data: {
                    //         solidNavigation: true
                    //     }
                    // })
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

                $rootScope.pageTitle = 'turnon - Your Stars! Their Passions.';

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

  $templateCache.put('directives/buttons/view.callout-button.html',
    ""
  );


  $templateCache.put('directives/buttons/view.primary-button.html',
    ""
  );


  $templateCache.put('directives/buttons/view.secondary-button.html',
    ""
  );


  $templateCache.put('directives/buttons/view.tertiary-button.html',
    ""
  );


  $templateCache.put('directives/datepicker/view.datepicker-dropdowns.html',
    ""
  );


  $templateCache.put('directives/dropdown/view.dropdown.html',
    ""
  );


  $templateCache.put('directives/loader/view.loader.html',
    "<div class=clix-loader><div class=loader-icon ng-class=\"{'loader-extra-small': size === 'extra-small', 'loader-small': size === 'small', 'loader-medium': size === 'medium', 'loader-large': size === 'large'}\"></div></div>"
  );


  $templateCache.put('directives/modal/alert/view.alert-modal.html',
    "<clix-message-modal><modal-title>{{title}}</modal-title><modal-body><div ng-bind-html=message></div></modal-body><modal-confirm-button><clix-primary-button ng-click=onCloseButtonPress()>Done</clix-primary-button></modal-confirm-button></clix-message-modal>"
  );


  $templateCache.put('directives/modal/confirmation/view.confirmation-modal.html',
    "<clix-message-modal><modal-title>{{title}}</modal-title><modal-body>{{message}}</modal-body><modal-cancel-button><clix-secondary-button alternate=true ng-click=onCloseButtonPress()>Cancel</clix-secondary-button></modal-cancel-button><modal-confirm-button><clix-primary-button ng-click=onConfirmButtonPress()>Remove</clix-primary-button></modal-confirm-button></clix-message-modal>"
  );


  $templateCache.put('directives/modal/donate/view.donate.html',
    "<clix-modal modal-title=\"{{state === 'buy' ? 'Buy Points' : 'Donate Points'}}\"><div class=clix-donate-modal><div class=clix-donate-modal-header><div class=stepper-container-container ng-class=\"{'buy-more-points-input-container': state === 'buy'}\"><div ng-show=\"state !== 'buy'\"><clix-number-stepper></clix-number-stepper><div class=donate-stepper-label>Available Cash Balance 1760 Points Balance</div></div><div ng-show=\"state === 'buy'\"><div class=buy-points-input-container ng-click=onBuyPointsContainerPress()><span class=buy-points-symbol>$ </span><input type=text ng-pattern=/^[0-9,]*$/ id=buyPointsInput ng-model=buyPointsModel ng-blur=onBuyPointsBlur(buyPointsModel) style=\"min-width: 35px\" pu-elastic-input-width-delta=5px pu-elastic-input clix-max-length=8> <span class=buy-points-cents>.00</span></div><div class=buy-points-input-label>Input amount to apply to points</div><div class=\"buy-points-input-label buy-points-input-sublabel\">Each dollar equals one point.</div></div></div></div><div class=buy-more-points-container ng-class=\"{'buy-more-points-credit-card': state === 'buy'}\"><div ng-show=pointsEnabled><div ng-show=\"state !== 'buy'\"><div class=buy-points-label>Want to buy more points?</div><clix-secondary-button ng-click=onBuyPointsPress()>Buy Points Here</clix-secondary-button></div><div ng-show=\"state === 'buy'\"><div class=credit-card-form><div class=credit-card-label>Credit Card <i class=\"lock-icon icon-icon-security-lock\"></i></div><div class=\"input-container-row row\"><div class=\"input-container col-sm-6\"><input type=text> <span class=input-container-label>Credit card number</span></div><div class=\"input-container col-xs-5 col-sm-3\"><input type=text> <span class=input-container-label>CCV <i class=\"info-icon icon-info-icon\"></i></span></div><div class=\"input-container col-xs-5 col-sm-3\"><input type=text> <span class=input-container-label>Expiration date</span></div></div><div class=\"input-container-row row\"><div class=\"input-container col-sm-8\"><input type=text> <span class=input-container-label>Name (As shown on card)</span></div><div class=\"input-container col-xs-6 col-sm-4\"><input type=text> <span class=input-container-label>Zip/Postal code</span></div></div></div></div></div><div ng-show=!pointsEnabled><div class=points-coming-soon-label>Rewards Points are coming! Please check back soon!</div></div></div><div class=donate-footer><div ng-if=pointsEnabled><clix-checkbox label-text=\"I accept the Terms and Conditions\"></clix-checkbox></div><div class=\"row donate-footer-buttons hidden-xs hidden-sm\" ng-show=\"state === 'buy'\"><div class=\"col-sm-6 donate-footer-button\"><a ng-click=onBackPress() class=donate-cancel-button>Back</a></div><div class=\"col-sm-6 donate-footer-button\"><clix-primary-button ng-click=onDonatePress()>Complete Purchase</clix-primary-button></div></div><div class=\"row donate-footer-buttons buy-mobile-footer-buttons visible-sm visible-xs\" ng-show=\"state === 'buy'\"><div class=\"col-sm-6 donate-footer-button\"><div class=buy-mobile-footer-button><clix-primary-button ng-click=onDonatePress()>Complete Purchase</clix-primary-button></div></div><div class=\"col-sm-6 donate-footer-button\"><div class=buy-mobile-footer-button><a ng-click=onBackPress() class=donate-cancel-button>Back</a></div></div></div><div class=\"row donate-footer-buttons\" ng-show=\"state !== 'buy'\"><div class=\"col-xs-6 donate-footer-button\"><a ng-click=onCancelPress() class=donate-cancel-button ng-if=pointsEnabled>Cancel</a></div><div class=\"col-xs-6 donate-footer-button\"><div ng-if=pointsEnabled><clix-primary-button ng-click=onDonatePress()>Donate Now</clix-primary-button></div><div ng-if=!pointsEnabled><a ng-click=onCancelPress() class=donate-cancel-button>Cancel</a></div></div></div></div></div></clix-modal>"
  );


  $templateCache.put('directives/modal/education/view.education-modal.html',
    "<clix-modal modal-title={{title}}><div ng-if=!ready><clix-loader size=small></clix-loader></div><div ng-if=ready class=clix-education-modal><div class=education-modal-message ng-switch=type><div ng-switch-when=watchlist><clix-is-logged-in><logged-in>This video has been saved to your watchlist, available in your \"My turnon\" section.</logged-in><not-logged-in>You need to sign up for a free turnon account to be able to save a video to your watchlist.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=brand><clix-is-logged-in><logged-in>This brand has been saved to your favorites, available in your \"My turnon\" section.</logged-in><not-logged-in>You need to sign up for a free turnon account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=charity><clix-is-logged-in><logged-in>This charity has been saved to your favorites, available in your \"My turnon\" section.</logged-in><not-logged-in>You need to sign up for a free turnon account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=category><clix-is-logged-in><logged-in>This category has been saved to your favorites, available in your \"My turnon\" section.</logged-in><not-logged-in>You need to sign up for a free turnon account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=celebrity><clix-is-logged-in><logged-in>This star has been saved to your favorites, available in your \"My turnon\" section.</logged-in><not-logged-in>You need to sign up for a free turnon account to be able to save to your favorites.</not-logged-in></clix-is-logged-in></div><div ng-switch-when=offer><div ng-if=pointsEnabled><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>Congratulations! You've just received 50 reward points!<br><br>This offer has been saved to your offers, available in your \"My turnon\" section.</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>You missed out on 100 reward points! To earn rewards for watching, saving, clicking and sharing, sign up for a free turnon account!</not-logged-in></clix-is-logged-in></div><div ng-if=!pointsEnabled><div class=education-modal-icon clix-trophy-indicator-icon></div>Reward Points are coming soon! When they are ready, you will receive points for saving this offer!</div></div><div ng-switch-when=offer-view><div ng-if=pointsEnabled><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>You received 50 Reward Points, just for visiting this offer. Save the offer to receive even more!</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>You missed out on 50 reward points! To earn rewards for watching, saving, clicking and sharing, sign up for a free turnon account!</not-logged-in></clix-is-logged-in></div><div ng-if=!pointsEnabled><div class=education-modal-icon clix-trophy-indicator-icon></div>Reward Points are coming soon! When they are ready, you will receive points for clicking on this offer!</div></div><div ng-switch-when=learn-more><clix-is-logged-in><logged-in><div class=education-modal-icon clix-trophy-indicator-icon></div>turnon will reward you for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badges, points can be earned.</logged-in><not-logged-in><div class=education-modal-icon clix-error-indicator-icon></div>After you sign up, turnon will reward you for watching videos, engaging with brands & offers, and sharing to social networks. Wherever you see the rewards points badges, points can be earned.</not-logged-in></clix-is-logged-in><div class=learn-more-violators-container><div class=learn-more-violator><clix-points-violator>50</clix-points-violator></div><div class=learn-more-violator><clix-violator>100 Reward Points</clix-violator></div></div><p>turnon reward points have a cash value that you can use toward goods and services.</p></div><div ng-switch-when=signup-offer><div class=education-modal-icon clix-error-indicator-icon></div>You need to have an account with us to view offers! Sign up for a free account!</div><div ng-switch-when=notifications-coming-soon><div class=notification-coming-soon-header>Notifications are coming soon!</div>Go ahead and set things up, that way you’ll be ready once we have notifications up and running!</div><div ng-switch-when=anonymous-liked-video><div class=education-modal-icon clix-error-indicator-icon></div>You need to have an account with us to like episodes! Sign up for a free account!</div></div><div class=\"row education-modal-footer\"><div class=\"col-sm-5 save-preference-checkbox-container\"><clix-is-logged-in><logged-in><div ng-switch=type><div ng-switch-when=learn-more></div><div ng-switch-when=signup-offer></div><div ng-switch-when=anonymous-liked-video></div><div ng-switch-default><clix-checkbox ng-model=showAgainModel on-checkbox-change=onShowAgainChange(showAgainModel) label-text=\"{{type === 'notifications-coming-soon' ? 'Don\\'t show this again' : 'Don\\'t show this type again'}}\"></clix-checkbox></div></div></logged-in><not-logged-in><div ng-switch=type><div ng-switch-when=learn-more></div><div ng-switch-when=signup-offer></div><div ng-switch-when=anonymous-liked-video></div><div ng-switch-when=offer-view><clix-checkbox ng-model=showAgainModel on-checkbox-change=onShowAgainChange(showAgainModel) label-text=\"Don't show this type again\"></clix-checkbox></div></div></not-logged-in></clix-is-logged-in></div><div class=\"col-sm-7 buttons-container\"><div class=\"button-container left-button-container\"><clix-secondary-button alternate=true ng-click=onCloseButtonPress(false)>Got it!</clix-secondary-button></div><div class=\"button-container right-button-container\"><clix-is-logged-in><not-logged-in><clix-primary-button ng-click=onSignUpPress()>Sign Up Now</clix-primary-button><a class=login-button ng-click=onLoginPress()>Log In Now</a></not-logged-in><logged-in><div ng-switch=type><div ng-switch-when=watchlist><clix-primary-button ui-sref=\"account({ section: 'watchlist' })\" ng-click=onCloseButtonPress(true)>Go to my Watchlist</clix-primary-button></div><div ng-switch-when=brand><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'brand' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=charity><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'charity' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=category><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'category' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=celebrity><clix-primary-button ui-sref=\"account({ section: 'favorites', tab: 'star' })\" ng-click=onCloseButtonPress(true)>Go to my Favorites</clix-primary-button></div><div ng-switch-when=offer><clix-primary-button ui-sref=\"account({ section: 'saved-offers' })\" ng-click=onCloseButtonPress(true)>Go to my Saved Offers</clix-primary-button></div></div></logged-in></clix-is-logged-in></div></div></div></div></clix-modal>"
  );


  $templateCache.put('directives/modal/login-signup/view.login-signup.html',
    "<clix-modal><a ng-click=onCloseIconPress() class=\"icon-remove-icon clix-modal-close\"></a><div class=signup-modal ng-show=signup><div class=signup-modal-header><div class=\"header-logo-icon icon-colorful-clix-logo\" ng-if=!isBeta></div><img ng-src={{$root.clixConfig.baseImageUrl}}/turnon-logo-horizontal-beta.svg class=header-logo-icon ng-if=isBeta></div><div class=signup-modal-social><div class=social-modal-row><clix-primary-button type=facebook ng-click=onFacebookLoginPress()>Sign Up With Facebook</clix-primary-button></div><div class=social-modal-row><clix-primary-button type=google ng-click=onGoogleLoginPress()>Sign Up With Google</clix-primary-button></div><div class=or-email-container><span>or with email</span></div></div><form ng-submit=onSignupSubmit()><div class=signup-modal-form><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=Email name=email ng-model=signupModel.email></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=\"Re-Enter Email\" name=email-confirm ng-model=signupModel.emailConfirm></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=\"Choose Password\" name=password ng-model=signupModel.password></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=\"Re-Enter Password\" name=password-confirm ng-model=signupModel.passwordConfirm></div></div><div class=signup-modal-form-row><i class=\"form-icon large icon-full-name-input-icon\"></i><div class=signup-modal-input><input id=first-name type=text placeholder=\"First Name\" name=first-name ng-model=signupModel.firstName> <input type=text placeholder=\"First Name\" name=real-first-name ng-model=signupModel.realFirstName></div></div><div class=signup-modal-form-row><i class=\"form-icon large icon-full-name-input-icon\"></i><div class=signup-modal-input><input type=text placeholder=\"Last Name\" name=last-name ng-model=signupModel.lastName></div></div></div></form><div class=error-message ng-if=error>{{error}}</div><div class=signup-modal-submit><div class=submit-button><clix-primary-button type=normal ng-click=onSignupSubmit()>Sign Up</clix-primary-button></div><div class=login-container>Have an account? <a ng-click=onLoginPress()>Log in</a></div></div><div class=signup-modal-footer>By signing in, you agree to our <a ui-sref=terms-of-use>Terms of Use</a> and <a ui-sref=privacy-policy>Privacy Policy</a></div></div><div class=signup-modal ng-hide=signup><div class=signup-modal-header><div class=\"header-logo-icon icon-colorful-clix-logo\" ng-if=!isBeta></div><img ng-src={{$root.clixConfig.baseImageUrl}}/turnon-logo-horizontal-beta.svg class=header-logo-icon ng-if=isBeta></div><div class=signup-modal-social><div class=social-modal-row><clix-primary-button type=facebook ng-click=onFacebookLoginPress()>Log In With Facebook</clix-primary-button></div><div class=social-modal-row><clix-primary-button type=google ng-click=onGoogleLoginPress()>Log In With Google</clix-primary-button></div><div class=or-email-container><span>or with email</span></div></div><form ng-submit=onLoginSubmit() class=signup-modal-form><div class=signup-modal-form-row><i class=\"form-icon icon-email-input-icon\"></i><div class=signup-modal-input><input type=email placeholder=Email ng-model=loginModel.email></div></div><div class=signup-modal-form-row><i class=\"form-icon icon-password-input-icon\"></i><div class=signup-modal-input><input type=password placeholder=Password ng-model=loginModel.password></div></div><input type=submit></form><div class=error-message ng-if=error>{{error}}</div><div class=signup-modal-submit><div class=submit-button><clix-primary-button type=normal ng-click=onLoginSubmit()>Log In</clix-primary-button></div><div class=login-container>Don't have an account? <a ng-click=onSignupPress()>Sign up</a></div></div><div class=signup-modal-footer>By signing in, you agree to our <a ui-sref=terms-of-use>Terms of Use</a> and <a ui-sref=privacy-policy>Privacy Policy</a></div></div></clix-modal>"
  );


  $templateCache.put('directives/modal/offer/view.offer-modal.html',
    "<clix-modal modal-title=&nbsp;><div class=clix-offer-modal><a ng-click=onClosePress() class=close-modal-icon><div class=icon-remove-icon></div></a><div ng-if=!offer><clix-loader size=small></clix-loader></div><div ng-if=offer><div class=\"offer-image-info-container row\"><div class=offer-background-image style=\"background-image: url('{{offer.carouselPic1}}')\"></div><div class=col-sm-6><slick dots=true prev-arrow=#main-carousel-previous next-arrow=#main-carousel-next><div class=offer-image-container ng-if=offer.carouselPic1><img ng-src={{offer.carouselPic1}} class=offer-image></div><div class=offer-image-container ng-if=offer.carouselPic2><img ng-src={{offer.carouselPic2}} class=offer-image></div><div class=offer-image-container ng-if=offer.carouselPic3><img ng-src={{offer.carouselPic3}} class=offer-image></div></slick><div id=main-carousel-previous><div class=\"main-carousel-button hidden-sm hidden-xs hidden-md\"><i class=\"arrow-icon icon-left-tall-arrow\"></i></div></div><div id=main-carousel-next><div class=\"main-carousel-button hidden-sm hidden-xs hidden-md\"><i class=\"arrow-icon icon-right-tall-arrow\"></i></div></div></div><div class=col-sm-6><div class=offer-expiration-date><span ng-if=offer.expirationDate>Offer Expires {{offer.expirationDate | clixDate : 'long'}} </span><span ng-if=!offer.expirationDate>Limited Time Offer</span></div><div class=offer-title>{{offer.title}}</div><div ng-if=offer.couponCode class=offer-coupon-code ngclipboard data-clipboard-text={{offer.couponCode}} ngclipboard-success=onCopyToClipboardSuccess(e);><div clix-tooltip-trigger tooltip-id=code-copied click-trigger=true>{{offer.couponCode}}</div></div><div class=instructions-title>Instructions</div><div class=instructions-container ng-bind-html=\"offer.instructions | clixNewLineBreak\"></div></div></div><div class=\"offer-buttons-container row\"><div class=col-sm-4><div class=offer-button><clix-tertiary-button ng-click=onSaveOfferPress()>{{isSavedOffer ? 'Offer Saved' : 'Save Offer'}}</clix-tertiary-button><div class=violator-container><clix-points-violator>50</clix-points-violator></div></div></div><div class=col-sm-4><div class=offer-button><clix-tertiary-button ng-click=onOfferRedeemPress()>Redeem Offer</clix-tertiary-button><div class=violator-container><clix-points-violator>50</clix-points-violator></div></div></div><div class=col-sm-4><div class=offer-share><clix-share-button offer=offer></clix-share-button><clix-points-violator>50</clix-points-violator></div></div></div><div class=offer-description-container><div class=offer-description ng-bind-html=\"offer.longDescription || offer.description | clixNewLineBreak\"></div></div></div></div><clix-tooltip tooltip-id=code-copied>Copied to your clipboard</clix-tooltip></clix-modal>"
  );


  $templateCache.put('directives/modal/rewards/view.redeem-rewards.html',
    "<clix-modal modal-title=\"Redeem Rewards\"><div class=clix-redeem-rewards-modal><div class=reward-callout><div class=reward-image><img ng-src={{image}} ng-srcset=\"{{imageHighRes}} 2x\"></div><div class=reward-info><div class=reward-title>{{title}}</div><div class=reward-subtitle>Redeem Online Only</div></div></div><div class=reward-stepper><clix-number-stepper></clix-number-stepper><div class=reward-stepper-label>Available Cash Balance 1760 Points Balance</div></div><div class=redeem-rewards-footer><div class=redeem-rewards-legal>{{disclaimer}}</div><div class=\"row redeem-rewards-buttons\"><div class=\"col-xs-6 redeem-rewards-button\"><a ng-click=onCancelPress() class=redeem-rewards-cancel-button>Cancel</a></div><div class=\"col-xs-6 redeem-rewards-button\"><clix-primary-button ng-click=onRedeemPress()>Redeem Now</clix-primary-button></div></div></div></div></clix-modal>"
  );


  $templateCache.put('directives/modal/share/view.generic-share-content.html',
    "<div class=clix-generic-share-content><div class=share-icon-container ng-transclude=shareIconContainer></div><div class=share-content-container><div class=share-content-title ng-transclude=shareTitle></div><div class=share-content-description ng-transclude=shareDescription></div><div class=share-content-footer ng-transclude=shareFooterTitle></div></div></div>"
  );


  $templateCache.put('directives/modal/share/view.share-modal-brand-content.html',
    "<div class=clix-share-modal-brand-content><clix-generic-share-content><share-icon-container><div class=clix-thumbnail-logo><clix-brand-charity-logo brand=brand></clix-brand-charity-logo></div></share-icon-container><share-title>{{brand.title}}</share-title><share-description>{{brand.description | wordTruncate : 275}}</share-description><share-footer-title>turnon</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('directives/modal/share/view.share-modal-celebrity-content.html',
    "<div class=clix-share-modal-celebrity-content><clix-generic-share-content><share-icon-container><div class=celebrity-thumbnail style=\"background-image:url('{{celebrity.thumbnail}}')\"></div></share-icon-container><share-title>{{celebrity.name}}</share-title><share-description>{{celebrity.description | wordTruncate : 275}}</share-description><share-footer-title>turnon</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('directives/modal/share/view.share-modal-charity-content.html',
    "<div class=clix-share-modal-charity-content><clix-generic-share-content><share-icon-container><div class=clix-thumbnail-logo><clix-charity-logo charity=charity></clix-charity-logo></div></share-icon-container><share-title>{{charity.title}}</share-title><share-description>{{charity.description | wordTruncate : 275}}</share-description><share-footer-title>turnon</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('directives/modal/share/view.share-modal-connect-button.html',
    "<div class=clix-share-modal-connect-button><div class=share-modal-connect-button-content ng-transclude></div></div>"
  );


  $templateCache.put('directives/modal/share/view.share-modal-offer-content.html',
    "<div class=clix-share-modal-offer-content><clix-generic-share-content><share-icon-container><div class=clix-thumbnail-logo><clix-offer-logo offer=offer></clix-offer-logo></div></share-icon-container><share-title>{{offer.title}}</share-title><share-description>{{offer.description | wordTruncate : 275}}</share-description><share-footer-title>turnon</share-footer-title></clix-generic-share-content></div>"
  );


  $templateCache.put('directives/modal/share/view.share-modal-video-content.html',
    "<div class=clix-share-modal-video-content><div class=\"row share-modal-video-row\"><div class=\"col-sm-5 video-thumbnail-container\"><img ng-src={{video.thumbnail}} class=video-thumbnail></div><div class=\"col-sm-7 video-info-container\"><div class=series-title>Episode {{video.episodeNumber}}: {{video.title}}</div><div class=episode-title>{{video.seriesTitle || video.series.title}} Series</div><div class=\"celebrity-title hidden-sm hidden-xs\">{{video.celebrity.name}}</div><div class=\"video-description hidden-sm hidden-xs\">{{video.description | wordTruncate : 120}}</div><div class=\"video-description visible-sm visible-xs\">{{video.description}}</div><div class=\"video-clix-tv hidden-sm hidden-xs\">turnon</div></div></div></div>"
  );


  $templateCache.put('directives/modal/share/view.share-settings.html',
    "<clix-modal modal-title=\"Share Settings\"><div class=clix-share-settings-modal><div class=share-settings-row><div class=\"social-network-icon-container facebook-social-network\"><i class=\"icon-facebook-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-7\">Connect your Facebook account</div><div class=\"social-network-connect-button col-sm-5\"><clix-share-modal-connect-button>Connect</clix-share-modal-connect-button></div></div></div><div class=share-settings-row><div class=\"social-network-icon-container twitter-social-network\"><i class=\"icon-twitter-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-7\">Connect your Twitter account</div><div class=\"social-network-connect-button col-sm-5\"><clix-share-modal-connect-button>Connect</clix-share-modal-connect-button></div></div></div><div class=share-settings-row><div class=\"social-network-icon-container tumblr-social-network\"><i class=\"icon-tumblr-logo social-network-icon\"></i></div><div class=\"social-network-info-container row\"><div class=\"social-network-description col-sm-7\">Connect your Tumblr account</div><div class=\"social-network-connect-button col-sm-5\"><clix-share-modal-connect-button>Connect</clix-share-modal-connect-button></div></div></div><div class=share-settings-footer>We will never store your password.</div></div></clix-modal>"
  );


  $templateCache.put('directives/modal/share/view.share.html',
    "<clix-modal><div class=clix-share-modal><div class=clix-tabs><uib-tabset active=active><uib-tab index=0 heading=\"Post To\" select=\"onTabPress('post')\"><div class=modal-post-content><div ng-if=video><clix-share-modal-video-content video=video></clix-share-modal-video-content></div><div ng-if=celebrity><clix-share-modal-celebrity-content celebrity=celebrity></clix-share-modal-celebrity-content></div><div ng-if=offer><clix-share-modal-offer-content offer=offer></clix-share-modal-offer-content></div><div ng-if=brand><clix-share-modal-brand-content brand=brand></clix-share-modal-brand-content></div><div ng-if=charity><clix-share-modal-charity-content charity=charity></clix-share-modal-charity-content></div></div></uib-tab><uib-tab index=1 heading=\"Send To...\" select=\"onTabPress('send')\"><div class=modal-send-content><div ng-if=video><clix-share-modal-video-content video=video></clix-share-modal-video-content></div><div ng-if=celebrity><clix-share-modal-celebrity-content celebrity=celebrity></clix-share-modal-celebrity-content></div><div ng-if=offer><clix-share-modal-offer-content offer=offer></clix-share-modal-offer-content></div><div ng-if=brand><clix-share-modal-brand-content brand=brand></clix-share-modal-brand-content></div><div ng-if=charity><clix-share-modal-charity-content charity=charity></clix-share-modal-charity-content></div></div></uib-tab></uib-tabset><div class=share-modal-footer><div ng-show=\"tab === 'post'\"><div class=clix-share-modal-textbox><textarea>{{shareContent}}</textarea></div><div class=share-modal-post-container><div class=share-modal-social-networks><div class=share-modal-post-to-label>Post to</div><a class=\"social-network-icon-container facebook-social-network\" ng-click=\"onSocialNetworkPress('facebook')\" ng-class=\"{'active': socialNetworks.indexOf('facebook') !== -1}\"><i class=\"icon-facebook-logo social-network-icon\"></i> </a><a class=\"social-network-icon-container twitter-social-network\" ng-click=\"onSocialNetworkPress('twitter')\" ng-class=\"{'active': socialNetworks.indexOf('twitter') !== -1}\"><i class=\"icon-twitter-logo social-network-icon\"></i> </a><a class=\"social-network-icon-container tumblr-social-network\" ng-click=\"onSocialNetworkPress('tumblr')\" ng-class=\"{'active': socialNetworks.indexOf('tumblr') !== -1}\"><i class=\"icon-tumblr-logo social-network-icon\"></i></a></div></div></div><div ng-show=\"tab === 'send'\"><div class=clix-share-modal-input><input placeholder=\"example@example.com, example@example.com, ...\" ng-model=form.emails></div><div class=\"clix-share-modal-textbox send-textbox\"><textarea ng-model=form.message></textarea></div><div class=\"share-modal-post-container share-modal-copy-link-container\" class=share-modal-copy-link ngclipboard data-clipboard-text={{link}}><div class=share-modal-copy-link clix-tooltip-trigger tooltip-id=link-copied click-trigger=true>Copy {{type}} Link</div></div></div><div class=\"row footer-modal-buttons-container\"><div class=\"col-xs-6 footer-modal-button\"><a class=cancel-button ng-click=onCancelPress()>{{showBackButton ? 'Back' : 'Cancel'}}</a></div><div class=\"col-xs-6 footer-modal-button\"><clix-primary-button ng-show=\"tab === 'send'\" ng-click=onSendPress() loading=sending>Send</clix-primary-button><clix-primary-button ng-show=\"tab === 'post'\" ng-click=onPostPress() loading=sending>Post</clix-primary-button></div></div></div></div></div><clix-tooltip tooltip-id=link-copied>Copied to your clipboard</clix-tooltip></clix-modal>"
  );


  $templateCache.put('directives/modal/view.message-modal.html',
    "<clix-modal extra-modal-class=clix-message-modal><div class=clix-modal-header ng-transclude=modalTitle></div><div class=message-modal-body><div ng-transclude=modalBody></div></div><div class=message-modal-footer><div class=buttons-container><div class=button-container><div ng-transclude=modalCancelButton></div></div><div class=button-container><div ng-transclude=modalConfirmButton></div></div></div></div></clix-modal>"
  );


  $templateCache.put('directives/modal/view.modal.html',
    "<div class=\"clix-modal {{extraModalClass}}\"><a ng-click=onBackButtonPress() ng-show=showBackButton class=modal-back-button><div class=icon-left-tall-arrow></div></a><div class=clix-modal-header ng-show=modalTitle>{{modalTitle}}</div><div ng-transclude></div></div>"
  );


  $templateCache.put('directives/notifications/view.notification-item.html',
    "<div class=notification-item ng-class=\"{'minimal-notification-item': minify === 'true'}\"><a ui-sref=\"star({ id: '57dacf46ef97110300fe5366' })\" class=notification-thumbnail style=\"background-image: url('http://advncedcdn.vo.llnwd.net/turnon_storage/storage/57cdc2665aad0b6fcf67bb3d/57dacf46ef97110300fe5366/kyrie_irving3.png')\"></a><div class=notification-content-container><div class=notification-subject><a ui-sref=\"star({ id: '57dacf46ef97110300fe5366' })\" class=notification-author-name>{{notification.subject}}</a> added a new video: &ldquo;<a ui-sref=\"video({ id: '57d587cf5877ef0300727bc9' })\">{{notification.message}}</a>&rdquo;.</div><div class=notification-timestamp-container><div class=notification-timestamp><i class=\"notification-icon icon-stars-icon\"></i> 2 Hours Ago</div><div class=notification-points-container><clix-violator>100 Reward Points</clix-violator></div></div></div><a ng-click=onNotificationMenuPress(notification) clix-click-anywhere-else=bodyClicked class=notification-more-icon-container><i class=\"notification-more-icon icon-ellipsis\" clix-tooltip-trigger tooltip-id=actions-button-{{$id}}></i></a><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><clix-tooltip tooltip-id=actions-button-{{$id}}>Actions</clix-tooltip></div>"
  );


  $templateCache.put('directives/notifications/view.notification-tooltip.html',
    "<div class=clix-notification-tooltip><div class=notification-tooltip-header>Notifications</div><div class=disabled-notifications-container ng-if=!notificationEnabled><div class=disabled-notifications-header>Notifications are<br>coming soon!</div><div class=disabled-notifications-body>Soon you will receive notifications on your favorites and saved offers!</div></div><div ng-if=notificationEnabled><clix-notifications notifications=notifications minify=true></clix-notifications></div></div>"
  );


  $templateCache.put('directives/notifications/view.notifications.html',
    "<div class=clix-notifications><div class=notification-item-container ng-repeat=\"notification in notifications.notifications\"><clix-notification-item notification=notification minify={{minify}}></clix-notification-item></div></div>"
  );


  $templateCache.put('directives/notifications/view.site-notification-bar.html',
    "<div class=clix-site-notification-bar ng-class=\"{'active': active, 'points-bar': receivedPoints}\" ng-mouseover=onMouseover() ng-mouseleave=onMouseleave()><div ng-show=favorite><div ng-switch=type><div ng-switch-when=favorite><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'favorites', tab: tab })\">Favorites</a></div><div ng-switch-when=watchlist><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'watchlist' })\">Watchlist</a></div><div ng-switch-when=offer><i class=\"notification-bar-icon icon-redeem-plus-icon\"></i> Saved to your <a ui-sref=\"account({ section: 'saved-offers' })\">Saved Offers</a></div></div></div><div ng-show=!favorite><div ng-switch=type><div ng-switch-when=favorite><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'favorites', tab: tab })\">Favorites</a></div><div ng-switch-when=watchlist><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'watchlist' })\">Watchlist</a></div><div ng-switch-when=offer><i class=\"notification-bar-icon icon-redeem-minus-icon\"></i> Removed from your <a ui-sref=\"account({ section: 'saved-offers' })\">Saved Offers</a></div></div></div></div>"
  );


  $templateCache.put('directives/tooltip/view.tooltip-templates.html',
    "<clix-tooltip tooltip-id=rewards-points-tooltip></clix-tooltip>"
  );


  $templateCache.put('directives/tooltip/view.tooltip.html',
    "<div class=clix-tooltip id={{tooltipId}}><div class=clix-tooltip-content><div class=tooltip-arrow></div><div ng-transclude></div></div></div>"
  );


  $templateCache.put('ui/account/favorites/view.favorites.html',
    ""
  );


  $templateCache.put('ui/account/notifications/view.notifications.html',
    ""
  );


  $templateCache.put('ui/account/overview/view.overview-input.html',
    ""
  );


  $templateCache.put('ui/account/overview/view.overview.html',
    "<div class=\"col-md-6 reward-points-container\"><div class=account-info-sub-header>Reward Points</div><div class=reward-points ng-show=pointsEnabled><div class=\"reward-points-block first-block\"><div class=points-label>1760</div><div class=available-balance-label>Available Points Balance<br>$17.60 Cash Balance</div></div><div class=rewards-button><clix-primary-button ui-sref=\"account({ section: 'rewards' })\" ui-sref-opts={reload:true}>Go To My Rewards</clix-primary-button></div></div><div class=reward-points ng-show=!pointsEnabled><div class=points-coming-soon-label>Rewards Points are Coming!<br>Please check back soon!</div><div class=available-balance-label>Available Points Balance<br>$0.00 Cash Balance</div><div class=rewards-button><clix-primary-button type=disabled>Redeem</clix-primary-button></div></div></div>"
  );


  $templateCache.put('ui/account/rewards/view.rewards.html',
    "<div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/turnon_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/turnon_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/turnon_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/turnon_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/turnon_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/turnon_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=reward-activity-row><div class=reward-activity-row-icon><div class=reward-activity-row-icon-logo style=\"background-image: url('http://advncedcdn.vo.llnwd.net/turnon_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d1e7a7889d000337f0e2/Nike-Logo-PNG21.png')\"></div></div><div class=reward-activity-row-info><div class=reward-activity-row-title>Nike</div><div class=reward-activity-row-desc>Coupon Redeemed</div><div class=reward-activity-row-timestamp>2 hours ago</div></div><div class=reward-activity-row-points>+ 50</div></div><div class=rewards-activity-footer><clix-tertiary-button>See All Activity</clix-tertiary-button></div><uib-tab index=1 heading=Activity><div class=rewards-tab-content><div class=\"row rewards-summary-row\"><div class=\"col-md-6 rewards-summary-column\"><div class=rewards-summary-block><div class=rewards-summary-header>Rewards Summary</div><div class=reward-points><div class=\"reward-points-block first-block\" ng-show=pointsEnabled><div class=points-label>1760</div><div class=available-balance-label>Available Points Balance<br>$17.60 Cash Balance</div><div class=rewards-button><clix-primary-button ng-click=onRedeemPress()>Redeem</clix-primary-button></div></div><div ng-show=!pointsEnabled><div class=points-coming-soon-label>Rewards Points are Coming! Please check back soon!</div><div class=available-balance-label>Available Points Balance<br>$0.00 Cash Balance</div><div class=rewards-button><clix-primary-button type=disabled>Redeem</clix-primary-button></div></div></div></div></div></div></div></uib-tab><uib-tab index=2 heading=Redeem><div class=rewards-tab-content><div ng-if=pointsEnabled><p class=redeem-intro>Select your preferred method of redemption and you will be taken to the next page where you will choose your amount and redeem your reward points!</p><div class=\"row redeem-companies-container\"><div class=\"col-xs-6 col-sm-4 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('paypal')\"><div class=redeem-logo-container><img ng-src={{$root.clixConfig.baseImageUrl}}/paypal.png ng-srcset=\"{{$root.clixConfig.baseImageUrl}}/paypal@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>PayPal<br>&nbsp;</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('paypal')\">Redeem Now</a></div></div><div class=\"col-xs-6 col-sm-4 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('visa')\"><div class=redeem-logo-container><img ng-src={{$root.clixConfig.baseImageUrl}}/visa.png ng-srcset=\"{{$root.clixConfig.baseImageUrl}}/visa@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>Visa® Prepaid<br>Card USD^</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('visa')\">Redeem Now</a></div></div><div class=\"col-xs-6 col-sm-4 col-md-4 col-lg-2-4 redeem-company-callout\" ng-click=\"onRedeemRewardsPress('amazon')\"><div class=redeem-logo-container><img ng-src={{$root.clixConfig.baseImageUrl}}/amazon.png ng-srcset=\"{{$root.clixConfig.baseImageUrl}}/amazon@2x.png 2x\"><div class=redeem-action-state><div class=view-button-container><div class=view-button><clix-view-button></clix-view-button></div></div></div></div><div class=redeem-callout-footer><div class=redeem-callout-company>Amazon.com<br>Gift Card∞</div><a class=redeem-now-link ng-click=\"onRedeemRewardsPress('amazon')\">Redeem Now</a></div></div></div><p class=redeem-legal>*PayPal is not a sponsor of the rewards or promotion or otherwise affiliated with this company. The logos and other identifying marks attached are trademarks of and owned by each represented company and/or its affiliates.  Please visit each company's website for additional terms and conditions.</p><p class=redeem-legal>^Card is issued by The Bancorp Bank, Member FDIC, pursuant to a license from Visa U.S.A. Inc.</p><p class=redeem-legal>This reward is non-refundable. The full terms and conditions are available on the Promocode claim site. Click on \"Product Terms\" prior to selecting a Virtual Visa Card or a Plastic Visa Card.  Swift Prepaid Solutions is the Service Provider for your Redemption Account and associated Card Accounts. Your Program Sponsor is the entity that marketed and/or distributed the reward, and is either a direct or indirect Client of Swift Prepaid.</p><p class=redeem-legal>∞Amazon.com is not a sponsor of this promotion. Except as required by law, Amazon.com Gift Cards (\"GCs\") cannot be transferred for value or redeemed for cash. GCs may be used only for purchases of eligible goods on Amazon.com or certain of its affiliated websites. GCs cannot be redeemed for purchases of gift cards. Purchases are deducted from the GC balance. To redeem or view a GC balance, visit \"Your Account\" on Amazon.com. Amazon is not responsible if a GC is lost, stolen, destroyed or used without permission. For complete terms and conditions, see www.amazon.com/gc-legal. GCs are issued by ACI Gift Cards, Inc., a Washington corporation. All Amazon ®, ™ & © are IP of Amazon.com, Inc. or its affiliates. No expiration date or service fees.</p></div><div ng-if=!pointsEnabled><div class=\"row rewards-summary-row\"><div class=\"col-md-6 rewards-summary-column\"><div class=rewards-summary-block><div class=rewards-summary-header>Rewards Summary</div><div class=reward-points><div class=points-coming-soon-label>Rewards Points are Coming! Please check back soon!</div><div class=available-balance-label>Available Points Balance<br>$0.00 Cash Balance</div><div class=rewards-button><clix-primary-button type=disabled>Redeem</clix-primary-button></div></div></div></div></div></div></div></uib-tab>-->"
  );


  $templateCache.put('ui/account/saved-offers/view.saved-offers.html',
    ""
  );


  $templateCache.put('ui/account/settings/view.settings.html',
    ""
  );


  $templateCache.put('ui/account/view.account.html',
    ""
  );


  $templateCache.put('ui/account/watchlist/view.watchlist.html',
    ""
  );


  $templateCache.put('ui/brand/view.brand.html',
    ""
  );


  $templateCache.put('ui/brand/view.brands.html',
    ""
  );


  $templateCache.put('ui/categories/view.categories.html',
    ""
  );


  $templateCache.put('ui/categories/view.category.html',
    ""
  );


  $templateCache.put('ui/categories/view.video-category-scroll-list.html',
    ""
  );


  $templateCache.put('ui/charity/view.charities.html',
    ""
  );


  $templateCache.put('ui/charity/view.charity.html',
    ""
  );


  $templateCache.put('ui/contact/components/view.contact-sidebar.html',
    ""
  );


  $templateCache.put('ui/contact/view.contact-page.html',
    ""
  );


  $templateCache.put('ui/footer/view.footer.html',
    ""
  );


  $templateCache.put('ui/header/view.header-search-icon-row.html',
    ""
  );


  $templateCache.put('ui/header/view.header-search-icon.html',
    ""
  );


  $templateCache.put('ui/header/view.header.html',
    ""
  );


  $templateCache.put('ui/home/view.home.html',
    ""
  );


  $templateCache.put('ui/notfound/view.not-found.html',
    ""
  );


  $templateCache.put('ui/offer/view.offer.html',
    ""
  );


  $templateCache.put('ui/offer/view.printable-redeem-offer.html',
    ""
  );


  $templateCache.put('ui/privacy-policy/view.privacy-policy.html',
    ""
  );


  $templateCache.put('ui/stars/view.star.html',
    ""
  );


  $templateCache.put('ui/stars/view.stars.html',
    ""
  );


  $templateCache.put('ui/terms-and-conditions/view.terms-and-conditions.html',
    ""
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

            // var loggedInUserChecked = false;
            //
            // $scope.activeItem = $stateParams.section;
            //
            // $scope.onNavigationItemSelect = function(item) {
            //     $scope.activeItem = item;
            // };
            //
            // function _setLoggedInUser(user) {
            //     if (!user && loggedInUserChecked) {
            //         $state.go('home');
            //         return;
            //     }
            //     loggedInUserChecked = true;
            //     $scope.loggedInUser = user;
            //     if (user) {
            //         $scope.ready = true;
            //     }
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     _setLoggedInUser(data);
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     $state.go('home');
            // });
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             _setLoggedInUser(data);
            //         }
            //     );

        }
    ];

    angular
        .module('turnon')
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

            // $rootScope.pageTitle = 'Your Favorites - turnon';
            //
            // $scope.ready = false;
            //
            // $scope.filterStarsOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Athletes'
            //     },
            //     {
            //         label: 'Influencers'
            //     },
            //     {
            //         label: 'Movie Stars'
            //     },
            //     {
            //         label: 'Musicians'
            //     },
            //     {
            //         label: 'TV Stars'
            //     }
            // ];
            // $scope.filterBrandsOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Home & Auto'
            //     },
            //     {
            //         label: 'Baby, Kids & Toys'
            //     },
            //     {
            //         label: 'Electronics'
            //     },
            //     {
            //         label: 'Grocery, HouseHold & Pets'
            //     },
            //     {
            //         label: 'Health & Beauty'
            //     },
            //     {
            //         label: 'Jewelry & Watches'
            //     },
            //     {
            //         label: 'Men\'s Fashion'
            //     },
            //     {
            //         label: 'Sports & Outdoors'
            //     },
            //     {
            //         label: 'Women\'s Fashion'
            //     }
            // ];
            // $scope.filterCharitiesOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Animals'
            //     },
            //     {
            //         label: 'Arts & Culture'
            //     },
            //     {
            //         label: 'Education'
            //     },
            //     {
            //         label: 'Environmental'
            //     },
            //     {
            //         label: 'International non-gov'
            //     },
            //     {
            //         label: 'Health'
            //     }
            // ];
            // $scope.filterCategoriesOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Home & Auto'
            //     },
            //     {
            //         label: 'Baby, Kids & Toys'
            //     },
            //     {
            //         label: 'Electronics'
            //     }
            // ];
            //
            //
            //
            //
            // $scope.sortStarsOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Recently Added'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            // $scope.sortBrandsOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Recently Added'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            // $scope.sortCharitiesOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            // $scope.sortCategoriesOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // switch($stateParams.tab) {
            //     default:
            //     case 'star':
            //         $scope.active = 0;
            //         break;
            //     case 'brand':
            //         $scope.active = 1;
            //         break;
            //     case 'charity':
            //         $scope.active = 2;
            //         break;
            //     case 'category':
            //         $scope.active = 3;
            //         break;
            // }
            //
            // $q.all(
            //         [
            //             userService.getFavoriteCelebrities(),
            //             userService.getFavoriteBrands(),
            //             userService.getFavoriteCharities(),
            //             userService.getFavoriteCategories()
            //         ]
            //     )
            //     .then(
            //         function onSuccess(data) {
            //             $scope.ready = true;
            //             $scope.celebrities = data[0];
            //             $scope.brands = data[1];
            //             $scope.charities = data[2];
            //             $scope.categories = data[3];
            //             _initTabScroll();
            //         }
            //     );
            //
            // function _initTabScroll() {
            //     var element = document.getElementsByClassName('nav-tabs');
            //     if (!element) {
            //         return;
            //     }
            //     $scope.tabScrollStart = true;
            //     element = element[0];
            //     angular.element(element).on('scroll', function(event) {
            //         var $element = angular.element(element),
            //             width = $element.outerWidth(),
            //             scrollLeft = $element.scrollLeft(),
            //             scrollWidth = $element[0].scrollWidth;
            //         if (scrollLeft <= 0) {
            //             $scope.tabScrollStart = true;
            //         } else if ($scope.tabScrollStart) {
            //             $scope.tabScrollStart = false;
            //         }
            //
            //         if (scrollWidth - width === scrollLeft) {
            //             $scope.tabScrollEnd = true;
            //         } else if ($scope.tabScrollEnd) {
            //             $scope.tabScrollEnd = false;
            //         }
            //
            //         $timeout(function() {
            //             $scope.$apply();
            //         });
            //     });
            // }
            //
            // function _onCelebrityRemoved(id) {
            //     if (!$scope.celebrities || !$scope.celebrities.celebrities) {
            //         $scope.celebrities = {
            //             celebrities: []
            //         }
            //     }
            //     $scope.celebrities.celebrities = $scope.celebrities.celebrities.filter(function(item) {
            //         return item.id !== id;
            //     });
            // }
            //
            // function _onBrandRemoved(id) {
            //     if (!$scope.brands || !$scope.brands.brands) {
            //         $scope.brands = {
            //             brands: []
            //         }
            //     }
            //     $scope.brands.brands = $scope.brands.brands.filter(function(item) {
            //         return item.id !== id;
            //     });
            // }
            //
            // function _onCharityRemoved(id) {
            //     if (!$scope.charities || !$scope.charities.charities) {
            //         $scope.charities = {
            //             charities: []
            //         }
            //     }
            //     $scope.charities.charities = $scope.charities.charities.filter(function(item) {
            //         return item.id !== id;
            //     });
            // }
            //
            // function _onCategoryRemoved(id) {
            //     if (!$scope.categories || !$scope.categories.categories) {
            //         $scope.categories = {
            //             categories: []
            //         }
            //     }
            //     $scope.categories.categories = $scope.categories.categories.filter(function(item) {
            //         return item.id !== id;
            //     });
            // }
            //
            // $rootScope.$on('favorite.removed', function(event, data) {
            //     switch(data.type) {
            //         case 'celebrity':
            //             _onCelebrityRemoved(data.id);
            //             break;
            //         case 'brand':
            //             _onBrandRemoved(data.id);
            //             break;
            //         case 'charity':
            //             _onCharityRemoved(data.id);
            //             break;
            //         case 'category':
            //             _onCategoryRemoved(data.id);
            //             break;
            //     }
            // });

        }
    ];

    angular
        .module('turnon')
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

    angular.module('turnon')
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

            // $rootScope.pageTitle = 'Your Notifications - turnon';
            // $scope.notificationEnabled = clixConfig.notificationEnabled;
            //
            // notificationsService.getNotifications()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.notifications = data;
            //         }
            //     )
        }
    ];

    angular
        .module('turnon')
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

    angular.module('turnon')
        .directive('clixAccountNotifications', notifications);
}());

(function() {

    var AccountOverviewInputController = [
        '$scope',
        '$rootScope',
        '$timeout',
        function($scope, $rootScope, $timeout) {

            // var oldValue;
            //
            // function _getRangeDropdownOptions(from, to) {
            //     var options = [];
            //     for(var i = from, length = to; i <= length; i++) {
            //         options.push({
            //             label: i
            //         });
            //     }
            //     return options;
            // }
            //
            // function _disableAllErrorStates() {
            //     [
            //         'showEmailError',
            //         'showEmailConfirmationError',
            //         'showOldPasswordError',
            //         'showNewPasswordError',
            //         'showNewPasswordConfirmError',
            //         'showPhoneError'
            //     ].forEach(function(key) {
            //         $scope[key] = false;
            //     });
            //     $scope.formHasErrors = false;
            // }
            //
            // function _isEmailValid() {
            //     _disableAllErrorStates();
            //
            //     // Invalid email...
            //     if ($scope.ngModel === undefined || $scope.ngModel === null) {
            //         $scope.emailErrorMessage = 'Invalid email address';
            //         $timeout(function() {
            //             $scope.showEmailError = true;
            //         });
            //         return false;
            //     }
            //
            //     // Empty email...
            //     if ($scope.ngModel.length === 0) {
            //         $scope.emailErrorMessage = 'Email is required';
            //         $timeout(function() {
            //             $scope.showEmailError = true;
            //         });
            //         return false;
            //     }
            //
            //     // Matching email confirmation...
            //     if ($scope.ngModel !== $scope.emailConfirm) {
            //         $scope.emailConfirmationErrorMessage = 'Email does not match';
            //         $timeout(function() {
            //             $scope.showEmailConfirmationError = true;
            //         });
            //         return false;
            //     }
            //
            //     return true;
            // }
            //
            // function _isPasswordValid() {
            //     _disableAllErrorStates();
            //
            //     // Invalid old password...
            //     if ($scope.ngModel === undefined || $scope.ngModel === '') {
            //         $scope.oldPasswordErrorMessage = 'Password is required';
            //         $timeout(function() {
            //             $scope.showOldPasswordError = true;
            //         });
            //         return false;
            //     }
            //
            //     // Invalid new password...
            //     if ($scope.newPassword === undefined || $scope.newPassword === '') {
            //         $scope.newPasswordErrorMessage = 'Password is required';
            //         $timeout(function() {
            //             $scope.showNewPasswordError = true;
            //         });
            //         return false;
            //     }
            //
            //     // Matching password confirmation...
            //     if ($scope.newPassword !== $scope.newPasswordConfirm) {
            //         $scope.newPasswordConfirmErrorMessage = 'Password does not match';
            //         $timeout(function() {
            //             $scope.showNewPasswordConfirmError = true;
            //         });
            //         return false;
            //     }
            //
            //     return true;
            // }
            //
            // function _isPhoneNumberValid() {
            //     var phoneNumber;
            //     _disableAllErrorStates();
            //     if (!$scope.ngModel) {
            //         return true;
            //     }
            //
            //     phoneNumber = $scope.ngModel.replace(/[^0-9]/g, '');
            //
            //     if (phoneNumber.length !== 10) {
            //         $scope.phoneErrorMessage = 'Not a valid phone number';
            //         $timeout(function() {
            //             $scope.showPhoneError = true;
            //         });
            //         return false;
            //     }
            //
            //     return true;
            // }
            //
            // $scope.editing = false;
            // $scope.days = _getRangeDropdownOptions(1, 31);
            // $scope.months = _getRangeDropdownOptions(1, 12);
            // $scope.years = _getRangeDropdownOptions(1900, 2000);
            //
            // $scope.genders = [
            //     {
            //         label: 'Male',
            //         value: 'male'
            //     },
            //     {
            //         label: 'Female',
            //         value: 'female'
            //     },
            //     {
            //         label: 'Other',
            //         value: 'other'
            //     }
            // ];
            //
            // $scope.onFieldEdit = function() {
            //     oldValue = $scope.ngModel;
            //     $rootScope.$broadcast('account.edit');
            //     $scope.editing = true;
            //
            //     if ($scope.type === 'email') {
            //         $scope.ngModel = '';
            //         $scope.emailConfirm = '';
            //     }
            //
            //     if ($scope.type === 'password') {
            //         $scope.ngModel = '';
            //         $scope.newPassword = '';
            //         $scope.newPasswordConfirm = '';
            //     }
            // };
            //
            // $scope.onCancelPress = function() {
            //     $scope.editing = false;
            //     $scope.ngModel = oldValue;
            //     _disableAllErrorStates();
            // };
            //
            // $scope.onSavePress = function() {
            //     var isValid = true;
            //
            //     $scope.formHasErrors = false;
            //
            //     if ($scope.type === 'email') {
            //         isValid = _isEmailValid();
            //     }
            //
            //     if ($scope.type === 'password') {
            //         isValid = _isPasswordValid();
            //     }
            //
            //     if ($scope.type === 'phone') {
            //         isValid = _isPhoneNumberValid();
            //     }
            //
            //     if ($scope.type === 'birthdate' && $scope.birthdate) {
            //         $scope.ngModel = $scope.birthdate;
            //     }
            //
            //     if ($scope.type === 'gender' && $scope.gender) {
            //         $scope.ngModel = $scope.gender.value;
            //     }
            //
            //     if (isValid) {
            //         $timeout(function() {
            //             $scope.editing = false;
            //             $scope.onSave();
            //         });
            //     } else {
            //         $scope.formHasErrors = true;
            //     }
            // };
            //
            // $rootScope.$on('account.edit', function() {
            //     if ($scope.editing) {
            //         $scope.onCancelPress();
            //     }
            // });
            //
            // $scope.$watch('ngModel', function() {
            //     if ($scope.type === 'birthdate' && ($scope.ngModel instanceof Date)) {
            //         $scope.birthdateLabel = moment($scope.ngModel).format('M/D/YY')
            //     }
            //
            //     if ($scope.type === 'gender' && (typeof $scope.ngModel === 'string')) {
            //         $scope.gender = $scope.genders.filter(function(availableGender) {
            //             return availableGender.value === $scope.ngModel.toLowerCase();
            //         })[0];
            //     }
            // });
        }
    ];

    angular
        .module('turnon')
        .controller('AccountOverviewInputController', AccountOverviewInputController);
}());

(function() {

    var AccountOverviewController = [
        '$scope',
        '$rootScope',
        'userService',
        function($scope, $rootScope, userService) {
        // 
        //     $rootScope.pageTitle = 'Your Account Overview - turnon';
        //
        //     userService.getLoggedInUser()
        //         .then(
        //             function onSuccess(data) {
        //                 $scope.loggedInUser = data;
        //                 $scope.form = {
        //                     firstName: data.firstName,
        //                     lastName: data.lastName,
        //                     email: data.email,
        //                     password: '*********',
        //                     gender: (data.gender) ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : undefined,
        //                     phone: data.phone,
        //                     birthdate: (data.birthdate) ? new Date(parseFloat(data.birthdate) * 1000) : undefined
        //                 };
        //             }
        //         );
        //
        //     $scope.onSaveField = function() {
        //         userService.updateUser({
        //             firstName: $scope.form.firstName,
        //             lastName: $scope.form.lastName,
        //             birthdate: ($scope.form.birthdate instanceof Date) ? ($scope.form.birthdate.getTime() / 1000) : null,
        //             gender: ($scope.form.gender) ? $scope.form.gender.toLowerCase() : null,
        //             phone: ($scope.form.phone) ? $scope.form.phone.replace(/[^0-9]/g, '') : null
        //         });
        //     }
        // }
    ];

    angular
        .module('turnon')
        .controller('AccountOverviewController', AccountOverviewController);
}());

(function() {

    // var overview = function() {
    //     return {
    //         restrict: 'AE',
    //         templateUrl: 'ui/account/overview/view.overview.html',
    //         controller: 'AccountOverviewController'
    //     }
    // };

    // var overviewInput = function() {
    //     return {
    //         restrict: 'AE',
    //         replace: true,
    //         templateUrl: 'ui/account/overview/view.overview-input.html',
    //         controller: 'AccountOverviewInputController',
    //         transclude: {
    //             inputLabel: 'inputLabel'
    //         },
    //         scope: {
    //             ngModel: '=',
    //             onSave: '=',
    //             type: '@'
    //         }
    //     }
    // };

    angular.module('turnon')
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
            // 
            // $rootScope.pageTitle = 'Your Rewards - turnon';
            //
            // $scope.active = 0;
            // $scope.pointsEnabled = clixConfig.pointsEnabled;
            // $scope.ready = true;
            //
            // $scope.onRedeemRewardsPress = function(type) {
            //     var modalInstance = $uibModal.open({
            //         animation: true,
            //         templateUrl: 'ui/common/modal/rewards/view.redeem-rewards.html',
            //         controller: 'RedeemRewardsController',
            //         windowClass: 'clix-modal-window',
            //         size: 'clix-lg',
            //         resolve: {
            //             type: function() {
            //                 return type;
            //             }
            //         }
            //     });
            //
            //     modalInstance.opened.then(
            //         function onSuccess() {
            //             $rootScope.$broadcast('modal.open');
            //         }
            //     );
            //
            //     modalInstance.closed.then(
            //         function onSuccess() {
            //             $rootScope.$broadcast('modal.close');
            //         }
            //     );
            //
            //     modalInstance.result.then(
            //         function onSuccess(data) {
            //
            //         },
            //         function onError(error) {
            //
            //         }
            //     )
            // };
            //
            // $scope.onRedeemPress = function() {
            //     $scope.active = 2;
            // };

        }
    ];

    angular
        .module('turnon')
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

    angular.module('turnon')
        .directive('clixAccountRewards', rewards);
}());

(function() {

    var AccountSavedOffersController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {
            // 
            // $rootScope.pageTitle = 'Your Saved Offers - turnon';
            //
            // $scope.menuItems = [
            //     {
            //         label: 'Save Offer',
            //         icon: 'icon-redeem-plus-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // $scope.filterSavedOffersOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Home & Auto'
            //     },
            //     {
            //         label: 'Baby, Kids & Toys'
            //     },
            //     {
            //         label: 'Electronics'
            //     },
            //     {
            //         label: 'Grocery, HouseHold & Pets'
            //     },
            //     {
            //         label: 'Health & Beauty'
            //     },
            //     {
            //         label: 'Jewelry & Watches'
            //     },
            //     {
            //         label: 'Men\'s Fashion'
            //     },
            //     {
            //         label: 'Sports & Outdoors'
            //     },
            //     {
            //         label: 'Women\'s Fashion'
            //     }
            // ];
            // $scope.sortSavedOffersOptions = [
            //     {
            //         label: 'Expiring Soon'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $rootScope.$on('favorite.removed', function(event, data) {
            //     if (!$scope.offers || !$scope.offers.offers) {
            //         $scope.offers = {
            //             offers: []
            //         }
            //     }
            //     $scope.offers.offers = $scope.offers.offers.filter(function(item) {
            //         return item.id !== data.id;
            //     });
            // });
            //
            // userService.getSavedOffers()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.offers = data;
            //             $scope.ready = true;
            //         }
            //     )

        }
    ];

    angular
        .module('turnon')
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

    angular.module('turnon')
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

            // $rootScope.pageTitle = 'Your Account Settings - turnon';
            // $scope.notificationEnabled = clixConfig.notificationEnabled;
            //
            // if (!clixConfig.notificationEnabled) {
            //     educationModalService.showNotificationsComingSoonModal();
            // }
            //
            // $scope.ready = false;
            //
            // var userSaving = false;
            //
            // function _saveUser() {
            //     if (userSaving) {
            //         return;
            //     }
            //     userSaving = true;
            //     userService.updateUser($scope.loggedInUser)
            //         .finally(
            //             function onFinally() {
            //                 userSaving = false;
            //             }
            //         )
            // }
            //
            // $q.all(
            //         [
            //             userService.getLoggedInUser(),
            //             userService.getAccountSettings()
            //         ]
            //     )
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data[0];
            //             $scope.settings = data[1];
            //             $scope.generalSettings = data[1].settings.filter(function(setting) {
            //                 return setting.type === 'general';
            //             });
            //             $scope.accountSettings = data[1].settings.filter(function(setting) {
            //                 return setting.type === 'myClix';
            //             });
            //             $scope.enableEmailNotifications = ($scope.loggedInUser.enableEmailNotifications !== false);
            //             $scope.enableTextNotifications = ($scope.loggedInUser.enableTextNotifications !== false);
            //             $scope.enablePushNotifications = ($scope.loggedInUser.enablePushNotifications !== false);
            //             $scope.ready = true;
            //         }
            //     );
            //
            // $scope.$watch('enableEmailNotifications', function(newValue) {
            //     if ($scope.loggedInUser.enableEmailNotifications !== newValue) {
            //         $scope.loggedInUser.enableEmailNotifications = newValue;
            //         _saveUser();
            //     }
            // });
            //
            // $scope.$watch('enableTextNotifications', function(newValue) {
            //     if ($scope.loggedInUser.enableTextNotifications !== newValue) {
            //         $scope.loggedInUser.enableTextNotifications = newValue;
            //         _saveUser();
            //     }
            // });
            //
            // $scope.$watch('enablePushNotifications', function(newValue) {
            //     if ($scope.loggedInUser.enablePushNotifications !== newValue) {
            //         $scope.loggedInUser.enablePushNotifications = newValue;
            //         _saveUser();
            //     }
            // });
            //
            // $scope.onSaveField = function() {
            //     _saveUser();
            // };
            //
            // $scope.settingChange = function(setting) {
            //     if (setting.enabled) {
            //         userService.enableAccountSetting(setting.id);
            //     } else {
            //         userService.disableAccountSetting(setting.id);
            //     }
            // };
        }
    ];

    angular
        .module('turnon')
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

    angular.module('turnon')
        .directive('clixAccountSettings', settings);
}());

(function() {

    var AccountWatchlistController = [
        '$scope',
        '$rootScope',
        'userService',
        'clixConfig',
        function($scope, $rootScope, userService, clixConfig) {

            // $rootScope.pageTitle = 'Your Watchlist - turnon';
            //
            // $scope.filtersEnabled = clixConfig.filtersEnabled;
            //
            // $scope.filterOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Home & Auto'
            //     },
            //     {
            //         label: 'Baby, Kids & Toys'
            //     },
            //     {
            //         label: 'Electronics'
            //     },
            //     {
            //         label: 'Grocery, HouseHold & Pets'
            //     },
            //     {
            //         label: 'Health & Beauty'
            //     },
            //     {
            //         label: 'Jewelry & Watches'
            //     },
            //     {
            //         label: 'Men\'s Fashion'
            //     },
            //     {
            //         label: 'Sports & Outdoors'
            //     },
            //     {
            //         label: 'Women\'s Fashion'
            //     }
            // ];
            //
            // $scope.sortOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $rootScope.$on('favorite.removed', function(event, data) {
            //     if (!$scope.watchlist || !$scope.watchlist.videos) {
            //         $scope.watchlist = {
            //             videos: []
            //         }
            //     }
            //     $scope.watchlist.videos = $scope.watchlist.videos.filter(function(item) {
            //         return item.id !== data.id;
            //     });
            // });
            //
            // userService.getWatchlist()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.watchlist = data;
            //             $scope.ready = true;
            //         }
            //     )
        }
    ];

    angular
        .module('turnon')
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

    angular.module('turnon')
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

            // $scope.filtersEnabled = clixConfig.filtersEnabled;
            // $scope.pointsEnabled = clixConfig.pointsEnabled;
            //
            // $scope.onOfferPress = function(offer) {
            //     if ($stateParams.offerSlug === $filter('slug')(offer.title)) {
            //         _showOfferModal();
            //     }
            // };
            //
            // function _showOfferModal() {
            //     if ($scope.loggedInUser) {
            //         modalService.showModal({
            //             controller: 'OfferModalController',
            //             templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
            //             data: {
            //                 offerSlug: $stateParams.offerSlug
            //             }
            //         });
            //     } else {
            //         modalService.showModal({
            //             templateUrl: 'ui/common/modal/education/view.education-modal.html',
            //             controller: 'EducationModalController',
            //             data: {
            //                 type: 'signup-offer',
            //                 slug: $stateParams.offerSlug
            //             }
            //         });
            //     }
            // }
            //
            // function _resetIsFavorite() {
            //     if ($scope.brand) {
            //         $scope.isFavorite = userService.isFavoriteBrand($scope.brand.id);
            //     }
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     $scope.loggedInUser = undefined;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('favorite.added', _resetIsFavorite);
            // $rootScope.$on('favorite.removed', _resetIsFavorite);
            //
            // $rootScope.$on('video.complete', function() {
            //     knetikService.viewCampaignVideo($scope.brand.id);
            // });
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data;
            //             _resetIsFavorite();
            //             if ($stateParams.offerSlug) {
            //                 _showOfferModal();
            //             }
            //         }
            //     );
            //
            // $scope.onFavoritePress = function() {
            //     if ($scope.isFavorite) {
            //         userService.removeFavoriteBrand($scope.brand.id);
            //     } else {
            //         userService.addFavoriteBrand($scope.brand.id);
            //     }
            // };
            //
            // $scope.seriesList = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.offerMenuItems = [
            //     {
            //         label: 'Save Offer',
            //         icon: 'icon-redeem-plus-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // $scope.onTabSelect = function(tab) {
            //
            //     switch(tab) {
            //
            //         case 'offers':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'offer',
            //                 source_cm: 'media',
            //                 source_type: 'campaign',
            //                 source_id: $scope.brand.id
            //             });
            //             break;
            //
            //         case 'stars':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'person',
            //                 source_cm: 'media',
            //                 source_type: 'campaign',
            //                 source_id: $scope.brand.id
            //             });
            //             break;
            //
            //         case 'videos':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'episode',
            //                 source_cm: 'media',
            //                 source_type: 'campaign',
            //                 source_id: $scope.brand.id
            //             });
            //             break;
            //     }
            // };
            //
            // brandsService.getBrandBySlug($stateParams.slug)
            //     .then(
            //         function onSuccess(data) {
            //
            //             $scope.brand = data;
            //             $scope.active = 0;
            //
            //             // Don't overwrite the title if we're showing an offer
            //             if (!$stateParams.offerSlug) {
            //                 $rootScope.pageTitle = $scope.brand.title + ' - turnon';
            //             }
            //
            //             $scope.video = {
            //                 streamUrl: data.trailer,
            //                 thumbnail: data.trailerThumbnail
            //             };
            //             $scope.configs = {
            //                 title: data.title,
            //                 description: data.description,
            //                 backgroundImage: data.headerImage,
            //                 backgroundImage2x: data.headerImage,
            //                 backgroundImage3x: data.headerImage,
            //                 logo: data.logo
            //             };
            //
            //             catchMediaService.trackAppEvent('navigation_item', {
            //                 target_cm: 'media',
            //                 target_type: 'campaign',
            //                 target_id: $scope.brand.id
            //             });
            //         }
            //     )
            //     .catch(
            //         function onError(error) {
            //             $log.error(error);
            //             $state.go('404');
            //         }
            //     );
        }
    ];

    angular
        .module('turnon')
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

            // $rootScope.pageTitle = 'Brands - turnon';
            // $scope.activeTab = 'brands';
            //
            // var offersLoading = false,
            //     canLoadMoreOffers = true,
            //     offerPage = 0,
            //     OFFER_LIMIT = 24,
            //     brandsLoading = false,
            //     canLoadMoreBrands = true,
            //     brandPage = 0,
            //     BRAND_LIMIT = 24;
            //
            // var defaultFilterOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Home & Auto'
            //     },
            //     {
            //         label: 'Baby, Kids & Toys'
            //     },
            //     {
            //         label: 'Electronics'
            //     },
            //     {
            //         label: 'Grocery, HouseHold & Pets'
            //     },
            //     {
            //         label: 'Health & Beauty'
            //     },
            //     {
            //         label: 'Jewelry & Watches'
            //     },
            //     {
            //         label: 'Men\'s Fashion'
            //     },
            //     {
            //         label: 'Sports & Outdoors'
            //     },
            //     {
            //         label: 'Women\'s Fashion'
            //     }
            // ];
            //
            // $scope.offerMenuItems = [
            //     {
            //         label: 'Save Offer',
            //         icon: 'icon-redeem-plus-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // $scope.brandMenuItems = [
            //     {
            //         label: 'Share',
            //         points: '50',
            //         icon: 'icon-share-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // $scope.filterBrandsOptions = defaultFilterOptions;
            // $scope.filterOffersOptions = defaultFilterOptions;
            //
            // $scope.sortBrandsOptions = [
            //     {
            //         label: 'A-Z'
            //     },
            //     {
            //         label: 'Recently Added'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.sortOffersOptions = [
            //     {
            //         label: 'Recently Added'
            //     },
            //     {
            //         label: 'Expiring Soon'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.onTabSelect = function(tab) {
            //     $scope.activeTab = tab;
            //     switch (tab) {
            //         case 'offers':
            //             if (!$scope.offers) {
            //                 _loadOffers();
            //             }
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'offer'
            //             });
            //             break;
            //     }
            // };
            //
            // $scope.loadMoreOffers = function() {
            //     _loadOffers();
            // };
            //
            // $scope.loadMoreBrands = function() {
            //     _loadBrands();
            // };
            //
            // function _loadOffers() {
            //     if (offersLoading || $scope.activeTab !== 'offers' || !canLoadMoreOffers) {
            //         return;
            //     }
            //     offersLoading = true;
            //     return brandsService.getAllOffers(offerPage, OFFER_LIMIT)
            //         .then(
            //             function onSuccess(data) {
            //                 if ($scope.offers) {
            //                     $scope.offers.offers = $scope.offers.offers.concat(data.offers);
            //                 } else {
            //                     $scope.offers = data;
            //                 }
            //                 offersLoading = false;
            //                 offerPage += 1;
            //                 if (!data.offers || !data.offers || data.offers.length === 0) {
            //                     canLoadMoreOffers = false;
            //                 }
            //             }
            //         );
            // }
            //
            // function _loadBrands() {
            //     if (brandsLoading || $scope.activeTab !== 'brands' || !canLoadMoreBrands) {
            //         return;
            //     }
            //     brandsLoading = true;
            //     $scope.active = 0;
            //     return brandsService.getAllBrands(brandPage, BRAND_LIMIT)
            //         .then(
            //             function onSuccess(data) {
            //                 $scope.ready = true;
            //                 if ($scope.brands) {
            //                     $scope.brands.brands = $scope.brands.brands.concat(data.brands);
            //                 } else {
            //                     $scope.brands = data;
            //                 }
            //                 brandsLoading = false;
            //                 brandPage += 1;
            //                 if (!data.brands || !data.brands || data.brands.length === 0) {
            //                     canLoadMoreBrands = false;
            //                 }
            //             }
            //         );
            // }
            //
            // _loadBrands();
            //
            // catchMediaService.trackAppEvent('navigation', {
            //     target_cm: 'media',
            //     target_type: 'campaign'
            // });

        }
    ];

    angular
        .module('turnon')
        .controller('BrandsController', BrandsController);
}());

(function() {

    var CategoriesController = [
        '$q',
        '$scope',
        '$rootScope',
        'categoryService',
        'catchMediaService',
        function($q, $scope, $rootScope, categoryService, catchMediaService) {

            // $rootScope.pageTitle = 'Categories - turnon';
            //
            // $scope.filterOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Home & Auto'
            //     },
            //     {
            //         label: 'Baby, Kids & Toys'
            //     },
            //     {
            //         label: 'Electronics'
            //     }
            // ];
            //
            // $scope.sortOptions = [
            //     {
            //         label: 'Expiring Soon'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.menuItems = [
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Go to Stars',
            //         icon: 'icon-stars-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // categoryService.getAllCategories(true)
            //     .then(
            //         function onSuccess(data) {
            //             var categories = data;
            //             categories.categories = categories.categories.filter(function(category) {
            //                 return category.totalVideos && category.totalVideos !== 0;
            //             });
            //
            //             $scope.categories = categories;
            //         }
            //     );
            //
            // catchMediaService.trackAppEvent('navigation', {
            //     target_cm: 'entity',
            //     target_type: 'category'
            // });
        }
    ];

    angular
        .module('turnon')
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
            //
            // function _resetIsFavorite() {
            //     if ($scope.category) {
            //         $scope.isFavorite = userService.isFavoriteCategory($scope.category.id);
            //     }
            // }
            //
            // $scope.notify = false;
            // $scope.filtersEnabled = clixConfig.filtersEnabled;
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     delete $scope.loggedInUser;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('favorite.added', _resetIsFavorite);
            // $rootScope.$on('favorite.removed', _resetIsFavorite);
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data;
            //             _resetIsFavorite();
            //         }
            //     );
            //
            // $scope.onFavoritePress = function() {
            //     if ($scope.isFavorite) {
            //         userService.removeFavoriteCategory($scope.category.id);
            //     } else {
            //         userService.addFavoriteCategory($scope.category.id);
            //
            //         catchMediaService.trackAppEvent('favorite', {
            //             target_cm: 'entity',
            //             target_type: 'category',
            //             target_name: $scope.category.title
            //         });
            //     }
            // };
            //
            // $scope.filterOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Athletes'
            //     },
            //     {
            //         label: 'Influencers'
            //     },
            //     {
            //         label: 'Movie Stars'
            //     },
            //     {
            //         label: 'Musicians'
            //     },
            //     {
            //         label: 'TV Stars'
            //     }
            // ];
            //
            // $scope.sortOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Recently Added'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.onSignupPress = function() {
            //     modalService.showSignUpModal();
            // };
            //
            // $scope.onLoginPress = function() {
            //     modalService.showLogInModal();
            // };
            //
            // $q.all(
            //         [
            //             categoryService.getCategoryBySlug($stateParams.slug),
            //             categoryService.getAllCategories()
            //         ]
            //     )
            //     .then(
            //         function onSuccess(data) {
            //             $scope.category = data[0];
            //             $scope.categories = data[1];
            //
            //             $rootScope.pageTitle = $scope.category.title + ' Videos - turnon';
            //
            //             catchMediaService.trackAppEvent('navigation_item', {
            //                 target_cm: 'entity',
            //                 target_type: 'category',
            //                 target_name: $scope.category.title
            //             });
            //         }
            //     )
            //     .catch(
            //         function onError(error) {
            //             $log.error(error);
            //             $state.go('404');
            //         }
            //     );
        }
    ];

    angular
        .module('turnon')
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

            // $scope.left = 0;
            //
            // if ($scope.viewAllSref) {
            //     $scope.sref = $scope.viewAllSref;
            // } else if ($scope.category) {
            //     $scope.sref = 'category({ slug: \'{{' + $scope.category.title + ' | slug}}\' })';
            // } else {
            //     $scope.sref = 'home';
            // }
            //
            // function _resetArrowStates() {
            //     var minWidth = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
            //     $scope.leftArrowVisible = $scope.left <= minWidth;
            //     $scope.rightArrowVisible = $scope.left >= 0;
            // }
            //
            // function _recalculateWidth() {
            //
            //     var splitWidth = 2;
            //
            //     if ($window.innerWidth > 480) {
            //         splitWidth = 3.7;
            //     }
            //
            //     if ($window.innerWidth > 992) {
            //         splitWidth = 3.7;
            //     }
            //
            //     if ($window.innerWidth > 1200) {
            //         splitWidth = 5.7;
            //     }
            //
            //     $scope.videoContainerWidth = ($window.innerWidth - VIDEO_MARGIN_LEFT) / splitWidth;
            //     $scope.arrowScrollWidth = $scope.videoContainerWidth + VIDEO_MARGIN_LEFT;
            //
            //     $timeout(function() {
            //         $scope.$apply();
            //         $rootScope.$broadcast('thumbnail.resize');
            //     });
            // }
            //
            // $scope.onPrevious = function() {
            //     var left = $scope.left + $window.innerWidth;
            //     if (left >= 0) {
            //         left = 0;
            //     }
            //     $scope.left = left;
            //     _resetArrowStates();
            // };
            //
            // $scope.onNext = function() {
            //     var left = $scope.left - $window.innerWidth,
            //         minLeft = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
            //     if (left < minLeft) {
            //         left = minLeft;
            //     }
            //     $scope.left = left;
            //     _resetArrowStates();
            // };
            //
            // $scope.$watch('categoryVideos', function() {
            //     if (!$scope.categoryVideos) {
            //         return;
            //     }
            //     $scope.rightArrowVisible = ($scope.videoContainerWidth + VIDEO_MARGIN_LEFT) * $scope.categoryVideos.length > $window.innerWidth;
            // });
            //
            // $scope.carouselConfig = {
            //     event: {
            //         afterChange: function (event, slick, currentSlide, nextSlide) {
            //             $scope.leftArrowVisible = currentSlide !== 0;
            //             angular.element(window).trigger("checkInView");
            //             // $scope.rightArrowVisible = (currentSlide );
            //             // console.log('slick afterChange', 'currentSlide:', currentSlide, 'nextSlide:', nextSlide);
            //         }
            //     }
            // };
            //
            // angular.element($window).on('resize.doResize', function () {
            //     _recalculateWidth();
            // });
            //
            // _recalculateWidth();
            // _resetArrowStates();
        }
    ];

    angular
        .module('turnon')
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

    angular.module('turnon')
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
            // 
            // $rootScope.pageTitle = 'Charities - turnon';
            //
            // var defaultFilterOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Animals'
            //     },
            //     {
            //         label: 'Arts & Culture'
            //     },
            //     {
            //         label: 'Education'
            //     },
            //     {
            //         label: 'Environmental'
            //     },
            //     {
            //         label: 'International non-gov'
            //     },
            //     {
            //         label: 'Health'
            //     }
            // ];
            //
            // var defaultSortOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.filterCharitiesOptions = defaultFilterOptions;
            // $scope.sortCharitiesOptions = defaultSortOptions;
            //
            // $scope.menuItems = [
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // brandsService.getAllCharities()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.charities = data;
            //         }
            //     );
            //
            // catchMediaService.trackAppEvent('navigation', {
            //     target_cm: 'media',
            //     target_type: 'organization'
            // });
        }
    ];

    angular
        .module('turnon')
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

            // $scope.filtersEnabled = clixConfig.filtersEnabled;
            //
            // function _resetIsFavorite() {
            //     if ($scope.charity) {
            //         $scope.isFavorite = userService.isFavoriteCharity($scope.charity.id);
            //     }
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     delete $scope.loggedInUser;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('favorite.added', _resetIsFavorite);
            // $rootScope.$on('favorite.removed', _resetIsFavorite);
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data;
            //             _resetIsFavorite();
            //         }
            //     );
            //
            // $scope.onFavoritePress = function() {
            //     if ($scope.isFavorite) {
            //         userService.removeFavoriteCharity($scope.charity.id);
            //     } else {
            //         userService.addFavoriteCharity($scope.charity.id);
            //     }
            // };
            //
            // $scope.seriesList = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // brandsService.getCharityBySlug($stateParams.slug)
            //     .then(
            //         function onSuccess(data) {
            //
            //             if (!data || !data.id) {
            //                 throw new Error('Invalid data returned');
            //             }
            //
            //             $scope.charity = data;
            //
            //
            //             var eventParams = {
            //                 target_cm: 'media',
            //                 target_type: 'organization',
            //                 target_id: $scope.charity.id
            //             };
            //
            //             if ($stateParams.starId) {
            //                 eventParams.source_cm = 'media';
            //                 eventParams.source_type = 'person';
            //                 eventParams.source_id = $stateParams.starId;
            //             }
            //
            //             catchMediaService.trackAppEvent('navigation_item', eventParams);
            //
            //             $filter('orderBy')($scope.charity.videos.videos, ['episodeNumber']);
            //
            //             $scope.active = 0;
            //
            //             $rootScope.pageTitle = $scope.charity.title + ' - turnon';
            //
            //             $scope.video = {
            //                 streamUrl: data.trailer,
            //                 thumbnail: data.trailerThumbnail
            //             };
            //         }
            //     )
            //     .catch(
            //         function onError(error) {
            //             $log.error(error);
            //             $state.go('404');
            //         }
            //     );
            //
            // $scope.onTabSelect = function(tab) {
            //
            //     switch (tab) {
            //
            //         case 'stars':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'person',
            //                 source_cm: 'media',
            //                 source_type: 'organization',
            //                 source_id: $scope.charity.id
            //             });
            //             break;
            //
            //         case 'videos':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'episode',
            //                 source_cm: 'media',
            //                 source_type: 'organization',
            //                 source_id: $scope.charity.id
            //             });
            //             break;
            //     }
            // };
            //
            // $scope.onDonatePress = function() {
            //     var modalInstance = $uibModal.open({
            //         animation: true,
            //         templateUrl: 'ui/common/modal/donate/view.donate.html',
            //         controller: 'DonateController',
            //         windowClass: 'clix-modal-window',
            //         size: 'clix-lg'
            //     });
            //
            //     modalInstance.opened.then(
            //         function onSuccess() {
            //             $rootScope.$broadcast('modal.open');
            //         }
            //     );
            //
            //     modalInstance.closed.then(
            //         function onSuccess() {
            //             $rootScope.$broadcast('modal.close');
            //         }
            //     );
            //
            //     modalInstance.result.then(
            //         function onSuccess(data) {
            //
            //         },
            //         function onError(error) {
            //
            //         }
            //     )
            // }

        }
    ];

    angular
        .module('turnon')
        .controller('CharityController', CharityController);
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
            //
            // $scope.helpTypes = [
            //     {
            //         label: 'Investor Relations',
            //         data: 'investor-relations'
            //     },
            //     {
            //         label: 'Advertisers',
            //         data: 'advertisers'
            //     },
            //     {
            //         label: 'Jobs',
            //         data: 'jobs'
            //     },
            //     {
            //         label: 'Press',
            //         data: 'press'
            //     },
            //     {
            //         label: 'News',
            //         data: 'news'
            //     },
            //     {
            //         label: 'Affiliates',
            //         data: 'affiliates'
            //     },
            //     {
            //         label: 'Rewards',
            //         data: 'rewards'
            //     },
            //     {
            //         label: 'Help',
            //         data: 'help'
            //     }
            // ];
            //
            // $scope.form = {
            //     name: '',
            //     email: '',
            //     subject: '',
            //     description: ''
            // };
            //
            // $scope.onSubmit = function() {
            //     var error = false,
            //         helpType = ($scope.selectedHelpType) ? $scope.selectedHelpType.data : '';
            //     _resetErrorStates();
            //     if (!$scope.form.name) {
            //         $scope.showNameError = true;
            //         error = true;
            //     }
            //
            //     if (!$scope.form.email) {
            //         $scope.showEmailError = true;
            //         error = true;
            //     }
            //
            //     if (!$scope.form.subject) {
            //         $scope.showSubjectError = true;
            //         error = true;
            //     }
            //
            //     if (!$scope.form.description) {
            //         $scope.showDescriptionError = true;
            //         error = true;
            //     }
            //
            //     if (error) {
            //         return;
            //     }
            //
            //     notificationsService.sendContactNotification(helpType || 'help', $scope.form.name, $scope.form.email, $scope.form.subject, $scope.form.description)
            //         .then(
            //             function onSuccess(data) {
            //                 if (!data || !data.success) {
            //                     throw new Error('Invalid response from API');
            //                 }
            //                 modalService.showAlertModal('Success', 'Your message has been sent.<br />We will respond back as soon as we can!');
            //                 $scope.form.subject = '';
            //                 $scope.form.description = '';
            //             }
            //         )
            //         .catch(
            //             function onError(error) {
            //                 $log.error(error);
            //                 modalService.showAlertModal('Error', 'There was an error sending your message.<br />Please try again later.');
            //             }
            //         )
            // };
            //
            // if ($stateParams.section) {
            //     var selected = $scope.helpTypes.filter(function(type) {
            //         return type.data === $stateParams.section;
            //     })[0];
            //     if (selected) {
            //         $scope.selectedHelpType = selected;
            //     }
            // }
            //
            // function _resetErrorStates() {
            //     $scope.showNameError = false;
            //     $scope.showEmailError = false;
            //     $scope.showSubjectError = false;
            //     $scope.showDescriptionError = false;
            // }
            //
            // function _setDefaultInfo(user) {
            //     if (!user) {
            //         return;
            //     }
            //     if (!$scope.form.name) {
            //         $scope.form.name = user.firstName + ' ' + user.lastName;
            //     }
            //     if (!$scope.form.email) {
            //         $scope.form.email = user.email;
            //     }
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     _setDefaultInfo(data);
            // });
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             _setDefaultInfo(data);
            //         }
            //     );
        }
    ];

    angular
        .module('turnon')
        .controller('ContactPageController', ContactPageController);
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
        .module('turnon')
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

    angular.module('turnon')
        .directive('clixFooter', footer);
}());
(function() {

    var HeaderSearchIconController = [
        '$scope',
        '$window',
        '$timeout',
        'searchService',
        function($scope, $window, $timeout, searchService) {

            // var searchTimeout;
            //
            // $scope.term = '';
            //
            // $scope.searchVisible = false;
            //
            // function _hideSearchResults() {
            //     $scope.loading = false;
            //     $scope.results = undefined;
            // }
            //
            // function _performSearch() {
            //     $scope.loading = true;
            //     $scope.results = undefined;
            //
            //     if (searchTimeout) {
            //         $timeout.cancel(searchTimeout);
            //     }
            //
            //     searchTimeout = $timeout(function() {
            //         searchService.getSearchResults($scope.term, 0, 10)
            //             .then(
            //                 function onSuccess(data) {
            //                     $scope.results = data;
            //                 }
            //             )
            //             .finally(
            //                 function onFinally() {
            //                     $scope.loading = false;
            //                 }
            //             )
            //     }, 250);
            // }
            //
            // $scope.onTermChange = function() {
            //     $scope.searchVisible = true;
            //     if ($scope.term.length < 2) {
            //         return _hideSearchResults();
            //     }
            //     _performSearch();
            // };
            //
            // $scope.bodyClicked = function(event) {
            //     if (angular.element(event.target).hasClass('search-input-field')) {
            //         return;
            //     }
            //     $scope.term = '';
            //     $scope.searchVisible = false;
            //     _hideSearchResults();
            //     $timeout(function() {
            //         $scope.$apply();
            //     });
            // };
            //
            // $scope.onSearchIconPress = function() {
            //     $scope.searchVisible = !$scope.searchVisible;
            //     if ($scope.searchVisible) {
            //         $timeout(function() {
            //             $window.document.getElementById('search-input-field').focus();
            //         });
            //     }
            // };
        }
    ];

    angular
        .module('turnon')
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

            // var latestOffset = 0;
            //
            // $scope.isBeta = (clixConfig.beta === true);
            //
            // function _populateHeaderData() {
            //     $q.all(
            //             [
            //                 notificationsService.getNotifications(),
            //                 knetikService.getPoints()
            //             ]
            //         )
            //         .then(
            //             function onSuccess(data) {
            //                 var points = data[1];
            //                 $scope.notifications = data[0];
            //                 if (points && !isNaN(points.balance)) {
            //                     $scope.points = parseInt(points.balance);
            //                 } else {
            //                     $scope.points = 0;
            //                 }
            //             }
            //         );
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _populateHeaderData();
            // });
            //
            // $rootScope.$on('user.update', function(event, data) {
            //     $scope.loggedInUser = data;
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     delete $scope.loggedInUser;
            // });
            //
            // $scope.onArrowPress = function() {
            //     $rootScope.$broadcast('rightnav.open');
            // };
            //
            // $scope.onNamePress = function() {
            //     if ($scope.notifications.notifications.length === 0) {
            //         return;
            //     }
            //     $scope.tooltipsShown = !$scope.tooltipsShown;
            // };
            //
            // $scope.hideNotificationMenu = function(event) {
            //     $scope.tooltipsShown = false;
            // };
            //
            // $scope.onLoginSignupPress = function(signup) {
            //     if (signup) {
            //         modalService.showSignUpModal();
            //     } else {
            //         modalService.showLogInModal();
            //     }
            // };
            //
            // angular.element($window).on('scroll', function() {
            //     var direction;
            //     if (latestOffset > this.pageYOffset) {
            //         direction = 'down';
            //     } else if (latestOffset < this.pageYOffset && this.pageYOffset > 250) {
            //         direction = 'up';
            //     }
            //     latestOffset = this.pageYOffset;
            //     if ($scope.scrollDirection !== direction) {
            //         $scope.scrollDirection = direction;
            //         $timeout(function() {
            //             $scope.$apply();
            //         });
            //     }
            // });
            //
            // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            //     if (toState) {
            //         $scope.selectedStateName = toState.name;
            //     }
            // });
        }
    ];

    angular
        .module('turnon')
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

    angular.module('turnon')
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

            // var moreToLoad = true;
            //
            // $rootScope.pageTitle = 'turnon - Your Stars. Their Passions.';
            //
            // $scope.PAGE_LIMIT = 2;
            // $scope.currentPage = 0;
            //
            // $scope.showMobileCarousel = false;
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     $scope.loggedInUser = undefined;
            // });
            //
            // $scope.onSignupPress = function() {
            //     modalService.showSignUpModal();
            // };
            //
            // $scope.onLoadMore = function($inview) {
            //     if (!$scope.ready || !$inview) {
            //         return;
            //     }
            //     _loadCategories();
            // };
            //
            // function _recalculateHeight() {
            //     var carouselElement = angular.element(document.getElementById('carousel-container'));
            //
            //     if (!carouselElement) {
            //         return;
            //     }
            //     $scope.videoContainerHeight = carouselElement.innerHeight();
            //     // $timeout(function() {
            //     //     $scope.$apply();
            //     // });
            // }
            //
            // function _recalculateWidth() {
            //     $scope.showMobileCarousel = ($window.innerWidth < 768);
            //     _recalculateHeight();
            // }
            //
            // function _loadCategories() {
            //     if ($scope.loading || !moreToLoad) {
            //         return;
            //     }
            //     $scope.loading = true;
            //     categoryService.getAllCategories(false, $scope.currentPage, $scope.PAGE_LIMIT)
            //         .then(
            //             function onSuccess(data) {
            //                 if ($scope.categories) {
            //                     $scope.categories.categories = $scope.categories.categories.concat(data.categories);
            //                 } else {
            //                     $scope.categories = data;
            //                 }
            //                 if (!data || data.categories.length === 0) {
            //                     moreToLoad = false;
            //                 }
            //                 $scope.ready = true;
            //                 $scope.currentPage += 1;
            //                 $timeout(function() {
            //                     angular.element(window).trigger('resize.doResize');
            //                     $scope.loading = false;
            //                 });
            //             }
            //         );
            // }
            //
            //
            // angular.element($window).on('resize.doResize', function () {
            //     _recalculateWidth();
            // });
            // _loadCategories();
        }
    ];

    angular
        .module('turnon')
        .controller('HomeController', HomeController);
}());

(function() {
    var NotFoundController = [
        function() {

        }
    ];

    angular
        .module('turnon')
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


            // modalService.showModal({
            //     controller: 'OfferModalController',
            //     templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
            //     data: {
            //         offerId: $stateParams.id
            //     }
            // });
            //
            //
            // function _resetIsFavorite() {
            //     $scope.isFavorite = userService.isSavedOffer($stateParams.id);
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     delete $scope.loggedInUser;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('favorite.added', _resetIsFavorite);
            // $rootScope.$on('favorite.removed', _resetIsFavorite);
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data;
            //             _resetIsFavorite();
            //         }
            //     );
            //
            // $scope.onFavoritePress = function() {
            //     if ($scope.isFavorite) {
            //         userService.removeSavedOffer($stateParams.id);
            //     } else {
            //         userService.addSavedOffer($stateParams.id);
            //     }
            // };
            //
            // $scope.seriesList = [
            //     {
            //         label: 'Most Viewed'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // $scope.offerMenuItems = [
            //     {
            //         label: 'Save Offer',
            //         icon: 'icon-redeem-plus-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // offersService.getOfferById($stateParams.id)
            //     .then(
            //         function onSuccess(data) {
            //
            //             $scope.offer = data;
            //             $scope.active = 0;
            //
            //             $scope.configs = {
            //                 title: data.title,
            //                 description: data.description,
            //                 backgroundImage: data.headerImage,
            //                 logo: data.brand ? data.brand.transparentThumbnail : undefined
            //             };
            //         }
            //     );
            //
            // educationModalService.showOfferViewedModal($stateParams.id);
        }
    ];



    angular
        .module('turnon')
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
        .module('turnon')
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

            // function _resetIsFavorite() {
            //     if ($scope.celebrity) {
            //         $scope.isFavorite = userService.isFavoriteCelebrity($scope.celebrity.id);
            //     }
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     delete $scope.loggedInUser;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('favorite.added', _resetIsFavorite);
            // $rootScope.$on('favorite.removed', _resetIsFavorite);
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data;
            //             _resetIsFavorite();
            //         }
            //     );
            //
            // $scope.onFavoritePress = function() {
            //     if ($scope.isFavorite) {
            //         userService.removeFavoriteCelebrity($scope.celebrity.id);
            //     } else {
            //         userService.addFavoriteCelebrity($scope.celebrity.id);
            //     }
            // };
            //
            // $scope.onTabSelect = function(tab) {
            //
            //     switch (tab) {
            //
            //         case 'brands_offers':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'offer',
            //                 source_cm: 'media',
            //                 source_type: 'person',
            //                 source_id: $scope.celebrity.id
            //             });
            //             break;
            //
            //         case 'charity':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'organization',
            //                 source_cm: 'media',
            //                 source_type: 'person',
            //                 source_id: $scope.celebrity.id
            //             });
            //             break;
            //     }
            // };
            //
            // $scope.offerMenuItems = [
            //     {
            //         label: 'Save Offer',
            //         icon: 'icon-redeem-plus-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // $scope.charityMenuItems = [
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // $scope.brandMenuItems = [
            //     {
            //         label: 'Share',
            //         icon: 'icon-share-icon',
            //         points: '50',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     },
            //     {
            //         label: 'Add to Favorites',
            //         icon: 'icon-favorite-icon',
            //         onClick: function() {
            //             console.log('SHARE');
            //         }
            //     }
            // ];
            //
            // function _setEpisodeList() {
            //
            // }
            //
            // celebrityService.getCelebrityBySlug($stateParams.slug)
            //     .then(
            //         function onSuccess(data) {
            //
            //             if (!data || !data.id) {
            //                 throw new Error('No celebrity found');
            //             }
            //
            //             $scope.celebrity = data;
            //             $scope.active = 0;
            //
            //             $rootScope.pageTitle = $scope.celebrity.name + ' - turnon';
            //
            //             catchMediaService.trackAppEvent('navigation_item', {
            //                 target_cm: 'media',
            //                 target_type: 'person',
            //                 target_id: $scope.celebrity.id
            //             });
            //
            //             if (data.series && data.series.series) {
            //                 $scope.seriesList = data.series.series.map(function(series) {
            //                     if (!series.seasons) {
            //                         return {}
            //                     }
            //                     return {
            //                         label: series.title,
            //                         series: series,
            //                         totalEpisodes: (series.seasons.seasons[0]) ? series.seasons.seasons[0].episodes.length : 0,
            //                         onClick: function(option) {
            //                             $scope.selectedSeries = option;
            //                             _setEpisodeList();
            //                         }
            //                     }
            //                 });
            //
            //                 $scope.selectedSeries = $scope.seriesList[0];
            //                 _setEpisodeList();
            //             }
            //         }
            //     )
            //     .catch(
            //         function onError(error) {
            //             $log.error(error);
            //             $state.go('404');
            //         }
            //     );
            //
            // switch($stateParams.tab) {
            //     case 'brands':
            //         $scope.active = 1;
            //         break;
            //     case 'charities':
            //         $scope.active = 2;
            //         break;
            //     default:
            //         $scope.active = 0;
            //         break;
            // }
        }
    ];



    angular
        .module('turnon')
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
            //
            // $rootScope.pageTitle = 'Stars - turnon';
            //
            // $scope.filterOptions = [
            //     {
            //         label: 'All'
            //     },
            //     {
            //         label: 'Athletes'
            //     },
            //     {
            //         label: 'Influencers'
            //     },
            //     {
            //         label: 'Movie Stars'
            //     },
            //     {
            //         label: 'Musicians'
            //     },
            //     {
            //         label: 'TV Stars'
            //     }
            // ];
            //
            // $scope.sortOptions = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Recently Added'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // celebrityService.getAllCelebrities()
            //     .then(
            //         function onSuccess(data) {
            //             var stars = data;
            //             stars.celebrities = stars.celebrities.filter(function(star) {
            //                 return star.totalVideos && star.totalVideos > 0;
            //             });
            //             $scope.stars = stars;
            //         }
            //     );
            //
            // catchMediaService.trackAppEvent('navigation', {
            //     target_cm: 'media',
            //     target_type: 'person'
            // });

        }
    ];

    angular
        .module('turnon')
        .controller('StarsController', StarsController);
}());

(function() {
    var TermsConditionsController = [
        function() {

        }
    ];

    angular
        .module('turnon')
        .controller('TermsConditionsController', TermsConditionsController);
}());

(function() {

    angular
        .module('turnon')
        .factory('AccountSettingListModel', [
            'AccountSettingModel',
            function(AccountSettingModel) {
                return function(data) {
                    // if (!(data instanceof Array)) {
                    //     return [];
                    // }
                    // this.settings = data.map(function(setting) {
                    //     return new AccountSettingModel(setting);
                    // });
                }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('AccountSettingModel', [
            function() {
                // return function(data) {
                //     if (!data) {
                //         return;
                //     }
                //     this.id = data._id;
                //     this.type = data.type;
                //     this.enabled = data.enabled;
                //     this.description = data.description;
                //     this.title = data.title;
                //     this.order = data.order;
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('BrandListModel', [
            'BrandModel',
            function(BrandModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.brands = data.map(function(brand) {
                //         if (typeof brand === 'string') {
                //             return {
                //                 id: brand
                //             };
                //         }
                //         return new BrandModel(brand);
                //     });
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('BrandModel', [
            '$injector',
            'OfferListModel',
            'CelebrityListModel',
            '$filter',
            function($injector, OfferListModel, CelebrityListModel, $filter) {
                // return function(data) {
                //     if (!data) {
                //         return;
                //     }
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.description = data.description;
                //     this.celebrities = new CelebrityListModel(data.celebrities);
                //
                //     if (data.slug) {
                //         this.slug = data.slug;
                //     } else {
                //         this.slug = $filter('slug')(this.title);
                //     }
                //
                //     if (data.offers) {
                //         if (typeof data.offers === 'number') {
                //             this.totalOffers = data.offers;
                //         } else {
                //             this.offers = new OfferListModel(data.offers);
                //             this.totalOffers = this.offers.offers.length;
                //         }
                //     }
                //
                //     if (data.videos) {
                //         if (typeof data.videos === 'number') {
                //             this.totalVideos = data.videos;
                //         } else {
                //             var VideoListModel = $injector.get('VideoListModel');
                //             this.videos = new VideoListModel(data.videos);
                //             this.totalVideos = this.videos.videos.length;
                //         }
                //     }
                //
                //     if (data.content) {
                //         if (data.content.BrandTransparentLogo) {
                //             this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                //         }
                //
                //         if (data.content.BackgroundImage) {
                //             this.headerImage = data.content.BackgroundImage.downloadUrl;
                //         }
                //
                //         if (data.content.ProfilePicture) {
                //             this.logo = data.content.ProfilePicture.downloadUrl;
                //         }
                //
                //         if (data.content.Video) {
                //             this.trailer = data.content.Video.downloadUrl;
                //         }
                //
                //         if (data.content.PosterH) {
                //             this.trailerThumbnail = data.content.PosterH.downloadUrl;
                //         }
                //     }
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('CategoryListModel', [
            'CategoryModel',
            function(CategoryModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.categories = data.map(function(category) {
                //         return new CategoryModel(category);
                //     });
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('CategoryModel', [
            'VideoListModel',
            '$filter',
            function(VideoListModel, $filter) {
                // return function(data) {
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.order = data.order;
                //
                //     if (data.slug) {
                //         this.slug = data.slug;
                //     } else {
                //         this.slug = $filter('slug')(this.title);
                //     }
                //
                //     if (data.videos) {
                //         if (typeof data.videos === 'number') {
                //             this.totalVideos = data.videos;
                //         } else {
                //             this.videos = new VideoListModel(data.videos);
                //             this.totalVideos = this.videos.videos.length;
                //         }
                //     }
                //
                //     if (data.content) {
                //         if (data.content.ProfilePicture) {
                //             this.logo = data.content.ProfilePicture.downloadUrl;
                //         }
                //
                //         if (data.content.BackgroundImage) {
                //             this.headerImage = data.content.BackgroundImage.downloadUrl;
                //         }
                //     }
                // }
            }
        ]);
}());

(function() {
    angular
        .module('turnon')
        .factory('CelebrityListModel', [
            'CelebrityModel',
            function(CelebrityModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.celebrities = data.map(function(celebrity) {
                //         return new CelebrityModel(celebrity);
                //     });
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('CelebrityModel', [
            '$injector',
            '$filter',
            function($injector, $filter) {
                // return function(data) {
                //     this.id = data._id;
                //     this.name = data.title;
                //     this.description = data.description;
                //
                //     if (data.slug) {
                //         this.slug = data.slug;
                //     } else {
                //         this.slug = $filter('slug')(this.name);
                //     }
                //
                //     if (data.content) {
                //         if (data.content.ProfilePicture) {
                //             this.thumbnail = data.content.ProfilePicture.downloadUrl;
                //         }
                //
                //         if (data.content.BackgroundImage) {
                //             this.headerImage = data.content.BackgroundImage.downloadUrl;
                //         }
                //     }
                //
                //     if (data.videos) {
                //         if (typeof data.videos === 'number') {
                //             this.totalVideos = data.videos;
                //         } else {
                //             var VideoListModel = $injector.get('VideoListModel');
                //             this.videos = new VideoListModel(data.videos);
                //             this.totalVideos = this.videos.videos.length;
                //         }
                //     }
                //
                //     if (data.charities) {
                //         var CharityListModel = $injector.get('CharityListModel');
                //         this.charities = new CharityListModel(data.charities);
                //     }
                //
                //     if (data.campaigns) {
                //         var BrandListModel = $injector.get('BrandListModel');
                //         this.brands = new BrandListModel(data.campaigns);
                //     }
                //
                //     if (data.series) {
                //         var SeriesListModel = $injector.get('SeriesListModel');
                //         this.series = new SeriesListModel(data.series);
                //     }
                //
                //     if (data.offers) {
                //         var OfferListModel = $injector.get('OfferListModel');
                //         this.offers = new OfferListModel(data.offers);
                //     }
                //
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('CharityListModel', [
            'CharityModel',
            function(CharityModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.charities = data.map(function(charity) {
                //         if (typeof charity === 'string') {
                //             return {
                //                 id: charity
                //             };
                //         }
                //         return new CharityModel(charity);
                //     });
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('CharityModel', [
            '$injector',
            '$filter',
            function($injector, $filter) {
                // return function(data) {
                //
                //     if (typeof data === 'string') {
                //         return;
                //     }
                //
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.description = data.description;
                //
                //     if (data.slug) {
                //         this.slug = data.slug;
                //     } else {
                //         this.slug = $filter('slug')(this.title);
                //     }
                //
                //     if (data.content) {
                //         if (data.content.ProfilePicture) {
                //             this.transparentThumbnail = data.content.ProfilePicture.downloadUrl;
                //             this.logo = data.content.ProfilePicture.downloadUrl;
                //         }
                //
                //         if (data.content.BackgroundImage) {
                //             this.headerImage = data.content.BackgroundImage.downloadUrl;
                //         }
                //
                //         if (data.content.Video) {
                //             this.trailer = data.content.Video.downloadUrl;
                //         }
                //
                //         if (data.content.PosterH) {
                //             this.trailerThumbnail = data.content.PosterH.downloadUrl;
                //         }
                //     }
                //
                //     if (data.celebrities) {
                //         var CelebrityListModel = $injector.get('CelebrityListModel');
                //         this.celebrities = new CelebrityListModel(data.celebrities);
                //     }
                //
                //     if (data.videos) {
                //         if (typeof data.videos === 'number') {
                //             this.totalVideos = data.videos;
                //         } else {
                //             var VideoListModel = $injector.get('VideoListModel');
                //             this.videos = new VideoListModel(data.videos);
                //             this.totalVideos = this.videos.videos.length;
                //         }
                //     }
                // }
            }
        ]);
}());

(function() {
    angular
        .module('turnon')
        .factory('NotificationListModel', [
            'NotificationModel',
            function(NotificationModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.notifications = data.map(function(notification) {
                //         return new NotificationModel(notification);
                //     });
                // }
            }
        ]);
}());

(function() {
    angular
        .module('turnon')
        .factory('NotificationModel', [
            function() {
                // return function(data) {
                //     this.id = data._id;
                //     this.message = data.message;
                //     this.subject = data.subject;
                //     this.addedDate = data.added;
                //     this.updatedDate = data.updated;
                // }
            }
        ]);
}());

(function() {
    angular
        .module('turnon')
        .factory('OfferListModel', [
            'OfferModel',
            function(OfferModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.offers = data.map(function(offer) {
                //         return new OfferModel(offer);
                //     });
                // }
            }
        ]);
}());

(function() {
    angular
        .module('turnon')
        .factory('OfferModel', [
            '$injector',
            '$filter',
            function($injector, $filter) {
                // return function(data) {
                //     var BrandModel;
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.expirationDate = data.expiration_date;
                //     this.description = data.description;
                //     this.longDescription = data.long_description;
                //     this.instructions = data.instructions_description;
                //
                //     if (data.slug) {
                //         this.slug = data.slug;
                //     } else {
                //         this.slug = $filter('slug')(this.title);
                //     }
                //
                //     if (data.coupon_code) {
                //         this.couponCode = data.coupon_code;
                //     }
                //
                //     if (data.rfi_link) {
                //         this.rfiLink = data.rfi_link;
                //     }
                //
                //     if (typeof data.campaign === 'string') {
                //         this.campaign = data.campaign;
                //     } else {
                //         BrandModel = $injector.get('BrandModel');
                //         this.campaign = new BrandModel(data.campaign);
                //     }
                //
                //     if (data.content) {
                //         if (data.content.BrandTransparentLogo) {
                //             this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                //         }
                //
                //         if (data.content.OfferImage) {
                //             this.thumbnail = data.content.OfferImage.downloadUrl;
                //         }
                //
                //         if (data.content.BackgroundImage) {
                //             this.headerImage = data.content.BackgroundImage.downloadUrl;
                //         }
                //
                //         if (data.content.CouponImage) {
                //             this.couponImage = data.content.CouponImage.downloadUrl;
                //         }
                //
                //         if (data.content.CarouselPic1) {
                //             this.carouselPic1 = data.content.CarouselPic1.downloadUrl;
                //         }
                //
                //         if (data.content.CarouselPic2) {
                //             this.carouselPic2 = data.content.CarouselPic2.downloadUrl;
                //         }
                //
                //         if (data.content.CarouselPic3) {
                //             this.carouselPic3 = data.content.CarouselPic3.downloadUrl;
                //         }
                //     }
                //
                //     if (data.brand) {
                //         BrandModel = $injector.get('BrandModel');
                //         this.brand = new BrandModel(data.brand);
                //     }
                //
                //     if (data.videos) {
                //         if (typeof data.videos === 'number') {
                //             this.totalVideos = data.videos;
                //         } else {
                //             var VideoListModel = $injector.get('VideoListModel');
                //             this.videos = new VideoListModel(data.videos);
                //             this.totalVideos = this.videos.videos.length;
                //         }
                //     }
                // }
            }
        ]);
}());

(function() {
    angular
        .module('turnon')
        .factory('SearchResultsModel', [
            'BrandModel',
            'CelebrityModel',
            'SeriesModel',
            'VideoModel',
            'OfferModel',
            'CharityModel',
            'CategoryModel',
            function(BrandModel, CelebrityModel, SeriesModel, VideoModel, OfferModel, CharityModel, CategoryModel) {
                // return function(data) {
                //
                //     if (data.campaigns && data.campaigns.length > 0) {
                //         this.brands = data.campaigns.map(function(campaign) {
                //             return new BrandModel(campaign);
                //         })
                //     }
                //
                //     if (data.celebrities && data.celebrities.length > 0) {
                //         this.celebrities = data.celebrities.map(function(celebrity) {
                //             return new CelebrityModel(celebrity);
                //         })
                //     }
                //
                //     if (data.charities && data.charities.length > 0) {
                //         this.charities = data.charities.map(function(charity) {
                //             return new CharityModel(charity);
                //         })
                //     }
                //
                //     if (data.offers && data.offers.length > 0) {
                //         this.offers = data.offers.map(function(offer) {
                //             return new OfferModel(offer);
                //         })
                //     }
                //
                //     if (data.categories && data.categories.length > 0) {
                //         this.categories = data.categories.map(function(category) {
                //             return new CategoryModel(category);
                //         })
                //     }
                //
                //     if (data.videos && data.videos.length > 0) {
                //         this.videos = data.videos.map(function(video) {
                //             return new VideoModel(video);
                //         })
                //     }
                //
                //     if (data.series && data.series.length > 0) {
                //         this.series = data.series.map(function(series) {
                //             return new SeriesModel(series);
                //         })
                //     }
                //
                //     this.error = data.error;
                //
                //     if (data._id) {
                //         var match;
                //         switch(data.media_type) {
                //             case 'campaign':
                //             case 'brand':
                //                 match = new BrandModel(data);
                //                 break;
                //             case 'category':
                //                 match = new CategoryModel(data);
                //                 break;
                //             case 'offer':
                //                 match = new OfferModel(data);
                //                 break;
                //             case 'charity':
                //                 match = new CharityModel(data);
                //                 break;
                //             case 'celebrity':
                //                 match = new CelebrityModel(data);
                //                 break;
                //         }
                //         this.type = data.media_type;
                //         this.match = match;
                //     }
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('SeasonListModel', [
            'SeasonModel',
            function(SeasonModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.seasons = data.map(function(season) {
                //         return new SeasonModel(season);
                //     });
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('SeasonModel', [
            'VideoModel',
            function(VideoModel) {
                // return function(data) {
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.description = data.description;
                //     this.seasonNumber = parseInt(data.season_number);
                //
                //     if (data.episodes) {
                //         this.episodes = data.episodes.map(function(episode) {
                //             return new VideoModel(episode);
                //         });
                //     }
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('SeriesListModel', [
            'SeriesModel',
            function(SeriesModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         return [];
                //     }
                //     this.series = data.map(function(series) {
                //         return new SeriesModel(series);
                //     });
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('SeriesModel', [
            '$injector',
            'SeasonListModel',
            function($injector, SeasonListModel) {
                // return function(data) {
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.description = data.description;
                //
                //     if (data.seasons) {
                //         this.seasons = new SeasonListModel(data.seasons);
                //     }
                //
                //     if (data.campaigns) {
                //         var BrandListModel = $injector.get('BrandListModel');
                //         this.brands = new BrandListModel(data.campaigns);
                //     }
                //
                //     if (data.charity) {
                //         var CharityModel = $injector.get('CharityModel');
                //         this.charity = new CharityModel(data.charity);
                //     }
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('UserModel', [
            function() {
                // return function(data) {
                //
                //     if (!data) {
                //         return;
                //     }
                //
                //     this.id = data._id;
                //     this.email = data.email;
                //     this.displayName = data.displayName;
                //
                //     this.watchlist = data.watchlist;
                //     this.offersSaved = data.offersSaved;
                //     this.favoriteCharities = data.favoriteCharities;
                //     this.favoriteCelebs = data.favoriteCelebs;
                //     this.favoriteCategories = data.favoriteCategories;
                //     this.favoriteBrands = data.favoriteBrands;
                //
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('VideoListModel', [
            'VideoModel',
            function(VideoModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         this.videos = [];
                //         return;
                //     }
                //     this.videos = data.map(function(video) {
                //         return new VideoModel(video);
                //     });
                // }
            }
        ]);
}());

(function() {

    angular
        .module('turnon')
        .factory('VideoModel', [
            '$injector',
            'CelebrityModel',
            'BrandListModel',
            'CharityModel',
            '$filter',
            function($injector, CelebrityModel, BrandListModel, CharityModel, $filter) {
                // return function(data) {
                //
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.description = data.description;
                //     this.seriesTitle = data.serie_title; // ...spelling?
                //
                //     if (!this.seriesTitle && data.serie) {
                //         this.seriesTitle = data.serie.title;
                //     }
                //
                //     this.episodeNumber = data.episode_number;
                //     this.runtime = data.runtime;
                //     this.slug = $filter('slug')(this.seriesTitle + ' ' + this.title);
                //
                //     if (data.views) {
                //         this.views = parseInt(data.views);
                //     } else {
                //         this.views = 0;
                //     }
                //
                //     if (data.celebrity) {
                //         this.celebrity = new CelebrityModel(data.celebrity);
                //     }
                //
                //     if (data.campaigns) {
                //         this.brands = new BrandListModel(data.campaigns);
                //     }
                //
                //     if (data.charity) {
                //         this.charity = new CharityModel(data.charity);
                //     }
                //
                //     if (data.categories) {
                //         var CategoryListModel = $injector.get('CategoryListModel');
                //         this.categories = new CategoryListModel(data.categories);
                //     }
                //
                //     if (data.serie) { // ...spelling?
                //
                //         // Preventing circular dependencies since a list of videos can
                //         // exist in nested models too (series, seasons, etc)
                //         var SeriesModel = $injector.get('SeriesModel');
                //         this.series = new SeriesModel(data.serie);
                //     }
                //
                //     if (data.content.PosterH) {
                //         this.thumbnail = data.content.PosterH.downloadUrl;
                //     }
                //
                //     if (data.content.EndPoster) {
                //         this.endPoster = data.content.EndPoster.downloadUrl;
                //     }
                //
                //     if (data.content.HLSStream) {
                //         this.streamUrl = data.content.HLSStream.downloadUrl;
                //     } else if (data.content.MezzanineVideo) {
                //         this.streamUrl = data.content.MezzanineVideo.downloadUrl;
                //     }
                // }
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
                        title: 'turnon - Your Stars. Their Passions.'
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
                            appCode: 'turnon-WEB',
                            partnerId: 3074,
                            appVersion: '1.0.0',
                            allowGeoLocation: false,
                            uninterrupedPlayInterval: 5,
                            idNamespace: 'turnon'
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
                    return $http.post('/api/knetik/offer_save', {
                        id: id
                    });
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
                            socialshareHashtags: '#turnon'
                        }
                    });
                },

                postToTwitter: function(message, title, description, link, picture) {
                    Socialshare.share({
                        provider: 'twitter',
                        attrs: {
                            socialshareVia: 'turnonofficial',
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
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
        .module('turnon')
        .service('apiInterceptor', apiInterceptor);
}());