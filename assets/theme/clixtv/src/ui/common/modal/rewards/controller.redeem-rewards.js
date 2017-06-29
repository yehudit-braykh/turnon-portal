(function() {

    var RedeemRewardsController = [
        '$scope',
        '$uibModalInstance',
        'type',
        'clixConfig',
        function($scope, $uibModalInstance, type, clixConfig) {

            switch (type) {
                case 'visa':
                    $scope.image = clixConfig.baseImageUrl + '/visa.png';
                    $scope.imageHighRes = clixConfig.baseImageUrl + '/visa@2x.png';
                    $scope.title = 'Visa® Prepaid Card USD';
                    $scope.disclaimer = 'Visa® Prepaid Card USD works just like cash. Your ClixTV reward points have a cash value. Just transfer the balance to a Visa® Prepaid Card USD! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
                case 'paypal':
                    $scope.image = clixConfig.baseImageUrl + '/paypal.png';
                    $scope.imageHighRes = clixConfig.baseImageUrl + '/paypal@2x.png';
                    $scope.title = 'PayPal';
                    $scope.disclaimer = 'PayPal works just like cash. Your ClixTV reward points have a cash value. Just transfer the balance to your PayPal Account! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
                    break;
                case 'amazon':
                    $scope.image = clixConfig.baseImageUrl + '/amazon.png';
                    $scope.imageHighRes = clixConfig.baseImageUrl + '/amazon@2x.png';
                    $scope.title = 'Amazon.com Gift Card';
                    $scope.disclaimer = 'Your ClixTV reward points have a cash value. Just transfer the balance to a Amazon.com Gift Card! Click "Redeem Now" below and you will receive an email with your redemption instructions.';
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
        .module('clixtv')
        .controller('RedeemRewardsController', RedeemRewardsController);
}());