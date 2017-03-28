(function() {
    var mobileNavigation = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/navigation/view.mobile-navigation.html',
            controller: 'NavigationBarController',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixMobileNavigation', mobileNavigation);
}());