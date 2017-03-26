(function() {
    var navigationBar = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/navigation/view.navigation-bar.html',
            controller: 'NavigationBarController',
            scope: {
                activeItem: '=',
                onItemSelect: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixNavigationBar', navigationBar);
}());