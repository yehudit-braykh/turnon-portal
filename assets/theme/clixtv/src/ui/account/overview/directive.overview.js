(function() {
    var overview = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/overview/view.overview.html',
            scope: {
                user: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixAccountOverview', overview);
}());