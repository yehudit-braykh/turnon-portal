(function() {
    var lazyLoader = [
        function() {
            return {
                restrict: 'AE',
                controller: 'LazyLoaderController',
                templateUrl: 'ui/common/image/lazy-loader/view.lazy-loader.html',
                scope: {
                    imageSource: '@?',
                    showPlaceholder: '@?'
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixLazyLoader', lazyLoader);
}());