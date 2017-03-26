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
        }
    ];

    angular
        .module('clixtv')
        .controller('NavigationBarController', NavigationBarController);
}());