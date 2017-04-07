(function() {

    var emptyContainer = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/container/view.empty-container.html',
            transclude: {
                headerText: 'headerText',
                bodyText: '?bodyText'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixEmptyContainer', emptyContainer);
}());