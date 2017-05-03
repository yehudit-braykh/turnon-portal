(function() {

    var ShareController = [
        '$scope',
        '$location',
        '$uibModalInstance',
        '$state',
        'data',
        'modalService',
        function($scope, $location, $uibModalInstance, $state, data, modalService) {

            $scope.tab = 'post';
            $scope.socialNetworks = [];

            $scope.video = data.shareModalVideo;
            $scope.offer = data.shareModalOffer;
            $scope.celebrity = data.shareModalCelebrity;
            $scope.brand = data.shareModalBrand;
            $scope.charity = data.shareModalCharity;
            $scope.category = data.shareModalCategory;

            var currentUrl = $location.absUrl(),
                shareContent = '';

            if (data.shareModalVideo) {
                shareContent = 'Here\'s a video I thought you\'d enjoy from #ClixTV - ';
                shareContent += data.shareModalVideo.title + ' ' + $state.href('video', { id: data.shareModalVideo.id }, {absolute: true});
            }

            if (data.shareModalOffer) {
                shareContent = 'Here\'s an offer I thought you\'d enjoy from #ClixTV - ';
                shareContent += data.shareModalOffer.title + ' ' + $state.href('brand-offer', { id: data.shareModalOffer.campaign.id, offerId: data.shareModalOffer.id }, {absolute: true});
            }

            if (data.shareModalCelebrity) {
                shareContent = 'I thought you\'d like to check out ' + data.shareModalCelebrity.name + ' on #ClixTV - ';
                shareContent += $state.href('star', { id: data.shareModalCelebrity.id }, {absolute: true});
            }

            if (data.shareModalBrand) {
                shareContent = 'I thought you\'d enjoy visiting ' + data.shareModalBrand.title + ' on #ClixTV - ';
                shareContent += $state.href('brand', { id: data.shareModalBrand.id }, {absolute: true});
            }

            if (data.shareModalCharity) {
                shareContent = 'I thought you\'d enjoy visiting the charity page for ' + data.shareModalCharity.title + ' on #ClixTV - ';
                shareContent += $state.href('charity', { id: data.shareModalCharity.id }, {absolute: true});
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
            };

            $scope.onPostPress = function() {
                $uibModalInstance.close();
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
                console.log('fda');
            };

            $scope.showBackButton = modalService.getNumberOfModalsInStack() >= 2;
        }
    ];

    angular
        .module('clixtv')
        .controller('ShareController', ShareController);
}());