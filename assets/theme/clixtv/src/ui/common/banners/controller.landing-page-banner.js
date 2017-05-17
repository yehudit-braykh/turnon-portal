(function() {

    var LandingPageBannerController = [
        '$scope',
        '$transclude',
        function($scope, $transclude) {
            $scope.shareButtonProvided = $transclude.isSlotFilled('bannerShareButtonContainer');
        }
    ];

    angular
        .module('clixtv')
        .controller('LandingPageBannerController', LandingPageBannerController);
}());