(function() {

    var filterPage = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/page/view.filter-page.html',
            controller: 'PageFilterController',
            transclude: {
                pageTitle: '?pageTitle',
                pageSearchFilter: 'pageSearchFilter',
                pageContent: 'pageContent'
            },
            scope: {
                partial: '@?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixFilterPage', filterPage);
}());