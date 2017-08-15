(function() {

    var RedeemRewardsController = [
        '$scope',
        '$uibModalInstance',
        'type',
        'turnonConfig',
        function($scope, $uibModalInstance, type, turnonConfig) {

            switch (type) {
                case 'visa':
                    $scope.image = turnonConfig.baseImageUrl + '/visa.png';
                    $scope.imageHighRes = turnonConfig.baseImageUrl + '/visa@2x.png';
                    $scope.title = 'Visa® Prepaid Card USD';
                    $scope.disclaimer = 'Visa® Prepaid Card USD works just like cash. Your turnon reward points have a cash value. Just transfer the balance to a Visa® Prepaid Card USD! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
                case 'paypal':
                    $scope.image = turnonConfig.baseImageUrl + '/paypal.png';
                    $scope.imageHighRes = turnonConfig.baseImageUrl + '/paypal@2x.png';
                    $scope.title = 'PayPal';
                    $scope.disclaimer = 'PayPal works just like cash. Your turnon reward points have a cash value. Just transfer the balance to your PayPal Account! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
                case 'amazon':
                    $scope.image = turnonConfig.baseImageUrl + '/amazon.png';
                    $scope.imageHighRes = turnonConfig.baseImageUrl + '/amazon@2x.png';
                    $scope.title = 'Amazon.com Gift Card';
                    $scope.disclaimer = 'Your turnon reward points have a cash value. Just transfer the balance to a Amazon.com Gift Card! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
            }

            $scope.onRedeemPress = function() {

                // todo - API call...
                $uibModalInstance.close();
            };

            $scope.onCancelPress = function() {
                $uibModalInstance.close();
            }

        }
    ];

    angular
        .module('turnon')
        .controller('RedeemRewardsController', RedeemRewardsController);
}());