(function() {

    var ConfirmationModalController = [
        '$scope',
        '$rootScope',
        'data',
        '$uibModalInstance',
        'modalService',
        function($scope, $rootScope, data, $uibModalInstance, modalService) {
            $scope.key = data.key;
            $scope.title = data.title;
            $scope.message = data.message;

            $scope.onCloseButtonPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close();
                }
            };

            $scope.onConfirmButtonPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close();
                }
                $rootScope.$broadcast('modal.confirm', {
                    key: data.key
                })
            };
        }
    ];

    angular
        .module('turnon')
        .controller('ConfirmationModalController', ConfirmationModalController);
}());