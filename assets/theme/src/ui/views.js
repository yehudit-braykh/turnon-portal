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
