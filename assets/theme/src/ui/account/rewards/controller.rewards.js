(function() {

    var AccountRewardsController = [
        '$q',
        '$scope',
        '$rootScope',
        '$uibModal',
        'turnonConfig',
        function($q, $scope, $rootScope, $uibModal, turnonConfig) {
            // 
            // $rootScope.pageTitle = 'Your Rewards - turnon';
            //
            // $scope.active = 0;
            // $scope.pointsEnabled = turnonConfig.pointsEnabled;
            // $scope.ready = true;
            //
            // $scope.onRedeemRewardsPress = function(type) {
            //     var modalInstance = $uibModal.open({
            //         animation: true,
            //         templateUrl: 'ui/common/modal/rewards/view.redeem-rewards.html',
            //         controller: 'RedeemRewardsController',
            //         windowClass: 'clix-modal-window',
            //         size: 'clix-lg',
            //         resolve: {
            //             type: function() {
            //                 return type;
            //             }
            //         }
            //     });
            //
            //     modalInstance.opened.then(
            //         function onSuccess() {
            //             $rootScope.$broadcast('modal.open');
            //         }
            //     );
            //
            //     modalInstance.closed.then(
            //         function onSuccess() {
            //             $rootScope.$broadcast('modal.close');
            //         }
            //     );
            //
            //     modalInstance.result.then(
            //         function onSuccess(data) {
            //
            //         },
            //         function onError(error) {
            //
            //         }
            //     )
            // };
            //
            // $scope.onRedeemPress = function() {
            //     $scope.active = 2;
            // };

        }
    ];

    angular
        .module('turnon')
        .controller('AccountRewardsController', AccountRewardsController);
}());
