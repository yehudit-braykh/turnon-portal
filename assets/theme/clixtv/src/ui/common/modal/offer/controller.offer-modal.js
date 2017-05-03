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
        function($q, $scope, $rootScope, modalService, educationModalService, offersService, userService, data) {

            function _setIsSaved() {
                $scope.isSavedOffer = userService.isSavedOffer(data.offerId);
            }

            $rootScope.$on('user.login', _setIsSaved);

            offersService.getOfferById(data.offerId)
                .then(
                    function onSuccess(data) {
                        $scope.offer = data;
                        console.log(data);
                    }
                );

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
                    $scope.isSavedOffer = true;
                }
            };

            _setIsSaved();
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferModalController', OfferModalController);
}());