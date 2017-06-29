(function() {
    var placeholder = [
        function() {
            return {
                restrict: 'AE',
                replace: true,
                template: '<img class="clix-placeholder" ng-src="{{$root.clixConfig.baseImageUrl}}/clixtv-loader-logo.svg" />'
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixPlaceholder', placeholder);
}());