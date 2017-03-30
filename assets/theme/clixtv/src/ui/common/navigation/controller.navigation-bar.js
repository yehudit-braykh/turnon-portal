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
                    }
                );

            $scope.changeSection = function(section) {
                $state.go('account', { section: section });
            };

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                if (toState) {
                    $scope.selectedStateName = toState.name;
                }
            })
        }
    ];

    angular
        .module('clixtv')
        .controller('NavigationBarController', NavigationBarController);
}());