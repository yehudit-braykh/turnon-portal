(function() {

    var ShareController = [
        '$scope',
        '$location',
        '$uibModalInstance',
        '$state',
        'shareModalVideo',
        'shareModalOffer',
        'shareModalCelebrity',
        'shareModalBrand',
        'shareModalCharity',
        'shareModalCategory',
        function($scope, $location, $uibModalInstance, $state, shareModalVideo, shareModalOffer, shareModalCelebrity, shareModalBrand, shareModalCharity, shareModalCategory) {

            $scope.tab = 'post';
            $scope.socialNetworks = [];

            $scope.video = shareModalVideo;
            $scope.offer = shareModalOffer;
            $scope.celebrity = shareModalCelebrity;
            $scope.brand = shareModalBrand;
            $scope.charity = shareModalCharity;
            $scope.category = shareModalCategory;

            var currentUrl = $location.absUrl(),
                shareContent = '';

            if (shareModalVideo) {
                shareContent = 'Here\'s a video I thought you\'d enjoy from #ClixTV - ';
                shareContent += shareModalVideo.title + ' ' + $state.href('video', { id: shareModalVideo.id }, {absolute: true});
            }

            if (shareModalOffer) {
                shareContent = 'Here\'s an offer I thought you\'d enjoy from #ClixTV - ';
                shareContent += shareModalOffer.title + ' ' + $state.href('offer', { id: shareModalOffer.id }, {absolute: true});
            }

            if (shareModalCelebrity) {
                shareContent = 'I thought you\'d like to check out ' + shareModalCelebrity.name + ' on #ClixTV - ';
                shareContent += $state.href('star', { id: shareModalCelebrity.id }, {absolute: true});
            }

            if (shareModalBrand) {
                shareContent = 'I thought you\'d enjoy visiting ' + shareModalBrand.title + ' on #ClixTV - ';
                shareContent += $state.href('brand', { id: shareModalBrand.id }, {absolute: true});
            }

            if (shareModalCharity) {
                shareContent = 'I thought you\'d enjoy visiting the charity page for ' + shareModalCharity.title + ' on #ClixTV - ';
                shareContent += $state.href('charity', { id: shareModalCharity.id }, {absolute: true});
            }

            $scope.shareContent = shareContent;

            $scope.onTabPress = function(tab) {
                $scope.tab = tab;
            };

            $scope.onCancelPress = function() {
                $uibModalInstance.close();
            };

            $scope.onSendPress = function() {
                $uibModalInstance.close();
            };

            $scope.onPostPress = function() {
                $uibModalInstance.close();
            };

            $scope.onSocialNetworkPress = function(socialNetwork) {
                var index = $scope.socialNetworks.indexOf(socialNetwork);
                if (index !== -1) {
                    $scope.socialNetworks.splice(index);
                } else {
                    $scope.socialNetworks.push(socialNetwork);
                }
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('ShareController', ShareController);
}());