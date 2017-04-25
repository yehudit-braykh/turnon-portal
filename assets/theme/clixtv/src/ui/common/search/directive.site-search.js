(function() {

    var siteSearch = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.site-search.html',
            controller: 'SiteSearchController',
            scope: {
                isVisible: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSiteSearch', siteSearch);
}());