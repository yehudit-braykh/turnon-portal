(function() {

    var ModalController = [
        '$q',
        '$log',
        '$scope',
        'modalService',
        function($q, $log, $scope, modalService) {
            if (modalService.getNumberOfModalsInStack() >= 2) {
                $scope.showBackButton = true;
            }

            $scope.onBackButtonPress = function() {
                modalService.pop();
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('ModalController', ModalController);
}());