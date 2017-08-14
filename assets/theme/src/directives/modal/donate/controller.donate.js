(function() {

    var DonateController = [
        '$scope',
        '$timeout',
        '$filter',
        '$uibModalInstance',
        'clixConfig',
        function($scope, $timeout, $filter, $uibModalInstance, clixConfig) {

            $scope.buyPointsModel = 0;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

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

            $scope.onBuyPointsChange = function() {

            };

            $scope.onBuyPointsBlur = function(value) {
                $timeout(function() {
                    var input = value || '';
                    input = input.replace(/[0-9]/g, '');
                    $scope.buyPointsModel = $filter('number')(input);
                });
            };

        }
    ];

    angular
        .module('turnon')
        .controller('DonateController', DonateController);
}());