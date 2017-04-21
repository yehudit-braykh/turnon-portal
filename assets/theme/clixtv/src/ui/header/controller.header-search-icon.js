(function() {

    var HeaderSearchIconController = [
        '$scope',
        '$window',
        '$timeout',
        'searchService',
        function($scope, $window, $timeout, searchService) {

            $scope.term = '';

            function _hideSearchResults() {

            }

            function _performSearch() {
                searchService.getSearchResults($scope.term, 0, 10)
                    .then(
                        function onSuccess(data) {
                            console.log(data);
                        }
                    );
            }

            $scope.onTermChange = function() {
                if ($scope.term.length < 3) {
                    return _hideSearchResults();
                }
                _performSearch();
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderSearchIconController', HeaderSearchIconController);
}());