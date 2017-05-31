(function() {

    var PrintableRedeemOfferController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'offersService',
        function($q, $scope, $rootScope, $stateParams, offersService) {

            offersService.getOfferById($stateParams.id)
                .then(
                    function onSuccess(data) {

                    }
                );


        }
    ];



    angular
        .module('clixtv')
        .controller('PrintableRedeemOfferController', PrintableRedeemOfferController);
}());