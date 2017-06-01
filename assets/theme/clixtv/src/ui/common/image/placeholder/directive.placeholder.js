(function() {
    var placeholder = [
        function() {
            return {
                restrict: 'AE',
                replace: true,
                template: '<img class="clix-placeholder" src="/assets/theme/clixtv/dist/images/clixtv-loader-logo.svg" />'
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixPlaceholder', placeholder);
}());