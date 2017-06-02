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

            _setIsSaved();
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferModalController', OfferModalController);
}());