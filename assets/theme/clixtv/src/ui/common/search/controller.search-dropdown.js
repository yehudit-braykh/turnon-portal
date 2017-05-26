(function() {
    var SearchDropdownController = [
        '$scope',
        'searchService',
        function($scope, searchService) {

            function _getSearchMethod() {
                switch ($scope.type) {
                    case 'brand':
                        return 'getBrandSearchResults';
                    case 'charity':
                        return 'getCharitySearchResults';
                    default:
                        return 'getSearchResults';
                }
            }

            function _onSearchTermChange() {
                var method = _getSearchMethod();
                if (!$scope.term || $scope.term.length < 2) {
                    return;
                }
                searchService[method]($scope.term, 0, 5)
                    .then(
                        function onSuccess(data) {
                            $scope.results = data;
                        }
                    );
            }

            $scope.$watch('term', _onSearchTermChange)
        }
    ];

    angular
        .module('clixtv')
        .controller('SearchDropdownController', SearchDropdownController);
}());