(function() {

    var OfferModalController = [
        '$q',
        '$scope',
        'modalService',
        function($q, $scope, modalService) {

            $scope.onNextPress = function() {
                modalService.showModal({
                    controller: 'OfferModalController',
                    templateUrl: 'ui/common/modal/offer/view.offer-modal.html'
                });
            };

            $scope.onBackPress = function() {
                modalService.pop();
            };
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferModalController', OfferModalController);
}());