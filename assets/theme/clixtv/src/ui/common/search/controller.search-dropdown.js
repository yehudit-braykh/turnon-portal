(function() {
    var SearchDropdownController = [
        '$scope',
        '$timeout',
        'searchService',
        function($scope, $timeout, searchService) {

            var searchTimeout;

            function _getSearchMethod() {
                switch ($scope.type) {
                    case 'brand':
                        return 'getBrandSearchResults';
                    case 'charity':
                        return 'getCharitySearchResults';
                    case 'offer':
                        return 'getOfferSearchResults';
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

                if (searchTimeout) {
                    $timeout.cancel(searchTimeout);
                }
                searchTimeout = $timeout(function() {
                    searchService[method]($scope.term, 0, 5)
                        .then(
                            function onSuccess(data) {
                                console.log(data);
                                $scope.searching = false;
                                if (!data || data.length === 0) {
                                    $scope.empty = true;
                                } else {
                                    $scope.empty = false;
                                    $scope.results = data;
                                }
                            }
                        );
                }, 250);
            }

            $scope.$watch('term', _onSearchTermChange);
        }
    ];

    angular
        .module('clixtv')
        .controller('SearchDropdownController', SearchDropdownController);
}());