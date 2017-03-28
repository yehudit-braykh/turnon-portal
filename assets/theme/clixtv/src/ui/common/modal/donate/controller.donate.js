(function() {

    var DonateController = [
        '$scope',
        '$uibModalInstance',
        function($scope, $uibModalInstance) {

            $scope.buyPointsModel = 0;

            $scope.onBuyPointsPress = function() {
                $scope.state = 'buy';
            };

            $scope.onCancelPress = function() {
                $uibModalInstance.close();
            };

            $scope.onDonatePress = function() {
                // todo - API call...
                $uibModalInstance.close();
            };

            $scope.onBackPress = function() {
                $scope.state = 'donate';
            };

            $scope.onBuyPointsContainerPress = function() {
                var element = document.getElementById('buyPointsInput');
                element.focus();
                element.select();
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('DonateController', DonateController);
}());