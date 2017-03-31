(function() {

    var AccountRewardsController = [
        '$q',
        '$scope',
        '$uibModal',
        function($q, $scope, $uibModal) {

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

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountRewardsController', AccountRewardsController);
}());