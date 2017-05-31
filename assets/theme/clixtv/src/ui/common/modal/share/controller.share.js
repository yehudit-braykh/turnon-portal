(function() {

    var ShareController = [
        '$scope',
        '$location',
        '$uibModalInstance',
        '$state',
        'data',
        'modalService',
        'catchMediaService',
        'shareService',
        'userService',
        function($scope, $location, $uibModalInstance, $state, data, modalService, catchMediaService, shareService, userService) {

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

                // shareService.postToTwitter('Test Message', 'http://www.google.com', 'http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/590ac858fbb3d633b64e3607/redfoocover1.jpg');
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
                                        window.open('/hauth/login/Twitter', 'tw', 'left=20,top=20,width=600,height=500,toolbar=1,resizable=0');
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
        }
    ];

    angular
        .module('clixtv')
        .controller('ShareController', ShareController);
}());