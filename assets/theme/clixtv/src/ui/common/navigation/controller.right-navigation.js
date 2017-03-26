(function() {

    var RightNavigationController = [
        '$scope',
        '$rootScope',
        '$timeout',
        '$state',
        'userService',
        function($scope, $rootScope, $timeout, $state, userService) {

            $scope.open = false;
            $scope.visible = false;

            $rootScope.$on('rightnav.open', _openNavigation);

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $scope.onBackgroundPress = _closeNavigation;
            $scope.onClosePress = _closeNavigation;

            $scope.onLogoutPress = function() {
                userService.logout()
                    .then(
                        function onSuccess(data) {
                            _closeNavigation();
                        }
                    );
            };

            $scope.goToAccount = function(section) {
                $state.go('account', { section: section });
                _closeNavigation();
            };

            function _closeNavigation() {
                $scope.visible = false;
                $timeout(function() {
                    $scope.open = false;
                }, 500);
            }

            function _openNavigation() {
                $scope.open = true;
                $scope.visible = true;
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('RightNavigationController', RightNavigationController);
}());