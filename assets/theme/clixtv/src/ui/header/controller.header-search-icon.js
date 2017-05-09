(function() {

    var HeaderSearchIconController = [
        '$scope',
        '$window',
        '$timeout',
        'searchService',
        function($scope, $window, $timeout, searchService) {

            var searchTimeout;

            $scope.term = '';

            $scope.searchVisible = false;

            function _hideSearchResults() {
                $scope.loading = false;
                $scope.results = undefined;
            }

            function _performSearch() {
                $scope.loading = true;
                $scope.results = undefined;

                if (searchTimeout) {
                    $timeout.cancel(searchTimeout);
                }

                searchTimeout = $timeout(function() {
                    searchService.getSearchResults($scope.term, 0, 10)
                        .then(
                            function onSuccess(data) {
                                $scope.results = data;
                            }
                        )
                        .finally(
                            function onFinally() {
                                $scope.loading = false;
                            }
                        )
                }, 250);
            }

            $scope.onTermChange = function() {
                $scope.searchVisible = true;
                if ($scope.term.length < 2) {
                    return _hideSearchResults();
                }
                _performSearch();
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('search-input-field')) {
                    return;
                }
                $scope.term = '';
                $scope.searchVisible = false;
                _hideSearchResults();
                $timeout(function() {
                    $scope.$apply();
                });
            };

            $scope.onSearchIconPress = function() {
                $scope.searchVisible = !$scope.searchVisible;
                if ($scope.searchVisible) {
                    $timeout(function() {
                        $window.document.getElementById('search-input-field').focus();
                    });
                }
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderSearchIconController', HeaderSearchIconController);
}());