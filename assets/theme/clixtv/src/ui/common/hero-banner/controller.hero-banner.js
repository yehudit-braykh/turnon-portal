(function() {

    var HeroBannerController = [
        '$q',
        '$scope',
        '$transclude',
        'parallaxHelper',
        function($q, $scope, $transclude, parallaxHelper) {

            $scope.background = parallaxHelper.createAnimator(-0.3);

            $scope.logoProvided = $transclude.isSlotFilled('logo');

        }
    ];

    angular
        .module('clixtv')
        .controller('HeroBannerController', HeroBannerController);
}());