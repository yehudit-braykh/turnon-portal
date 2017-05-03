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
                modalService.dismissOrPop();
            };

            $scope.onConfirmButtonPress = function() {
                modalService.closeOrPop();
                $rootScope.$broadcast('modal.confirm', {
                    key: data.key
                })
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('ConfirmationModalController', ConfirmationModalController);
}());