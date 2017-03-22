(function() {

    var parallax = [
        '$window',
        function($window) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/parallax/view.parallax.html',
                transclude: true,
                scope: {

                },
                link: function(scope, element, attributes) {
                    var parallaxElement = document.getElementById('parallax-container');
                    angular.element($window).on('scroll', function() {
                        parallaxElement.style.top = -(this.pageYOffset * .2) + 'px';
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixParallax', parallax);
}());