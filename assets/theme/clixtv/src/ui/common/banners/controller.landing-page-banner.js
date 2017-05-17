(function() {

    var LandingPageBannerController = [
        '$scope',
        '$transclude',
        'parallaxHelper',
        function($scope, $transclude, parallaxHelper) {
            $scope.shareButtonProvided = $transclude.isSlotFilled('bannerShareButtonContainer');
            $scope.background = parallaxHelper.createAnimator(-0.3);
        }
    ];

    angular
        .module('clixtv')
        .controller('LandingPageBannerController', LandingPageBannerController);
}());