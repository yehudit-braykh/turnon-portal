(function() {

    var ShareController = [
        '$scope',
        '$location',
        '$uibModalInstance',
        'shareModalVideo',
        'shareModalOffer',
        'shareModalCelebrity',
        'shareModalBrand',
        'shareModalCharity',
        'shareModalCategory',
        function($scope, $location, $uibModalInstance, shareModalVideo, shareModalOffer, shareModalCelebrity, shareModalBrand, shareModalCharity, shareModalCategory) {

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
                shareContent += shareModalVideo.title + ' ' + currentUrl;
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