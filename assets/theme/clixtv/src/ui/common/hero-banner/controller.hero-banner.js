(function() {

    var HeroBannerController = [
        '$q',
        '$scope',
        'parallaxHelper',
        function($q, $scope, parallaxHelper) {
            $scope.background = parallaxHelper.createAnimator(-0.3)
        }
    ];

    angular
        .module('clixtv')
        .controller('HeroBannerController', HeroBannerController);
}());