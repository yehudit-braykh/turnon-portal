(function() {

    var filterPage = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/page/view.filter-page.html',
            controller: 'PageFilterController',
            transclude: {
                pageTitle: '?pageTitle',
                pageSearchFilter: '?pageSearchFilter',
                pageContent: 'pageContent'
            },
            scope: {
                partial: '@?'
            },
            link: function(scope, element, attributes, ctrl, transclude) {
                scope.searchFilterProvided = transclude.isSlotFilled('pageSearchFilter');
            }
        }
    };

    angular.module('clixtv')
        .directive('clixFilterPage', filterPage);
}());