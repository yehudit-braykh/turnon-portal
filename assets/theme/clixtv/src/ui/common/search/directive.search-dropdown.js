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

    var brandSearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.brand-search-result-item.html',
            scope: {
                brand: '='
            }
        }
    };

    var offerSearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.offer-search-result-item.html',
            scope: {
                offer: '='
            }
        }
    };

    var celebritySearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.celebrity-search-result-item.html',
            scope: {
                celebrity: '='
            }
        }
    };

    var categorySearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.category-search-result-item.html',
            scope: {
                category: '='
            }
        }
    };

    var videoSearchResultItem = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/search/view.video-search-result-item.html',
            scope: {
                video: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixSearchDropdown', searchDropdown)
        .directive('clixBaseSearchResultItem', baseSearchResultItem)
        .directive('clixCharitySearchResultItem', charitySearchResultItem)
        .directive('clixBrandSearchResultItem', brandSearchResultItem)
        .directive('clixOfferSearchResultItem', offerSearchResultItem)
        .directive('clixCelebritySearchResultItem', celebritySearchResultItem)
        .directive('clixCategorySearchResultItem', categorySearchResultItem)
        .directive('clixVideoSearchResultItem', videoSearchResultItem);
}());