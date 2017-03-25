(function() {
    var rightNavigation = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/navigation/view.right-navigation.html',
            controller: 'RightNavigationController'
        }
    };

    angular.module('clixtv')
        .directive('clixRightNavigation', rightNavigation);
}());