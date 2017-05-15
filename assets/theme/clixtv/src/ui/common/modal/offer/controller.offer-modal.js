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
        'knetikService',
        'catchMediaService',
        function($q, $scope, $rootScope, modalService, educationModalService, offersService, userService, data, knetikService, catchMediaService) {

            function _setIsSaved() {
                $scope.isSavedOffer = userService.isSavedOffer(data.offerId);
            }

            $rootScope.$on('user.login', _setIsSaved);

            offersService.getOfferById(data.offerId)
                .then(
                    function onSuccess(data) {
                        $scope.offer = data;
                        knetikService.viewOffer($scope.offer.id);

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

                    catchMediaService.trackMediaEvent('offer', 'offer_saved', {
                        media_kind: 'offer',
                        media_id: $scope.offer.id
                    })
                }
            };

            _setIsSaved();
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferModalController', OfferModalController);
}());