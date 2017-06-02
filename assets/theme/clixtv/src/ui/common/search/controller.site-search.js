(function() {

    var SiteSearchController = [
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        'searchService',
        'catchMediaService',
        function($scope, $rootScope, $window, $timeout, searchService, catchMediaService) {

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
                console.log($scope.term);
                // if ($scope.term.length < 2) {
                //     return _hideSearchResults();
                // }
                // _performSearch();
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
                        $window.document.getElementById('site-search-input-field').focus();
                    });
                }
            };

            $rootScope.$on('$stateChangeSuccess', function(){
                $scope.term = '';
                $scope.searchVisible = false;
                _hideSearchResults();
            });

            $scope.onResultPress = function(event, entity) {
                switch(event) {
                    case 'star':
                        catchMediaService.trackAppEvent('search', {
                            target_cm: 'media',
                            target_type: 'person'
                        });
                        break;
                    case 'brand':
                        catchMediaService.trackAppEvent('search', {
                            target_cm: 'media',
                            target_type: 'campaign'
                        });
                        break;
                    case 'charity':
                        catchMediaService.trackAppEvent('search', {
                            target_cm: 'media',
                            target_type: 'organization'
                        });
                        break;
                    case 'category':
                        catchMediaService.trackAppEvent('search', {
                            target_cm: 'entity',
                            target_type: 'category'
                        });
                        break;

                }
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('SiteSearchController', SiteSearchController);
}());