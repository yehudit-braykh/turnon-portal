(function() {

    var HeroBannerController = [
        '$q',
        '$scope',
        '$transclude',
        '$window',
        'parallaxHelper',
        function($q, $scope, $transclude, $window, parallaxHelper) {

            var backgroundImage;

            function _handleResize() {
                if (!backgroundImage) {
                    backgroundImage = document.getElementById('hero-background-image');
                }
                if (backgroundImage) {
                    backgroundImage.style.left = ($window.innerWidth / 2) - (backgroundImage.offsetWidth / 2) + 'px';
                }
            }

            angular.element($window).on('resize.doResize', function () {
                _handleResize();
            });

            $scope.background = parallaxHelper.createAnimator(-0.3);

            $scope.logoProvided = $transclude.isSlotFilled('logo');

            $scope.onImageLoad = function() {
                _handleResize();
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('HeroBannerController', HeroBannerController);
}());