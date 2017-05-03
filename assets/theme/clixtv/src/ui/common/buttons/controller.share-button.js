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