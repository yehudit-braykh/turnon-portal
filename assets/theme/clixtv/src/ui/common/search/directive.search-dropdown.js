(function() {

    var searchDropdown = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.search-dropdown.html',
            controller: 'SearchDropdownController',
            scope: {
                term: '=',
                type: '=?',
                forceHide: '=?'
            }
        }
    };

    var baseSearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.base-search-result-item.html',
            transclude: {
                searchResultImage: '?searchResultImage',
                searchResultImageCircle: '?searchResultImageCircle',
                searchResultTitle: 'searchResultTitle',
                searchResultSubtitle: 'searchResultSubtitle'
            },
            scope: {
                sref: '@'
            },
            link: function(scope, element, attributes, ctrl, transclude) {
                scope.searchResultImageCircle = transclude.isSlotFilled('searchResultImageCircle');
            }
        }
    };

    var charitySearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.charity-search-result-item.html',
            scope: {
                charity: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSearchDropdown', searchDropdown)
        .directive('clixBaseSearchResultItem', baseSearchResultItem)
        .directive('clixCharitySearchResultItem', charitySearchResultItem)
}());