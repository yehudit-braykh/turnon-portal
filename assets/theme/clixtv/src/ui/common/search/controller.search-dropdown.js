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
                $scope.results = undefined;
                $scope.empty = false;
                if (!$scope.term || $scope.term.length < 2) {
                    return;
                }
                $scope.searching = true;
                searchService[method]($scope.term, 0, 5)
                    .then(
                        function onSuccess(data) {
                            if (!data || data.length === 0) {
                                $scope.empty = true;
                            } else {
                                $scope.results = data;
                            }
                            console.log($scope.empty);
                        }
                    )
                    .finally(
                        function onFinally() {
                            $scope.searching = false;
                        }
                    )
            }

            $scope.$watch('term', _onSearchTermChange)
        }
    ];

    angular
        .module('clixtv')
        .controller('SearchDropdownController', SearchDropdownController);
}());