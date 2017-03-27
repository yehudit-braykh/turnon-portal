(function() {
    var overview = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/overview/view.overview.html',
            controller: 'AccountOverviewController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountOverview', overview);
}());