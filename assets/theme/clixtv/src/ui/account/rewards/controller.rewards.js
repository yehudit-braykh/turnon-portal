(function() {

    var AccountRewardsController = [
        '$q',
        '$scope',
        '$rootScope',
        '$uibModal',
        'clixConfig',
        function($q, $scope, $rootScope, $uibModal, clixConfig) {

            $scope.active = 0;
            $scope.pointsEnabled = clixConfig.pointsEnabled;
            $scope.ready = true;

            $scope.onRedeemRewardsPress = function(type) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/rewards/view.redeem-rewards.html',
                    controller: 'RedeemRewardsController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-lg',
                    resolve: {
                        type: function() {
                            return type;
                        }
                    }
                });

                modalInstance.opened.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.open');
                    }
                );

                modalInstance.closed.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.close');
                    }
                );

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            };

            $scope.onRedeemPress = function() {
                $scope.active = 2;
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountRewardsController', AccountRewardsController);
}());