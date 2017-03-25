(function() {

    var mainHeader = function() {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            templateUrl: 'ui/common/headers/view.main-header.html'
        }
    };

    var secondaryHeader = function() {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            templateUrl: 'ui/common/headers/view.secondary-header.html'
        }
    };

    angular.module('clixtv')
        .directive('clixMainHeader', mainHeader)
        .directive('clixSecondaryHeader', secondaryHeader);
}());