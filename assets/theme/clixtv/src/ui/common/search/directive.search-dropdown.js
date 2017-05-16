(function() {

    var searchDropdown = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.search-dropdown.html',
            controller: 'SearchDropdownController',
            scope: {
                term: '=',
                type: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSearchDropdown', searchDropdown);
}());