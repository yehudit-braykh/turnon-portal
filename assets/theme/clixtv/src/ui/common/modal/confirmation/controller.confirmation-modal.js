(function() {

    var ConfirmationModalController = [
        '$scope',
        'modalData',
        '$uibModalInstance',
        function($scope, modalData, $uibModalInstance) {
            $scope.title = modalData.title;
            $scope.message = modalData.message;

            $scope.onCloseButtonPress = function() {
                $uibModalInstance.dismiss();
            };

            $scope.onConfirmButtonPress = function() {
                $uibModalInstance.close();
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('ConfirmationModalController', ConfirmationModalController);
}());