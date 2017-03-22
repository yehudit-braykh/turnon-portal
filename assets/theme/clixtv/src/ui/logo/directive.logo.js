(function() {
    var logo = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/logo/view.logo.html',
            scope: {
                charity: '@?',
                logoUrl: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixLogo', logo);
}());