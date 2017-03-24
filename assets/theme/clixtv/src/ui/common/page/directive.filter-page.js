(function() {

    var filterPage = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/page/view.filter-page.html',
            transclude: {
                pageTitle: 'pageTitle',
                pageSearchFilter: 'pageSearchFilter',
                pageContent: 'pageContent'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixFilterPage', filterPage);
}());