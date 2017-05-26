(function() {

    var searchFilter = [
        'clixConfig',
        function(clixConfig) {
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
                    scope.filtersEnabled = clixConfig.filtersEnabled;

                    scope.onBodyPress = function() {
                        scope.dropdownForceHide = true;
                    };

                    scope.onInputFocus = function() {
                        scope.dropdownForceHide = false;
                    }
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixSearchFilter', searchFilter);
}());