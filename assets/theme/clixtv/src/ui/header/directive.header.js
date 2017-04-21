(function() {
    var header = function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/header/view.header.html',
            controller: 'HeaderController',
            scope: {

            }
        }
    };

    var headerSearchIcon = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/header/view.header-search-icon.html',
            controller: 'HeaderSearchIconController'
        }
    };

    var headerSearchRow = function() {
        return {
            restrict: 'AE',
            transclude: {
                logoContainer: 'logoContainer',
                titleText: 'titleText',
                subtitleText: 'subtitleText'
            },
            templateUrl: 'ui/header/view.header-search-icon-row.html'
        }
    };

    angular.module('clixtv')
        .directive('clixHeaderBar', header)
        .directive('clixHeaderSearchIcon', headerSearchIcon)
        .directive('clixHeaderSearchRow', headerSearchRow);
}());