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