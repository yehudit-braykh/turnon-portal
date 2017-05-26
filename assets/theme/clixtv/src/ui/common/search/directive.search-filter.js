(function() {

    var searchFilter = function() {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            templateUrl: 'ui/common/search/view.search-filter.html',
            scope: {
                searchPlaceholder: '@',
                filterPlaceholder: '@',
                sortPlaceholder: '@',
                filterOptions: '=',
                sortOptions: '=',
                showFilters: '@?',
                type: '@?'
            },
            link: function(scope) {
                scope.term = '';

                scope.onBodyPress = function() {
                    scope.dropdownForceHide = true;
                    console.log('true');
                };

                scope.onInputFocus = function() {
                    scope.dropdownForceHide = false;
                    console.log('false');
                }
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSearchFilter', searchFilter);
}());