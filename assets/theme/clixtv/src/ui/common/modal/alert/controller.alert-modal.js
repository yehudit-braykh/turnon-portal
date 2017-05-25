(function() {

    var AlertModalController = [
        '$scope',
        '$uibModalInstance',
        'data',
        'modalService',
        function($scope, $uibModalInstance, data, modalService) {
            $scope.title = data.title;
            $scope.message = data.message;

            $scope.onCloseButtonPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close();
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('AlertModalController', AlertModalController);
}());