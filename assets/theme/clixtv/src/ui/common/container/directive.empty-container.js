(function() {

    var emptyContainer = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/container/view.empty-container.html',
            transclude: true
        }
    };

    angular.module('clixtv')
        .directive('clixEmptyContainer', emptyContainer);
}());