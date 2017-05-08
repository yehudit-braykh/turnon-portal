(function() {

    var NavigationBarController = [
        '$scope',
        '$rootScope',
        '$timeout',
        '$state',
        'userService',
        function($scope, $rootScope, $timeout, $state, userService) {

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        if ($scope.loggedInUser) {
                            $scope.loggedInUser.displayName = $scope.loggedInUser.firstName + ' ' + $scope.loggedInUser.lastName;
                        }
                    }
                );

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $scope.changeSection = function(section) {
                $state.go('account', { section: section });
            };

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                if (toState) {
                    $scope.selectedStateName = toState.name;
                    $scope.searchVisible = false;
                    $rootScope.$broadcast('mobilesearch.close');
                }
            });

            $scope.go = function(path) {
                $state.go(path);
            };

            $scope.onSearchPress = function() {
                $scope.searchVisible = !$scope.searchVisible;
                $rootScope.$broadcast(($scope.searchVisible) ? 'mobilesearch.open' : 'mobilesearch.close');
            };

            $scope.onMobileBackgroundPress = function() {
                $scope.searchVisible = false;
                $rootScope.$broadcast('mobilesearch.close');
            };

            // $scope.bodyClicked = function(event) {
            //     if (angular.element(event.target).hasClass('mobile-search-container')) {
            //         return;
            //     }
            //     $scope.searchVisible = !$scope.searchVisible;
            //     $rootScope.$broadcast('mobilesearch.close');
            // };
        }
    ];

    angular
        .module('clixtv')
        .controller('NavigationBarController', NavigationBarController);
}());