(function() {
    var loader = [
        function() {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'ui/common/loader/view.loader.html',
                scope: {
                    size: '@?'
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixLoader', loader);
}());